const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
//use shortid ? to generate id shortid.generate()
const adapter = new FileSync('db.json',{
    serialize: (data) => encrypt(JSON.stringify(data)),
    deserialize: (data) => JSON.parse(decrypt(data))
})
const db = low(adapter)

bd.defaults({default: {content: "data", value:"value"}}).write()

//get and write
db.get('default')
.push({content: "new data", value:"new value"})
.write()

db.set('default.content', 'another new date')
db.set('default.content', 'another new value')
.write()

//query, value find, write save
db.get('default')
.find({ content: "new data" })
/*
.filter({published: true})
.sortBy('views')
.take(5)
.size()
.assign({propertu:value})//update
.remove({ title: 'low!' })//delete item (after get)
unset('user.name') //remove property (standalone)


*/
.value()

//name can be called before write or value
db._.mixin({
    name: function(input){
        return "output"
    },
    putId: function(){
        //add unique id
    }
})

//get all

db.getState()
//change db, this case clean everything
db.setState({})
