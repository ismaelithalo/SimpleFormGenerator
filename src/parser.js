document.getElementById("json").addEventListener("submit", function (event) {
  event.preventDefault();
  const jsonText = document.getElementById("jsonInput").value;
  try {
    const jsonData = JSON.parse(jsonText);
    let dados = jsonData;
    let form = criaFormulario(dados);
    // console.log("JSON recebido e armazenado:", dados);
    // insereResposta(JSON.stringify(dados));
    insereResposta(form);
  } catch (error) {
    console.error("Erro: o texto inserido não é um JSON válido.");
    alert("Por favor, insira um JSON válido.");
  }
});

// let dados = {
//   type: "title",
//   title: "Database de Bias do Xet",
//   description:
//     "Estamos fazendo um levantamento dos bias dos grupos de kpop para entender melhor o perifl de cada um e extrair alguns dados bacanas da comunidade.",
//   tags: ["girl group"],
//   labels: ["NMIXX", "TWICE", "ABC"],
//   forms: [
//     {
//       type: "radio-image",
//       options: [
//         { text: "BAE", image: "public/images/nmixx-bae.png" },
//         { text: "Sullyoon", image: "public/images/nmixx-sullyoon.png" },
//       ],
//       label: "NMIXX",
//       tags: ["girl group"],
//     },
//     {
//       type: "text-input",
//       title: "Insira aqui seu nickname do discord",
//     },
//   ],
// };

// console.log(dados);

function insereResposta(resposta) {
  const divResposta = document.getElementById("resultado");
  divResposta.innerHTML = resposta;
}

// function criaTitulo(base) {
//   const titulo = `<p class="h2">${base}</p>`;
//   return titulo;
// }

// function criaDescricao(base) {
//   const desc = `<p class="text-center h4 mb-5">${base}</p>`;
//   return desc;
// }

function criaInputTexto(base, id) {
  let bloco = `<div class="my-5">`;
  if (base.title) {
    bloco += `<label for="${id}" class="form-label"><p class="text-center h5">${base.title}</p></label>`;
  }
  bloco += `<input type="text" class="form-control" id="${id}"></div>`;
  return bloco;
}

function criaRadioImagem(base, id) {
  let bloco = `<div class="my-5">`;
  if (base.title) {
    bloco += `<p class="text-center h5">${base.title}</p>`;
  }
  base.options.forEach((item, index) => {
    bloco += `<div class="form-check-inline" style="position: relative">
    <label class="form-check-label" for="${id + "-" + index}">
                  <input
                    class="form-check-input"
                    type="radio"
                    id="${id + "-" + index}"
                    name="${id}"
                    value="${item.text}"
                  />
                  <img
                    src="${item.image}"
                    class="rounded radio-image"
                  />
                  <div class="radio-image-label">${item.text}</div>
                </label>
                </div>`;
  });
  bloco += `</div>`;
  return bloco;
}

function criaFormulario(data) {
  let grupos = {};
  data.labels.forEach((label) => {
    grupos[label] = data.forms.filter((form) => form.label === label);
  });
  let resto = data.forms.filter((form) => !form.label);

  let html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>BaseForm</title>
    <script src="public/js/loadHead.js" defer></script>
  </head>
  <body>
    <header>
      <nav class="navbar navbar-light bg-warning">
        <a></a>
        <p class="h2">${data.title}</p>
        <a></a>
      </nav>
    </header>
    <section>
      <div class="container my-5">
        <form>
          <p class="text-center h4 mb-5">${data.description}</p>`;

  let labels = Object.keys(grupos).sort();
  labels.forEach((label) => {
    if (grupos[label].length === 0) return;
    let bloco = `<div class="form-group my-3">
      <nav class="navbar navbar-dark bg-dark px-3 mb-2">
          <a class="navbar-brand">${label}</a>
      </nav>
      `;
    grupos[label].forEach((form, index) => {
      let id;
      if (grupos[label].length > 1) {
        id = `${label}-${index}`;
      } else {
        id = label;
      }
      if (form.type === "text-input") {
        bloco += criaInputTexto(form, id);
      } else if (form.type === "radio-image") {
        bloco += criaRadioImagem(form, id);
      }
    });
    bloco += `</div>`;
    html += bloco;
  });
  resto.forEach((form, index) => {
    let id = `no-label-${index}`;
    let bloco = "";
    if (form.type === "text-input") {
      bloco = criaInputTexto(form, id);
    } else if (form.type === "radio-image") {
      bloco = criaRadioImagem(form, id);
    }
    html += bloco;
  });
  html += `<div class="mt-1 text-center">
            <button type="submit" class="btn btn-dark text-justify">
              Enviar
            </button>
          </div>
          </form></div></section><footer class="footer mt-auto pt-3">
        <nav class="navbar navbar-light bg-warning mt-5">
            <a></a>
            <p class="h6">Desenvolvido por ismaelithalo</p>
            <a></a>
        </nav>
    </footer></body></html>`;
  return html;
}
// criaFormulario(dados);
