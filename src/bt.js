var P2PSpider = require('../btspider');

function star(io) {

    io.sockets.on('connection', function (socket) {
          socket.emit('metadata', { hello: 'world' });
    });

    var p2p = P2PSpider({
        nodesMaxSize: 100,   // be careful
        maxConnections: 200, // be careful
        timeout: 4000
    });

    p2p.ignore(function (infohash, rinfo, callback) {
        // false => always to download the metadata even though the metadata is exists.
        var theInfohashIsExistsInDatabase = false;
        callback(theInfohashIsExistsInDatabase);
    });

    p2p.on('metadata', function (metadata) {
        // At here, you can extract data and save into database.
        io.emit('metadata',metadata);
        console.log("----------------------");
        console.dir(new Buffer(metadata.info.name).toString());
        console.log("----------------------");
    });

    p2p.listen(6881, '0.0.0.0');
}

module.exports=star;