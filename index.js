const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 3005;

// middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173, https://book-store-frontend-ochre.vercel.app, https://book-store-frontend-git-main-geralds-projects-36992188.vercel.app, https://book-store-frontend-3t3s55odv-geralds-projects-36992188.vercel.app",
    ], // replace with your frontend URL
    credentials: true,
  })
);

// routes
const bookRoutes = require("./src/books/book.route");
const orderRoutes = require("./src/orders/order.route");
const userRoutes = require("./src/users/user.route");
const adminRoutes = require("./src/stats/admin.stats");

app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

async function main() {
  await mongoose.connect(process.env.DB_URL);
  app.get("/", (req, res) => {
    res.send("Hello Books!");
  });
}

main()
  .then(() => console.log("Mongoose DB connected successfully"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
