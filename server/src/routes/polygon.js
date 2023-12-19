import express from 'express';
import polygonController from '../handler/polygonController.js';
const routes = express();

routes.post('/store-polygon-with-values', polygonController.storeArea)

routes.get('/get-polygons-with-values', polygonController.getAreas )

routes.post('/delete-polygon/:areaId', polygonController.deleteArea)

routes.post('/update-polygon-coordinate/:areaId', polygonController.updateAreaCoordinates )

routes.post('/update-polygon-values/:areaId', polygonController.updateAreaValues )

routes.get('/check-polygon-area', polygonController.checkPolygonArea)

routes.get('/check-distance', polygonController.checkDistance)

export default routes