import express from 'express';
const routes = express();

import polygonRoutes from './polygon.js';

routes.use(polygonRoutes);

export {routes}