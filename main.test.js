const { test } = require('@jest/globals');
const { simple_string_calculation } = require('./main');

test('String is empty', () => {
    const s = '';
    expect(simple_string_calculation(s)).toBe(0);
});

test('String is null', () => {
    const s = null;
    expect(simple_string_calculation(s)).toBe(0);
});

test('String is 1,2,3,4', () => {
    const s = '1,2,3,4';
    expect(simple_string_calculation(s)).toBe(10);
})

test(`String can include special character: ${JSON.stringify('\n')}`, () => {
    const s1 = '1,\n2,4';
    const s2 = '1\n,2,3';
    expect(simple_string_calculation(s1)).toBe(7);
    expect(simple_string_calculation(s2)).toBe(6);
})


test(`Support custom delimiter with format: ${JSON.stringify('//[delimiter]\n[delimiter separated numbers]')}`, () => {
    const s1 = '//;\n1;3;4';
    const s2 = '//$\n1$2$3';
    const s3 = '//@\n2@3@8';
    expect(simple_string_calculation(s1)).toBe(8);
    expect(simple_string_calculation(s2)).toBe(6);
    expect(simple_string_calculation(s3)).toBe(13);
})

test(`Support custom delimiter with format: ${JSON.stringify('//[delimiter]\n[delimiter separated numbers]')}`, () => {
    const s1 = '//;\n1;3;4';
    const s2 = '//$\n1$2$3';
    const s3 = '//@\n2@3@8';
    expect(simple_string_calculation(s1)).toBe(8);
    expect(simple_string_calculation(s2)).toBe(6);
    expect(simple_string_calculation(s3)).toBe(13);
})

test('String contains negative numbers', () => {
    const s = '//;\n1;-3;-4';
    expect(() => simple_string_calculation(s)).toThrow('Negatives not allowed. The numbers caused the error: -3,-4');
})

test('String contains numbers larger than 1000 will be ignored', () => {
    const s = '//;\n2;1001';
    expect(simple_string_calculation(s)).toBe(2);
})

test('Delimiters can be arbitrary length', () => {
    const s = '//***\n1***2***3';
    expect(simple_string_calculation(s)).toBe(6);
})

test('1.1 Allow for multiple delimiters', () => {
    const s = '//$,@\n1$2@3';
    expect(simple_string_calculation(s)).toBe(6);
})

test('1.2 Allow for multiple delimiters', () => {
    const s = '//$,,,@\n1,2$3,4@5';
    expect(simple_string_calculation(s)).toBe(15);
})

test('Allow for multiple delimiters with arbitrary length', () => {
    const s = '//%%%,&&\n1%%%3&&2';
    expect(simple_string_calculation(s)).toBe(6);
})

test('String contains delimiters that not supported yet. Ex: ' + `${JSON.stringify('//\n\n1\n3\n4')}`, () => {
    const s = '//\n\n1\n3\n4';
    expect(() => simple_string_calculation(s)).toThrow('Does not support this delimiter or no delimiter was recieved!');
})

test('String contains no delimiter in format Ex: ' + `${JSON.stringify('//\n123')}`, () => {
    const s = '//\n123';
    expect(() => simple_string_calculation(s)).toThrow('Does not support this delimiter or no delimiter was recieved!');
})