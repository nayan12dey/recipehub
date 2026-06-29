# 🍽️ RecipeHub — Recipe Sharing Platform

## 📖 Project Overview
RecipeHub is a full-stack Next.js platform where food enthusiasts can create, share, discover, and manage recipes. Users can publish their own recipes, browse recipes shared by others, save favorite recipes, and interact with the community. The platform creates a centralized space for recipe sharing and culinary inspiration.

---

## 🌐 Live Demo & Repository

- **Live Site:** 
- **Client Repository:** 
- **Server  Repository:** 


---

## ✨ Key Features & Functionalities

### 🛡️ User Roles & Authentication
- **Next-Gen Authentication:** Fully implemented using **Better Auth** (`better-auth`).
- **Roles:** Normal User, Premium Member, and Admin functionalities handled securely.
- **Session Management:** Securely managed by Better Auth with native MongoDB adapter.

### 🍳 Recipe Management
- **Add Recipes:** Normal users can add up to 2 recipes. Premium members enjoy **unlimited** recipe uploads.
- **Browse & Filter:** Browse all recipes, and filter by Category (implemented using MongoDB queries).
- **Recipe Details:** View comprehensive details, Like, Report, or add to Favorites.
- **Purchase Recipes:** Securely buy exclusive recipes via **Stripe** checkout.

### 👤 User Dashboard
- **Overview:** View Total Recipes, Favorites, and Likes Received. Displays a Premium Badge based on payment status.
- **My Recipes:** View, Update, and Delete personal recipes.
- **My Purchased Recipes:** Access premium content purchased on the platform.
- **Favorites:** Manage saved recipes and easily remove them from favorites.
- **Profile:** Update personal name and profile image.

### 👑 Premium Membership
- **Stripe Checkout:** Secure payment gateway to purchase a premium membership.
- **Perks:** Unlocks a premium profile badge and unlimited recipe uploads.
- **Transactions:** Saves transactions in the database and shows confirmation upon successful payment.

### 👨‍💼 Admin Dashboard
- **Overview:** Track Total Users, Total Recipes, Total Premium Members, and Total Reports.
- **Manage Users:** View all users, Block, and Unblock specific users.
- **Manage Recipes:** View all platform recipes, Delete, Edit, and **Feature** recipes to display them on the Home Page.
- **Reports:** Review user reports and either Dismiss the report or Remove the recipe entirely.
- **Transactions:** View complete payment history.

### 🎨 UI/UX & Layout
- **Dynamic Home Page:** Features a Banner section, Featured Recipes, Popular Recipes, and two custom sections.
- **Animations:** Engaging animations implemented using **Framer Motion 12**.
- **Component Library:** Beautiful and accessible UI powered by **HeroUI** and **Tailwind CSS v4**.
- **Responsiveness:** Fully responsive, professional, and intuitive design across all devices.
- **Theme Toggle:** Built-in Dark / Light mode toggle using `next-themes`.

---

## 🚀 Tech Stack

### Full-Stack Framework
- **Next.js 16 (App Router)** - React 19 Server Components and API Routes

### Frontend
- **Tailwind CSS v4** - Utility-first CSS framework
- **HeroUI (`@heroui/react`)** - Modern React UI components
- **Framer Motion** - Powerful animations
- **Lucide React & React Icons** - Iconography
- **React Hot Toast** - Notifications

### Backend & Database
- **MongoDB** - Native MongoDB driver (`mongodb` package)
- **Better Auth** - Comprehensive authentication solution with `@better-auth/mongo-adapter`
- **Stripe** - Payment processing directly inside Next.js API Routes

---

## 🗄️ Database Architecture

The platform uses a robust MongoDB schema integrated seamlessly with Better Auth:

- `users`, `sessions`, `accounts`: Handled automatically by Better Auth.
- `recipes`: `recipeName`, `recipeImage`, `category`, `cuisineType`, `difficultyLevel`, `preparationTime`, `ingredients`, `instructions`, `authorId`, `authorName`, `likesCount`, `isFeatured`, `status`, `createdAt`, `updatedAt`
- `favorites`: `userId`, `recipeId`, `addedAt`
- `reports`: `recipeId`, `reporterEmail`, `reason`, `status`, `createdAt`
- `payments`: `userId`, `amount`, `recipeId`, `transactionId`, `paymentStatus`, `paidAt`

---

## 🛠️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/recipehub.git
cd recipehub
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Secure your configuration by creating a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=

# Next.js & Better Auth
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=

# Image Upload (e.g., Imgbb)
NEXT_PUBLIC_IMGBB_API_KEY=
```

### 4. Run the Application
Start the development server:
```bash
npm run dev
```
Your application will be available at `http://localhost:3000`.



---
# 👨‍💻 Developer

**Nayan Dey**



