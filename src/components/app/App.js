
// На самом деле функция называется BrowserRouter, но мы назовем его Router, второй компонент называется уже Route
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { MainPage, ComicsPage, Page404, SingleComicPage} from "../pages";
import AppHeader from "../appHeader/AppHeader";


const App = () => {

    // I.
    // Мы завернули все это в Router, потому что в AppHeader у нас находятся ссылки на другие страницы, а альше идут страницы на этихъ ссылок, вот почему мы с=засунули все компоненты в Router (потому что дальше компонента AppHeader идут страницы этих ссылок). Короче говоря, засовывай в КОМПОНЕНТ Router, те компоненты у которых есть ссылки и дальше у нас идут страницы этих ссылок

    // II. Мы не создавали никаких папок comics (в path="/comics") - мы так просто прозвали страницу, в которой будет компонент AppBanner и ComicsList, компонент Route будет сам создаст эту страницу и назовет в url - localhost:3000/comics

    // Короче говоря, засовывам компонент Route в компонент Switch. Компонент Route сам создаст нужные страницы для помещенных в него компоненты
    // Path


    // III.
    // :comicId - вместо comicId можно писатьвсе что угодно, но двоеточие нужно обязательно ставить
    // то есть Route нам откроет в браузере нам компонет SingleComicPage с id комикса на котолрого мы кликнули, потому что в ComicsList в renderItems у нас есть Link - <Link to={`/comics/${item.id}`}></Link>            

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/comics" element={<ComicsPage />} />
                        <Route path="/comics/:comicId" element={<SingleComicPage />} />
                        <Route path="*" element={<Page404 />}/>
                    </Routes>
                </main>
            </div>
        </Router>
    )

    // return (
    //     <div className="app">
    //         <AppHeader/>
    //         <main>
    //             <AppBanner />
    //             <ComicsList />
    //         </main>
    //     </div>
    // )

}

export default App;