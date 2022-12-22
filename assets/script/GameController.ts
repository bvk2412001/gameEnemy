import { _decorator, Component, Node, Touch, Vec3, tween, Quat, Prefab, instantiate, Label, director } from 'cc';
import { BulletController } from './BulletController';
import { EnemyController } from './EnemyController';
import { GameConfig } from './GameConfig';
import { PlayerCanon } from './PlayerCanon';
import { ShipType } from './item/ShipType';
import { RestartController } from './RestartController';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property(Node)
    gamePlay: Node;

    @property(Node)
    playerCanon: Node;

    @property(Prefab)
    bulletPre: Prefab

    @property(Prefab)
    enemyPre: Prefab;

    @property(Vec3)
    listPosisionShip: Vec3[] = [];

    @property(ShipType)
    shipList: ShipType[] = [];

    @property(Label)
    scoreLabel: Label;

    score: number = 0;
    shipOfTurn = 5;

    positionOld: number = 0;
    //time turn s
    @property(Number)
    timeTurnList: number[] = [];

    @property(Prefab)
    restartUi:Prefab
    start() {
        this.gamePlay.on(Node.EventType.TOUCH_START, this.onTouchCanon, this);
        //create ship
        for (let i = 0; i < this.timeTurnList.length; i++)
            setTimeout(() => {
                this.createShipOnTurn(i);
            }, this.timeTurnList[i] * 1000);

    }

    onTouchCanon(event: Touch) {
        let touchLocation = event.getUILocation();
        let loc = new Vec3(touchLocation.x - GameConfig.HAFT_SCREEN_W, touchLocation.y - GameConfig.HAFT_SCREEN_H);
        let dist = this.getDistance(this.playerCanon.position, loc)
        dist.normalize();
        const zAngel = Math.atan2(dist.x, dist.y) * 180 / Math.PI;
        let cannonSprite = this.playerCanon.getComponent(PlayerCanon).getCanonSprite();
        const fire = () => {
            let bullet = instantiate(this.bulletPre);
            bullet.setPosition(this.playerCanon.position);
            bullet.getComponent(BulletController).setUp(dist, 5, 1)
            this.gamePlay.addChild(bullet);
        }

        tween(cannonSprite.node).sequence(
            tween(cannonSprite.node).to(0.2, { eulerAngles: new Vec3(0, 0, -zAngel) }),
            tween(cannonSprite.node).call(fire)
        ).start();
    }

    update(deltaTime: number) {

    }


    createShipOnTurn(i: number) {
        for (let j = 0; j < 10; j++) {
            setTimeout(() => {
                this.createShip(i);
            }, 1000 * j);
        }
    }

    private shipDie() {
        this.score += 10;
        //update score
        this.scoreLabel.string = 'Score:' + this.score;
    }

    createShip(typeShip: number) {
        let ship = instantiate(this.enemyPre);
        let rnd;
        do {
            rnd = Math.floor(Math.random() * this.listPosisionShip.length);
            if (this.positionOld != rnd) {
                this.positionOld = rnd;
            }
        } while (this.positionOld != rnd);
        ship.getComponent(EnemyController).setUp(this.shipList[typeShip], this.listPosisionShip[rnd], () => {
            this.shipDie();
        }, ()=>{
            this.reStartUI();
        });
        this.gamePlay.addChild(ship);
    }

    private getDistance(origin: Vec3, target: Vec3) {
        return target.subtract(origin)
    }


    reStartUI(){
        console.log("khoa");
        let reStart = instantiate(this.restartUi);
        this.playerCanon.active = false;
        reStart.getComponent(RestartController).setUp(this.score, ()=> {
            director.loadScene(GameConfig.MENU_SCENE)
        });
        this.gamePlay.addChild(reStart);
    }
}


