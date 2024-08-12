# Local Handicraft Business 🌟

## 📝 Description

Welcome to **Local Handicraft site** – an app designed to help local artisans showcase, manage, and sell their handcrafted products. Our platform is dedicated to promoting local craftsmanship and connecting artisans with customers.

---

## 🚀 User Stories

1. **404 Page:**  
   As an anonymous user, if I attempt to access a non-existent page, I will see a 404 error page to let me know it’s my fault.

2. **Signup:**  
   As an anonymous user, I can sign up to start listing and managing my handcrafted products.

3. **Login:**  
   As a user, I can log in to access my store and manage my inventory.

4. **Logout:**  
   As a user, I can log out to ensure my account and data are secure.

5. **Toggle Categories:**  
   As a user, I can switch between different product categories (e.g., pottery, textiles, jewelry).

6. **Add Products:**  
   As a user, I can add new handcrafted items to my store.

7. **Delete Products:**  
   As a user, I can remove items from my store.

8. **Mark as Sold:**  
   As a user, I can mark items as sold to keep track of inventory.

9. **Random Product:**  
   As a user, I can discover a random product from the store.

10. **Check Profile:**  
    As a user, I can view my profile and see my store statistics.

---

## 📚 Features

- **Product Categories:** Organize products into categories like pottery, textiles, jewelry, etc.
- **Product Management:** Add, update, or delete products easily.
- **Sales Tracking:** Monitor and manage product sales.
- **Random Discovery:** Let users discover new products at random.

---

## 🖥️ Client / Frontend

### 🌐 React Router Routes

| **Path**                  | **Component**               | **Permissions**  | **Behavior**                                             |
|---------------------------|-----------------------------|------------------|----------------------------------------------------------|
| `/`                       | HomePage                    | Public           | Homepage with featured products                         |
| `/signup`                 | SignupPage                  | Anon only        | Signup form for new users                               |
| `/login`                  | LoginPage                   | Anon only        | Login form for returning users                          |
| `/logout`                 | N/A                         | User only        | Logout and redirect to homepage                         |
| `/products`               | ProductList, NavBar, Footer | User only        | View all products in the store                          |
| `/product/:id`            | ProductDetail               | Public           | View details of a specific product                      |
| `/add-product`            | AddProductForm              | User only        | Form to add a new product to the store                  |
| `/edit-product/:id`       | EditProductForm             | User only        | Form to edit an existing product                        |
| `/profile`                | ProfilePage, Stats          | User only        | View user profile and store statistics                  |
| `/sold-products`          | SoldProductList             | User only        | View products that have been marked as sold             |

---

## 🧩 Components

- **HomePage** - Displays featured products and categories
- **SignupPage** - User registration interface
- **LoginPage** - User login interface
- **NavBar** - Navigation bar for easy access to different sections
- **Footer** - Footer with additional links and information
- **ProductList** - List of products in the store
- **ProductDetail** - Detailed view of a specific product
- **AddProductForm** - Form for adding new products
- **EditProductForm** - Form for editing existing products
- **ProfilePage** - User profile and stats

---

## 🔌 Services

- **Auth Service**
  - `auth.login(user)` – Log in a user
  - `auth.signup(user)` – Register a new user
  - `auth.logout()` – Log out the current user
  - `auth.me()` – Retrieve the current user’s profile

- **Product Service**
  - `product.list(category)` – Get a list of products by category
  - `product.detail(id)` – Get details of a specific product
  - `product.add(data)` – Add a new product to the store
  - `product.delete(id)` – Remove a product from the store
  - `product.update(id, data)` – Update details of an existing product

- **External API**
  - API for local crafts
  - API for payment processing

---

## 🏗️ Server / Backend

### 📦 Models

**User Model**

```javascript
{
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  storeName: {type: String, required: true},
  products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
}
