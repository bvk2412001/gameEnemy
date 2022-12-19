import { _decorator, Component, Node, Vec3, Sprite, SpriteFrame, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BulletController')
export class BulletController extends Component {
    bullDir;
    isFire:boolean = false;
    bulletSpeed = 100;
    bulletDamage:number = 1;

    @property(Sprite)
    bulletSprite:Sprite;
    @property(SpriteFrame)
    bulletList:SpriteFrame[] = [];

    start() {

    }
    public getDamage(){
        return this.bulletDamage;
    }
    update(deltaTime: number) {
        if(this.isFire){
            this.node.translate(this.bullDir);
        }
        if(this.node.position.subtract(Vec3.ZERO).length() > 1000){
            this.isFire = false;
            this.node.destroy()
        }
    }


    setUp(dir:Vec3, speed:number, dame:number){
        this.bulletDamage = dame;
        this.bulletSpeed = speed;
        this.bulletSprite.spriteFrame = this.bulletList[this.bulletDamage + 1];
        this.bullDir = dir.normalize().multiply(new Vec3(speed, speed, 0));
        this.isFire = true;
    }
}


