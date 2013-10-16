/******** db functions ***********/
module.exports = {
    sendAll : function(collectionName, query, fields, res, db){
        db.open(function(err, db){
            var collection = db.collection(collectionName, function(err, collection){
                if (err) 
                    throw(new Error(err)); 

                console.log('collection '+collectionName+' loaded');
                collection.find(query, fields).toArray(function(err, items) {
                    if (err) 
                       throw(new Error(err)); 
                    console.log(items);
                    res.send(items);
                    db.close();
                });
            });
        });
    },
    sendItem : function(collectionName, query, res, db){
        db.open(function(err, db){
            var collection = db.collection(collectionName, function(err, collection){
                if (err) 
                    throw(new Error(err)); 
                console.log('collection '+collectionName+' loaded');
                collection.findOne(query,function(err, item) {
                        if (err) 
                            throw(new Error(err)); 
                        console.log('find item : ',query, item);
                        res.send(item);
                        db.close();
                    });
            });
        });
    }
};


