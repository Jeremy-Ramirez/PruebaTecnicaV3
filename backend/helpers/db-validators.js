
const {User}= require('../models/user');

const existEmail =async (email='')=>{

   const exist= await User.findOne({ where: { email }});

   if(exist){
    throw new Error(`The email: ${email} already exist`);
   }
}

const existUser= async(id)=>{

    const existU= await User.findByPk(id);

    if(!existU){
        throw new Error(`The user with id: ${id} does not exist`);
    }
}



module.exports={
    existEmail,
    existUser
}