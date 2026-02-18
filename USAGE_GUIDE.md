# 📖 Usage Guide

## Complete User Guide for NextWeb E-Commerce Platform

---

## 🚀 Getting Started

### First Time Setup

1. **Start the application:**
```bash
npm run dev
```

2. **Open in browser:**
```
http://localhost:5173
```

3. **You'll see the Login page**

---

## 🔐 Authentication

### Creating an Account

1. Click **"Sign Up"** button
2. Enter your details:
   - Full Name
   - Email address
   - Password (watch the strength indicator)
   - Confirm Password
3. Password must be:
   - At least 8 characters
   - Mix of uppercase and lowercase
   - Include numbers
   - Include special characters
4. Click **"Create Account"**
5. You'll be redirected to the Dashboard

### Logging In

1. Enter your email and password
2. (Optional) Check "Remember me"
3. Click **"Login"**
4. Access granted to Dashboard

### Password Strength Indicator

Watch the colored bars below password field:
- 🔴 **Red** - Weak (1 bar)
- 🟡 **Yellow** - Fair (2 bars)
- 🟢 **Green** - Good (3 bars)
- 🟢 **Dark Green** - Strong (4 bars)

---

## 🏠 Dashboard

### Overview

The Dashboard is your home base with:
- Sales statistics
- Featured products
- Quick actions
- Data visualization

### Hero Section

- **Get Started** - Quick onboarding
- **View Products** - Browse catalog
- **Statistics** - Active users & products sold

### Stats Cards

Four key metrics:
1. **Total Revenue** - Overall sales
2. **Total Orders** - Number of orders
3. **New Customers** - Recent signups
4. **Growth Rate** - Business growth

Each card shows:
- Icon (color-coded)
- Current value
- Trend indicator (↑ or ↓)
- Percentage change

### Sales Chart

- View sales trends over time
- Filter by: Last 6 months, Last year, All time
- Hover over chart for details

### Featured Products

- Browse top products
- Click product card for details
- Quick add to cart
- Add to wishlist (heart icon)

---

## 🛍️ Products Page

### Browsing Products

1. Navigate to **Products** from sidebar
2. View all available products
3. Use filters to narrow down

### Search

- Type in search bar at top
- Results update in real-time
- Search by product name

### Filters

**Category Filter:**
- All
- Electronics
- Audio
- Computers
- Accessories
- Wearables

**Price Range:**
- Drag slider to set max price
- Range: $0 - $1000

**Rating Filter:**
- 4+ Stars
- 3+ Stars
- 2+ Stars
- 1+ Stars

### Sorting

Sort products by:
- Featured (default)
- Price: Low to High
- Price: High to Low
- Highest Rated

### Product Cards

Each card shows:
- Product image
- Category badge
- Product name
- Star rating
- Price
- "Add to Cart" button

**Hover Actions:**
- 🛒 Add to Cart
- ❤️ Add to Wishlist
- 👁️ Quick View

### Product Details (Modal)

Click product or eye icon to see:
- Large product image
- Full description
- Rating (out of 5)
- Stock status
- Quantity selector
- Add to Cart button
- Add to Wishlist button
- Product features list

**Quantity Selector:**
- Click **-** to decrease
- Click **+** to increase
- Can't exceed stock
- Can't go below 1

---

## 🛒 Shopping Cart

### Opening Cart

Click the **cart icon** in navbar (shows item count)

### Cart Panel

Slides in from right with:
- List of cart items
- Item images
- Prices
- Quantity controls
- Remove buttons
- Total amount

### Managing Cart Items

**Update Quantity:**
- Click **-** to decrease
- Click **+** to increase
- Quantity updates automatically

**Remove Item:**
- Click trash icon (🗑️)
- Item removed instantly
- Total recalculates

**Empty Cart:**
- Shows shopping bag icon
- "Your cart is empty" message
- Prompt to add products

### Checkout Process

Click **"Proceed to Checkout"** to start:

#### Step 1: Cart Review
- Review all items
- Check quantities
- Verify total
- Click "Continue"

#### Step 2: Shipping Information
Enter:
- Full Name
- Email
- Phone Number
- Address
- City
- ZIP Code

Click **"Continue to Payment"**

#### Step 3: Payment Information
Enter:
- Card Number
- Expiry Date (MM/YY)
- CVV
- Cardholder Name

Click **"Review Order"**

#### Step 4: Order Review
- Review all items
- Check shipping info
- Verify payment
- See final total

Click **"Place Order"**

#### Step 5: Success!
- ✅ Order confirmation
- Order number displayed
- Cart automatically cleared
- Redirected after 3 seconds

---

## 📦 Orders Page

### Viewing Orders

Navigate to **Orders** from sidebar

### Orders Table

Columns:
- Order ID
- Date
- Customer
- Items (count)
- Amount
- Status
- Actions

### Status Types

- 🟢 **Delivered** - Order completed
- 🔵 **Shipped** - In transit
- 🟡 **Processing** - Being prepared
- 🔴 **Cancelled** - Order cancelled

### Filtering Orders

Click status buttons:
- All
- Processing
- Shipped
- Delivered
- Cancelled

### Searching Orders

- Type in search bar
- Search by Order ID or Customer name
- Results filter instantly

### Order Details

Click **"View"** button to see:
- Complete order information
- Order ID
- Customer details
- Date & time
- Items count
- Total amount
- Current status

### Order Timeline

Visual tracking with 4 stages:
1. ✅ Order Placed
2. ✅ Processing
3. ✅ Shipped
4. ⏳ Delivered (pending)

Completed stages show checkmark and timestamp.

---

## 👤 Profile Page

### Viewing Profile

Navigate to **Profile** from sidebar

### Profile Information

Displays:
- Profile photo
- Full name
- Email address
- Phone number
- Address

### Editing Profile

1. Click **"Edit"** button
2. Fields become editable
3. Update information
4. Click **"Save Changes"**
5. Success notification appears

### Change Photo

When editing:
- Click **"Change Photo"** button
- Select new image
- Photo updates

### Order Statistics

Four stat cards:
1. **Total Orders** - All orders placed
2. **Delivered** - Successfully delivered
3. **Pending** - In progress
4. **Cancelled** - Cancelled orders

### Order Distribution Chart

Pie chart showing:
- Delivered (green)
- Pending (yellow)
- Cancelled (red)

Hover over sections for details.

### Recent Orders

Shows last 3 orders with:
- Product name
- Order ID
- Date
- Amount
- Status badge

Click **"View All"** to see complete history.

---

## 🎨 Theme Toggle

### Switching Themes

1. Click **moon/sun icon** in navbar
2. Theme switches instantly
3. Preference saved automatically

### Dark Mode
- Dark backgrounds
- Light text
- Reduced eye strain
- Better for night use

### Light Mode
- Light backgrounds
- Dark text
- Better for day use
- Higher contrast

---

## ❤️ Wishlist

### Adding to Wishlist

1. Find product you like
2. Click **heart icon**
3. Heart fills with color
4. Success notification

### Removing from Wishlist

1. Click filled heart icon
2. Heart becomes outline
3. Item removed

### Viewing Wishlist

- Badge shows wishlist count
- Click to view all items
- Move items to cart

---

## 🔔 Notifications

### Toast Messages

Appear top-right for:
- ✅ Success actions (green)
- ❌ Error messages (red)
- ℹ️ Information (blue)

Auto-dismiss after 3 seconds.

### Examples:
- "Added to cart"
- "Removed from cart"
- "Added to wishlist"
- "Profile updated"
- "Order placed successfully"

---

## 📱 Mobile Usage

### Responsive Features

**Sidebar:**
- Becomes hamburger menu
- Tap to open/close
- Overlay when open

**Navigation:**
- Touch-friendly buttons
- Swipe gestures
- Bottom navigation ready

**Products:**
- Single column grid
- Larger touch targets
- Optimized images

**Cart:**
- Full-width panel
- Easy quantity controls
- Large buttons

---

## ⌨️ Keyboard Shortcuts

### Navigation
- **Tab** - Move between elements
- **Enter** - Activate buttons/links
- **Esc** - Close modals/panels

### Forms
- **Tab** - Next field
- **Shift + Tab** - Previous field
- **Enter** - Submit form

---

## 🎯 Tips & Tricks

### Shopping
1. Use filters to find products faster
2. Add to wishlist for later
3. Check stock before adding to cart
4. Review cart before checkout

### Orders
1. Track orders in real-time
2. Use search to find specific orders
3. Filter by status for quick access
4. Check timeline for updates

### Profile
1. Keep information updated
2. Check order statistics regularly
3. Review recent orders
4. Update preferences

### Performance
1. Use dark mode to save battery
2. Clear cart if not purchasing
3. Close modals when done
4. Use search instead of scrolling

---

## ❓ Troubleshooting

### Can't Login?
- Check email format
- Verify password
- Try creating new account

### Cart Not Updating?
- Refresh page
- Check internet connection
- Clear browser cache

### Products Not Loading?
- Refresh page
- Check filters
- Clear search query

### Checkout Issues?
- Verify all form fields
- Check card details
- Ensure cart has items

---

## 🎉 Best Practices

### Security
- Use strong passwords
- Don't share credentials
- Logout when done
- Keep profile updated

### Shopping
- Compare products
- Read descriptions
- Check ratings
- Verify stock

### Orders
- Save order numbers
- Track shipments
- Contact support if needed
- Review delivered orders

---

## 📞 Support

Need help?
1. Check this guide
2. Review documentation
3. Check browser console
4. Contact support team

---

**Enjoy shopping with NextWeb! 🛍️**

Last Updated: February 2024
