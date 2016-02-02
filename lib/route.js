var express = require('express');
var router = express.Router();

var apiCtrl = require('./controllers/api');
var urlCtrl = require('./controllers/url');
var projectCtrl = require('./controllers/project');
var mockCtrl = require('./controllers/mock');

router.post('/restapi/apis', apiCtrl.add);
router.get('/restapi/apis', apiCtrl.fetch);

router.get('/restapi/apis/:name', apiCtrl.get);
router.delete('/restapi/apis/:name', apiCtrl.delete);
router.post('/restapi/apis/:name', apiCtrl.update);

router.get('/restapi/urls', urlCtrl.fetch);
router.get('/restapi/urls/:name', urlCtrl.get);
router.delete('/restapi/urls/:name', urlCtrl.delete);


router.post('/restapi/projects', projectCtrl.add);
router.get('/restapi/projects', projectCtrl.fetch);
router.post('/restapi/projects/:name', projectCtrl.update);
router.put('/restapi/projects/:name', projectCtrl.put);
router.delete('/restapi/projects/:name', projectCtrl.delete);

router.get('/restapi/start', mockCtrl.run);

module.exports = router;
