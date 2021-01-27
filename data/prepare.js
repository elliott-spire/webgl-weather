const PNG = require('pngjs').PNG;
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('tmp.json'));
const name = process.argv[2];
// const u = data.u;
// const v = data.v;
const uMess = data.u.messages[0];
const vMess = data.v.messages[0];

let u = {};
let v = {};
// Reformat the data for easier lookups
for (let i = 0; i < uMess.length; i++) {
    const ukey = uMess[i].key;
    const uval = uMess[i].value;
    u[ukey] = uval;
    const vkey = vMess[i].key;
    const vval = vMess[i].value;
    v[vkey] = vval;
}

// console.log('u', u.values.length)
// console.log('v', v.values.length)

// Get the data width
let width = u.Ni;
// width must be even number
if (width % 2 != 0) {
    width += 1;
}
// Get the data height
const height = u.Nj - 1;
// height must be even number
if (height % 2 != 0) {
    height += 1;
}

// console.log('wh',width, height)

// Initialize new PNG
const png = new PNG({
    colorType: 2,
    filterType: 4,
    width: width,
    height: height
});

// Populate PNG with GRIB2 data values
for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        const k = y * width + (x + width / 2) % width;
        // console.log('i', i)
        // console.log('k', k)
        // red
        png.data[i + 0] = Math.floor(255 * (u.values[k] - u.minimum) / (u.maximum - u.minimum));
        // green
        // console.log(u.values, v.values)
        // console.log('red', Math.floor(255 * (u.values[k] - u.minimum) / (u.maximum - u.minimum)))
        // console.log('green', Math.floor(255 * (v.values[k] - v.minimum) / (v.maximum - v.minimum)))
        png.data[i + 1] = Math.floor(255 * (v.values[k] - v.minimum) / (v.maximum - v.minimum));
        // blue
        png.data[i + 2] = 0;
        // alpha
        png.data[i + 3] = 255;
    }
}

// Write PNG file
png.pack().pipe(fs.createWriteStream(name + '.png'));

// Write JSON config file
fs.writeFileSync(name + '.json', JSON.stringify({
    source: 'https://spire.com/weather/',
    date: formatDate(u.dataDate + '', u.dataTime),
    width: width,
    height: height,
    uMin: u.minimum,
    uMax: u.maximum,
    vMin: v.minimum,
    vMax: v.maximum
}, null, 2) + '\n');

// Create datetime string
function formatDate(date, time) {
    return date.substr(0, 4) + '-' + date.substr(4, 2) + '-' + date.substr(6, 2) + 'T' +
        (time < 10 ? '0' + time : time) + ':00Z';
}
