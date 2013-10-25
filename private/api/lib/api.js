/**
 * cortext projects api - methods
 *
 * @package    cortext-projects
 * @subpackage api
 * @author     Philippe Breucker
 * @version    0.1 - 2013
 */

/**** Servers Initialization *********/
var Db, Server, db, mongo, server, mongoClient, Client, _;
mongo = require('mongodb');

Server = mongo.Server;
Client = mongo.MongoClient;

Db = mongo.Db;
server = new Server('localhost', 3002, {w: 1}, {auto_reconnect: true});
mongoClient = new Client(server);

db = mongoClient.db('meteor');

db.open(function(err, dbConn){
    // if(err)
    //    throw(new Error(err));
});
//_ = require("underscore");

/***** Tools ***************************/
//returns timestamp in mseconds if in seconds (php standard)
function timestampJs(timestp)
{
    return (timestp <= 100000000000) ? timestp*1000: timestp;
}

/***** DB Management  ****************/

/****** DB methods ***********/
    

function Storage(){

    /**
     *   Finds all items of <collectionName> filter with <query> and send it as an array of <fields> to <res>
     */
    this.getAll = function(collectionName, query, fields, res){
        var collection = db.collection(collectionName, function(err, collection){
            if (err) 
                throw(new Error(err)); 

            console.log('collection '+collectionName+' loaded');
            collection.find(query, fields).toArray(function(err, items) {
                if (err) 
                   throw(new Error(err)); 
                console.log(items);
                res.send(items);
                //db.close();
            });
        });
    };

    /*
     * Find one item of <collectionName> based on query and send it as an array
     */
    this.getItem = function(collectionName, query, res){
        var collection = db.collection(collectionName, function(err, collection){
            if (err) 
                throw(new Error(err)); 
            console.log('collection '+collectionName+' loaded');
            collection.findOne(query,function(err, item) {
                    if (err) 
                        throw(new Error(err)); 
                    console.log('find item : ',query, item);
                    res.send(item);
                });
        });
    };

    /*
     * Insert object <attributes> in <collectionName>, send the new id back to <res>
     */

    this.insert = function(collectionName, attributes, res){
        var collection = db.collection(collectionName, function(err, collection){
            if (err) 
                throw(new Error(err)); 
            console.log('collection '+collectionName+' loaded');
            collection.findOne({},{id:1},{sort:{id:-1}}, function(err,item){
                if(err)
                    throw(new Error(err));
                if(item)
                    attributes.id = parseInt(item.id)+1;
                else
                    attributes.id = 1;

                console.log("new element id : ", attributes.id);
                try{
                    collection.insert(attributes, function(err, item) {
                        if (err) 
                            throw(new Error(err)); 

                        console.log('inserted item : ', item);
                        res.send(201, item);
                    });
                }
                catch(err){
                    console.log('error inserting element : ', err);
                    res.send(500,"error inserting element");
                }
            })
        });
    };

    /*
     * updates or insert (ie upsert) object with <attributes> based on <query>, returns new/existing id to <res>
     */

    this.upsert = function(collectionName, query, attributes, res){
        var collection = db.collection(collectionName, function(err, collection){
            if (err) 
                throw(new Error(err)); 
            console.log('collection '+collectionName+' loaded');
            try{
                collection.update(query,{$set: attributes}, function(err, item) {
                    if (err)
                        throw(new Error(err)); 
                    console.log('upsert item : ',query, '{$set: ',attributes,'}', item);
                    res.send('update ok : ', item);
                });    
            }
            catch(err){
                console.log('error updating element : ', err);
                res.send(500,"error updating element");
            }
            
        });
    }
};

storage = new Storage();
    



/***** Method Exports  **************/

module.exports = {

    /****** API specific **********/
    welcome : function(req, res){
        res.send('cortext api - welcome');
    },

    getElements : function(req, res){
        console.log('--> [GET] /elements/');
        storage.getAll('elements', {}, {}, res);
    },

    getOneElement : function(req, res){
        console.log('--> [GET] /elements/'+req.params.id);
        storage.getItem('elements', {id: parseInt(req.params.id)}, res);
    },

    createElement : function(req, res){
        var current_date = new Date().getTime();
        if(req.body.timestamp)
            current_date = timestampJs(req.body.timestamp)

        var element = {
            author: parseInt(req.body.author),
            project: parseInt(req.body.project),
            type: req.body.type,
            date: parseInt(current_date), 
            content: req.body.content
        }
        console.log('--> [POST] /elements', element);
        storage.insert('elements', element, res);
    },

    createDocument : function(req, res){
        var current_date = new Date().getTime();

        if(req.body.timestamp)
            current_date = timestampJs(req.body.timestamp)
           

        var element = {
            name: req.body.name,
            size: req.body.size,
            mimetype: req.body.type,
            extension: req.body.extension,
            author: parseInt(req.body.author),
            project: parseInt(req.params.project_id),
            type: 'Document',
            date: parseInt(current_date),
            timestamp: parseInt(current_date),
            permalink: req.body.url
        }
        console.log('--> [POST] /project/documents', element);
        storage.insert('elements', element, res);
    },

    getProjectDocuments : function(req, res){
        console.log('--> [GET] /project/'+req.params.project_id+'/documents');
        storage.getAll('elements', {project: parseInt(req.params.project_id)}, {}, res);
    },

    getOneDocument : function(req, res){
        console.log('--> [GET] /documents/'+req.params.document_id);
        storage.getItem('elements', {project: parseInt(req.params.project_id), id: parseInt(req.params.document_id)}, res);
    },


    getOneAnalysis : function(req, res){
        console.log('--> [GET] /analysis/'+req.params.id);
        storage.getItem('elements', {id: parseInt(req.params.id)}, res);
    },

    createAnalysis : function(req, res){
       
        var current_date = new Date().getTime();

        if(req.body.timestamp)
           current_date = timestampJs(req.body.timestamp)
        
        var element = {
            name: req.body.name,
            author: parseInt(req.body.author),
            project: parseInt(req.params.project_id),
            type: 'Analysis',
            date: parseInt(current_date),
            progress: parseInt(req.body.progress),
            state: parseInt(req.body.state)
        }
        if(req.body.content && req.body.content.results){
            element.content={};
            element.content.results=req.body.content.results;
        }

        console.log('--> [POST] /analysis', element);
        console.log(req.body);
        storage.insert('elements', element, res);
    },

    updateAnalysis : function(req, res){
        var current_date = new Date().getTime();

        if(req.body.timestamp)
           current_date = timestampJs(req.body.timestamp)

        var element = {
            progress: parseInt(req.body.progress),
            state: parseInt(req.body.state),
            jobId: parseInt(req.body.jobId)
        }
        if(req.body.results)
        {
            element.content={};
            element.content.results=req.body.results;
        }
            

        console.log('--> [POST] /project/'+req.params.project_id+'/analysis/'+req.params.analysis_id, element);
        storage.upsert('elements', {id: parseInt(req.params.analysis_id)}, element, res);

    }
};


