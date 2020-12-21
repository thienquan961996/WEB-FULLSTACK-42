const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String
    },
    description: String,
    imageUrl: {
      required: true,
      type: String
    },
    userId: {
      ref: 'User',
      type: mongoose.Types.ObjectId
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Post', PostSchema);