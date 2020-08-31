const WebSocket = require('ws');

module.exports = (server)=>{
    const wss = new WebSocket.Server({server});


    //웹 소켓 객체 ws에 이벤트 리스너 message,error,close

    wss.on('connection',(ws,req)=>{ //웹소켓 연결 시
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('새로운 클라이언트 접속',ip);
        ws.on('message',(message)=>{ //클라이언트로부터 메시지 수신 시
            console.log(message);
        });

        ws.on('error',(error)=>{
            console.log(error);
        })

        ws.on('close',()=>{
            console.log('클라이언트 접속 해제',ip);
            clearInterval(ws.interval);
        })

        
        ws.interval = setInterval(()=>{//3초마다 클라이언트로 메시지 전송
            if(ws.readyState === ws.OPEN){ //OPEN , CLOSING , CLOSED, CONNECTING
                ws.send('서버에서 클라이언트로 메시지를 보냅니다');
            }
        },3000);
    });
}