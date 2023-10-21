export const startOfWeek = (date) => {
    const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
};

export const endOfWeek = (date) => {
    const diff = date.getDate() + (date.getDay() === 0 ? 0 : 7 - date.getDay());
    return new Date(date.setDate(diff));
};

export const previousWeek = (date) => {
    const diff = date.getDate() - 7;
    return new Date(date.setDate(diff));
};

export const nextWeek = (date) => {
    const diff = date.getDate() + 7;
    return new Date(date.setDate(diff));
};

export const formatDateString = (date) => {
    return `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}/${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}/${date.getFullYear() - 2000}`;
};

export const toISODate = (date) => {
    const tzOffset = -date.getTimezoneOffset();
    const diff = tzOffset >= 0 ? '+' : '-';
    const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate());
};