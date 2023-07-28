import { useEffect, useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './App.css';
function App() {
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState('ethereum');
  const [to, setTo] = useState('brl');
  const [options, setOptions] = useState([]);
  const [output, setOutput] = useState(0);
  const [quote, setQuote] = useState(0);

  useEffect(() => {
    // Fetch the list of supported coins from Coingecko
    const fetchCoinsList = async () => {
      try {
        const response = await Axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl');
        const coinsList = response.data.map((coin) => coin.id);
        setOptions(coinsList);
      } catch (error) {
        console.error('Error fetching supported coins list:', error);
      }
    };

    fetchCoinsList();
  }, []);

  useEffect(() => {
    // Fetch data from Coingecko for the selected coins
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${from}&vs_currencies=${to}`
        );
        const data = response.data;
        setQuote(data[from][to]);
      } catch (error) {
        console.error('Error fetching data from Coingecko:', error);
      }
    };

    fetchData();
  }, [from, to]);

  function convert() {
    let resultado = input * quote;
    console.log(resultado);
    setOutput(resultado);
  }

  return (
    <div className="app">
     
      <div className="aba">
        <h1>Conversor de criptomoeda para Real</h1>
         <h3>Quantidade de criptomoeda:</h3>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <h3>Qual criptomoeda?</h3>
          <Dropdown
            options={options}
            onChange={(e) => setFrom(e.value)}
            value={from}
            placeholder="From"
          />
          
        <button className='botao' onClick={() => convert()}>Converta</button>
        </div>
       <div className='cota'>
          <h4>1 {from} = R$ {quote}</h4>
       </div>
        <div className='aba'>
        <h2>Quantidade convertida:</h2>
        <p>
          {input} {from} = R$ {output.toFixed(2)}
        </p>
      </div>
      </div>
    
  );
}
export default App;