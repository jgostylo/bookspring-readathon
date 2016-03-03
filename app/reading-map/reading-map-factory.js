'use strict';

var _ = require('lodash');

/* @ngInject */
function ReadingMapFactory( $http, $q) {

    function getMapData(options) {

        var filterBy = options.filter;

        return $http.get(url).then(function (resp) {
            var path = _.get(resp, 'data.path');
            return path ? resp.data : $q.reject();
        });
    }

    return {
        getMapData: getMapData
    };

}

module.exports = ReadingMapFactory;
