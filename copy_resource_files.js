#!/usr/bin/env node

// each object in the array consists of a key which refers to the source and
// the value which is the destination.
const filestocopy = [
/*  {
    "res/android/notification_icon.png": "platforms/android/res/drawable/notification_icon.png"
} */];

const fs = require('fs');
const path = require('path');

// no need to configure below
let rootdir = process.argv[2];
console.log(rootdir);
rootdir = '';

filestocopy.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
        const val = obj[key];
        const srcfile = path.join(rootdir, key);
        const destfile = path.join(rootdir, val);
        console.log(`copying ${srcfile} to ${destfile}`);
        const destdir = path.dirname(destfile);
        console.log(`copy - ${srcfile}`);
        console.log(`to - ${destdir}`);
        fs.mkdir(destdir, (e) => {
            if (!e || (e && e.code === 'EEXIST')) {
                if (fs.existsSync(srcfile) && fs.existsSync(destdir)) {
                    fs.createReadStream(srcfile).pipe(
                        fs.createWriteStream(destfile));
                    console.log('Copied ');
                }
            } else {
                // debug
                console.log(e);
            }
        });
    });
});


const pathToManifest = path.join(__dirname, './platforms/android', 'AndroidManifest.xml');
if (fs.existsSync(pathToManifest)) {
    const config = fs.readFileSync(pathToManifest, 'utf8');

    const result = config.replace(/(android:windowSoftInputMode=").*?(")/, '$1adjustPan$2');
    fs.writeFileSync(pathToManifest, result, 'utf8');

    console.log('Set android:windowSoftInputMode to adjustPan');
} else {
    console.log('Could not find AndroidManifest to set android:windowSoftInputMode');
}
