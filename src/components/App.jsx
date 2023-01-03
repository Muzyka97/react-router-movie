import { Routes, Route } from "react-router-dom";
import Menu from "./Menu/Menu";
import Home from "pages/Home";
import Movies from "pages/Movies";
import MovieDetail from "pages/MovieDetail";
import Review from "./Review";
import Cast from './Cast';

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Menu/> }>
        <Route index element={<Home/>}/>
        <Route path="movies" element={<Movies/>}/>
        <Route path='movies/:movieId' element={<MovieDetail/>}>
          <Route path='review' element={<Review/>}/>
          <Route path='cast' element={<Cast/>}/>
        </Route>
        {/* <Route path='movies/:castId' element={<MovieDetail/>}/> */}
        </Route>
      
        {/* <Route path="*" element={<div>NotFound</div> } /> */}
      </Routes>
    </div>
  );
};
