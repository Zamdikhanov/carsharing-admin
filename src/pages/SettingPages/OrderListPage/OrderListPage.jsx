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
import listSortFilter from './constants';
import filterFormNumberOnPage from '../../../components/FilterForm/constants';
import { getOrder, setPageLimit, setPageNumber, setSortOption, resetFilters, setСityOption } from '../../../store/orderSlice';

function OrderListPage() {
    const accessToken = useSelector(state => state.auth.data.access_token);
    const {
        orders,
        pageNumber,
        pageLimit,
        count: orderCount,
        sortOption,
        cityOption,
        isFetching,
    } = useSelector((state) => state.order);

    const dispatch = useDispatch();

    const [queryParams, setQueryParams] = useState('');
    const paginationPageCount = Math.ceil(orderCount / pageLimit.value);

    useEffect(() => {
        dispatch(
            getOrder({
                page: pageNumber,
                limit: pageLimit.value,
                options: `${sortOption.value}${cityOption.value &&
                    `cityId[id]=${cityOption.value}&`
                    }`,
                accessToken,
            }),
        );
        setQueryParams(sortOption.value);
    }, [pageNumber, pageLimit, sortOption.value, cityOption.value]);

    function handlePageChange(newPageNumber) {
        dispatch(
            getOrder({
                page: newPageNumber,
                limit: pageLimit.value,
                options: queryParams,
            }),
        );
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


    const { cities } = useSelector((state) => state.filter);
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
    citiesFilter.options = [
        ...citiesFilter.options,
        ...citiesOptions,
    ];


    function onCityChange(cityFilter) {
        dispatch(setСityOption(cityFilter));
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
    ];
    return (
        <PageMainCard pageTitle="Заказы">
            <PageMainCardHeader>
                <FilterForm filterData={filterData} reset={() => dispatch(resetFilters())} />
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
                    pageCount={paginationPageCount}
                    forcePage={pageNumber}
                />
            </PageMainCardFooter>
        </PageMainCard>
    );
}

export default OrderListPage;
