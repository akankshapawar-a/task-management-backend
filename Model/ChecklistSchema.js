// Model/checklistSchema.js
import { Schema } from 'mongoose';
import checklistItemSchema from './ChecklistItemSchema.js';

const checklistSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  items: [checklistItemSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default checklistSchema;