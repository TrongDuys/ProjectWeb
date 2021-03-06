const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    role: {
      type: String,
      default: "user",
    },
    gender: {
      type: String,
      default: "male",
    },
    mobile: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    story: {
      type: String,
      default: "",
    },
    // website: {
    //   type: String,
    //   default: "",
    // },
    // background: {
    //   type: String,
    //   default: "https://images.pexels.com/photos/235615/pexels-photo-235615.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    // },
    // followers: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    // following: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    // saved: [{type: mongoose.Types.ObjectId, ref: 'user'}],
    // isBan: {type: Boolean, default: false},
    // isPrivate: {type: Boolean, default: false}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
