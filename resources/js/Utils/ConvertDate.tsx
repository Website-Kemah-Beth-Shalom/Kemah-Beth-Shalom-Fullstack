export function convertDate(date: any) {
    // convert Thursday, 2023-12-26 14:47:00 to 26 December 2023
    // to 26 Dec, 2023
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString('default', { month: 'short' });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `${day} ${month}, ${year}`;
}