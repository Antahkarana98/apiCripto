const criptomenedasSelect = document.querySelector('#criptomonedas');

const obtenerCriptomonedas = criptomonedas => new Promise(resolve => resolve(criptomonedas));

document.addEventListener('DOMContentLoaded', () => {
  consultarCriptomenedas();
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
  console.log(criptomonedas);
}
