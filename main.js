/*
 * general javascript utilities 
 */

let { fs, path, stream } = require('./libraries');
let e = module.exports;

/**
 * @name getJsonFile
 * @public
 * @function
 * @return {JSON} returns the file as a JSON
 * @description pass in a file path and get it returned as a json
 * @param {string} path
 **/
e.getJsonFile = function (path) {
    return JSON.parse(fs.readFileSync(path));
};

e.ensureDirectoriesExist = function (filePath) {
    //If directory exists, if not, then create it before publishing
    let dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
};

e.createFile = (pathToFile) => {

    e.ensureDirectoriesExist(pathToFile);    

    let ws = fs.createWriteStream(pathToFile);

    //ws.on('finish', function (err) {
    //    if (err) console.log(err);
    //});

    return ws;
};

//https://medium.freecodecamp.org/node-js-streams-everything-you-need-to-know-c9141306be93
const { Transform } = stream; 

e.reportProgress = new Transform({
    transform(chunk, encoding, callback) {
        process.stdout.write('.');
        //process.stdout.write('\n' + chunk);
        //callback(null, chunk);
        callback();
    }
});

e.writeToFile = (path) => {
    e.ensureDirectoriesExist(path);
    let ws = fs.createWriteStream(path);

    let stream = new Transform({
        transform(chunk, encoding, callback) {
            process.stdout.write('.'); //give processing visual
            ws.write(chunk, encoding); //write data to file
            callback();
        }
    });

    stream.on('end', () => {
        console.log('Done Writing');
        ws.end(); //end the write stream
    });
    
    return stream;
};