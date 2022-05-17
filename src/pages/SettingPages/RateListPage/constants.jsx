const rateListSortFilter = {
    options: [
        {
            label: 'Без сортировки',
            value: '',
        },
        {
            label: 'Цена по возраст.',
            value: 'sort[price]=1&',
        },
        {
            label: 'Цена по убыван.',
            value: 'sort[price]=-1&',
        },
    ],
    id: 'rateListSortFilter',
    name: 'rateListSortFilter',
    placeholder: 'Сортировка',
};

export default rateListSortFilter;
