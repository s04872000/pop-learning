const mongoose = require("mongoose");

async function connectDB() {
    try {
        const mongoURI =
            process.env.MONGODB_URI ||
            "mongodb://127.0.0.1:27017/pop_learning";

        await mongoose.connect(mongoURI);

        console.log("MongoDB 連線成功！");
    } catch (error) {
        console.error("MongoDB 連線失敗：", error.message);
        process.exit(1);
    }
}

module.exports = connectDB;