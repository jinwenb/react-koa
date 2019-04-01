let server = require('../app');
let db = require('../mysql/index');
const io = require('socket.io')(server);
const chat = require('../mongoose/chat');
io.on('connection', socket => {
    socket.on('message', async ({user_from, user_to, content}) => {
        let chat_id = [user_from, user_to].sort().join('_');
        let create_time = Date.now();
        new chat({chat_id, create_time, user_from, user_to, content}).save().then(async res => {
            let result = chat.findOne({user_from: res.user_from, _id: res._id}, (err, data) => {
                if (err) {
                } else {
                    let id = data._id;
                    io.emit('sendMsg', {...data._doc, id})
                }
            })
        })

    })
});