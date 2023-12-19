import polygonData from "../data/polygonData.js";
import TurfDistanceService from '../gateway/distance/TurfDistanceService.js';
import OpenRouteDistanceService from '../gateway/distance/OpenRouteDistanceService.js';
import GetDistanceBetweenTwoPointsUseCase from "../usecase/GetDistanceBetweenTwoPointsUseCase.js";

async function storeArea(req, res) {
  try{
    const data = {
      polygonCoordinates: req.body.coordinates,
      description: req.body.description,
      valueArea: req.body.valueArea,
      colorArea: req.body.colorArea,
    }
    await polygonData.insert(data);
    return res.status(201).json({ success: true, data }).end();
  }catch(error){
    console.error('storeArea error', error.message);
    return res.status(500).json({success: false, message: 'erro interno'})
  }
}

async function getAreas(req, res) {
  try {
    const result = await polygonData.getAll();
    return res.status(200).json({ success: true, data: result }).end();
  } catch (error) {
    console.log("checkDistance error:", error);
    return res.status(500).json({ success: false, message: "erro interno" }).end();
  }
}

async function deleteArea(req, res) {
  try {
    const areaId = req.params.areaId;

    if (!areaId) {
      return res.status(400).json({ success: false, message: 'parametros inválidos' }).end();
    }
    const result = await polygonData.deleteArea({ idArea: areaId });
    return res.json({ success: true }).end();
  } catch (error) {
    console.log("checkDistance error:", error);
    return res.status(500).json({ success: false, message: "erro interno" }).end();
  }
}

async function updateAreaValues(req, res) {
  const areaId = req.params.areaId;
  // dont receive area coordinates, only the other fields.
  const data = req.body;
  // data = { description, value, color }
  if (!areaId) return res.status(400).json({ success: false, message: 'parametros inválidos' }).end();
  try {
    const data = {
      id: areaId,
      description: data.description,
      valueArea: data.valueArea,
      colorArea: data.colorArea,
    }
    await polygonData.updateAreaValues(data);

    return res.status(200).json({ success: true, data }).end();
  } catch (error) {
    console.log("error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: 'erro interno' })
      .end();
  }
}

async function updateAreaCoordinates(req, res) {
  try {
    const areaId = req.params.areaId;
    const data = req.body;
    if (!areaId) return res.status(400).json({ success: false }).end();

    const result = await polygonData.updateAreaCoordinates({
      id: areaId,
      polygonCoordinates: JSON.parse(data.coordinates),
    });
    return res.status(200).json({success: true}).end();
  } catch (error) {
    console.log("checkDistance error:", error);
    return res.status(500).json({ success: false, message: "erro interno" }).end();
  }
}

async function checkPolygonArea(req, res) {
  console.log("checar areas", req.query);
  const { lat, lng } = req.query;

  if (!lat || !lng) return res.json({ success: false }).end();

  try {
    const result = await polygonData.checkPolygonArea({ lat, lng });

    if (result.length) {
      return res.status(200).json({success: true,data: result,}).end();
    }

    return res.status(200).json({ success: true, data: [] });
  } catch (error) {
    console.error("checkPolygonArea error:", error.message);
    return res.status(500).json({ success: false, message: 'erro interno' });
  }
}

async function checkDistance(req, res) {
  try {
    const { firstLat, firstLng, secondLat, secondLng } = req.query;

    if(!firstLat || !firstLng || !secondLat || !secondLng)
      return res.status(400).json({ error: true, message: "parametros inválidos" }).end();

      const turfDistanceService = new TurfDistanceService();
      const openRouteDistanceService = new OpenRouteDistanceService();
      // use qualquer um dos use-cases para obter a distancia.

      const getDistanceBetweenTwoPointsUseCase = new GetDistanceBetweenTwoPointsUseCase(openRouteDistanceService);
      const result = await getDistanceBetweenTwoPointsUseCase.execute(firstLat, firstLng, secondLat, secondLng)

      return res.status(200).json({ success: true, data: result }).end();
  } catch (error) {
    console.log("checkDistance error:", error);
    return res.status(500).json({ success: false, message: "erro interno" }).end();
  }
}

export default {
  storeArea,
  getAreas,
  deleteArea,
  updateAreaValues,
  updateAreaCoordinates,
  checkPolygonArea,
  checkDistance,
};
