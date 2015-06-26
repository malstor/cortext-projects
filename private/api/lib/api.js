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
//var sys = require('sys');
var url = require('url');
var exec = require('child_process').exec;
//Default values for mongoDb meteor server
mongoHost = config.get('mongo:host' || 'http://localhost');
mongoPort = config.get('mongo:port' || 3001);
mongoDbName = config.get('mongo:dbname' || 'meteor');

server = new Server(mongoHost, mongoPort, {w: 1}, {auto_reconnect: true});

        mongoClient = new Client(server);

        db = mongoClient.db('meteor');

        db.open(function(err, dbConn){
            if(err){
                console.log(nowDate()+"Error in db.open :",err);
            }
            else console.log(nowDate()+"db connected : on mongoServer mongodb://"+mongoHost+":"+mongoPort+"/"+mongoDbName);
        });
//try to find the correct url for mongoDb metor server

// exec("meteor mongo -U", function(error, stdout, stderr){
//     var mongoUrl = url.parse(stdout.trim());
//     console.log("Meteo Mongo Server : ", mongoUrl);
//     if(mongoUrl){
//         if(mongoUrl.port)
//             mongoPort = mongoUrl.port;
//         if(mongoUrl.hostname)
//             mongoHost = mongoUrl.hostname;
//         if(mongoUrl.pathname)
//             mongoDbName = mongoUrl.pathname.replace(/^\//, '');
//         console.log("mongoServer : mongodb://"+mongoHost+":"+mongoPort+"/"+mongoDbName);
        
//     }
// });

_ = require("underscore");

/***** Tools ***************************/

//formats current date
function nowDate(){
  d = new Date().toISOString().
    replace(/T/, ' ').      // replace T with a space
    replace(/\..+/, '');
  return "["+d+"] ";
}
//returns timestamp in mseconds if in seconds (php standard)
function timestampJs(timestp)
{
    return (timestp <= 100000000000) ? timestp*1000: timestp;
}

function logReferrer(req){
    var ref = req.headers.referrer;
    if(ref){
        console.log(nowDate()+"RECEIVED request from "+ref);
    }
    else{
        console.log(nowDate()+"RECEIVED request from unknown : ",req.url, req.method,  req.headers, req.body);
    }
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

            console.log(nowDate()+'collection '+collectionName+' loaded');
            collection.find(query, fields).toArray(function(err, items) {
                if (err)
                   throw(new Error(err));
                //console.log(items.size);
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
            console.log(nowDate()+'collection '+collectionName+' loaded');
            collection.findOne(query,function(err, item) {
                    if (err)
                        throw(new Error(err));
                    console.log(nowDate()+'find item : ',query, item);
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
            console.log(nowDate()+'collection '+collectionName+' loaded');
            collection.findOne({},{id:1},{sort:{id:-1}}, function(err,item){
                if(err)
                    throw(new Error(err));
                if(item)
                    attributes.id = parseInt(item.id)+1;
                else
                    attributes.id = 1;

                console.log(nowDate()+"new element id : ", attributes.id);
                try{
                    collection.insert(attributes, function(err, item) {
                        if (err)
                            throw(new Error(err));

                        console.log(nowDate()+'inserted item : ', item);
                        res.send(201, item);
                    });
                }
                catch(err){
                    console.log(nowDate()+'error inserting element : ', err);
                    res.send(500,"error inserting element");
                }
            });
        });
    };

    /*
     * updates or insert (ie upsert) object with <attributes> based on <query>, returns new/existing id to <res>
     */

    this.upsert = function(collectionName, query, attributes, res){
        var collection = db.collection(collectionName, function(err, collection){
            if (err)
                throw(new Error(err));
            console.log(nowDate()+'collection '+collectionName+' loaded');
            try{
                collection.update(query,{$set: attributes}, function(err, id, result) {
                    if (err)
                        throw(new Error(err));
                    console.log(nowDate()+'upsert item : ',query, '{$set: ',attributes,'}', id);
                    res.json(200,{msg:'update ok : ',result:result});
                });
            }
            catch(err){
                console.log(nowDate()+'error updating element : ', err);
                res.send(500,"error updating element");
            }
            
        });
    };
}

storage = new Storage();
    



/***** Method Exports  **************/

module.exports = {

    /****** API specific **********/
    welcome : function(req, res){
        logReferrer(req);
        res.send('cortext api - welcome');
    },

    getElements : function(req, res){
        logReferrer(req);
        
        filters = {};
        if(req.query){
            _(filters).extend(req.query);
        }
        console.log(nowDate()+'--> [GET] /elements/', filters);
        storage.getAll('elements', filters, {}, res);
    },

    getOneElement : function(req, res){
        logReferrer(req);
        console.log(nowDate()+'--> [GET] /elements/'+req.params.id);
        storage.getItem('elements', {id: parseInt(req.params.id)}, res);
    },

    createElement : function(req, res){
        logReferrer(req);
        var current_date = new Date().getTime();
        if(req.body.timestamp)
            current_date = timestampJs(req.body.timestamp);
        var element = {
            author: parseInt(req.body.author),
            project: parseInt(req.body.project),
            type: req.body.type,
            date: parseInt(current_date),
            content: req.body.content
        };
        console.log(nowDate()+'--> [POST] /elements', element);
        storage.insert('elements', element, res);
    },

    createDocument : function(req, res){
        logReferrer(req);
        var current_date = new Date().getTime();

        if(req.body.timestamp)
            current_date = timestampJs(req.body.timestamp);         

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
        };
        console.log(nowDate()+'--> [POST] /project/documents', element);
        storage.insert('elements', element, res);
    },

    getProjectDocuments : function(req, res){
        logReferrer(req);
        console.log(nowDate()+'--> [GET] /project/'+req.params.project_id+'/documents');
        console.log(nowDate()+'--> params : ',req.query);
        //building query
        filters = {project: parseInt(req.params.project_id), type:"Document"};
        if(req.query)
            _(filters).extend(req.query)
        storage.getAll('elements', filters, {}, res);
    },

    getProjectFiles : function(req, res){
        logReferrer(req);
        console.log(nowDate()+'--> [GET] /project/'+req.params.project_id+'/files');
        console.log(nowDate()+'--> params : ',req.query);
        //building query
        // we need all documents and all analysis with results to return all the files
        filters = {project: parseInt(req.params.project_id), $or : [{"type":"Document"}, {"type":"Analysis"}]};
        if(req.query)
            _(filters).extend(req.query)
        storage.getAll('elements', filters, {}, res);
    },
    
    getUserFiles : function(req, res){
        logReferrer(req);
        console.log(nowDate()+'--> [GET] /user/'+req.params.user_id+'/files');
        console.log(nowDate()+'--> params : ',req.query);
        //building query
        // we need all documents and all analysis with results to return all the user files
        filters = {author: parseInt(req.params.user_id), $or : [{"type":"Document"}, {"type":"Analysis"}]};
        if(req.query)
            _(filters).extend(req.query)
        storage.getAll('elements', filters, {}, res);
    },


    getOneDocument : function(req, res){
        logReferrer(req);
        console.log(nowDate()+'--> [GET] /documents/'+req.params.document_id);
        storage.getItem('elements', {project: parseInt(req.params.project_id), id: parseInt(req.params.document_id)}, res);
    },


    getOneAnalysis : function(req, res){
        logReferrer(req);
        console.log(nowDate()+'--> [GET] /analysis/'+req.params.id);
        storage.getItem('elements', {id: parseInt(req.params.id)}, res);
    },

    createAnalysis : function(req, res){
        logReferrer(req);
        var current_date = new Date().getTime();

        if(req.body.timestamp)
           current_date = timestampJs(req.body.timestamp);
        
        var element = {
            name: req.body.name,
            author: parseInt(req.body.author) || 0,
            project: parseInt(req.params.project_id) || 0,
            type: 'Analysis',
            date: parseInt(current_date) || null,
            progress: parseInt(req.body.progress) || 0,
            state: parseInt(req.body.state) || 0,
            parameters: req.body.parameters
        };
        if(req.body.content && req.body.content.results){
            element.content={};
            element.content.results=req.body.content.results;
        }

        console.log(nowDate()+'--> [POST] /analysis', element);
        console.log(req.body);
        storage.insert('elements', element, res);
    },

    updateAnalysis : function(req, res){
        logReferrer(req);
        var current_date = new Date().getTime();

        if(req.body.timestamp){
           current_date = timestampJs(req.body.timestamp);            
        }

        var element = {
            progress: parseInt(req.body.progress) || 0,
            state: parseInt(req.body.state) || 0,
            jobId: parseInt(req.body.jobId) || 0
        };
        if(req.body.results)
        {
            element.content={};
            element.content.results=req.body.results;
        }
            

        console.log(nowDate()+'--> [POST] /project/'+req.params.project_id+'/analysis/'+req.params.analysis_id, element);
        storage.upsert('elements', {id: parseInt(req.params.analysis_id)}, element, res);

    }
};


