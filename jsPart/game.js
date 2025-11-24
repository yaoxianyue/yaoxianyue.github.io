// 1.游戏状态
let battleInterval = null; 
let times = 1;
const gameState = {
    gameStarted: false,
    currentPlayer: 0,
    team1: [],
    team2: [],
    battleLog: [],
    battleResults: {
        team1Wins: 0,
        team2Wins: 0
    }
};
// 添加更新倍数的函数
function updateMultiplier() {
    const multiplierSelect = document.getElementById('multiplierSelect');
    if (multiplierSelect) {
        times = parseInt(multiplierSelect.value);
    }
}

// 2.添加战斗日志
function addBattleLog(log) {
    gameState.battleLog.push(log);
    const logElement = document.getElementById('gameLog');
    logElement.innerHTML += `<div class="log-entry">${log}</div>`;
    logElement.scrollTop = logElement.scrollHeight;
}
// 2.创建英雄
function createHero(characterType) {
    switch (characterType) {
        case 'Shooter':
            return new Shooter();
        case 'Rusher':
            return new Rusher();
        case 'Giant':
            return new Giant();
        case 'Enchanter':
            return new Enchanter();
        case 'AncientBeast':
            return new AncientBeast();
        case 'CrazyDemon':
            return new CrazyDemon();
        case 'MysteryMan':
            return new MysteryMan();
        case 'LotteryMan':
            return new LotteryMan();
        case 'NineTailedFox':
            return new NineTailedFox();
        case 'LongRen':
            return new LongRen();
        case 'Twin':
            return new Twin();
        case 'God':
            return new God();
        case 'IronMan':
            return new IronMan();
            
    }
}

// 3.更新英雄显示
function updatePlayerDisplay(playerIndex) {
    const player = playerIndex === 0 ? gameState.team1[0] : gameState.team2[0];
    const prefix = playerIndex === 0 ? 'player1' : 'player2';

    document.getElementById(`${prefix}Name`).textContent = player.name;
    document.getElementById(`${prefix}Blood`).textContent = player.blood1;
    document.getElementById(`${prefix}MaxBlood`).textContent = player.blood3;
    document.getElementById(`${prefix}Armor`).textContent = player.armor1;
    document.getElementById(`${prefix}MaxArmor`).textContent = player.armor3;
    document.getElementById(`${prefix}Energy`).textContent = player.energy;
    document.getElementById(`${prefix}Talent`).textContent = player.talent1;
    document.getElementById(`${prefix}Feature`).textContent = player.feature;
    document.getElementById(`${prefix}Life`).textContent = player.life1;
    document.getElementById(`${prefix}Hurt`).textContent = player.hurtValue;
    document.getElementById(`${prefix}Speed`).textContent = player.speed1;

    // 更新血量条
    const bloodPercent = player.blood3 > 0 ? (player.blood1 / player.blood3) * 100 : 0;
    document.getElementById(`${prefix}BloodBar`).style.width = `${Math.max(0, bloodPercent)}%`;

    // 更新护甲条
    const armorPercent = player.armor3 > 0 ? (player.armor1 / player.armor3) * 100 : 0;
    document.getElementById(`${prefix}ArmorBar`).style.width = `${Math.max(0, armorPercent)}%`;

    // 更新能量条
    const energyPercent = player.energy > 0 ? Math.min(100, player.energy / 2) : 0;
    document.getElementById(`${prefix}EnergyBar`).style.width = `${energyPercent}%`;

    // 高亮当前玩家
    const playerElement = document.getElementById(prefix);
    if (playerIndex === gameState.currentPlayer) {
        playerElement.classList.add('active');
    } else {
        playerElement.classList.remove('active');
    }
}


// 5.选择角色
function selectCharacter(characterType, element) {
    if (gameState.gameStarted) return;

    // 移除之前的选择
    document.querySelectorAll('.character-card').forEach(card => {
        card.classList.remove('selected');
    });

    element.classList.add('selected');

    // 选择角色
    const config = createHero(characterType);
    if (gameState.team1.length == 0) {
        gameState.team1 = [config];
        addBattleLog(`玩家1选择了 ${config.name}`);
    } else if (gameState.team2.length == 0) {
        gameState.team2 = [config];
        addBattleLog(`玩家2选择了 ${config.name}`);
        // 开始游戏
        startGame();
    }
}
// 6.更新游戏状态
function updateGameStatus() {
    let nowPlayerName = gameState.currentPlayer == 0 ? team1[0].name : team2[0].name;
    if (gameState.currentPlayer == 0) document.getElementById('gameStatus').textContent = `${nowPlayerName} 的回合`;
}
// 7.开始游戏
function startGame() {
    if (gameState.team1.length == 0 || gameState.team2.length == 0) {
        alert('请为两位玩家选择角色！');
        return;
    }
     // 获取当前选择的倍数
     updateMultiplier();
     // 禁用倍数选择器
    const multiplierSelect = document.getElementById('multiplierSelect');
    if (multiplierSelect) {
        multiplierSelect.disabled = true;
    }
    // 显示战斗区域
    document.getElementById('characterSelection').style.display = 'none';
    document.getElementById('battleArea').style.display = 'block';

    // 更新UI
    updatePlayerDisplay(0);
    updatePlayerDisplay(1);

    gameState.gameStarted = true;
    gameState.currentPlayer = 0;

    
    // 开始战斗循环
    simulateBattle();
}

// 8.重置游戏状态
function resetGame() {
    if(battleInterval){
        clearInterval(battleInterval);
        battleInterval = null;
    }
    gameState.team1 = [];
    gameState.team2 = [];

    gameState.currentPlayer = 0;
    gameState.gameStarted = false;
    gameState.battleLog = [];

    gameState.battleResults.team1Wins = 0;
    gameState.battleResults.team2Wins = 0;

     // 启用倍数选择器
     const multiplierSelect = document.getElementById('multiplierSelect');
     if (multiplierSelect) {
         multiplierSelect.disabled = false;
     }
     
     
    // 重置UI
    document.getElementById('characterSelection').style.display = 'grid';
    document.getElementById('battleArea').style.display = 'none';

    document.querySelectorAll('.character-card').forEach(card => {
        card.classList.remove('selected');
    });

    document.getElementById('gameLog').innerHTML = '<div class="log-entry">欢迎来到英雄格斗游戏！</div>';
    document.getElementById('gameStatus').textContent = '选择角色开始战斗！';
}


// 9.模拟战斗
function simulateBattle() {
    let second = 0; // 时间
    let player1Flag = 0; // 玩家1是否能进攻
    let player2Flag = 0; // 玩家2是否能进攻 
    battleInterval = setInterval(() => {
        if (gameState.battleResults.team1Wins == 1 || gameState.battleResults.team2Wins == 1) {
            clearInterval(battleInterval);
            endBattle();
            return;
        }
        second++;
        document.getElementById('gameStatus').textContent = '游戏时间：' + second + '秒';
        if (second > 1500) {
            addBattleLog("游戏时间结束,由角色血量高者判断输赢!!!");
            if (gameState.team1[0].blood1 >= gameState.team2[0].blood1) {
                gameState.battleResults.team1Wins = 1;
            } else {
                gameState.battleResults.team2Wins = 1;
            }
            return;
        }
        let selectOne; // 选择一个角色
        let selectTwo; // 选择第二个角色
        // 场外天赋、特性判定
        for (let i = 0; i < 2; i++) {
            if (i == 0) selectOne = gameState.team1[0];
            else selectOne = gameState.team2[0];
            if (selectOne.talent1 == "<<传奇护符>>") {
                if (selectOne.talentInfluence > 0 && selectOne.talentInfluence < 500) {
                    selectOne.talentInfluence = second;
                }
            } else if (selectOne.talent1 == "<<武魂真身>>") {
                if (selectOne.talentInfluence > 3) {
                    selectOne.talentInfluence++;
                    if (selectOne.talentInfluence == 32) {
                        selectOne.talentInfluence = 1;
                    }

                }
            }

            if (selectOne.feature == "@修仙#") {
                if (selectOne.featureInfluence != 0) {
                    selectOne.featureInfluence == second;
                }
                if (second % 80 == 0) {
                    selectOne.hurtValue += 3;
                }
            }
        }

        //  是否攻击判定
        for (let i = 0; i < 2; i++) {
            if (i == 0) selectOne = gameState.team1[0];
            else selectOne = gameState.team2[0];

            selectOne.pastSecond = second - selectOne.lastSecond;
            if (selectOne.speed1 == selectOne.pastSecond) {
                if (i == 0) player1Flag = 1;
                else if (i == 1) player2Flag = 1;

                selectOne.lastSecond = second;
                selectOne.pastSecond = 0;
            }
        }
        // 攻击判定
        if (player1Flag == 0 && player2Flag == 0) return;
        addBattleLog(`<---------------(时间：${second})--------------->`);
        if (player1Flag == 1 && player2Flag != 1) {
            gameState.currentPlayer = 0;
            gameState.team1[0].attack(gameState.team2[0]);
            // 更新UI
            updatePlayerDisplay(0);
            updatePlayerDisplay(1);
            if (gameState.team2[0].blood1 <= 0) {
                gameState.battleResults.team1Wins = 1;
                return;
            }
        } else if (player1Flag != 1 && player2Flag == 1) {
            gameState.currentPlayer = 1;
            gameState.team2[0].attack(gameState.team1[0]);
            // 更新UI
            updatePlayerDisplay(0);
            updatePlayerDisplay(1);
            if (gameState.team1[0].blood1 <= 0) {
                gameState.battleResults.team2Wins = 1;
                return;
            }
        } else if ((player1Flag == 1 && player2Flag == 1)) {
            let randomOne = Math.floor(Math.random() * 2);
            selectOne = randomOne == 0 ? gameState.team1[0] : gameState.team2[0];
            selectTwo = randomOne == 0 ? gameState.team2[0] : gameState.team1[0];
            gameState.currentPlayer = randomOne;
            selectOne.attack(selectTwo);
            // 更新UI
            updatePlayerDisplay(0);
            updatePlayerDisplay(1);
            if (selectTwo.blood1 <= 0) {
                if (randomOne == 0) {
                    gameState.battleResults.team1Wins = 1;
                } else {
                    gameState.battleResults.team2Wins = 1;
                }
                return;
            }
            gameState.currentPlayer = 1 - randomOne;
            selectTwo.attack(selectOne);
            // 更新UI
            updatePlayerDisplay(0);
            updatePlayerDisplay(1);
            if (selectOne.blood1 <= 0) {
                if (randomOne == 0) {
                    gameState.battleResults.team2Wins = 1;
                } else {
                    gameState.battleResults.team1Wins = 1;
                }
                return;
            }

        }

        player1Flag = 0;
        player2Flag = 0;
    }, (500 / times)); // 每500,250ms,125ms执行一次，加速战斗

}

// 结束战斗
function endBattle() {
    gameState.gameStarted = false;
    if (gameState.battleResults.team1Wins == 1) {
        addBattleLog(`${gameState.team1[0].name}击败了${gameState.team2[0].name},
    ${gameState.team1[0].name}获胜！！！`);
    } else {
        addBattleLog(`${gameState.team2[0].name}击败了${gameState.team1[0].name},
    ${gameState.team2[0].name}获胜！！！`);
    }

}