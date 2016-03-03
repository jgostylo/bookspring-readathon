'use strict';

/* @ngInject */
function ReadingMapController($scope) {
    var d3 = require('d3');
    d3.tip = require('d3-tip');
    var topojson = require('topojson');
    var sampleZipcodeData = [
        {
            "zipcode":"78641",
            "hours":3
        },
        {
            "zipcode":"78641",
            "hours":3
        },
        {
            "zipcode":"78642",
            "hours":7
        }
    ];

    function sumZipcodes(data){
        var sd =  d3.nest()
            .key(function(d) { return d.zipcode;})
            .rollup(function(d) {
                return d3.sum(d, function(g) {return g.hours; });
            })
            .entries(data);
        sd.forEach(function(d) {
            d.zipcode = d.key;
            d.totalHours = d.values;
        });
        return sd;
    }
    var sumData = sumZipcodes(sampleZipcodeData);

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



    var margin = {top: 10, left: 10, bottom: 10, right: 10}
        , width = parseInt(d3.select('#map').style('width'))
        , width = width - margin.left - margin.right
        , mapRatio = .7
        , height = width * mapRatio;

    var svg = d3.select("#map")
        .attr("width", width)
        .attr("height", height);

    var projection = d3.geo.albers()
        .center([0, 30.25000])
        .rotate([97.7500, 0])
        .parallels([50, 60])
        .scale(width*30)
        .translate([width / 2, height / 2]);

    var path = d3.geo.path()
        .projection(projection);

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([0,1])
        .html(function(d) {
            return "<div><strong>Zipcode:</strong> <span style='color:red'>" + d.id + "</span></div>" +
                "<div><strong>Town:</strong> <span style='color:red'>" + d.properties.town + "</span></div>";
        });
    svg.call(tip);
    d3.json("/app/reading-map/texas.json", function(error, tx) {
        if (error) return console.error(error);
        var texas = topojson.feature(tx, tx.objects.texas);

        var mergedData = join(sumData, texas.features, "zipcode", "id", function(town, zipcode) {
            return {
                id: town.id,
                type: town.type,
                geometry: town.geometry,
                properties: {
                    town: town.properties.town,
                    zipcode:(zipcode !== undefined) ? zipcode.hours : null
                }
            };
        });
        svg.selectAll(".subunit")
            .data(mergedData)
            .enter().append("path")
            .attr("class", function(d) { return "subunit zc" + d.id; })
            .attr("d", path)
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);
    });

    d3.select(window).on('resize', resize);

    function resize() {
        // adjust things when the window size changes
        width = parseInt(d3.select('#map').style('width'));
        width = width - margin.left - margin.right;
        height = width * mapRatio;

        // update projection
        projection
            .translate([width / 2, height / 2])
            .scale(width*30);

        // resize the map container
        svg
            .attr("width", width)
            .attr("height", height);

        // resize the map
        svg.selectAll('.subunit').attr('d', path);
    }
}

module.exports = ReadingMapController;