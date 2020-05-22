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

// console.log('u', u)
// console.log('v', v)

// Get the data width
const width = u.Ni;
// Get the data height
const height = u.Nj - 1;

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
        // red
        png.data[i + 0] = Math.floor(255 * (u.values[k] - u.minimum) / (u.maximum - u.minimum));
        // green
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
