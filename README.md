```markdown
# PetalPost - Gardening Tips & Advice Platform (Frontend)

### Live Site: [https://petalpost-client.vercel.app](https://petalpost-client.vercel.app/)

## Overview

**PetalPost** is an interactive web platform designed for gardening enthusiasts to share and discover gardening tips and advice. It offers a rich community experience where users can post content, upvote, comment, follow others, and explore premium features through integrated payment options. The frontend of this application is built using **Next.js** and **TypeScript**, providing users with a seamless, responsive, and dynamic experience across devices.

This repository contains the **frontend client** code for the PetalPost platform.

---

## Features

### Core Features

- **User Authentication**: Register, log in, and manage profiles with JWT-based authentication.
- **Responsive UI**: Optimized for both desktop and mobile devices using modern UI/UX design principles.
- **Rich Content Creation**: Users can create gardening tips and guides using a rich text editor (supporting images and videos).
- **Post Interactions**: Users can upvote/downvote posts, comment on posts, and follow/unfollow other users.
- **Premium Content Access**: Users can unlock premium gardening content via payment gateways like Stripe.
- **Infinite Scroll**: Dynamic content loading with infinite scroll for a seamless user experience.
- **Search & Filtering**: Advanced search and filtering capabilities based on category, popularity, etc.
- **Favourites Section**: Users can save their favourite posts and view them in their profile.
- **Profile Management**: Users can view their posts, followers, and following, and manage their personal information.
- **Admin Dashboard**: Admins can manage users, posts, payments, and community moderation.

---

## Tech Stack

- **Next.js**: Framework for server-side rendering and static site generation.
- **TypeScript**: Ensuring type safety and code scalability.
- **React**: For building reusable UI components.
- **Tailwind CSS**: For utility-first styling and responsive design.
- **Ant Design**: UI library for React components to enhance the design.
- **Axios**: For handling API requests.
- **Redux Toolkit**: For state management.

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/shohaib1996/petalpost-client.git
   ```

2. Navigate to the project directory:

   ```bash
   cd petalpost-client
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env.local` file in the root directory and add the following environment variables:

   ```bash
   NEXT_PUBLIC_PAYMENT_KEY = pk_test_51OEE1IHnH3ExHWvMIHYLndJJNV9DSEKrsZDJEMAtq6GO2cRrjcIJBXlStptIJdj8IvjNlX8xwk5lgn3iNcllBPNC00ksupRUTO
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open your browser and go to `http://localhost:3000` to view the application.

---

## Project Structure

- `components/`: Reusable UI components such as buttons, forms, etc.
- `pages/`: Next.js routing system, defining the structure of the app.
- `redux/`: State management using Redux Toolkit.
- `styles/`: Global and component-specific styles using Tailwind CSS.
- `utils/`: Utility functions and helper methods for API interactions.

---

## Key Pages

- **Home**: Displays gardening posts with filtering and upvoting options.
- **Login/Register**: Allows users to sign in or create an account.
- **User Dashboard**: Displays user-specific content, followers, and followed users.
- **Post Creation**: Rich text editor for creating gardening tips and guides.
- **Profile Page**: Displays user profile information, including posts and interactions.
- **Admin Dashboard**: Tools for admin management and moderation.

---

