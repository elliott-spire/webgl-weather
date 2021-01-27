# Spire Ocean Currents Visualization

Live demo here: https://elliott-spire.github.io/webgl-weather/demo/

Adapted from WebGL Wind demo: https://github.com/mapbox/webgl-wind

### Preparing weather data

1. Install [ecCodes](https://confluence.ecmwf.int//display/ECC/ecCodes+Home) (e.g. `brew install eccodes`).
2. Download Spire Weather GRIB2 files for the Maritime Bundle with Ocean Currents U and V components.
3. Run `./data/generate_currents.sh <grib> <outputdirectory>` to generate currents data files (`png` and `json`) for use with the library.
4. Put `png` and `json` files into `demo/currents/` or `demo/winds/`
5. Change the datetime in `currentsFiles` and `meta` variables in `demo/index.js`

### Running the demo locally

```bash
npm install
npm run build
npm start
# open http://127.0.0.1:1337/demo/
```