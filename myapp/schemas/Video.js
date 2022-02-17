var mongoose = require('mongoose');

var videoSchema = mongoose.Schema({
    name:           { type: String, required: true},
    isFav:          { type: Boolean, required: true},
    video_path:     { type: String, required: true},
    creationDate:   { type: Date, required: true},
    // videoMetaData:  { type: Bson }
});

module.exports = mongoose.model('Video', videoSchema);