import { _decorator, AudioSource, Component, Node, Toggle } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BackgroundAudio')
export class BackgroundAudio extends Component {

    @property({
        type: AudioSource,
        visible: true,
    })
    private _audioSource: AudioSource;


    @property({
        type: Toggle,
        visible: true,
    })
    private _toggle: Toggle;

    private _isBGMusic: boolean = true;

    start() {

    }

    update(deltaTime: number) {
        if(this._toggle){
            this._isBGMusic = this._toggle.isChecked;
        }
    }
    
    playBackgroundMusic() {
        this._audioSource.play();
    }

    stopBackgroundMusic() {
        this._audioSource.stop();
    }

    onToggleMusicCheck() {
        if(this._toggle){
            if(this._isBGMusic === true){
                this.playBackgroundMusic();
            } else {    
                this.stopBackgroundMusic();
            }
        }
    }


}


