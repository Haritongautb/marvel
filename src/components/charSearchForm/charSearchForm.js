 import {useState} from "react";
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";
import { Link } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import "./charSearchForm.scss";

const CharSearchForm  = () => {
    const [char, setChar] = useState(null);
    const {loading, error, clearError, getCharacterByName} = useMarvelService();

    const updateChar = (name) => {
        clearError();
        getCharacterByName(name)
            .then((newChar) => {
                onCharLoaded(newChar);
                console.log(newChar);
            });
    }

    const onCharLoaded = (newChar) => {
        setChar(newChar);
    }

    const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;
    const results = !char ? null : char.length > 0 ?
                    <div className="char__search-wrapper">
                        <div className="char__search-success">There is! Visit {char[0].name} page?</div>
                        <Link to={`/character/${char[0].id}`} className="button button__secondary">
                            <div className="inner">To page</div>
                        </Link>
                    </div> : 
                    <div className="char__search-error">
                        The character was not found. Check the name and try again
                    </div>;
    
    return (
        <div className="char__search-form">
            <Formik 
                initialValues = {{
                    charName: ""
                }}
                validationSchema = {Yup.object({
                    charName: Yup.string(1, "Не менее одного символа")
                                .matches(/^\D+$/, "Нельзя вводить числа")
                                .required("Write character's name")
                })}
                onSubmit = {({charName}, {setSubmitting})=> {    
                    updateChar(charName);
                    setSubmitting(false);
                }}
            >
            {
                props => (
                    <Form>
                        <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                        <div className="char__search-wrapper">
                            <Field
                                id="charName" 
                                name='charName' 
                                type='text' 
                                placeholder="Enter name"/>
                            <button 
                                type='submit' 
                                className="button button__main"
                                disabled={!(props.isValid && props.dirty) || props.isSubmitting || loading}>
                                <div className="inner">find</div>
                            </button>
                        </div>
                        <ErrorMessage className="char__search-error" name="charName" component="div"/>
                    </Form>
                )
            }
            </Formik>
            {results}
            {errorMessage}
        </div>
    )
}

export default CharSearchForm;

