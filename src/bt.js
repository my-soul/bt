var P2PSpider = require('../btspider');

function star(io) {

    io.sockets.on('connection', function (socket) {
          socket.emit('metadata', { hello: 'world' });
    });

    var p2p = P2PSpider({
        nodesMaxSize: 64,   // be careful
        maxConnections: 128, // be careful
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
        try{
            console.log("----------------------");
            console.log(new Buffer(metadata.info.name).toString());
            console.log(new Buffer(metadata.info.pieces).toString());
            for(var i=0;i<metadata.info.files.length;i++){
                console.log(metadata.info.files[i]);
                console.log(new Buffer(metadata.info.files[i].path).toString());
            }
            console.log("----------------------");
        }catch (e){

        }

    });

    p2p.listen(6881, '0.0.0.0');


    function toString(buff) {
        return new Buffer(buff).toString();
    }
}

module.exports=star;