// node.js, the same, but with sugar:
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

/* 读取单个文件 */
async function readFile(src) {
    return new Promise(function (resolve, reject) {
        fs.readFile(src, 'utf8', function (err, data) {
            resolve({
                title: src,
                content: data
            })
        });
    });
};

/* 单个读文件是同步的，所以的是异步的 */
async function readDir(dirSrc) {
    return new Promise(function (resolve, reject) {
        fs.readdir(dirSrc, (err, files) => {
            resolve(files.map((item) => {
                return item;
                // return path.join(path.join(__dirname, dirSrc), item);
            }));
        });
    });
};

/* 单个读文件是同步的，所以的是异步的 */
async function readAllFile(dirSrc, srcArr) {
    srcArr = srcArr instanceof Array ? srcArr : [];
    return Promise.all(srcArr.map(
        // (item) => readFile(item));
        (item) => {
            if (fs.Stats.isDirectory()) {
                // var fileSrcArr = await readDir(dirSrc);?
            } else {

                return readFile(item);
            }
        }
    ));
};

/* 单个读文件是同步的，所以的是异步的 */
async function writeDemo(demoArr) {
    let { content: readmeFile } = await readFile(path.join(__dirname, "../README.md"));
    if (!readmeFile) {
        return
    }

    let sumDemo = '';
    demoArr.forEach((item, key) => {
        sumDemo = '\n' + item.title + '\n' + '```jsx\n' + item.content + '\n```';
    });

    fs.writeFile(path.join(__dirname, "../README.md"), readmeFile + sumDemo, (err) => {
        if (err) throw err;
        console.log('successful!The file has been changed!');
    });
};
/* 单个读文件是同步的，所以的是异步的 */
function handleSrc(dirSrc, fileSrcArr) {
    let filterCallback = (item) => {
        return true;
        // return /js/.test(item);
    };
    let rtnArr = fileSrcArr instanceof Array ? fileSrcArr.filter(filterCallback).map((item) => path.join(dirSrc, item)) : [];
    return rtnArr;
};

/* 把demo 插进去 */
async function renderMarkDown([htmlFileSrc, ...mdFileSrc]) {
    var dirSrc = path.join(__dirname, "../example");
    var fileSrcArr = await readDir(dirSrc);
    var fileContentArr = await readAllFile(dirSrc, handleSrc(dirSrc, fileSrcArr));
    if (fileContentArr instanceof Array) {
        await writeDemo(fileContentArr);
    }
}

renderMarkDown(['../README.md', '../docs/index.html']);