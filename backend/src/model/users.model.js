import mongoose, {Schema} from "mongoose";
import {eMailRegex} from '../constants.js'; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          return eMailRegex.test(value);
        },
        message: "{VALUE} is not a valid email",
      },
    },
    password: {
      type: String,
      minLength: [6, 'Password must be at least 6 characters'],
      required: [true, "Password is required."],
      
    },
    role:{
        type:String,
        default:"user"
    },
    refreshToken: {
      type: String,
    },

    favourites: [{
        type: Schema.Types.ObjectId,
        ref: "Blog"
    }]
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function(next){
  if(!this.isModified("password")) return next();
  // hash the password before saving to the database
  this.password =  await bcrypt.hash(this.password, 10)
  next();
})

userSchema.methods.isPasswordValid = async function(password){

  //Compares the plain text password against the saved password
  return await bcrypt.compare(password, this.password);
}

userSchema.methods.getAccessToken = function(){
  // generate an access token for the user
    return jwt.sign({
      _id: this._id,
      email:this.email
    }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
};

userSchema.methods.getRefreshToken = function(){

    return jwt.sign({
      _id: this._id
    }, process.env.REFRESH_TOKEN_SECRET, 
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}



export const User = mongoose.model("User", userSchema);



