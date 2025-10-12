// Roue/attachmentRoutes.js (note: it's Route not Roue)
import express from 'express';
import {
  upload,
  uploadAttachment,
  getAttachments,
  deleteAttachment,
  downloadAttachment
} from '../controller/attachmentController.js';

const router = express.Router();

// Upload attachment
router.post('/:cardId/upload', upload.single('file'), uploadAttachment);

// Get all attachments
router.get('/:cardId', getAttachments);

// Delete attachment
router.delete('/:cardId/:attachmentId', deleteAttachment);

// Download attachment
router.get('/:cardId/:attachmentId/download', downloadAttachment);

export default router;


// In your main app.js or server.js, add:
// import attachmentRoutes from './Roue/attachmentRoutes.js';
// import express from 'express';
// app.use('/api/attachments', attachmentRoutes);
// app.use('/uploads', express.static('uploads'));