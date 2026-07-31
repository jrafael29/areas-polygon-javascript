import newAreaFormComponent from "./component/NewAreaFormComponent.js";
import PolygonAreaService from "./service/PolygonAreaService.js";
import mapComponent from "./component/MapComponent.js";
import SimulateQueryFromAreaFormComponent from "./component/SimulateQueryFromAreaFormComponent.js";
import SimulateQueryFromDistanceFormComponent from "./component/SimulateQueryFromDistanceFormComponent.js";

export default class View {
  static init() {
    mapComponent.init({
      lat: -23.613198990745662, 
      lng: -46.575505679359296, 
      viewZoom: 9,
      drawFeature: true
    });

    // listen para os formularios de criação e simulação de área e distancia
    newAreaFormComponent.listenSubmit();
    SimulateQueryFromAreaFormComponent.listenSubmit()
    SimulateQueryFromDistanceFormComponent.listenSubmit()

    // busca e exibe areas no mapa
    PolygonAreaService.getAreas();

    const currentFormKey = "CurrentForm"
    
    document.getElementById("toggleSimulationVisibility").addEventListener('click', () => {
      SimulateQueryFromDistanceFormComponent.toggleVisibility()
      SimulateQueryFromAreaFormComponent.toggleVisibility();

      const isFormDistanceHide = SimulateQueryFromDistanceFormComponent.isHide()
      const isFormAreaHide = SimulateQueryFromAreaFormComponent.isHide()

      if(isFormAreaHide){
        // salvar distancia como form atual
        localStorage.setItem(currentFormKey, "distance");
      }
      if(isFormDistanceHide){
        // salvar area como form atual 
        localStorage.setItem(currentFormKey, "area");
      }
    })

    const setCurrentForm = () => {

      if(!localStorage.getItem(currentFormKey)){
        // seta area como padrao
        SimulateQueryFromAreaFormComponent.toggleVisibility();
        return;
      }

      if(localStorage.getItem(currentFormKey) === "distance"){
        SimulateQueryFromDistanceFormComponent.toggleVisibility()
      }
      if(localStorage.getItem(currentFormKey) === "area"){
        SimulateQueryFromAreaFormComponent.toggleVisibility()
      }
    }
    setCurrentForm()
  }
}
