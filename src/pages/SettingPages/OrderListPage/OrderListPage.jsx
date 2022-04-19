import FilterForm from '../../../components/FilterForm/FilterForm';
import OrderListRow from '../../../components/OrderListRow/OrderListRow';
import { PageMainCard, PageMainCardFooter, PageMainCardHeader, PageMainCardMain } from '../../../components/PageMainCard/PageMainCard';
import Pagination from '../../../components/Pagination/Pagination';
import { order, city } from './constants';

function OrderListPage() {
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
        <PageMainCard pageTitle="Заказы">
            <PageMainCardHeader>
                <FilterForm filterData={filterData} />
            </PageMainCardHeader>
            <PageMainCardMain>
                <OrderListRow {...order} />
                <OrderListRow {...order} />
                <OrderListRow {...order} />
                <OrderListRow {...order} />
                <OrderListRow {...order} />
            </PageMainCardMain>
            <PageMainCardFooter>
                <Pagination />
            </PageMainCardFooter>
        </PageMainCard>
    );
}

export default OrderListPage;
