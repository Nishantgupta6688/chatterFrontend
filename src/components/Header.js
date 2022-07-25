import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../toolkit/login";
import styles from "./Header.module.css";
import {Link} from 'react-router-dom';
import brandLogo from '../images/Logo.png'

const Header = () => {
    const {loggedInUser} = useSelector((state) => state.login);
    const dispatch = useDispatch();

    const renderButton = () => {
        return <div className={styles.loggedInButton}>
            {loggedInUser.firstName ? <><img alt="" />
            <button>Profile</button>
            <button onClick={() => dispatch(logoutUser())}>Logout</button></> : <Link to='/'>Login</Link>}
        </div>
    }

    return(
        <header className={styles.header}>
            <img src={brandLogo} alt="No preview" />
            {
                renderButton()
            }
        </header>
    )
}

export default Header;