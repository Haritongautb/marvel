import {useState, useEffect, useRef} from 'react';
import PropTypes from "prop-types";
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './charList.scss';

const CharList = (props) =>{
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters, clearError} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        clearError();
        initial ? setNewItemLoading(newItemLoading => false) : setNewItemLoading(newItemLoading => true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
    }

    const onCharListLoaded = async (newCharList) => {
        // Динамическая import всегда ворзвращает Promise 
        const {secondLogger} = await import("./someFunc");
        secondLogger();

        let ended = false;
        if(newCharList.length < 9){
            ended = true;
        }
        setCharList(charList => [...charList, ...newCharList])
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended)
    }

    // Когда мы создаем через React.createRef() или useRef() - это автоматически создается объект current и в него react засовывает все наши ref
    const itemRefs = useRef([]);
    /* 
        itemRefs = {
            current: [
                0: li.char__item
                1: li.char__item
                2: li.char__item
                3: li.char__item
                4: li.char__item
                5: li.char__item
                6: li.char__item
                7: li.char__item
                8: li.char__item
            ]
        }
    
    */
    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => {
            item.classList.remove("char__item_selected");
        })
        itemRefs.current[id].classList.add("char__item_selected")
        itemRefs.current[id].focus();
    }

    // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render
    function renderItems(arr){
        const items =  arr.map((item, index) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        focusOnItem(index);
                    }}
                    onKeyDown={event => {
                        if(event.key === " " || event.key === "Enter"){
                            props.onCharSelected(item.id);
                            focusOnItem(index);
                        }
                    }}
                    tabIndex="0"
                    ref={el => itemRefs.current[index] = el}
                    >
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                        
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }
        
    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading  && !newItemLoading ? <Spinner/> : null;

    if(loading) {
        // Динамический import всегда возвращает promise
        import("./someFunc")
        .then(obj => obj.default())
        .catch();

        // Если мы пишем export default logger, то это бдует выглядеть так 
        /*  
            {
                default: (){
                    console.log("Hello world!!");
                }
            }
        */
    }

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{"display": charEnded ? "none" : "block"}}
                    onClick={() => onRequest(offset, false)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;

