class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;

        this.rightArmX = this.bodyX + 150;
        this.rightArmY = this.bodyY + 50;

        this.leftArmX = this.bodyX - 150;
        this.leftArmY = this.bodyY + 50;

        this.rightLegX = this.bodyX + 20;
        this.rightLegY = this.bodyY + (182/2);
        this.leftLegX = this.bodyX - 20;
        this.leftLegY = this.bodyY + (182/2);

        this.rightEyeX = this.bodyX + 40;
        this.rightEyeY = this.bodyY - 20;
        this.leftEyeX = this.bodyX - 40;
        this.leftEyeY = this.bodyY - 20;

        this.bellyButtonX = this.bodyX;
        this.bellyButtonY = this.bodyY + 100;
        this.mouthX = this.bodyX;
        this.mouthY = this.bodyY + 25;

        this.rightHornX = this.bodyX + 90;
        this.rightHornY = this.bodyY - 100;

        this.leftHornX = this.bodyX - 90;
        this.leftHornY = this.bodyY - 100;

        this.rightEarX = this.bodyX + 100;
        this.rightEarY = this.bodyY - 60;

        this.leftEarX = this.bodyX - 100;
        this.leftEarY = this.bodyY - 60;

    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        // This preloads everything so you don't have to load the individual assests you're using like we did with Cubey
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_redD.png");
        my.sprite.body.setScale(1.5);

        my.sprite.rightArm = this.add.sprite(this.rightArmX, this.rightArmY, "monsterParts", "arm_redE.png");
        my.sprite.leftArm = this.add.sprite(this.leftArmX, this.leftArmY, "monsterParts", "arm_redE.png");
        my.sprite.leftArm.flipX = true; 

        my.sprite.rightLeg = this.add.sprite(this.rightLegX, this.rightLegY, "monsterParts", "leg_redA.png");
        my.sprite.leftLeg = this.add.sprite(this.leftLegX, this.leftLegY, "monsterParts", "leg_redA.png");
        my.sprite.leftLeg.flipX = true;
        my.sprite.rightLeg.setDepth(-1);
        my.sprite.leftLeg.setDepth(-1);

        my.sprite.rightEye = this.add.sprite(this.rightEyeX, this.rightEyeY, "monsterParts", "eye_cute_light.png");
        my.sprite.leftEye = this.add.sprite(this.leftEyeX, this.leftEyeY, "monsterParts", "eye_cute_light.png");
        my.sprite.leftEye.flipX = true;


        my.sprite.bellyButton = this.add.sprite(this.bellyButtonX, this.bellyButtonY, "monsterParts", "eye_dead.png");
        my.sprite.bellyButton.setScale(0.6);
        //setScale to set scale of image - this makes the x eye 60% its og size 
        my.sprite.mouth = this.add.sprite(this.mouthX, this.mouthY, "monsterParts", "mouthB.png");
        my.sprite.frown = this.add.sprite(this.mouthX, this.mouthY, "monsterParts", "mouthJ.png");
        my.sprite.frown.visible = false;

        my.sprite.rightHorn = this.add.sprite(this.rightHornX, this.rightHornY, "monsterParts", "detail_dark_horn_large.png");
        my.sprite.leftHorn = this.add.sprite(this.leftHornX, this.leftHornY, "monsterParts", "detail_dark_horn_large.png");
        my.sprite.leftHorn.flipX = true;
        my.sprite.leftHorn.setScale(1.5);
        my.sprite.rightHorn.setScale(1.5);
        
        my.sprite.rightEar = this.add.sprite(this.rightEarX, this.leftEarY, "monsterParts", "detail_red_ear_round.png");
        my.sprite.leftEar = this.add.sprite(this.leftEarX, this.leftEarY, "monsterParts", "detail_red_ear_round.png");
        my.sprite.leftEar.flipX = true;
        my.sprite.rightEar.setDepth(-1);
        my.sprite.leftEar.setDepth(-1);

        
        this.input.keyboard.on('keydown-S', () => { 
            my.sprite.mouth.visible = true;
            my.sprite.frown.visible = false;
        });
        //this.input.keyboard.on(..)
        //sets up an event listern for the keyboard - lsitens for specific event in () and runs function when that happens
        //'keydown-S'
        //this is the event name - run this function when the s key is pressed down
        // () => { } arrow function - code that will run when the event happen
        // arrow function in JS are a shorter cleaner way to write functions (shorthand way to define functions)
        // they're shorter, easier to read, don't mess with the this keyword - regular functions change the value of this but arrow functions keep this the same as where it was defined
        // regular functionschange the value of this based on how the function is called (change the context)
        // no parameters () => console.log("hi")
        // one parameter x => x * 2
        // multiple (x, y) => x + y

        this.input.keyboard.on('keydown-F', () => {
            my.sprite.frown.visible = true;
            my.sprite.mouth.visible = false;
        });
        //similar to update versus create - keydown is better for signular (like smile changing) while isDown is better for continuous
        // keydown - when key is pressed (holding counts as one press so won't be continuous, isDown - every frame key is held 

        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update() {
        let my = this.my;    // create an alias to this.my for readability
        //alternate way - defining a Phaser Container 
        //wrap all your sprite parts in a Phaser.GameObjects.Container and move that container
        //in create() - this.monsterContainer = this.add.container(x,y);
        //in create() - add parts after creating them - 
        // my.sprite.body = this.add.sprite(...);
        // this.monsterContainer.add(my.sprite.body);
        // repeat with all other parts like RightArm etc
        // in update() move the container
        // replace for loop with if logic and just this.monsterContainer.x -= 2;
        // best practice is this option since its cleaner and lets you treat monster like a single object
        // treating like single object makes it easier to implement other behaviors too
        //method belong can get messy and error-prone as monster gets more complex
        for (let part in my.sprite) {
            if (this.aKey.isDown) {
                my.sprite[part].x -= 2;
            }
            if (this.dKey.isDown) {
                my.sprite[part].x += 2;
            }
        }
        //have to use my.sprite[part] and not my.sprite.part because . (dot notation) is only for hard-coded property names (the exact name)
        //here part is a variable represented diff parts of sprite (leftArm, rightArm etc) and that variable name can't be used in dot notation
        //[]brackets let you access a property dynamically, with variables eg part, which is why its used here instead
        //movement goes in the update loop because we want it to continuously happen
        //update is checked continuously (rerun every frame which is like 60 times a second), create is checked once? 
    }
       
}