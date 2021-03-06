import { useEffect } from 'react';
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
import Preloader from '../../../components/Preloader/Preloader';
import {
    getCar,
    resetFilters,
    setPageLimit,
    setPageNumber,
    setSortOption,
    setСategoryOption,
} from '../../../store/carSlice';
import listSortFilter from './constants';
import filterFormNumberOnPage from '../../../components/FilterForm/constants';
import css from './CarListPage.module.scss';

function CarListPage() {
    const {
        cars,
        pageNumber,
        pageLimit,
        count: rateCount,
        sortOption,
        categoryOption,
        isFetching,
    } = useSelector((state) => state.car);

    const { manualRerender } = useSelector((state) => state.app);

    const { categories } = useSelector((state) => state.filter);
    const categoriesFilter = {
        defaultValue: categoryOption,
        options: [
            {
                label: 'Все категории',
                value: '',
            },
        ],
        id: 'categoriesFilter',
        name: 'categoriesFilter',
        placeholder: 'Все категории',
    };
    const categoriesOptions = categories.map((categoryItem) => ({
        label: categoryItem.name,
        value: categoryItem.id,
    }));
    categoriesFilter.options = [
        ...categoriesFilter.options,
        ...categoriesOptions,
    ];

    const dispatch = useDispatch();

    const paginationPageCount = Math.ceil(rateCount / pageLimit.value);

    useEffect(() => {
        dispatch(
            getCar({
                page: pageNumber,
                limit: pageLimit.value,
                options: `${sortOption.value}${
                    categoryOption.value &&
                    `categoryId[id]=${categoryOption.value}&`
                }`,
            }),
        );
    }, [
        pageNumber,
        pageLimit,
        sortOption.value,
        categoryOption.value,
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

    function onCategoryChange(categoryFilter) {
        dispatch(setСategoryOption(categoryFilter));
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
            ...categoriesFilter,
            onChangeSeleсt: onCategoryChange,
        },
    ];

    const tableData = cars.length ? (
        cars.map((car) => {
            return <CarListRow key={car.id} car={car} />;
        })
    ) : (
        <div style={{ padding: '16px 0px', fontSize: '20px' }}>Нет данных</div>
    );

    return (
        <PageMainCard pageTitle="Автомобили" addButton>
            <PageMainCardHeader>
                <FilterForm
                    filterData={filterData}
                    reset={() => dispatch(resetFilters())}
                />
            </PageMainCardHeader>
            <PageMainCardMain>
                <div className={css.table_container}>
                    <CarListRow
                        key="carTitle"
                        car={{
                            name: 'Марка',
                            priceMin: 'Цена мин',
                            priceMax: 'макс',
                            description: 'Описание',
                            categoryId: { name: 'Категория' },
                            number: 'Номер',
                            tank: 'Топливо %',
                            colors: ['Цвета'],
                        }}
                        isTitle
                    />
                    {isFetching ? <Preloader /> : tableData}
                </div>
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

export default CarListPage;
