module.exports = function (socket) {

    socket.on('join', (data) => {

        const room = data.room;

        if (room === socket.room) return;

        socket.room = room;
        socket.join(room);
    });

    socket.on('ready', (data) => {
        data.from = socket.id;
        socket.to(socket.room).emit('ready', data);
    });

    socket.on('ice', (data) => {
        data.from = socket.id;
        socket.to(socket.room).emit('ice', data);
    });

    socket.on('offer', (data) => {
        data.from = socket.id;
        socket.to(socket.room).emit('offer', data);
    });

    socket.on('answer', (data) => {
        data.from = socket.id;
        socket.to(socket.room).emit('answer', data);
    });
};