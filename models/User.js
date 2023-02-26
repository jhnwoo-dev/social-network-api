const { Schema, model } = require("mongoose");

// Schema to create Student model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: "Email address is required",
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please use a valid email address",
            ],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        virtuals: {
            friendCount: {
                get() {
                    return this.friends.length;
                },
            },
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

const User = model("user", userSchema);
module.exports = User;
