import {getReviewById} from '../../shared/API/movies'
import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

const Review = () =>{
    const [ state, setState ] = useState({
        response: {},
        loading: false,
        error: null
    });

    const {movieId} = useParams();

    useEffect(()=>{
        const fetchMovie = async(movieId) =>{
            setState(prevState =>({...prevState, loading: true}))
            try{
                const response = await getReviewById(movieId)
                setState(prevState =>({...prevState, loading: false, response}))
            }catch(error){
                setState(prevState =>({...prevState, loading: false, error: error.message }))
            }
        };

        fetchMovie(movieId);

    },[movieId]);


    const {response: {results = []}, loading, error} = state;

    if(results.length === 0){
        return  <p>there are no reviews here</p>
    };

    return(
        <>
        {loading && <p>...loading</p>}
        {error && <p>{error.message}</p>}
        <ul>
        {results.map(({id, content, author})=>
            <li key={id}>
                <h3>{author}:</h3>
                <p>{content}</p>
            </li>
        )}
        </ul>
        </>
    )
};
export default Review;