import { _decorator, Component, Node, Touch, Vec3, tween, Quat, Prefab, instantiate } from 'cc';
import { BulletController } from './BulletController';
import { EnemyController } from './EnemyController';
import { GameConfig } from './GameConfig';
import { PlayerCanon } from './PlayerCanon';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property(Node)
    gamePlay:Node;

    @property(Node)
    playerCanon: Node;

    @property(Prefab)
    bulletPre:Prefab

    @property(Prefab)
    enemyPre:Prefab;
    start() {
        this.gamePlay.on(Node.EventType.TOUCH_START,this.onTouchCanon,this);
        //create ship
        let emnemy = instantiate(this.enemyPre);
        emnemy.getComponent(EnemyController).setUp(20, 10, new Vec3(300, 300, 0));
        this.gamePlay.addChild(emnemy);
    }

    onTouchCanon(event:Touch){
        let touchLocation = event.getUILocation();
        let loc = new Vec3(touchLocation.x - GameConfig.HAFT_SCREEN_W , touchLocation.y - GameConfig.HAFT_SCREEN_H);
        let dist = this.getDistance(this.playerCanon.position, loc)
        dist.normalize();
        const zAngel =  Math.atan2(dist.x, dist.y) * 180 / Math.PI;
        let cannonSprite = this.playerCanon.getComponent(PlayerCanon).getCanonSprite();
        const fire = ()=>{
            let bullet = instantiate(this.bulletPre);
            bullet.setPosition(this.playerCanon.position);
            bullet.getComponent(BulletController).setUp(dist, 5, 1)
            this.gamePlay.addChild(bullet);
        }

        tween(cannonSprite.node).sequence(
            tween(cannonSprite.node).to(0.2,{eulerAngles: new Vec3(0, 0, -zAngel)}),
            tween(cannonSprite.node).call(fire)
            ).start();
    }

    update(deltaTime: number) {
        
    }

    private getDistance(origin: Vec3, target: Vec3){
        return target.subtract(origin)
    }
}


