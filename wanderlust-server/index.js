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

// export async function ConnectDB() {
//     try {
//     await client.connect();
//     console.log("You successfully connected to MongoDB!");
//     return client;
//   } catch (err) {
//     console.dir(err);
//   }
// }


export async function ConnectDB() {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB!");
    return client;
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
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


export default app




// import express from "express";
// import { MongoClient, ObjectId } from "mongodb";
// import cors from "cors";
// import "dotenv/config";
// import { createRemoteJWKSet, jwtVerify } from "jose";

// const app = express();
// const port = process.env.PORT || 8000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB configuration
// const mongoUri = process.env.MONGODB_URI;

// if (!mongoUri) {
//   throw new Error("MONGODB_URI is not configured.");
// }

// const client = new MongoClient(mongoUri);

// let clientPromise;

// function ConnectDB() {
//   if (!clientPromise) {
//     clientPromise = client.connect().catch((error) => {
//       clientPromise = undefined;
//       throw error;
//     });
//   }

//   return clientPromise;
// }

// const db = client.db("wanderlust");
// const destinationCollection = db.collection("destinations");
// const bookingCollection = db.collection("bookings");

// // Ensure MongoDB is connected before database requests.
// app.use(async (req, res, next) => {
//   try {
//     await ConnectDB();
//     next();
//   } catch (error) {
//     console.error("MongoDB connection failed:", error.message);

//     res.status(503).json({
//       message: "Database connection unavailable",
//     });
//   }
// });

// // JWT verification
// const verifyToken = async (req, res, next) => {
//   const authData = req.headers.authorization;

//   if (!authData || !authData.startsWith("Bearer ")) {
//     return res.status(401).json({
//       message: "Unauthorized access!",
//     });
//   }

//   const token = authData.split(" ")[1];
//   const clientUrl = process.env.CLIENT_URL;

//   if (!clientUrl) {
//     console.error("CLIENT_URL is not configured.");

//     return res.status(500).json({
//       message: "Authentication configuration error",
//     });
//   }

//   try {
//     const JWKS = createRemoteJWKSet(
//       new URL("/api/auth/jwks", clientUrl)
//     );

//     await jwtVerify(token, JWKS);
//     next();
//   } catch (error) {
//     console.error("JWT verification failed:", error.message);

//     return res.status(401).json({
//       message: "Invalid or expired token",
//     });
//   }
// };

// // Validate MongoDB document IDs
// const isValidObjectId = (id) => ObjectId.isValid(id);

// // Health check
// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "Wanderlust server is running",
//   });
// });

// // Test database connectivity
// app.get("/health", async (req, res) => {
//   try {
//     await db.command({ ping: 1 });

//     res.status(200).json({
//       status: "ok",
//       database: "connected",
//     });
//   } catch (error) {
//     console.error("Database health check failed:", error.message);

//     res.status(503).json({
//       status: "error",
//       database: "unavailable",
//     });
//   }
// });

// // Add destination
// app.post("/add-destination", verifyToken, async (req, res, next) => {
//   try {
//     const result = await destinationCollection.insertOne(req.body);

//     res.status(201).json({
//       message: "Destination added successfully",
//       insertedId: result.insertedId,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// // Get all destinations
// app.get("/all-destinations", async (req, res, next) => {
//   try {
//     const result = await destinationCollection.find({}).toArray();
//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// // Get featured destinations
// app.get("/feature-destinations", async (req, res, next) => {
//   try {
//     const result = await destinationCollection
//       .find({})
//       .limit(5)
//       .toArray();

//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// // Get destination by ID
// app.get("/destination/:id", verifyToken, async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     if (!isValidObjectId(id)) {
//       return res.status(400).json({
//         message: "Invalid destination ID",
//       });
//     }

//     const result = await destinationCollection.findOne({
//       _id: new ObjectId(id),
//     });

//     if (!result) {
//       return res.status(404).json({
//         message: "Destination not found",
//       });
//     }

//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// // Update destination
// app.patch("/destination/:id", verifyToken, async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { _id, ...updatedData } = req.body;

//     if (!isValidObjectId(id)) {
//       return res.status(400).json({
//         message: "Invalid destination ID",
//       });
//     }

//     const result = await destinationCollection.updateOne(
//       { _id: new ObjectId(id) },
//       { $set: updatedData }
//     );

//     if (result.matchedCount === 0) {
//       return res.status(404).json({
//         message: "Destination not found",
//       });
//     }

//     res.status(200).json({
//       message: "Destination updated successfully",
//       result,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// // Delete destination
// app.delete("/destination/:id", verifyToken, async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     if (!isValidObjectId(id)) {
//       return res.status(400).json({
//         message: "Invalid destination ID",
//       });
//     }

//     const result = await destinationCollection.deleteOne({
//       _id: new ObjectId(id),
//     });

//     if (result.deletedCount === 0) {
//       return res.status(404).json({
//         message: "Destination not found",
//       });
//     }

//     res.status(200).json({
//       message: "Destination deleted successfully",
//       result,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// // Create booking
// app.post("/booking", async (req, res, next) => {
//   try {
//     const result = await bookingCollection.insertOne(req.body);

//     res.status(201).json({
//       message: "Booking added successfully",
//       insertedId: result.insertedId,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// // Get bookings for a user
// app.get("/my-bookings/:email", verifyToken, async (req, res, next) => {
//   try {
//     const { email } = req.params;

//     const result = await bookingCollection
//       .find({ email })
//       .toArray();

//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// // Delete booking
// app.delete("/my-bookings/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     if (!isValidObjectId(id)) {
//       return res.status(400).json({
//         message: "Invalid booking ID",
//       });
//     }

//     const result = await bookingCollection.deleteOne({
//       _id: new ObjectId(id),
//     });

//     if (result.deletedCount === 0) {
//       return res.status(404).json({
//         message: "Booking not found",
//       });
//     }

//     res.status(200).json({
//       message: "Booking deleted successfully",
//       result,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// // Central error handler
// app.use((error, req, res, next) => {
//   console.error("API error:", error);

//   if (res.headersSent) {
//     return next(error);
//   }

//   res.status(500).json({
//     message: "Internal server error",
//   });
// });

// // Local development only.
// // Vercel serves the exported Express app as a function.
// if (process.env.NODE_ENV !== "production") {
//   app.listen(port, () => {
//     console.log(`Wanderlust server running on port ${port}`);
//   });
// }

// export default app;
