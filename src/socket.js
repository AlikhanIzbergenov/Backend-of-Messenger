module.exports = io => {
  io.on('connection', function (socket) {
    console.log('A user connected:' + socket.id)
    io.emit('user joined', socket.id)

    socket.on('chat.message', function (message) {
      io.emit('chat.message', message)
    })

    socket.on('user typing', function (username) {
      io.emit('user typing', username)
    })
    socket.on('stopped typing', function (username) {
      io.emit('stopped typing', username)
    })

    socket.on('disconnect', function () {
      console.log('User left: ' + socket.id)

      socket.broadcast.emit('user left', socket.id)
    })
  })
}

// auth(socket, (guest, user) => {
//   if (!guest) {
//     socket.join('all')
//             socket.username = user.username
//             socket.emit('connected', `you are connected to chat as ${user.username}`)
//         }
// })

// socket.on('msg', content => {
//     const obj = {
//         date: new Date(),
//         content: content,
//         username: socket.username
//     };

//     MessageModel.create(obj, err => {
//         if(err) return console.error("MessageModel", err);
//         socket.emit("message", obj);
//         socket.to('all').emit("message", obj);
//     });
// });
// socket.on('receiveHistory', () => {
//     MessageModel
//         .find({})
//         .sort({date: -1})
//         .limit(50)
//         .sort({date: 1})
//         .lean()
//         .exec( (err, messages) => {
//             if(!err){
//                 socket.emit("history", messages);
//             }
//         })
// })
