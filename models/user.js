const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/default.jpeg",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

// hash password using bcrypt
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(16);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Create a static function to find the user inside the database for signin
userSchema.statics.matchUser = async function (email, password) {
  const user = await this.findOne({ email });

  if (user) {
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      return user;
    }
    throw Error("Incorrect Password!");
  }
  throw Error("User not found!");
};

const User = model("user", userSchema);

module.exports = User;
