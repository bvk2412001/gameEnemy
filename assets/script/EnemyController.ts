import { _decorator, Component, Node, ProgressBar, Sprite, SpriteFrame, Vec3, Collider2D, Contact2DType, IPhysics2DContact } from 'cc';
import { BulletController } from './BulletController';
import { GameConfig } from './GameConfig';
import { ShipType } from './item/ShipType';
import { GameController } from './GameController';
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

    enemyDir;
    isEnemy:boolean = false;
    callback;
    isGameOver:boolean = false;
    dieCallback

    start() {
        
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

    }

    
    
    setUp(shipType:ShipType, position: Vec3, callback, dieCallback) {
        this.enemySprite.spriteFrame = shipType.shipSprite;
        this.enemySpeed = shipType.shipSpeed;

        this.enemyFullheath = this.enemyHealth = shipType.shipHealth;
       
        this.node.position = position;
        console.log("speed" +  position)    
        this.enemyDir = new Vec3(0, -1, 0);
        this.isEnemy = true;
        this.callback = callback;
        this.dieCallback = dieCallback;
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (this.node) {
            let hitObject: Node = otherCollider.node;
            if (hitObject.name.includes(GameConfig.BULLET_NAME)) {
                let damageHealth = hitObject.getComponent(BulletController).getDamage();
                this.enemyHealth -= damageHealth;
                //update progressbar
                if (this.enemyHealth <= 0) {
                  this.node.destroy();
                    if(this.callback){
                        this.callback();
                    }
                }
                else{
                this.healthProgess.progress = this.enemyHealth / this.enemyFullheath;
                }
                hitObject.destroy();
            }
        }

    }

    update(deltaTime: number) {
        if(this.isGameOver)return;
        if(this.isEnemy){
            this.node.translate(this.enemyDir);
        }
        if(this.node.position.y < -640){
            this.node.destroy();
            this.isEnemy = false;
            this.dieCallback();
            this.isGameOver = true;
        }
    }   
}


