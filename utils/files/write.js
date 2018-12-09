import fs from 'fs';

import { serializeJSON } from '../serialize';
import { FILE_NAME_PROP, FILE_CONTENT_PROP } from './constants';

export function writeFiles(folder, files) {
    const promises = files.map(file => {
        const filePath = `${folder}/${file[FILE_NAME_PROP]}`;
        return writeFile(filePath, file[FILE_CONTENT_PROP]);
    });

    return Promise.all(promises);
}

function writeFile(filePath, content) {
    return new Promise(resolve => {
        fs.writeFile(filePath, serializeJSON(content), resolve)
    });
}