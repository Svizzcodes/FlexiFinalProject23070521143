const express = require('express');
const {
  createPalette,
  getUserPalettes,
  getAllPublicPalettes,
  updatePalette,
  deletePalette,
} = require('../controllers/paletteController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createPalette);
router.get('/user', protect, getUserPalettes);
router.get('/public', getAllPublicPalettes);
router.put('/:id', protect, updatePalette);
router.delete('/:id', protect, deletePalette);

module.exports = router;
