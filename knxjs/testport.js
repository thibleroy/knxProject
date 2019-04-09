const netList = require('network-list');

netList.scanEach({}, (err, obj) => {
    if (obj.alive) console.log(obj); // device object
});


netList.scan({}, (err, arr) => {
    console.log(arr); // array with all devices
});
