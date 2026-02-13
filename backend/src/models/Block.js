import mongoose from 'mongoose';

const blockSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    index: true
  },
  owner: {
    type: String,
    default: null
  },
  ownerColor: {
    type: String,
    default: null
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index for efficient queries
blockSchema.index({ owner: 1, updatedAt: -1 });

const Block = mongoose.model('Block', blockSchema);

export default Block;

