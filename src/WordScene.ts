import Phaser from 'phaser'

export interface toolWord {
    value:string,
    examples:string[]
}

export default class WordScene extends Phaser.Scene {
	constructor() {
		super('playGame')
    }

    tileWidth = 0
    tileHeight = 0

    spacer = 0

    canvas:any
    cursors!:Phaser.Types.Input.Keyboard.CursorKeys
    pointer!:Phaser.Input.Pointer

    tiles!:Phaser.Physics.Arcade.Group
    nextButton!:Phaser.Physics.Arcade.Sprite
    quitButton!:Phaser.Physics.Arcade.Sprite
    retryButton!:Phaser.Physics.Arcade.Sprite
    homeButton!:Phaser.Physics.Arcade.Sprite
    muteButton!:Phaser.Physics.Arcade.Sprite

    right!:Phaser.Sound.BaseSound
    wrong!:Phaser.Sound.BaseSound
    applause!:Phaser.Sound.BaseSound
    complete!:Phaser.Sound.BaseSound
    
    chosenWord = ''
    previouswords: string[] = []
    chosenletters: any[] = []
    currentIndex = 0
    hint = ''
    completion = 0

    completiontext:any
    hintText:any

    paused = false
    isGameOver = false

    dictionary: toolWord[] = [
        {value:'DANS', examples:['Taoki est ____ le bus', 'Le bol est ____ le placard']},
        {value:'EST', examples:['Taoki ___ malade', 'Hugo ___ ravi']},
        {value:'AUSSI', examples:['Hugo est ravi et lili _____ ', 'Lili a un cahier et _____ un crayon']},
        {value:'SANS', examples:['Taoki fait du vélo ____ les mains', 'Hugo est venu ____ pantalon']},
        {value:'ET', examples:['Taoki __ Lili', 'Hugo __ Taoki']},
        {value:'SONT', examples:['Taoki et Hugo ____ dans la maison', 'Hugo et Lili ____ contents']},
        {value:'AVEC', examples:['Taoki fait un gateau ____ Lili', 'Hugo va au parc ____ Taoki']},
        {value:'MAIS', examples:['Taoki aime les bananes ____ pas les pommes', 'Hugo est fatigué ____ heureux']},
        {value:'DES', examples:['Taoki a ___ amis', 'Hugo et Lili sont ___ enfants']},
        {value:'LES', examples:['Taoki joue avec ___ enfants', 'Hugo regarde ___ nuages']},
        {value:'COMME', examples:['Taoki fait du vélo _____ un grand', 'Lili veut faire _____ maman']},
        {value:'CHEZ', examples:['Taoki va ____ le docteur', 'Hugo et Lili sont ____ leur mamie']},
        {value:'CAR', examples:['Taoki va chez le docteur ___ il a mal au dos', 'Hugo est ravi ___ il mange une glace']},
        {value:'SES', examples:['Taoki range ___ crayons dans sa trousse', 'Lili joue avec ___ jouets']},
        {value:'EN', examples:['Taoki va chez le docteur __ vélo', 'Hugo et Lili sont __ vacances']},
        {value:'SON', examples:['Taoki joue avec ___ chien', 'Hugo aime ___ papa']},
        {value:'SUR', examples:['Le livre est ___ la table', 'Hugo et Lili sont ___ un bateau']},
        {value:'NE PAS', examples:['Taoki __ mange ___ de légumes', 'Hugo et Lili __ vont ___ à la cantine le lundi']},
        {value:'IL Y A', examples:['Ce soir, __ _ _ du dessert', 'Dans la jungle __ _ _ des lions']},
        {value:"C'EST", examples:["_____ Taoki qui a gagné", "_____ le ballon de Hugo"]},
        {value:"UNE", examples:["Taoki mange ___ pomme", "Lili joue avec ___ balle"]},
        {value:"ELLE", examples:["____ est belle maman", "Maintenant c'est ____ qui est le chat, dit hugo"]},
        {value:"UN", examples:["Taoki est __dragon", "Hugo a __ vélo"]},
        {value:"LA", examples:["Taoki mange __ pomme", "__ banane est bonne"]},
        {value:"DE", examples:["Taoki mange __ la viande", "Hugo n'a pas __ chance"]},
        {value:"LE", examples:["Taoki prends __ train", "Lili prépare __ gouter"]},
        {value:"IL", examples:["Zut, __ pleut, dit Taoki", "Comme __ est beau ce ballon"]},
        {value:"TRÈS", examples:["Taoki est ____ fatigué", "La banane est ____ bonne"]},
        {value:"QUI", examples:["___ est là ? demande Taoki", "C'est le bus ___ roule dans la rue"]},
        {value:"S'EST", examples:["Hugo _____ fait mal", "Lili _____ trompée"]},
        {value:"AU", examples:["Taoki et Hugo vont __ cinéma", "Taoki est fatigué, il va __ lit"]},
        {value:"MÊME", examples:["je n'ai ____ pas peur, dit Taoki", "Lili et Hugo ont le ____ pull"]},
        {value:"OÙ", examples:["__ est mon camion ? demande Taoki", "On va __ pour les vacances ?"]},
        
    ]

preload() {

    this.load.spritesheet('buttons', 'img/buttons.png', {frameWidth:970, frameHeight:970})

    this.load.image('A', 'img/A.png')
    this.load.image('B', 'img/B.png')
    this.load.image('C', 'img/C.png')
    this.load.image('D', 'img/D.png')
    this.load.image('E', 'img/E.png')
    this.load.image('É', 'img/É.png')
    this.load.image('È', 'img/È.png')
    this.load.image('Ê', 'img/Ê.png')
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
    this.load.image('Ù', 'img/Ù.png')
    this.load.image('V', 'img/V.png')
    this.load.image('W', 'img/W.png')
    this.load.image('X', 'img/X.png')
    this.load.image('Y', 'img/Y.png')
    this.load.image('Z', 'img/Z.png')

    this.load.image('apo', 'img/apo.png')
    this.load.image('blank', 'img/blank.png')
    this.load.image('tilebg', 'img/greentile.png')
    
    this.load.audio('right','fx/right.mp3')
    this.load.audio('wrong','fx/wrong.mp3')
    this.load.audio('applause', 'fx/applause.mp3')
    this.load.audio('complete', 'fx/complete.mp3')
}

create() {

    this.paused = false
    this.isGameOver = false

    this.chosenWord = ''
    this.previouswords = []
    this.currentIndex = 0
    this.completion = 0

    this.hint = ''
    this.completiontext = ''

    this.canvas = this.sys.canvas

    this.tileHeight = this.textures.get('A').getSourceImage().height
    this.tileWidth = this.textures.get('A').getSourceImage().width
    this.spacer = this.tileWidth/2

    this.right = this.sound.add('right')
    this.wrong = this.sound.add('wrong')
    this.applause = this.sound.add('applause')
    this.complete = this.sound.add('complete')

    this.add.tileSprite(0,0, this.canvas.width*2, this.canvas.height*2, 'tilebg')

    this.completiontext = this.add.text(this.canvas.width/2, 3*this.tileHeight, 'Mots réussis : 0 / '+this.dictionary.length,{font: '50px Arial', align:'center', color: "#fff"}).setDepth(2).setOrigin(0.5)
    this.hintText = this.add.text(this.canvas.width/2, this.canvas.height/2 - this.tileHeight, this.hint, {font: '50px Arial', align:'center', color: "#fff"}).setDepth(2).setOrigin(0.5)

    window.addEventListener('resize', this.resizeApp);

    this.anims.create({
        key:'retry',
        frames: this.anims.generateFrameNumbers('buttons', {start:6, end:6}),
        frameRate:10,
    })

    this.anims.create({
        key:'next',
        frames: this.anims.generateFrameNumbers('buttons', {start:0, end:0}),
        frameRate:10,
    })

    this.anims.create({
        key:'quit',
        frames: this.anims.generateFrameNumbers('buttons', {start:1, end:1}),
        frameRate:10,
    })

    this.anims.create({
        key:'home',
        frames: this.anims.generateFrameNumbers('buttons', {start:3, end:3}),
        frameRate:10,
    })

    this.anims.create({
        key:'mute',
        frames: this.anims.generateFrameNumbers('buttons', {start:2, end:2}),
        frameRate:10,
    })

    this.tiles = this.physics.add.group()

    this.nextButton = this.physics.add.sprite(this.canvas.width/2, this.canvas.height - this.tileHeight, 'buttons')
    this.nextButton.setOrigin(0.5).setDepth(2).setScale(0.1).setInteractive().anims.play('play').on('pointerdown', (_event:any, _gameObjects:any) =>
    {
        this.nextWord(this.chosenWord)
    })
    this.nextButton.visible = false

    this.quitButton = this.physics.add.sprite(this.canvas.width/2 + 2*this.tileWidth, this.canvas.height - this.tileHeight, 'buttons')
    this.quitButton.setOrigin(0.5).setDepth(2).setScale(0.1).setInteractive().anims.play('quit').on('pointerdown', (_event:any, _gameObjects:any) =>
    {
        this.quitGame()
    })
    this.quitButton.visible = false

    this.homeButton = this.physics.add.sprite(2*this.tileWidth, 2*this.tileHeight, 'buttons')
    this.homeButton.setOrigin(0.5).setDepth(2).setScale(0.1).setInteractive().anims.play('home').on('pointerdown', (_event:any, _gameObjects:any) =>
    {
        this.quitGame()
    })
    this.homeButton.visible = true

    this.retryButton = this.physics.add.sprite(this.canvas.width/2 - 2*this.tileWidth, this.canvas.height - this.tileHeight, 'buttons')
    this.retryButton.setOrigin(0.5).setDepth(2).setScale(0.1).setInteractive().anims.play('retry').on('pointerdown', (_event:any, _gameObjects:any) =>
    {
        this.startGame()
    })
    this.retryButton.visible = false

    this.muteButton = this.physics.add.sprite(4*this.tileWidth, 2*this.tileHeight, 'buttons').setScale(0.1).setDepth(3).setInteractive()
    this.muteButton.anims.play('mute')

    this.muteButton.on('pointerdown', (_pointer:any) =>
    {
        this.toggleMute()
    });

    this.chooseword()

    //camera effect
    this.cameras.main.fadeIn()

}


//main loop
update(_time:number, _delta:number) {

    if (!this.game.sound.mute) {
        this.muteButton.tint = 16777215;
    } else {
        this.muteButton.tint = 16711680;
    }

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

startGame() {

    this.tiles.clear(true)
    this.chosenWord = ''
    this.previouswords = []
    this.completion = 0
    this.currentIndex = 0
    this.quitButton.visible = false
    this.nextButton.visible = false
    this.retryButton.visible = false

    this.completiontext.setText('Mots réussis : 0 / '+this.dictionary.length)
    this.hintText.setText('')

    this.chooseword()

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

//go back to main menu after game over
quitGame() {

    this.tiles.clear(true)
    this.chosenWord = ''
    this.previouswords = []
    this.completion = 0
    this.currentIndex = 0
    this.quitButton.visible = false
    this.nextButton.visible = false
    this.retryButton.visible = false

    this.completiontext.setText('Mots réussis : 0 / '+this.dictionary.length)
    this.hintText.setText('')
    this.scene.stop()
    this.sys.game.scene.start('ui-scene')
}

clickTile(_pinter:any, go:any) {

    if((go.texture.key == this.chosenletters[this.currentIndex]) 
    || (go.texture.key == 'blank' && this.chosenletters[this.currentIndex] == ' ') 
    || (go.texture.key == 'apo' && this.chosenletters[this.currentIndex] == "'")) {

        this.right.play()
        this.currentIndex +=1
        var gl = this.physics.add.sprite((this.canvas.width/2 - this.chosenWord.length*this.tileWidth/2 - (this.chosenWord.length-1)*this.spacer/2) + (this.currentIndex-1)*(this.tileWidth+this.spacer),this.canvas.height/2 + this.tileHeight,go.texture.key).setDepth(2)
        this.tiles.add(gl)
        go.setTexture('blank')
        go.disableInteractive()
        go.visible = false

        if(this.currentIndex == this.chosenletters.length) {
            this.complete.play()
            this.completion +=1
            this.completiontext.setText('mots réussis : ' + this.completion+ '/' + this.dictionary.length,)
            this.nextButton.visible = true
        }

    } else {

        this.wrong.play()
        this.cameras.main.shake(300,0.1)
    }

}

drawWord(word:string, startX:number, startY:number) {

    var letters = word.split('')

    letters.forEach((l,i) => {
        if(l !=' ' && l!="'") {
        var lo = this.physics.add.sprite(startX + i*this.spacer + i*this.tileWidth , startY, l).setDepth(2).setInteractive()
        lo.on('pointerdown', (_event:any, _gameObjects:any) =>
        {
            this.clickTile(this, lo)
        })
        this.tiles.add(lo)
        }
        if(l == ' ') {
            var lo = this.physics.add.sprite(startX + i*this.spacer + i*this.tileWidth , startY, 'blank').setDepth(2).setInteractive()
            lo.on('pointerdown', (_event:any, _gameObjects:any) =>
            {
                this.clickTile(this, lo)
            })
            this.tiles.add(lo)
        }
        if(l == "'") {
            var lo = this.physics.add.sprite(startX + i*this.spacer + i*this.tileWidth , startY, 'apo').setDepth(2).setInteractive()
            lo.on('pointerdown', (_event:any, _gameObjects:any) =>
            {
                this.clickTile(this, lo)
            })
            this.tiles.add(lo)
        }
    })
}

drawTiles(word:string, startX:number, startY:number) {

    var letters = word.split('')

    letters.forEach((l,i) => {
        if(l !=' ' && l!="'") {
        var li = this.physics.add.sprite(startX + i*this.spacer + i*this.tileWidth , startY, 'blank')
        this.tiles.add(li)
        }
        if(l == ' ') {
            var li = this.physics.add.sprite(startX + i*this.spacer + i*this.tileWidth , startY, 'blank').setDepth(2)
            this.tiles.add(li)
        }
        if(l == "'") {
            var li = this.physics.add.sprite(startX + i*this.spacer + i*this.tileWidth , startY, 'blank').setDepth(2)
            this.tiles.add(li)
        }
    })
}

completeString(input: string, length: number): string {
    const alphabet = 'ABCDEÉÈÊFGHIJKLMNOPQRSTUÙVWXYZ'; // Define the character pool
    let result = input;
  
    if (length <= input.length) {
      return input.substr(0, length); // If the input length is already greater or equal to the desired length, return the input string
    }
  
    const remainingLength = length - input.length;
    const randomCharacters = Array.from({ length: remainingLength }, () => alphabet.charAt(Math.floor(Math.random() * alphabet.length)));
  
    result += randomCharacters.join(''); // Combine input string and random characters
  
    // Convert string to an array of characters for shuffling
    const shuffledResult = result.split('');
  
    // Fisher-Yates shuffle algorithm to shuffle the characters
    for (let i = shuffledResult.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledResult[i], shuffledResult[j]] = [shuffledResult[j], shuffledResult[i]];
    }
  
    return shuffledResult.join(''); // Return the shuffled result string
  }
  

chooseword() {

    while(this.previouswords.includes(this.chosenWord) || this.chosenWord == '') {
        var chosen = this.dictionary[Phaser.Math.Between(0,this.dictionary.length-1)]
        this.hint = chosen.examples[Phaser.Math.Between(0, chosen.examples.length-1)]
        this.chosenWord = chosen.value
        this.chosenletters = this.chosenWord.split('')
    }

    var letterdraw = this.completeString(this.chosenWord, 8)

    var x  = this.canvas.width/2 - this.chosenWord.length*this.tileWidth/2 - (this.chosenWord.length-1)*this.spacer/2
    var y = this.canvas.height/2 + this.tileHeight

    var xdraw = this.canvas.width/2 - letterdraw.length*this.tileWidth/2 - (letterdraw.length-1)*this.spacer/2
    var ydraw = this.canvas.height/2 + 3*this.tileHeight

    this.drawWord(letterdraw,xdraw,ydraw)

    this.drawTiles(this.chosenWord,x,y)
    
    this.hintText.setText(this.hint)
}

nextWord(word:string) {

    this.previouswords.push(word)
    this.currentIndex = 0
    
    this.nextButton.visible = false

    if(this.completion < this.dictionary.length) {
        this.tiles.clear(true)
        this.chooseword()
    } else {
        this.tiles.clear(true)
        this.hintText.setText('')
        this.drawWord('BRAVO', this.canvas.width/2 - 2.5*this.tileWidth - 2*this.spacer, this.canvas.height/2)
        this.applause.play()
        this.retryButton.visible = true
        this.quitButton.visible = true
    }

}

}