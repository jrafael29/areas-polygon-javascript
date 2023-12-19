import View from "./view.js";
(() => {
  try {
    View.init();
  } catch (error) {
    console.error("ocorreu um erro:", error.message);
    alert("ERRO: verifique o console.");
  }
})();
