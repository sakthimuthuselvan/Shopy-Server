const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { UserSchema, } = require("../models/userCreateModels")
const { OtpShema } = require("../models/otpModel")

const createUser = async (req, res) => {
  const { name, phone, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserSchema.create({
      name,
      phone,
      email,
      password: hashedPassword,
      lastLogin: ""
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const user = await UserSchema.findOne({ email });
  console.log(user);

  try {
    if (!email || !password) {
      return res.status(400).json({ response: "failure", message: "Invalid email or password" })
    }
    const isValidPassword = await bcrypt.compare(password, user.password)
    console.log("isValidPassword ", isValidPassword);
    if (!isValidPassword) {
      return res.status(400).json({ response: "failure", message: "Your password is incorrect. please try again." })
    }
    const token = jwt.sign({ user_id: user._id }, "_SHOPY", { expiresIn: '2min' })
    const data = await UserSchema.updateOne({ email }, { lastLogin: new Date() })
    console.log(data);
    return res.status(200).json({ response_type: "success", response_message: "Login Successfully", data: { token: token } })
  } catch {
    res.status(500).json({ response: "failure", message: err.message })
  }
}


const generateOtp = () => {
  let random = parseInt(Math.random() * 999999)
  return random;
}


const forgotOtpSend = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ response: "failure", message: "Invalid email" });
    }

    const user = await UserSchema.findOne({ email });

    if (!user) {
      return res.status(400).json({ response: "failure", message: "User not found with the provided email" });
    }

    const otpVal = generateOtp();
    await OtpShema.create({ email, otp: otpVal });

    await emailSendFun(otpVal, email, user.name);

    return res.status(200).json({ response_type: "success", response_message: "OTP sent successfully" });
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ response: "failure", message: "Internal Server Error" });
  }
};

const emailSendFun = async (otpVal, email, userName) => {
  try {
    const emailContent = `
      <html>
        <head>
          <style>
            /* Add your custom CSS styles here */
          </style>
        </head>
        <body>
          <p>Dear ${userName || 'User'},</p>
          <p>You have requested to reset your password for your Shopy account. To complete the password reset process, please use the following OTP (One-Time Password):</p>
          <p><strong>${otpVal}</strong></p>
          <p>This OTP is valid for 5 minutes. If you did not request a password reset, please ignore this email.</p>
          <p>Thank you for using Shopy!</p>
          <p>Best regards,<br/>The Shopy Team</p>
        </body>
      </html>
    `;

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.PASSWORD
      },
    });

    // Define the email options
    const mailOptions = {
      from: process.env.EMAIL_ID, // Sender email address
      to: email, // Recipient email address (from request body)
      subject: "Shopy - Password Reset OTP",
      html: emailContent,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error:', error);
    throw error; // Re-throw the error to be caught by the calling function
  }
};


const forGotOptSubmit = async (req, res) => {
  const { email, opt } = req.body;
  const userCheck = await OtpShema.findOne({ email })
  if (!email) {
    return res.status(400).json({ response: "failure", message: "Email field is required" })

  } else if (!userCheck) {
    return res.status(400).json({ response: "failure", message: "OTP is expired" })
  }

  if (userCheck.otp !== opt) {
    return res.status(400).json({ response: "failure", message: "OTP is wrong" })
  }

  return res.status(200).json({ response: "success", message: "OTP verified successfully" })

}


const resetPassword=async (req, res) => {
  const { email,password } = req.body;

  if(!email || !password){
    return res.status(400).json({ response: "failure", message: "Email or password field is required" })
  }else{
    const data = await UserSchema.findOne({ email })
    if(!data){
      return res.status(400).json({ response: "failure", message: "Invaild Email" })
    }
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  await UserSchema.updateOne({ email }, { password: hashedPassword })

  return res.status(200).json({ response: "success", message: "Password reset successfully" })


}

module.exports = { createUser, loginUser, forgotOtpSend, forGotOptSubmit,resetPassword }