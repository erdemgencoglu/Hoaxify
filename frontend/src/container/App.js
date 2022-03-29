import React from "react";
import Login from '../Pages/Login';
import LanguageSelector from '../Components/LanguageSelector';
import SignUp from '../Pages/SignUp';
import ApiProgress from '../shared/ApiProgress'

function App() {
  return (
    <div className="row">
      <div className="col">
        <SignUp />
      </div>
      <div className="col">
        <Login />
      </div>
      <LanguageSelector />
    </div>
  );
}

export default App;
