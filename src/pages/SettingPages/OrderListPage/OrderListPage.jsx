import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterForm from '../../../components/FilterForm/FilterForm';
import OrderListRow from '../../../components/OrderListRow/OrderListRow';
import {
    PageMainCard,
    PageMainCardFooter,
    PageMainCardHeader,
    PageMainCardMain,
} from '../../../components/PageMainCard/PageMainCard';
import Pagination from '../../../components/Pagination/Pagination';
import Preloader from '../../../components/Preloader/Preloader';
import { getOrder } from '../../../store/orderSlice';
import { city } from './constants';

function OrderListPage() {
    const cities = city;
    const name = 'Города';

    const dispatch = useDispatch();

    const limit = 10;
    const [page, setPage] = useState(499);
    const {
        orders,
        count: ordersCount,
        isFetching,
    } = useSelector((state) => state.order);
    const pageCount = Math.ceil(ordersCount / limit);
    const { data } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getOrder({ page, limit, accessToken: data.access_token }));
    }, []);

    function handlePageChange(pageNumber) {
        setPage(pageNumber);
        dispatch(
            getOrder({
                page: pageNumber,
                limit,
                accessToken: data.access_token,
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
        <PageMainCard pageTitle="Заказы">
            <PageMainCardHeader>
                <FilterForm filterData={filterData} />
            </PageMainCardHeader>
            <PageMainCardMain>
                {isFetching ? (
                    <Preloader />
                ) : (
                    orders.map((order) => {
                        return <OrderListRow key={order.id} {...order} />;
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

export default OrderListPage;
