const express = require('express');
const router = express.Router();

const VideoDetails = require('../schemas/Video');

router.get('/:id', function(req, res, next) {
    const id = req.params.id;
    VideoDetails
        .findById(id, function (error, video) {
            if (error) {
                res.status(500).json(error);
            } else {
                res.status(200).json(video);
            }
        })
});

module.exports = router;
