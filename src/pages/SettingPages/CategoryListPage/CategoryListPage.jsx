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
import { city } from '../OrderListPage/constants';
import Preloader from '../../../components/Preloader/Preloader';
import { getCategory } from '../../../store/categorySlice';

function CategoryListPage() {
    const cities = city;
    const name = 'Города';

    const dispatch = useDispatch();

    const limit = 10;
    const [page, setPage] = useState(0);
    const {
        categories,
        count: categoryCount,
        isFetching,
    } = useSelector((state) => state.category);
    const pageCount = Math.ceil(categoryCount / limit);

    useEffect(() => {
        dispatch(getCategory({ page, limit }));
    }, []);

    function handlePageChange(pageNumber) {
        setPage(pageNumber);
        dispatch(
            getCategory({
                page: pageNumber,
                limit,
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
        <PageMainCard pageTitle="Категории автомобилей">
            <PageMainCardHeader>
                <FilterForm filterData={filterData} />
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
                    pageCount={pageCount}
                    forcePage={page}
                />
            </PageMainCardFooter>
        </PageMainCard>
    );
}

export default CategoryListPage;
