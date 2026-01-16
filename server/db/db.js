import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://notesuser:Mayu2001@cluster0.77rkzri.mongodb.net/notesapp?retryWrites=true&w=majority"
    );
    console.log("MongoDB connected successfully ✅");
  } catch (error) {
    console.error("MongoDB connection failed ❌", error.message);
  }
};

export default connectToMongoDB;
