import routes from "../utils/routes.js";
import fetch from '../utils/fetch-util.js'

// componente do card de editar informações.
export default class AreaOutputFormEditCardComponent {
  // campos do formulario que terão seus valores extraidos.
  formFields = ["description", "valueArea", "colorArea"];

  constructor({ item }) {
    this.item = item;
    this.outputFormCardId = `idFormCard-${item.id}`;
    this.outputFormCardName = `nameFormCard-${item.id}`;
    this.outputFormCardElement = $(`#${this.outputFormCardId}`);
  }

  newFormCardElement() {
    const item = this.item;
    const divOp = `
        <div class="col-md-3 p-3">
        <div class="card">
            <div class="card-header bg-secondary">
                ID: ${item.id}
            </div>
            <div class="card-body">
            <form method="post" id="${this.outputFormCardId}" name="${this.outputFormCardName}" >
                <div class="form-group mb-3">
                <label for="valueArea-${item.id}" class="form-label">Valor:</label>
                <input type="number" required name="valueArea" step="0.1" class="form-control" value="${item.value}" id="valueArea-${item.id}">
                </div>
                <div class="form-group mb-3">
                <label for="descriptionArea-${item.id}" class="form-label">Valor:</label>
                <input type="text" required name="description" class="form-control" value="${item.description}" id="descriptionArea-${item.id}">
                </div>
                <div class="form-group mb-3">
                <label for="colorArea-${item.id}" class="form-label">Cor:</label>
                <input type="color" required name="colorArea" class="form-control" value="${item.color}" id="colorArea-${item.id}">
                </div>
                <div class="form-group mb-3">
                <button class="btn btn-sm btn-outline-secondary" type="submit">Salvar alterações</button>
                </div>
            </form>
            </div>
        </div>
        </div>    
    `;
    return divOp;
  }

  listenSubmitFormCard() {
    const element = document.querySelector(`#${this.outputFormCardId}`);
    element.addEventListener("submit", this.handleSubmit.bind(this));
  }

  async handleSubmit(e) {
    e.preventDefault();
    const currentFormId = e.target.id;
    const areaId = currentFormId.split("-")[1];
    const formEl = document.forms.namedItem(currentFormId);

    if (!formEl) return false;
    const formData = new FormData(formEl);
    const [description, valueArea, colorArea] = [
      "description",
      "valueArea",
      "colorArea",
    ].map((item) => {
      return formData.get(item);
    });

    const data = {
      description,
      valueArea,
      colorArea
    }
    const updateValuesTargetUrl = routes.UpdatePolygonAreaValues(areaId);

    const result = await fetch.postRequest(updateValuesTargetUrl, data)

    console.log("result", result);
    if(result.success){
      window.location.reload()
    }

  }
}
