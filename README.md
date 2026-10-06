# BuildNest

> **Build smarter. Buy better. BuildNest.**

BuildNest is a full-stack **PC Building & Hardware Marketplace** designed to help users discover computer components, create custom PC configurations, evaluate hardware compatibility, compare builds, and make better purchasing decisions.

The long-term vision of BuildNest is to combine a hardware marketplace with a **PC intelligence layer** consisting of compatibility analysis, build scoring, performance estimation, price intelligence, and AI-powered recommendations.

---

## Overview

BuildNest goes beyond a traditional e-commerce platform.

It combines:

- PC hardware marketplace
- Custom PC building
- Hardware compatibility analysis
- Build comparison
- Performance intelligence
- AI-powered recommendations

The goal is to make PC building easier for beginners while providing useful tools for enthusiasts who want more control over their configurations.

---

## Current Backend Foundation

BuildNest currently has a working backend foundation covering core marketplace functionality.

### Authentication

- User registration
- Secure password hashing
- Login
- JWT authentication
- Protected routes
- Role-based access control
- User profile

### Hardware Marketplace

- Product CRUD operations
- Product categories
- Product details
- Product search
- Category filtering
- Brand filtering
- Price range filtering
- Sorting
- Pagination
- Product ratings and reviews
- ImageKit-backed product image storage

### Shopping

- Shopping cart
- Add/update/remove cart items
- Wishlist
- Order placement
- Order history
- Order status management
- Product review system

### Reviews

- Add reviews
- Update reviews
- Delete reviews
- One review per user per product
- Product rating calculation
- Review count calculation

### Backend Architecture

The backend follows a layered architecture using:

- Routes
- Controllers
- Services
- Models
- Middleware
- Validators
- Utility classes

This structure is designed to keep business logic separate from HTTP handling and database models.

---

# PC Building Vision

A major part of BuildNest's future is a dedicated **PC Builder** system.

The planned builder will allow users to:

- Select PC components
- Create custom configurations
- Track total build cost
- Set a target budget
- Save builds
- Compare configurations
- Analyze hardware compatibility

---

# Compatibility Engine

BuildNest is planned to include a dedicated compatibility engine that evaluates relationships between major PC components.

Planned checks include:

- CPU and motherboard socket compatibility
- Motherboard and RAM compatibility
- RAM generation compatibility
- GPU and case dimensions
- PSU power requirements
- Cooling requirements
- Platform compatibility
- Potential configuration conflicts

The compatibility engine will provide understandable warnings instead of simply allowing incompatible components to be combined.

---

# Build Intelligence

BuildNest is designed to eventually provide an intelligence layer for PC configurations.

Planned capabilities include:

- Performance estimation
- Value analysis
- Compatibility score
- Upgradeability score
- Power analysis
- Thermal considerations
- Bottleneck analysis
- Build recommendations
- Alternative component suggestions

The objective is to help users understand **why** a configuration is good or problematic, rather than simply displaying a list of components.

---

# AI PC Builder Copilot

A major long-term feature of BuildNest is an **AI PC Builder Copilot**.

Example user request:

> "Build me a gaming PC under ₹1 lakh for 1440p gaming."

The planned system will:

1. Understand the user's requirements
2. Search the BuildNest hardware catalog
3. Select suitable components
4. Check component compatibility
5. Calculate the total cost
6. Estimate expected performance
7. Explain component choices
8. Suggest alternatives
9. Highlight compromises and trade-offs

The AI layer is intended to work with BuildNest's own product, pricing, compatibility, and build data rather than functioning as an isolated chatbot.

---

# Planned Intelligence Architecture

```text
User Request
     │
     ▼
Intent Understanding
     │
     ▼
BuildNest Catalog Search
     │
     ▼
Product Data
     │
     ├───────────────┐
     ▼               ▼
Compatibility    Budget Rules
Engine               │
     │               │
     └───────┬───────┘
             ▼
      AI Recommendation
             │
             ▼
    Explanation + Results