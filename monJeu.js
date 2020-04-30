var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
	scene: {
		init: init,
		preload: preload,
		create: create,
		update: update
	}
};

var game = new Phaser.Game(config);

function init(){
	var bords;
	var player;
	var grotte;
	var wagon;
	var id_menu;
	var menu;
	var monstre;
	var monstre2;
	var pioche;
	var cursor;
	var keyI;
	var keyE;
	var keyB;
	var keyA;
	var biere = 0;
	var biereDescription
	var piece = 0;
	var pieceDescription
	var viePlayer = 5;
	var vieMonstre = 5;
	var vieMonstre2 = 5;
}

function preload(){
	this.load.image('background','assets/sol.png');	
	this.load.image('bordsBas','assets/murBas.png');
	this.load.image('bordsHaut','assets/murHaut.png');
	this.load.image('bordsCote','assets/murCote.png');
	this.load.image('grotte','assets/grotte.png');
	this.load.image('wagon','assets/wagon.png');
	this.load.spritesheet('perso','assets/dude.png',{frameWidth: 59.63, frameHeight: 72});
	this.load.spritesheet('monstre','assets/monstre.png',{frameWidth: 31.5, frameHeight: 30});
	this.load.spritesheet('monstre2','assets/monstre2.png',{frameWidth: 73.5, frameHeight: 35});
	this.load.image('menu','assets/menu.png');
	this.load.image('biere', 'assets/biere.png');
	this.load.image('piece','assets/piece.png');
	this.load.image('pioche','assets/pioche.png');
}

function create(){

	this.add.image(0,0,'background').setOrigin(0, 0);
	
	bords = this.physics.add.staticGroup();
	bords.create(400,550,'bordsBas').setScale(1).refreshBody();
	bords.create(400,45,'bordsHaut');
	bords.create(50,300,'bordsCote');

	grotte = this.physics.add.sprite(200,200,'grotte');
	this.physics.add.collider(player,grotte);
	this.physics.add.collider(grotte,bords);


	wagon = this.physics.add.sprite(400,200,'wagon'); 
	this.physics.add.collider(player,wagon);
	this.physics.add.collider(wagon,bords);
 


	
	player = this.physics.add.sprite(100,450,'perso');
	player.setCollideWorldBounds(true);
	player.setBounce(0);
	this.physics.add.collider(player,bords);
	this.physics.add.collider(player,wagon);
	this.physics.add.collider(player,grotte);

	this.physics.add.collider(monstre, player, hitmonster, null, this);


	keyI = this.input.keyboard.addKey('I');  //ouvrir l'inventaire
	keyE = this.input.keyboard.addKey('E');  //fermer l'inventaire
	keyA = this.input.keyboard.addKey('A');  //attaquer avec la pioche
	keyB = this.input.keyboard.addKey('B');  //Utiliser une bière (redonne 2 PV)
	
	monstre = this.physics.add.sprite(600,500,'monstre');
	monstre = this.physics.add.sprite(210,50,'monstre2');


	this.anims.create({
		key:'left',
		frames: this.anims.generateFrameNumbers('perso', {start: 0, end: 3}),
		frameRate: 10,
		repeat: -1
	});
	
	this.anims.create({
		key:'stop',
		frames: this.anims.generateFrameNumbers('perso', {start: 2, end: 2}),
		frameRate: 10,
		repeat: -1
	});

	this.anims.create({
		key:'right',
		frames: this.anims.generateFrameNumbers('perso', {start: 0, end: 3}),
		frameRate: 10,
		repeat: -1
	});
}

function update(){

	player.body.velocity.x = 0;
	
		if(cursor.left.isDown){
		player.anims.play('right',true);
		player.setVelocityX(-350);
		player.setFlipX(true);
	}
	
	else if(cursor.right.isDown) {
		player.anims.play('right',true);
		player.setVelocityX(350);
		player.setFlipX(true);	
	}
	
	else {
	
		player.anims.play('stop',true);
		player.setVelocityX(0);
		player.setVelocityY(0);
	}

	if(cursor.up.isDown){
		player.setVelocityY(-200);
	}
	
	if(cursor.down.isDown){
		player.setVelocityY(200);
	}

	else
	    {
	        if(cursor.left.isDown){          
	            player.setVelocityX(-350);                  
	            player.setFlipX(true);                       
	        }
	        else if(cursor.right.isDown) {
	            player.setVelocityX(350);
	            player.setFlipX(false);
	        }
	        else {
	            player.setVelocityX(0);
	        } 
	    }

	     monstre.anims.play('left',true);

	      if(aFaitPremierMouvement == false)
	    {
	    monstre.setVelocityX(-200);                   
	    monstre.setFlipX(true);        
	    }

	    if(monstre.x <= 10){
	    monstre.setVelocityX(200);
	    monstre.setFlipX(false);       
	    aFaitPremierMouvement = true;
	    }

	    if(monster.x >= 680){	
	    monstre.setVelocityX(-200);    
	    monstre.setFlipX(true);
	    }


	    this.physics.add.overlap(player,piece,collectpiece, null, this);
		
		function collectpiece (player, piece){
		 piece.disableBody(true, true);
		 piece += 1;



		if(keyA.isDown){
		pioche = this.physics.add.staticGroup({
    key: 'pioche',
    repeat: 0,
    setXY: {
      x: player.x,
      y: player.y,
    }
}
}

	    if (Phaser.Input.Keyboard.JustDown(keyI)){
		

	id_menu = this.physics.add.image(player.x, player.y, "menu");
	vieText = this.add.text(player.x, player.y, 'Vie = ' + viePlayer, {fontSize: '20px', fill:'#FFF'});
	biereDescription = this.add.text(player.x-300, player.y, 'biere = ' + biere, {fontSize: '20px', fill:'#FFF'});
	pieceDescription = this.add.text(player.x+200, player.y, 'piece = ' + piece, {fontSize: '20px', fill:'#FFF'});
}

	 if (Phaser.Input.Keyboard.JustDown(keyE)){
		

	id_menu.visible = false;
	vieDescription.destroy();
	biereTexte.destroy();
	pieceTexte.destroy();
	
	};

	if(keyB.isDown){
		biere -= 1;
		viePlayer += 2;
	}  


	    }  	
	    
