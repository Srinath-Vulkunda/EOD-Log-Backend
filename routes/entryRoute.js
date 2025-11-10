import { Router } from 'express';
import {
	getEntries,
	createEntry,
	updateEntry,
	deleteEntry,
	getEntryById,
	getEntryByUser,
	getEntriesByFilter,
} from '../controller/entryController.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = Router();

router.get('/', verifyToken, getEntries);
router.post('/', verifyToken, createEntry);
router.get('/user', verifyToken, getEntryByUser);
router.get('/filter', verifyToken, getEntriesByFilter);
router.get('/:id', verifyToken, getEntryById);
router.put('/:id', verifyToken, updateEntry);
router.delete('/:id', verifyToken, deleteEntry);

export default router;