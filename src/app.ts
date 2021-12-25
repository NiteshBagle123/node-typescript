import express, { Request, Response, NextFunction} from 'express';
import todoRoutes from './routes/todos';
import { json } from 'body-parser';
const app = express();

app.use(json());

app.use('/todo', todoRoutes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => { });

app.listen(3000);