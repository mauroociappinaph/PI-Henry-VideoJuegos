/* App.jsx */
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import HomePage from "./components/HomePage/HomePage";
import DetailPage from "./components/DetailPage/DetailPage";
import FormPage from "./components/FormPage/FormPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/:id" component={DetailPage} />
          <Route exact path="/create" element={<FormPage />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
