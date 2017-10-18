const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
//use shortid ? to generate id shortid.generate()

const encrypt = (text)=>{
    return text
}

const decrypt = (text)=>{
    return text
}

const adapter = new FileSync('db.json')
/*const adapter = new FileSync('db.json',{
    serialize: (data) => encrypt(JSON.stringify(data)),
    deserialize: (data) => JSON.parse(decrypt(data))
})*/

/*
//const db = low(adapter)

//bd.defaults({default: {content: "data", value:"value"}}).write()

//get and write
db.get('default')
.push({content: "new data", value:"new value"})
.write()

db.set('default.content', 'another new date')
db.set('default.content', 'another new value')
.write()

//query, value find, write save
db.get('default').find({ content: "new data" })

.filter({published: true})
.sortBy('views')
.take(5)
.size()
.assign({propertu:value})//update
.remove({ title: 'low!' })//delete item (after get)
unset('user.name') //remove property (standalone)

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
*/
const setUser = (user)=>{
    const db = low(adapter)
    console.log('user to insert')
    console.log(user)
    return db.set('user', user).write()
}

const getUser = ()=>{
    const db = low(adapter)
    let found =  db.get('user').value()
    console.log('user found')
    console.log(found)
    return found
}

const setLang = (lang)=>{
    const db = low(adapter)
    db.set({lang}).write()
}

const getLang = ()=>{
    const db = low(adapter)
    return db.get('lang').value()
}

const setRemember = (user, token)=>{
    const db = low(adapter)
    db.set({remember:{user,token}}).write()
}

const getRemember = (user)=>{
    const db = low(adapter)
    return db.get('remember').value()
}

module.exports = {
    setUser, getUser,
    setLang, getLang,
    setRemember, getRemember,
}

const createMonster= (name, statistics, sprite, drop)=>{
    /*{
            variable
            life
            magic
            hab
            money
            fixed
            fuerza
            resistencia
            inteligencia
            mente
            destreza
            carisma
        }*/
    return {name, statistics, sprite, drop}
}
