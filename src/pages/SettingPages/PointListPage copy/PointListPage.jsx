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
import { getPoint } from '../../../store/pointSlice';

function PointListPage() {
    const citiesOptions = city;
    const name = 'Города';

    const dispatch = useDispatch();

    const limit = 10;
    const [page, setPage] = useState(0);
    const {
        points,
        count: pointCount,
        isFetching,
    } = useSelector((state) => state.point);
    const pageCount = Math.ceil(pointCount / limit);

    useEffect(() => {
        dispatch(getPoint({ page, limit }));
    }, []);

    function handlePageChange(pageNumber) {
        setPage(pageNumber);
        dispatch(
            getPoint({
                page: pageNumber,
                limit,
            }),
        );
    }

    const selectOption = {
        defaultValue: null,
        options: citiesOptions.map((item) => ({
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
        <PageMainCard pageTitle="Точки выдачи">
            <PageMainCardHeader>
                <FilterForm filterData={filterData} />
            </PageMainCardHeader>
            <PageMainCardMain>
                <StandardListRow
                    row={['Город', 'Точка выдачи', 'Адрес']}
                    isTitle
                />
                {isFetching ? (
                    <Preloader />
                ) : (
                    points.map((pointItem) => {
                        return (
                            <StandardListRow
                                key={pointItem.id}
                                row={[
                                    pointItem?.cityId?.name,
                                    pointItem.name,
                                    pointItem.address,
                                ]}
                                rowTitles={[
                                    'Город:',
                                    'Точка выдачи:',
                                    'Адрес:',
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

export default PointListPage;
