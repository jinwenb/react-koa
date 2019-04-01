const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/socket');
const Schema = mongoose.Schema;
const ChatSchema = new Schema({
    content: String,
    create_time: {type: Date},
    user_from: {type: String},
    user_to: {type: String},
    chat_id: {type: String},
    readCount:{type:Number,default:0}
});
module.exports = mongoose.model('chat', ChatSchema);