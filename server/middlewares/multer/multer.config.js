const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const uploadDir = path.join(__dirname, '../../uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + uuidv4();
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /mp4|avi|mkv|jpg|jpeg|png|gif|wav|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Only mp4|avi|mkv|jpg|jpeg|png|gif|wav files are allowed!'));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 100 * 1024 * 1024 },
    fileFilter: fileFilter
});

module.exports = upload;
