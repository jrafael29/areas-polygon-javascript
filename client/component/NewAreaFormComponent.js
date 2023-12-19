import Enum from "../utils/enum.js";
import PolygonAreaService from "../service/PolygonAreaService.js";

// componente do formulario de novo poligono.
export default new (class NewAreaFormComponent {
  #formName = "primaryFormName";
  #formId = "primaryFormId";
  #formElement = document.getElementById(this.#formId);
  #formFields = ["description", "valueArea", "colorArea"];

  async listenSubmit() {
    this.#formElement.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  async handleSubmit(e) {
    e.preventDefault();

    const coordinatesStoraged = localStorage.getItem(
      Enum.enumStorageKeys.LastPolygon
    );
    if (!coordinatesStoraged) {
      alert("poligono inválido");
      return false;
    }

    const formEl = document.forms.namedItem(this.#formId);
    if (!formEl) return false;
    const formData = new FormData(formEl);

    const [description, valueArea, colorArea] = this.#formFields.map((item) => {
      return formData.get(item);
    });

    await PolygonAreaService.storeArea({
      description,
      value: valueArea,
      color: colorArea,
      coordinates: coordinatesStoraged,
    });

    localStorage.removeItem(Enum.enumStorageKeys.LastPolygon);
    window.location.reload();
  }
})();
