import { _decorator, Canvas, Component, director, Node, UITransform, Vec3 } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('Ground')
export class Ground extends Component {

    @property({
        type: Node,
        tooltip:'Ground 1'
    })
    // First ground segment node.
    public ground1: Node;

    @property({
        type: Node,
        tooltip:'Ground 2'
    })
    // Second ground segment node.
    public ground2: Node;

    @property({
        type: Node,
        tooltip:'Ground 3'
    })
    // Third ground segment node.
    public ground3: Node;

    // Cached width of first ground segment.
    public groundWidth1: number;
    // Cached width of second ground segment.
    public groundWidth2: number;
    // Cached width of third ground segment.
    public groundWidth3: number;

    // Runtime position holder for ground1.
    public tempStartLocation1: Vec3 = new Vec3;
    // Runtime position holder for ground2.
    public tempStartLocation2: Vec3 = new Vec3;
    // Runtime position holder for ground3.
    public tempStartLocation3: Vec3 = new Vec3;

    // Shared GameManager reference.
    public gameManager: GameManager;
    // Current scrolling speed read from GameManager.
    public gameSpeed: number = 0;

    onLoad() {
        this.gameManager = GameManager.instance;
        if (this.gameManager == null){
            console.log("GameManager is NULL.");
        }

        this.startUp();

    }

    start() {

    }

    update(deltaTime: number) {
        this.moveGround(deltaTime);
        
    }

    /**
     * Sets start position for 3 ground pieces.
     * @returns Ground pieces are placed next to each other.
     */
    startUp() {
        this.groundWidth1 = this.ground1.getComponent(UITransform).width;
        this.groundWidth2 = this.ground2.getComponent(UITransform).width;
        this.groundWidth3 = this.ground3.getComponent(UITransform).width;

        this.tempStartLocation1.x = 0;
        this.tempStartLocation2.x = this.groundWidth1;
        this.tempStartLocation3.x = this.groundWidth1 + this.groundWidth2;

        this.ground1.setPosition(this.tempStartLocation1);
        this.ground2.setPosition(this.tempStartLocation2);
        this.ground3.setPosition(this.tempStartLocation3);
    }

    /**
     * Gets the Canvas component from current scene.
     * @returns Canvas used for screen width/height reference.
     */
    getCanvas() {
        const scene = director.getScene();
        const canvas = scene.getComponentInChildren(Canvas);
        return canvas;
    }

    /**
     * Scrolls ground to the left in a loop.
     * @param deltaTime Time passed since last frame.
     * @returns Off-screen ground is moved to the right side again.
     */
    moveGround(deltaTime: number){
        if (this.gameManager) {
            this.gameSpeed = this.gameManager.speed;
        }

        this.tempStartLocation1 = this.ground1.position;
        this.tempStartLocation2 = this.ground2.position;
        this.tempStartLocation3 = this.ground3.position;

        this.tempStartLocation1.x -= this.gameSpeed * deltaTime;
        this.tempStartLocation2.x -= this.gameSpeed * deltaTime;
        this.tempStartLocation3.x -= this.gameSpeed * deltaTime;

        const canvas = this.getCanvas();


        if(this.ground1.position.x <= (0 - this.groundWidth1)) {
            this.tempStartLocation1.x = canvas.getComponent(UITransform).width - 1; //-1 is to fix render gap
        }

        if(this.ground2.position.x <= (0 - this.groundWidth2)) {
            this.tempStartLocation2.x = canvas.getComponent(UITransform).width - 1;
        }

        if(this.ground3.position.x <= (0 - this.groundWidth3)) {
            this.tempStartLocation3.x = canvas.getComponent(UITransform).width - 1;
        }

        this.ground1.setPosition(this.tempStartLocation1);
        this.ground2.setPosition(this.tempStartLocation2);
        this.ground3.setPosition(this.tempStartLocation3);
    }
}
