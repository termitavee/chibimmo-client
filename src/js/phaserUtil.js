//TODO this reference
module.exports = {
  game: {
    preload: function (self) {
      console.log('this in preload')
      console.log(self)
      //All skin
      self.game.load.atlasJSONHash(
        "body0",
        "./img/sprites/body/0/base.png",
        "./img/sprites/body/0/base.json"
      );
      self.game.load.atlasJSONHash(
        "body1",
        "./img/sprites/body/1/base.png",
        "./img/sprites/body/1/base.json"
      );
      self.game.load.atlasJSONHash(
        "body2",
        "./img/sprites/body/2/base.png",
        "./img/sprites/body/2/base.json"
      );
      self.game.load.atlasJSONHash(
        "body3",
        "./img/sprites/body/3/base.png",
        "./img/sprites/body/3/base.json"
      );
      self.game.load.atlasJSONHash(
        "body4",
        "./img/sprites/body/4/base.png",
        "./img/sprites/body/4/base.json"
      );
      self.game.load.atlasJSONHash(
        "body5",
        "./img/sprites/body/5/base.png",
        "./img/sprites/body/5/base.json"
      );
      self.game.load.atlasJSONHash(
        "body6",
        "./img/sprites/body/6/base.png",
        "./img/sprites/body/6/base.json"
      );
      //All hair
      self.game.load.atlasJSONHash(
        "hair0",
        "./img/sprites/hair/0.png",
        "./img/sprites/hair/0.json"
      );
      self.game.load.atlasJSONHash(
        "hair1",
        "./img/sprites/hair/1.png",
        "./img/sprites/hair/1.json"
      );
      //All clothes
      self.game.load.atlasJSONHash(
        "clothes0",
        "./img/sprites/body/0/clothes.png",
        "./img/sprites/body/0/clothes.json"
      );
      //All items

      //All maps
      self.game.load.tilemap(
        "myWorld",
        "./img/map/world 1 - small.json",
        null,
        Phaser.Tilemap.TILED_JSON
      );

      //All map sprites

      self.game.load.image(
        "town_forest_tiles",
        "./img/map/spriteset/town_forest_tiles.png"
      );
      self.game.load.image(
        "wood_tileset",
        "./img/map/spriteset/wood_tileset.png"
      );
    },
    create: function (self) {
      self.game.physics.startSystem(Phaser.Physics.P2JS);
      self.map = self.game.add.tilemap("myWorld");

      self.map.addTilesetImage("wood_tileset", "wood_tileset");
      self.map.addTilesetImage("town_forest_tiles", "town_forest_tiles");
      self.layer.background = self.map.createLayer("background");
      self.layer.foreground = self.map.createLayer("foreground");

      //TODO this.game.world.scale.setTo(2, 2);

      self.layer.background.resizeWorld();
      self.layer.foreground.resizeWorld();

      //self.map.setCollision([189, 190, 191, 192, 205, 206, 207, 208, 221, 222, 223, 224, 237, 238, 239, 240, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 277, 278, 279, 279, 280, 281, 282, 283, 284, 285, 286], true, this.layer.foreground)
      //, true, self.layer.foreground
      self.map.setCollisionBetween(189, 192, true, self.layer.foreground);
      self.map.setCollisionBetween(205, 208, true, self.layer.foreground);
      self.map.setCollisionBetween(221, 224, true, self.layer.foreground);
      self.map.setCollisionBetween(237, 240, true, self.layer.foreground);
      self.map.setCollisionBetween(253, 263, true, self.layer.foreground);
      self.map.setCollisionBetween(277, 286, true, self.layer.foreground);
      //setTileIndexCallback
      //setTileLocationCallback

      //const levelData = this.game.cache.getPhysicsData("town_forest_tiles");
      //console.log(levelData);
      //this.game.load.physics('level', 'assets/level.json');
      //this.game.physics.p2.convertTilemap(this.map, this.layer.foreground);
      //this.layer.foreground.debug = true; //TODO delete

      //this.game.physics.p2.restitution = 0.5;

      //Add user
      //TODO get character personalization this.player = this.createCharacter(this.character)
      //["_id", "userID", "type", "orientation", "stadistics", "map", "position", "started", "equipment", "achievements", "hair", "hairColor", "bodyColor"]
      const {
        position,
        equipment,
        hair,
        hairColor,
        bodyColor
      } = self.character;
      console.log("========== game.js - create() - self.character ==========");
      console.log(self.character);
      // posicion x*32+16
      self.player = self.game.add.sprite(3216, 3664, "body0");
      self.player.stats = self.character
      self.player.hair = self.player.addChild(
        self.game.make.sprite(0, 0, "hair0")
      );
      self.player.anchor.setTo(0.5, 0.5);

      //TODO get position 0,1,2,3 up, left right down
      self.player.animations.add(
        "down",
        Phaser.Animation.generateFrameNames("", 1, 11, ""),
        18,
        true,
        true
      );
      self.player.animations.add(
        "lat",
        Phaser.Animation.generateFrameNames("", 12, 23, ""),
        18,
        true,
        true
      );
      self.player.animations.add(
        "up",
        Phaser.Animation.generateFrameNames("", 24, 34, ""),
        18,
        true,
        true
      );
      self.player.hair.animations.add(
        "down",
        Phaser.Animation.generateFrameNames("", 1, 11, ""),
        18,
        true,
        true
      );
      self.player.hair.animations.add(
        "lat",
        Phaser.Animation.generateFrameNames("", 12, 23, ""),
        18,
        true,
        true
      );
      self.player.hair.animations.add(
        "up",
        Phaser.Animation.generateFrameNames("", 24, 34, ""),
        18,
        true,
        true
      );

      //TODO this.player.scale.set(2);
      //physics related
      self.game.physics.p2.enable(self.player, true); //,false,true
      self.player.body.clearShapes();
      self.player.body.addRectangle(15, 20);
      self.player.body.fixedRotation = true;
      self.player.body.collideWorldBounds = true;
      //  The smaller the value, the smooth the camera (and the longer it takes to catch up)
      //.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

      self.game.camera.follow(self.player);
      //TODO all key listener, wasd, esc, enter
      self.cursors = self.game.input.keyboard.createCursorKeys();
      //this.wasd = { up: game.input.keyboard.addKey(Phaser.Keyboard.W), down: game.input.keyboard.addKey(Phaser.Keyboard.S), left: game.input.keyboard.addKey(Phaser.Keyboard.A), right: game.input.keyboard.addKey(Phaser.Keyboard.D), };

      //TODO When the game loses focus set InputManager.enabled (game.input) to false, and switch it back when it gets focus again.

      //prepare colisiohn with other players
      //characters = game.add.group();
      /*var panda = pandas.create(game.world.randomX, game.world.randomY, 'panda');
        panda.body.setRectangle(40, 40); */
      self.charactersColisionGroup = self.game.physics.p2.createCollisionGroup();
      self.charactersColisionGroup.enableBody = true;
      self.charactersColisionGroup.physicsBodyType = Phaser.Physics.P2JS;
      //prepare colisiohn with enemies
      //this.enemyColisionGroup = this.game.physics.p2.createCollisionGroup();
      //this.enemyColisionGroup.enableBody = true;
      //this.enemyColisionGroup.physicsBodyType = Phaser.Physics.P2JS;
      // this.mapColisionGroup = game.physics.p2.createCollisionGroup();
      self.player.body.collides(self.charactersColisionGroup, self.hitplayer, self);
      //this.player.body.collides(enemyColisionGroup, hitenemy, this);
      //this.player.body.collides(mapColisionGroup, hitmap, this);
    },
    update: function (self) {
      //TODO control movement and user actions
      let moving = 0;

      if (self.cursors.left.isDown) {
        self.player.body.velocity.x = -1000;
        self.player.scale.setTo(-1, 1);
        moving = 1;
      } else if (self.cursors.right.isDown) {
        self.player.body.velocity.x = 1000;
        self.player.scale.set(1);
        moving = 1;
      } else {
        self.player.body.velocity.x = 0;
      }

      if (self.cursors.up.isDown) {
        self.player.body.velocity.y = -1000;
        moving = 2;
      } else if (self.cursors.down.isDown) {
        self.player.body.velocity.y = 1000;
        moving = 3;
      } else {
        self.player.body.velocity.y = 0;
      }

      switch (moving) {
        case 0:
          self.player.animations.stop();
          break;
        case 1:
          self.player.play("lat");
          break;
        case 2:
          self.player.play("up");
          break;
        case 3:
          self.player.play("down");
          break;
      }

      //TODO this.socket.emit("moveUSer", {user: this.user, });
      /*send user, movement+ifthis.player.scale.x negative=left, action and coordenates */

      //TODO hits for other elemenst like enmies
    },
    createCharacter: function () {
      //get data and position to draw a character
    },
  },
  editor: {
    preload: function (self) {

      //this.preview.load.image('logo', './img/icon.jpg');

      self.preview.load.atlasJSONHash(
        "body0",
        "./img/sprites/body/0/base.png",
        "./img/sprites/body/0/base.json"
      );
      self.preview.load.atlasJSONHash(
        "body1",
        "./img/sprites/body/1/base.png",
        "./img/sprites/body/1/base.json"
      );
      self.preview.load.atlasJSONHash(
        "body2",
        "./img/sprites/body/2/base.png",
        "./img/sprites/body/2/base.json"
      );
      self.preview.load.atlasJSONHash(
        "body3",
        "./img/sprites/body/3/base.png",
        "./img/sprites/body/3/base.json"
      );
      self.preview.load.atlasJSONHash(
        "body4",
        "./img/sprites/body/4/base.png",
        "./img/sprites/body/4/base.json"
      );
      self.preview.load.atlasJSONHash(
        "body5",
        "./img/sprites/body/5/base.png",
        "./img/sprites/body/5/base.json"
      );
      self.preview.load.atlasJSONHash(
        "body6",
        "./img/sprites/body/6/base.png",
        "./img/sprites/body/6/base.json"
      );
      self.preview.load.atlasJSONHash(
        "hair0",
        "./img/sprites/hair/0.png",
        "./img/sprites/hair/0.json"
      );
      self.preview.load.atlasJSONHash(
        "hair1",
        "./img/sprites/hair/1.png",
        "./img/sprites/hair/1.json"
      );
      self.preview.load.atlasJSONHash(
        "clothes0",
        "./img/sprites/body/0/clothes.png",
        "./img/sprites/body/0/clothes.json"
      );
      //TODO this.preview.stage.disableVisibilityChange = true;
    },

    create: function (phaser) {
      self.addBody();
      self.character.animations.add(
        "down",
        Phaser.Animation.generateFrameNames("", 1, 11, ""),
        18,
        true,
        true
      );
      self.character.animations.add(
        "lateral",
        Phaser.Animation.generateFrameNames("", 12, 23, ""),
        18,
        true,
        true
      );
      self.character.animations.add(
        "up",
        Phaser.Animation.generateFrameNames("", 24, 34, ""),
        18,
        true,
        true
      );
      self.hair.animations.add(
        "down",
        Phaser.Animation.generateFrameNames("", 1, 11, ""),
        18,
        true,
        true
      );
      self.hair.animations.add(
        "lateral",
        Phaser.Animation.generateFrameNames("", 12, 23, ""),
        18,
        true,
        true
      );
      self.hair.animations.add(
        "up",
        Phaser.Animation.generateFrameNames("", 24, 34, ""),
        18,
        true,
        true
      );
    },

    update: function (phaser) { },

  },




}