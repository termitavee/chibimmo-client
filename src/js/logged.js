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
        userName: "Player",
        user: getUser(),
        language: "en",
        
    },
    methods: {       
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
    }
})

console.log("logged.js cargado")