const Palette = require('../models/Palette');

// @desc    Create a new palette
// @route   POST /api/palettes
// @access  Private
const createPalette = async (req, res) => {
  try {
    const { name, colors, isPublic, tags } = req.body;

    if (!name || !colors || colors.length < 3) {
      return res.status(400).json({ message: 'Please provide name and at least 3 colors' });
    }

    const palette = await Palette.create({
      name,
      colors,
      userId: req.user._id,
      isPublic: isPublic || false,
      tags: tags || [],
    });

    res.status(201).json(palette);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's palettes
// @route   GET /api/palettes/user
// @access  Private
const getUserPalettes = async (req, res) => {
  try {
    const palettes = await Palette.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(palettes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all public palettes
// @route   GET /api/palettes/public
// @access  Public
const getAllPublicPalettes = async (req, res) => {
  try {
    const palettes = await Palette.find({ isPublic: true })
      .sort({ createdAt: -1 })
      .populate('userId', 'name');
    res.json(palettes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a palette
// @route   PUT /api/palettes/:id
// @access  Private
const updatePalette = async (req, res) => {
  try {
    const palette = await Palette.findById(req.params.id);

    if (!palette) {
      return res.status(404).json({ message: 'Palette not found' });
    }

    if (palette.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedPalette = await Palette.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updatedPalette);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a palette
// @route   DELETE /api/palettes/:id
// @access  Private
const deletePalette = async (req, res) => {
  try {
    const palette = await Palette.findById(req.params.id);

    if (!palette) {
      return res.status(404).json({ message: 'Palette not found' });
    }

    if (palette.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Palette.findByIdAndDelete(req.params.id);
    res.json({ message: 'Palette removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPalette,
  getUserPalettes,
  getAllPublicPalettes,
  updatePalette,
  deletePalette,
};
