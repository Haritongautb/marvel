import {motion} from "framer-motion";
import animateProps from "../../animateProps/animateProps";
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";

const ComicsPage = () => {
    return (
        <motion.div
            layout
            {...animateProps}>       
            <AppBanner />
            <ComicsList />
        </motion.div>
    )
}

export default ComicsPage;


