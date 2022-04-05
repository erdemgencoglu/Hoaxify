import React from "react";
import Login from '../Pages/Login';
import LanguageSelector from '../Components/LanguageSelector';
import SignUp from '../Pages/SignUp';
import ApiProgress from '../shared/ApiProgress'
import HomePage from "../Pages/HomePage";
import UserPorfilePage from "../Pages/UserPorfilePage";
import PageNotFound from "../Pages/PageNotFound"
import Navbar from "../Components/Navbar";
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Authenticaton } from '../shared/AuthenticationContext'
class App extends React.Component {
  static contextType = Authenticaton
  render() {
    const isLoggedIn = this.state.;
    const username = undefined;
    //const { isLoggedIn, username } = this.state
    return (
      /* BrowserRouter her sayfa değişiminde istek atıyor ve  Bunun yerine HashRouter Kullanırsak bu ortadan kalkıyor */
      <div>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            {!isLoggedIn && <Route path="/login" component={Login} />}
            <Route path="/signup" component={SignUp} />
            <Route path="/user/:username" component={props => {
              return <UserPorfilePage {...props} username={username} />
            }} />
            <Redirect to="/"></Redirect>
            <Route path="*" component={PageNotFound} />
          </Switch>
        </Router>
        <LanguageSelector />
      </div>
    );
  }
}
export default App;
