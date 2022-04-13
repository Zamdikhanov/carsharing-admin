function formatDate(date) {
    const formatedDay = (new Date(date)).toLocaleDateString('ru');
    const formatedTime = (new Date(date)).toLocaleTimeString('ru', { hour: 'numeric', minute: 'numeric' });
    return `${formatedDay} ${formatedTime}`;
}

export default formatDate;