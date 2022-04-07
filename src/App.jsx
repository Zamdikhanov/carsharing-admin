import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import TemplatePage from './pages/TemplatePage';
import OrderListPage from './pages/SettingPages/OrderListPage/OrderListPage';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/admin/" element={<TemplatePage />}>
                    <Route
                        path="car-setting"
                        element={<div>car-setting</div>}
                    />
                    <Route path="car-list" element={<div>car-list</div>} />
                    <Route path="order-list" element={<OrderListPage />} />
                    <Route path="menu4" element={<div>menu4</div>} />
                    <Route path="menu5" element={<div>menu5</div>} />
                    <Route path="menu6" element={<div>menu6</div>} />
                    <Route path="menu7" element={<div>menu7</div>} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
