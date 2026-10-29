import express from "express";
import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config'
import cors from "cors";
import { createRemoteJWKSet, jwtVerify } from "jose";

const app = express()
const port = process.env.PORT || 8000

app.use(cors())
app.use(express.json())

const client = new MongoClient(process.env.MONGODB_URI);

export async function ConnectDB() {
    try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

const mongoClient = await ConnectDB()

const db = mongoClient.db("wanderlust");

const  destinationCollection = db.collection("destinations");

const bookingCollection = db.collection("bookings");


const verifyToken =  async (req, res, next) => {
  const authData = req.headers.authorization
  
  if (!authData) {
    return res.status(401).json({ message: "Unauthorized access!" });
  }

  
  const token = authData.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized access!" });
  }

  
  const JWKS = createRemoteJWKSet(new URL(`${process.env.CLIENT_URL}/api/auth/jwks`))

  
  try {
    const { payload } = await jwtVerify(token,JWKS)
    next()
  } catch (error) {
    console.error("JWT verification error:", error)
    return res.status(401).json({ message: "Server Error!" });
  }

}

// Middleware
app.get('/', (req, res) => {
  res.send('Wanderlust server is running')
})




// localhost:8000/add-destination
app.post("/add-destination", verifyToken, async(req,res) => {
  const data = req.body

  const result = await destinationCollection.insertOne(data)

  console.log("Destination added successfully:", result)
  

  console.log("Data from add destination:",data)
    
   res.send(result)
})


app.get("/all-destinations", async (req,res) => {
  const result = await destinationCollection.find({}).toArray()
  res.send(result)
})


app.get("/destination/:id", 
  verifyToken,
 
  async (req,res) => {

  const {id} = req.params
  const result = await destinationCollection.findOne({ _id: new ObjectId(id) })
  res.send(result)
})



app.patch("/destination/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { _id, ...updatedData } = req.body;

    const result = await destinationCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: updatedData,
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Destination not found",
      });
    }

    res.status(200).json({
      message: "Destination updated successfully",
      result,
    });
  } catch (error) {
    console.error("Error updating destination:", error);

    res.status(500).json({
      message: "Failed to update destination",
    });
  }
});


app.delete("/destination/:id", verifyToken, async (req,res) => {
  const {id} = req.params
  const result = await destinationCollection.deleteOne({ _id: new ObjectId(id) })
  res.json({ message: "Destination deleted successfully", result })
})


app.post("/booking", async(req,res) => {
  const data = req.body 
  const result = await bookingCollection.insertOne(data)
  console.log("Booking added successfully:", result)
  res.send(result)
})


// http://localhost:8000/my-bookings/
app.get("/my-bookings/:email", verifyToken, async (req,res) => {
  const {email} = req.params
  const result = await bookingCollection.find({ email: email }).toArray()
  res.send(result)
})




app.delete("/my-bookings/:id", async (req,res) => {
  const {id} = req.params
  const result = await bookingCollection.deleteOne({ _id: new ObjectId(id) })
  res.json({ message: "Booking deleted successfully", result })
})


app.get("/feature-destinations", async (req,res) => {
  const result = await destinationCollection.find({}).limit(5).toArray()
  res.send(result)
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
