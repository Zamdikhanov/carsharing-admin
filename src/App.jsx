import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import TemplatePage from './pages/TemplatePage';
import CarListPage from './pages/SettingPages/CarListPage/CarListPage';
import OrderListPage from './pages/SettingPages/OrderListPage/OrderListPage';
import ErrorPage from './pages/SettingPages/ErrorPage/ErrorPage';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import RequireAuth from './hoc/RequireAuth';
import CategoryListPage from './pages/SettingPages/CategoryListPage/CategoryListPage';
import CityListPage from './pages/SettingPages/CityListPage/CityListPage';
import PointListPage from './pages/SettingPages/PointListPage copy/PointListPage';
import RateTypeListPage from './pages/SettingPages/RateTypeListPage/RateTypeListPage';
import RateListPage from './pages/SettingPages/RateListPage/RateListPage';
import RateListEditPage from './pages/SettingPages/RateListPage/RateListEditPage/RateListEditPage';
import RateTypeListEditPage from './pages/SettingPages/RateTypeListPage/RateTypeListEditPage/RateTypeListEditPage';
import CityListEditPage from './pages/SettingPages/CityListPage/CityListEditPage/CityListEditPage';
import PointListEditPage from './pages/SettingPages/PointListPage copy/PointListEditPage/PointListEditPage';
import CategoryListEditPage from './pages/SettingPages/CategoryListPage/CategoryListEditPage/CategoryListEditPage';

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
                    <Route path="car-list" element={<CarListPage />} />
                    <Route path="order-list" element={<OrderListPage />} />
                    <Route
                        path="category-list"
                        element={<CategoryListPage />}
                    />
                    <Route
                        path="category-list/edit"
                        element={<CategoryListEditPage />}
                    />
                    <Route path="city-list" element={<CityListPage />} />
                    <Route
                        path="city-list/edit"
                        element={<CityListEditPage />}
                    />
                    <Route path="point-list" element={<PointListPage />} />
                    <Route
                        path="point-list/edit"
                        element={<PointListEditPage />}
                    />
                    <Route
                        path="rate-type-list"
                        element={<RateTypeListPage />}
                    />
                    <Route
                        path="rate-type-list/edit"
                        element={<RateTypeListEditPage />}
                    />
                    <Route path="rate-list" element={<RateListPage />} />
                    <Route
                        path="rate-list/edit"
                        element={<RateListEditPage />}
                    />
                    <Route path="error" element={<ErrorPage />} />
                </Route>

                <Route path="/*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default App;
