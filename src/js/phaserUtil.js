//TODO this reference
//TODO loadSprite red loadSprites
const utils = {
  loadSprites: (character) => {
    //All skin
    console.log('character')
    console.log(character)
    character.load.atlasJSONHash(
      "body",
      "./img/sprites/body/0/body.png",
      "./img/sprites/body/0/body.json"
    );
    /* character.load.atlasJSONHash(
      "body1",
      "./img/sprites/body/1/base.png",
      "./img/sprites/body/1/base.json"
    );
    character.load.atlasJSONHash(
      "body2",
      "./img/sprites/body/2/base.png",
      "./img/sprites/body/2/base.json"
    );
    character.load.atlasJSONHash(
      "body3",
      "./img/sprites/body/3/base.png",
      "./img/sprites/body/3/base.json"
    );
    character.load.atlasJSONHash(
      "body4",
      "./img/sprites/body/4/base.png",
      "./img/sprites/body/4/base.json"
    );
    character.load.atlasJSONHash(
      "body5",
      "./img/sprites/body/5/base.png",
      "./img/sprites/body/5/base.json"
    );
    character.load.atlasJSONHash(
      "body6",
      "./img/sprites/body/6/base.png",
      "./img/sprites/body/6/base.json"
    ); */
    //All hair
    character.load.atlasJSONHash(
      "hair0",
      "./img/sprites/body/0/hair.png",
      "./img/sprites/hair/0/hair.json"
    );
    /* character.load.atlasJSONHash(
      "hair1",
      "./img/sprites/hair/1/hair.png",
      "./img/sprites/hair/1/hair.json"
    ); */
    //All clothes
     character.load.atlasJSONHash(
      "clothes0",
      "./img/sprites/body/0/clothes.png",
      "./img/sprites/body/0/clothes.json"
    ); 
  },

  loadAnimations: (character) => {
    character.animations.add(
      "down",
      Phaser.Animation.generateFrameNames("", 1, 11, ""),
      18,
      true,
      true
    );
    character.animations.add(
      "lat",
      Phaser.Animation.generateFrameNames("", 12, 23, ""),
      18,
      true,
      true
    );
    character.animations.add(
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
  },
  colision: (player, objet) => {
    
  },
  createCharacter: function (character) {
    const {
      bodyColor,
      hair,
      hairColor,
      equipment,
      map,
      position,
      direction
    } = character;
    //const newPlayer = this.game.add.sprite(position.x * 32 + 16, position.y * 32 + 16, `body${bodyColor}`)
    const newPlayer = characters.create(
      position.x * 32 + 16,
      position.y * 32 + 16,
      `body${bodyColor}`
    );
    newPlayer.hair = this.player.addChild(
      this.game.make.sprite(0, 0, `hair${hair}`)
    );
    newPlayer.clothes = this.player.addChild(
      this.game.make.sprite(0, 0, `clothes${hair}`)
    );
    newPlayer.hair.tint = hairColor;
    newPlayer.anchor.setTo(0.5, 0.5);
    newPlayer.frame = this.parseDirection(direction);
    // movement
    newPlayer.animations.add(
      "down",
      Phaser.Animation.generateFrameNames("", 1, 11, ""),
      18,
      true,
      true
    );
    newPlayer.animations.add(
      "lat",
      Phaser.Animation.generateFrameNames("", 12, 23, ""),
      18,
      true,
      true
    );
    newPlayer.animations.add(
      "up",
      Phaser.Animation.generateFrameNames("", 24, 34, ""),
      18,
      true,
      true
    );
    newPlayer.hair.animations.add(
      "down",
      Phaser.Animation.generateFrameNames("", 1, 11, ""),
      18,
      true,
      true
    );
    newPlayer.hair.animations.add(
      "lat",
      Phaser.Animation.generateFrameNames("", 12, 23, ""),
      18,
      true,
      true
    );
    newPlayer.hair.animations.add(
      "up",
      Phaser.Animation.generateFrameNames("", 24, 34, ""),
      18,
      true,
      true
    );

    //make it solid
    this.game.physics.p2.enable(newPlayer, true); //TODO,false,true
    //newPlayer.body.clearShapes()
    newPlayer.body.addRectangle(15, 20);

    //make it colide
    newPlayer.body.setCollisionGroup(this.charactersColisionGroup);
    newPlayer.body.collides([
      this.charactersColisionGroup,
      playerCollisionGroup
    ]);

    return newPlayer;
  },

}

const game =  {
  preload: function (self) {

    //load character sprites
    utils.loadSprites(self.player)
    //All items

    //All maps
    self.game.load.tilemap(
      "world",
      "./js/maps/world.json",
      null,
      Phaser.Tilemap.TILED_JSON
    );
    self.game.load.tilemap(
      "village1",
      "./js/maps/village1.json",
      null,
      Phaser.Tilemap.TILED_JSON
    );

    //All map sprites

    self.game.load.image(
      "chibimmo",
      "./img/sprites/map/chibimmo.png"
    );

    //all audio

    //self.load.audio('name','location/file.mp3')
    console.log('load finished')
    console.log(self)
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
    console.log(self.player)
    //TODO get position 0,1,2,3 up, left right down
    loadAnimations: (self.player) 
    
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
    utils.loadKeyMap(self)
    //this.wasd = { up: game.input.keyboard.addKey(Phaser.Keyboard.W), down: game.input.keyboard.addKey(Phaser.Keyboard.S), left: game.input.keyboard.addKey(Phaser.Keyboard.A), right: game.input.keyboard.addKey(Phaser.Keyboard.D), };

    //TODO When the game loses focus set InputManager.enabled (game.input) to false, and switch it back when it gets focus again.

    //prepare colisiohn with other players
    //characters = game.add.group();
    /*var panda = pandas.create(game.world.randomX, game.world.randomY, 'panda');
      panda.body.setRectangle(40, 40); */
    //this.physics.add.overlap(user, group, collectStar, null, this);
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
}
const editor = {
  preload: function (self) {

    //this.preview.load.image('logo', './img/icon.jpg');
    utils.loadSprites(self.preview)
    
    //TODO this.preview.stage.disableVisibilityChange = true;
  },

  create: function (self) {
    //TODO
    self.addBody();
    loadAnimations: (self.character) 

  },

  update: function (phaser) { },

}

module.exports = {
  game,
  editor,
  utils
}