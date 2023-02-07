
const express = require('express');
const cors = require('cors');

const { dbConntection } = require('../database/config');
const {socketController}= require('../controllers/sockets/socket-controller')


class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        this.tokensPath = '/api/tokens';
        this.authPat = '/api/auth';

        //SOCKETS
       this.server = require('http').createServer(this.app);
       this.io = require('socket.io')(this.server);


        //DATABASE CONNECTION 
        this.connectDB();

        //MIDDLEWARES

        this.middlewares();

        //ROUTES

        this.routes();

        //INIT SOCKETS
        this.sockets();

    }


    async connectDB() {


        try {

            await dbConntection.authenticate();
            //dbConntection.sync();
            console.log('Database Online');

        } catch (error) {

            throw new Error(error);

        }


    }


    //ROUTES
    routes() {

        this.app.use(this.usersPath, require('../routes/users'));
        this.app.use(this.tokensPath, require('../routes/tokens'));
        this.app.use(this.authPat, require('../routes/auth'));

    }

    //LISTEN

    
    //MIDDLEWARES

    middlewares() {

        this.app.use(cors());
        this.app.use(express.static('public'));
        this.app.use(express.json())

    }

    sockets() {
        

        this.io.on('connection',socketController)
        
    }


    listen() {

        this.server.listen(this.port, () => {
            console.log('Server online on port: ', this.port);
        });
    }

}
module.exports = {
    Server
}