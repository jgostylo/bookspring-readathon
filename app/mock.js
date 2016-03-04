'use strict';

var FireBase = require('firebase');
var moment = require('moment');

var zipCodeData = [78130,78132,78602,78606,78610,78613,78617,78619,78620,78621,78626,78628,78633,78634,78640,78641,78642,78644,78645,78653,78654,78657,78660,78664,78665,78666,78669,78676,78681,78701,78702,78703,78704,78705,78717,78719,78721,78722,78723,78724,78725,78726,78727,78728,78729,78730,78731,78732,78733,78734,78735,78736,78737,78738,78739,78740,78741,78742,78744,78745,78746,78747,78748,78749,78750,78751,78752,78753,78754,78756,78757,78758,78759,78942,78957];
var dateData = [30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
var minutesArray = [15, 30, 45, 60, 75, 90, 105, 120];
var uid = 'dd540656-7b6f-4578-9219-910785c19936';

function generateMockEntry() {
    var mockEntry = {
        uid: uid,
    };
    var key = Math.floor(Math.random() * zipCodeData.length);
    var dayKey = Math.floor(Math.random() * dateData.length);
    var minutesKey = Math.floor(Math.random() * minutesArray.length);
    var date = moment().utc().subtract(dateData[dayKey], 'days').toDate().toJSON();
    mockEntry.submitted = date;
    mockEntry.zipCode = zipCodeData[key];
    mockEntry.minutesRead = minutesArray[minutesKey];
    console.log(mockEntry);
    return mockEntry;
}

function generateMockAllEntriesData() {
    var ref = new FireBase('popping-heat-442.firebaseio.com/entries/all');
    var i = 100;
    while(i--) {
        var mockEntry = generateMockEntry();
        console.log(mockEntry);
        ref.push(mockEntry);
    }
}

function generateMockUserEntries() {
    var ref = new FireBase('popping-heat-442.firebaseio.com/entries/users/' + uid);
    var i = 100;
    while(i--) {
        var mockEntry = generateMockEntry();
        console.log(mockEntry);
        ref.push(mockEntry);
    }
}


// generateMockUserEntries();
// generateMockAllEntriesData();

