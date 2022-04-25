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
import { getRate, setPageLimit, setSortOption } from '../../../store/rateSlice';
import { rateListPageCountFilter, rateListSortFilter } from './constants';

function RateListPage() {
    const {
        rate,
        pageLimit,
        count: rateCount,
        sortOption,
        isFetching,
    } = useSelector((state) => state.rate);

    const dispatch = useDispatch();

    const [page, setPage] = useState(0);
    const [queryParams, setQueryParams] = useState('');
    const pageCount = Math.ceil(rateCount / pageLimit.value);

    useEffect(() => {
        let tempQueryParams = '';
        switch (sortOption.value) {
            case 'price ascending':
                tempQueryParams = 'sort[price]=1&';
                break;
            case 'price descending':
                tempQueryParams = 'sort[price]=-1&';
                break;
            default: tempQueryParams = '';
        };
        dispatch(getRate({ page, limit: pageLimit.value, options: tempQueryParams }));
        setQueryParams(tempQueryParams);
    }, [pageLimit, sortOption.value]);

    function handlePageChange(pageNumber) {
        setPage(pageNumber);
        dispatch(
            getRate({
                page: pageNumber,
                limit: pageLimit.value,
                options: queryParams,
            }),
        );
    }

    function onPageCountChange(pageLimitFilter) {
        setPage((current) =>
            Math.floor((current * pageLimit.value) / pageLimitFilter.value),
        );
        dispatch(setPageLimit(pageLimitFilter));
    }

    function onSortChange(sortFilter) {
        dispatch(setSortOption(sortFilter));
    }

    const filterData = [
        {
            ...rateListPageCountFilter,
            onChangeSelet: onPageCountChange,
            defaultValue: pageLimit,
        },
        {
            ...rateListSortFilter,
            onChangeSelet: onSortChange,
            defaultValue: sortOption,
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
