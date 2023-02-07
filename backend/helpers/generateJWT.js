const jwt = require('jsonwebtoken');

const generateJWT = (id = '') => {

    return new Promise((resolve, reject) => {

        const payload = { id };

        jwt.sign(payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: '1h'
            },
            (err, tokenjwt) => {
                if (err) {
                    console.log(err);
                    reject('A problem occurs generating jwt');
                } else {
                    resolve(tokenjwt);
                }
            });
    });

}


module.exports = {
    generateJWT
}