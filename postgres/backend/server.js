import express from "express"
import cors from "cors"
import "dotenv/config"
import cookieParser from "cookie-parser"
import { verifyToken } from "./middleware/auth.js"
import productRoutes from "./routes/products.js"
import cartRoutes from "./routes/cart.js"
import wishlistRoutes from "./routes/wishlist.js"
import orderRoutes from "./routes/orders.js"
import userRoutes from "./routes/users.js"
import adminRoutes from "./routes/admin.js"
import contactRoutes from "./routes/contact.js"
import consentRoutes from "./routes/consent.js"
import sequelize from "./db.js"
// import cors from "cors";

const app = express()
const PORT = process.env.PORT || 5000

// Middleware 
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }), 
)
app.use(express.json())
app.use(express.urlencoded({ limit: "10mb", extended: true }))
app.use(cookieParser())

// Initialize Postgres connection
const initializeDB = async () => {
  try {
    await sequelize.authenticate()
    console.log("Postgres connected successfully")
    await sequelize.sync() // create tables if they do not exist
  } catch (error) {
    console.error("Postgres connection error:", error)
    process.exit(1)
  }
}

// Initialize connection on startup
initializeDB()
// Health check endpoint
app.get("/api/health", (req, res) => { 
  res.json({ status: "Backend is running", timestamp: new Date().toISOString() })
})

// Public Routes
app.use("/api/products", productRoutes)
app.use("/api/consent", consentRoutes)
app.use("/api/contact", contactRoutes)

// Protected Routes (require Clerk authentication)
app.use("/api/users", verifyToken, userRoutes)
app.use("/api/cart", verifyToken, cartRoutes)
app.use("/api/wishlist", verifyToken, wishlistRoutes)
app.use("/api/orders", verifyToken, orderRoutes)

// Admin Routes (require Clerk authentication + admin role)
app.use("/api/admin", verifyToken, adminRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"
  res.status(statusCode).json({
    error: message,
    timestamp: new Date().toISOString(),
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
  console.log(`Postgres host: ${process.env.DB_HOST || "localhost"}`)
  console.log(`Clerk Secret Key: ${process.env.CLERK_SECRET_KEY ? "Loaded" : "Not configured"}`)
})
