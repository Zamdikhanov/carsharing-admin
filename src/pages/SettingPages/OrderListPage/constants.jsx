const listSortFilter = {
    defaultValue: null,
    options: [
        {
            label: 'Сортировка',
            value: '',
        },
        {
            label: 'Новые заказы сначала',
            value: 'sort[createdAt]=-1&',
        },
        {
            label: 'Старые заказы сначала',
            value: 'sort[createdAt]=1&',
        },
        {
            label: 'Цена по возрастанию',
            value: 'sort[price]=1&',
        },
        {
            label: 'Цена по убыванию',
            value: 'sort[price]=-1&',
        },
    ],
    id: 'listSortFilter',
    name: 'listSortFilter',
    placeholder: 'Сортировка',
};

export default listSortFilter;
