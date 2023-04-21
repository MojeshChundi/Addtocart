const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();

router.post("/user/add-user", userController.addUser);
router.get("/user/get-user", userController.getUsers);
router.post("/user/edit-user", userController.updateUser);
router.post("/user/delete-user", userController.deleteUser);
module.exports = router;
