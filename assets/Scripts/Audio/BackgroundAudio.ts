import { _decorator, AudioSource, Component, Node, Toggle } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BackgroundAudio')
export class BackgroundAudio extends Component {

    @property({
        type: AudioSource,
        visible: true,
    })
    // AudioSource that plays looping background music.
    private _audioSource: AudioSource;


    @property({
        type: Toggle,
        visible: true,
    })
    // UI toggle used to turn music on/off.
    private _toggle: Toggle;

    // Cached toggle state for background music.
    private _isBGMusic: boolean = true;

    start() {

    }

    update(deltaTime: number) {
       
    }
    
    /**
     * Starts background music.
     * @returns Background audio starts playing.
     */
    playBackgroundMusic() {
        this._audioSource.play();
    }

    /**
     * Stops background music.
     * @returns Background audio is stopped.
     */
    stopBackgroundMusic() {
        this._audioSource.stop();
    }

    /**
     * Runs when music toggle value changes.
     * @returns Music is played or stopped based on toggle state.
     */
    onToggleMusicCheck() {
        if(this._toggle){
            this._isBGMusic = this._toggle.isChecked;
            if(this._isBGMusic === true){
                this.playBackgroundMusic();
            } else {    
                this.stopBackgroundMusic();
            }
        }
    }


}


