import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useState, useEffect, useMemo} from "react";
import { serchMovie } from "../../shared/API/movies";
import InputBox from "components/InputBox";

const Movies = () => {
    const [movie, setMovie] = useState({
        responses:{},
        loading:false,
        error:null,
    });

    const [searchParams, setSearchParams] = useSearchParams();
    const filterParam = searchParams.get('query') ?? "";

    const location = useLocation();

    useEffect(()=>{
        if (filterParam === ""){
            return
        };

        const fetchMovieName = async() =>{
            setMovie(prevState =>({...prevState, loading: true}))
        try{
            const responses = await serchMovie(filterParam)
            setMovie(prevState =>({...prevState, loading: false, responses}))
        }catch(error){
            setMovie(prevState => ({...prevState, loading: false, error: error.message}))
        }
        }
        fetchMovieName()
    },[filterParam]);

    const changeFilter = value => {
        setSearchParams(value !== '' ? {query: value}: {})
    };
    
    const {responses:{results = []} , loading, error} = movie;

    const visibleNameFilm = useMemo(()=>{
        return results.filter(result => 
            result.original_title.toLowerCase().includes(filterParam.toLowerCase())
            
        )
    },[results, filterParam]);

    return (
        <>
        {loading && <p>...loading</p>}
        {error && <p>{error.message}</p>}
        <InputBox value={filterParam} onChange={changeFilter}/>
        {visibleNameFilm?.length > 0 && (
            <ul>
                {visibleNameFilm.map(({original_title, id})=> (
                <li key={id}>
                    <Link to={`/movies/${id}`} state={{from: location}} >{original_title}</Link>
                </li>
                ))}
            </ul>
        )}
        </>
    )
};
export default Movies;