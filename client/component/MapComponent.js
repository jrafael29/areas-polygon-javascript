import Utils from "../utils/Utils.js";
import Enum from "../utils/enum.js";
import routes from "../utils/routes.js";
import fetch from "../utils/fetch-util.js";
import PolygonAreaService from '../service/PolygonAreaService.js'

// componente do mapa.
export default new (class MapComponent {
  map;
  drawFeature;
  constructor() {}

  init({ lat, lng, viewZoom = 10, drawFeature = false }) {
    this.map = L.map("map").setView([lat, lng], viewZoom);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      this.map
    );
    if (drawFeature) {
      this.initDrawFeature();
      this.initDrawListeners();
    }
  }

  initDrawFeature() {
    this.drawFeature = new L.FeatureGroup();
    this.map.addLayer(this.drawFeature);

    const drawControls = new L.Control.Draw({
      draw: {
        rectangle: false,
        circle: false,
        marker: false,
        circlemarker: false,
        polyline: false,
      },

      edit: {
        featureGroup: this.drawFeature,
      },
    });
    this.map.addControl(drawControls);
    return this.drawFeature;
  }

  initDrawListeners() {
    this.map.on(L.Draw.Event.CREATED, this.onDrawCreated.bind(this));

    this.map.on("draw:edited", this.onDrawEdited.bind(this));

    this.map.on("draw:deleted", this.onDrawDeleted.bind(this));
  }

  addMarker(lat, lng, text = false) {
    if (text) {
      L.marker([lat, lng]).addTo(this.drawFeature).bindPopup(text).openPopup();
      return true;
    }
    L.marker([lat, lng]).addTo(this.drawFeature);
    return true;
  }

  createPolygon({
    id = 0, // 0
    value = 0,
    coordinates = [], // [ [], [] ]
    color = "black", // foobar
  }) {
    const polygon = L.polygon(coordinates, { color, id });
    polygon.id = id;

    polygon.addTo(this.drawFeature);

    if (value) {
      const valueArea = `R$ ${value ?? 0}`;
      polygon
        .bindTooltip(valueArea, {
          permanent: true,
          direction: "center",
          className: "custom-tooltip",
        })
        .openTooltip();
    }

    return polygon;
  }

  onDrawCreated(e) {
    const layerCreated = e.layer;
    this.drawFeature.addLayer(layerCreated);
    const coordinates = Utils.transformCoordinatesToArrayOfObjects(
      layerCreated.toGeoJSON().geometry.coordinates[0]
    );

    localStorage.setItem(
      Enum.enumStorageKeys.LastPolygon,
      JSON.stringify(coordinates)
    );
  }

  onDrawEdited(e) {
    var layers = e.layers;
    layers.eachLayer(async function (layer) {
      const areaId = layer.id;
      const editedCoordinates = Utils.transformCoordinatesToArrayOfObjects(
        layer.toGeoJSON().geometry.coordinates[0]
      );
      const resultEditCoords = await PolygonAreaService.updateArea({
        id: areaId,
        coordinates: editedCoordinates
      })
    });
  }

  async onDrawDeleted(e) {
    if (!confirm("confirmar?")) return false;
    const id = Utils.extractLayerIdFromLeafletEvent(e);
    const url = routes.DeletePolygonArea(id);

    await fetch.postRequest(url, false);

    // extractDataFromLeafletEvent(e);
    window.location.reload();
  }
})();
