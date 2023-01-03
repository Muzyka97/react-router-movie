import { Link, useLocation } from "react-router-dom";

const TrendsList = ({items}) => {
    const location = useLocation();

    const element = items.map(({title, id})=>(
        <li key={id}>
            <Link to={`/movies/${id}`} state={{from: location}}>
                <h2>{title}</h2>
            </Link>
        </li>
    ));
    return(
        <ul>
            {element}
        </ul>
    );
};
export default TrendsList;