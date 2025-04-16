const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'mapatest97.aternos.me', // Substitua pelo IP do seu servidor Aternos
  port: 18180,               // Porta padrão do Minecraft
  username: 'BatataBOT',   // Nome do bot (não requer conta premium)
});

const actions = ['forward', 'back', 'left', 'right', 'jump', 'sneak'];

bot.on('spawn', () => {
  console.log('Bot entrou no servidor!');
  iniciarMovimentosAleatorios();
});

function iniciarMovimentosAleatorios() {
  setInterval(() => {
    const acao = actions[Math.floor(Math.random() * actions.length)];

    pararTodosMovimentos();

    switch (acao) {
      case 'forward':
      case 'back':
      case 'left':
      case 'right':
        bot.setControlState(acao, true);
        setTimeout(() => bot.setControlState(acao, false), 1000);
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
  }, 4000); // Executa uma ação a cada 4 segundos
}

function pararTodosMovimentos() {
  bot.clearControlStates();
}

bot.on('error', console.log);
bot.on('end', () => {
  console.log('Bot desconectado, tentando reconectar...');
  setTimeout(() => process.exit(1), 3000); // Railway reinicia o processo automaticamente
});
