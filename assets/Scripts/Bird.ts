import { _decorator, CCFloat, Component, Node, Vec3, Animation, tween, easing, view, math, UITransform, error, clamp } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {

    @property({
        type: CCFloat,
        tooltip: 'How high can player bird flies'
    })
    // How much the bird moves up in one flap.
    public jumpHeight: number = 3.5;

    @property({
        type: CCFloat,
        tooltip: 'How long can player bird flies'
    })
    // How long one upward tween movement takes.
    public jumpDuration: number =  3.5;

    // Reference to bird wing animation component.
    public birdAnimation: Animation;
    // Stores spawn/reset position for bird.
    public birdLocation: Vec3;

    // True when bird collides with obstacle/ground.
    public hitSomething: boolean = false;

    // Highest Y position bird is allowed to reach on screen.
    private _maxHeight: number;
    // Bird visual height used for movement limit calculations.
    public _birdHeight: number;



    onLoad() {
        this.resetBird();
        this.birdAnimation = this.getComponent(Animation);

        this._maxHeight = view.getVisibleSize().height / 2;

        this._birdHeight = this.getComponent(UITransform).height * this.node.scale.y;
        if (this._birdHeight == null) {
            throw new Error("Bird script: birdHeight is NULL.");
        }
    }

    start() {

    }

    update(deltaTime: number) {
        
    }

    /**
     * Moves bird back to start position.
     * @returns Bird position becomes `(0, 0, 0)`.
     */
    resetBird() {
        this.birdLocation = new Vec3(0, 0, 0);
        this.node.setPosition(this.birdLocation);

    }

    /**
     * Makes bird flap upward.
     * @returns Starts upward tween and bird animation if max height is not reached.
     */
    flyMovement() {
        this.birdAnimation.stop();
        if (this.node.position.y <= this._maxHeight - this._birdHeight) {
        tween(this.node.position)
            .to(this.jumpDuration, new Vec3(this.node.position.x, this.node.position.y + this.jumpHeight, 0),
                { easing: "smooth", onUpdate: (target: Vec3, ratio: number) => {
                    this.node.position = target;
                }
                })
            .start();
        this.birdAnimation.play();
        }

    }

    /**
     * Keeps bird inside vertical screen limits.
     * @returns Bird Y position is clamped between min and max range.
     */
    clampPosition() {
        this.node.setPosition(
            this.node.position.x, 
            math.clamp(this.node.position.y, (0 - this._maxHeight), this._maxHeight - (this._birdHeight * 2)), 
            this.node.position.z
        );
    }

}
