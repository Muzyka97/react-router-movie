import { NavLink, Outlet } from "react-router-dom";

// const getActiveLink = ({isActive}) => isActive ? styles.linkActive : styles.link;

const Menu = () =>{
    return(
        <>
        <header>
            <nav>
        <ul>
            <li>
                <NavLink  to='/'>Home </NavLink>
            </li>
            <li>
                <NavLink to='/movies'>Movies</NavLink>
            </li>
        </ul>
        </nav>
        </header>
        <main> 
            <Outlet/>
        </main>
        </>
    )
};
export default Menu;