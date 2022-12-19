import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameConfig')
export class GameConfig extends Component {
    public static GAME_SCENE = "game"
    public static HAFT_SCREEN_W = 360
    public static HAFT_SCREEN_H = 640
    public static BULLET_NAME = "bullet"
}


