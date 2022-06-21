import './App.css';
import { useEffect, useState } from 'react'
import Axios from 'axios';
import ReactPaginate from 'react-paginate';
import Coin from './components/Coin';

function App() {

  const [listOfCoins, setListOfCoins] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0").then((
      response) => {
      setListOfCoins(response.data.coins)
    }
    );
  }, []);

  const coinsPerPage = 10;
  const pagesVisited = pageNumber * coinsPerPage;

  const displayCoins = listOfCoins
    .slice(pagesVisited, pagesVisited + coinsPerPage)
    .map((coin) => {
      return (
        <div className="coin">
          <Coin />
        </div>
      )
    })

  const filteredCoins = listOfCoins.filter((coin) => {
    return coin.name.toLowerCase().includes(searchWord.toLowerCase())
  });


  return (
    <div className="App">

      <div className="cryptoHeader">
        <input type="text" placeholder="Search for a coin.." onChange={(event) => {
          setSearchWord(event.target.value);
        }}
        />
      </div>
      <div className="cryptoDisplay">
        {filteredCoins.map((coin) => {
          return <Coin
            name={coin.name}
            icon={coin.icon}
            price={coin.price}
            symbol={coin.symbol}
          />;
        })}
      </div>
    </div>
  );
}

export default App;
