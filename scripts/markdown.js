// node.js, the same, but with sugar:
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

/* 读取单个文件 */
async function readFile(src) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path.join(__dirname, src), 'utf8', function (err, data) {
            resolve(data)
        });
    });
};

/* 单个读文件是同步的，所以的是异步的 */
async function readAllFile(srcArr) {
    srcArr = srcArr instanceof Array ? srcArr : [];
    return Promise.all(srcArr.map((item) => readFile(item)));
};

/* 插入markdown */
async function writeHtml(mdHtml, html) {
    const $ = cheerio.load(html)
    $('#markdown').html(mdHtml);
    return new Promise(function (resolve, reject) {
        fs.writeFile(path.join(__dirname, '../docs/index.html'), $.html(), (err) => {
            if (err) throw err;
            console.log('successful!The file has been changed!');
        });
    })
}

/* 渲染markdown到html中 */
async function renderMarkDown([htmlFileSrc, ...mdFileSrc]) {
    var md = require('markdown-it')();

    let [htmlData, ...mdData] = await readAllFile([htmlFileSrc, ...mdFileSrc]);

    var mdHtml = '';
    mdData.forEach(element => {
        mdHtml += md.render(mdData);
    });

    await writeHtml(mdHtml, htmlData);
}

renderMarkDown(['../README.md', '../docs/index.html']);



