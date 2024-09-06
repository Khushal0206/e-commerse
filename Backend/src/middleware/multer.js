const multer = require('multer');
// const upload = multer();

// Parse form data
//app.use(upload.any());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
      console.log(file)
       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })
  module.exports = upload;
  // console.log(upload)
  