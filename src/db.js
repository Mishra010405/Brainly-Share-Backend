import mongoose, { Schema } from "mongoose";
mongoose.connect("mongodb://localhost:27017/brainly");
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
});
const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
//# sourceMappingURL=db.js.map