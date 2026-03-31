import express, { Request } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import UserModel, { ContentModel, LinkModel } from "./db.js";
import { JWT_PASSWORD } from "./config.js";
import { userMiddleware } from "./middleware.js";
import { Random } from "./utils.js";

const app = express();
app.use(express.json());

// add this
interface AuthRequest extends Request {
    userId?: string;
}

app.post("/api/v1/brain/signin", async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    const existinguser  = await UserModel.findOne({
        username,
        password
    });

    if(existinguser) {
        const token = jwt.sign({
            id: existinguser._id
        },
        JWT_PASSWORD);

        res.json({ token });
    } else {
        res.status(403).json({
            message: "Incorrect Credentials"
        });
    }
});

app.post("/api/v1/brain/signup", async (req,res) => {
    const username = req.body.username;
    const password = req.body.password; //  fixed

    try {
        await UserModel.create({
            username: username,
            password: password
        });

        res.json({
            message: "User Signed Up"
        });
    } catch(error) {
        res.status(411).json({
            message: "User Already Exist"
        });
    }
});

app.post("/api/v1/brain/content", userMiddleware , async (req: AuthRequest,res) => {
    const link = req.body.link;
    const type  = req.body.type;

    await ContentModel.create({
        link,
        type,
        userId : req.userId, //  fixed
        tags: []
    });

    res.json({
        message: "Content  added"
    });
});

app.get("/api/v1/brain/content" , userMiddleware , async (req: AuthRequest,res) => {
    const userId = req.userId; //  fixed

    const content = await ContentModel.find({
        userId : userId
    }).populate("userId", "username");

    res.json({ content });
});

app.delete("/api/v1/brain/delete" ,userMiddleware, async (req: AuthRequest,res) => {
    const contentId = req.body.contentId;

    await ContentModel.deleteMany({
        _id: contentId, //  fixed
        userId : req.userId
    });

    res.json({
        message: "Deleted "
    });
});

//  removed duplicate empty route

app.post("/api/v1/brain/share", userMiddleware, async (req: AuthRequest,res) => {
    const share = req.body.share;

    if(share) {
        await LinkModel.create({
            userId : req.userId, //  fixed
            hash : Random(10)
        });
    } else {
        await LinkModel.deleteOne({
            userId : req.userId,
        });
    }

    res.json({
        message: "Updated Sharable Link"
    });
});

app.post("/api/v1/brain/:shareLink", async (req,res) => {
    const hash  = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash: hash 
    });

    if(!link) {
        return res.status(411).json({ //  fixed
            message : "Sorry inCorrect input"
        });
    }

    const content = await ContentModel.find({
        userId: link.userId
    });

    const user = await UserModel.findById(link.userId); //  fixed

    if(!user) {
        return res.status(401).json({ //  fixed
            message: "User not found , error should ideolly not happened "
        });
    }

    res.json({
        username: user.username,
        content : content
    });
});

app.listen(3000);