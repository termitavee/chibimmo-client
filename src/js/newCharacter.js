const { ipcRenderer } = require("electron");

const { getUser, getCharLaunch, setCharLaunch } = require('./js/data/db')

const indexApp = new Vue({
  el: '#index',
  components: {
  },
  data: {
    language: "en",
    save: "Save",
    exit: "Exit",
    form: {
      name: "",
      className: "",
      orientation: "",
      hair: 0,
      hairColor: '0x000000',
      bodyColor: 0,
    },
    preview: null,
    character: null,
    hair: null,
    clothes:null,
    moving: 0,

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
        //TODO check class and orientation not empty
        console.log('name short')
      } else {
        //127.0.0.1
        //termitavee.ddns.net
        fetch('http://127.0.0.1:3000/create',
          {
            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: JSON.stringify(this.form)
          })
          .then(res => res.json())
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


      setCharLaunch(null)
      ipcRenderer.send("logIn", true)
    },

    preload: function (phaser) {
      //TODO load necesary images

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
      this.preview.load.atlasJSONHash('clothes0', './img/sprites/body/0/clothes.png', './img/sprites/body/0/clothes.json')
      //TODO this.preview.stage.disableVisibilityChange = true;



    },

    create: function (phaser) {

      this.addBody()
      this.character.animations.add('down', Phaser.Animation.generateFrameNames('', 1, 11, ''), 18, true, true)
      this.character.animations.add('lateral', Phaser.Animation.generateFrameNames('', 12, 23, ''), 18, true, true)
      this.character.animations.add('up', Phaser.Animation.generateFrameNames('', 24, 34, ''), 18, true, true)
      this.hair.animations.add('down', Phaser.Animation.generateFrameNames('', 1, 11, ''), 18, true, true)
      this.hair.animations.add('lateral', Phaser.Animation.generateFrameNames('', 12, 23, ''), 18, true, true)
      this.hair.animations.add('up', Phaser.Animation.generateFrameNames('', 24, 34, ''), 18, true, true)


    },

    update: function (phaser) {},

    changeDirection: function () {
      //button to rotate character, up, left, right, down
      this.checkAnimation()
    },

    changeClass: function (id) {

      this.form.className = id

      const buttons = document.getElementsByClassName('classes')
      //TODO clothes??
      buttons[0].disabled = (id == 0)
      buttons[1].disabled = (id == 1)
      buttons[2].disabled = (id == 2)


    },

    changeOrientation: function (id, event) {

      if (id) this.form.orientation = id
      
      const buttons = document.getElementsByClassName('orientation')

      buttons[0].disabled = (id == 0)
      buttons[1].disabled = (id == 1)
      buttons[2].disabled = (id == 2)

    },

    changeBody: function (id) {

      if (!isNaN(id)) this.form.bodyColor = id

      this.addBody()
      this.checkAnimation()

    },

    changeHair: function (id) {

      if (!isNaN(id)) this.form.hair = id

      this.addhair()
    },
    changeColor: function (id) {

      if (id) this.form.hairColor = id

      //TODO change new color to know what to change 
      //TODO controll black and white 

      console.log('change hair')
      console.log(this.form.hairColor)

      this.hair.tint = this.form.hairColor

    },
    addBody: function () {

      if (this.character != null)
        this.hair.kill()
      switch (Number(this.form.bodyColor)) {
        case 0:
          this.character = this.preview.add.sprite(80, 150, 'body0')
          break
        case 1:
          this.character = this.preview.add.sprite(80, 150, 'body1')
          break
        case 2:
          this.character = this.preview.add.sprite(80, 150, 'body2')
          break
        case 3:
          this.character = this.preview.add.sprite(80, 150, 'body3')
          break
        case 4:
          this.character = this.preview.add.sprite(80, 150, 'body4')
          break
        case 5:
          this.character = this.preview.add.sprite(80, 150, 'body5')
          break
        case 6:
          this.character = this.preview.add.sprite(80, 150, 'body6')
          break


      }
      this.clothes = this.preview.add.sprite(80, 150, 'clothes0')
      this.clothes.scale.set(10);
      this.character.scale.set(10);
      this.addhair()
    },

    addhair: function () {
      if (this.hair != null)
        this.hair.kill()
      switch (Number(this.form.hair)) {
        case 0:
          console.log('case 0')
          //TODO this.hair = this.character.addChild(this.preview.add.sprite(0, 0, 'hair0'))
          this.hair = this.preview.add.sprite(80, 150, 'hair0')
          break
        case 1:
          console.log('case 1')
          //TODO this.hair = this.character.addChild(this.preview.add.sprite(0, 0, 'hair1'))
          this.hair = this.preview.add.sprite(80, 150, 'hair1')
          break

      }
      this.changeColor()
      this.hair.scale.set(10);
    },
    checkAnimation: function () {
      switch (Number(this.moving)) {
        case 0:
          this.character.animations.stop()
          this.hair.animations.stop()
          break
        case 1:
          this.character.animations.play('up')
          this.hair.animations.play('up')
          break
        case 2:
          this.character.animations.play('lateral')
          this.hair.animations.play('lateral')
          break
        case 3:
          this.character.animations.play('down')
          this.hair.animations.play('down')
          break
        case 4:
          this.character.animations.play('lateral')
          this.hair.animations.play('lateral')
          break
      }
    }

  },
  mounted() {
    //$root
    const characterSaved = getCharLaunch()
    
    if (characterSaved != null) {
      const { _id, type, orientation, hair, hairColor, bodyColor } = characterSaved
      /*TODO orientation: "n",
      TODO hair: 0,
      TODO hairColor: '#000000',
      TODO bodyColor: 0, */
      this.form.name = _id
      this.form.className = type
      this.form.orientation = orientation
      this.form.bodyColor = bodyColor
      this.form.hair = hair
      this.form.hairColor = hairColor
      //TODO refresh?
    }


    let self = this
    this.preview = new Phaser.Game(500, 600, Phaser.AUTO, "leftContent", { preload, create, update }, true, false);

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