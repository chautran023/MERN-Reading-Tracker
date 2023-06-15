import express from 'express';
const router = express.Router();
import testUser from '../middleware/testUser.js'
import {
  createItem,
  deleteItem,
  getAllItems,
  updateItem,
  showStats,
} from '../controllers/itemsController.js';

router.route('/').post(testUser, createItem).get(getAllItems);
// remember about :id
router.route('/stats').get(showStats);
router.route('/:id').delete(testUser, deleteItem).patch(testUser, updateItem);

export default router;
