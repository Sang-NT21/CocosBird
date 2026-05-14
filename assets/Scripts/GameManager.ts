import { _decorator, CCInteger, Component, director, Event, EventKeyboard, Input, input,
     KeyCode, Node, Button, Contact2DType, Collider2D, IPhysics2DContact, 
     RigidBody2D,
     Vec2} from 'cc';
import { Ground } from './Ground';
import { UIManager } from './UI/UIManager';
import { Bird } from './Bird';
import { PipePool } from './PipePool';
import { AudioManager } from './Audio/AudioManager';
import { BackgroundAudio } from './Audio/BackgroundAudio';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    // Singleton instance so other scripts can access GameManager.
    public static instance: GameManager = null;

    @property({
        type: Ground,
        tooltip: 'this is ground'
    })
    // Ground script reference for scrolling floor control.
    public ground: Ground;

    @property({
        type: UIManager,
        tooltip: 'Script to manage UI',
        visible: true,
    })
    // UI controller for score, hint, and result screens.
    private _uiManager: UIManager;

    @property({
        type: Bird,
    })
    // Bird script reference for movement and collision state.
    public bird: Bird;
    

    @property({
        type: CCInteger,
    })
    // Global horizontal game speed (used by ground).
    public speed: number = 300;

    @property({
        type: CCInteger,
    })
    // Pipe movement speed.
    public pipSpeed: number = 200;

    @property({
        type: PipePool,
    })
    // PipePool script for spawning/reusing pipe prefabs.
    public pipePool: PipePool;

    @property({
        type: AudioManager,
        visible: true,
    })
    // Sound effect manager (flap, point, hit, die).
    private _audioManager: AudioManager;

    @property({
        type: BackgroundAudio,
        visible: true,
    })
    // Background music controller (toggle play/stop).
    private _backgroundAudio: BackgroundAudio;

    // True when game is not running (start state or game over).
    public isOver: boolean = false;
    

    onLoad() {
        // Singleton
        if (GameManager.instance == null) {
            GameManager.instance = this;
        } else {
            // Destroy if duplicated
            this.destroy();
            return;
        }
        this.initListener();
        this._uiManager.hideResults();
        this._uiManager.resetScore();
        this.isOver = true;
        director.pause();

    }

    start() {
        
        

    }

  
    update(deltaTime: number) {
        if (this.isOver === false) {

            this.birdStruck();
        }
        
    }

    /**
     * Listens for screen touch.
     * @returns Starts game on first touch, or makes bird flap while playing.
     */
    initListener() {

        // Make sure thie size of this node is cover fullscreen to capture touch
        this.node.on(Node.EventType.TOUCH_START, () => {

            if (this.isOver === true) {
                this.resetGame();
                this.startGame();
            } else {
                this.bird.flyMovement();
                this._audioManager.onAudioQueue(0);
            }
            
        }, this);
    }

    /**
     * Starts one game round.
     * @returns Hides hint/result UI, resets bird state, and resumes game time.
     */
    startGame() {
        this._uiManager.hideHint();
        this._uiManager.hideResults();

        if (this.bird) {
            this.bird.hitSomething = false;
        }

        this.bird.resetBird();

        director.resume();
    }

    /**
     * Resets data for a new round.
     * @returns Score is set to 0 and pipes are recreated.
     */
    resetGame() {
        this._uiManager.resetScore();
        this.pipePool.resetPool();
        this.isOver = false;
        
    }  

    /**
     * Ends the current round.
     * @returns Shows result UI and pauses the game.
     */
    gameOver() {
        this.isOver = true;
        this._uiManager.showResults();
        director.pause();
    }

    /**
     * Runs when player presses restart button.
     * @param event Button click event.
     * @param customEventData Extra string from Button settings.
     * @returns Resets and starts a new round.
     */
    onButtonPressed(event: Event, customEventData: string) {
        this.resetGame();
        this.startGame();
    }





    /**
     * Called when bird passes a pipe.
     * @returns Adds 1 score and plays point sound.
     */
    passPipe() {
        this._uiManager.addScore();
        this._audioManager.onAudioQueue(1);
    }

    /**
     * Creates the next pipe set.
     * @returns Adds one pipe prefab from pool into scene.
     */
    createPipe() {
        this.pipePool.addPool();
    }

    /**
     * Connects bird collider to collision callback.
     * @returns Collision event can now call `onBeginContact`.
     */
    onContact(){
        let collider = this.bird.getComponent(Collider2D);

        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    /**
     * Called when bird touches another collider.
     * @param self Bird collider.
     * @param other Collider that hit the bird.
     * @param contact Physics contact info, can be null.
     * @returns Sets hit flag and plays hit sound.
     */
    onBeginContact(self: Collider2D, other: Collider2D, contact: IPhysics2DContact | null) {
        
        this.bird.hitSomething = true;
        this._audioManager.onAudioQueue(2);
        
        
    }

    /**
     * Checks if bird is hit.
     * @returns Plays die sound and triggers game over when hit.
     */
    birdStruck() {
        this.onContact();
        
        if (this.bird.hitSomething === true) {
            this._audioManager.onAudioQueue(3);
            this.gameOver();
        }
    }
}
