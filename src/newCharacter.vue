<template>
<div class="pure-g" id="index">

    <div id="leftContent"class="pure-u-2-3" >
    </div>

    <div class="pure-u-1-3" id="character-options">
        <h2>Customize Character</h2>
        <form>
            <div>
                <span>Name</span>
                <br>
                <input type="text" v-model="form.name" name="text" value="" placeholder="can't be changed later">
                <br>
                <br>
            </div>
            <div>
                <span>Class</span>
                <br>
                <button class="classes" @click.prevent="changeClass('0', $event)">Soldier</button>
                <button class="classes" @click.prevent="changeClass('1', $event)">Mage</button>
                <button class="classes" @click.prevent="changeClass('2', $event)">Rogue</button>
                <br>
                <br>
            </div>
            <div>
                <span>Orientation</span>

                <br>
                <button class="orientation" @click.prevent="changeOrientation('0', $event)">Ofensive</button>
                <button class="orientation" @click.prevent="changeOrientation('1', $event)">Defensive</button>
                <button class="orientation" @click.prevent="changeOrientation('2', $event)">Neutral</button>
                <br>
                <br>
            </div>
            <div>
                <span>Body color</span>
                <br>
                <button class="color-button orange" @click.prevent="changeBody(0)" />
                <button class="color-button brown" @click.prevent="changeBody(1)" />
                <button class="color-button light" @click.prevent="changeBody(2)" />
                <button class="color-button dark" @click.prevent="changeBody(3)" />
                <button class="color-button red" @click.prevent="changeBody(4)" />
                <button class="color-button blue" @click.prevent="changeBody(5)" />
                <button class="color-button green" @click.prevent="changeBody(6)" ></button>
                <br>
                <br>
            </div>
            <div>
                <span>Hair</span>
                <br>
                <button class="hair-button none" @click.prevent="changeHair(0)"> 0</button>
                <button class="hair-button basic" @click.prevent="changeHair(1)"> 1</button>
                <br>
                <br>
            </div>
            <div>
                <span>Hair color</span>
                <br>
                <button class="color-button black" @click.prevent="changeColor('0x000000')" />
                <button class="color-button white" @click.prevent="changeColor('0xffffff')" />
                <button class="color-button yellow" @click.prevent="changeColor('0xc4c046')" />
                <button class="color-button brown" @click.prevent="changeColor('0x492d00')" />
                <button class="color-button red" @click.prevent="changeColor('0xb00101')" />
                <button class="color-button blue" @click.prevent="changeColor('0x017ab0')" />
                <button class="color-button green" @click.prevent="changeColor('0x2ab001')" />
                <button class="color-button pink" @click.prevent="changeColor('0xFF0080')" ></button>
                <br>
                <br>
            </div>
            <div>
                <a v-text="save" @click="this.saveCharacter" class="pure-button">Save</a>
                <a v-text="exit" @click="this.backToList" class="pure-button">Exit</a>
            </div>
        </form>
    </div>
</div>
</template>

<script>/* 
import {getCharLaunch, getUser}from './js/data/db' */
const {getCharLaunch,setCharLaunch, getUser} = require('./js/data/db')

module.exports = {
  props: [""],
  data: function() {
    return {
      language: "en",
      save: "Save",
      exit: "Exit",
      form: {
        name: "",
        className: "",
        orientation: "",
        hair: 0,
        hairColor: "0x000000",
        bodyColor: 0
      },
      preview: null,
      character: null,
      hair: null,
      clothes: null,
      moving: 0
    };
  },
  methods: {
    saveCharacter: function() {
      /*toggle new window to create character */
      //TODO check server, save and go back to logged screen
      console.log("lol save");

      this.form.user = getUser();
      console.log(this.form);
      if (this.checkForm()) {
        console.log("checked ok");
        //127.0.0.1
        //termitavee.ddns.net
        fetch("http://" + getIP() + ":3000/create", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: JSON.stringify(this.form)
        })
          .then(res => res.json())
          .then(res => {
            console.log(res);
            if (res.status == 202) {
              //TODO update characters list
              console.log("success");

              this.form.user.characters.push(res.char);
              setUser(this.form.user);
              this.backToList();
            } else {
              console.log("failed");
              switch (res.error) {
                case "user":
                  //TODO show there is a problem with the character name
                  break;

                default:
                //TODO show there is a problem with I don't know what
              }
            }
          })
          .catch(error => {
            console.log("Request failed", error);
          });
      } else console.log("some field wrong");
    },

    checkForm: function() {
      let valid = true;

      const { name, className, orientation } = this.form;

      if (name.length < 4) {
        //TODO check class and orientation not empty
        console.log("name short");
        valid = false;
      }
      if (className == "") {
        console.log("unselected class");
        valid = false;
      }
      if (className == "") {
        console.log("unselected orientation");
        valid = false;
      }
      return valid;
    },

    backToList: function() {
      console.log("lol save");
      //TODO check valid data, not empty field

      setCharLaunch(null);
      //this.$router.push('/logged')
      this.$router.go(-1);
    },

    preload: function(phaser) {

      //this.preview.load.image('logo', './img/icon.jpg');
      
      this.preview.load.atlasJSONHash(
        "body0",
        "./img/sprites/body/0/base.png",
        "./img/sprites/body/0/base.json"
      );
      this.preview.load.atlasJSONHash(
        "body1",
        "./img/sprites/body/1/base.png",
        "./img/sprites/body/1/base.json"
      );
      this.preview.load.atlasJSONHash(
        "body2",
        "./img/sprites/body/2/base.png",
        "./img/sprites/body/2/base.json"
      );
      this.preview.load.atlasJSONHash(
        "body3",
        "./img/sprites/body/3/base.png",
        "./img/sprites/body/3/base.json"
      );
      this.preview.load.atlasJSONHash(
        "body4",
        "./img/sprites/body/4/base.png",
        "./img/sprites/body/4/base.json"
      );
      this.preview.load.atlasJSONHash(
        "body5",
        "./img/sprites/body/5/base.png",
        "./img/sprites/body/5/base.json"
      );
      this.preview.load.atlasJSONHash(
        "body6",
        "./img/sprites/body/6/base.png",
        "./img/sprites/body/6/base.json"
      );
      this.preview.load.atlasJSONHash(
        "hair0",
        "./img/sprites/hair/0.png",
        "./img/sprites/hair/0.json"
      );
      this.preview.load.atlasJSONHash(
        "hair1",
        "./img/sprites/hair/1.png",
        "./img/sprites/hair/1.json"
      );
      this.preview.load.atlasJSONHash(
        "clothes0",
        "./img/sprites/body/0/clothes.png",
        "./img/sprites/body/0/clothes.json"
      );
      //TODO this.preview.stage.disableVisibilityChange = true;
    },

    create: function(phaser) {
      this.addBody();
      this.character.animations.add(
        "down",
        Phaser.Animation.generateFrameNames("", 1, 11, ""),
        18,
        true,
        true
      );
      this.character.animations.add(
        "lateral",
        Phaser.Animation.generateFrameNames("", 12, 23, ""),
        18,
        true,
        true
      );
      this.character.animations.add(
        "up",
        Phaser.Animation.generateFrameNames("", 24, 34, ""),
        18,
        true,
        true
      );
      this.hair.animations.add(
        "down",
        Phaser.Animation.generateFrameNames("", 1, 11, ""),
        18,
        true,
        true
      );
      this.hair.animations.add(
        "lateral",
        Phaser.Animation.generateFrameNames("", 12, 23, ""),
        18,
        true,
        true
      );
      this.hair.animations.add(
        "up",
        Phaser.Animation.generateFrameNames("", 24, 34, ""),
        18,
        true,
        true
      );
    },

    update: function(phaser) {},

    changeDirection: function() {
      //button to rotate character, up, left, right, down
      this.checkAnimation();
    },

    changeClass: function(id) {
      this.form.className = id;

      const buttons = document.getElementsByClassName("classes");
      //TODO clothes??
      buttons[0].disabled = id == 0;
      buttons[1].disabled = id == 1;
      buttons[2].disabled = id == 2;
    },

    changeOrientation: function(id, event) {
      if (id) this.form.orientation = id;

      const buttons = document.getElementsByClassName("orientation");

      buttons[0].disabled = id == 0;
      buttons[1].disabled = id == 1;
      buttons[2].disabled = id == 2;
    },

    changeBody: function(id) {
      if (!isNaN(id)) this.form.bodyColor = id;

      this.addBody();
      this.checkAnimation();
    },

    changeHair: function(id) {
      if (!isNaN(id)) this.form.hair = id;

      this.addhair();
    },
    changeColor: function(id) {
      if (id) this.form.hairColor = id;

      //TODO change new color to know what to change
      //TODO controll black and white

      console.log("change hair");
      console.log(this.form.hairColor);

      this.hair.tint = this.form.hairColor;
    },
    addBody: function() {
      if (this.hair != null) this.hair.kill();
      switch (Number(this.form.bodyColor)) {
        case 0:
          this.character = this.preview.add.sprite(80, 150, "body0");
          break;
        case 1:
          this.character = this.preview.add.sprite(80, 150, "body1");
          break;
        case 2:
          this.character = this.preview.add.sprite(80, 150, "body2");
          break;
        case 3:
          this.character = this.preview.add.sprite(80, 150, "body3");
          break;
        case 4:
          this.character = this.preview.add.sprite(80, 150, "body4");
          break;
        case 5:
          this.character = this.preview.add.sprite(80, 150, "body5");
          break;
        case 6:
          this.character = this.preview.add.sprite(80, 150, "body6");
          break;
      }
      this.clothes = this.preview.add.sprite(80, 150, "clothes0");
      this.clothes.scale.set(10);
      this.character.scale.set(10);
      this.addhair();
    },

    addhair: function() {
      if (this.hair != null) this.hair.kill();
      switch (Number(this.form.hair)) {
        case 0:
          console.log("case 0");
          //TODO this.hair = this.character.addChild(this.preview.add.sprite(0, 0, 'hair0'))
          this.hair = this.preview.add.sprite(80, 150, "hair0");
          break;
        case 1:
          console.log("case 1");
          //TODO this.hair = this.character.addChild(this.preview.add.sprite(0, 0, 'hair1'))
          this.hair = this.preview.add.sprite(80, 150, "hair1");
          break;
      }
      this.changeColor();
      this.hair.scale.set(10);
    },
    checkAnimation: function() {
      switch (Number(this.moving)) {
        case 0:
          this.character.animations.stop();
          this.hair.animations.stop();
          break;
        case 1:
          this.character.animations.play("up");
          this.hair.animations.play("up");
          break;
        case 2:
          this.character.animations.play("lateral");
          this.hair.animations.play("lateral");
          break;
        case 3:
          this.character.animations.play("down");
          this.hair.animations.play("down");
          break;
        case 4:
          this.character.animations.play("lateral");
          this.hair.animations.play("lateral");
          break;
      }
    }
  },
  mounted: function() {
    const characterSaved = getCharLaunch();
    console.log(
      "========== cewCharacterjs - mounted - characterSaved ==========="
    );
    console.log(characterSaved);
    if (characterSaved != null) {
      const {
        _id,
        type,
        orientation,
        hair,
        hairColor,
        bodyColor
      } = characterSaved;

      this.form.name = _id;
      this.form.className = type;
      this.form.orientation = orientation;
      this.form.bodyColor = bodyColor;
      this.form.hair = hair;
      this.form.hairColor = hairColor;

      //disable name
      document.getElementsByTagName("input")[0].disabled = true;
      console.log(this.form);
    }

    let self = this;
    console.log('new game')
    this.preview = new Phaser.Game(
      500,
      600,
      Phaser.AUTO,
      "leftContent",
      { preload, create, update },
      true,
      false
    );

    function preload() {
      self.preload(this);
    }

    function create() {
      self.create(this);
    }
    function update() {
      self.update(this);
    }
  }
};
</script>

<style scoped>
#index {
  width: 100%;
}
button:disabled {
  background-color: #ccc;
}

.color-button {
  border-radius: 50%;
  height: 30px;
  width: 30px;
}

.hair-button {
  border-radius: 50%;
  height: 30px;
  width: 30px;
}

/*body color type*/
.orange {
  background-color: #dfa039;
}

.brown {
  background-color: #492d00;
}

.light {
  background-color: #c1c1c1;
}

.dark {
  background-color: #363636;
}

.red {
  background-color: #b00101;
}

.blue {
  background-color: #017ab0;
}

.green {
  background-color: #2ab001;
}
/*other colors*/

.black {
  background-color: #000;
}

.white {
  background-color: #fff;
}

.yellow {
  background-color: #c4c046;
}

.pink {
  background-color: #ff0080;
}

.grey {
  background-color: #aeaeae;
}

/*hair type*/
.none {
  background: url("./img/sprites/hair/0p.png");
}

.basic {
  background: url("./img/sprites/hair/1p.png");
  background-size: 100% 100%;
}
</style>