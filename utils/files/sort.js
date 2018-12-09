import { FILE_CONTENT_PROP } from './constants';
import { insertKey } from '../args';

export function sortFilesContentByKey(files) {
    const filesCopy = files.slice();
    
    if (insertKey) {
        const [key, value] = insertKey.split(':');
        filesCopy.forEach(file => file[FILE_CONTENT_PROP][key] = value);
    }

    return Promise.resolve(filesCopy.map(sortFile));
}

function sortFile(file) {
    const sortedKeys = Object.keys(file[FILE_CONTENT_PROP]).sort((a, b) => {
        if (a > b) return 1;
        else if (a < b) return -1;
        return 0;
    });

    const sortedObjects = sortedKeys.map(key => {
        return {
            key,
            value: file[FILE_CONTENT_PROP][key]
        }
    });

    file[FILE_CONTENT_PROP] = sortedObjects;
    return file;
}
