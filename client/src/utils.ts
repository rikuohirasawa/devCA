import moment from "moment";

// object to convert abbreviated region ids to region names
export const convertNames: { [region: string]: string } = {
    'AB': 'Alberta',
    'BC': 'British Columbia',
    'MB': 'Manitoba',
    'NB': 'New Brunswick',
    'NF': 'Newfoundland and Labrador',
    'NT': 'Northwest Territories',
    'NS': 'Nova Scotia',
    'NU': 'Nunavut',
    'ON': 'Ontario',
    'PE': 'Prince Edward Island',
    'QC': 'Quebec',
    'SK': 'Saskatchewan',
    'YT': 'Yukon'
};

export const decodeDate = (date: string) => {
    const getYear = moment(date).format('YYYY'),
    getMonth = moment(date).format('MMMM'),
    getDay = moment(date).format('DD')
    return getYear && getMonth && getDay ? getMonth + ' ' + getDay + ', ' + getYear : date
}