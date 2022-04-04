import React from "react";
import Login from '../Pages/Login';
import LanguageSelector from '../Components/LanguageSelector';
import SignUp from '../Pages/SignUp';
import ApiProgress from '../shared/ApiProgress'
import HomePage from "../Pages/HomePage";
import UserPorfilePage from "../Pages/UserPorfilePage";
import PageNotFound from "../Pages/PageNotFound"
import Navbar from "../Components/Navbar";
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
class App extends React.Component {
  state = {
    isLoggedIn: true,
    username: 'user1'
  }

  onLoginSuccess = (username) => {
    this.setState({
      username,
      isLoggedIn: true
    })
  }
  render() {
    const { isLoggedIn, username } = this.state
    return (
      /* BrowserRouter her sayfa değişiminde istek atıyor ve  Bunun yerine HashRouter Kullanırsak bu ortadan kalkıyor */
      <div>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/user/:username" component={UserPorfilePage} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </Router>
        <LanguageSelector />
      </div>
    );
  }
}
export default App;
