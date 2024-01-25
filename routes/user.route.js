const express=require("express");
const {userController}=require("../controllers")
const router = express.Router();
console.log("user route")
router.get("/", userController.getUsers);
router.get("/:username",userController.getUserByUsername);

router.patch("/:username",userController.updateUser);

router.post("/:username", userController.addUser);
router.delete("/:username", userController.deleteUser);
module.exports = router;