import {motion} from "framer-motion";

import {Link, NavLink} from "react-router-dom";
import './appHeader.scss';


const AppHeader = () => {
    
    const onActiveLink = ({isActive}) => {
        return {color: isActive ? "#9F0012" : "inherit"};
    };
    // end - что все страницы, который содержат url путь "/comics" дудут окрашены в style - color: isActive ? "#9F0012" : "inherit"
    return (
        <motion.header 
            layout
            className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink 
                                end
                                to="/"
                                style={onActiveLink}>Characters</NavLink></li>
                    /
                    <li><NavLink 
                                to="/comics"
                                style={onActiveLink}>Comics</NavLink></li>
                </ul>
            </nav>
        </motion.header>
    )
}
export default AppHeader;