'use strict';

importScripts('sw-toolbox.js');

toolbox.precache(['index.php', 'css/main.css']);

toolbox.router.get('/images/*', toolbox.cacheFirst);

toolbox.router.get('/*', toolbox.networkFirst, {
	networkTimeoutSeconds: 5
});