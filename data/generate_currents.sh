#!/bin/bash

printf "${1} \n"

GFS_DATE=$(echo ${1} | cut -c7-14) # 20200429
GFS_TIME=$(echo ${1} | cut -c17-18) # 00, 06, 12, 18

printf "$GFS_DATE $GFS_TIME \n"

grib_set -r -s packingType=grid_simple ${1} simple_gr.grib

# printf "{\"u\":`grib_dump -w cfName=eastward_wind -j simple_gr.grib`,\"v\":`grib_dump -w cfName=northward_wind -j simple_gr.grib`}" > tmp.json
printf "{\"u\":`grib_dump -w shortName=ucurr -j simple_gr.grib`,\"v\":`grib_dump -w shortName=vcurr -j simple_gr.grib`}" > tmp.json

DIR=`dirname $0`
node ${DIR}/prepare.js ${2}/${GFS_DATE}${GFS_TIME}

rm simple_gr.grib
rm tmp.json
