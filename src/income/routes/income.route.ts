import { Router } from 'express';
import { list, insert, update, deleteIncome, getById, listByUserId } from '../controllers/income.controller';

class IncomeRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes(): void {
        this.router.get('/', list);
        this.router.post('/', insert);
        this.router.patch('/:id', update);
        this.router.delete('/:id', deleteIncome);
        this.router.get('/:id', getById);
        this.router.get('/byUserId/:userId', listByUserId);
    }
}

const incomeRoutes = new IncomeRoutes();
export default incomeRoutes.router;