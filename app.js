const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./authRouter");
const PORT = process.env.PORT || 8000;
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use("/auth", authRouter);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://Red_Code:Red_Code@cluster0.nvkal.mongodb.net/Red_Code?retryWrites=true&w=majority`
    );
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
