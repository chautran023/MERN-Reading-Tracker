import express from 'express';
const router = express.Router();

import {
  createItem,
  deleteItem,
  getAllItems,
  updateItem,
  showStats,
} from '../controllers/itemsController.js';

router.route('/').post(createItem).get(getAllItems);
// remember about :id
router.route('/stats').get(showStats);
router.route('/:id').delete(deleteItem).patch(updateItem);

export default router;
