var rooms = {};

module.exports = function (socket) {

    socket.on('join', (data) => {

        const room = data.room;

        if (room === socket.room) return;

        rooms[room] = rooms[room] || 0;

        if(rooms[room] >= 2) return socket.emit('deny', {});

        rooms[room] ++;

        socket.room = room;
        socket.join(room);

        socket.to(room).emit('join');
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

    socket.on('disconnect', () => {
        if(socket.room) {
            rooms[socket.room] --;

            if(rooms[socket.room] < 0) rooms[socket.room] = 0;

            socket.to(socket.room).emit('leave', {});
        }
    });
};