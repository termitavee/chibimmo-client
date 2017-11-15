const { ipcRenderer } = require("electron");
//import '../node_modules/phaser-ce/build/custom/pixi.js'
//import '../node_modules/phaser-ce/build/custom/p2'
//import Phaser from '../node_modules/phaser-ce/build/phaser'
//import Phaser from '../phaser-ce/build/phaser.min.js'

const { getUser } = require('./js/data/db')
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
    components: {

        'color-picker': colorPicker2
    },
    data: {
        language: "en",
        save: "Save",
        exit: "Exit",
        form: {
            name: "",
            className: "sol",
            orientation: "n",
            hair: 0,
            hairColor: '#000000',
            bodyColor: 0,
        },
        preview: null,
        character: null,
        hair: null,

    },
    methods: {
        saveCharacter: function () {
            /*toggle new window to create character */
            //TODO check server, save and go back to logged screen
            console.log('lol save')
            
            this.form.user = (getUser())._id
            console.log(this.form)
            const { name } = this.form
            if (name.length < 4) {
                //TODO error too short
                console.log('name short')
            } else {
                //127.0.0.1
                //termitavee.ddns.net
                fetch('http://127.0.0.1:3000/create',
                    {
                        method: "POST",
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: JSON.stringify(this.form)
                    }).then(res => res.json())
                    .then((res) => {
                        console.log(res)
                        if (res.status == 202) {
                            //TODO update characters list
                            console.log('success')
                            this.backToList()
                        } else {
                            console.log('failed')
                            switch (res.error) {
                                case 'user':
                                    //TODO show there is a problem with the character name
                                    break

                                default:
                                //TODO show there is a problem with I don't know what

                            }
                        }
                    })
                    .catch((error) => {
                        console.log('Request failed', error);

                    })
            }
        },
        backToList: function () {
            console.log('lol save')
            //TODO check valid data, not empty field


            ipcRenderer.send("logIn", true)
        },
        preload: function (phaser) {
            //TODO load necesary images
            /**
            game.load.image('star', 'assets/star.png');
            game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
            
            */
            //this.preview.load.image('logo', './img/icon.jpg');
            this.preview.load.image('logo', './img/transparent.png');
            //TODO default, change name
            this.preview.load.atlasJSONHash('body0', './img/sprites/body/0/base.png', './img/sprites/body/0/base.json')
            this.preview.load.atlasJSONHash('body1', './img/sprites/body/1/base.png', './img/sprites/body/1/base.json')
            this.preview.load.atlasJSONHash('body2', './img/sprites/body/2/base.png', './img/sprites/body/2/base.json')
            this.preview.load.atlasJSONHash('body3', './img/sprites/body/3/base.png', './img/sprites/body/3/base.json')
            this.preview.load.atlasJSONHash('body4', './img/sprites/body/4/base.png', './img/sprites/body/4/base.json')
            this.preview.load.atlasJSONHash('body5', './img/sprites/body/5/base.png', './img/sprites/body/5/base.json')
            this.preview.load.atlasJSONHash('body6', './img/sprites/body/6/base.png', './img/sprites/body/6/base.json')
            this.preview.load.atlasJSONHash('hair0', './img/sprites/hair/0.png', './img/sprites/hair/0.json')
            this.preview.load.atlasJSONHash('hair1', './img/sprites/hair/1.png', './img/sprites/hair/1.json')
            //TODO this.preview.stage.disableVisibilityChange = true;



        },

        create: function (phaser) {

            //this.character = preview.make.bitmapData()
            //this.character.load('logo')
            //this.character.addToWorld(preview.world.centerX, preview.world.centerY, 0.5, 0.5,0.5,0.5);
            this.character = this.preview.add.sprite(80, 150, 'body0')
            this.hair = this.character.addChild(this.preview.add.sprite(0, 0, 'hair0'))

            this.character.scale.set(10);
            this.character.animations.add('down', Phaser.Animation.generateFrameNames('', 1, 11, ''), 18, true, true)
            this.character.animations.add('left', Phaser.Animation.generateFrameNames('', 12, 23, ''), 18, true, true)
            this.character.animations.add('right', Phaser.Animation.generateFrameNames('', 12, 23, ''), 18, true, true)
            this.character.animations.add('up', Phaser.Animation.generateFrameNames('', 24, 34, ''), 18, true, true)
            this.hair.animations.add('down', Phaser.Animation.generateFrameNames('', 1, 11, ''), 18, true, true)
            this.hair.animations.add('left', Phaser.Animation.generateFrameNames('', 12, 23, ''), 18, true, true)
            this.hair.animations.add('right', Phaser.Animation.generateFrameNames('', 12, 23, ''), 18, true, true)
            this.hair.animations.add('up', Phaser.Animation.generateFrameNames('', 24, 34, ''), 18, true, true)
            //play('down') stop()
            /*
            
            var sprite = game.add.sprite(0, 0, 'yourGraphic');
            
            sprite.tint = 0xff00ff;
            */
            //this.character.animations.play('down')
            //this.hair.animations.play('down')

            //this.character.tint = 0xff00ff

        },
        update: function (phaser) {

        },
        changeDirection: function () {
            //button to rotate character, up, left, right, down
        },
        changeColorBody: function () {
            //TODO change new color to know what to change 
            //TODO controll black and white 
            console.log('change body')
            switch (this.bodyColor) {
                case 0:
                    this.character = this.preview.add.sprite(80, 150, 'body0')
                case 1:
                    this.character = this.preview.add.sprite(80, 150, 'body1')
                case 2:
                    this.character = this.preview.add.sprite(80, 150, 'body2')
                case 3:
                    this.character = this.preview.add.sprite(80, 150, 'body3')
                case 4:
                    this.character = this.preview.add.sprite(80, 150, 'body4')
                case 5:
                    this.character = this.preview.add.sprite(80, 150, 'body5')
                case 6:
                    this.character = this.preview.add.sprite(80, 150, 'body6')

            }

        },
        changeHair: function () {
            if (this.form.hair = 0) {
                this.hair = this.character.addChild(this.preview.add.sprite(0, 0, 'hair0'))
            } else {
                this.hair = this.character.addChild(this.preview.add.sprite(0, 0, 'hair1'))
            }
        },
        changeColorHair: function () {
            //TODO change new color to know what to change 
            //TODO controll black and white 

            console.log('change hair')
            console.log(this.form.color)
            const c = '0x' + this.form.hairColor.charAt(0) == "#" ? this.form.hairColor.substring(1, 7) : this.form.hairColor

            console.log('c')
            console.log(c)
            this.hair.tint = c

        },

    },
    mounted() {
        //$root
        let self = this
        this.preview = new Phaser.Game(500, 600, Phaser.AUTO, "leftContent", { preload, create, update }, false, false);

        function preload() {
            self.preload(this)

        }

        function create() {
            self.create(this)

        }
        function update() {
            self.update(this)
        }


    },
    destroyed() {
        this.preview.destroy()
    },

})
console.log("newCharacter.js cargado")