import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import CoinsList from "./components/CoinsList";
import Loader from "./components/Loader";

function App() {
  const [coinsData, setCoinsData] = useState([]);
  const [page , setPage] = useState(1);
  const [loading , setLoading] = useState(true)
  useEffect(() => {
    async function fetchData() {
      let response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=${page}&sparkline=false`
      );
      setCoinsData((prev)=> [...prev , ...response.data]);
      setLoading(false)
    }
    fetchData();
  }, [page]);
  function handleScroll(){
    // console.log("Height",document.documentElement.scrollHeight);
    // console.log("Top", document.documentElement.scrollTop);
    // console.log("window height" , window.innerHeight)
    if(window.innerHeight + document.documentElement.scrollTop +1 >= document.documentElement.scrollHeight){
      setLoading(true);
      setPage((prev)=> prev+1);
    }
  } 
  useEffect(()=>{
    window.addEventListener('scroll' , handleScroll);
    return ()=> window.removeEventListener('scroll' , handleScroll)
  },[])
  return (
    <>
      <div>
        <h2 className="mt-4">Crypto Gallery</h2><br />
        <CoinsList coinsData={coinsData}/>
         {loading && <Loader/>}      
      </div>
    </>
  );
}

export default App;
