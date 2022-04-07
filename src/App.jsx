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
                    <Route path="order-list" element={<OrderListPage />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
