const express = require('express');
const router = express.Router();
const wineController = require('../controllers/wineController');
const wineryController = require('../controllers/wineryController')
const usersController = require('../controllers/usersController')
const { pool } = require('../models/database')

/* ======== ROUTES ======== */

// ======= WINE CONTROLLER =========
router.get('/', wineController.homepage);
router.get('/wine/:id', wineController.getWine);
router.get('/getComposition/:id', wineController.getComposition);
router.post('/search', wineController.searchWine);

// ======= WINERY CONTROLLER =========
router.get('/bodegas', wineryController.bodegas);
router.get('/bodegas/:nombreBodega', wineryController.obtenerBodega);

// ======= USERS CONTROLLER =========
router.use('/auth', usersController.router);

module.exports = router;