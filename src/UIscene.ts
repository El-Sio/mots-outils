import Phaser from 'phaser'

export default class UIScene extends Phaser.Scene
{
	constructor()
	{
		super('ui-scene')
	}

    playButton!:Phaser.Physics.Arcade.Sprite
    muteButton!:Phaser.Physics.Arcade.Sprite
    tileWidth = 0
    tileHeight = 0
    spacer = 0

    canvas:any

    preload() {

        this.load.spritesheet('buttons', 'img/buttons.png', {frameWidth:970, frameHeight:970})

        this.load.image('A', 'img/A.png')
        this.load.image('B', 'img/B.png')
        this.load.image('C', 'img/C.png')
        this.load.image('D', 'img/D.png')
        this.load.image('E', 'img/E.png')
        this.load.image('F', 'img/F.png')
        this.load.image('G', 'img/G.png')
        this.load.image('H', 'img/H.png')
        this.load.image('I', 'img/I.png')
        this.load.image('J', 'img/J.png')
        this.load.image('K', 'img/K.png')
        this.load.image('L', 'img/L.png')
        this.load.image('M', 'img/M.png')
        this.load.image('N', 'img/N.png')
        this.load.image('O', 'img/O.png')
        this.load.image('P', 'img/P.png')
        this.load.image('Q', 'img/Q.png')
        this.load.image('R', 'img/R.png')
        this.load.image('S', 'img/S.png')
        this.load.image('T', 'img/T.png')
        this.load.image('U', 'img/U.png')
        this.load.image('V', 'img/V.png')
        this.load.image('W', 'img/W.png')
        this.load.image('X', 'img/X.png')
        this.load.image('Y', 'img/Y.png')
        this.load.image('E', 'img/Z.png')

        this.load.image('blank', 'img/blank.png')
        this.load.image('tilebg', 'img/greentile.png')
        
    }
	create() {

    window.addEventListener('resize', this.resizeApp);

    this.canvas = this.sys.canvas

    this.tileHeight = this.textures.get('A').getSourceImage().height
    this.tileWidth = this.textures.get('A').getSourceImage().width

    this.add.tileSprite(0,0, this.canvas.width*2, this.canvas.height*2, 'tilebg')

    this.spacer = this.tileWidth/2

    this.anims.create({
        key:'play',
        frames: this.anims.generateFrameNumbers('buttons', {start:0, end:0}),
        frameRate:10,
    })

    this.anims.create({
        key:'mute',
        frames: this.anims.generateFrameNumbers('buttons', {start:2, end:2}),
        frameRate:10,
    })


    this.playButton = this.physics.add.sprite(this.canvas.width/2 - 2*this.tileWidth, this.canvas.height/2 + 4*this.tileHeight,'buttons').setScale(0.1).setDepth(3).setInteractive()
    this.playButton.anims.play('play')

    this.muteButton = this.physics.add.sprite(this.canvas.width/2 + 2*this.tileWidth, this.canvas.height/2 + 4*this.tileHeight,'buttons').setScale(0.1).setDepth(3).setInteractive()
    this.muteButton.anims.play('mute')

        this.playButton.on('pointerdown', (_event:any, _gameObjects:any) =>
        {
            this.startGame()
        });

        this.muteButton.on('pointerdown', (_pointer:any) =>
        {
            this.toggleMute()
        });


    this.cameras.main.fadeIn(2000)

    this.drawWord('LE JEU', this.canvas.width/2 - (this.tileWidth*3 + this.spacer*2.5), this.canvas.height/2 - 2*this.tileHeight)
    this.drawWord('DES', this.canvas.width/2 - (this.tileWidth*1.5 + this.spacer), this.canvas.height/2)
    this.drawWord('MOTS OUTILS', this.canvas.width/2 - (this.tileWidth*5.5 + this.spacer*5), this.canvas.height/2 + 2*this.tileHeight)

    }

    update() {

        if (!this.game.sound.mute) {
            this.muteButton.tint = 16777215;
        } else {
            this.muteButton.tint = 16711680;
        }

    }

    resizeApp ()
{
    // Width-height-ratio of game resolution
    // Replace 360 with your game width, and replace 640 with your game height
    let game_ratio = 900 / 1600;
	
    // Make div full height of browser and keep the ratio of game resolution
    let div = document.getElementById('app');
    div!.style.width = (window.innerHeight * game_ratio) + 'px';
    div!.style.height = window.innerHeight + 'px';
	
    // Check if device DPI messes up the width-height-ratio
    let canvas	= document.getElementsByTagName('canvas')[0];
	
    let dpi_w	= parseInt(div!.style.width) / canvas.width;
    let dpi_h	= parseInt(div!.style.height) / canvas.height;		
	
    let height	= window.innerHeight * (dpi_w / dpi_h);
    let width	= height * game_ratio;
	
    // Scale canvas	
    canvas.style.width	= width + 'px';
    canvas.style.height	= height + 'px';
}

startGame() {
    //go to next scene...
    this.cameras.main.fadeOut(2000)
    this.scene.stop()
    this.sys.game.scene.start('playGame')
}

toggleMute() {
    if (!this.game.sound.mute) {
        this.game.sound.mute = true;
        this.muteButton.tint = 16711680;
    } else {
        this.game.sound.mute = false;
        this.muteButton.tint = 16777215;
    }
}

drawWord(word:string, startX:number, startY:number) {

    var letters = word.split('')


    letters.forEach((l,i) => {
        if(l !=' ') {
            this.physics.add.sprite(startX + i*this.spacer + i*this.tileWidth , startY, l)
        } else if(l == ' ') {
            this.physics.add.sprite(startX + i*this.spacer + i*this.tileWidth , startY, 'blank').setDepth(2)
        }
    })
}

}