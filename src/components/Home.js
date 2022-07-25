import React, { useState } from "react";
import styles from "./Home.module.css";
import Login from "./Login";

const Home = () => {
    const [showLogin, setShowLogin] = useState(false)
    return(
        <div>
            <div className={styles.container}>
                <button className={styles.button} onClick={() => setShowLogin(true)}>Log In</button>
                <button className={styles.button}>Sign Up</button>
                {showLogin ? <Login setShowLogin={setShowLogin}  />: ""}
            </div>
        </div>
    )
}

export default Home;