const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const {User}= require('../models/user');
const { Token } = require('../models/token');

//POST
const usersPost = async (req = request, res = response) => {

    const { name, email, password } = req.body;

    try {

        //Verify email 

        //Encrypt password
        const salt = bcryptjs.genSaltSync();
        const passwordHash = bcryptjs.hashSync(password, salt);

        //Save on database
        const newUser=await User.create({
            name,
            email, 
            password: passwordHash
        })
            
           
        return res.json({
           newUser
         })

    } catch (error) {

        console.log(error);
        return res.status(500).json(error);
    }

}

//GET
const usersGet = async(req=request, res= response)=>{

    try{

        const users= await User.findAll();

        res.json({
            users
        })

    }catch(error){

        console.log(error);
        return res.status(500).json(error);
    }


}

//GETBYID
const usersGetID= async (req=request, res= response)=>{

    const {id}=req.params;

    try{

        const users= await User.findByPk(id);

        res.json({
            users
        })

    }catch(error){

        console.log(error);
        return res.status(500).json(error);
    }

}


//GET ALL TOKENS GENERATED BY THE USER

const usersTokens = async(req=request, res=response)=>{

    const {id}=req.params;

    const tokens=await Token.findAll({
        where: {User_id:id}
    })

    return res.json(
        tokens
    )
}


module.exports = {
    usersPost,
    usersGet,
    usersGetID,
    usersTokens
}