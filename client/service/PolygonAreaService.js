import routes from "../utils/routes.js";
import Utils from "../utils/Utils.js";
import areaOutputComponent from "../component/AreaOutputComponent.js";
import customFetch from "../utils/fetch-util.js";
import mapComponent from "../component/MapComponent.js";

export default class PolygonAreaService {
  static getAreas() {
    fetch(routes.GetPolygonAreas())
      .then((data) => data.json())
      .then(({ data }) => {
        if (data.length) {
          areaOutputComponent.addHeader();
          data.forEach(function (item) {
            areaOutputComponent.newAreaCard(item);

            const resultCoordinatesTransform =
              Utils.transformArrayOfObjectsCoordinatesToArrayOfArrays(
                item.poly[0]
              );
            mapComponent.createPolygon({
              id: item.id,
              value: item.value.toFixed(2),
              coordinates: resultCoordinatesTransform,
              color: item.color,
            });
          });
        }
      })
      .catch((error) => console.error("deu ruim ao buscar areas:", error));
  }

  static async storeArea({ description, value, color, coordinates }) {
    if (!description || !value || !color || !coordinates)
      throw new Error("parametros inválidos");

    const data = {
      description: description,
      valueArea: value,
      colorArea: color,
      coordinates: JSON.parse(coordinates),
    };
    console.log("data", data);
    const url = routes.StorePolygon();
    return await customFetch.postRequest(url, data);
  }

  static async updateArea({ id, coordinates }) {
    if (!id || !coordinates) throw new Error("parametros inválidos");
    const url = routes.UpdatePolygonCoordinates(id);
    const data = {
      coordinates: JSON.stringify(coordinates),
    };
    const resultEditCoords = await customFetch.postRequest(url, data);
    return resultEditCoords;
  }
}
