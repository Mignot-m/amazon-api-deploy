const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(
  "sk_test_51PeEwsRwMrYq4qXCOJccKNnvEyGSU6zBHWQPbWfXLAJLMmLst0fny5CQWSgSYNyr84J9ZEEEJuaxbNIfqHAC9NOz007d3s1JaE"
);
const app = express();
app.use(cors());

app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success",
  });
});

app.post("/payment/create", async (req, res) => {
  const total = req.query.total;
  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res.status(403).json({
      message: "total must be greater than 0",
    });
  }
});
app.listen(5000, (err) => {
  if (err) throw err;
  console.log("Amazon server running on PORT:http://localhost:5000");
});
