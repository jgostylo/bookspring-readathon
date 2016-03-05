'use strict';

var _ = require('lodash');

/* @ngInject */
function ReadingMapFactory() {

    function createMinutesMap(zipCodesSnapshot) {
        var minutesReadMap = {};
        zipCodesSnapshot.forEach(function (entrySnapshot) {
            var entry = entrySnapshot.val();
            if (minutesReadMap[entry.zipCode]) {
                minutesReadMap[entry.zipCode] += entry.minutesRead;
            }
            else {
                minutesReadMap[entry.zipCode] = entry.minutesRead;
            }
        });
        return minutesReadMap;
    }

    function convertReadingMapToArray(minutesReadMap) {
        var mapData = [];
        _.forEach(minutesReadMap, function (value, key) {
            mapData.push({zipCode: key, minutesRead: value});
        });
        return mapData;
    }

    function join(lookupTable, mainTable, lookupKey, mainKey, select) {
        var l = lookupTable.length,
            m = mainTable.length,
            lookupIndex = [],
            output = [];
        for (var i = 0; i < l; i++) { // loop through l items
            var row = lookupTable[i];
            lookupIndex[row[lookupKey]] = row; // create an index for lookup table
        }
        for (var j = 0; j < m; j++) { // loop through m items
            var y = mainTable[j];
            var x = lookupIndex[y[mainKey]]; // get corresponding row from lookupTable
            output.push(select(y, x)); // select only the columns you need
        }
        return output;
    }

    return {
        join: join,
        createMinutesMap: createMinutesMap,
        convertReadingMapToArray: convertReadingMapToArray
    };

}

module.exports = ReadingMapFactory;
