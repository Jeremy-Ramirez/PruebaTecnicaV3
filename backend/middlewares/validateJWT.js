
const { response } = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const validateJwt = async (req, res = response, next) => {

    const tokenjwt = req.header('x-token');

    if (!tokenjwt) {
        return res.status(401).json({
            msg: 'This requirement does not have JWT'
        });
    }

    try {

        const {id}= jwt.verify(tokenjwt,process.env.SECRETORPRIVATEKEY);

        //Find user
        const user= await User.findByPk(id);

        if(!user){
            return  res.status(401).json({
                msg:'JWT not valid/User does not exist'
            })
        }

        //To receive information of the user logged

        const userAutenticado= await User.findByPk(id);
        req.user=userAutenticado;

        next();

        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'JWT not valid'
        })
    }

}


module.exports = {
    validateJwt
}