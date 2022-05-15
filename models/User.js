import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide the First Name"],
    maxLength: 150,
    trim: true,
  },
  lastName: {
    type: String,
    maxLength: 150,
    trim: true,
  },
  userName: {
    type: String,
    required: [true, "Please provide the Username"],
    minLength: 3,
    maxLength: 20,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide the eMail"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid eMail",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide the password"],
    minLength: 6,
    select: false,
  },
  role: {
    type: String,
    required: [true, "Please provide the role"],
    enum: ["user", "admin"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/* (/)=>(/)=>(/)=>(/)=>(/)=>BEWARE!!! MONGOOSE MIDDLEWARES DONT SUPPORT FAT ARROW FUNCTIONS <=(/)<=(/)<=(/)<=(/)<=(/) */

// The middleware below only works on the queries that "SAVE" the document. For example, it wouldnt work on something like "findOneAndUpdate" because it essetially doesn't "SAVE" the document and "UPDATES" instead
// TODO: List for supported queries will be updated here soon
// TODO: exception handling for non-supported queries
UserSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

// This middleware ompares the user provided password(HASH) with the existing password(HASH) in the database using bcrypt
UserSchema.methods.comparePassword = async function (pwd) {
  const isMatch = await bcrypt.compare(pwd, this.password);
  return isMatch;
};

// This middleware will create the JWT for an existing user in the database
// This essentially means that this middleware can be called
UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET || "MYMILKSHAKEBRINGSALLTHEBOYSTOTHEYARD", { expiresIn: process.env.JWT_TTL });
};

// TODO: Resolve JWT for Login Route
UserSchema.methods.resolveJWT = function () {
  return "TODO";
};

export default mongoose.model("User", UserSchema);
