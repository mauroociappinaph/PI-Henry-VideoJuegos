import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import HomePage from "./components/HomePage/HomePage";
import DetailPage from "./components/DetailPage/VideogameDetail";
import FormPage from "./components/Form/FormPage/FormPage";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
      
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/detail/:id" component={DetailPage} />
          <Route path="/create" component={FormPage} />
        </Switch>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
