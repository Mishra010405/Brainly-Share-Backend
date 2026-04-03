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

    const existinguser = await UserModel.findOne({ username, password });

    if (existinguser) {
        const token = jwt.sign({ id: existinguser._id }, JWT_PASSWORD);
        res.json({ token });
    } else {
        res.status(403).json({ message: "Incorrect Credentials" });
    }
});

app.post("/api/v1/brain/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        await UserModel.create({ username, password });
        res.json({ message: "User Signed Up" });
    } catch (error) {
        res.status(411).json({ message: "User Already Exist" });
    }
});

app.post("/api/v1/brain/content", userMiddleware, async (req: AuthRequest, res) => {
    const { link, type, title } = req.body;

    try {
        await ContentModel.create({
            link,
            type,
            title,
            userId: req.userId,
            tags: []
        });
        res.json({ message: "Content added" });
    } catch (e) {
        res.status(500).json({ message: "Failed to add content" });
    }
});

app.get("/api/v1/brain/content", userMiddleware, async (req: AuthRequest, res) => {
    try {
        const content = await ContentModel.find({
            userId: req.userId
        }).populate("userId", "username");
        res.json({ content });
    } catch (e) {
        res.status(500).json({ message: "Failed to fetch content" });
    }
});

app.delete("/api/v1/brain/delete", userMiddleware, async (req: AuthRequest, res) => {
    const contentId = req.body.contentId;

    try {
        await ContentModel.deleteMany({
            _id: contentId,
            userId: req.userId
        });
        res.json({ message: "Deleted" });
    } catch (e) {
        res.status(500).json({ message: "Failed to delete content" });
    }
});

app.post("/api/v1/brain/share", userMiddleware, async (req: AuthRequest, res) => {
    const share = req.body.share;

    try {
        if (share) {
            
            const existing = await LinkModel.findOne({ userId: req.userId });
            if (existing) {
                res.json({
                    message: "Link already exists",
                    hash: existing.hash
                });
                return;
            }

            const hash = Random(10);
            await LinkModel.create({
                userId: req.userId,
                hash: hash
            });

            res.json({
                message: "Sharable link created",
                hash: hash
            });
        } else {
            await LinkModel.deleteOne({ userId: req.userId });
            res.json({ message: "Sharable link removed" });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    try {
        const link = await LinkModel.findOne({ hash });

        if (!link) {
            return res.status(411).json({ message: "Sorry incorrect input" });
        }

        const content = await ContentModel.find({ userId: link.userId });
        const user = await UserModel.findById(link.userId);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        res.json({ username: user.username, content });
    } catch (e) {
        res.status(500).json({ message: "Internal server error" });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});