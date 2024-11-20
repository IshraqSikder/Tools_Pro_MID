const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://newProject:Nirzon12345@ishn.o7skt.mongodb.net/?retryWrites=true&w=majority&appName=ISHN";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const usersCollection = client.db("employ").collection("users");

    // Add a new user
    app.post("/add-patient", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    // Get all users
    app.get("/get-patient", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    // Delete a user by ID
    app.delete("/delete-patient/:id", async (req, res) => {
      const id = req.params.id;
      const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    app.get("/get-patient/:id", async (req, res) => {
      const id = req.params.id;
      const user = await usersCollection.findOne({ _id: new ObjectId(id) });
      res.send(user);
    });

    // Update a user by ID
    app.patch("/update-patient/:id", async (req, res) => {
      const id = req.params.id; // Extract the ID from the request parameters
      const updatedUser = req.body; // Extract the updated data from the request body

      try {
        const result = await usersCollection.updateOne(
          { _id: new ObjectId(id) }, // Use the correct `id` variable
          { $set: updatedUser }
        );

        res.send({ success: true, result }); // Include a success flag for better client-side handling
      } catch (error) {
        console.error("Error updating patient:", error);
        res
          .status(500)
          .send({ success: false, message: "Failed to update patient" });
      }
    });

    console.log("You successfully connected to MongoDB!");
  } finally {
    // Leave the client open for reuse
    // await client.close();
  }
}
run().catch(console.dir);

// Root route
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
