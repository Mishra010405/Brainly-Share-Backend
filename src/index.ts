import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import UserModel, { ContentModel } from "./db.js";
import { JWT_PASSWORD } from "./config.js";
import { userMiddleware } from "./middleware.js";




const app = express();
app.use(express.json());

app.post("/api/v1/brain/signin", async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const existinguser  = await UserModel.findOne({
        username,
        password
    })
    if(existinguser) {
        const token = jwt.sign({
            id: existinguser._id
        },
        JWT_PASSWORD)
        res.json({
            token
        })
    }

    else {
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    }

})
app.post("/api/v1/brain/signup", async (req,res) => {
    const username = req.body.username;
    const password = req.body.username;

    try {
    await UserModel.create({
    username: username,
    password: password
})
    res.json({
    message: "User Signed Up"
}) }
    catch(error) {
        res.status(411).json({
            message: "User Already Exist"
        })
    }

})


app.post("/api/v1/brain/content", userMiddleware , async (req,res) => {
    const link = req.body.link;
    const type  = req.body.type;
    await ContentModel.create({
        link,
        type,
        // @ts-ignore
        userId : req.userID,
        tags: []
    })
    res.json({
        message: "Content  added"
    })

})

app.post("/api/v1/brain/content" , userMiddleware , async (req,res) => {
    // @ts-ignore
    const userID = req.userId;
    const content = await ContentModel.find({
        userID : userID
    }).populate("userID", "username")
    res.json({
        content
    })
})

app.delete("/api/v1/brain/delete" ,userMiddleware, async (req,res) => {
    const contentId = req.body.contentId;

    await ContentModel.deleteMany({
        contentId,
        // @ts-ignore
        userID : req.userID
    })

    res.json({
        message: "Deleted "
    })

})
app.post("/api/v1/brain/delete", (req,res) => {

})


app.post("/api/v1/brain/share", (req,res) => {

})
app.post("/api/v1/brain/:shareLink", (req,res) => {

})


app.listen(3000);