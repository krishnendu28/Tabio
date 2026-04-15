require("dotenv").config();
const { connectDb } = require("./src/config/db");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./src/models/User");

async function seedAdmin() {
  try {
    await connectDb();

    const email = "admin@tabio.com";
    const password = "TabioAdmin123";

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.findOneAndUpdate(
      { email },
      {
        name: "Tabio Admin",
        businessName: "Tabio",
        username: email,
        passwordHash,
      },
      { upsert: true, new: true }
    );

    console.log("Admin account successfully updated/created!");
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);

  } catch (error) {
    console.error("Error creating admin account:", error);
  } finally {
    mongoose.disconnect();
  }
}

seedAdmin();
