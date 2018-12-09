import minimist from 'minimist';

const requiredArgs = {
    'f': 'folder'
};

const optionalArgs = {
    'i': 'insert key',
    'r': 'remove key'
};

const args = minimist(global.process.argv.slice(2));

Object.keys(requiredArgs).forEach(argKey => {
    if (args[argKey] === undefined) {
        console.error(`The argument -${argKey} is missing (${requiredArgs[argKey]})`);
        global.process.exit();
    }
})

Object.keys(args).forEach(arg => {
    if (!['f', '_'].includes(arg) && !optionalArgs[arg]) {
        console.error(`You have passed an invalid argument -${arg}!`);
        global.process.exit();
    }
});

export default {
    folder: args.f,
    insertKey: args.i,
    removeKey: args.r
};