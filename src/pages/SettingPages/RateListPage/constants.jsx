export const rateListPageCountFilter = {
    defaultValue: null,
    options: [
        {
            value: 1,
            label: 'по 1 на стр.',
        },
        {
            value: 2,
            label: 'по 2 на стр.',
        },
        {
            value: 4,
            label: 'по 4 на стр.',
        },
        {
            value: 10,
            label: 'по 10 на стр.',
        },
        {
            value: 20,
            label: 'по 20 на стр.',
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
            label: 'без сорт. цены',
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
