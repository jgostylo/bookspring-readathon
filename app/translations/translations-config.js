'use strict';

/* @ngInject */
function TranslationsConfig($translateProvider) {
    $translateProvider.useSanitizeValueStrategy('escape');
    $translateProvider.translations('es', require('./lang-es.json'));
    $translateProvider.translations('en', require('./lang-en.json'));
    $translateProvider.preferredLanguage('en');
}

module.exports = TranslationsConfig;
