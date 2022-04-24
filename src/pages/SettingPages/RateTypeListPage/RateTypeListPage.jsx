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
import { getRateType } from '../../../store/rateTypeSlice';

function RateTypeListPage() {
    const cities = city;
    const name = 'Города';

    const dispatch = useDispatch();

    const limit = 10;
    const [page, setPage] = useState(0);
    const {
        rateType,
        count: rateTypeCount,
        isFetching,
    } = useSelector((state) => state.rateType);
    const pageCount = Math.ceil(rateTypeCount / limit);

    useEffect(() => {
        dispatch(getRateType({ page, limit }));
    }, []);

    function handlePageChange(pageNumber) {
        setPage(pageNumber);
        dispatch(
            getRateType({
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
        <PageMainCard pageTitle="Тарифы">
            <PageMainCardHeader>
                <FilterForm filterData={filterData} />
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
                    pageCount={pageCount}
                    forcePage={page}
                />
            </PageMainCardFooter>
        </PageMainCard>
    );
}

export default RateTypeListPage;
