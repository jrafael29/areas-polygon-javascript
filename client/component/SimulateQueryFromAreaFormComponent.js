import routes from "../utils/routes.js";
import fetch from "../utils/fetch-util.js";
import MapComponent from "./MapComponent.js";

// componente do formulario para simular busca por área
export default new (class SimulateQueryFromAreaFormComponent {
  #formName = "simulateQueryFormName";
  #formId = "simulateQueryFormId";
  #formElement = document.getElementById(`${this.#formId}`);

  constructor() {}

  toggleVisibility(){
    this.#formElement.classList.toggle("d-none");
  }

  listenSubmit() {
    this.#formElement.addEventListener("submit", this.handleSubmit.bind(this));
  }

  async handleSubmit(e) {
    e.preventDefault();

    

    const currentFormId = e.target.id;
    const formEl = document.forms.namedItem(currentFormId);

    if (!formEl) return false;
    const formData = new FormData(formEl);
    const [latitude, longitude] = ["lat", "lng"].map((item) => {
      return formData.get(item);
    });

    if(!latitude || !longitude) return false;

    MapComponent.addMarker(latitude, longitude)

    const targetUrl = routes.CheckPolygonArea();
    const query = {
      lat: latitude,
      lng: longitude,
    };
    const queryParams = new URLSearchParams(query);
    const queryString = queryParams.toString();
    const urlWithQueryStrings = `${targetUrl}?${queryString}`;

    const result = await fetch.getRequest(urlWithQueryStrings);
    if (result.success && result.data.length) {
      const real = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        });
      const notif = `O valor da área é: ${real.format(result.data[0].value)}`
      alert(notif)
      //   window.location.reload()
      return true;
    }
    alert("nenhuma area encontrada");
    // return false;
  }
})();

