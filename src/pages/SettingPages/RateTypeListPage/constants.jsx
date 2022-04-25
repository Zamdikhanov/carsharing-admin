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

export const rateListSortFilter = {
    defaultValue: null,
    options: [
        {
            value: 'unsorted',
            label: 'Сортировка',
        },
        {
            value: 'unit A-Z',
            label: 'Единицы А - Я',
        },
        {
            value: 'unit Z-A',
            label: 'Единицы Я - А',
        },
        {
            value: 'title A-Z',
            label: 'Название А - Я',
        },
        {
            value: 'title Z-A',
            label: 'Название Я - А',
        },
    ],
    id: 'rateListSortFilter',
    name: 'rateListSortFilter',
    placeholder: 'Сортировка',
};
