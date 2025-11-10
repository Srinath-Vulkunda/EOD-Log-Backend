import { Router } from 'express';
import {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
  getGoalById,
  getGoalByUser,
  getGoalByUserAndDate,
} from '../controller/goalsController.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = Router();

router.get('/', verifyToken, getGoals);
router.get('/:id', verifyToken, getGoalById); 
router.post('/', verifyToken, createGoal);
router.put('/:id', verifyToken, updateGoal);
router.delete('/:id', verifyToken, deleteGoal);
router.get('/user/:id', verifyToken, getGoalByUser);
router.get('/user/:id/:date', verifyToken, getGoalByUserAndDate);

export default router;