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

const CotentSchema = new Schema ({
    tittle: String,
    link : String,
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
    userId : [{type: mongoose.Types.ObjectId, ref: 'user', required : true}],
    authorId : {type: mongoose.Types.ObjectId , ref: 'user' , required: true},
    type: {type : String, required: true}
})

export const ContentModel = model("Content" , CotentSchema);