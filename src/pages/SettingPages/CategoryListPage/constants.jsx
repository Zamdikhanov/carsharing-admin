const listSortFilter = {
    defaultValue: null,
    options: [
        {
            label: 'Без сортировки',
            value: '',
        },
        {
            label: 'Категории А - Я',
            value: 'sort[name]=1&',
        },
        {
            label: 'Категории Я - А',
            value: 'sort[name]=-1&',
        },
    ],
    id: 'listSortFilter',
    name: 'listSortFilter',
    placeholder: 'Сортировка',
};

export default listSortFilter;
