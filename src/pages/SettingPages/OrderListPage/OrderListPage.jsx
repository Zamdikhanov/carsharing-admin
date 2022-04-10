import FilterForm from '../../../components/FilterForm/FilterForm';
import OrderListRow from '../../../components/OrderListRow/OrderListRow';
import Pagination from '../../../components/Pagination/Pagination';
import { order, city } from './constants';
import css from './OrderListPage.module.scss';

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
        <div className={css.container}>
            <h1 className={css.title}>Заказы</h1>
            <div className={css.card}>
                <div className={css.card__header}>
                    <FilterForm filterData={filterData} />
                </div>
                <div className={css.card__main}>
                    <OrderListRow {...order} />
                    <OrderListRow {...order} />
                    <OrderListRow {...order} />
                    <OrderListRow {...order} />
                    <OrderListRow {...order} />
                </div>
                <div className={css.card__footer}>
                    <Pagination />
                </div>
            </div>
        </div>
    );
}

export default OrderListPage;
