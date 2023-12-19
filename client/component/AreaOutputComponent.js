
import AreaOutputFormEditCardComponent from "./AreaOutputFormEditCardComponent.js";

// componente da área onde ficará os cards de edição.
export default new (class AreaOutputComponent {
  #outputId = "primary-output";
  #outputElement = $(`#${this.#outputId}`);

  // adiciona um novo elemento html à area do componente.
  appendElement(contentString) {
    // const div = document.createElement('div')
    // div.textContent = 'Conteúdo da nova div';
    return this.#outputElement.append(contentString);
  }

  addHeader(){
    const div = `
      <h3 class="display-5 px-3 pt-2">Editar áreas cadastradas:</h3>
    `
    this.appendElement(div);
  }

  // adiciona um card pre-definido à area do componente.
  newAreaCard(item) {
    if (!item.id || !item.poly || !item.value || !item.description)
      throw new Error("parametro inválido");
      const formEditCardComponent = new AreaOutputFormEditCardComponent({ item });
      const newFormCardElement = formEditCardComponent.newFormCardElement();
      this.appendElement(newFormCardElement);
      formEditCardComponent.listenSubmitFormCard()
      return true
  }
})();
