async function getRequest(url) {
  if (!url) throw new Error("parametro inválido");
  return await makeFetchRequest(url, null);
}

async function postRequest(url, data) {
  const options = {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : null,
  };

  return await makeFetchRequest(url, options);
}

async function makeFetchRequest(url, options) {
  if (!url) throw new Error("parametro inválido");
  if (options) {
    return fetch(url, {
      ...options,
    })
      .then((data) => data.json())
      .then((result) => result)
      .catch((error) => console.log("deu ruim", error));
  }
  return fetch(url)
    .then((data) => data.json())
    .then((result) => result)
    .catch((error) => console.log("deu ruim", error));
}

export default {
    getRequest,
    postRequest,
    makeFetchRequest
}