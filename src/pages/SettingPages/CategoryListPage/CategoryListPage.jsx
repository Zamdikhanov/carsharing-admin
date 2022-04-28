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
import { getCategory, setPageLimit, setPageNumber, setSortOption, resetFilters } from '../../../store/categorySlice';
import listSortFilter from './constants';
import filterFormNumberOnPage from '../../../components/FilterForm/constants';

function CategoryListPage() {
    const {
        categories,
        pageNumber,
        pageLimit,
        count: rateCount,
        sortOption,
        isFetching,
    } = useSelector((state) => state.category);

    const dispatch = useDispatch();

    const [queryParams, setQueryParams] = useState('');
    const paginationPageCount = Math.ceil(rateCount / pageLimit.value);

    useEffect(() => {
        dispatch(
            getCategory({
                page: pageNumber,
                limit: pageLimit.value,
                options: sortOption.value,
            }),
        );
        setQueryParams(sortOption.value);
    }, [pageNumber, pageLimit, sortOption.value]);

    function handlePageChange(newPageNumber) {
        dispatch(
            getCategory({
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
        <PageMainCard pageTitle="Категории автомобилей">
            <PageMainCardHeader>
                <FilterForm filterData={filterData} reset={() => dispatch(resetFilters())} />
            </PageMainCardHeader>
            <PageMainCardMain>
                <StandardListRow row={['Категория', 'Описание']} isTitle />
                {isFetching ? (
                    <Preloader />
                ) : (
                    categories.map((category) => {
                        return (
                            <StandardListRow
                                key={category.id}
                                row={[category.name, category.description]}
                                rowTitles={['Категория:', 'Описание:']}
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

export default CategoryListPage;
