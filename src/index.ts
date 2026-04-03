import express, { Request } from "express";
import jwt from "jsonwebtoken";
import UserModel, { ContentModel, LinkModel } from "./db.js";
import { JWT_PASSWORD } from "./config.js";
import { userMiddleware } from "./middleware.js";
import { Random } from "./utils.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

interface AuthRequest extends Request {
    userId?: string;
}

app.post("/api/v1/brain/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const existinguser = await UserModel.findOne({
        username,
        password
    });

    if (existinguser) {
        const token = jwt.sign({
            id: existinguser._id
        }, JWT_PASSWORD);

        res.json({ token });
    } else {
        res.status(403).json({
            message: "Incorrect Credentials"
        });
    }
});

app.post("/api/v1/brain/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        await UserModel.create({
            username: username,
            password: password
        });

        res.json({
            message: "User Signed Up"
        });
    } catch (error) {
        res.status(411).json({
            message: "User Already Exist"
        });
    }
});

app.post("/api/v1/brain/content", userMiddleware, async (req: AuthRequest, res) => {
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;  // ✅ added title

    await ContentModel.create({
        link,
        type,
        title,             // ✅ added title
        userId: req.userId,
        tags: []
    });

    res.json({
        message: "Content added"
    });
});

app.get("/api/v1/brain/content", userMiddleware, async (req: AuthRequest, res) => {
    const userId = req.userId;

    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username");

    res.json({ content });
});

app.delete("/api/v1/brain/delete", userMiddleware, async (req: AuthRequest, res) => {
    const contentId = req.body.contentId;

    await ContentModel.deleteMany({
        _id: contentId,
        userId: req.userId
    });

    res.json({
        message: "Deleted"
    });
});

app.post("/api/v1/brain/share", userMiddleware, async (req: AuthRequest, res) => {
    const share = req.body.share;

    if (share) {
        await LinkModel.create({
            userId: req.userId,
            hash: Random(10)
        });
    } else {
        await LinkModel.deleteOne({
            userId: req.userId,
        });
    }

    res.json({
        message: "Updated Sharable Link"
    });
});

app.post("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash: hash
    });

    if (!link) {
        return res.status(411).json({
            message: "Sorry incorrect input"
        });
    }

    const content = await ContentModel.find({
        userId: link.userId
    });

    const user = await UserModel.findById(link.userId);

    if (!user) {
        return res.status(401).json({
            message: "User not found"
        });
    }

    res.json({
        username: user.username,
        content: content
    });
});

app.listen(3000);