const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'mapatest97.aternos.me', // substitua pelo IP do seu Aternos
  port: 18180,                      // mantenha a porta padrão, a menos que seu Aternos use outra
  username: 'BatataBOT'          // nick não premium
});

const actions = ['forward', 'back', 'left', 'right', 'jump', 'sneak'];

bot.on('spawn', () => {
  console.log('✅ Bot entrou no servidor!');
  startRandomMovement();
});

function startRandomMovement() {
  setInterval(() => {
    const action = actions[Math.floor(Math.random() * actions.length)];
    bot.clearControlStates(); // Para qualquer ação anterior

    switch (action) {
      case 'forward':
      case 'back':
      case 'left':
      case 'right':
        bot.setControlState(action, true);
        setTimeout(() => bot.setControlState(action, false), 1000);
        break;
      case 'jump':
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500);
        break;
      case 'sneak':
        bot.setControlState('sneak', true);
        setTimeout(() => bot.setControlState('sneak', false), 1000);
        break;
    }

    console.log(`🎮 Ação: ${action}`);
  }, 4000); // Executa uma ação a cada 4 segundos
}

bot.on('error', err => console.log('❌ Erro:', err));
bot.on('end', () => {
  console.log('🔁 Bot desconectado. Encerrando para reinício.');
  setTimeout(() => process.exit(1), 3000); // Railway reinicia automaticamente
});
