const { default: mongoose } = require("mongoose");

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.MONGODB_URI}/nextcv`
    );
    if (connection) {
      console.log(
        `MongoDB connected successfully to ${connection.connection.host}`
      );
    }
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default dbConnect;
