import {motion} from "framer-motion";
import animateProps from "../../animateProps/animateProps";
import ErrorMessage from "../errorMessage/ErrorMessage";
import {Link} from "react-router-dom";


const Page404 = () => {
    return (
        <motion.div
            layout
            {...animateProps}>   
            <ErrorMessage />
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Page doesn't exist</p>
            <Link style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px'}} to="/">Back to main page</Link>
        </motion.div>
    )
}

export default Page404;