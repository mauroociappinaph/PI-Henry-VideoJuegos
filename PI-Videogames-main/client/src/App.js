import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import HomePage from "./components/HomePage/HomePage";

function App() {
  return (
    <BrowserRouter>
      <BrowserRouter>
        <div className="App"></div>
        <Switch>
          <Route  exact path="/" component={LandingPage} />
          <Route path= "/home" component= {HomePage}/>
        </Switch>
      </BrowserRouter>
    </BrowserRouter>
  );
}

export default App;
