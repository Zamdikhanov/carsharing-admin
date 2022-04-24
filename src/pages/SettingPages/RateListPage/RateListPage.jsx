import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterForm from '../../../components/FilterForm/FilterForm';
import StandardListRow from '../../../components/StandardListRow/StandardListRow';
import {
    PageMainCard,
    PageMainCardFooter,
    PageMainCardHeader,
    PageMainCardMain,
} from '../../../components/PageMainCard/PageMainCard';
import Pagination from '../../../components/Pagination/Pagination';
import Preloader from '../../../components/Preloader/Preloader';
import { getRate, setPageLimit, setSortPrice } from '../../../store/rateSlice';
import { rateListPageCountFilter, rateListPriceFilter } from './constants';

function RateListPage() {
    const {
        rate,
        pageLimit,
        count: rateCount,
        sortPrice,
        isFetching,
    } = useSelector((state) => state.rate);

    const dispatch = useDispatch();

    const [page, setPage] = useState(0);
    const pageCount = Math.ceil(rateCount / pageLimit.value);

    useEffect(() => {
        dispatch(getRate({ page, limit: pageLimit.value, sortPrice: sortPrice.value }));
    }, [pageLimit, sortPrice]);

    function handlePageChange(pageNumber) {
        setPage(pageNumber);
        dispatch(
            getRate({
                page: pageNumber,
                limit: pageLimit.value,
                sortPrice: sortPrice.value,
            }),
        );
    }

    function onPageCountChange(pageLimitFilter) {
        setPage((current) =>
            Math.floor((current * pageLimit.value) / pageLimitFilter.value),
        );
        dispatch(setPageLimit(pageLimitFilter));
    }

    function onPriceChange(priceFilter) {
        dispatch(setSortPrice(priceFilter));
    }

    const filterData = [
        {
            ...rateListPageCountFilter,
            onChangeSelet: onPageCountChange,
            defaultValue: pageLimit,
        },
        {
            ...rateListPriceFilter,
            onChangeSelet: onPriceChange,
            defaultValue: sortPrice,
        },
    ];

    return (
        <PageMainCard pageTitle="Стоимость тарифа">
            <PageMainCardHeader>
                <FilterForm filterData={filterData} />
            </PageMainCardHeader>
            <PageMainCardMain>
                <StandardListRow
                    row={['Название', 'Стоимость', 'Ед. измерения']}
                    isTitle
                />
                {isFetching ? (
                    <Preloader />
                ) : (
                    rate.map((rateItem) => {
                        return (
                            <StandardListRow
                                key={rateItem.id}
                                row={[
                                    rateItem?.rateTypeId?.name,
                                    rateItem.price,
                                    rateItem?.rateTypeId?.unit,
                                ]}
                                rowTitles={[
                                    'Название:',
                                    'Стоимость:',
                                    'Ед. измерения:',
                                ]}
                            />
                        );
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

export default RateListPage;
