const express = require("express");
const { login, logout, register } = require("../controllers/UserAuthController");
const { addUser, changePassword, getAllUser, updateUser, getSingleUserData, deleteUser } = require("../controllers/addUserController");
const UserAuthRouter = express.Router();

UserAuthRouter.post("/register", register);
UserAuthRouter.post("/login", login);
UserAuthRouter.post("/logout", logout);
UserAuthRouter.post("/adduser",addUser )
UserAuthRouter.post("/changePassword",changePassword)
UserAuthRouter.get("/allusers", getAllUser)
UserAuthRouter.put("/updateuser/:id", updateUser)
UserAuthRouter.get("/singleuserdata/:id",getSingleUserData)
UserAuthRouter.delete("/deleteuser/:id",deleteUser )

module.exports = UserAuthRouter;
