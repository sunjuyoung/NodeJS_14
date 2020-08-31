//const WebSocket = require('ws');
//ws 대신 socket.io
const SocketIO = require('socket.io');

module.exports = (server)=>{
   // const wss = new WebSocket.Server({server});
    const io = SocketIO(server,{path:'/socket.io'});

    io.on('connection',(socket)=>{ //웹소켓 연결 시
        const req = socket.request;
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('새로운 클라이언트 접속',ip);
        socket.on('disconnect',()=>{
            console.log('접속 해제',ip,socket.id);
            clearInterval(socket.interval);
        })

        socket.on('error',(error)=>{
            console.log(error);
        })

        socket.on('reply',(data)=>{ //클라이언트부터 메시지 수신 시
            console.log(data);
        })

        socket.interval = setInterval(()=>{
            socket.emit('news','Hello socket.io'); //이벤트이름, 데이터
        },3000);
    })

}