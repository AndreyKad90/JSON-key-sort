import { isObject, isArray } from './types';

export function serializeJSON(elements) {
    let result = '{\n';

    const getIndentation = (depth) => '\t'.repeat(depth);
    const appendCommaAndLineBreak = (isCommaNeeded) => {
        result += `${isCommaNeeded ? ',': ''}\n`;
    }
    
    const processElement = (key, value, depth, isCommaNeeded) => {
        const indentation = getIndentation(depth);
        if (isObject(value)) {
            result += `${indentation}"${key}": {\n`

            const keys = Object.keys(value);
            let processed = 0;
            for (let prop in value) {
                processElement(prop, value[prop], depth + 1, processed < keys.length - 1);
                processed++;
            }
            result += `${indentation}}`;
        } else {
            result += `${indentation}"${key}": ${serializeValue(value)}`;
        }
        appendCommaAndLineBreak(isCommaNeeded);
    };

    elements.forEach(({key, value}, index) => processElement(key, value, 1, index < elements.length - 1));

    return result + "}";
}

function serializeValue(value) {
    switch(typeof value) {
        case 'number':
            return Number(value);
        case 'string':
            return `"${value}"`;
        default:
            return JSON.stringify(value);
    }
}