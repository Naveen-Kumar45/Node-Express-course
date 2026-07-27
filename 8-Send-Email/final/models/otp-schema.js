const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const JWT = require('jsonwebtoken');

const otpSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      enum: ["email_verification", "password_reset"],
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      expires : 0
    },
  },
  {
    timestamps: true,
  }
);


otpSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.otp = await bcrypt.hash(this.otp,salt) 
})

otpSchema.methods.createVerificationToken = function(){
    return JWT.sign({
        userId : this.userId,
        purpose : this.purpose
    },
    process.env.JWT_SECRET_KEY,
    {
        expiresIn : '5m'
    })
}

otpSchema.methods.compareOTP= async function(otp){
    const match = await bcrypt.compare(otp,this.otp)
    return match
}


module.exports = mongoose.model("OTP", otpSchema);