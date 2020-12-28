import countryData from '../data/countryData.json';

const mapCountryData = new Map(countryData.map((n => [n.dialCode, n.isoCode])))


export const findFlag = (value) => {
    return mapCountryData.get(value) ||
        mapCountryData.get(value.slice(0, 4)) ||
        mapCountryData.get(value.slice(0, 3)) ||
        mapCountryData.get(value.slice(0, 2)) ||
        ''
};



// export const findFlag = (value, array) => {
//     console.log(value)
//     return array.find(item => item.dialCode === `+${value.slice(0, 4)}`) ||
//         array.find(item => item.dialCode === `+${value.slice(0, 3)}`) ||
//         array.find(item => item.dialCode === `+${value.slice(0, 2)}`) ||
//         array.find(item => item.dialCode === `+${value.slice(0, 1)}`) ||
//         {}
// };
