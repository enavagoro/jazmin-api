import express from 'express';
import * as dotenv from "dotenv";
import Database from './shared/services/mongoose.service';
// routes
import userRoutes from './user/routes/user.route';
import authRoute from './authorization/routes/auth.route';
import incomeRoute from './income/routes/income.route';
import expenseRoute from './expense/routes/expense.route';
import categoryRoute from './category/routes/category.route';
// middlewares
import { errorHandler } from './shared/middlewares/error.middleware';

class Server {
    public app: express.Application
    public port = 5100;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        dotenv.config();
        this.app.set('port', process.env.PORT || this.port);
        this.initCors();
        this.app.use(express.json());
        // Start BD
        const mongoDb = new Database();
        mongoDb.startConnection();
    }

    private initCors() {
        this.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range, userId');
            if (req.method === 'OPTIONS') {
                return res.sendStatus(200);
            } else {
                return next();
            }
        });
    }

    public routes(): void {
        express.Router();
        this.app.use('/user/', userRoutes);
        this.app.use('/auth/', authRoute);
        this.app.use('/category/', categoryRoute);
        this.app.use('/expense/', expenseRoute);
        this.app.use('/income/', incomeRoute);
        this.app.use(errorHandler);
    }

    async startServer() {
        try {
            this.app.listen(this.app.get('port'), () => {
                console.log('server running on port : ', this.app.get('port'));
            });
        } catch (err) {
            console.log('Error on start server:', err);
            process.exit(1)
        }
    }
}

const server = new Server();
server.startServer();