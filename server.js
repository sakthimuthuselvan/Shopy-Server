const express = require("express");
const dbConnect = require("./config/database")
const userSignup = require("./routes/usersCreate");
const parentCategory = require("./routes/parentCategory")
const childCategory = require("./routes/childCategory")
const advertisment = require("./routes/advertisment")
const sliderCom = require("./routes/slider")
const product = require("./routes/product")

const addtoCart = require("./routes/addtoCart");
const whishList = require("./routes/wishList");

const mongoose = require('mongoose');
const { upload } = require("./uploadMiddleware")
const bodyParser = require('body-parser')

const singleImgUpload = require("./utilities/singleImgUpload");
const imageUpload = require("./utilities/imageUpload");

const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT;
const app = express();

app.use(bodyParser.json())
app.use(cors())

app.use('/uploads', express.static('uploads'));
dbConnect()

// const imageSchema = new mongoose.Schema({
//     imageUrl: {
//         type: String
//     }
// });


// const Image = mongoose.model('Image', imageSchema);

// app.post('/upload', upload.single('image'), async (req, res) => {
//     console.log("req.file ",req.file);
//     try {
//         const imageUrl = `${req.file.path}`;
//         const newImage = new Image({ imageUrl });
//         await newImage.save();
//         res.status(201).json({ imageUrl });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to upload image' });
//     }
// });

app.use("/",singleImgUpload)
app.use("/",imageUpload)

app.use("/shopy", userSignup)
app.use("/category", parentCategory)
app.use("/category", childCategory)
app.use("/addvertisment", advertisment)
app.use("/slider", sliderCom)
app.use("/product", product)

app.use("/shopy",addtoCart)
app.use("/shopy",whishList)


app.listen(port, () => {
    console.log("running port", port)
})