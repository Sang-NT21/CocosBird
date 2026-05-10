import { _decorator, Component, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Results')
export class Results extends Component {

    @property({
        type: Label,
    })
    public scoreLabel: Label;

    @property({
        type: Label,
    })
    public highScoreLabel: Label;

    @property({
        type: Label,
    })
    public endResultsLabel: Label;

    maxScore: number = 0;
    currentScore: number = 0;



    start() {
        this.hideResults();

    }

    update(deltaTime: number) {
        
    }

    updateScore(score: number) {
        this.currentScore = score;
        this.scoreLabel.string = this.currentScore.toString();
    }

    resetScore() {
        this.updateScore(0);
        this.hideResults();
    }

    addScore() {
        this.updateScore(this.currentScore + 1);
    }

    showResults() {
        this.maxScore = Math.max(this.currentScore, this.maxScore);
        this.highScoreLabel.string = "High Score: " + this.maxScore.toString();
        this.highScoreLabel.enabled = true;
        this.endResultsLabel.enabled = true;
    }

    hideResults() {
        this.highScoreLabel.enabled = false;
        this.endResultsLabel.enabled = false;
    }
}


