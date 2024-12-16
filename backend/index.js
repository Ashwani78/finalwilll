const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserModel = require("./UserModel");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//Change the connect link with mongo local server in c-pannel note: dotenv is not installed

const mongoURI =
  "mongodb+srv://teja29204:OFv8nW8niqmbOo32@back.ztguk.mongodb.net/?retryWrites=true&w=majority&appName=Back";

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully.");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.post("/willupload", async (req, res) => {
  try {
    const formData = req.body.formData;
    const usermail = req.body.usermail;

    // Check if the user already exists
    const userAlreadyExist = await UserModel.findOne({ email: usermail });

    if (userAlreadyExist) {
      // Update the wills field for the existing user
      userAlreadyExist.wills = formData;
      await userAlreadyExist.save(); // Save the updated document
    } else {
      // Create a new user if they don't exist
      const user = new UserModel({
        email: usermail,
        wills: formData,
      });
      await user.save();
    }

    res.json({ message: "Saved successfully" });
  } catch (error) {
    console.error("Error while saving/updating wills:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getwill", async (req, res) => {
  try {
    // Use query parameters to retrieve the email
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: "Email is required" }); // Handle missing email
    }

    // Await the result of findOne
    const user = await UserModel.findOne({ email: email });

    if (user) {
      return res.json({ user }); // Return the user if found
    }

    res.status(404).json({ message: "User not found" }); // Return 404 if not found
  } catch (error) {
    console.error("Error retrieving will:", error);
    res.status(500).json({ error: "Internal Server Error" }); // Handle server errors
  }
});

app.delete("/delete", async (req, res) => {
  try {
    const { email } = req.body; // Extract email from request body

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await UserModel.findOneAndDelete({ email: email }); // Find and delete the user

    if (!user) {
      return res.status(404).json({ message: "User not found" }); // User doesn't exist
    }

    res.status(200).json({ message: "User deleted successfully" }); // Successful deletion
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

app.listen(9000, () => {
  console.log("server is running");
});
