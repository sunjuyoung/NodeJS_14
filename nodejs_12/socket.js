const SocketIO = require('socket.io');

module.exports = (server,app,sessionMiddleware)=>{
    const io = SocketIO(server,{path:'/socket.io'});
    app.set('io',io);//io객체 쓸수있게 저장 req.app.get('io');
    //of 네임스페이스를 부여하는 메서드
    //socket.io는 기본적으로 /네임스페이스에 접속한다
    const room = io.of('/room'); 
    const chat = io.of('/chat');

    io.use((socket,next)=>{
        sessionMiddleware(socket.request,socket.request.res,next);
    });

    room.on('connection',(socket)=>{
        console.log("room 접속");
        socket.on('disconnection',()=>{
            console.log('room 접속 해제');
        })
    })

    chat.on('connection',(socket)=>{
        console.log("chat 접속");
        const req = socket.request;
        const {headers:{referer}} = req; //socket.request.headers.referer
        console.log(referer);
        //URL에서 방아이디 추출
        const roomId = referer
                        .split('/')[referer.split('/').length-1]
                        .replace(/\?.+/,'');
            socket.join(roomId);
            socket.to(roomId).emit('join',{
                user:'system',
                chat:`${req.session.color}님이 입장하셨습니다.`
            })

            socket.on('disconnection',()=>{
                console.log('chat 접속 해제');
                socket.leave(roomId);
                //접속 해제시 현재 방의 수를 구해서 0명이면 방을 제거하는 HTTP 요청
                //socket.adapter.rooms[roomId]에 참여중인 소켓정보가 들어있다.
                const currentRoom = socket.adapter.rooms[roomId];
                const userCount = currentRoom ? currentRoom.length :0;
                if(userCount ===0){//접속자가 0이면 방삭제
                    
                }else{
                    socket.to(roomId).emit('exit',{
                        user:'system',
                        chat:`${req.session.color}님이 퇴장하셨습니다.`
                    })
                }
            })
    })
    
};
