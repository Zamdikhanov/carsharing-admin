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
            label: 'Единицы А - Я',
            value: 'sort[unit]=1&',
        },
        {
            label: 'Единицы Я - А',
            value: 'sort[unit]=-1&',
        },
    ],
    id: 'listSortFilter',
    name: 'listSortFilter',
    placeholder: 'Сортировка',
};

export default listSortFilter;
