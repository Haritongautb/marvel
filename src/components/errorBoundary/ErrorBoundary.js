import {Component} from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

// Предохранители ловят ошибки только в методе render(), в методах жизненного цикла компонента, и в компонентах, которые были переданы во внутрь предохранителя
// Пример 
/* 
    <ErrorBoundary >
        дочерний компонента предохранителя
        <CharInfo charId={this.state.selectedChar}/>
    </ErrorBoundary>
*/
// Предохранители не ловят ошибки внутри асинхронного кода, внутри себя, серверного рендеринга, внутри обработчика событий
export default class ErrorBoundary extends Component{
    state = {
        error: false
    }

    static getDerivedStateFromError(error){
        return {error: true}
    }

    componentDidCatch(error, errorInfo){
        console.log(error, errorInfo);

        this.setState({
            error: true
        })
    }

    render(){
        const {error} = this.state;
        if(error){
            return <ErrorMessage />
        }

        return this.props.children;

    }
}
