
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const ApiError = require("../utils/ApiError");

const validateQuantity = (quantity) => {
    const parsedQuantity = Number(quantity);

    if (
        quantity === undefined ||
        quantity === null ||
        quantity === "" ||
        !Number.isFinite(parsedQuantity)
    ) {
        throw new ApiError(400, "Quantity must be a number");
    }

    if (parsedQuantity < 1) {
        throw new ApiError(400, "Quantity must be at least 1");
    }

    if (!Number.isInteger(parsedQuantity)) {
        throw new ApiError(400, "Quantity must be a whole number");
    }

    return parsedQuantity;
};

const getAvailableProduct = async (productId) => {
    const product = await Product.findById(productId);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    if (!product.isActive) {
        throw new ApiError(400, "This product is currently unavailable");
    }

    return product;
};

const checkStock = (product, requestedQuantity, cartQuantity = 0) => {
    const remainingStock = Math.max(0, product.stock - cartQuantity);

    if (requestedQuantity > remainingStock) {
        throw new ApiError(
            400,
            `Only ${remainingStock} additional unit(s) available for ${product.name}`
        );
    }
};

const addToCart = async (userId, productId, quantity = 1) => {
    const requestedQuantity = validateQuantity(quantity);
    const product = await getAvailableProduct(productId);

    let cart = await Cart.findOne({ user: userId });

    const existingItem = cart?.items.find(
        (item) => item.product.toString() === productId.toString()
    );

    const cartQuantity = existingItem ? existingItem.quantity : 0;

    checkStock(product, requestedQuantity, cartQuantity);

    if (!cart) {
        cart = await Cart.create({
            user: userId,
            items: [{ product: productId, quantity: requestedQuantity }],
        });
    } else if (existingItem) {
        existingItem.quantity += requestedQuantity;
        await cart.save();
    } else {
        cart.items.push({
            product: productId,
            quantity: requestedQuantity,
        });
        await cart.save();
    }

    return await Cart.findOne({ user: userId }).populate("items.product");
};

const getCart = async (userId) => {
    const cart = await Cart.findOne({ user: userId }).populate(
        "items.product"
    );

    if (!cart) {
        return { user: userId, items: [] };
    }

    return cart;
};

const updateCartItem = async (userId, productId, quantity) => {
    const requestedQuantity = validateQuantity(quantity);
    const product = await getAvailableProduct(productId);

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }

    const item = cart.items.find(
        (cartItem) =>
            cartItem.product.toString() === productId.toString()
    );

    if (!item) {
        throw new ApiError(404, "Product not found in cart");
    }

    checkStock(product, requestedQuantity);

    item.quantity = requestedQuantity;
    await cart.save();

    return await Cart.findOne({ user: userId }).populate("items.product");
};

const removeCartItem = async (userId, productId) => {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }

    cart.items = cart.items.filter(
        (item) => item.product.toString() !== productId.toString()
    );

    await cart.save();

    return await Cart.findOne({ user: userId }).populate("items.product");
};

const clearCart = async (userId) => {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }

    cart.items = [];
    await cart.save();

    return cart;
};

module.exports = {
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart,
};
