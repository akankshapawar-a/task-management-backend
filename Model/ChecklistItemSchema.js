// Model/ChecklistItemSchema.js
import { Schema } from 'mongoose';

const checklistItemSchema = new Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default checklistItemSchema;