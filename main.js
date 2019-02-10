/*
 * general javascript utilities 
 */

let fs = require('fs'),
    path = require('path');

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
    return fs.createWriteStream(pathToFile);
};



e.bundler = function (b, outputPath) {
    console.log('Building...');

    //let str = progress({
    //    time: 100
    //}, async function (progress) {        
    //    await process.stdout.write(Math.round(progress.percentage) + '%');
    //});

    async function bundleLogger(err, buff) {
        if (err)
            console.log(err);

        await process.stdout.write(buff);
    }

    //b.pipeline.on('transform', function (tr, file) {
    //    console.log('transforming ' + path.basename(file));
    //});

    //b.pipeline.on('file', function (file, id, parent) {
    //    console.log('bundling ' + path.basename(file));
    //});

    //b.pipeline.on('package', function (pkg) {
    //    console.log('reading ' + pkg.name);
    //});

    //b.on('bundle', function (bundle) {
    //    //console.log(bundle);
    //    //return bundle.pipe(str);
    //    bundle.on('data', log);
    //    let writeStream = new fs.WriteStream(outputPath);

    //    writeStream.on('error', function (err) {
    //        console.log(err);
    //    });

    //    async function log(data) {
    //        await console.log(data);
    //        writeStream.write(data);
    //    }
    //});


    return b
        .bundle()
        //.pipe(str)
        //.pipe(process.stdout)
        .pipe(e.createFile(outputPath));
};