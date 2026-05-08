import { _decorator, Canvas, Component, director, Node, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Ground')
export class Ground extends Component {

    @property({
        type: Node,
        tooltip:'Ground 1'
    })
    public ground1: Node;

    @property({
        type: Node,
        tooltip:'Ground 2'
    })
    public ground2: Node;

    @property({
        type: Node,
        tooltip:'Ground 3'
    })
    public ground3: Node;

    public groundWidth1: number;
    public groundWidth2: number;
    public groundWidth3: number;

    public tempStartLocation1: Vec3 = new Vec3;
    public tempStartLocation2: Vec3 = new Vec3;
    public tempStartLocation3: Vec3 = new Vec3;

    public gameSpeed: number = 50;

    onLoad() {
        this.startUp();

    }

    start() {

    }

    update(deltaTime: number) {
        this.moveGround(deltaTime);
        
    }

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

    getCanvas() {
        const scene = director.getScene();
        const canvas = scene.getComponentInChildren(Canvas);
        return canvas;
    }

    moveGround(deltaTime: number){
        this.tempStartLocation1 = this.ground1.position;
        this.tempStartLocation2 = this.ground2.position;
        this.tempStartLocation3 = this.ground3.position;

        this.tempStartLocation1.x -= this.gameSpeed * deltaTime;
        this.tempStartLocation2.x -= this.gameSpeed * deltaTime;
        this.tempStartLocation3.x -= this.gameSpeed * deltaTime;

        const canvas = this.getCanvas();


        if(this.ground1.position.x <= (0 - this.groundWidth1)) {
            this.tempStartLocation1.x = canvas.getComponent(UITransform).width;
        }

        if(this.ground2.position.x <= (0 - this.groundWidth1)) {
            this.tempStartLocation2.x = canvas.getComponent(UITransform).width;
        }

        if(this.ground3.position.x <= (0 - this.groundWidth1)) {
            this.tempStartLocation3.x = canvas.getComponent(UITransform).width;
        }

        this.ground1.setPosition(this.tempStartLocation1);
        this.ground2.setPosition(this.tempStartLocation2);
        this.ground3.setPosition(this.tempStartLocation3);
    }
}


