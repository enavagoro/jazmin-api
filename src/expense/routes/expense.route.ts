import { Router } from 'express';
import { list, insert, update, deleteExpense, getById, listByUserId } from '../controllers/expense.controller';

class ExpenseRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes(): void {
        this.router.get('/', list);
        this.router.post('/', insert);
        this.router.patch('/:id', update);
        this.router.delete('/:id', deleteExpense);
        this.router.get('/:id', getById);
        this.router.get('/byUserId/:userId', listByUserId);
    }
}

const expenseRoutes = new ExpenseRoutes();
export default expenseRoutes.router;