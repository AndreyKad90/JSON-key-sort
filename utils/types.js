export function isObject(value) {
    return isType(value, 'Object');
}

export function isArray(value) {
    return isType(value, 'Array');
}

function isType(value, type) {
    return Object.prototype.toString.call(value) === `[object ${type}]`;
}