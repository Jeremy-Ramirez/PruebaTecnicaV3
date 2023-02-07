const { Router } = require('express');
const { check } = require('express-validator');
const { tokenPost } = require('../controllers/tokens');
const { existUser } = require('../helpers/db-validators');
const { validateJwt } = require('../middlewares/validateJWT');

const router = Router();


//POST

router.post('/:id',
    [
        validateJwt,
        check('id').custom(existUser)
    ],
    tokenPost);



module.exports = router;