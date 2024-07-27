// const multer = require('multer');
// const path = require('path');


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });


// const upload = multer({ storage: storage });


// module.exports = { upload }

const multer = require('multer');

// Configure multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = { upload };
