import { useState, useEffect, Fragment} from "react";
import { useParams } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import AppBanner from "../appBanner/AppBanner";
import Spinner from "../spinner/Spinner";


const SinglePage = ({Component, dataType}) => {
    // useParams() - этот хук от react-router-dom позволяет нам достать с url id комикса (id- 82965)/ Далее у нас все как в CharInfo
    // у нас в url сейчас http://localhost:3000/comics/82965 - (id- 82965)
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {loading, error, clearError, getComic, getCharacter} = useMarvelService();

    useEffect(() => {
        updateData();
    }, [id])

    const updateData = () => {
        clearError();

        switch (dataType) {
            case "comic":
                getComic(id).then(onDataLoaded);
                break;
            case "character": 
                getCharacter(id).then(onDataLoaded);
                break;
        }   
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !data) ? <Component data={data}/> : null;

    return (
        <>
            {AppBanner}
            {errorMessage}
            {spinner}
            {content}
        </>
    )

}

export default SinglePage;