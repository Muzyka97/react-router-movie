import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {getCastById} from '../../shared/API/movies';


const Cast = () =>{
const [state, setState] = useState({
    response: {},
    loading: false,
    error: null
});

const {movieId} = useParams();

useEffect(()=>{
    const fetchCast = async(movieId)=>{
        setState(prevState=>({...prevState, loadinng: true}))
        try{
            const response = await getCastById(movieId)
            console.log(response)
            setState(prevState=>({...prevState, loading:false, response}))
        }catch(error){
            setState(prevState=>({...prevState, loading:false, error: error}))
        };
    };
    
    fetchCast(movieId)
},[movieId]);

const {response:{cast = []}, loading, error} = state;

return(
    <>
    {loading && <p>...loading</p>}
    {error && <p>{error.message}</p>}
    <ul>
    {cast.map(({id, name, profile_path})=>
        <li key={id}>
            <h3>{name}:</h3>
           {!profile_path ? <img src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'} alt='defolt '/> :
            <img
            src={`http://image.tmdb.org/t/p/w200/${profile_path}`}
            alt={name}
            />}
        </li>
    )}
    </ul>
    </>
)

};
export default Cast;