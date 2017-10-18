const {ipcRenderer} = require("electron");
//import '../node_modules/phaser-ce/build/custom/pixi.js'
//import '../node_modules/phaser-ce/build/custom/p2'
//import Phaser from '../node_modules/phaser-ce/build/phaser'
//import Phaser from '../phaser-ce/build/phaser.min.js'

const {getUser} = require('./js/data/db')
console.log('getUser')
console.log(getUser)
//import colorPicker from './component/color-picker'
import colorPicker2 from './component/color-picker-2'
/*var defaultProps = {
    hex: '#194d33',
    hsl: {
        h: 150,
        s: 0.5,
        l: 0.2,
        a: 1
    },
    hsv: {
        h: 150,
        s: 0.66,
        v: 0.30,
        a: 1
    },
    rgba: {
        r: 25,
        g: 77,
        b: 51,
        a: 1
    },
    a: 1
}*/


const indexApp = new Vue({
    el: '#index',
    components:{
        
        'color-picker': colorPicker2
    },
    data: {
        user: getUser(),
        language: "en",
        save:"Save",
        exit:"Exit",
        form:{
            name:"",
            className:"",
            orientation:"",
            hair:"",
            color:{hair:"#000000", body:"#dfa039"},
        },
        preview: null,
        character:null,
        
    },
    methods: {       
        saveCharacter: function(){
            /*toggle new window to create character */
            //TODO check server, save and go back to logged screen
            console.log('lol save')
        },
        backToList: function(){
            //TODO just go back without saving
            console.log('lol save')
            ipcRenderer.send("logIn",true)
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
            
            this.character = preview.make.bitmapData()
            this.character.load('logo')
            this.character.addToWorld(preview.world.centerX, preview.world.centerY, 0.5, 0.5,0.5,0.5);
            
            /*
            
            player.animations.add('left', [0, 1, 2, 3], 10, true);
            player.animations.add('right', [5, 6, 7, 8], 10, true);
            
            var sprite = game.add.sprite(0, 0, 'yourGraphic');
            
            sprite.tint = 0xff00ff;
            */
            
        },
        update: function(phaser) {
            
        },
        changeColorBody: function() {
            //TODO change new color to know what to change 
            //TODO controll black and white 
            console.log('change body')
            console.log(this.form.color)
            const c = this.form.color.body.charAt(0)=="#"? '0x'+this.form.color.body.substring(1,7):'0x'+this.form.color.body
            
            //        color:{hair:"#000000", body:"#dfa039", hairOld:{r:0,g:0,b:0}, bodyOld:{r:223,g:160,b:57},
            console.log('c')
            console.log(c)
            this.character.tint = 0x565c8e
            //this.character.replaceRGB(0, old.r, old.g, old.b, 0, r, g, b);
           

            
            
        },
        changeColorHair: function() {
            //TODO change new color to know what to change 
            //TODO controll black and white 
            //this.character.replaceRGB(0, 85, 255, 255, 0, 250, 40, 255);
            console.log('change hair')
            console.log(this.form.color)
        },
        
    },
    mounted() {
        //$root
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
/*
var frame0 = [
	'................',
	'....BBBBBBBB....',
	'....BBB..BBB....',
	'....B.BBBBBBB...',
	'....BBBBBBBBB.BB',
	'....BBBBBBBBB..B',
	'....BBBBBBBBB...',
	'.....B.BBBB.....',
	'.....BB........B',
	'......BBB.....BB',
	'........BBBBBBB.',
	'................',
	'................',
	'................',
	'................',
	'................'
];
game.create.texture('yourKey', frame0, 6, 6, 0);


*/
console.log("newCharacter.js cargado")