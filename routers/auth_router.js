const router = require('express').Router();
const authController = require('../controllers/auth_controller');
const validationMiddleware = require('../middlewares/validation_middleware');
const authMiddleware = require('../middlewares/auth_middleware');

router.get('/login', authMiddleware.signOutControl, authController.getLogin);
router.post('/login', authMiddleware.signOutControl, validationMiddleware.loginValidate(), authController.postLogin);

router.get('/register', authMiddleware.signOutControl, authController.getRegister);
router.post('/register', authMiddleware.signOutControl, validationMiddleware.registerValidate(), authController.postRegister);

module.exports = router;