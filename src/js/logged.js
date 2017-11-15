const {ipcRenderer} = require("electron");
//import svgCaptcha  from'./component/log-in-form'
//import {ipcRenderer} from './component/log-in-form'

const feed = require('./component/feed')
const characterList = require( './component/character-list')
const character = require( './component/character')
//import logInForm from './component/log-in-form'
//import characterList from './component/character-list'
//import character from './component/character'
const {getUser} = require('./js/data/db')
console.log('getUser')
console.log(getUser)
const indexApp = new Vue({
    el: '#index',
    components:{
        'feed': feed,
        'character-list': characterList,
        'character': character,
    },
    data: {
        user: getUser(),
        language: "en",
        logOut: "log Out",
        
    },
    methods: { 
        
        exitLog : function(){
            ipcRenderer.send("logIn",false)
        },
        
        updateContent : function(){
            /*Update the information shown */
        },
        
        launchLoggedContent : function(){
            /*get data from this. userData */
            /*Update the information shown */
            this.isNotLogged=false
            
        },
        
        createNewCharacter: function(){
            /*toggle new window to create character */
            ipcRenderer.send("launchEditor")
        },
        
        saveNewCharacter: function(){
            /*toggle new window to create character */
            ipcRenderer.send("hideEditor")
            
        },
        
        launchGame: function(){
            /*toggle new windo to play game, hide this */
            ipcRenderer.send("LaunchGame")
            
        }
    },
    created() {
        //$root
        //TODO check language in database in case user has changed it and save in data
        console.log('oncreated')
        console.log(this.user)



        this.$root.$on('openCharacterEditor', function(param) {
            console.log('logged.js on openCharacterEditor', param);
            if(param!=null){
                //TODO save character in db
            }
            
            ipcRenderer.send("launchEditor")
            //En mi juego no se discrimina nada, elije un color de piel y pelo dentro de esa gama homosexual de colores
        })
        
    }
})

console.log("logged.js cargado")