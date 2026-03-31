import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import UserModel from "./db.js";
const app = express();
app.use(express.json());
app.post("/api/v1/brain/signin", (req, res) => {
    const username = req.body.username;
});
app.post("/api/v1/brain/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.username;
    await UserModel.create({
        username: username,
        password: password
    });
    res.json({
        message: "User Signed Up"
    });
});
app.post("/api/v1/brain/content", (req, res) => {
});
app.post("/api/v1/brain/delete", (req, res) => {
});
app.post("/api/v1/brain/share", (req, res) => {
});
app.post("/api/v1/brain/:shareLink", (req, res) => {
});
// 
app.listen(3000);
//# sourceMappingURL=index.js.map