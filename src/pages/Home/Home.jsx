import { useState,useEffect } from "react";
import { getTrendMovie } from '../../shared/API/movies';
import TrendsList from "./TrendsList";

const Home = () => {
    const [trendsMovies, setTrendsMovies] = useState({        
        items: [],
        loading: false,
        error: null,});

    useEffect(()=>{
        const fetchTrendsMovie = async() =>{
            setTrendsMovies(prevState => ({...prevState, loading:true}));
            try{
                const data = await getTrendMovie();
                setTrendsMovies(prevState => ({...prevState, loading:false, items: data.results}));
            }catch(error){
                setTrendsMovies(prevState => ({...prevState, loading:false, error: error.message}));
            };
        };
        fetchTrendsMovie()
    },[]);

    const {items, loading, error} = trendsMovies;
    return(
        <>
        <h1>Trending today:</h1>
        {loading && <p>...loading</p>}
        {error && <p>{error}</p>}
        {items.length > 0 &&  <TrendsList items ={items}/>}
        </>
    )
};
export default Home;