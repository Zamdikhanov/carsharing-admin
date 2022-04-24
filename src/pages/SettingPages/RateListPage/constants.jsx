export const rateListPageCountFilter = {
    defaultValue: null,
    options: [
        {
            value: 1,
            label: 'по 1 на странице',
        },
        {
            value: 2,
            label: 'по 2 на странице',
        },
        {
            value: 3,
            label: 'по 3 на странице',
        },
        {
            value: 5,
            label: 'по 5 на странице',
        },
        {
            value: 10,
            label: 'по 10 на странице',
        },
        {
            value: 20,
            label: 'по 20 на странице',
        },
    ],
    id: 'rateListPageCountFilter',
    name: 'rateListPageCountFilter',
    placeholder: 'Вывод на стр.',
};

export const rateListPriceFilter = {
    defaultValue: null,
    options: [
        {
            value: 0,
            label: 'Цена (без сорт.)',
        },
        {
            value: 1,
            label: 'по возр. цены',
        },
        {
            value: -1,
            label: 'по убыв. цены',
        },
    ],
    id: 'rateListPriceFilter',
    name: 'rateListPriceFilter',
    placeholder: 'Цена',
};
