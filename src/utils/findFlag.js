export const findFlag = (value, array) => {
    return array.find(item => item.dialCode === `+${value.slice(0, 4)}`) ||
        array.find(item => item.dialCode === `+${value.slice(0, 3)}`) ||
        array.find(item => item.dialCode === `+${value.slice(0, 2)}`) ||
        array.find(item => item.dialCode === `+${value.slice(0, 1)}`) ||
        {}
};
