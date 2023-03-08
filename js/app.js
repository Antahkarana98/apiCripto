const criptomenedasSelect = document.querySelector('#criptomenedas');

document.addEventListener('DOMContentLoaded', () => {
  obtenerCriptomenedas();
})

function obtenerCriptomenedas() {
  const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

  fetch(url)
  .then((response) => response.json())
  .then(results => console.log(results))
}
