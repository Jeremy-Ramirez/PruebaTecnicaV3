const { gen } = require('n-digit-token');

const generateNToken =()=>{   
    
    const token= gen(6);
    return token;
}

module.exports= {
    generateNToken,
}