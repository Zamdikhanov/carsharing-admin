import { useEffect } from 'react';
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
import listSortFilter from './constants';
import filterFormNumberOnPage from '../../../components/FilterForm/constants';
import {
    getOrder,
    setPageLimit,
    setPageNumber,
    setSortOption,
    resetFilters,
    setСityOption,
    setOrderStatusOption,
} from '../../../store/orderSlice';

function OrderListPage() {
    const {
        orders,
        pageNumber,
        pageLimit,
        count: orderCount,
        sortOption,
        cityOption,
        orderStatusOption,
        isFetching,
    } = useSelector((state) => state.order);

    const { manualRerender } = useSelector((state) => state.app);

    const dispatch = useDispatch();

    const paginationPageCount = Math.ceil(orderCount / pageLimit.value);

    useEffect(() => {
        dispatch(
            getOrder({
                page: pageNumber,
                limit: pageLimit.value,
                options: `${
                    cityOption.value && `cityId[id]=${cityOption.value}&`
                }${
                    orderStatusOption.value &&
                    `orderStatusId[id]=${orderStatusOption.value}&`
                }${sortOption.value}`,
            }),
        );
    }, [
        pageNumber,
        pageLimit,
        sortOption.value,
        cityOption.value,
        orderStatusOption.value,
        manualRerender,
    ]);

    function handlePageChange(newPageNumber) {
        dispatch(setPageNumber(newPageNumber));
    }

    function onFilterPageCountChange(pageLimitFilter) {
        dispatch(
            setPageNumber(
                Math.floor(
                    (pageNumber * pageLimit.value) / pageLimitFilter.value,
                ),
            ),
        );
        dispatch(setPageLimit(pageLimitFilter));
    }

    function onFilterSortChange(sortFilter) {
        dispatch(setSortOption(sortFilter));
    }

    const { cities, orderStatus } = useSelector((state) => state.filter);

    const citiesFilter = {
        defaultValue: cityOption,
        options: [
            {
                label: 'Все города',
                value: '',
            },
        ],
        id: 'citiesFilter',
        name: 'citiesFilter',
        placeholder: 'Все города',
    };
    const citiesOptions = cities.map((cityItem) => ({
        label: cityItem.name,
        value: cityItem.id,
    }));
    citiesFilter.options = [...citiesFilter.options, ...citiesOptions];

    const orderStatusFilter = {
        defaultValue: orderStatusOption,
        options: [
            {
                label: 'Все заказы',
                value: '',
            },
        ],
        id: 'orderStatusFilter',
        name: 'orderStatusFilter',
        placeholder: 'Все заказы',
    };
    const orderStatusOptions = orderStatus.map((orderStatusItem) => ({
        label: orderStatusItem.name,
        value: orderStatusItem.id,
    }));
    orderStatusFilter.options = [
        ...orderStatusFilter.options,
        ...orderStatusOptions,
    ];

    function onCityChange(cityFilter) {
        dispatch(setСityOption(cityFilter));
    }

    function onOrderStatusChange(newOrderStatusFilter) {
        dispatch(setOrderStatusOption(newOrderStatusFilter));
    }

    const filterData = [
        {
            ...filterFormNumberOnPage,
            onChangeSeleсt: onFilterPageCountChange,
            defaultValue: pageLimit,
        },
        {
            ...listSortFilter,
            onChangeSeleсt: onFilterSortChange,
            defaultValue: sortOption,
        },
        {
            ...citiesFilter,
            onChangeSeleсt: onCityChange,
        },
        {
            ...orderStatusFilter,
            onChangeSeleсt: onOrderStatusChange,
        },
    ];

    const tableData = orders.length ? (
        orders.map((order) => {
            return <OrderListRow key={order.id} {...order} />;
        })
    ) : (
        <div style={{ padding: '16px 0px', fontSize: '20px' }}>Нет данных</div>
    );

    return (
        <PageMainCard pageTitle="Заказы" addButton>
            <PageMainCardHeader>
                <FilterForm
                    filterData={filterData}
                    reset={() => dispatch(resetFilters())}
                />
            </PageMainCardHeader>
            <PageMainCardMain>
                {isFetching ? <Preloader /> : tableData}
            </PageMainCardMain>
            <PageMainCardFooter>
                <Pagination
                    onPageChange={(selectedPage) => {
                        handlePageChange(selectedPage);
                    }}
                    pageCount={paginationPageCount}
                    forcePage={pageNumber}
                />
            </PageMainCardFooter>
        </PageMainCard>
    );
}

export default OrderListPage;
