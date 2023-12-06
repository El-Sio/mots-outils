import Phaser from 'phaser'

import UIScene from './UIscene'
import WordScene from './WordScene'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	audio: {
		disableWebAudio: false,
	},
	parent: 'app',
	width:1600,
	height:900,
	scale: {
		mode:Phaser.Scale.FIT,
		autoCenter:Phaser.Scale.CENTER_BOTH
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
		},
	},
	scene: [UIScene,WordScene]
}

export default new Phaser.Game(config)
 