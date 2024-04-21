const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
})
const upload = multer({ storage: storage })
const { validToken } = require('../middleware/validToken');
const { uploadData, generateView } = require('../controllers/storageController');

router.post('/uploadData', upload.single('file'), validToken, uploadData);
router.post('/generateView', validToken, generateView)

module.exports = router;