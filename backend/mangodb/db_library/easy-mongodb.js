const mongodb = require('mongodb').MongoClient;


const  CRUD_Mongo = {

    uri: '',
    
    createDbOrCollection(nameDB, nameCollection ,callback) {
       
       
      
        mongodb.connect(this.uri, (err, db) => {
            
            if (err) {
                callback(err)
                return
            }

            var dbss = db.db(nameDB)
            
            console.log(`Db ${nameDB} Created Seccessfuly ...`)
                          
            dbss.createCollection(nameCollection, function (err, result) {
                if (err) throw err;
                console.log(`database and ${nameCollection} created!`);
                db.close();
        });
        })
        return
    },
    insertData(data,  nameDateBases , nameCollection , dataNumber, callback) {
        mongodb.connect(this.uri, (err, res) => {
           
            if (err) {
                res.close()
                callback(err , res=null)
                
            }
            var dbo = res.db(nameDateBases);
            if (dataNumber == 'many') {

                dbo.collection(nameCollection).insertMany(data, (err) => {
                    if (err) {
                        res.close()
                        callback(err , res=null)
                    }  
                    
                    console.log('Data insert Seccess ')
                })
              
            } else {
                
                dbo.collection(nameCollection).insertOne(data, (err) => {
                    res.close()
                    callback(err , res=null)  
                })
                console.log('Data insert Seccess  ')
                
            }
          
        })

        
    },
    getData(dbname, nameCollection, data, callback) {
   
        mongodb.connect(this.uri, (err, res) => {
           
            
            if (err) {
                res.close()
                return callback(err , res=null)

                
            }
            var dbo = res.db(dbname);

            if (data != null) {
            dbo.collection(nameCollection).findOne(data,  (err, db) => {
                    if (err) {
                        res.close()
                        callback(err , res=null)
                }
                    res.close()
                    // response.close()
                    return callback(err, db)
                
                })
                
            } else {
                
                dbo.collection(nameCollection).find({}).toArray((err, db) => {
                    if (err) {
                        res.close()
                        return callback(err , db=null)
                        
                    }
                        res.close()
                        return callback(err , db)
                })
            } 
            
            
        })
    } ,
    deletData(dbname , nameCollection  , query , callback) {
        mongodb.connect(this.uri, (err, res) => {
            if (err) {
                res.close()
                return callback(err)
            }
            var dbs = res.db(dbname);
            dbs.collection(nameCollection).deleteOne(query, (err) => {
                if (err) {
                    res.close()
                    return callback(err)
                }
                callback(err , {'statu' :  'Data delet seccesful'})
                return 
            })
        })
    } ,
    
    getUser(dbname , nameCollection , query) {

        mongodb.connect(this.uri , (err , res) => {
            if (err) {
                res.close()
                return 
            }

            var dbs = res.db(dbname) ;
            var a = dbs.collection(nameCollection).getUser('dee8e600-fa22-11ec-b599-63c046b93a45',  {filter : {"_id" : 'dee8e600-fa22-11ec-b599-63c046b93a45' }})
           
            console.log(a)
        } ) 
    }

}


module.exports = CRUD_Mongo;