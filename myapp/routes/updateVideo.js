const express = require('express');
const router = express.Router();
const Video = require('../schemas/Video');

router.patch('/:id/:isFav', function(req, res, next) {
    console.log("El id " + req.params.id);
    console.log("El boolean " + req.params.isFav);
    const id = req.params.id;
    Video.findByIdAndUpdate({_id: id},
        {
            isFav: req.params.isFav
        })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json(err);
        });

});

module.exports = router;
