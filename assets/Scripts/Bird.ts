import { _decorator, CCFloat, Component, Node, Vec3, Animation } from 'cc';
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

    onLoad() {
        this.resetBird();
        this.birdAnimation = this.getComponent(Animation);
    }

    start() {

    }

    update(deltaTime: number) {
        
    }

    resetBird() {
        this.node.setPosition(new Vec3(0, 0, 0));

    }
}


