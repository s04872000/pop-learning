const express = require("express");

const router = express.Router();

const coursesController = require("../controllers/coursesController");

// 查詢全部課程
router.get("/", coursesController.getCourses);

// 新增課程
router.post("/", coursesController.createCourse);

// 修改課程
router.put("/:id", coursesController.updateCourse);

// 刪除課程
router.delete("/:id", coursesController.deleteCourse);

module.exports = router;