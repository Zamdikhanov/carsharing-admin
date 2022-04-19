import FilterForm from '../../../components/FilterForm/FilterForm';
import CarListRow from '../../../components/CarListRow/CarListRow';
import { PageMainCard, PageMainCardFooter, PageMainCardHeader, PageMainCardMain } from '../../../components/PageMainCard/PageMainCard';
import Pagination from '../../../components/Pagination/Pagination';
import { order, city } from '../OrderListPage/constants';

function CarListPage() {
    const cities = city;
    const name = 'Города';

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
        <PageMainCard pageTitle="Список автомобилей">
            <PageMainCardHeader>
                <FilterForm filterData={filterData} />
            </PageMainCardHeader>
            <PageMainCardMain>
                <CarListRow {...order} />
                <CarListRow {...order} />
                <CarListRow {...order} />
                <CarListRow {...order} />
                <CarListRow {...order} />
            </PageMainCardMain>
            <PageMainCardFooter>
                <Pagination />
            </PageMainCardFooter>
        </PageMainCard>
    );
}

export default CarListPage;
