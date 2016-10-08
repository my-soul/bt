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
        metadata.name=new Buffer(metadata.info.name).toString();
        io.emit('metadata',metadata);
        console.log("----------------------");
        console.log(toString(metadata.info.name));
        console.log("-");
        console.log(toString(metadata.info.pieces));
        console.log("-");
        console.log(metadata.info.files);
        for(var i=0;i<metadata.info.files.length;i++){
            console.log(toString(metadata.info.files[i].path));
            console.log(toString(metadata.info.files[i].length));
        }
        console.log("----------------------");
    });
    p2p.listen(6881, '0.0.0.0');


    function toString(buff) {
        return new Buffer(buff).toString();
    }
}

module.exports=star;