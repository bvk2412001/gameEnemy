import { _decorator, Component, Node, ProgressBar, Sprite, SpriteFrame, Vec3, Collider2D, Contact2DType, IPhysics2DContact } from 'cc';
import { BulletController } from './BulletController';
import { GameConfig } from './GameConfig';
const { ccclass, property } = _decorator;

@ccclass('EnemyController')
export class EnemyController extends Component {

    @property(ProgressBar)
    healthProgess: ProgressBar;

    @property(Sprite)
    enemySprite: Sprite;

    @property(SpriteFrame)
    spriteList: SpriteFrame[] = [];
    enemyHealth: number;
    enemySpeed: number;
    enemyFullheath: number;


    start() {
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

    }

    setUp(speed: number, health: number, position: Vec3) {
        this.enemySpeed = speed;
        this.enemyFullheath = this.enemyHealth = health;
        this.node.position = position;
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        console.log(selfCollider.node);
        if (this.node) {
            let hitObject: Node = otherCollider.node;
            if (hitObject.name.includes(GameConfig.BULLET_NAME)) {
                let damageHealth = hitObject.getComponent(BulletController).getDamage();
                this.enemyHealth -= damageHealth;
                //update progressbar
                if (this.enemyHealth <= 0) {
                  

                }
                else{
                this.healthProgess.progress = this.enemyHealth / this.enemyFullheath;
                }

                this.destroyNode(hitObject)
                

            }
        }

    }

    destroyNode(node:Node){
        node.destroy();
    }

    update(deltaTime: number) {

    }
}


