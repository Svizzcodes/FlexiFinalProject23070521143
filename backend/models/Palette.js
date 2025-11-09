const mongoose = require('mongoose');

const paletteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    colors: {
      type: [String],
      required: true,
      validate: {
        validator: function (v) {
          return v.length >= 3 && v.length <= 10;
        },
        message: 'Palette must have between 3 and 10 colors',
      },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    tags: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Palette', paletteSchema);
