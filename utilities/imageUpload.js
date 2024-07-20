const express = require('express');
const multer = require('multer');
const app = express();

// Multer storage in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    try {
        const imgBase64 = req.file.buffer.toString('base64');
        console.log("imgBase64 ", imgBase64);

        res.status(200).json({ response_type: "success", response: imgBase64 })
    } catch (error) {
        res.status(200).json({ response_type: "error", response_message: error })

    }
});

app.post('/upload/multiple', upload.array('images', 10), async (req, res) => {
    console.log("req.files",req.files);
    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No files uploaded.');
    }
   
    const imagePromises = req.files.map(file => {
      const imgBase64 = file.buffer.toString('base64');
      return imgBase64
      // const newImage = new Image({
      //   name: file.originalname,
      //   data: imgBase64
      // });
      // return newImage.save();
    });
  
    try {
      await Promise.all(imagePromises);
      res.status(200).json({response:"success",response_type:imagePromises});
    } catch (err) {
      res.status(500).send(err);
    }
  });

module.exports = app;