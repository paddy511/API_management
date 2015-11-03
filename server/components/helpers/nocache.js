/**
 * Created by qinghaibo on 2015/9/21.
 */

var compose = require('composable-middleware');

exports.noCache = function() {
    return compose().use(
        function(req, res, next) {
            res.setHeader('Cache-Control', 'no-cache');
            next();
        }
    );
};