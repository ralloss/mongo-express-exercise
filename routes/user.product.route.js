const express = require('express');
const router = express.Router();

const userProductController = require('../controllers/user.product.controller');

router.get('/findall', userProductController.findAll);
router.get('/findone/:username', userProductController.findOne);
router.post('/create', userProductController.create);
router.patch('/update', userProductController.update);
router.delete('/delete/:username/:id', userProductController.delete);
router.get('/stats1', userProductController.stats1);
router.get('/stats2/:username', userProductController.stats2);

module.exports = router;