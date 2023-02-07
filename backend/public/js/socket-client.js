
//CLIENT SIDE


const socket = io();

socket.on('connect', ()=>{
     console.log('Conectado desde Front');
})

socket.on('disconnect', ()=>{
    console.log('Desconectado desde Front');
})

//LISTEN MESAGES FROM THE SERVER

socket.on('send-message', (payload)=>{

    console.log(payload);
})



// btnEnviar.addEventListener('click', ()=>{
    
//     const mensaje= txtMensaje.value;

//     enviar desde el cliente a el servidor
//     //socket.emit('enviar-mensaje', mensaje);

//     socket.emit('enviar-mensaje', mensaje, (id)=>{

//         console.log('Desde el server te regreso este mensaje si todo salio bien ', id);
//     });


// })