import { _decorator, CCFloat, Component, Node, Vec3, Animation, tween, easing, view, math, UITransform, error, clamp } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {

    @property({
        type: CCFloat,
        tooltip: 'How high can player bird flies'
    })
    public jumpHeight: number = 3.5;

    @property({
        type: CCFloat,
        tooltip: 'How long can player bird flies'
    })
    public jumpDuration: number =  3.5;

    public birdAnimation: Animation;
    public birdLocation: Vec3;

    public hitSomething: boolean = false;

    private _maxHeight: number;
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

    resetBird() {
        this.birdLocation = new Vec3(0, 0, 0);
        this.node.setPosition(this.birdLocation);

    }

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

    clampPosition() {
        this.node.setPosition(
            this.node.position.x, 
            math.clamp(this.node.position.y, (0 - this._maxHeight), this._maxHeight - (this._birdHeight * 2)), 
            this.node.position.z
        );
    }

}


