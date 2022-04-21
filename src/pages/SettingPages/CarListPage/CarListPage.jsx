import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterForm from '../../../components/FilterForm/FilterForm';
import CarListRow from '../../../components/CarListRow/CarListRow';
import {
    PageMainCard,
    PageMainCardFooter,
    PageMainCardHeader,
    PageMainCardMain,
} from '../../../components/PageMainCard/PageMainCard';
import Pagination from '../../../components/Pagination/Pagination';
import { city } from '../OrderListPage/constants';
import Preloader from '../../../components/Preloader/Preloader';
import { getCar } from '../../../store/carSlice';

function CarListPage() {
    const cities = city;
    const name = 'Города';

    const dispatch = useDispatch();

    const limit = 5;
    const [page, setPage] = useState(0);
    const {
        cars,
        count: ordersCount,
        isFetching,
    } = useSelector((state) => state.car);
    const pageCount = Math.ceil(ordersCount / limit);

    useEffect(() => {
        dispatch(getCar({ page, limit }));
    }, []);

    function handlePageChange(pageNumber) {
        setPage(pageNumber);
        dispatch(
            getCar({
                page: pageNumber,
                limit,
            }),
        );
    }

    const selectOption = {
        defaultValue: null,
        options: cities.map((item) => ({
            value: item.id,
            label: item.name,
        })),
        id: { name },
        name: { name },
    };

    const filterData = [
        { ...selectOption, id: '001', name: '001', placeholder: 'Период' },
        { ...selectOption, id: '002', name: '002', placeholder: 'Машина' },
        { ...selectOption, id: '003', name: '003', placeholder: 'Город' },
        { ...selectOption, id: '004', name: '004', placeholder: 'Состояние' },
    ];

    return (
        <PageMainCard pageTitle="Список автомобилей">
            <PageMainCardHeader>
                <FilterForm filterData={filterData} />
            </PageMainCardHeader>
            <PageMainCardMain>
                {isFetching ? (
                    <Preloader />
                ) : (
                    cars.map((car) => {
                        return <CarListRow key={car.id} {...car} />;
                    })
                )}
            </PageMainCardMain>
            <PageMainCardFooter>
                <Pagination
                    onPageChange={(selectedPage) => {
                        handlePageChange(selectedPage);
                    }}
                    pageCount={pageCount}
                    forcePage={page}
                />
            </PageMainCardFooter>
        </PageMainCard>
    );
}

export default CarListPage;
