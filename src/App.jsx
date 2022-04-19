import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import TemplatePage from './pages/TemplatePage';
import CarListPage from './pages/SettingPages/CarListPage/CarListPage';
import OrderListPage from './pages/SettingPages/OrderListPage/OrderListPage';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import RequireAuth from './hoc/RequireAuth';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/registration" element={<RegistrationPage />} />

                <Route
                    path="/admin/"
                    element={
                        <RequireAuth>
                            <TemplatePage />
                        </RequireAuth>
                    }
                >
                    <Route
                        path="car-setting"
                        element={<div>car-setting</div>}
                    />
                    <Route path="car-list" element={<CarListPage />} />
                    <Route path="order-list" element={<OrderListPage />} />
                    <Route path="menu4" element={<div>menu4</div>} />
                    <Route path="menu5" element={<div>menu5</div>} />
                    <Route path="menu6" element={<div>menu6</div>} />
                    <Route path="menu7" element={<div>menu7</div>} />
                </Route>

                <Route path="/*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default App;
