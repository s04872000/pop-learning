const Course = require("../models/Course");

// 查詢全部課程
async function getCourses(req, res) {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: "取得課程失敗" });
    }
}

// 新增課程
async function createCourse(req, res) {
    try {
        const course = await Course.create(req.body);
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({
            message: "新增課程失敗",
            error: error.message
        });
    }
}

// 修改課程
async function updateCourse(req, res) {
    try {
        const course = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!course) {
            return res.status(404).json({ message: "找不到課程" });
        }

        res.json(course);
    } catch (error) {
        res.status(400).json({
            message: "修改課程失敗",
            error: error.message
        });
    }
}

// 刪除課程
async function deleteCourse(req, res) {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);

        if (!course) {
            return res.status(404).json({ message: "找不到課程" });
        }

        res.json({ message: "課程刪除成功", course });
    } catch (error) {
        res.status(400).json({
            message: "刪除課程失敗",
            error: error.message
        });
    }
}

module.exports = {
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse
};