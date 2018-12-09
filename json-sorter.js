import * as fileUtils from './utils/files';
import { serializeJSON } from './utils/serialize';
import { isObject } from './utils/types';
import { sortFilesContentByKey } from './utils/files/sort';
import args from './utils/args';

fileUtils.readJSONFilesFromFolder(args.folder)
    .then(filterObjects)
    .then(sortFilesContentByKey)
    .then(files => fileUtils.writeFiles(args.folder, files));

export function filterObjects(fileContents) {
    return Promise.resolve(
        fileContents.filter(({content}) => isObject(content))
    );
}


