import databaseConnection from "../infra/database.js";

const AREA_TABLE_NAME = 'adlearn.areas'

function transformArrayOfObjectsToString(coordinates) {
  const coordinateStrings = coordinates.map(
    (coordinate) => `${coordinate.lat} ${coordinate.lng}`
  );
  return coordinateStrings.join(", ");
}

async function checkPolygonArea({lat, lng}){
  const query = `
  SELECT id, value, color, description FROM ${AREA_TABLE_NAME} WHERE ST_Contains(poly, POINT(${lat}, ${lng}));
  `;

  const [rows, fields] =  await databaseConnection.promise().query(query);

  return rows;
}

async function getAll(){
    const query = `
        SELECT * from adlearn.areas
    `
    const [rows, fields] = await databaseConnection.promise().query(query)
    return rows
}

async function insert({ polygonCoordinates, description = "", valueArea = 0, colorArea = "#000" }) {
  const stringCoordinates = transformArrayOfObjectsToString(polygonCoordinates);

  const query = `
        INSERT INTO ${AREA_TABLE_NAME} (poly, description, value, color) VALUES (
            st_polyfromtext('POLYGON((${stringCoordinates}))'),
            '${description}',
            ${valueArea},
            '${colorArea}'
        );
    `;
  return await databaseConnection
    .promise()
    .query(query);
}

async function deleteArea({idArea}){
  const query = `
    DELETE FROM ${AREA_TABLE_NAME} WHERE ID = ${idArea};
  `
  return await databaseConnection.promise().query(query);
}

async function updateAreaCoordinates({id, polygonCoordinates}){
  const stringCoordinates = transformArrayOfObjectsToString(polygonCoordinates);
  const query = `
    UPDATE ${AREA_TABLE_NAME} SET poly = st_polyfromtext('POLYGON((${stringCoordinates}))') WHERE id = ${id};
  `
  return await databaseConnection.promise().query(query);
}

async function updateAreaValues({id, description, valueArea, colorArea}){
  if(!id || !description || !valueArea || !colorArea) throw new Error("parametros inválidos")
  const query = `
    UPDATE ${AREA_TABLE_NAME} SET description = '${description}', value = ${valueArea}, color = '${colorArea}' WHERE id = ${id};`
    return await databaseConnection.promise().query(query)

}

export default {
  insert,
  getAll,
  deleteArea,
  updateAreaValues,
  updateAreaCoordinates,
  checkPolygonArea
};
