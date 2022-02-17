const express = require('express');
const router = express.Router();

const VideoDetails = require('../schemas/Video');

router.get('/', function(req, res, next) {
    VideoDetails
        .find({$and: [{isFav: true}]})
        .exec()
        .then( videos => {
            res.status(200).json(videos)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;