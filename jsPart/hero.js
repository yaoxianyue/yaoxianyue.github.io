// 天赋列表
const TALENTS = [
    "<<圣灵之体>>", "<<一线生机>>", "<<嗜血本性>>", 
    "<<吸星大法>>", "<<起死回生>>", "<<速行连招>>", 
    "<<神秘笔记>>", "<<扼杀天性>>", "<<天生狂战>>", 
    "<<时间倒转>>", "<<死亡斩杀>>", "<<传奇护符>>", 
    "<<武魂真身>>"
];


// 英雄基类
class Hero {
    constructor() {
        this.name = '';  // 英雄名称
        this.life1 = 1;  // 当前生命
        this.life2 = 1;  // 初始生命
        this.blood1 = 0; // 当前血量
        this.blood2 = 0; // 第二血量
        this.blood3 = 0; // 当前血量最大生命上限
        this.blood4 = 0; // 第二血量最大生命上限
        this.armor1 = 0; // 护甲值
        this.armor2 = 0; // 第二护甲
        this.armor3 = 0; // 当前护甲最大上限
        this.armor4 = 0; // 第二护甲最大生命上限
        this.hurtValue = 0; //  普攻伤害
        this.speed1 = 0; //  当前速度即攻速
        this.speed2 = 0; //  初始速度即攻速
        this.weapon = ''; //  武器名称
        this.weaponHurt = 0; // 武器增伤->影响普攻伤害
        this.skill = ''; // 角色技能名称
        this.skillHurt = 0; //  技能伤害
        this.skillLevel = 0; // 技能释放概率
        this.energy = 0; // 能量 每次释放技能需消耗20点能量，能量随时间的增加而增加
        this.criticalStrike = 0; // 暴击伤害和暴击率
        this.talent1 = ''; //   当前天赋名称
        this.talent2 = ''; //   初始天赋名称
        this.talentInfluence = 1; //    天赋是否继续生效
        this.feature = ''; //   角色特性
        this.featureInfluence = 1; //   角色特性是否继续影响
        this.sumHurtValue = 0; //   造成总伤害
        this.controlFlag = 0; // 未
        this.career = ''; //    未
        this.lastSecond = 0; // 上次攻击时间
        this.pastSecond = 0; // 上次攻击间隔
        this.attackNumber = 0; //   攻击次数
        this.armor = ''; //护甲名称
        this.stopHurtLevel = 10; // 暂停攻击率
        
        // 随机选择天赋
        const talentOption = Math.floor(Math.random() * TALENTS.length);
        this.talent1 = TALENTS[talentOption];
        this.talent2 = this.talent1;
    }
    
    // 完整的攻击逻辑，复刻Java代码
    attack(counterHero) {
        // 攻击日志
        let log = '';
        const sb = [];
        
        // 1.随机变量以及初始准备
        let nowBlood;
        let nowArmor;
        let addBlood;
        let addArmor;
        let nowHurtValue;
        let addHurtValue;
        let addHurtValueL = 0;
        let nowCriticalStrike;
        let addCriticalStrike;
        let addCriticalStrikeL = 0;
        let addSpeed;
        let randomIndex1;
        let randomIndex2;
        let randomIndex3;
        let attackTimes = 1;
        let nowEnergy;
        
        // 2.确定部分角色特性和部分天赋开局所带来的影响
        // 封印之兽-@封锁#
        if (counterHero.feature === "@封锁#") {
            this.speed1 = this.speed2;
        }
        
        // 2.1.1.1 抽奖家
        if (this instanceof LotteryMan) {
            //抽奖大师-@老练#
            if (this.feature === "@老练#") {
                addHurtValueL += 1;
                addCriticalStrikeL += 1;
            }
            addCriticalStrikeL += Math.floor(Math.random() * 13);
            addHurtValueL += Math.floor(Math.random() * 25);
            this.hurtValue += addHurtValueL;
            this.criticalStrike += addCriticalStrikeL;
            this.speed1 = Math.floor(Math.random() * 3) + this.speed2;
            sb.push(`${this.name}使用${this.weapon}抽奖后：攻击->${this.hurtValue},暴击->${this.criticalStrike},速度->${this.speed1}\n`);
            
            // 2.1.1.3 角色特性@幸运#，更换天赋
            if (this.feature === "@幸运#") {
                randomIndex1 = Math.floor(Math.random() * 8);
                if (this.talentInfluence === 1 && randomIndex1 === 1) {
                    randomIndex2 = Math.floor(Math.random() * TALENTS.length);
                    this.talent1 = TALENTS[randomIndex2];
                    this.talent2 = this.talent1;
                    
                    nowBlood = this.blood1 + 85;
                    nowBlood = Math.min(this.blood3, nowBlood);
                    this.blood1 = nowBlood;
                    
                    sb.push(`${this.name}触发角色特性@幸运#，更换天赋->${this.talent1}.\n`);
                }
            }
        } else if (this.feature === "@巨性#" && this.featureInfluence === 1) {
            // 2.1.2.1 巨人角色特性@巨性#，血量增加
            nowBlood = Math.floor(this.blood3 * 1.3); // 130%
            addBlood = nowBlood - this.blood3;
            this.blood3 = nowBlood;
            this.blood1 += addBlood;
            this.featureInfluence = 0;
            sb.push(`${this.name}触发角色特性@巨性#，血量增加->${this.blood1}/${this.blood3}.\n`);
        } else if (this.feature === "@淬铁#" && this.featureInfluence === 1) {
            // 淬铁侠-@淬铁#
            nowArmor = Math.floor(this.armor3 * 1.3); // 130%
            addArmor = nowArmor - this.armor3;
            this.armor3 = nowArmor;
            this.armor1 += addArmor;
            this.featureInfluence = 0;
            sb.push(`${this.name}触发角色特性@淬铁#，护甲增加->${this.armor1}/${this.armor3}.\n`);
        } else if (this.feature === "@暴怒#" && this.featureInfluence === 1) {
            if (this.blood1 < Math.floor(this.blood3 * 0.9)) {
                nowCriticalStrike = this.criticalStrike * 6;
                this.criticalStrike = nowCriticalStrike;
                this.featureInfluence = 0;
                sb.push(`${this.name}触发角色特性@暴怒#，暴击增加->${this.criticalStrike}.\n`);
            }
        } else if (this.feature === "@七毒#" && this.featureInfluence > 0) {
            randomIndex1 = Math.floor(Math.random() * 3);
            if (randomIndex1 === 0) {
                this.hurtValue += 2;
                sb.push(`${this.name}触发角色特性@七毒#毒性叠加到第${this.featureInfluence}层，攻击增加->${this.hurtValue}.\n`);
                if (this.featureInfluence === 7) {
                    this.featureInfluence = 0;
                } else {
                    this.featureInfluence++;
                }
            }
        } else if (this.feature === "@杀性#" && this.featureInfluence > 0) {
            // 攻速狂魔-@杀性#
            randomIndex1 = Math.floor(Math.random() * 20);
            if (randomIndex1 === 0) {
                this.hurtValue += 1;
                sb.push(`${this.name}触发角色特性@杀性#攻击叠加到第${this.featureInfluence}层，攻击增加->${this.hurtValue}.\n`);
                if (this.featureInfluence === 2) {
                    this.featureInfluence = 0;
                } else {
                    this.featureInfluence++;
                }
            }
        } else if (this instanceof NineTailedFox) {
            // 2.1.3 九尾妖狐  4 <<起死回生>>
            if (this.talent1 === TALENTS[4] && this.talentInfluence === 1) {
                this.life1 += 4;
                this.talentInfluence = 0;
                sb.push(`${this.name}激活天赋${this.talent1}生命增加->${this.life1}.\n`);
            }
        } else if (this instanceof LongRen) {
            this.speed1 = this.speed2;
            if (this.feature === "@真龙之力#" && this.controlFlag === 1) {
                this.blood1 += 100;
                this.blood3 += 100;
                this.hurtValue += 5;
                this.skillHurt += 8;
                this.controlFlag = 2;
                sb.push(`${this.name}护甲破裂，爆发@真龙之力#,获得增强！！！\n`);
            }
            randomIndex1 = Math.floor(Math.random() * 4);
            randomIndex2 = Math.floor(Math.random() * 5);
            if (this.feature === "@真龙之力#" && this.featureInfluence > 0 && randomIndex1 === 0) {
                nowBlood = this.blood3 + 50;
                this.blood3 = nowBlood;
                nowBlood = this.blood1 + 50;
                this.blood1 = nowBlood;
                
                this.hurtValue += 3;
                this.skillHurt += 4;
                this.skillLevel++;
                this.criticalStrike++;
                this.speed1++;
                if (this.featureInfluence === 2 || this.featureInfluence === 4) {
                    this.speed2--;
                }
                sb.push(`${this.name}触发角色特性@真龙之力#,第${this.featureInfluence}次吸收真龙之力获得增强！！！\n`);
                if (this.featureInfluence === 5) {
                    this.featureInfluence = 0;
                } else {
                    this.featureInfluence++;
                }
            } else if (this.feature === "@龙魂显现#" && this.featureInfluence > 0 && randomIndex2 === 0) {
                nowBlood = this.blood3 + 50;
                this.blood3 = nowBlood;
                nowBlood = this.blood1 + 50;
                this.blood1 = nowBlood;
                
                this.hurtValue -= 5;
                this.criticalStrike += 2;
                sb.push(`${this.name}触发角色特性@龙魂显现#,第${this.featureInfluence}次获得增强！！！\n`);
                if (this.featureInfluence === 1 || this.featureInfluence === 2) {
                    this.speed1 += 3;
                    if (this.featureInfluence === 1) {
                        this.speed2--;
                    }
                    this.featureInfluence++;
                } else {
                    this.speed1 += 2;
                    this.speed2--;
                    this.featureInfluence = 0;
                }
            }
        } else if (this instanceof Twin) {
            if (this.blood1 < this.blood2 && (this.feature === "@并肩#" || this.feature === "@切换#")) {
                randomIndex1 = Math.floor(Math.random() * 4);
            } else {
                randomIndex1 = Math.floor(Math.random() * 5);
            }
            if (randomIndex1 === 0) {
                // 均衡-@并肩#
                if (this.feature === "@并肩#") {
                    nowBlood = this.blood1 + 9;
                    nowArmor = this.armor1;
                    nowBlood = Math.min(nowBlood, this.blood3);
                    
                    const tempBlood = this.blood1;
                    const tempArmor = this.armor1;
                    
                    this.blood1 = Math.min(this.blood2 + 9, this.blood4);
                    this.armor1 = this.armor2;
                    
                    this.blood2 = nowBlood;
                    this.armor2 = nowArmor;
                    
                    const tempBlood3 = this.blood3;
                    const tempArmor3 = this.armor3;
                    
                    this.blood3 = this.blood4;
                    this.armor3 = this.armor4;
                    
                    this.blood4 = tempBlood3;
                    this.armor4 = tempArmor3;
                    
                    sb.push(`${this.name}触发角色特性${this.feature}`);
                    if (this.featureInfluence === 1) {
                        this.hurtValue -= 3;
                        this.criticalStrike += 1;
                        this.featureInfluence = 2;
                        sb.push("，均->衡.\n");
                    } else {
                        this.hurtValue += 3;
                        this.criticalStrike -= 1;
                        this.featureInfluence = 1;
                        sb.push("，衡->均.\n");
                    }
                } else if (this.feature === "@切换#") {
                    // 矛盾-@切换#
                    sb.push(`${this.name}触发角色特性${this.feature}`);
                    nowBlood = this.blood1;
                    nowArmor = this.armor1;
                    if (this.featureInfluence === 1) {
                        this.blood1 = Math.min(this.blood2, this.blood4);
                        this.armor1 = Math.min(this.armor2 + 5, this.armor4);
                        this.featureInfluence = 2;
                        this.hurtValue -= 25;
                        this.speed1++;
                        this.speed2++;
                        sb.push("，矛->盾.\n");
                    } else {
                        this.blood1 = Math.min(this.blood2 + 10, this.blood4);
                        this.armor1 = Math.min(this.armor2, this.armor4);
                        this.featureInfluence = 1;
                        this.hurtValue += 25;
                        this.speed1--;
                        this.speed2--;
                        sb.push("，盾->矛.\n");
                    }
                    
                    this.blood2 = nowBlood;
                    this.armor2 = nowArmor;
                    
                    nowBlood = this.blood3;
                    nowArmor = this.armor3;
                    
                    this.blood3 = this.blood4;
                    this.armor3 = this.armor4;
                    
                    this.blood4 = nowBlood;
                    this.armor4 = nowArmor;
                } else if (this.feature === "@再生#") {
                    // 陆翼-@再生#
                    if (this.featureInfluence > 0 && this.featureInfluence < 11) {
                        sb.push(`${this.name}触发角色特性${this.feature}第${Math.floor((this.featureInfluence + 1) / 2)}次`);
                        if (this.featureInfluence % 2 === 0) {
                            this.armor1 = this.armor3;
                            this.hurtValue += 20;
                            this.speed1--;
                            this.speed2--;
                            this.featureInfluence++;
                            sb.push("，陆->翼.\n");
                        } else {
                            this.armor3 += 25;
                            this.armor1 = this.armor3;
                            this.hurtValue += 1;
                            this.featureInfluence += 2;
                            sb.push("，翼->翼.\n");
                        }
                    }
                }
            }
        } else if (this.feature === "@彩虹糖#" && this.featureInfluence > 0) {
            randomIndex1 = Math.floor(Math.random() * 5);
            if (randomIndex1 === 0) {
                randomIndex2 = Math.floor(Math.random() * 4);
                sb.push(`${this.name}第${this.featureInfluence}次激活角色特性${this.feature}`);
                switch (randomIndex2) {
                    case 0:
                        this.hurtValue += 5;
                        sb.push("获得攻击增益！\n");
                        break;
                    case 1:
                        this.blood3 += 100;
                        this.blood1 += 100;
                        sb.push("获得血量增益！\n");
                        break;
                    case 2:
                        this.armor3 += 50;
                        this.armor1 += 50;
                        sb.push("获得护甲增益！\n");
                        break;
                    case 3:
                        this.energy += 50;
                        sb.push("获得能量增益！\n");
                        break;
                }
                if (this.featureInfluence === 7) {
                    this.speed2--;
                    this.speed1 = this.speed2;
                    this.featureInfluence = 0;
                } else {
                    this.featureInfluence++;
                }
            }
        }
        
        // 11 <<传奇护符>>
        if (this.talent1 === TALENTS[11] && this.talentInfluence === 500) {
            nowBlood = Math.floor(this.blood3 * 1.2); // 120%
            addBlood = nowBlood - this.blood3;
            this.blood3 = nowBlood;
            this.blood1 += addBlood;
            this.talentInfluence = 0;
        }
        
        // 2.2.1    0 <<圣灵之体>>
        if (this.talent1 === TALENTS[0] && this.talentInfluence === 1) {
            randomIndex1 = Math.floor(Math.random() * 4);
            randomIndex2 = Math.floor(Math.random() * 7);
            if (randomIndex1 === 0) {
                addBlood = Math.floor(this.blood3 / 90) + this.speed2 * 5;
                nowBlood = this.blood1 + addBlood;
                nowBlood = Math.min(nowBlood, this.blood3);
                this.blood1 = nowBlood;
                sb.push(`${this.name}激活天赋${this.talent1}恢复${addBlood}血量。\n`);
            }
            if (randomIndex2 === 0) {
                addArmor = Math.floor(this.armor3 / 12);
                nowArmor = this.armor1 + addArmor;
                nowArmor = Math.min(nowArmor, this.armor3);
                this.armor1 = nowArmor;
                sb.push(`${this.name}激活天赋${this.talent1}修复${addArmor}护甲。\n`);
            }
        } else if (this.talent1 === TALENTS[3] && this.talentInfluence === 1) {
            // 2.2.2    3 <<吸星大法>>
            if (counterHero.talent1 === TALENTS[11] &&
                    counterHero.talentInfluence % 100 > 0 && counterHero.talentInfluence % 100 <= 30) {
            } else {
                nowBlood = this.blood1;
                randomIndex1 = Math.floor(Math.random() * 3);
                if ((nowBlood < Math.floor(this.blood3 / 2)) && randomIndex1 === 0) {
                    nowBlood = Math.max(nowBlood + 300, counterHero.blood1);
                    nowBlood = Math.min(nowBlood, this.blood3);
                    
                    nowHurtValue = Math.max(this.hurtValue, counterHero.hurtValue);
                    addHurtValue = nowHurtValue - this.hurtValue;
                    addHurtValue = Math.min(addHurtValue + 9, Math.floor(this.hurtValue * 0.8)); // 4/5
                    nowHurtValue = this.hurtValue + addHurtValue;
                    
                    nowCriticalStrike = Math.max(this.criticalStrike, counterHero.criticalStrike);
                    addCriticalStrike = nowCriticalStrike - this.criticalStrike;
                    addCriticalStrike = Math.min(addCriticalStrike + 5, Math.floor(this.criticalStrike * 0.8)); // 4/5
                    nowCriticalStrike = this.criticalStrike + addCriticalStrike;
                    
                    nowEnergy = Math.max(this.energy + 50, counterHero.energy);
                    
                    this.blood1 = nowBlood;
                    this.hurtValue = nowHurtValue;
                    this.criticalStrike = nowCriticalStrike;
                    this.energy = nowEnergy;
                    
                    sb.push(`${this.name}激活天赋${this.talent1}血量->${this.blood1}/${this.blood3},攻击->${this.hurtValue},暴击率->${this.criticalStrike}.`);
                    this.talentInfluence = 2;
                    this.talent1 = "<<吸魂大法>>";
                    sb.push("此时天赋异变为<<吸魂大法>>！！！\n");
                }
            }
        } else if (this.talent1 === TALENTS[7] && this.talentInfluence === 1 && counterHero.talentInfluence > 0) {
            // 2.2.3    7 <<扼杀天性>>
            if (counterHero.talent1 === TALENTS[11] &&
                    counterHero.talentInfluence % 100 > 0 && counterHero.talentInfluence % 100 <= 30) {
            } else {
                nowBlood = Math.floor(this.blood3 * 0.75); // 3/4
                this.blood3 = nowBlood;
                nowBlood = Math.min(this.blood1, this.blood3);
                this.blood1 = nowBlood;
                
                nowArmor = Math.floor(this.armor1 * 0.75); // 3/4
                this.armor1 = nowArmor;
                
                addSpeed = 1;
                counterHero.speed2 += addSpeed;
                counterHero.speed1 += addSpeed;
                
                this.talentInfluence = 0;
                counterHero.talentInfluence = 0;
                
                sb.push(`${this.name}激活天赋${this.talent1}禁锢${counterHero.name}天赋,并使对方初始速度->${counterHero.speed2}.\n`);
                
                if (counterHero instanceof CrazyDemon) {
                    counterHero.hurtValue += 5;
                    counterHero.blood3 += 100;
                    counterHero.blood1 += 100;
                }
                
                this.talent1 = "";
                counterHero.talent1 = "";
            }
        } else if (this.talent1 === TALENTS[12] && this.talentInfluence === 1) {
            randomIndex1 = Math.floor(Math.random() * 2);
            if(randomIndex1 === 0) {
                sb.push(`${this.name}激活天赋${this.talent1}进入武魂状态,镜像为->3！！！\n`);
                this.talentInfluence = 2;
            }
        }
        
        // 3.局内血包(1-10)10%以及是否遭到制裁10%
        randomIndex1 = Math.floor(Math.random() * 10);
        randomIndex2 = Math.floor(Math.random() * 100);
        if (randomIndex1 === 0) {
            addBlood = Math.floor(Math.random() * 10) + 1;
            nowBlood = this.blood1 + addBlood;
            nowBlood = Math.min(nowBlood, this.blood3);
            this.blood1 = nowBlood;
            sb.push(`${this.name}捡到野生血包恢复${addBlood}血量。\n`);
        }
        if (randomIndex2 < this.stopHurtLevel) {
            sb.push(`${this.name}遭到制裁无法进行当前进攻。\n`);
            log = sb.join('');
            addBattleLog(log);
            if (this instanceof LotteryMan) {
                this.hurtValue -= addHurtValueL;
                this.criticalStrike -= addCriticalStrikeL;
            }
            return;
        }
        
        // 4.展开攻击敌方阶段
        let remainBlood;
        let remainArmor;
        
        // 4.1.1    5 <<速行连招>>
        if (this.talent1 === TALENTS[5] && this.talentInfluence === 1) {
            let randomScale = 5;
            randomIndex1 = Math.floor(Math.random() * randomScale);
            while (randomIndex1 <= 1) {
                attackTimes++;
                randomScale *= 2;
                randomIndex1 = Math.floor(Math.random() * randomScale);
            }
            if (attackTimes > 1) {
                sb.push(`${this.name}激活天赋${this.talent1}进行二次伤害${attackTimes - 1}次。\n`);
            }
        }
        
        // 4.1.2  攻击判定
        while (attackTimes > 0) {
            randomIndex1 = Math.floor(Math.random() * 100) + 1;
            if (this.energy >= 100) {
                randomIndex2 = Math.floor(Math.random() * 75) + 1;
            } else {
                randomIndex2 = Math.floor(Math.random() * 100) + 1;
            }
            
            sb.push(`${this.name}`);
            remainBlood = counterHero.blood1;
            remainArmor = counterHero.armor1;
            let crazyDemonFlag = 0;
            let flag = 1;
            
            // 圣医之法-@医道#
            if (this.feature === "@医道#") {
                randomIndex3 = Math.floor(Math.random() * 4);
                if (randomIndex3 === 0 && this.blood3 <= 1400) {
                    sb.push("触发特性@医道#.");
                    flag = 0;
                    if (randomIndex2 <= this.skillLevel && this.energy >= 20) {
                        nowHurtValue = Math.floor(this.skillHurt * 2.2); // 11/5
                        this.energy -= 20;
                        sb.push(`释放特技${this.skill}`);
                    } else {
                        nowHurtValue = Math.floor(this.hurtValue * 2.2); // 11/5
                    }
                    this.blood1 += nowHurtValue;
                    this.blood1 = Math.min(1400, this.blood1);
                    this.blood3 = Math.max(this.blood1, this.blood3);
                    sb.push(`使用武器${this.weapon}治疗自己.\n`);
                }
            }
            
            if (flag === 1) {
                // 4.1.3  暴击判定 有暴击
                if (randomIndex1 <= this.criticalStrike) {
                    //  4.1.4  技能判定
                    if (randomIndex2 <= this.skillLevel && this.energy >= 20) {
                        nowHurtValue = Math.floor(this.skillHurt * 1.5);
                        this.energy -= 20;
                        sb.push(`释放特技${this.skill}`);
                    } else {
                        // 神秘人 角色特性@神秘#
                        if (this instanceof MysteryMan) {
                            randomIndex1 = Math.floor(Math.random() * 10);
                            if (this.feature === "@神秘#" && randomIndex1 === 0) {
                                nowHurtValue = Math.floor(counterHero.blood1 / 5) + this.hurtValue;
                            } else {
                                nowHurtValue = Math.floor(counterHero.blood1 * 0.12) + this.hurtValue; // 3/25
                            }
                            nowHurtValue = Math.floor(nowHurtValue * 1.5);
                        } else {
                            nowHurtValue = Math.floor(this.hurtValue * 1.5);
                        }
                    }
                    sb.push(`使用武器${this.weapon}对${counterHero.name}产生暴击`);
                } else {
                    // 4.1.5  暴击判定 无暴击
                    // 4.1.6  技能判定
                    if (randomIndex2 <= this.skillLevel && this.energy >= 20) {
                        nowHurtValue = this.skillHurt;
                        this.energy -= 20;
                        sb.push(`释放特技${this.skill}`);
                    } else {
                        // 神秘人 角色特性@神秘#
                        if (this instanceof MysteryMan) {
                            randomIndex1 = Math.floor(Math.random() * 4);
                            if (this.feature === "@神秘#" && randomIndex1 === 0) {
                                nowHurtValue = Math.floor(counterHero.blood1 / 5) + this.hurtValue;
                            } else {
                                nowHurtValue = Math.floor(counterHero.blood1 * 0.12) + this.hurtValue; // 3/25
                            }
                        } else {
                            nowHurtValue = this.hurtValue;
                        }
                    }
                    sb.push(`使用武器${this.weapon}攻击${counterHero.name}`);
                }
                
                // <<武魂真身>>
                if(this.talent1 === TALENTS[12] && this.talentInfluence >= 2 && this.talentInfluence <= 3) {
                    nowHurtValue = Math.floor(nowHurtValue * 1.5);
                }
                
                if (this.talent1 === TALENTS[10] && this.talentInfluence > 0) {
                    randomIndex1 = Math.floor(Math.random() * 3);
                    if (randomIndex1 === 0) {
                        nowHurtValue += 85;
                        sb.push(`,并激活天赋${this.talent1}第${this.talentInfluence}次斩杀敌方造成额外伤害.`);
                        this.talentInfluence++;
                        if (this.talentInfluence === 13) {
                            this.talentInfluence = 0;
                        }
                    }
                }
                
                // 4.1.7  角色特性判定
                // 11 <<传奇护符>>
                if (counterHero.talent1 === TALENTS[11] &&
                        counterHero.talentInfluence % 100 > 0 &&
                        counterHero.talentInfluence % 100 <= 30) {
                    nowHurtValue = 0;
                    sb.push(`\n\t但${counterHero.name}激活天赋${counterHero.talent1}免疫了本次伤害.`);
                } else if (counterHero.feature === "@隐匿#" && counterHero.featureInfluence === 2) {
                    // 虚空剑客-@隐匿#
                    randomIndex1 = Math.floor(Math.random() * 5);
                    if (randomIndex1 <= 2) {
                        sb.push(`\n\t但${counterHero.name}触发角色特性@隐匿#规避了本次伤害.`);
                        nowHurtValue = 0;
                    }
                } else if (counterHero.feature === "@敏捷#") {
                    // 箭手 角色特性@敏捷#
                    randomIndex1 = Math.floor(Math.random() * 10);
                    if (randomIndex1 === 0) {
                        sb.push(`\n\t但${counterHero.name}触发角色特性@敏捷#规避了本次伤害.`);
                        nowHurtValue = 0;
                    }
                } else if (counterHero.feature === "@上古#") {
                    // 上古神兽-@上古#
                    nowHurtValue = Math.floor(nowHurtValue * 0.8); // 80%
                } else if (counterHero.feature === "@神威#") {
                    randomIndex1 = Math.floor(Math.random() * 3);
                    if (randomIndex1 === 0) {
                        nowHurtValue = Math.floor(nowHurtValue * 0.5); // 50%
                        sb.push(`\n\t但${counterHero.name}触发角色特性@神威#导致本次伤害减半.`);
                    }
                } else if (counterHero.feature === "@铁甲#") {
                    // 铁人王-角色特性@铁甲#
                    if (counterHero.armor1 > 0) {
                        nowHurtValue = Math.floor(nowHurtValue * 0.8); // 80%
                    }
                } else if (counterHero.feature === "@反噬#") {
                    // 疯狂魔兽-角色特性@反噬#
                    randomIndex1 = Math.floor(Math.random() * 6);
                    if (randomIndex1 === 0) {
                        nowHurtValue = Math.floor(nowHurtValue * 0.5); // 50%
                        crazyDemonFlag = 1;
                        if (this.armor1 > 0) {
                            nowArmor = this.armor1 - nowHurtValue;
                            nowArmor = Math.max(nowArmor, 0);
                            this.armor1 = nowArmor;
                        } else {
                            nowBlood = this.blood1 - nowHurtValue;
                            nowBlood = Math.max(nowBlood, 1);
                            this.blood1 = nowBlood;
                        }
                    }
                } else if (counterHero.feature === "@真龙之力#") {
                    randomIndex1 = Math.floor(Math.random() * 4);
                    if (counterHero.armor1 > 0 && randomIndex1 === 0) {
                        nowHurtValue = Math.floor(nowHurtValue * 0.5); // 50%
                    }
                } else if (counterHero.feature === "@再生#" && counterHero.featureInfluence % 2 === 1) {
                    randomIndex1 = Math.floor(Math.random() * 6);
                    if (randomIndex1 === 0) {
                        sb.push(`\n\t但${counterHero.name}触发角色特性@再生#规避了本次伤害.`);
                        nowHurtValue = 0;
                    }
                }
                
                if(counterHero.talent1 === TALENTS[12] &&
                        counterHero.talentInfluence >= 2 && counterHero.talentInfluence <= 3) {
                    // <<武魂真身>>
                    const mirrorIndex = 5 - counterHero.talentInfluence;
                    randomIndex1 = Math.floor(Math.random() * (2 * mirrorIndex));
                    if(randomIndex1 === 0) {
                        nowHurtValue = nowHurtValue * 2;
                        counterHero.talentInfluence++;
                        sb.push(`\n\t${counterHero.name}被击中真像，镜像数->${5 - counterHero.talentInfluence}.`);
                        if(mirrorIndex === 2) {
                            sb.push("假象全无，武魂状态消失！！！");
                        }
                    } else {
                        nowHurtValue = Math.floor(nowHurtValue / mirrorIndex);
                        sb.push(`\n\t${counterHero.name}被击中假象，镜像数->${5 - counterHero.talentInfluence}.`);
                    }
                }
                
                // 4.1.8  敌方状态更新
                // 夺命杀手-@锋利#
                if (this.feature === "@锋利#") {
                    if (counterHero.armor1 > 0) {
                        remainArmor -= nowHurtValue;
                        remainBlood -= Math.floor(nowHurtValue / 7);
                        nowHurtValue += Math.floor(nowHurtValue / 7);
                    } else {
                        remainBlood -= nowHurtValue;
                    }
                } else if (this.feature === "@命中#") {
                    //神箭手-@命中#
                    randomIndex1 = Math.floor(Math.random() * 3);
                    if (randomIndex1 === 0) {
                        nowHurtValue = Math.floor(nowHurtValue * 1.33); // 4/3
                        remainBlood -= nowHurtValue;
                        sb.push(`\n\t${this.name}触发角色特性@命中#.`);
                    } else {
                        if (counterHero.armor1 > 0) {
                            remainArmor -= nowHurtValue;
                        } else {
                            remainBlood -= nowHurtValue;
                        }
                    }
                } else {
                    if (counterHero.armor1 > 0) {
                        remainArmor -= nowHurtValue;
                    } else {
                        remainBlood -= nowHurtValue;
                    }
                }
                
                remainArmor = Math.max(remainArmor, 0);
                remainBlood = Math.max(remainBlood, 0);
                
                counterHero.blood1 = remainBlood;
                counterHero.armor1 = remainArmor;
                sb.push(`最终造成${nowHurtValue}伤害.\n`);
                this.sumHurtValue += nowHurtValue;
                
                if (crazyDemonFlag === 1) {
                    counterHero.sumHurtValue += nowHurtValue;
                    sb.push(`\t与此同时${this.name}受到${counterHero.name}的${counterHero.feature}效果.\n`);
                }
                
                if (counterHero.armor1 === 0 && counterHero.controlFlag === 0) {
                    counterHero.controlFlag = 1;
                }
                
                // 恶魔之子-@魔法#
                if (counterHero.feature === "@魔法#") {
                    this.speed1 = this.speed2;
                }
                
                // 4.1.9  角色特性以及天赋判定
                if (this.feature === "@疾行#") {
                    // 刺客-@疾行#
                    this.speed1 = this.speed2;
                    randomIndex1 = Math.floor(Math.random() * 4);
                    if (randomIndex1 === 0) {
                        this.speed1 = this.speed1 - 1;
                        sb.push(`\t${this.name}触发角色特性@疾行#下次攻速加快.\n`);
                    }
                } else if (this.feature === "@隐匿#") {
                    // 虚空剑客-@隐匿#
                    this.speed1 = this.speed2;
                    this.featureInfluence = 1;
                    randomIndex1 = Math.floor(Math.random() * 4);
                    if (randomIndex1 === 0) {
                        this.speed1 = this.speed1 + 1;
                        this.featureInfluence = 2;
                        sb.push(`\t${this.name}触发角色特性@隐匿#.\n`);
                    }
                } else if (this.feature === "@爱心#") {
                    // 爱神箭意-@爱心#
                    randomIndex1 = Math.floor(Math.random() * 8);
                    if (randomIndex1 === 0) {
                        nowBlood = this.blood1 + nowHurtValue;
                        nowBlood = Math.min(nowBlood, this.blood3);
                        addBlood = nowBlood - this.blood1;
                        this.blood1 = nowBlood;
                        sb.push(`\t${this.name}触发角色特性@爱心#吸收对方血量${addBlood}点.\n`);
                    }
                } else if (this.feature === "@妖魅#" && this.featureInfluence === 1) {
                    // 巫妖之女-@妖魅#
                    randomIndex1 = Math.floor(Math.random() * 9);
                    if (randomIndex1 === 0) {
                        counterHero.stopHurtLevel += 10;
                        sb.push(`\t${this.name}触发角色特性@妖魅#,将对方受到制裁几率提升->${counterHero.stopHurtLevel}%.\n`);
                        if (counterHero.stopHurtLevel === 50) {
                            this.featureInfluence = 0;
                        }
                    }
                } else if (this.feature === "@魔法#") {
                    //  恶魔之子-@魔法#
                    addSpeed = 1;
                    counterHero.speed1 += addSpeed;
                    counterHero.energy -= 1;
                    this.energy += 2;
                } else if (this.feature === "@封锁#") {
                    // 封印之兽-@封锁#
                    randomIndex1 = Math.floor(Math.random() * 2);
                    if (randomIndex1 === 0) {
                        counterHero.speed1 = counterHero.speed1 * 2;
                        sb.push(`\t${this.name}触发角色特性@封锁#,对方攻速减慢->${counterHero.speed1}.\n`);
                    }
                } else if (this.feature === "@真龙之力#" && this.controlFlag === 2) {
                    randomIndex1 = Math.floor(Math.random() * 4);
                    if (randomIndex1 === 0) {
                        this.speed1 = Math.max(this.speed1 - 1, 1);
                        sb.push(`${this.name}激活${this.feature}下次攻速加快！！！\n`);
                    }
                }
                
                //   2 <<嗜血本性>>
                if (this.talent1 === TALENTS[2] && this.talentInfluence === 1) {
                    randomIndex1 = Math.floor(Math.random() * 10);
                    if (randomIndex1 !== 0) {
                        addBlood = Math.floor(nowHurtValue * 0.66); // 2/3
                        addBlood = Math.max(addBlood, 1);
                        nowBlood = addBlood + this.blood1;
                        nowBlood = Math.min(this.blood3, nowBlood);
                        this.blood1 = nowBlood;
                        sb.push(`${this.name}激活天赋${this.talent1}恢复${addBlood}血量.\n`);
                    }
                } else if (this.talent1 === TALENTS[8] && this.talentInfluence === 1) {
                    // 8 <<天生狂战>>
                    randomIndex1 = Math.floor(Math.random() * 7);
                    if (randomIndex1 === 0) {
                        addHurtValue = Math.floor(this.hurtValue / 4);
                        const nowHurtNumber = this.hurtValue + addHurtValue;
                        this.hurtValue = nowHurtNumber;
                        
                        addBlood = Math.floor(this.blood1 / 12);
                        nowBlood = this.blood1 - addBlood;
                        nowBlood = Math.max(nowBlood, 1);
                        this.blood1 = nowBlood;
                        
                        sb.push(`${this.name}激活天赋${this.talent1}强化攻击->${this.hurtValue}.\n`);
                    }
                } else if (this.talent1 === TALENTS[6] && this.talentInfluence === 1) {
                    //2.2.4 6 <<神秘笔记>>
                    randomIndex1 = Math.floor(Math.random() * 5);
                    if (randomIndex1 === 0) {
                        while (true) {
                            randomIndex2 = Math.floor(Math.random() * 100);
                            if (randomIndex2 < 3 && counterHero.blood1 > 0) {
                                if (counterHero.talent1 === TALENTS[11] &&
                                        counterHero.talentInfluence % 100 > 0 &&
                                        counterHero.talentInfluence % 100 <= 30) {
                                    continue;
                                }
                                if (this.hurtValue * 2 >= counterHero.blood1 && counterHero.blood1 > 0) {
                                    this.sumHurtValue += counterHero.blood1;
                                    counterHero.blood1 = 0;
                                    sb.push(`${this.name}激活天赋${this.talent1}并翻开《死亡书页》秒杀${counterHero.name}.\n`);
                                } else {
                                    this.sumHurtValue += counterHero.blood1 - 1;
                                    counterHero.blood1 = 1;
                                    sb.push(`${this.name}激活天赋${this.talent1}并翻开《死亡书页》试图秒杀${counterHero.name}，${counterHero.name}命悬一线！！！.\n`);
                                }
                                break;
                            } else if (randomIndex2 < 40) {
                                addBlood = Math.floor(this.blood3 / 12);
                                addBlood = Math.max(addBlood, 1);
                                nowBlood = this.blood1 + addBlood;
                                nowBlood = Math.min(nowBlood, this.blood3);
                                this.blood1 = nowBlood;
                                sb.push(`${this.name}激活天赋${this.talent1}并翻开《滋生书页》回复${addBlood}血量。\n`);
                                break;
                            } else if (randomIndex2 < 60) {
                                const nowHurtNumber = Math.floor(this.hurtValue * 1.16); // 7/6
                                this.hurtValue = nowHurtNumber;
                                sb.push(`${this.name}激活天赋${this.talent1}并翻开《张狂书页》强化伤害->${this.hurtValue}\n`);
                                break;
                            } else if (randomIndex2 < 75) {
                                nowCriticalStrike = Math.floor(this.criticalStrike * 1.2); // 6/5
                                this.criticalStrike = nowCriticalStrike;
                                sb.push(`${this.name}激活天赋${this.talent1}并翻开《暴力书页》强化暴击->${this.criticalStrike}\n`);
                                break;
                            } else {
                                if (counterHero.talent1 === TALENTS[11] &&
                                        counterHero.talentInfluence % 100 > 0 &&
                                        counterHero.talentInfluence % 100 <= 30) {
                                    continue;
                                }
                                let nowIBloodNumber = Math.floor(counterHero.blood3 * 0.83); // 5/6
                                nowIBloodNumber = Math.max(nowIBloodNumber, 1);
                                counterHero.blood3 = nowIBloodNumber;
                                nowBlood = counterHero.blood1;
                                nowBlood = Math.min(nowBlood, counterHero.blood3);
                                counterHero.blood1 = nowBlood;
                                sb.push(`${this.name}激活天赋${this.talent1}并翻开《浴血书页》降低${counterHero.name}最大生命上限->${counterHero.blood3}\n`);
                                break;
                            }
                        }
                    }
                } else if(this.talent1 === "<<吸魂大法>>" && this.talentInfluence > 0) {
                    randomIndex1 = Math.floor(Math.random() * 10);
                    if(this.talentInfluence === 2 && randomIndex1 === 0) {
                        addHurtValue = Math.max(Math.floor(counterHero.hurtValue / 10), 1);
                        counterHero.hurtValue -= addHurtValue;
                        addBlood = addHurtValue * 10;
                        this.blood1 += addBlood;
                        this.blood3 += addBlood;
                        sb.push(`${this.name}激活天赋${this.talent1}第一次对敌方吸魂，敌方攻击减少${addHurtValue}点.\n`);
                        this.talentInfluence = 3;
                    } else if(this.talentInfluence === 3 && randomIndex1 === 0) {
                        addCriticalStrike = 3;
                        counterHero.criticalStrike -= addCriticalStrike;
                        addBlood = addCriticalStrike * 10;
                        this.blood1 += addBlood;
                        this.blood3 += addBlood;
                        sb.push(`${this.name}激活天赋${this.talent1}第二次对敌方吸魂，敌方暴击率减少${addCriticalStrike}点.\n`);
                        this.talentInfluence = 0;
                    }
                }
                
                // 陆翼-@再生#
                if (this.feature === "@再生#" && this.featureInfluence % 2 === 1 && this.armor1 === 0) {
                    sb.push(`${this.name}触发角色特性${this.feature},翼->陆.\n`);
                    this.speed1++;
                    this.speed2++;
                    this.hurtValue -= 20;
                    this.featureInfluence++;
                }
                if (counterHero.feature === "@再生#" && counterHero.featureInfluence % 2 === 1
                        && counterHero.armor1 === 0) {
                    sb.push(`${counterHero.name}触发角色特性${counterHero.feature},翼->陆.\n`);
                    counterHero.speed1++;
                    counterHero.speed2++;
                    counterHero.hurtValue -= 20;
                    counterHero.featureInfluence++;
                }
                
                //   1 <<一线生机>>
                if (counterHero.talent1 === TALENTS[1] && counterHero.talentInfluence === 1) {
                    if (counterHero.blood1 === 0) {
                        counterHero.blood1 = 1;
                        counterHero.armor1 = Math.floor(counterHero.armor3 * 0.8); // 4/5
                        const nowHurtNumber = Math.floor(counterHero.hurtValue * 1.5);
                        
                        counterHero.hurtValue = nowHurtNumber;
                        counterHero.talentInfluence = 0;
                        sb.push(`\t但${counterHero.name}激活天赋${counterHero.talent1},伤害->${counterHero.hurtValue}.\n`);
                    }
                } else if (counterHero.talent1 === TALENTS[4] && counterHero.talentInfluence === 1) {
                    // 4 <<起死回生>>
                    if (counterHero.blood1 === 0) {
                        counterHero.blood1 = Math.floor(counterHero.blood3 * 0.8); // 4/5
                        counterHero.talentInfluence = 0;
                        sb.push(`\t但${counterHero.name}激活天赋${counterHero.talent1}.\n`);
                    }
                } else if (counterHero.talent1 === TALENTS[9] && counterHero.talentInfluence === 1) {
                    // 9 <<时间倒转>>
                    
                    if (counterHero.blood1 === 0 && counterHero.life1 === 1) {
                        if (counterHero.talent1 === TALENTS[11] &&
                                counterHero.talentInfluence % 100 > 0 && counterHero.talentInfluence % 100 <= 30) {
                            sb.push(`\t但${counterHero.name}无法对无敌的目标激活天赋${counterHero.talent1}!!!\n`);
                        } else {
                            counterHero.blood1 = counterHero.blood3;
                            counterHero.armor1 = counterHero.armor3;
                            counterHero.energy += 5;
                            counterHero.skillLevel++;
                            counterHero.skillHurt += 3;
                            
                            sb.push(`\t但${counterHero.name}激活天赋${counterHero.talent1}由于时空错乱而重置双方部分数值,`);
                            let talentOption;
                            do {
                                talentOption = Math.floor(Math.random() * TALENTS.length);
                            } while (TALENTS[talentOption] === TALENTS[9]);
                            counterHero.talent1 = TALENTS[talentOption];
                            
                            sb.push(`并且天赋更换为->${counterHero.talent1}.\n`);
                            
                            this.blood1 = this.blood3;
                            this.armor1 = this.armor3;
                            this.energy -= 40;
                            
                            if (this instanceof NineTailedFox) this.life1 = 9;
                            if (counterHero instanceof NineTailedFox) counterHero.life1 = 9;
                        }
                    }
                }
                
                // 九尾妖狐  角色特性@九尾#
                if (counterHero instanceof NineTailedFox) {
                    if (counterHero.blood1 === 0 && counterHero.life1 > 1) {
                        sb.push(`\t此时${counterHero.name}以亡灵之力重铸亡灵之躯体。\n`);
                        counterHero.life1--;
                        counterHero.blood1 = counterHero.blood3;
                        counterHero.armor1 = counterHero.armor3;
                        if (counterHero.feature === "@九尾#") {
                            counterHero.hurtValue++;
                        } else if (counterHero.feature === "@死灵#") {
                            counterHero.criticalStrike += 2;
                        } else if (counterHero.feature === "@半仙#") {
                            randomIndex1 = Math.floor(Math.random() * 5);
                            sb.push(`\t${counterHero.name}触发角色特性${counterHero.feature}`);
                            if (randomIndex1 === 0) {
                                counterHero.life1++;
                                counterHero.blood3 += 3;
                                counterHero.blood1 = counterHero.blood3;
                                sb.push("判定成功！！！\n");
                            } else {
                                counterHero.blood3 += 5;
                                counterHero.blood1 = counterHero.blood3;
                                sb.push("判定失败！！！\n");
                            }
                        }
                    }
                } else if (counterHero.feature === "@修仙#" && counterHero.blood1 === 0
                        && counterHero.featureInfluence > 0) {
                    counterHero.blood3 = 10 * counterHero.featureInfluence;
                    counterHero.blood1 = counterHero.blood3;
                    counterHero.featureInfluence = 0;
                    sb.push(`\t此时${counterHero.name}激活角色特性${counterHero.feature}切换为第二形态！！！\n`);
                }
            }
            
            attackTimes--;
            if (attackTimes === 0) {
                if (this instanceof LotteryMan) {
                    this.hurtValue -= addHurtValueL;
                    this.criticalStrike -= addCriticalStrikeL;
                }
                this.energy += this.speed1;
                if (this.feature === "@蓄力斩#") {
                    randomIndex1 = this.speed1 - this.speed2;
                    switch (randomIndex1) {
                        case 0: this.hurtValue = this.hurtValue; break;
                        case 1: this.hurtValue = this.hurtValue - 15; break;
                        case 2: this.hurtValue = this.hurtValue - 32; break;
                        case 3: this.hurtValue = this.hurtValue - 50; break;
                        case 4: this.hurtValue = this.hurtValue - 70; break;
                    }
                    randomIndex1 = Math.floor(Math.random() * 5);
                    this.speed1 = this.speed2 + randomIndex1;
                    sb.push(`\t${this.name}激活角色特性${this.feature}下次攻速->${this.speed1}.\n`);
                    switch (randomIndex1) {
                        case 0: this.hurtValue = this.hurtValue; break;
                        case 1: this.hurtValue = this.hurtValue + 15; break;
                        case 2: this.hurtValue = this.hurtValue + 32; break;
                        case 3: this.hurtValue = this.hurtValue + 50; break;
                        case 4: this.hurtValue = this.hurtValue + 70; break;
                    }
                }
                

                sb.push(`\t   ${this.name}生命${this.life1},血量${this.blood1}/${this.blood3},护甲${this.armor1}/${this.armor3},能量：${this.energy};`);
                sb.push(`\n\t   ${counterHero.name}生命${counterHero.life1},血量${counterHero.blood1}/${counterHero.blood3},护甲${counterHero.armor1}/${counterHero.armor3},能量：${counterHero.energy}.\n`);
                
                log = sb.join('');
                addBattleLog(log);
            }
        }
    }
}