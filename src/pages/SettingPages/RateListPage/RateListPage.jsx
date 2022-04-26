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
import {
    getRate,
    setPageCount,
    setPageLimit,
    setSortOption,
} from '../../../store/rateSlice';
import rateListSortFilter from './constants';
import filterFormNumberOnPage from '../../../components/FilterForm/constants';

function RateListPage() {
    const {
        rate,
        pageCount,
        pageLimit,
        count: rateCount,
        sortOption,
        isFetching,
    } = useSelector((state) => state.rate);

    const dispatch = useDispatch();

    const [queryParams, setQueryParams] = useState('');
    const paginationPageCount = Math.ceil(rateCount / pageLimit.value);

    useEffect(() => {
        dispatch(
            getRate({
                page: pageCount,
                limit: pageLimit.value,
                options: sortOption.value,
            }),
        );
        setQueryParams(sortOption.value);
    }, [pageCount, pageLimit, sortOption.value]);

    function handlePageChange(pageNumber) {
        dispatch(
            getRate({
                page: pageNumber,
                limit: pageLimit.value,
                options: queryParams,
            }),
        );
        dispatch(setPageCount(pageNumber));
    }

    function onFilterPageCountChange(pageLimitFilter) {
        dispatch(
            setPageCount(
                Math.floor(
                    (pageCount * pageLimit.value) / pageLimitFilter.value,
                ),
            ),
        );
        dispatch(setPageLimit(pageLimitFilter));
    }

    function onFilterSortChange(sortFilter) {
        dispatch(setSortOption(sortFilter));
    }

    const filterData = [
        {
            ...filterFormNumberOnPage,
            onChangeSeleсt: onFilterPageCountChange,
            defaultValue: pageLimit,
        },
        {
            ...rateListSortFilter,
            onChangeSeleсt: onFilterSortChange,
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
                    pageCount={paginationPageCount}
                    forcePage={pageCount}
                />
            </PageMainCardFooter>
        </PageMainCard>
    );
}

export default RateListPage;
