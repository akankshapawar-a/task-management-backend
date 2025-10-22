// Model/Card.js - Make sure this matches EXACTLY
import { Schema, model } from 'mongoose';
import checklistSchema from './checklistSchema.js';

const CardSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  
  // Labels
  label: [{
    labelColor: String,
    labelTitle: String
  }],
  
  // Dates
  startDate: {
    type: Date
  },
  dueDate: {
    type: Date
  },
  
  // Attachments
  attachments: [{
    fileName: String,
    filePath: String,
    fileSize: Number,
    fileType: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Checklists
  checklists: [checklistSchema],
  
  // Position/Order
  position: {
    type: Number,
    default: 0
  },
  
  // References
  columnId: {
    type: Schema.Types.ObjectId,
    ref: 'Column',
    required: true
  },
  boardId: {
    type: Schema.Types.ObjectId,
    ref: 'Board',
    required: true
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
CardSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// IMPORTANT: Check your collection name
// If your MongoDB collection is named something else (like 'task' instead of 'cards'),
// you need to specify it like this:
// const Card = model('Card', CardSchema, 'your_actual_collection_name');

const Card = model('Card', CardSchema);

// Debug: Log the collection name
console.log('📦 Card model collection name:', Card.collection.name);

export default Card;