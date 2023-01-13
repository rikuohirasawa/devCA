import moment from "moment";

export const decodeTechnologyName = (technology: string) => {
    let decoded: string = decodeURIComponent(technology);
    if (decoded.toLowerCase().includes('developer')) {
        decoded = decoded.replace('developer', '');
    } else if (decoded.toLowerCase().includes('language')) {
        decoded = decoded.replace('language', '');
    };
    return decoded.charAt(0).toUpperCase() + decoded.slice(1);
}

export const decodeDate = (date: string) => {
    const getYear = moment(date).format('YYYY'),
    getMonth = moment(date).format('MMMM'),
    getDay = moment(date).format('DD')
    return getMonth + ' ' + getDay + ', ' + getYear

}