import newAreaFormComponent from "./component/NewAreaFormComponent.js";
import PolygonAreaService from "./service/PolygonAreaService.js";
import mapComponent from "./component/MapComponent.js";
import simulateQueryFromAreaFormComponent from "./component/SimulateQueryFromAreaFormComponent.js";
import SimulateQueryFromDistanceFormComponent from "./component/SimulateQueryFromDistanceFormComponent.js";

export default class View {
  static init() {
    mapComponent.init({
      lat: -23.613198990745662, 
      lng: -46.575505679359296, 
      viewZoom: 12,
      drawFeature: true
    });

    newAreaFormComponent.listenSubmit();
    simulateQueryFromAreaFormComponent.listenSubmit()
    SimulateQueryFromDistanceFormComponent.listenSubmit()

    PolygonAreaService.getAreas();
    
    document.getElementById("toggleSimulationVisibility").addEventListener('click', () => {
      SimulateQueryFromDistanceFormComponent.toggleVisibility()
      simulateQueryFromAreaFormComponent.toggleVisibility();
    })
  }
}
