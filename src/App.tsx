import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Articoli from "./components/articoli";
import "bootstrap/dist/css/bootstrap.min.css";
import DettaglioArticolo from "./components/DettaglioArticolo";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-space space-text ">
        <Routes>
          <Route path="/" element={<Articoli></Articoli>}></Route>
          <Route
            path="/dettaglio/:id"
            element={<DettaglioArticolo></DettaglioArticolo>}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
