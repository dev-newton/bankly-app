import reactLogo from "./assets/react.svg";
import "./app.css";
import { Home } from "./views/home";

const App = () => (
  <>
    <nav className="app__row">
      <div className="centralize">
        <a href="https://www.thisisbud.com/" target="_blank" rel="noreferrer">
          <img src="/bankly.svg" className="logo" alt="Bud logo" />
        </a>
      </div>
    </nav>
    <div className="centralize">
      <Home />
    </div>
  </>
);

export default App;
