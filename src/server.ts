import path from 'path';
import express from 'express'
import '../config/passport-setup';
import UsersRoutes from './routes/UsersRoutes';
import ItemsRoutes from './routes/ItemsRoutes';
import PointsRoutes from './routes/PointsRoutes';
import CategoriesRoutes from './routes/CategoriesRoutes';
import ProductsRoutes from './routes/ProductsRoutes';
import OrdersRoutes from './routes/OrdersRoutes';
import AuthRoutes from './routes/AuthRoutes';
import ProfileRoutes from './routes/ProfileRoutes';
import cors from 'cors';
import passport from 'passport';
//import '../config/getEnv';

const app = express();

app.use(cors());

app.use(express.json());

app.use(passport.initialize());

app.use('/users', UsersRoutes);
app.use('/items', ItemsRoutes);
app.use('/points', PointsRoutes);
app.use('/categories', CategoriesRoutes);
app.use('/products', ProductsRoutes);
app.use('/orders', OrdersRoutes);
app.use('/auth', AuthRoutes);
app.use('/profile', ProfileRoutes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(process.env.PORT || 3333);