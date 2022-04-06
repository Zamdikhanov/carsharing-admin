import { Route, Routes } from "react-router-dom";
import OrderListPage from "./pages/OrderListPage/OrderListPage";
import TemplatePage from "./pages/TemplatePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<TemplatePage />} >
          <Route path="order-list" element={<OrderListPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
