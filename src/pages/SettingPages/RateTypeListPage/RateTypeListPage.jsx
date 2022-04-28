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
import { getRateType, setPageLimit, setPageNumber, setSortOption, resetFilters } from '../../../store/rateTypeSlice';
import listSortFilter from './constants';
import filterFormNumberOnPage from '../../../components/FilterForm/constants';

function RateTypeListPage() {
    const {
        rateType,
        pageNumber,
        pageLimit,
        count: rateCount,
        sortOption,
        isFetching,
    } = useSelector((state) => state.rateType);

    const dispatch = useDispatch();

    const [queryParams, setQueryParams] = useState('');
    const paginationPageCount = Math.ceil(rateCount / pageLimit.value);

    useEffect(() => {
        dispatch(
            getRateType({
                page: pageNumber,
                limit: pageLimit.value,
                options: sortOption.value,
            }),
        );
        setQueryParams(sortOption.value);
    }, [pageNumber, pageLimit, sortOption.value]);

    function handlePageChange(newPageNumber) {
        dispatch(
            getRateType({
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
    ];

    return (
        <PageMainCard pageTitle="Тарифы">
            <PageMainCardHeader>
                <FilterForm filterData={filterData} reset={() => dispatch(resetFilters())} />
            </PageMainCardHeader>
            <PageMainCardMain>
                <StandardListRow row={['Название', 'Ед. измерения']} isTitle />
                {isFetching ? (
                    <Preloader />
                ) : (
                    rateType.map((rateTypeItem) => {
                        return (
                            <StandardListRow
                                key={rateTypeItem.id}
                                row={[rateTypeItem.name, rateTypeItem.unit]}
                                rowTitles={['Название:', 'Ед. измерения:']}
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
                    forcePage={pageNumber}
                />
            </PageMainCardFooter>
        </PageMainCard>
    );
}

export default RateTypeListPage;
