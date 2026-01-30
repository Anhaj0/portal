# PortalShop

PortalShop is a mobile-first e-commerce web application built to facilitate a seamless shopping experience. It features a modern, responsive user interface and a lightweight backend for managing products and cart sessions.

## Project Overview

-   **Goal**: Create a high-fidelity, mobile-optimized shopping app based on specific design requirements.
-   **Key Features**:
    -   Responsive Mobile Layout (constrained max-width on desktop).
    -   Product Exploration & Filtering.
    -   Detailed Product Views with Size/Color selection.
    -   In-memory Shopping Cart & Order Processing.

## Tech Stack

-   **Framework**: [Next.js 16.1](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript 5.9](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS 4.1](https://tailwindcss.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Font**: DM Sans

## How to Run

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Open Application**:
    Navigate to [http://localhost:3000](http://localhost:3000)

## API Design

The application uses Next.js Route Handlers (`app/api/...`) to simulate a backend service.

-   `GET /api/products`: Fetch all available products.
-   `GET /api/products/[id]`: Fetch details for a specific product.
-   `GET /api/cart`: Retrieve current session's cart items.
-   `POST /api/cart`: Add items to the cart.
-   `POST /api/orders`: Process checkout (clears the cart).

> **Decisions**: Used an in-memory store for the cart to keep the review process simple without needing a local DB setup. This means cart data is global to the running server instance and resets on restart.

---

### Project Structure

-   `src/app`: Routes and pages.
-   `src/components`: Reusable UI components (ProductCard, BottomNav, etc.).
-   `src/data`: Seed JSON data.
-   `src/types.ts`: Shared TypeScript interfaces.
