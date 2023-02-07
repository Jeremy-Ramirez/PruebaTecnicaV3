

//SERVER SIDE

const socketController =(socket)=>{

    console.log('Cliente conectado', socket.id);
    socket.on('disconnect',()=>{
        console.log('Cliente desconectado');
    })



    //MESSAGE FROM SERVER TO CLIENT SIDE


    socket.on('send-messages', (payload)=>{
        
        console.log('Mensaje desde el server recibido');

        socket.emit('enviar-mensaje', payload);
    })
}





module.exports= {socketController};