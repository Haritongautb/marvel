import {motion} from "framer-motion";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import './comicsList.scss';


const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, clearError, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])


    const onRequest = (offset, initial) => {
        clearError();
        initial ? setNewItemLoading(newItemLoading => false) : setNewItemLoading(newItemLoading => true);
        getAllComics(offset)
            .then(onComicsLoaded)
    }

    const onComicsLoaded = (newComics) => {
        let ended = false;
        if(newComics.length < 8){
            ended = true;
        }
        setComics(comics => [...comics, ...newComics])
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 8);
        setComicsEnded(charEnded => ended)
    }
    const renderItems = (arr) => {
        const items = arr.map((item, index) => {
            const variants = {
                hidden: {opacity: 0},
                visible: {
                    transition: {
                        delay: (Math.floor(Math.random() * (1 - 8) + 8)) * 0.4
                    },
                    opacity: 1,
                }
            }
            return (
                <motion.li 
                    key={index}
                    className="comics__item"
                    initial="hidden"
                    animate="visible"
                    variants={variants}>
                    <Link to={`/comic/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </motion.li>
            )

        });
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        );
    }

    const items = renderItems(comics);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading  && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button className="button button__main button__long"
                    onClick={() => onRequest(offset, false)}
                    disabled={newItemLoading}
                    style={{"display": comicsEnded ? "none" : "block"}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}



export default ComicsList;