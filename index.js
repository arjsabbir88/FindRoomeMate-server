const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();

const port = process.env.port || 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@arjsabbir.9jwrtji.mongodb.net/?retryWrites=true&w=majority&appName=arjSabbir`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// run mongodb database
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const addListingCollection = client
      .db("addListing")
      .collection("roommates-listing");

    app.get("/roommates-listing", async (req, res) => {
      const result = await addListingCollection
        .find({ availability: "available" })
        .limit(6)
        .toArray();
      res.send(result);
    });

    app.get("/browse-listings", async (req, res) => {
      const result = await addListingCollection.find().toArray();
      res.send(result);
    });

    // get data form browser listing dynamically
    app.get("/browse-listings/details/:id", async (req, res) => {
      const id = req.params.id;
      const newDetailsId = new ObjectId(id);

      // console.log(newDetailsId)

      try {
        const knowDetails = await addListingCollection.findOne({
          _id: newDetailsId,
        });
        res.send(knowDetails);
      } catch (error) {
        res.send({ error: "faild to fetch details" });
      }
    });

    // get data form /myListing
    app.get("/my-listing", async (req, res) => {
      const userEmail = req.query.email;

      if (!userEmail) {
        return res.status(400).send({ error: "Email is required" });
      }
      try {
        const result = await addListingCollection
          .find({ email: userEmail })
          .toArray();
        res.send(result);
      } catch {
        res.send({ error: "Failed to fetch user listing" });
      }
      // res.send(result)
    });

    app.delete("/my-listing/:id", async (req, res) => {
      const id = req.params.id;
      try {
        const result = await addListingCollection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 1) {
          res.send({ success: true, message: "Deleted successfully" });
        } else {
          res
            .status(404)
            .send({ success: false, message: "No item found to delete" });
        }
      } catch (error) {
        res.status(500).send({ success: false, error: "Server Error" });
      }
    });

    app.put("/my-listing/:id", async (req, res) => {
      const id = req.params.id;
      const updateData = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: updateData,
      };

      try {
        const result = await addListingCollection.updateOne(filter, updateDoc);
        res.send(result);
      } catch (error) {
        res.send({ error: "Faild to update listing" });
      }
    });

    app.get("/my-listing/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };

      try {
        const listing = await addListingCollection.findOne(filter);
        if (!listing) {
          return res.status(404).send({ error: "Listing not found" });
        }
        res.send(listing);
      } catch (error) {
        res.status(500).send({ error: "Failed to fetch listing by ID" });
      }
    });

    app.patch("/details/:id/like", async (req, res) => {
      const id = req.params.id;

      if (!ObjectId.isValid(id)) {
        return res.status(400).send({ error: "Invalid ID format" });
      }

      try {
        const post = await addListingCollection.findOne({
          _id: new ObjectId(id),
        });
        if (!post) return res.status(404).send({ error: "Post not found" });

        if (typeof post.likeCount === "string") {
          await addListingCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { likeCount: parseInt(post.likeCount) || 0 } }
          );
        }

        const result = await addListingCollection.updateOne(
          { _id: new ObjectId(id) },
          { $inc: { likeCount: 1 } }
        );

        res.send(result);
      } catch (error) {
        console.error("Error updating like count:", error);
        res.status(500).send({ error: "Failed to update like count" });
      }
    });
    app.patch("/browse-listings/details/:id/like", async (req, res) => {
      const id = req.params.id;

      if (!ObjectId.isValid(id)) {
        return res.status(400).send({ error: "Invalid ID format" });
      }

      try {
        // Find the post first
        const post = await addListingCollection.findOne({
          _id: new ObjectId(id),
        });
        if (!post) return res.status(404).send({ error: "Post not found" });

        // If likeCount is string, convert it to number
        if (typeof post.likeCount === "string") {
          await addListingCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { likeCount: parseInt(post.likeCount) || 0 } }
          );
        }

        // Now safely increment
        const result = await addListingCollection.updateOne(
          { _id: new ObjectId(id) },
          { $inc: { likeCount: 1 } }
        );

        res.send(result);
      } catch (error) {
        console.error("Error updating like count:", error);
        res.status(500).send({ error: "Failed to update like count" });
      }
    });

    app.post("/roommates-listing", async (req, res) => {
      const newRoommate = req.body;
      console.log(newRoommate);
      const result = await addListingCollection.insertOne(newRoommate);
      res.send(result);
    });

    app.get("/roommates-listing/:id", async (req, res) => {
      const id = req.params.id;
      const detailsId = new ObjectId(id);

      try {
        const detailsPost = await addListingCollection.findOne({
          _id: detailsId,
        });
        res.send(detailsPost);
      } catch (error) {
        res.send({ error: "Faild to fetch details post" });
      }
    });

    // Send a ping to confirm a successful connection

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("finding roomMate in the server");
});

// app.listen(port, () => {
//     console.log("server is running on port ", port)
// })

module.exports = app;
