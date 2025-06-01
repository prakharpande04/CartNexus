require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./dbConfig/dbConfig");
const userRouter = require("./routes/userRoute");
const cartRouter = require("./routes/cartRoute");
const productRouter = require("./routes/productRoute");
const paymentRouter = require("./routes/paymentRoute");
const cashfreeWebhookRouter = require('./routes/cashfreeWebhookRoute');

const app = express();
const PORT = 5000;

app.use(cors());
connectDB();

// 🟢 Use raw body only for Cashfree webhook route
app.use('/api/webhook/cashfree', express.raw({ type: 'application/json' }));
app.use('/api/webhook/cashfree', cashfreeWebhookRouter); // Route must come AFTER middleware

// 🟢 Use JSON parser for all other routes
app.use(express.json());
app.use(userRouter);
app.use(cartRouter);
app.use(productRouter);
app.use(paymentRouter);

app.get("/", async (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
