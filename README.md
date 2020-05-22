# Spire Ocean Currents Visualization

Adapted from WebGL Wind demo: https://github.com/mapbox/webgl-wind

### Running the demo locally

```bash
npm install
npm run build
npm start
# open http://127.0.0.1:1337/demo/
```

### Downloading weather data

1. Install [ecCodes](https://confluence.ecmwf.int//display/ECC/ecCodes+Home) (e.g. `brew install eccodes`).
2. Download Spire Weather GRIB2 files for the Maritime Bundle with Ocean Currents U and V components.
3. Run `./data/generate_currents.sh <grib> <outputdirectory>` to generate currents data files (`png` and `json`) for use with the library.
