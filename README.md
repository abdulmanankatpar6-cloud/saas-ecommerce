# NextWeb - Premium SaaS E-Commerce Platform

A modern, fully-functional SaaS e-commerce platform built with React, featuring a professional dashboard UI, clean agency-level UX, and production-ready components.

## 🌐 Live Demo

**[View Live Demo →](https://your-app.vercel.app)**

**Test Credentials:**
- User: `user@example.com` / `password123`
- Admin: `admin@admin.com` / `admin123`

## 🚀 Features

### Authentication
- ✅ Login & Register with validation
- ✅ Password strength indicator
- ✅ Error & success messages
- ✅ Session handling with localStorage
- ✅ Social login UI (Google, Facebook)

### Navigation
- ✅ Collapsible sidebar with active link highlighting
- ✅ Responsive mobile navigation
- ✅ User profile card in sidebar
- ✅ Smooth hover animations

### Dashboard
- ✅ Hero section with CTA buttons
- ✅ Interactive stats cards with trend indicators
- ✅ Sales overview chart (Recharts)
- ✅ Featured products grid
- ✅ Real-time data visualization

### Products
- ✅ Product cards with hover effects
- ✅ Quick view modal with full details
- ✅ Add to cart & wishlist functionality
- ✅ Stock indicators
- ✅ Rating display
- ✅ Category filters
- ✅ Price range slider
- ✅ Search & sort functionality
- ✅ Responsive grid layout

### Shopping Cart
- ✅ Slide-in cart panel
- ✅ Dynamic cart items with quantity controls
- ✅ Real-time total calculation
- ✅ Multi-step checkout process:
  - Cart Review
  - Shipping Information
  - Payment Details
  - Order Review
  - Success Confirmation

### Orders
- ✅ Order history table
- ✅ Status filters (All, Processing, Shipped, Delivered, Cancelled)
- ✅ Search functionality
- ✅ Order detail modal
- ✅ Order tracking timeline
- ✅ Status badges with icons

### Profile
- ✅ User information display
- ✅ Edit profile functionality
- ✅ Order statistics cards
- ✅ Order distribution pie chart
- ✅ Recent orders list
- ✅ Avatar management

### UI/UX Features
- ✅ Dark/Light mode toggle with persistence
- ✅ Smooth page transitions
- ✅ Toast notifications (react-hot-toast)
- ✅ Skeleton loading states
- ✅ Hover effects & animations
- ✅ Tooltips
- ✅ Progress indicators
- ✅ Responsive design (mobile-first)
- ✅ Touch-friendly interactions
- ✅ Keyboard navigation support
- ✅ ARIA labels for accessibility

## 🎨 Design System

### Colors
- Primary: `#4F46E5` (Indigo)
- Accent: `#22C55E` (Green)
- Warning: `#FACC15` (Yellow)
- Error: `#EF4444` (Red)
- Background: `#F8FAFC` (Light Gray)
- Dark UI: `#111827` (Dark Gray)

### Typography
- Headings: Poppins (Google Fonts)
- Body: Inter (Google Fonts)

### Style
- Minimal modern SaaS UI
- Rounded corners (0.5rem - 1.5rem)
- Soft shadows
- Professional spacing
- Clean icons (Lucide React)
- Startup aesthetic

## 📦 Tech Stack

- **React 18** - UI library
- **React Router DOM** - Routing
- **Recharts** - Data visualization
- **Lucide React** - Icon library
- **Framer Motion** - Animations
- **React Hot Toast** - Notifications
- **Vite** - Build tool

## 🛠️ Installation

1. Navigate to the project directory:
```bash
cd saas-ecommerce
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:5173
```

## 📁 Project Structure

```
saas-ecommerce/
├── src/
│   ├── components/
│   │   ├── Layout.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Navbar.jsx
│   │   ├── CartPanel.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductModal.jsx
│   │   └── StatsCard.jsx
│   ├── context/
│   │   ├── ThemeContext.jsx
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Products.jsx
│   │   ├── Orders.jsx
│   │   └── Profile.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── README.md
```

## 🎯 Key Features Implementation

### Context API
- **ThemeContext**: Manages dark/light mode with localStorage persistence
- **AuthContext**: Handles user authentication and session management
- **CartContext**: Manages shopping cart, wishlist, and checkout flow

### Responsive Design
- Mobile-first approach
- Breakpoints: 768px (tablet), 1024px (desktop)
- Collapsible sidebar on mobile
- Touch-friendly buttons and interactions
- Responsive grids and layouts

### Performance Optimizations
- Lazy loading ready
- Optimized re-renders with proper state management
- Efficient context usage
- CSS transitions for smooth animations

## 🔐 Authentication Flow

1. User visits `/login`
2. Can toggle between Login/Register
3. Form validation with error messages
4. Password strength indicator (Register)
5. On success, user data stored in localStorage
6. Redirected to `/dashboard`
7. Protected routes check authentication

## 🛒 Shopping Flow

1. Browse products on Dashboard or Products page
2. Click product for quick view modal
3. Add to cart with quantity selection
4. View cart in slide-in panel
5. Multi-step checkout:
   - Review cart items
   - Enter shipping information
   - Add payment details
   - Review order
   - Place order
6. Success confirmation
7. Order appears in Order History

## 🎨 Customization

### Colors
Edit CSS variables in `src/App.css`:
```css
:root {
  --primary: #4F46E5;
  --accent: #22C55E;
  --warning: #FACC15;
  --error: #EF4444;
  --background: #F8FAFC;
  --dark: #111827;
}
```

### Fonts
Update Google Fonts import in `src/App.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` folder.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer Notes

- All components are modular and reusable
- CSS is scoped per component
- Context providers wrap the entire app
- Toast notifications for user feedback
- Smooth animations throughout
- Production-ready code structure
- Clean, commented code
- Follows React best practices

## 🎉 Getting Started

1. Run `npm install`
2. Run `npm run dev`
3. Visit `http://localhost:5173`
4. Login with any email/password
5. Explore the platform!

---

Built with ❤️ using React and modern web technologies.
