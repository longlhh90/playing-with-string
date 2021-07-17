function simple_string_calculation(string) {
    if (!string) {
        return 0;
    }
    try {
        [d, string_numbers] = get_delimiter_and_str_numbers(string);
        const delimiter = convert_delimiter(d);
        list_numbers = string_numbers.split(delimiter);
        console.log(d, string_numbers, delimiter, list_numbers)
        list_negative_numbers = validate_numbers(list_numbers);
        if (list_negative_numbers.length > 0) {
            throw new Error(`Negatives not allowed. The numbers caused the error: ${list_negative_numbers}`);
        }

        return list_numbers.reduce((accumulator, currentValue) => {
            const v = parseInt(currentValue);
            return accumulator + (v > 1000 ? 0 : v);
        }, 0);
    } catch (err) {
        //TODO: need custom error handlers 
        throw err;
    }
}

function get_delimiter_and_str_numbers(string) {
    if (string.startsWith('//\n\n') || string.startsWith('//\n')) {
        throw new Error("Does not support this delimiter or no delimiter was recieved!");
    }

    if (string.startsWith('//')) {
        slice_to_index = string.indexOf('\n');
        d = string.slice(2, slice_to_index);
        string_numbers = string.slice(slice_to_index + 1);
        console.log(`slice_to_index: ${slice_to_index}, d: ${d}, string_numbers: ${string_numbers}`)
    }
    else {
        d = null;
        string_numbers = string;
    }
    return [d, string_numbers];
}

function validate_numbers(list_numbers) {
    let list_negative_numbers = [];
    list_numbers.forEach(number => {
        if (number < 0) {
            list_negative_numbers = [...list_negative_numbers, number];
        }
    });
    return list_negative_numbers;
}

function convert_delimiter(delimiter) {
    if (!delimiter) {
        return ',';
    }

    if (delimiter.includes(',')) {
        const _d = delimiter.split(',').join('');
        return RegExp(`[${_d},]+`); // always add , to handle the case delimiters may include ','
    }
    else {
        return delimiter;
    }
}

module.exports = { simple_string_calculation };