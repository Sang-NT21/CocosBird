import { _decorator, AudioClip, AudioSource, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BirdAudio')
export class BirdAudio extends Component {

    @property({
        type: [AudioClip],
    })
    public clips: AudioClip[] = [];

    @property({
        type: AudioSource,
    })
    public audioSource: AudioSource = null!;


    start() {

    }

    update(deltaTime: number) {
        
    }

    onAudioQueue(index: number) {
        let audioClip: AudioClip = this.clips[index];
        
        this.audioSource.playOneShot(audioClip);
    }

}


