import { _decorator, Component, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerCanon')
export class PlayerCanon extends Component {
    @property(Sprite)
    canonSprite:Sprite
    start() {

    }

    update(deltaTime: number) {
        
    }

    getCanonSprite(){
        return this.canonSprite;
    }
}


