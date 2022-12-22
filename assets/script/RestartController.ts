import { _decorator, Button, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RestartController')
export class RestartController extends Component {
    @property(Label)
    score:Label

    callback;
    start() {

    }

    setUp(score:number, callback) {
        this.score.string = "" + score;
        this.callback = callback;
    }

    onRestart(){
        this.callback();
    }
}


