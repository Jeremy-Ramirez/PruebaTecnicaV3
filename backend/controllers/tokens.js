const { request, response } = require('express');
const { generateNToken } = require('../helpers/ntoken');
const { Token } = require('../models/token');

const schedule = require('node-schedule');
const fetch = require('node-fetch');

let userA;
let jwtuserA;

//POST
const tokenPost = async (req = request, res = response) => {

    try {

        const { id } = req.params;
        const jwtToken = req.headers['x-token'];
        jwtuserA=jwtToken;
        const token = generateNToken();

        const newToken = await Token.create({
            Token: token,
            User_id: id
        })

        const userAutenticated = req.user;
        userA=userAutenticated;

        return res.json({
            newToken,
            userAutenticated,
        })

    } catch (error) {

        console.log(error);
        return res.status(500).json(error);

    }


}

//GENERATE AUTOMATICALLY VIRTUAL TOKEN

const refreshtoken = schedule.scheduleJob('*/1 * * * *', () => {

    fetch(`http://localhost:8080/api/tokens/${userA.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "x-token": jwtuserA
        },
      })
        .then(resp => resp.json())
        .then((data) => {
          console.log(data);
        });

});


module.exports = {
    tokenPost
}