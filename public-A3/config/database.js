require("dotenv").config();
const { MongoClient} = require("mongodb");

const uri = process.env.MONGO_URI;
if(!uri) {
    console.error("MONGO_URI is not set in .env file");
    process.exit(1);
}

const client = new MongoClient(uri, {useUnifiedTopology: true});

async function connectDB(){
    try{
        await client.connect();
        console.log("Connected to MongoDB");
    }catch (error){
        console.log("MongoDB connection error:", error);
        process.exit(1);
    }
}

connectDB();
const db = client.db("databasename") // EDIT

module.exports = {db, client}