// 在 game.js 文件末尾添加以下代码

// 创建说明书弹框元素
function createInstructionsModal() {
    // 检查是否已经创建过弹框
    if (document.getElementById('instructionsModal')) return;

    const modal = document.createElement('div');
    modal.id = 'instructionsModal';
    modal.className = 'modal';

    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <div class="modal-header">
                <h2>游戏副本说明书</h2>
            </div>
            <div class="modal-body" id="instructionsContent">
                <p>加载中...</p>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // 获取关闭按钮和模态框
    const closeBtn = modal.querySelector('.close');
    const modalContent = modal.querySelector('.modal-content');

    // 关闭模态框事件
    closeBtn.onclick = function () {
        modal.style.display = 'none';
    }

    // 点击模态框外部关闭
    modal.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }

    // ESC键关闭
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

// 显示说明书
function showInstructions() {
    const modal = document.getElementById('instructionsModal');
    const content = document.getElementById('instructionsContent');

    if (modal) {

        content.innerHTML = `
            <h3>游戏副本说明</h3>
            <p>欢迎来到英雄格斗游戏副本！这是一款策略性回合制对战游戏。</p>
            <br>
            <h4>1.游戏规则：</h4>
            <ul>
                <li>1.1 每位玩家选择一个英雄角色进行对战</li>
                <li>1.2 英雄拥有血量、护甲、能量等属性</li>
                <li>1.3 游戏通过回合制进行，英雄根据速度属性决定攻击顺序</li>
                <li>1.4 当一方英雄血量降为0时，另一方获胜</li>
                <li>1.5 游戏时间限制为1500秒，超时后血量高者获胜</li>
            </ul>
            <br>
            <h4>2.英雄属性：</h4>
            <ul>
                <li><strong>2.1 血量：</strong>英雄的生命值，降为0时英雄死亡</li>
                <li><strong>2.2 护甲：</strong>吸收伤害的防护值</li>
                <li><strong>2.3 能量：</strong>释放技能需要消耗的能量值</li>
                <li><strong>2.4 速度：</strong>决定攻击频率，数值越小攻击越快</li>
                <li><strong>2.5 暴击：</strong>影响暴击概率</li>
            </ul>
            <br>
            <h4>3.英雄特性：</h4>
            <p>每个英雄都有独特的特性和天赋，合理利用可以扭转战局。</p>
            <br>
            <h4>4.战斗机制：</h4>
            <ul>
                <li>4.1 普通攻击：基础攻击方式</li>
                <li>4.2 技能攻击：消耗能量值，造成更高伤害</li>
                <li>4.3 天赋技能：特殊能力，每个英雄都有独特天赋</li>
            </ul>
            <br>
            <h4>5.胜利条件：</h4>
            <ul>
                <li>5.1 将对手英雄血量降至0</li>
                <li>5.2 游戏时间结束时血量较高的一方获胜</li>
            </ul>
            <br>        
            <h4>6.天赋介绍：</h4>
            <ul>
                <li><strong>6.1 <<圣灵之体>> :</strong></li>
                    自己当前回合1/4概率<br>
                    恢复血量为（最大血量的1/90取整数部分 + 速度 * 5）<br>
                    独立另外又有1/7概率恢复护甲（最大护甲的1/12）。<br>

                <li><strong>6.2 <<一线生机>> :</strong></li>
                    当血量为0时，触发该天赋，血量重置为1，<br>
                    护盾重置为最大护盾的4/5，普攻伤害为增加暴击后伤害（仅触发一次）。<br>
                
                <li><strong>6.3 <<嗜血本性>> :</strong></li>
                    每次攻击都有90%概率将对敌方造成伤害的2/3转化为恢复血量。 <br>
                
                <li><strong>6.4 <<吸星大法>> :</strong></li>
                    当血量低于最大血量的1/2，有33%概率将自己的<br>
                    血量、能量（不可突破最大血量上限）、<br>
                    普攻伤害和暴击率设置为双方中数值较高的一方（仅触发一次）。<br>
                    但吸收的伤害和暴击率数值不能超过自己属性的4/5.<br>
                    保底血量 + 300，能量 + 50，攻击 + 9，暴击率 + 5<br>
                    <strong><<吸魂大法>> : </strong><br>
                    触发完吸星大法之后晋升为吸魂大法（可以释放两次），<br>
                    每次攻击完后都有1/10的概率触发该天赋，会对敌方进行一次吸魂，<br>
                    第一次敌方攻击-10%（最少-1）；<br>
                    第二次敌方暴击率 -3；<br>
                    （且其吸收攻击数值的10倍转化为自己的血量以及上限）<br>
                
                <li><strong>6.5 <<起死回生>> :</strong></li>
                    当血量为0时，触发该天赋，血量重置为最大血量的4/5.（仅触发一次）。<br>
                    （特别的）而对于九尾相当于增加4条命.<br>
                
                <li><strong>6.6 <<速行连招>> :</strong></li>
                    m=5开始,每次攻击有2/m触发该天赋,触发后m*=2,<br>
                    （如2/5概率触发后，1/5概率还可触发该天赋，<br>
                    若再次触发，则还可以1/10再次触发，以此类推，可无限叠加）<br>
                    最终造成伤害为：伤害 * n（但最终仅对单体数值造成分段合成伤害）。<br>
                
                <li><strong>6.7 <<神秘笔记>> :</strong></li>
                    当前回合每次攻击都有1/5概率触发该天赋并有以下概率撕下其中一个书页，<br>
                    有如下效果：<br>
                    死亡书页（敌方血量需大于0）：<br>
                        3/100的概率,若对方血量小于等于自己攻击力的两倍时则秒杀敌方，<br>
                        否则其他情况只能将敌方血量设置为1<br>
                       （可无视护甲，但敌方仍可生效天赋<<一线生机>>和<<起死回生>>）<br>
                    滋生书页：37/100的概率恢复最大血量的1/12的血量;<br>
                    张狂书页：20/100的概率增强普攻伤害为当前的1.16倍<br>
                    暴力书页：15/100的概率增强暴击率为当前的1.2倍<br>
                    浴血书页：25/100的概率降低敌方最大血量上限的1/6<br>
                
                <li><strong>6.8 <<扼杀天性>> :</strong></li>
                    第一次处在自己回合时禁锢对方的天赋,并使得对方速度设置为（敌方速度 + 1）<br>
                    但代价是降低自己的血量上限为原来的3/4,护甲值降低为原来的3/4（仅触发一次）。<br>
                
                <li><strong>6.9 <<天生狂战>> :</strong></li>
                    每次攻击后都有1/7概率触发该天赋，失去当前血量的1/12，<br>
                    并增加攻击为当前攻击的1.25倍。<br>
                
                <li><strong>6.10 <<时间倒转>> :</strong></li>
                    当持有该天赋的角色死亡时会触发该天赋，<br>
                    该角色与对战角色双方生命、血量、护甲均重置为当前最大上限。<br>
                     但由于掌握时间能力，该角色的能量不会被重置，反而+5，而对方能量将-40，<br>
                     自己的技能释放率将+1，技能伤害固定 + 3，<br>
                     并且将重新更换天赋。(仅触发一次,即触发完后，不会更换到当前天赋)<br>
                     （特别的）不会抹除之前天赋或特性已经产生的影响<br>
                
                <li><strong>6.11 <<死亡斩杀>> :</strong></li>
                    有12次释放的机会，每次对敌方造成85点额外伤害,<br>
                    每次攻击后释放的几率为33%。<br>
                
                <li><strong>6.12 <<传奇护符>> :</strong></li>
                    开局30s无敌护盾，可免疫敌方对自己造成的所有伤害和天赋效果
                    （角色特性无法免疫）<br>
                   (即在无敌时间内，对方的<<吸星大法>>、<br>
                   <<神秘笔记>>死亡书页和浴血书页、<<扼杀天性>>、<<时间倒转>>都无法释放)<br>
                    每70s会刷新下一个30s无敌护盾，全局游戏有5次无敌护盾<br>
                    并且相当于游戏时间500s以及之后，<br>
                    再获得20%的血量和血量上限，此后护符就此失效。<br>
                
                <li><strong>6.13 <<武魂真身>> :</strong></li>
                    冷却时间结束50%几率激活该天赋（开局无冷却），镜像出三头六臂，n = 3，<br>
                    武魂期间打出的伤害增强为暴击伤害，且敌方击中假象伤害为1/n,假象可以再生，<br>
                    但敌方1/2n概率击中真身伤害为2倍，此时镜像才会减少,即n = n-1<br>
                    n = 1时，天赋进入冷却状态，28s刷新cd；<br>
            </ul>

            <br>        
            <h4>7.英雄介绍：</h4>
            <ul>
                <li><strong>7.1 🏹 箭手 :</strong></li>
                    <strong>(1)神箭手-@命中#</strong><br>
                    （33%几率无视对方护甲,并打出133%的伤害 偏向暴击<br>
                    <strong>(2)爱神箭意-@爱心#</strong><br>
                    （12%几率将获取攻击敌方的血量）偏向血量<br>
                    <strong>(3)箭侠-@敏捷#</strong><br>
                    （10%躲避对方一次伤害，特别的，无法躲避魔法师的减速效果）偏向攻击<br>
                <br>
                <li><strong>7.2 🗡️ 突袭者 :</strong></li>
                    <strong>(4)刺客-@疾行#</strong><br>
                    （25%几率下次攻速加快）偏向暴击<br>
                    <strong>(5)夺命杀手-@锋利#</strong><br>
                    （若对方有护甲，则额外14%伤害穿透至本体伤害）偏向攻击<br>
                    <strong>(6)虚空剑客-@隐匿#</strong><br>
                    （25%几率进入隐匿状态，下次攻击速度减慢，<br>
                    但期间60%几率规避对方伤害）偏向血量<br>
                <br>
                <li><strong>7.3 🦾 巨人 :</strong></li>
                    <strong>(7)钢铁巨人-@巨性#</strong><br>
                    （血量提升30%）偏向血量<br>
                    <strong>(8)绿巨人-@暴怒#</strong><br>
                    （当自己的血量低于90%时，暴击率翻为6倍）偏向暴击<br>
                    <strong>(9)毒液-@七毒#</strong><br>
                    （33%几率对自己的攻击叠加毒素，<br>
                    每次增加2点伤害，最高7层）偏向攻击 <br>
                <br>
                <li><strong>7.4 ⚖️ 双子 :</strong></li>
                    <strong>(10)均衡-@并肩#</strong><br>
                     20%概率切换为均和衡的另一方，<br>
                    切换完毕各恢复9点生命(若另一方血量多于本方，则概率提升至25%)<br>
                    <strong>(11)矛盾-@切换#</strong><br>
                     20%概率切换为矛和盾的另一方，切换为矛生命恢复10，<br>
                    切换为盾护甲恢复5(若另一方血量多于本方，则概率提升至25%)<br>
                    <strong>(12)陆翼-@再生#</strong><br>
                    20%概率再生出‘飞翼’，新覆盖旧即重置，<br>
                    飞翼状态下攻击升高，速度加快，并且有16%的闪避,<br>
                    如果是翼->翼状态，则护甲上限也会增加25，伤害增加1。(全局五次再生)<br>
                <br>
                <li><strong>7.5 🦊 九尾妖狐 :</strong></li>
                    <strong>(13)九尾妖狐-@九尾#</strong><br>
                    （每失去一条生命后，攻击力提升1点）<br>
                    <strong>(14)死灵妖狐-@死灵#</strong><br>
                    （每失去一条命后，暴击率提升2点，无后摇）<br>
                    <strong>(15)不死妖狐-@半仙#</strong><br>
                    （每失去一条命后，都会进行一次判定，<br>
                    20%几率判定成功，本次生命不会失去，并获得3点血量上限<br>
                    判定失败，则只获得5点血量上限）<br>
                <br>
                <li><strong>7.6 🔮 奇人 :</strong></li>
                    <strong>(16)神秘人-@神秘#</strong><br>
                    （25%概率打出最高百分比伤害效果）<br>
                    <strong>(17)神秘世家-@秘技#</strong><br>
                    （技能伤害提高）被动<br>
                <br>
                <li><strong>7.7 🎰 抽奖家 :</strong></li>
                    <strong>(18)小抽奖家-@幸运#</strong><br>
                    （每次当前回合有12%的概率更换自己的天赋,<br>
                    每次更换都能恢复85点血量（仅对当前天赋依旧存在时）<br>
                    <strong>(19)抽奖大师-@老练#</strong><br>
                    （每次随机到的攻击 + 1，暴击 + 1）<br>
                <br>
                <li><strong>7.8 🐉 龙人 :</strong></li>
                    <strong>(20)小龙人-@真龙之力#</strong><br>
                        （每次当前回合都有25%的几率<br>
                        吸收真龙之力增强自己，增加数值如上<br>
                        但每次增强后，下一次攻击速度+1,全局一共五次吸收次数<br>
                        龙人的护甲有25%的概率免伤50%，一旦护甲破裂<br>
                        血量及上限+100，攻击力+5，技能伤害+8,<br>
                        并且每次攻击都有25%概率下一次攻击速度-1,）<br>
                    <strong>(21)金耀狂龙-@龙魂显现#</strong><br>
                        （每次当前回合都有20%的几率<br>
                        让龙魂显现,数值变化如上，<br>
                        每次显现后，血量上升，下一次攻击速度减慢，<br>
                        攻击降低，但暴击率升高，全局一共3次显现）<br>
                    
                <br>
                <li><strong>7.9 🤖 铁人 :</strong></li>
                    <strong>(22)铁人王-@铁甲#</strong><br>
                    （护甲吸收伤害20%）偏向攻击<br>
                    <strong>(23)淬铁侠-@淬铁#</strong><br>
                    （护甲提高30%）偏向暴击<br>
                <br>
                <li><strong>7.10 🧙 法师 :</strong></li>
                    <strong>(24)圣医之法-@医道#</strong><br>
                        （25%几率本次攻击转化为治疗，<br>
                        治疗血量为攻击伤害2.2倍，<br>
                        若释放技能，则为技能伤害2.2倍,<br>
                        满血时可增加血量上限，最多不超出1400<br>
                        但期间无法触发天赋）偏向血量<br>
                    <strong>(25)恶魔之子-@魔法#</strong><br>
                        （每次攻击对方有效则会减速对方，<br>
                        即对方速度+1，对方攻击到自己解除效果<br>
                        同时吸收对方能量，即对方-1，自己+2,不管对方有无均可）偏向暴击<br>
                    <strong>(26)巫妖之女-@妖魅#</strong><br>
                    （11%的几率让对方每次攻击受到制裁几率<br>
                        提升10%，最多上限为50%）偏向攻击<br>
                <br>
                <li><strong>7.11 😈 疯魔 :</strong></li>
                    <strong>(27)攻速狂魔-@杀性#</strong><br>
                    （5%几率叠加伤害，每次+1，最高2层）偏向攻击<br>
                    <strong>(28)疯狂魔兽-@反噬#</strong><br>
                    （敌方16%概率50%的伤害攻击到敌方，50%伤害攻击到自己<br>
                        反噬伤害无视对方角色特性但无法反噬至对方死亡）偏向暴击<br>
                <br>
                <li><strong>7.12 🐾 古兽 :</strong></li>
                    <strong>(29)上古神兽-@上古#</strong><br>
                    （所受的伤害吸收20%）偏向血量<br>
                    <strong>(30)封印之兽-@封锁#</strong><br>
                    （50%几率让对方下次攻速增加一倍）偏向暴击<br>
                    <strong>(31)神界之兽-@神威#</strong><br>
                    （33%的几率在对方攻击自己时伤害减半）偏向攻击<br>
                <br>
                <li><strong>7.13 🌟 天神 :</strong></li>
                    <strong>(32)彩虹人-@彩虹糖#</strong><br>
                     7颗彩虹糖，20%几率随机获得一种增益效果<br>
                        +5攻击 or +100血量以及上限 or +50护甲以及上限 or +50能量<br>
                        7颗彩虹糖吃完，获得永久攻速加快1点<br>
                    <strong> (33)元气剑仙-@蓄力斩#</strong><br>
                     初始攻速为2，下次攻速重置，<br>
                        攻击力随攻速变化，攻速越慢，秒伤越高<br>
                    <strong>(34)仙人-@修仙#</strong><br>
                        有两种形态，二形态根据游戏时长决定血量但护甲为一二形态共用，<br>
                        具体描述如上数据，游戏时间每经过80s,攻击+3<br>
            </ul>
        `;
        modal.style.display = 'block';
    }
}

// 初始化说明书功能
document.addEventListener('DOMContentLoaded', function () {
    // 创建说明书弹框
    createInstructionsModal();

    // 绑定说明书按钮事件
    const instructionsBtn = document.getElementById('instructionsBtn');
    if (instructionsBtn) {
        instructionsBtn.addEventListener('click', showInstructions);
    }
});