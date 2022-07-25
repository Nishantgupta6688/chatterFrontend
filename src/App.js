import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loading from "./components/Loading";
import { useDispatch, useSelector } from "react-redux";
import MePage from "./components/MePage/MePage";
import { useEffect } from "react";
import { updateUser } from "./toolkit/login";
import ErrorModal from "./components/ErrorPage/ErrorModal";

function App() {
  const { loading, loggedInUser } = useSelector((state) => state.login);
  const {error} = useSelector((state) => state.error)
  const dispatch = useDispatch();

  useEffect(()=> {
    if(localStorage.hasOwnProperty('userData')){
      const user = JSON.parse(localStorage.getItem('userData'));
      dispatch(updateUser(user._id));
    }
  },[dispatch])

  return (
    <Router>
      <Header />
      {loading && <Loading />}
      {error && <ErrorModal />}
      <Switch>
        <Route exact path="/">
          {loggedInUser.firstName ? <MePage /> : <Home />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
