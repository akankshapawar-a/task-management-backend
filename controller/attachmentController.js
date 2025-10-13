// controllers/attachmentController.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Column from '../Model/Column.model.js'

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept images, documents, and archives
  const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|xls|xlsx|txt|zip|rar/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images, PDFs, documents, and archives are allowed.'));
  }
};

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: fileFilter
});

// Upload attachment
export const uploadAttachment = async (req, res) => {
  try {
    const { cardId } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Find the card in any column
    const column = await Column.findOne({ 'cards._id': cardId });
    if (!column) {
      // Delete uploaded file if card not found
      fs.unlinkSync(file.path);
      return res.status(404).json({ message: 'Card not found' });
    }

    const card = column.cards.id(cardId);
    if (!card) {
      fs.unlinkSync(file.path);
      return res.status(404).json({ message: 'Card not found' });
    }

    // Create attachment object
    const attachment = {
      fileName: file.originalname,
      filePath: file.path,
      fileSize: file.size,
      fileType: file.mimetype,
      fileUrl: `/uploads/${file.filename}`,
      uploadedAt: new Date()
    };

    // Add attachment to card
    card.attachments.push(attachment);
    card.updatedAt = new Date();

    await column.save();

    res.status(200).json({
      message: 'File uploaded successfully',
      card: card
    });
  } catch (error) {
    console.error('Upload error:', error);
    // Clean up file if upload fails
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
};

// Get all attachments for a card
export const getAttachments = async (req, res) => {
  try {
    const { cardId } = req.params;

    const column = await Column.findOne({ 'cards._id': cardId });
    if (!column) {
      return res.status(404).json({ message: 'Card not found' });
    }

    const card = column.cards.id(cardId);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.status(200).json({
      attachments: card.attachments || []
    });
  } catch (error) {
    console.error('Get attachments error:', error);
    res.status(500).json({ message: 'Error fetching attachments', error: error.message });
  }
};

// Delete attachment
export const deleteAttachment = async (req, res) => {
  try {
    const { cardId, attachmentId } = req.params;

    const column = await Column.findOne({ 'cards._id': cardId });
    if (!column) {
      return res.status(404).json({ message: 'Card not found' });
    }

    const card = column.cards.id(cardId);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    const attachment = card.attachments.id(attachmentId);
    if (!attachment) {
      return res.status(404).json({ message: 'Attachment not found' });
    }

    // Delete file from filesystem
    if (fs.existsSync(attachment.filePath)) {
      fs.unlinkSync(attachment.filePath);
    }

    // Remove attachment from card
    card.attachments.pull(attachmentId);
    card.updatedAt = new Date();

    await column.save();

    res.status(200).json({
      message: 'Attachment deleted successfully',
      card: card
    });
  } catch (error) {
    console.error('Delete attachment error:', error);
    res.status(500).json({ message: 'Error deleting attachment', error: error.message });
  }
};

// Download attachment
export const downloadAttachment = async (req, res) => {
  try {
    const { cardId, attachmentId } = req.params;

    const column = await Column.findOne({ 'cards._id': cardId });
    if (!column) {
      return res.status(404).json({ message: 'Card not found' });
    }

    const card = column.cards.id(cardId);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    const attachment = card.attachments.id(attachmentId);
    if (!attachment) {
      return res.status(404).json({ message: 'Attachment not found' });
    }

    // Check if file exists
    if (!fs.existsSync(attachment.filePath)) {
      return res.status(404).json({ message: 'File not found on server' });
    }

    // Set headers for download
    res.setHeader('Content-Type', attachment.fileType);
    res.setHeader('Content-Disposition', `attachment; filename="${attachment.fileName}"`);

    // Stream the file
    const fileStream = fs.createReadStream(attachment.filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Download attachment error:', error);
    res.status(500).json({ message: 'Error downloading attachment', error: error.message });
  }
};