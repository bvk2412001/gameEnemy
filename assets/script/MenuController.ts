import { _decorator, Component, Node, director } from 'cc';
import { GameConfig } from './GameConfig';

const { ccclass, property } = _decorator;

@ccclass('MenuController')
export class MenuController extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    onClickGamePlay(){
        director.loadScene(GameConfig.GAME_SCENE);
    }
}


