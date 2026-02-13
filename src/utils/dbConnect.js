const { default: mongoose } = require("mongoose");
import dns from "dns/promises";

const dbConnect = async () => {
  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);

    const connection = await mongoose.connect(`${process.env.MONGODB_URI}`, {
      ssl: true,
      dbName: "nextcv",
    });
    if (connection) {
      console.log(
        `MongoDB connected successfully to ${connection.connection.host}`,
      );
    }
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default dbConnect;
