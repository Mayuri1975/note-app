import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://notesuser:Mayu2001@cluster0.77rkzri.mongodb.net/?appName=Cluster0"
    );
    console.log("Connected to MongoDB Atlas ✅");
  } catch (error) {
    console.error("Error connecting to MongoDB ❌", error.message);
  }
};

export default connectToMongoDB;
