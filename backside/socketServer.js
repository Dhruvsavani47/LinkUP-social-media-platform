const users = [];

export const socketServer = (socket, io) => {
    socket.on('joinUser', id => {
        users.push({id, socketId: socket.id});
    })

    socket.on('disconnect',() => {
        const user = users.filter(user => user.socketId !== socket.id);
    })

    // like - unlike

    socket.on('likePost', newPost => {
        const ids = [...newPost.user.friends, newPost.user._id];
        const clients = users.filter(user => ids.includes(user.id));

        if(clients.length > 0) {
            clients.forEach(client => {
                io.to(client.socketId).emit('likeToClient', newPost);
            })
        }
    })

    socket.on('unLikePost', newPost => {
        const ids = [...newPost.user.friends, newPost.user._id];
        const clients = users.filter(user => ids.includes(user.id));

        if(clients.length > 0) {
            clients.forEach(client => {
                io.to(client.socketId).emit('unLikeToClient', newPost);
            })
        }
    })

    // comment

    socket.on('createComment', newPost => {
        const ids = [...newPost.user.friends, newPost.user._id];
        const clients = users.filter(user => ids.includes(user.id));

        if(clients.length > 0) {
            clients.forEach(client => {
                io.to(client.socketId).emit('createCommentToClient', newPost);
            })
        }
    })

    socket.on('deleteComment', newPost => {
        const ids = [...newPost.user.friends, newPost.user._id];
        const clients = users.filter(user => ids.includes(user.id));

        if(clients.length > 0) {
            clients.forEach(client => {
                io.to(client.socketId).emit('deleteCommentToClient', newPost);
            })
        }
    })

    // profile 

    socket.on('addfriend', newUser => {
        const user = users.find(user => user.id === newUser._id)

        user && io.to(user.socketId).emit('addfriendToClient', newUser);       
    })

    socket.on('unfriend', newUser => {
        const user = users.find(user => user.id === newUser._id)

        user && io.to(user.socketId).emit('unfriendToClient', newUser);       
    })

    socket.on('createNotify', msg => {
        const clients = users.filter(user => msg.recipients.includes(user.id));

        if(clients.length > 0) {
            clients.forEach(client => {
                io.to(client.socketId).emit('createNotifyToClient', msg);
            })
        }
    })

    socket.on('removeNotify', msg => {
        const clients = users.filter(user => msg.recipients.includes(user.id));

        if(clients.length > 0) {
            clients.forEach(client => {
                io.to(client.socketId).emit('removeNotifyToClient', msg);
            })
        }
    })

    socket.on('addMessage', msg => {
        const user = users.find(user => user.id === msg.recipient);

        user && io.to(user.socketId).emit('addMessageToClient', msg);
    })
}