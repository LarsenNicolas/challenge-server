const express = require('express');
const router = express.Router();
const multer = require('multer');
const Video = require('../schemas/Video');
const ffmpeg = require('ffmpeg');

const storage = multer.diskStorage({
   destination: (req, res, cb) => {
       cb(null, './media');
   },
   filename: (req, file, cb) => {
       cb(null, file.originalname );
   }
});

const createVideo = multer({
    storage: storage
})

router.post('/', createVideo.single('file'), (req, res, next) => {
    const process = new ffmpeg('./media/' + req.file.filename);
    process.then(function (video) {
        console.log("Video metadata " + video.metadata);
        const videoDetails = new Video({
            name:  req.file.filename,
            isFav: req.body.isFav,
            video_path: 'http://localhost:4000/videos/' + req.file.filename,
            creationDate: req.body.creationDate,
            videoMetaData: video.metadata
        });
        videoDetails
            .save()
            .then(result => {
                console.log(result);
                res.status(200).json(video.metadata);
            })
            .catch(err => {
                console.log(err);
            });



    }, function (err) {
        console.log('Error: ' + err);
    });
});

module.exports = router;