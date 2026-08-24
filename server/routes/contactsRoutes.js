const express = require("express");

const router = express.Router();
const contactsController = require("../controllers/contactsController");

// 查詢全部聯絡訊息
router.get("/", contactsController.getContacts);

// 新增聯絡訊息
router.post("/", contactsController.createContact);

// 修改聯絡訊息
router.put("/:id", contactsController.updateContact);

// 刪除聯絡訊息
router.delete("/:id", contactsController.deleteContact);

module.exports = router;
