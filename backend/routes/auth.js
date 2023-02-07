const { Router } = require('express');
const { check } = require('express-validator'); //middleware
const { login, userLogged } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate');
const { validateJwt } = require('../middlewares/validateJWT');
//const { login } = require('../controllers/auth');

const router = Router();



//POST

router.post('/login',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        validateFields
    ], login)


//GET USER LOGGED

router.get('/userlogged', [
    validateJwt
], userLogged)


module.exports = router;
