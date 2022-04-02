import { Route, Routes } from "react-router-dom";
import TemplatePage from "./pages/TemplatePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TemplatePage />} />
      </Routes>
    </div>
  );
}

export default App;
