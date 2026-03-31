import mongoose from "mongoose";
declare const UserModel: mongoose.Model<{
    username?: string | null | undefined;
    password?: string | null | undefined;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    username?: string | null | undefined;
    password?: string | null | undefined;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    username?: string | null | undefined;
    password?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    username?: string | null | undefined;
    password?: string | null | undefined;
}, mongoose.Document<unknown, {}, {
    username?: string | null | undefined;
    password?: string | null | undefined;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    username?: string | null | undefined;
    password?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    username?: string | null | undefined;
    password?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    username?: string | null | undefined;
    password?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default UserModel;
export declare const ContentModel: mongoose.Model<{
    type: string;
    tags: mongoose.Types.ObjectId[];
    userId: mongoose.Types.ObjectId[];
    authorId: mongoose.Types.ObjectId;
    link?: string | null | undefined;
    tittle?: string | null | undefined;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    type: string;
    tags: mongoose.Types.ObjectId[];
    userId: mongoose.Types.ObjectId[];
    authorId: mongoose.Types.ObjectId;
    link?: string | null | undefined;
    tittle?: string | null | undefined;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    type: string;
    tags: mongoose.Types.ObjectId[];
    userId: mongoose.Types.ObjectId[];
    authorId: mongoose.Types.ObjectId;
    link?: string | null | undefined;
    tittle?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    type: string;
    tags: mongoose.Types.ObjectId[];
    userId: mongoose.Types.ObjectId[];
    authorId: mongoose.Types.ObjectId;
    link?: string | null | undefined;
    tittle?: string | null | undefined;
}, mongoose.Document<unknown, {}, {
    type: string;
    tags: mongoose.Types.ObjectId[];
    userId: mongoose.Types.ObjectId[];
    authorId: mongoose.Types.ObjectId;
    link?: string | null | undefined;
    tittle?: string | null | undefined;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    type: string;
    tags: mongoose.Types.ObjectId[];
    userId: mongoose.Types.ObjectId[];
    authorId: mongoose.Types.ObjectId;
    link?: string | null | undefined;
    tittle?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    type: string;
    tags: mongoose.Types.ObjectId[];
    userId: mongoose.Types.ObjectId[];
    authorId: mongoose.Types.ObjectId;
    link?: string | null | undefined;
    tittle?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    type: string;
    tags: mongoose.Types.ObjectId[];
    userId: mongoose.Types.ObjectId[];
    authorId: mongoose.Types.ObjectId;
    link?: string | null | undefined;
    tittle?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
