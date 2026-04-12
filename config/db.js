const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://abhisonal:abhi9593@cluster0.tcjcjda.mongodb.net/?retryWrites=true&w=majority",
            { useNewUrlParser: true, useUnifiedTopology: true },
        );
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connectDB;


