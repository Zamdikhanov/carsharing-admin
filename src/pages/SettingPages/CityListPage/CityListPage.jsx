import { useEffect } from 'react';
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
    getCity,
    setPageLimit,
    setPageNumber,
    setSortOption,
    resetFilters,
} from '../../../store/citySlice';
import listSortFilter from './constants';
import filterFormNumberOnPage from '../../../components/FilterForm/constants';

function CityListPage() {
    const {
        cities,
        pageNumber,
        pageLimit,
        count: rateCount,
        sortOption,
        isFetching,
    } = useSelector((state) => state.city);
    const { manualRerender } = useSelector((state) => state.app);

    const dispatch = useDispatch();

    const paginationPageCount = Math.ceil(rateCount / pageLimit.value);

    useEffect(() => {
        dispatch(
            getCity({
                page: pageNumber,
                limit: pageLimit.value,
                options: sortOption.value,
            }),
        );
    }, [pageNumber, pageLimit, sortOption.value, manualRerender]);

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
        <PageMainCard pageTitle="Города" addButton>
            <PageMainCardHeader>
                <FilterForm
                    filterData={filterData}
                    reset={() => dispatch(resetFilters())}
                />
            </PageMainCardHeader>
            <PageMainCardMain>
                <StandardListRow row={['Город']} isTitle />
                {isFetching ? (
                    <Preloader />
                ) : (
                    cities.map((cityItem) => {
                        return (
                            <StandardListRow
                                key={cityItem.id}
                                id={cityItem.id}
                                entityName="city"
                                row={[cityItem.name]}
                                rowTitles={['Город:']}
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

export default CityListPage;
