const SocketIO = require('socket.io');

module.exports = (server)=>{
    const io = SocketIO(server,{path:'/socket.io'});

    //클라이언트가 접속했을때 발생하고 콜백으로 소켓 객체를 제공
    //io 와 socket객체가 핵심이다
    io.on('connection',(socket)=>{
        const req = socket.request;
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('새로운 클라이언트 접속',ip,socket.id,req.ip);
        socket.on('disconnection',()=>{
            console.log('클라이언트 접속 해제',ip,socket.id);
            clearInterval(socket.interval);
        });
        socket.on('error',(error)=>{
            console.log(error);
        })
        //사용자가 직접만든 이벤트
        //클라이언트에서 reply라는 이벤트명으로 데이터를 보낼때 서버에서 받는 부분
        socket.on('reply',(data)=>{
            console.log(data);
        })
        socket.interval=setInterval(()=>{
            socket.emit('news','Hello'); //news 라는 이벤트 이름으로 hello socket.io라는 데이터를 클라이언트로로 전송
        },3000);
    })
};
