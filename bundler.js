
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