<template>
<div class="pure-g" id="index">

    <div id="leftContent" class="pure-u-2-3" >
    </div>

    <div class="pure-u-1-3" id="character-options">
        <h2 v-text="text.title">Customize Character</h2>
        <form>
            <div>
                <span v-text="text.name">Name</span>
                <br>
                <input type="text" v-model="form.name" name="text" value="" placeholder="can't be changed later">
                <br>
                <br>
            </div>
            <div>
                <span v-text="text.class">Class</span>
                <br>
                <button v-text="text.classType[0]" class="classes" @click.prevent="changeClass('0', $event)">Soldier</button>
                <button v-text="text.classType[0]" class="classes" @click.prevent="changeClass('1', $event)">Mage</button>
                <button v-text="text.classType[0]" class="classes" @click.prevent="changeClass('2', $event)">Rogue</button>
                <br>
                <br>
            </div>
            <div>
                <span v-text="text.orientation" >Orientation</span>

                <br>
                <button v-text="text.orientationType[0]" class="orientation" @click.prevent="changeOrientation('0', $event)">Ofensive</button>
                <button v-text="text.orientationType[1]" class="orientation" @click.prevent="changeOrientation('1', $event)">Defensive</button>
                <button v-text="text.orientationType[2]" class="orientation" @click.prevent="changeOrientation('2', $event)">Neutral</button>
                <br>
                <br>
            </div>
            <div>
                <span v-text="text.bcolor">Body color</span>
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
                <span v-text="text.hair">Hair</span>
                <br>
                <button class="hair-button none" @click.prevent="changeHair(0)"> 0</button>
                <button class="hair-button basic" @click.prevent="changeHair(1)"> 1</button>
                <br>
                <br>
            </div>
            <div>
                <span v-text="text.hColor">Hair color</span>
                <br>
                <button class="color-button black" @click.prevent="changeColor('0x000000')" />
                <button class="color-button white" @click.prevent="changeColor('0xffffff')" />
                <button class="color-button yellow" @click.prevent="changeColor('0xc4c046')" />
                <button class="color-button brown" @click.prevent="changeColor('0x492d00')" />
                <button class="color-button red" @click.prevent="changeColor('0xb00101')" />
                <button class="color-button blue" @click.prevent="changeColor('0x017ab0')" />
                <button class="color-button green" @click.prevent="changeColor('0x2ab001')" />
                <button class="color-button pink" @click.prevent="changeColor('0xFF0080')" />
                <br>
                <br>
            </div>
            <div>
                <a v-text="text.save" @click="this.saveCharacter" class="pure-button">Save</a>
                <a v-text="text.exit" @click="this.backToList" class="pure-button">Exit</a>
            </div>
        </form>
    </div>
</div>
</template>

<script>
//TOFIX checklanguage is not a function
import { getIP, getCharLaunch, setCharLaunch, getUser } from "./js/data/db";
import { editor } from "./js/phaserUtil.js";
const { loadLanguage } = require("./js//utils");
const enText = require("./js/data/lang/en.json");
const esText = require("./js/data/lang/es.json");

module.exports = {
  props: [""],
  data: function() {
    return {
      fileText: enText,
      text: enText.windows.editor,
      form: {
        name: "",
        className: "",
        orientation: "",
        hair: 0,
        hairColor: "0x000000",
        bodyColor: 0
      },
      ipServer: getIP(),
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
        fetch("http://" + this.ipServer + ":1993/create", {
          method: "POST",
          credentials: "include",
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
              setCharLaunch(res.char);
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
  created: function() {
    loadLanguage(this, getLang, { es: esText, en: enText }, "editor");
  },
  mounted: function() {
    const characterSaved = getCharLaunch();
    console.log(
      "========== newCharacterjs - mounted - characterSaved ==========="
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

    console.log("new game");
    this.preview = new Phaser.Game({
      type: Phaser.AUTO,
      width: 500,
      height: 600,
      scene: {
        preload,
        create,
        update
      }
    });
    /*      "leftContent",
      true,
      false*/
    const self = this;
    function preload() {
      editor.preload(self);
    }

    function create() {
      editor.create(self);
    }
    function update() {
      editor.update(self);
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