
const express = require("express");
const route = express();
const mongoose = require('mongoose');
const { upload } = require("../uploadMiddleware");

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dhaxa1n5f',
  api_key: '677585651488992',
  api_secret: 'lUP7Ki39v9QotYncG64Ync61nNI'
});



const imageSchema = new mongoose.Schema({
  imageUrl: {
    type: String
  }
});
const Image = mongoose.model('Image', imageSchema);

route.post('/single/image/upload', upload.single('image'), async (req, res) => {
  console.log("req.file ", req.file);
  try {
    const imageUrl = `${req.file.path}`;
    cloudinary.uploader.upload(req.file.path, async (error, result) => {
      if (error) {
        return res.status(500).send(error);
      }
      const newImage = new Image({ imageUrl: result.secure_url });

      // res.json({ imageUrl: result.secure_url });
      await newImage.save();

      res.status(201).json({ imageUrl: result.secure_url });

    });
  } catch (error) {
    res.status(500).json({ response_type: "failure", error_response: 'Failed to upload image' });
  }
});

route.post('/multiple/image/upload', upload.array('images', 5), async (req, res) => {
  console.log("req.files ", req.files);

  if (!req.files) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  const urls = req.files.map(file => ({ imageUrl: file.path }));

  try {
    const savedImages = await Image.insertMany(urls);
    console.log("savedImages ", savedImages);

    const imagesWithUrls = await Image.find({ _id: { $in: savedImages.map(image => image._id) } });
    console.log("imagesWithUrls ", imagesWithUrls);

    res.json(imagesWithUrls);
  } catch (err) {
    console.error("Error saving images: ", err);
    res.status(500).send({ message: err.message });
  }
});



module.exports = route;