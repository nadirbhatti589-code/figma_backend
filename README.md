# SHOP.CO Backend

Standalone Express, MongoDB, and Cloudinary API for SHOP.CO.

## Setup

1. Run `npm install`.
2. Copy `.env.example` to `.env` and set the required values. Confirm that `MONGO_URI=mongodb://localhost:27017/shopco` matches your local MongoDB setup.
3. Run `npm run seed` to create sample categories and products.
4. Run `npm run dev` to start the API at `http://localhost:5000`.

Seeded image URLs are external placeholder fashion images. New product uploads use Cloudinary and return `{ url, publicId }` records.

## Endpoints

- `GET /api/health`
- `GET /api/products?category=&minPrice=&maxPrice=&colors=&sizes=&sort=&page=&limit=&search=&onSale=`
- `GET /api/products/:id`
- `POST /api/products` (Bearer admin token; multipart `images`)
- `PUT /api/products/:id` (Bearer admin token; multipart `images`)
- `DELETE /api/products/:id` (Bearer admin token)
- `GET /api/categories`
- `POST /api/categories` (Bearer admin token)
- `POST /api/orders` (Bearer token) body: `{ "items": [{ "product", "size", "color", "quantity" }], "shippingAddress": { "fullName", "address", "city", "postalCode", "phone" } }`
- `GET /api/orders/my-orders` (Bearer token)
- `GET /api/orders/:id` (Bearer token)
- `GET /api/products/:id/reviews`
- `POST /api/products/:id/reviews` (Bearer token) body: `{ "rating", "text" }`
- `POST /api/newsletter/subscribe` body: `{ "email" }`

Public user signup and login are intentionally disabled for this backend. Product/category management and order endpoints remain protected for future administrative or checkout integration.
