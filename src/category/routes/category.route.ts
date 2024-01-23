import { Router } from 'express';
import { list, insert, update, deleteCategory, getById, listByUserId, byCategoryType } from '../controllers/category.controller';

class CategoryRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes(): void {
        this.router.get('/', list);
        this.router.post('/', insert);
        this.router.patch('/:id', update);
        this.router.delete('/:id', deleteCategory);
        this.router.get('/:id', getById);
        this.router.get('/byUserId/:userId', listByUserId);
        this.router.post('/byCategoryType/:userId', byCategoryType);
    }
}

const categoryRoutes = new CategoryRoutes();
export default categoryRoutes.router;