const form = document.querySelector("#search > form");
const input: HTMLInputElement | null =
  document.querySelector("#input-localizacao");
const sectionInfos = document.querySelector("#tempo-info");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!input || !sectionInfos) return;

  const localizacao = input.value;

  if (localizacao.length < 3) {
    alert("O local precisa ter, pelo menos, 3 letras.");
    return;
  }

  try {
    const resposta = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=1162929f1084b35d00d01bdd8b72a700&lang=pt_br&units=metric`
    );

    const dados = await resposta.json();
    console.log(dados);

    const infos = {
      temperatura: Math.round(dados.main.temp),
      local: dados.name,
      icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`,
    };

    sectionInfos.innerHTML = `
      <div class="data">
        <h2>${infos.local}</h2>
  
        <span>${infos.temperatura}ºC</span>
      </div>
      <img src="${infos.icone}" />`;
  } catch (error) {
    console.log("Deu um erro na obtenção dos dados da API.", error);
  }
});
