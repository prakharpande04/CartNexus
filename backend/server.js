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
app.use(express.json({ verify: (req, res, buf) => { req.rawBody = buf } }));
app.use(userRouter);
app.use(cartRouter);
app.use(productRouter);
app.use(paymentRouter);
app.use(cashfreeWebhookRouter);

app.get("/", async (req, res) => {
  res.send("API is running...");
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
