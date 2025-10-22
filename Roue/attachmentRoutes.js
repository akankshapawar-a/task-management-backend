
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
