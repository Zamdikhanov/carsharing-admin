const listSortFilter = {
    defaultValue: null,
    options: [
        {
            label: 'Без сортировки',
            value: '',
        },
        {
            label: 'Название А - Я',
            value: 'sort[name]=1&',
        },
        {
            label: 'Название Я - А',
            value: 'sort[name]=-1&',
        },
        {
            label: 'Сначала дешевые',
            value: 'sort[priceMin]=1&',
        },
        {
            label: 'Сначала дорогие',
            value: 'sort[priceMax]=-1&',
        },
    ],
    id: 'listSortFilter',
    name: 'listSortFilter',
    placeholder: 'Сортировка',
};

export default listSortFilter;
