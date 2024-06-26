import mongoose, { Schema } from 'mongoose';

const todoSchema = Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
    tags: {
      type: [String],
      required: true,
      default: [],
      index: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: {
        values: ['high', 'mid', 'low'],
        message: 'Priority can be either high, medium or low',
      },
      default: 'mid',
      index: true,
    },
  },
  { timestamps: true }
);

todoSchema.pre(/^find/, function (next) {
  this._v = undefined;
  next();
});
export const Todo = mongoose.model('Todo', todoSchema);
