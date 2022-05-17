const listSortFilter = {
    defaultValue: null,
    options: [
        {
            label: 'Без сортировки',
            value: '',
        },
        {
            label: 'Точки А - Я',
            value: 'sort[name]=1&',
        },
        {
            label: 'Точки Я - А',
            value: 'sort[name]=-1&',
        },
        {
            label: 'Адрес А - Я',
            value: 'sort[address]=1&',
        },
        {
            label: 'Адрес Я - А',
            value: 'sort[address]=-1&',
        },
    ],
    id: 'listSortFilter',
    name: 'listSortFilter',
    placeholder: 'Сортировка',
};

export default listSortFilter;
