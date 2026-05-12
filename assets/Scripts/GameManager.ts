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

    public static instance: GameManager = null;

    @property({
        type: Ground,
        tooltip: 'this is ground'
    })
    public ground: Ground;

    @property({
        type: UIManager,
        tooltip: 'Script to manage UI',
        visible: true,
    })
    private _uiManager: UIManager;

    @property({
        type: Bird,
    })
    public bird: Bird;
    

    @property({
        type: CCInteger,
    })
    public speed: number = 300;

    @property({
        type: CCInteger,
    })
    public pipSpeed: number = 200;

    @property({
        type: PipePool,
    })
    public pipePool: PipePool;

    @property({
        type: AudioManager,
        visible: true,
    })
    private _audioManager: AudioManager;

    @property({
        type: BackgroundAudio,
        visible: true,
    })
    private _backgroundAudio: BackgroundAudio;

    public isOver: boolean = false;
    //private _isBGMusicToggle: boolean = true;

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

    startGame() {
        this._uiManager.hideHint();
        this._uiManager.hideResults();

        if (this.bird) {
            this.bird.hitSomething = false;
        }

        this.bird.resetBird();

        director.resume();
    }

    resetGame() {
        this._uiManager.resetScore();
        this.pipePool.resetPool();
        this.isOver = false;
        
    }  

    gameOver() {
        this.isOver = true;
        this._uiManager.showResults();
        director.pause();
    }

    onButtonPressed(event: Event, customEventData: string) {
        this.resetGame();
        this.startGame();
    }





    passPipe() {
        this._uiManager.addScore();
        this._audioManager.onAudioQueue(1);
    }

    createPipe() {
        this.pipePool.addPool();
    }

    onContact(){
        let collider = this.bird.getComponent(Collider2D);

        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact(self: Collider2D, other: Collider2D, contact: IPhysics2DContact | null) {
        
        this.bird.hitSomething = true;
        this._audioManager.onAudioQueue(2);
        
        
    }

    birdStruck() {
        this.onContact();
        
        if (this.bird.hitSomething === true) {
            this._audioManager.onAudioQueue(3);
            this.gameOver();
        }
    }
}


