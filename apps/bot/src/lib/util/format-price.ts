export const formatPrice = (
    num: number,
    digits = 2,
    symbol: string | boolean = true,
    asObject = false
) => {
    const values = [
        { value: 1, symbol: 'c' },
        { value: 1e3, symbol: 'k' },
        { value: 1e6, symbol: 'M' },
        { value: 1e9, symbol: 'B' },
        { value: 1e12, symbol: 'T' },
        { value: 1e15, symbol: 'P' },
        { value: 1e18, symbol: 'E' },
    ];
    const regex = /\.0+$|(\.[0-9]*[1-9])0+$/;

    let i;
    for (i = values.length - 1; i > 0; i--) {
        if (num >= values[i].value) {
            break;
        }
    }

    const value = (num / values[i].value).toFixed(digits).replace(regex, '$1');
    symbol = symbol ? values[i].symbol : '';

    if (asObject) {
        return {
            value: value,
            symbol: symbol,
        };
    }

    return value + symbol;
};
