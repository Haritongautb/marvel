import {AnimatePresence} from "framer-motion";
import {lazy, Suspense} from "react";
// На самом деле функция называется BrowserRouter, но мы назовем его Router, второй компонент называется уже Route
// Это Статические import 
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";


// Динамические import импортируем только после всех статических import 
// Lazy загрузка дает возможность догружать нужные скрипты для того, чтобы страница работала нормально, но это не значит, что lazy и динамические загрузки даст нам уменьшить объяем кода или вес папки кода.
const Page404  = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SinglePage = lazy(() => import("../pages/SinglePage"));
const SingleComicPage = lazy(() => import("../pages/SingleComicPage"));
const SingleCharacterPage = lazy(() => import("../pages/SingleCharacterPage"));

const App = () => {

    // I.
    // Мы завернули все это в Router, потому что в AppHeader у нас находятся ссылки на другие страницы, а альше идут страницы на этихъ ссылок, вот почему мы с=засунули все компоненты в Router (потому что дальше компонента AppHeader идут страницы этих ссылок). Короче говоря, засовывай в КОМПОНЕНТ Router, те компоненты у которых есть ссылки и дальше у нас идут страницы этих ссылок

    // II. Мы не создавали никаких папок comics (в path="/comics") - мы так просто прозвали страницу, в которой будет компонент AppBanner и ComicsList, компонент Route будет сам создаст эту страницу и назовет в url - localhost:3000/comics

    // Короче говоря, засовывам компонент Route в компонент Switch. Компонент Route сам создаст нужные страницы для помещенных в него компоненты
    // Path

    // III.
    // :comicId - вместо comicId можно писатьвсе что угодно, но двоеточие нужно обязательно ставить
    // то есть Route нам откроет в браузере нам компонет SingleComicPage с id комикса на котолрого мы кликнули, потому что в ComicsList в renderItems у нас есть Link - <Link to={`/comics/${item.id}`}></Link>            

    // IV. метод Suspense дает возможность подгружать нужный page только в момент когда пользователь переходит на эту страницу, а не сразу, когда браузер загружается и загружаются прямо все файлы js.
    // в метод Suspense мы засовываем динамические import которые используют компонент lazy
    // fallback - это то, что должно показываться во время загрузки нужной страницы
    return (
        <Router>
            <div className="app">
                <AnimatePresence>
                    <AppHeader/>
                </AnimatePresence>
                <main>
                    <Suspense fallback={<Spinner />}>
                        <AnimatePresence >
                            <Routes>
                                <Route exact path="/" element={<MainPage />} />
                                <Route path="/comics" element={<ComicsPage />} />
                                <Route path="/comic/:id" element={<SinglePage Component={SingleComicPage} dataType="comic"/>} />
                                <Route path="/character/:id" element={<SinglePage Component={SingleCharacterPage} dataType="character"/>}  />
                                <Route path="*" element={<Page404 />}/>
                            </Routes>
                        </AnimatePresence>
                    </Suspense>
                </main>
            </div>
        </Router>
    )

}

export default App;