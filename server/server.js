const express = require("express");
const path = require("path");
const coursesRoutes = require("./routes/coursesRoutes");
const connectDB = require("./config/database");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// 連接 MongoDB
connectDB();

// 提供前端網站
app.use(express.static(path.join(__dirname, "..")));


// 課程 API
app.use("/api/courses", coursesRoutes);


// 測試 API
app.get("/api/hello", (req, res) => {
    res.json({
        message: "Pop! Learning 後端成功運作！"
    });
});


// 啟動伺服器
app.listen(PORT, () => {
    console.log(`伺服器已啟動：http://localhost:${PORT}`);
});