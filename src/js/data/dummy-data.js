

const characters = [
    {
        name: "JustAName",
        type: "soldier",//string soldier/mage/rogue
        qualities: {color:"#565656", hair:{type:1, color:"#565656"}},
        statistics: {
            variable:{
                life: {total:5, current:5},
                magic: {total:5, current:5},
                hab: {total:5, current:5},
                money: 5,
            },
            fixed:{
                type:"off",
                strength:5,
                resistance:5,
                inteligence:5,
                mind:5,
                dexterity:5,
                charisma:5,
            },
        },
        
        equipment: {
            cloth: {name: "nombre-traje", level:1},
            weapon: {name: "nombre-arma", level:1},
        },
        inventory = [],
        pets = [],
        archivements = [],
        login = new Date(),
    },
    {
        name: "SecondPlayer",
        type: "mage",//string soldier/mage/rogue
        qualities: {color:"#565656", hair:{type:1, color:"#565656"}},
        statistics: {
            variable:{
                life: {total:5, current:5},
                magic: {total:5, current:5},
                hab: {total:5, current:5},
                money: 5,
            },
            fixed:{
                type:"def",
                strength:5,
                resistance:5,
                inteligence:5,
                mind:5,
                dexterity:5,
                charisma:5,
            }
        },
        
        equipment: {
            cloth: {name: "nombre-traje", level:1},
            weapon: {name: "nombre-arma2", level:1},
        },
        inventory = [],
        pets = [],
        archivements = [],
        login = new Date(),
    }
]
const friendList = ["my-friend", "another-one"]

const user = {
    nick: "Player-Name",
    pass : "password",
    deskToken : "",
    mobToken : "",
    email : "Player-Name@chibimmo.com",
    characters : dummyCharacters,
    login : new Date(),
    friendList : dummyFriendList
}

module.exports = {characters,friendList, user}