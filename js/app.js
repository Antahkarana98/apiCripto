const criptomenedasSelect = document.querySelector('#criptomonedas');
const monedaSelect = document.querySelector('#moneda');
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

const obtenerCriptomonedas = criptomonedas => new Promise(resolve => resolve(criptomonedas));

const objCripto = {
  moneda: '',
  criptomoneda: ''
}

document.addEventListener('DOMContentLoaded', () => {
  consultarCriptomenedas();

  formulario.addEventListener('submit', submitForm);

  monedaSelect.addEventListener('change', leerSelect);
  criptomenedasSelect.addEventListener('change', leerSelect);
})

function consultarCriptomenedas() {
  const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

  fetch(url)
  .then((response) => response.json())
  .then(result => obtenerCriptomonedas(result.Data))
  .then(criptomonedas => selectCriptomonedas(criptomonedas));
}

function selectCriptomonedas(criptomonedas) {
  criptomonedas.forEach(cripto => {
    const { FullName, Name } = cripto.CoinInfo;

    const option = document.createElement('OPTION');
    option.textContent = FullName;
    option.value = Name;

    criptomenedasSelect.appendChild(option);
  });
}

function submitForm(e) {
  e.preventDefault();

  const { moneda, criptomoneda} = objCripto;

  if(moneda === '' || criptomoneda === '') {
    imprimirAlerta('Ambos campos son obligatorios');
  }

  consultarApi();
}


function leerSelect(e) {
  objCripto[e.target.name] = e.target.value;
}

function imprimirAlerta(mensaje) {

  const alerta = document.querySelector('.error');

  if(!alerta){
    const alertaDiv = document.createElement('div');
    alertaDiv.classList.add('error');
    alertaDiv.textContent = mensaje;
    formulario.appendChild(alertaDiv);

    setTimeout(() => {
      alertaDiv.remove();
    }, 2000);

  }
}

function consultarApi() {

  const { moneda, criptomoneda } = objCripto

  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

  mostrarSpinner();

  fetch(url)
    .then(response => response.json())
    .then(result => mostrarCotizacion(result.DISPLAY[criptomoneda][moneda]))
}

function mostrarCotizacion(cotizacion) {

  limpiarHTML();

  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = cotizacion;


  const precio = document.createElement('P');
  precio.classList.add('precio');
  precio.innerHTML = `El precio es: <span>${PRICE}</span>`;

  const precioH = document.createElement('P');
  precioH.innerHTML = `El precio mas alto del dia es: <span>${HIGHDAY}</span>`;

  const precioL = document.createElement('P');
  precioL.innerHTML = `El precio mas bajo del dia es: <span>${LOWDAY}</span>`;

  const change = document.createElement('P');
  change.innerHTML = `Variacion ultimas 24h: <span>${CHANGEPCT24HOUR} %</span>`;

  const update = document.createElement('P');
  update.innerHTML = `Ultima actualizacion: <span>${LASTUPDATE}</span>`;


  resultado.appendChild(precio);
  resultado.appendChild(precioH);
  resultado.appendChild(precioL);
  resultado.appendChild(change);
  resultado.appendChild(update);


}


function limpiarHTML() {
  while(resultado.firstChild){
    resultado.removeChild(resultado.firstChild);
  }
}

function mostrarSpinner(){
  limpiarHTML();
  const spinner = document.createElement('DIV');
  spinner.classList.add('spinner');

  spinner.innerHTML = `
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  `;

  resultado.appendChild(spinner);
}
