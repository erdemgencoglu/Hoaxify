import React from "react";
import Login from '../Pages/Login';
import LanguageSelector from '../Components/LanguageSelector';
import SignUp from '../Pages/SignUp';
import ApiProgress from '../shared/ApiProgress'

function App() {
  return (
    <div className="row">
      <div className="col">
        <ApiProgress path="/api/1.0/users">
          <SignUp />
        </ApiProgress>
      </div>
      <div className="col">
        <ApiProgress path="/api/1.0/auth">
          <Login />
        </ApiProgress>
      </div>
      <LanguageSelector />
    </div>
  );
}

export default App;
