import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, // every entry must belong to a user
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    completed: {
      type: [String],
      required: [true, 'Please list what you completed'],
    },
    struggles: {
      type: [String],
      default: [],
    },
    nextSteps: {
      type: [String],
      default: [],
    },
    mood: {
      type: String,
      enum: ['happy', 'neutral', 'tired', 'stressed', 'productive','calm'],
      default: 'neutral',
    },
    tags: {
      type: [String],
      default: [],
    },
    isPublic: {
      type: Boolean,
      default: false, // if later you want shared entries
    },
  },
  { timestamps: true }
);

// Optional: ensure one entry per user per day
// entrySchema.index({ user: 1, date: 1 }, { unique: true });

const Entry = mongoose.model('Entry', entrySchema);

export default Entry;
