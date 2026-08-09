const mongoose = require("mongoose");
const Course = require("./models/Course");
const courses = require("./courses");

async function seedCourses() {
    try {
        // 連接 MongoDB
        await mongoose.connect("mongodb://127.0.0.1:27017/pop_learning");

        console.log("MongoDB 連線成功！");

        // 先清除原本的課程資料，避免重複匯入
        await Course.deleteMany({});

        // 將 courses.js 的資料存入 MongoDB
        await Course.insertMany(courses);

        console.log("5 筆課程資料已成功匯入 MongoDB！");

        // 關閉 MongoDB 連線
        await mongoose.connection.close();

        console.log("MongoDB 連線已關閉。");
    } catch (error) {
        console.error("匯入失敗：", error);
        process.exit(1);
    }
}

seedCourses();