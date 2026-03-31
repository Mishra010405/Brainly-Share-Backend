import mongoose, { mongo, Schema } from "mongoose";
import {model} from "mongoose";

mongoose.connect("mongodb+srv://shivam05:Mishra010405@cluster0.3nlkglu.mongodb.net/brainly")

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
})

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;

const CotentSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true
    },

    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },

    tags: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Tag"
        }
    ]
}, { timestamps: true });

const LinkSchema = new Schema({
    hash: {
        type: String,
        required: true,
        unique: true
    },

    link: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true
    },

    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },

    tags: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Tag"
        }
    ]
});



export const LinkModel  = model("Links" , LinkSchema)
export const ContentModel = model("Content" , CotentSchema);