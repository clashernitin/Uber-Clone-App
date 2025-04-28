const captainController = require('../controllers/captain.controller');
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authMiddleWare = require('../middlewares/auth.middleware');


router.post('/register', [
    body('fullName.firstName').isLength({ min: 4 }).withMessage('First name must be at least 4 characters long'),
    body('fullName.lastName').isLength({ min: 4 }).withMessage('Last name must be at least 4 characters long'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').notEmpty().withMessage('Vehicle color is required'),
    body('vehicle.plate').notEmpty().withMessage('Vehicle plate is required'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'auto']).withMessage('Vehicle type is required'),
],
captainController.registerCaptain
);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],
captainController.loginCaptain
);

router.get('/profile',authMiddleWare.authCaptain , captainController.getCaptainProfile);

router.get('/logout', authMiddleWare.authCaptain, captainController.logoutCaptain);
module.exports = router;