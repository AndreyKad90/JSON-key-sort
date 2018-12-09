import fs from 'fs';

import { FILE_NAME_PROP, FILE_CONTENT_PROP } from './constants';

export function readJSONFilesFromFolder(folder) {
    return extractJsonFilesFromFolder(folder)
        .then(files => {
            return Promise.all(
                files.map(file => readJSONFile(folder, file))
            );
        });
}

function extractJsonFilesFromFolder(folder) {
    return new Promise((resolve, reject) => {
        fs.readdir(folder, (err, files) => {
            if (err) {
                return reject('The folder you specified does not exist');
            }

            const jsonFiles = filterFilesByExtension(files, 'json');
            resolve(jsonFiles);
        });
    });
}

function filterFilesByExtension(files, extension) {
    return files.filter(file => getFileExtension(file) === extension);
}

function getFileExtension(file) {
    return file.split('.').pop();
}

function readJSONFile(folder, file) {
    return new Promise((resolve) => {
        const filePath = `${folder}/${file}`;
        fs.readFile(filePath, (err, content) => {
            if (err) {
                return;
            }
        
            resolve({ 
                [FILE_NAME_PROP]: file, 
                [FILE_CONTENT_PROP]: JSON.parse(content) 
            });
        });
    });
}

