'use strict';

/* @ngInject */
function ReadingMapController($scope) {
    var d3 = require('d3');
    d3.tip = require('d3-tip');
    var topojson = require('topojson');
    //var austin = require('./texas.json');
    //require('./texas.json');
    $scope.msg = 'It Works';
    var width = 960,
        height = 1160;

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset(function() {
            return '[' + d3.event.pageX - 34,d3.event.pageY - 12+']';
        })
        .html(function(d) {
            return "<strong>Zipcode:</strong> <span style='color:red'>" + d.id + "</span>";
        });
    svg.call(tip);
    d3.json("/app/reading-map/texas.json", function(error, tx) {
        if (error) return console.error(error);
        var texas = topojson.feature(tx, tx.objects.texas);

        var projection = d3.geo.albers()
            .center([0, 30.25000])
            .rotate([97.7500, 0])
            .parallels([50, 60])
            .scale(25000)
            .translate([width / 2, height / 2]);
        var path = d3.geo.path()
            .projection(projection);

        svg.selectAll(".subunit")
            .data(topojson.feature(tx, tx.objects.texas).features)
            .enter().append("path")
            .attr("class", function(d) { return "subunit zc" + d.id; })
            .attr("d", path)
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);
    });
}

module.exports = ReadingMapController;