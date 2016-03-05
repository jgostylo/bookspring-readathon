/*jshint -W109 */
'use strict';

var d3 = require('d3');
var _ = require('lodash');
var topojson = require('topojson');
var txJson = require('./texas.json');
var moment = require('moment');
var tip = require('d3-tip');
d3.tip = tip;

/* @ngInject */
function ReadingMapController($rootScope, $scope, bsrFirebase, $window, readingMapFactory) {

    var margin = {top: 10, left: 10, bottom: 10, right: 10},
    elWidth = parseInt(d3.select('#map').style('width')),
    width = elWidth - margin.left - margin.right,
    mapRatio = 0.7,
    height = width * mapRatio;

    var mapContainer = d3.select("#map"), projection, path, colorScale;
    var texas = topojson.feature(txJson, txJson.objects.texas);

    function createReadingMapTopoEntry(town, zipCode) {
        return {
            id: town.id,
            type: town.type,
            geometry: town.geometry,
            properties: {
                town: town.properties.town,
                timeRead:(zipCode !== undefined) ? zipCode.minutesRead : null,
                color:(zipCode !== undefined) ? colorScale(zipCode.minutesRead) : null,
            }
        };
    }

    function initializeMap(data) {

        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([0,1])
            .html(function(d) {
                return "<div><strong>Zipcode:</strong> <span style='color:red'>" + d.id + "</span></div>" +
                    "<div><strong>Town:</strong> <span style='color:red'>" + d.properties.town + "</span></div>" +
                    "<div><strong>Time Read:</strong> <span style='color:red'>" + d.properties.timeRead + "</span></div>";
            });

        colorScale = d3.scale.linear()
            .range(['beige', 'red'])
            .domain(d3.extent(data, function(d){
                return d.minutesRead;
            }));

        mapContainer
            .attr("width", width)
            .attr("height", height);

        projection = d3.geo.albers()
            .center([0, 30.25000])
            .rotate([97.7500, 0])
            .parallels([50, 60])
            .scale(width*30)
            .translate([width / 2, height / 2]);

        path = d3.geo.path()
            .projection(projection);
        mapContainer.call(tip);

        var mergedData = readingMapFactory.join(data, texas.features, "zipCode", "id", createReadingMapTopoEntry);

        mapContainer.selectAll(".subunit")
            .data(mergedData)
            .enter().append("path")
            .attr("class", function(d) { return "subunit zc" + d.id; })
            .attr("d", path)
            .attr("fill", function(d){ return d.properties.color ? d.properties.color : "white"; })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);
    }


    function resize() {
        // adjust things when the window size changes
        elWidth = parseInt(mapContainer.style('width'));
        width = elWidth - margin.left - margin.right;
        height = width * mapRatio;

        // update projection
        projection
            .translate([width / 2, height / 2])
            .scale(width*30);

        // resize the map container
        mapContainer
            .attr("width", width)
            .attr("height", height);

        // resize the map
        mapContainer.selectAll('.subunit').attr('d', path);
    }

    function handleMinutesMapSnapshot(snapshot) {
        var minutesReadMap = readingMapFactory.createMinutesMap(snapshot);
        var minutesArray = readingMapFactory.convertReadingMapToArray(minutesReadMap);
        initializeMap(minutesArray);
    }

    function getMapData(numberOfDays) {
        $scope.daysShowing = numberOfDays;
        mapContainer.selectAll('*').remove(); // @TODO, do not redraw entire map on data change
        var now = moment().utc();
        var startDate = now.subtract(numberOfDays, 'days').toDate().toJSON();

        bsrFirebase.child('entries/all')
            .orderByChild('submitted')
            .startAt(startDate)
            .once('value', handleMinutesMapSnapshot);
    }

    function init() {
        getMapData(30);
        d3.select($window).on('resize', _.debounce(resize, 300));
    }

    $scope.dateRangeArray = [
        {translateLabel: 'one-day', timeInDays: 1},
        {translateLabel: 'one-week', timeInDays: 7},
        {translateLabel: 'one-month', timeInDays: 30}
    ];

    $scope.getNewMapData = getMapData;

    $rootScope.$on('login', init);
}

module.exports = ReadingMapController;