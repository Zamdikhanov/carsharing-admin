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
import { getRate } from '../../../store/rateSlice';

function RateListPage() {
    const cities = city;
    const name = 'Города';

    const dispatch = useDispatch();

    const limit = 10;
    const [page, setPage] = useState(0);
    const {
        rate,
        count: rateCount,
        isFetching,
    } = useSelector((state) => state.rate);
    const pageCount = Math.ceil(rateCount / limit);

    useEffect(() => {
        dispatch(getRate({ page, limit }));
    }, []);

    function handlePageChange(pageNumber) {
        setPage(pageNumber);
        dispatch(
            getRate({
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
