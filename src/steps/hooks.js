'use strict';
var { defineSupportCode } = require('cucumber');

defineSupportCode(function({ Before, After }) {

    //var featureName=null;

    /*Before(function(scenario) {
        //console.log('sce : ',scenario);
        let currFeatureName=scenario.sourceLocation.uri;
        console.log('feature : ',currFeatureName);
        if(featureName===null)
            featureName=currFeatureName;
        else if(currFeatureName!==featureName)
        {
            //return browser.restart();
        }
    });*/

   After(function(scenario) {

        if (scenario.result.status==='failed') {
            var attach = this.attach; // cucumber's world object has attach function which should be used
            return browser.takeScreenshot().then(function(png) {
                var decodedImage = new Buffer(png, 'base64');
                return attach(decodedImage, 'image/png');
            });
        }
    });

});