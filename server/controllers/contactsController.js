const Contact = require("../models/Contact");

// 查詢全部聯絡訊息
async function getContacts(req, res) {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "取得聯絡訊息失敗", error: error.message });
  }
}

// 新增聯絡訊息
async function createContact(req, res) {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({
      message: "新增聯絡訊息失敗",
      error: error.message
    });
  }
}

// 修改處理狀態
async function updateContact(req, res) {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({ message: "找不到聯絡訊息" });
    }

    res.json(contact);
  } catch (error) {
    res.status(400).json({
      message: "修改聯絡訊息失敗",
      error: error.message
    });
  }
}

// 刪除聯絡訊息
async function deleteContact(req, res) {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "找不到聯絡訊息" });
    }

    res.json({ message: "刪除成功" });
  } catch (error) {
    res.status(400).json({
      message: "刪除聯絡訊息失敗",
      error: error.message
    });
  }
}

module.exports = {
  getContacts,
  createContact,
  updateContact,
  deleteContact
};
