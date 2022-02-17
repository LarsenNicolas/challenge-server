const express = require('express');
const router = express.Router();
const Video = require('../schemas/Video');

router.delete('/:id', function(req, res, next) {
    const id = req.params.id;
    Video.findByIdAndRemove({_id: id})
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

module.exports = router;