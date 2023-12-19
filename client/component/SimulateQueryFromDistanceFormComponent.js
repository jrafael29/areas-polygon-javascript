import routes from "../utils/routes.js";
import fetch from "../utils/fetch-util.js";
import MapComponent from "./MapComponent.js";

// componente do formulario para simular busca por distância
export default new (class SimulateQueryFromDistanceFormComponent {
  #formName = "simulateQueryFromDistanceFormName";
  #formId = "simulateQueryFromDistanceFormId";
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
    const valuesArray = ["first-lat", "first-lng", "second-lat", "second-lng"].map((item) => {

      return formData.get(item);
    });

    const [firstLatitude, firstLongitude, secondLatitude, secondLongitude] = valuesArray;

    if(!firstLatitude || !firstLongitude || !secondLatitude || !secondLongitude) return false;

    MapComponent.addMarker(secondLatitude, secondLongitude, '2° Localização');
    MapComponent.addMarker(firstLatitude, firstLongitude, '1° Localização');


    const targetUrl = routes.CheckDistance();
    const query = {
        firstLat: firstLatitude,
        firstLng: firstLongitude,
        secondLat: secondLatitude,
        secondLng: secondLongitude,
    };
    const queryParams = new URLSearchParams(query);
    const queryString = queryParams.toString();
    const urlWithQueryStrings = `${targetUrl}?${queryString}`;
    console.log("urlWithQueryStrings", urlWithQueryStrings);

    const result = await fetch.getRequest(urlWithQueryStrings);
    console.log("result", result)
    // if (result.success && result.data.length) {
    //   const real = new Intl.NumberFormat('pt-BR', {
    //     style: 'currency',
    //     currency: 'BRL',
    //     });
    //   const notif = `O valor da área é: ${real.format(result.data[0].value)}`
    //   alert(notif)
    //   //   window.location.reload()
    //   return true;
    // }
    // alert("nenhuma area encontrada");
    // console.log("nenhuma area encontrada", result.data);
    // return false;
  }
})();

