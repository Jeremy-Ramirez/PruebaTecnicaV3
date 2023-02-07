const { request, response } = require('express'); //sirve para el autocompletado
const bcryptjs = require('bcryptjs');
const { User } = require('../models/user');
const { generateJWT } = require('../helpers/generateJWT');


const login = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {

        //Verify if email exist
        const user = await User.findOne(
            { where: { email } }
        );

        if (!user) {
            return res.status(400).json({
                msg: 'User/Password incorrect -USER'
            });
        }

        //Compare password

        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'User/Password incorrect- PASSWORD'
            });
        }

        //Generate JWT
        const tokenjwt = await generateJWT(user.id);


        return res.json({
            user,
            tokenjwt
        })



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Something is wrong'
        })
    }

}

const userLogged =async(req,res)=>{

    const userAutenticated= req.user;
    try {

         return res.json({
            
            userAutenticated
        })
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            msg: 'Something is wrong'
        })

    }

}

module.exports = {
    login,
    userLogged
}