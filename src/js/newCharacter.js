const {ipcRenderer} = require("electron");
//import '../node_modules/phaser-ce/build/custom/pixi.js'
//import '../node_modules/phaser-ce/build/custom/p2'
//import Phaser from '../node_modules/phaser-ce/build/phaser'
//import Phaser from '../phaser-ce/build/phaser.min.js'

const {getUser} = require('./js/data/db')
console.log('getUser')
console.log(getUser)





const indexApp = new Vue({
    el: '#index',
    components:{
        
    },
    data: {
        user: getUser(),
        language: "en",
        class:"",
        orientation:"",
        hair:"",
        color:{hair:"", body:""},
        preview: null,
        character:null,
        
    },
    methods: {       
        updateContent : function(){
            /*Update the information shown */
        },
        
        saveCharacter: function(){
            /*toggle new window to create character */
            ipcRenderer.send("hideEditor")
            
        },
        preload: function (phaser) {
            //TODO load necesary images
            /**
            game.load.image('star', 'assets/star.png');
            game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
            
            */
            this.preview.load.image('logo', './img/icon.jpg');
            //preview.load.BitmapData('logo2', './img/icon.jpg');
            
        },
        
        create: function (phaser) {
            let {preview, character} = this
            //character = preview.add.sprite(preview.world.centerX, preview.world.centerY, 'logo');
            //character.anchor.setTo(0.5, 0.5);
            character = preview.make.bitmapData()
            character.load('logo')
            character.addToWorld(preview.world.centerX, preview.world.centerY, 0.5, 0.5,0.5,0.5);
            
            //character.resize(400, 400)
            
        },
        update: function(phaser) {
            
        },
        changeColorBody: function(phaser) {
            //TODO change new color to know what to change 
            //TODO controll black and white 
            //this.character.replaceRGB(0, 85, 255, 255, 0, 250, 40, 255);
            
        }
    },
    mounted() {
        //$root
        console.log(this)
        console.log(this.preview)
        let self = this
        this.preview = new Phaser.Game(500, 600, Phaser.AUTO,"leftContent", { preload, create, update }, false, false);
        
        function preload () {
            self.preload(this)
            
        }
        
        function create () {
            self.create(this)
            
        }
        function update() {
            self.update(this)
        }
        
    },
    destroyed () {
        this.preview.destroy()
    },
})

console.log("newCharacter.js cargado")