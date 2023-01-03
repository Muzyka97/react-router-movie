import { useEffect, useState } from "react";
import { useParams, useLocation, Link, Outlet, useNavigate} from "react-router-dom";
import { getMovieById } from "shared/API/movies";

const MovieDetail = () =>{
    const [ state, setState ] = useState({
        response: {},
        loading: false,
        error: null
    });
    const location = useLocation();
    const navigate = useNavigate();
    const back = location.state?.from ?? '/';

    const {movieId} = useParams();

    const buttonOnClick = () => navigate(back)

    useEffect(()=>{
        const fetchMovie = async(movieId) =>{
            setState(prevState =>({...prevState, loading: true}))
            try{
                const response = await getMovieById(movieId)
                setState(prevState =>({...prevState, loading: false, response}))
            }catch(error){
                setState(prevState =>({...prevState, loading: false, error: error.message }))
            }
        };

        fetchMovie(movieId);

    },[movieId]);

    const {response, loading, error} = state;
    const isData = Boolean(Object.values(response).length);


    const { poster_path, title, vote_average, overview, genres=[]} = response

    if(!response){
        return 
    };
    

    const genre = genres.map(({ id, name }) => 
        <li key={id}>
        <p>{name}</p>
        </li>
    );


    return(
        <main>
            {loading && <p>...loading</p>}
            {error && <p>{error.message}</p>}
            {isData && (
                       <div>
                        <button onClick={buttonOnClick} type="button">Back</button>
                       <div>
                         <div>
                           <img
                             src={`http://image.tmdb.org/t/p/w400/${poster_path}`}
                             alt={title}
                           />
                         </div>
                         <div>
                           <h1>{title}</h1>
                           <p> User score: {vote_average * 10}%</p>
                           <h2>Overview</h2>
                           <p>{overview}</p>
                           <h3>Genres</h3>
                           <ul>{genre}</ul>
                         </div>
                         <div/>
                       </div>
                     </div>
            )}
            <div>
            <Link state={{from:back}} to={'review'}>Review</Link>
            <Link state={{from:back}} to={'cast'}>Cast</Link>
            <Outlet/>
            </div>

        </main>
    )
};
export default MovieDetail;


