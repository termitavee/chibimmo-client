//TODO this reference
//TODO loadSprite red loadSprites
import asdf from '../img/sprites/body/0/body.json'
const utils = {
  loadSprites: (phaserInstance) => {
    //All skin

    console.log('this')
    console.log(phaserInstance)
    console.log(asdf)
/*     phaserInstance.load.addAtlasJSONHash(
      "body0",
      "../img/sprites/body/0/body.png",
      "../img/sprites/body/0/body.json"
    ); */
/*
    phaserInstance.load.atlas(
      "body0",
      "../img/sprites/body/0/body.png",
      "../img/sprites/body/0/body.json"
    );

    phaserInstance.load.atlas(
      "body1",
      "../img/sprites/body/1/body.png",
      "../img/sprites/body/1/body.json"
    );
    phaserInstance.load.atlas(
      "body2",
      "../img/sprites/body/2/body.png",
      "../img/sprites/body/2/body.json"
    );
    phaserInstance.load.atlas(
      "body3",
      "../img/sprites/body/3/body.png",
      "../img/sprites/body/3/body.json"
    );
    phaserInstance.load.atlas(
      "body4",
      "../img/sprites/body/4/body.png",
      "../img/sprites/body/4/body.json"
    );
    phaserInstance.load.atlas(
      "body5",
      "../img/sprites/body/5/body.png",
      "../img/sprites/body/5/body.json"
    );
    phaserInstance.load.atlas(
      "body6",
      "../img/sprites/body/6/body.png",
      "../img/sprites/body/6/body.json"
    );*/
    //All hair
/*     phaserInstance.load.atlas(
      "hair0",
      "../img/sprites/hair/0.png",
      "../img/sprites/hair/0.json"
    ); */
    /*
    phaserInstance.load.atlas(
      "hair1",
      "../img/sprites/hair/1.png",
      "../img/sprites/hair/1.json"
    );*/
    //All clothes
/*     phaserInstance.load.atlas(
      "clothes0",
      "../img/sprites/body/0/clothes.png",
      "../img/sprites/body/0/clothes.json"
    ); */
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
    this.player.hair.animations.add(
      "down",
      Phaser.Animation.generateFrameNames("", 1, 11, ""),
      18,
      true,
      true
    );
    this.player.hair.animations.add(
      "lat",
      Phaser.Animation.generateFrameNames("", 12, 23, ""),
      18,
      true,
      true
    );
    this.player.hair.animations.add(
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

let game = class editor extends Phaser.Scene {
  constructor() {
    super({ key: 'game' })
  }

  preload() {
    //load character sprites
    utils.loadSprites(this.player)
//All items

//All maps
this.game.load.tilemap(
  "world",
  "./js/maps/world.json",
  null,
  Phaser.Tilemap.TILED_JSON
);
this.game.load.tilemap(
  "village1",
  "./js/maps/village1.json",
  null,
  Phaser.Tilemap.TILED_JSON
);

//All map sprites

this.game.load.image(
  "chibimmo",
  "../img/sprites/map/chibimmo.png"
);

//all audio

//this.load.audio('name','location/file.mp3')

  }
  create() {

/*     this.map = this.make.tilemap({ key: 'map' });
    this.tileset = this.map.addTilesetImage('SuperMarioBros-World1-1', 'tiles');
     */
  this.game.physics.startSystem(Phaser.Physics.P2JS);
  this.map = this.game.add.tilemap("myWorld");

  this.map.addTilesetImage("wood_tileset", "wood_tileset");
  this.map.addTilesetImage("town_forest_tiles", "town_forest_tiles");
  this.layer.background = this.map.createLayer("background");
  this.layer.foreground = this.map.createLayer("foreground");

  //TODO this.game.world.scale.setTo(2, 2);

  this.layer.background.resizeWorld();
  this.layer.foreground.resizeWorld();

  //this.map.setCollision([189, 190, 191, 192, 205, 206, 207, 208, 221, 222, 223, 224, 237, 238, 239, 240, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 277, 278, 279, 279, 280, 281, 282, 283, 284, 285, 286], true, this.layer.foreground)
  //, true, this.layer.foreground
  this.map.setCollisionBetween(189, 192, true, this.layer.foreground);
  this.map.setCollisionBetween(205, 208, true, this.layer.foreground);
  this.map.setCollisionBetween(221, 224, true, this.layer.foreground);
  this.map.setCollisionBetween(237, 240, true, this.layer.foreground);
  this.map.setCollisionBetween(253, 263, true, this.layer.foreground);
  this.map.setCollisionBetween(277, 286, true, this.layer.foreground);
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
  } = this.character;
  console.log("========== game.js - create() - this.character ==========");
  console.log(this.character);
  // posicion x*32+16
  this.player = this.game.add.sprite(3216, 3664, "body0");
  this.player.stats = this.character
  this.player.hair = this.player.addChild(
    this.game.make.sprite(0, 0, "hair0")
  );
  this.player.anchor.setTo(0.5, 0.5);
  console.log(this.player)
  //TODO get position 0,1,2,3 up, left right down
  loadAnimations: (this.player)

  //TODO this.player.scale.set(2);
  //physics related
  this.game.physics.p2.enable(this.player, true); //,false,true
  this.player.body.clearShapes();
  this.player.body.addRectangle(15, 20);
  this.player.body.fixedRotation = true;
  this.player.body.collideWorldBounds = true;
  //  The smaller the value, the smooth the camera (and the longer it takes to catch up)
  //.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

  this.game.camera.follow(this.player);
  //TODO all key listener, wasd, esc, enter
  utils.loadKeyMap(this)
  //this.wasd = { up: game.input.keyboard.addKey(Phaser.Keyboard.W), down: game.input.keyboard.addKey(Phaser.Keyboard.S), left: game.input.keyboard.addKey(Phaser.Keyboard.A), right: game.input.keyboard.addKey(Phaser.Keyboard.D), };

  //TODO When the game loses focus set InputManager.enabled (game.input) to false, and switch it back when it gets focus again.

  //prepare colisiohn with other players
  //characters = game.add.group();
  /*var panda = pandas.create(game.world.randomX, game.world.randomY, 'panda');
    panda.body.setRectangle(40, 40); */
  //this.physics.add.overlap(user, group, collectStar, null, this);
  this.charactersColisionGroup = this.game.physics.p2.createCollisionGroup();
  this.charactersColisionGroup.enableBody = true;
  this.charactersColisionGroup.physicsBodyType = Phaser.Physics.P2JS;
  //prepare colisiohn with enemies
  //this.enemyColisionGroup = this.game.physics.p2.createCollisionGroup();
  //this.enemyColisionGroup.enableBody = true;
  //this.enemyColisionGroup.physicsBodyType = Phaser.Physics.P2JS;
  // this.mapColisionGroup = game.physics.p2.createCollisionGroup();
  this.player.body.collides(this.charactersColisionGroup, this.hitplayer, this);
  //this.player.body.collides(enemyColisionGroup, hitenemy, this);
  //this.player.body.collides(mapColisionGroup, hitmap, this);
}
update () {
  //TODO control movement and user actions
  let moving = 0;

  if (this.cursors.left.isDown) {
    this.player.body.velocity.x = -1000;
    this.player.scale.setTo(-1, 1);
    moving = 1;
  } else if (this.cursors.right.isDown) {
    this.player.body.velocity.x = 1000;
    this.player.scale.set(1);
    moving = 1;
  } else {
    this.player.body.velocity.x = 0;
  }

  if (this.cursors.up.isDown) {
    this.player.body.velocity.y = -1000;
    moving = 2;
  } else if (this.cursors.down.isDown) {
    this.player.body.velocity.y = 1000;
    moving = 3;
  } else {
    this.player.body.velocity.y = 0;
  }

  switch (moving) {
    case 0:
      this.player.animations.stop();
      break;
    case 1:
      this.player.play("lat");
      break;
    case 2:
      this.player.play("up");
      break;
    case 3:
      this.player.play("down");
      break;
  }

  //TODO this.socket.emit("moveUSer", {user: this.user, });
  /*send user, movement+ifthis.player.scale.x negative=left, action and coordenates */

  //TODO hits for other elemenst like enmies
}
}

let editor = class editor extends Phaser.Scene {
  constructor() {
    super({ key: 'editor' })
  }
  preload() {

    //this.preview.load.image('logo', '../img/icon.jpg');
    utils.loadSprites(this)

    //TODO this.preview.stage.disableVisibilityChange = true;
  }

  create() {
    //TODO    this.addBody();
    loadAnimations: (this)

  }

  update() { }

}

module.exports = {
  game,
  editor,
  utils
}