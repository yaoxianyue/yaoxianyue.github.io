// 具体英雄类定义
class Shooter extends Hero {
    constructor() {
        super();
        const names = ["[神箭手]", "[爱神箭意]", "[箭侠]"];
        const features = ["@命中#", "@爱心#", "@敏捷#"];
        const weapons = ["'神箭'", "'爱神之箭'", "'素羽箭'"];
        const armors = ["/神之大翼/", "/爱神风衣/", "/隐蔽之羽/"];
        const skills = ["<索命箭>", "<万箭齐发>", "<穿云箭>"];
        
        const index = Math.floor(Math.random() * 3);
        
        this.name = names[index];
        this.feature = features[index];
        this.weapon = weapons[index];
        this.armor = armors[index];
        this.skill = skills[index];
        
        this.career = "攻";
        this.blood1 = this.blood2 = this.blood3 = index == 1?
            796 + Math.floor(Math.random() * 15):
            785 + Math.floor(Math.random() * 11);
        this.hurtValue = index == 2?
            19 + Math.floor(Math.random() * 3):
            17 + Math.floor(Math.random() * 2);
        this.armor1 = this.armor2 = this.armor3 = [365, 372, 380][index];
        this.skillHurt = [60, 56, 52][index];
        this.skillLevel = 10 + Math.floor(Math.random() * 2); // 10-11
        this.speed1 = this.speed2 = 2;
        this.criticalStrike = index === 0 ? 18 : 17; // 神箭手18，其他17
        this.weaponHurt = [10, 9, 8][index];
        this.hurtValue += this.weaponHurt;
    }
}

class Rusher extends Hero {
    constructor() {
        super();
        const names = ["[刺客]", "[夺命杀手]", "[虚空剑客]"];
        const features = ["@疾行#", "@锋利#", "@隐匿#"];
        const weapons = ["'匕首'", "'饮血剑'", "'虚妄之剑'"];
        const armors = ["/夜袭刃甲/", "/血色轻甲/", "/虚妄之躯/"];
        const skills = ["<致命一击>", "<千刀万斩>", "<剑气之斩>"];
        
        const index = Math.floor(Math.random() * 3);
        
        this.name = names[index];
        this.feature = features[index];
        this.weapon = weapons[index];
        this.armor = armors[index];
        this.skill = skills[index];
        
        this.career = "攻";
        if(index == 2) this.blood1 = this.blood1 = this.blood2 = this.blood3 = 690 + Math.floor(Math.random() * 16);
        else this.blood1 = this.blood2 = this.blood3 = 680 + Math.floor(Math.random() * 10); 
        
        if(index == 1) this.hurtValue = 21 + Math.floor(Math.random() * 2); 
        else this.hurtValue = 21 + Math.floor(Math.random() * 2); 

        this.armor1 = this.armor2 = this.armor3 = [318, 312, 322][index];
        this.skillHurt = [60, 68, 64][index];
        this.skillLevel = 9 + Math.floor(Math.random() * 2); // 9-10
        this.speed1 = this.speed2 = 2;

        this.criticalStrike = index === 0 ? 
            18 + Math.floor(Math.random() * 2) : // 18-19
            17 + Math.floor(Math.random() * 2); // 17-18

        this.weaponHurt = [10, 12, 11][index];
        this.hurtValue += this.weaponHurt;
    }
}

class Giant extends Hero {
    constructor() {
        super();
        const names = ["[钢铁巨人]", "[绿巨人]", "[毒液]"];
        const features = ["@巨性#", "@暴怒#", "@七毒#"];
        const weapons = ["'巨人拳套'", "'巨兽之笼'", "'毒液之心'"];
        const armors = ["/钢铁之盔/", "/巨兽焚火/", "/毒液缠身/"];
        const skills = ["<正义之拳>", "<泰山压顶>", "<毒液缠绕>"];
        
        const index = Math.floor(Math.random() * 3);
        
        this.name = names[index];
        this.feature = features[index];
        this.weapon = weapons[index];
        this.armor = armors[index];
        this.skill = skills[index];
        
        this.career = "守";
        this.blood1 = this.blood2 = this.blood3 = index == 0 ?
            1876 + Math.floor(Math.random() * 25):
            1850 + Math.floor(Math.random() * 26);

        this.hurtValue = index == 2?
             30 + Math.floor(Math.random() * 2):
             29 + Math.floor(Math.random() * 2);

        this.armor1 = this.armor2 = this.armor3 = [870, 860, 850][index];
        this.skillHurt = [104, 100, 108][index];
        this.skillLevel = 11 + Math.floor(Math.random() * 2); // 11-12
        this.speed1 = this.speed2 = 7;

        this.criticalStrike = index === 1 ? 13 : 12; // 绿巨人13，其他12

        this.weaponHurt = [21, 22, 23][index];
        this.hurtValue += this.weaponHurt;
    }
}

class Enchanter extends Hero {
    constructor() {
        super();
        const names = ["[圣医之法]", "[恶魔之子]", "[巫妖之女]"];
        const features = ["@医道#", "@魔法#", "@妖魅#"];
        const weapons = ["'天使术环'", "'魔焰之心'", "'腐毒之水'"];
        const armors = ["/魔法圣袍/", "/恶魔披风/", "/魅影披风/"];
        const skills = ["<冰火创伤>", "<恶魔低语>", "<魔法异界>"];
        
        const index = Math.floor(Math.random() * 3);
        
        this.name = names[index];
        this.feature = features[index];
        this.weapon = weapons[index];
        this.armor = armors[index];
        this.skill = skills[index];
        
        this.career = "防";
        this.blood1 = this.blood2 = this.blood3 = index == 0?
            861 + Math.floor(Math.random() * 15):
            850 + Math.floor(Math.random() * 11);
        this.hurtValue = index == 2?
            23 + Math.floor(Math.random() * 2):
            20 + Math.floor(Math.random() * 2);
        this.armor1 = this.armor2 = this.armor3 = [298, 303, 308][index];
        this.skillHurt = [100, 105, 110][index];
        this.skillLevel = 23 + Math.floor(Math.random() * 2); // 23-24
        this.speed1 = this.speed2 = 4;
        this.criticalStrike = index === 1 ? 11 : 10; // 恶魔之子11，其他10
        this.energy = 40; // 初始能量
        this.weaponHurt = [16, 17, 16][index];
        this.hurtValue += this.weaponHurt;
    }
}

class AncientBeast extends Hero {
    constructor() {
        super();
        const names = ["[上古神兽]", "[封印之兽]", "[神界之兽]"];
        const features = ["@上古#", "@封锁#", "@神威#"];
        const weapons = ["'上古宝剑'", "'混沌之心'", "'神之惩戒'"];
        const armors = ["/上古鳞甲/", "/封印魔骨/", "/神界琥珀/"];
        const skills = ["<混沌打击>", "<雷神振奋>", "<痛苦之兆>"];
        
        const index = Math.floor(Math.random() * 3);
        
        this.name = names[index];
        this.feature = features[index];
        this.weapon = weapons[index];
        this.armor = armors[index];
        this.skill = skills[index];
        
        this.career = "攻";
        this.blood1 = this.blood2 = this.blood3 = index === 0 ?
            1541 + Math.floor(Math.random() * 20):
            1530 + Math.floor(Math.random() * 11);
        this.hurtValue = index === 2 ?
            42 + Math.floor(Math.random() * 2):
            40 + Math.floor(Math.random() * 3);
            
        this.armor1 = this.armor2 = this.armor3 = [735, 745, 755][index];
        this.skillHurt = [180, 185, 190][index];
        this.skillLevel = 19 + Math.floor(Math.random() * 2); // 19-20
        this.speed1 = this.speed2 = 11;
        this.criticalStrike = index === 1 ? 13 : 12; // 封印之兽13，其他12
        this.weaponHurt = [51, 50, 52][index];
        this.hurtValue += this.weaponHurt;
    }
}

class CrazyDemon extends Hero {
    constructor() {
        super();
        const names = ["[攻速狂魔]", "[疯狂魔兽]"];
        const features = ["@杀性#", "@反噬#"];
        const weapons = ["'魔兽之爪'", "'魔兽之音'"];
        const armors = ["/绯红魔衣/", "/猖狂兽性/"];
        const skills = ["<魔鬼缠绕>", "<狂魔之响>"];
        
        const index = Math.floor(Math.random() * 2);
        
        this.name = names[index];
        this.feature = features[index];
        this.weapon = weapons[index];
        this.armor = armors[index];
        this.skill = skills[index];
        
        this.career = "攻";
        this.blood1 = this.blood2 = this.blood3 = 1150 + Math.floor(Math.random() * 21); // 1150-1170
        this.hurtValue = 1;
        this.armor1 = this.armor2 = this.armor3 = [562, 570][index];
        this.skillHurt = [25, 28][index];
        this.skillLevel = 10 + Math.floor(Math.random() * 2); // 10-11
        this.speed1 = this.speed2 = 1;
        this.criticalStrike = index === 1 ? 11 : 10; // 疯狂魔兽11，其他10
        this.weaponHurt = [8, 7][index];
        this.hurtValue += this.weaponHurt;
    }

}

class IronMan extends Hero {
    constructor() {
        super();
        const names = ["[铁人王]", "[淬铁侠]"];
        const features = ["@铁甲#", "@淬铁#"];
        const weapons = ["'铁手勾爪'", "'淬火熔铁'"];
        const armors = ["/无双铁甲/", "/淬火涅槃/"];
        const skills = ["<斩钉截铁>", "<三重淬炼>"];
        
        const index = Math.floor(Math.random() * 2);
        
        this.name = names[index];
        this.feature = features[index];
        this.weapon = weapons[index];
        this.armor = armors[index];
        this.skill = skills[index];
        
        this.career = "防";
        this.blood1 = this.blood2 = this.blood3 = 800 + Math.floor(Math.random() * 21); // 800-820
        this.hurtValue = index == 0?
            19 + Math.floor(Math.random() * 2):
            18 + Math.floor(Math.random() * 2);
        this.armor1 = this.armor2 = this.armor3 = [1650, 1662][index];
        this.skillHurt = [70, 72][index];
        this.skillLevel = 11 + Math.floor(Math.random() * 2); // 11-12
        this.speed1 = this.speed2 = 5;
        this.criticalStrike = index === 1 ? 12 : 11; // 铁人王11，淬铁侠12
        this.weaponHurt = [21, 20][index];
        this.hurtValue += this.weaponHurt;
    }
}

class MysteryMan extends Hero {
    constructor() {
        super();
        const names = ["[神秘人]", "[神秘世家]"];
        const features = ["@神秘#", "@秘技#"];
        const weapons = ["'神秘吹笛'", "'神秘法咒'"];
        const armors = ["/神秘披风/", "/神秘衣甲/"];
        const skills = ["<神秘破伤>", "<神秘追击>"];
        
        const index = Math.floor(Math.random() * 2);
        
        this.name = names[index];
        this.feature = features[index];
        this.weapon = weapons[index];
        this.armor = armors[index];
        this.skill = skills[index];
        
        this.career = "守";
        this.blood1 = this.blood2 = this.blood3 = 850 + Math.floor(Math.random() * 16); // 850-865
        this.hurtValue = 10;
        this.armor1 = this.armor2 = this.armor3 = [415, 422][index];
        this.skillHurt = [72, 105][index];
        this.skillLevel = 10 + Math.floor(Math.random() * 2); // 10-11
        this.speed1 = this.speed2 = 4;
        this.criticalStrike = index === 1 ? 13 : 12; // 神秘世家13，其他12
        this.weaponHurt = [5, 6][index];
        this.hurtValue += this.weaponHurt;
    }
}

class LotteryMan extends Hero {
    constructor() {
        super();
        const names = ["[小抽奖家]", "[抽奖大师]"];
        const features = ["@幸运#", "@老练#"];
        const weapons = ["'抽奖箱'", "'幸运棒'"];
        const armors = ["/幸运星环/", "/幸运护甲/"];
        const skills = ["<百变抽奖>", "<厄运迸发>"];
        
        const index = Math.floor(Math.random() * 2);
        
        this.name = names[index];
        this.feature = features[index];
        this.weapon = weapons[index];
        this.armor = armors[index];
        this.skill = skills[index];
        
        this.career = "守";
        this.blood1 = this.blood2 = this.blood3 = 1100 + Math.floor(Math.random() * 20); // 1100-1119
        this.hurtValue = 35;
        this.armor1 = this.armor2 = this.armor3 = [570, 540][index];
        this.skillHurt = [105, 110][index];
        this.skillLevel = 12 + Math.floor(Math.random() * 2); // 12-13
        this.speed1 = this.speed2 = 3;
        this.criticalStrike = 10;
        this.weaponHurt = [0, 0][index];
        this.hurtValue += this.weaponHurt;
    }
}

class NineTailedFox extends Hero {
    constructor() {
        super();
        const names = ["[九尾妖狐]", "[死灵妖狐]", "[不死妖狐]"];
        const features = ["@九尾#", "@死灵#", "@半仙#"];
        const weapons = ["'死灵爪'", "'死灵眼'", "'妖仙爪'"];
        const armors = ["/死灵*源/", "/死灵*仟/", "/死灵*梦/"];
        const skills = ["<九尾怨灵>", "<苦灵咒>", "<妖仙袭香>"];
        
        const index = Math.floor(Math.random() * 3);
        
        this.name = names[index];
        this.feature = features[index];
        this.weapon = weapons[index];
        this.armor = armors[index];
        this.skill = skills[index];
        
        this.career = "防";
        this.life1 = this.life2 = 9; // 9条命
        this.blood1 = this.blood2 = this.blood3 = 168;
        this.hurtValue = index === 1 ? 11 : 10; // 死灵妖狐11，其他10
        this.armor1 = this.armor2 = this.armor3 = [78, 81, 75][index];
        this.skillHurt = [48, 52, 50][index];
        this.skillLevel = 12 + Math.floor(Math.random() * 2); // 12-13
        this.speed1 = this.speed2 = 3;
        this.criticalStrike = 11 + Math.floor(Math.random() * 2); // 11-12
        this.weaponHurt = [8, 9, 6][index];
        this.hurtValue += this.weaponHurt;
    }
}

class LongRen extends Hero {
    constructor() {
        super();
        const names = ["[小龙人]", "[金耀狂龙]"];
        const features = ["@真龙之力#", "@龙魂显现#"];
        const weapons = ["'真龙之息'", "'金龙圣爪'"];
        const armors = ["/真龙之鳞/", "/金龙之体/"];
        const skills = ["<龙傲之怒>", "<神耀之光>"];
        
        const index = Math.floor(Math.random() * 2);
        
        this.name = names[index];
        this.feature = features[index];
        this.weapon = weapons[index];
        this.armor = armors[index];
        this.skill = skills[index];
        
        this.career = "攻";
        this.blood1 = this.blood2 = this.blood3 = 750;
        this.hurtValue = index === 0 ? 5: 30;
        this.armor1 = this.armor2 = this.armor3 = [775, 925][index];
        this.skillHurt = [70, 80][index];
        this.skillLevel = index === 0 ? 10 : 12;
        this.speed1 = this.speed2 = 5;
        this.criticalStrike = index === 1 ? 10 : 12; // 金耀狂龙10-18，小龙人12
        this.weaponHurt = [9, 21][index];
        this.hurtValue += this.weaponHurt;
    }
}

class Twin extends Hero {
    constructor() {
        super();
        const names = ["[均衡]", "[矛盾]", "[陆翼]"];
        const features = ["@并肩#", "@切换#", "@再生#"];
        const weapons = ["'双笙铃'", "'盾宙矛雷'", "'飞横之羽'"];
        const armors = ["/均防/", "/矛盾胄甲/", "/飞翼/"];
        const skills = ["<铃漫>", "<劈行>", "<坠击>"];
        
        const index = Math.floor(Math.random() * 3);
        
        this.name = names[index];
        this.feature = features[index];
        this.weapon = weapons[index];
        this.armor = armors[index];
        this.skill = skills[index];
        
        this.career = "守";
        this.blood1 = this.blood3 = [641, 565, 715][index];
        this.blood2 = this.blood4 = [645, 870, 715][index];

        this.hurtValue = [21, 30, 24][index];

        this.armor1 = this.armor3 = [320, 285, 320][index];
        this.armor2 = this.armor4 = [325, 450, 320][index];

        this.skillHurt = [80, 85, 75][index];
        this.skillLevel = 10;

        this.speed1 = this.speed2 = 3;
        this.criticalStrike = [11, 12, 12][index];

        this.weaponHurt = [16, 20, 18][index];
        this.hurtValue += this.weaponHurt;
    }
}

class God extends Hero {
    constructor() {
        super();
        const names = ["[彩虹人]", "[元气剑仙]", "[仙人]"];
        const features = ["@彩虹糖#", "@蓄力斩#", "@修仙#"];
        const weapons = ["'七彩棱镜'", "'十八般剑'", "'仙气'"];
        const armors = ["/彩虹屏障/", "/元气阵/", "/仙衣/"];
        const skills = ["<光彩射线>", "<次元斩>", "<控仙神力>"];
        
        const index = Math.floor(Math.random() * 3);
        
        this.name = names[index];
        this.feature = features[index];
        this.weapon = weapons[index];
        this.armor = armors[index];
        this.skill = skills[index];
        
        this.career = "守";
        this.blood1 = this.blood2 = this.blood3 = [1000, 999, 888][index];
        this.hurtValue = [23, 11, 10][index];
        this.armor1 = this.armor2 = this.armor3 = [500, 499, 425][index];
        this.skillHurt = [100, 135, 50][index];
        this.skillLevel = [12, 11, 13][index];
        this.speed1 = this.speed2 = [4, 2, 3][index];
   
        this.criticalStrike = [10, 11, 12][index];
        this.weaponHurt = [13, 10, 9][index];
        this.hurtValue += this.weaponHurt;
    }
}
