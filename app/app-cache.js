'use strict';

// Check if a new cache is available on page load.
window.addEventListener('load', function() {
    window.applicationCache.addEventListener('updateready', function() {
        if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
            window.applicationCache.swapCache();
            if (window.confirm('A new version of this site is available. Load it?')) {
                window.location.reload();
            }
        }
    }, false);
}, false);