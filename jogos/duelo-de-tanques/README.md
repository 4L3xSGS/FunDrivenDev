# Duelo de Tanques

Pilote o tanque azul na Operação Riacho ou assista ao duelo entre dois tanques autônomos.

**Estado:** jogável · **Tecnologia:** HTML Canvas e JavaScript · **Modos:** solo e simulação automática

## Executar
Abra [index.html](index.html) localmente no navegador, ou escolha o jogo pelo catálogo na raiz. No GitHub este link exibe o código.

## Pilotar o azul

- No celular, arraste o direcional esquerdo e toque ou segure o disparo com o polegar direito. Os dois comandos funcionam ao mesmo tempo. No computador, use WASD ou as setas para mover e espaço para atirar.
- A torre acompanha o adversário. O canhão recarrega em 1,5 segundo e cada acerto de tanque tira 25 pontos de blindagem. Um tanque cheio aguenta três acertos e é destruído no quarto. Soldados tiram 25 pontos por acerto, inclusive de aliados.
- O rival muda de posição e trava a mira antes de disparar. Quando surgir o traço de aviso, saia da linha para desviar.
- Em retrato, o azul começa embaixo. Em paisagem, começa à esquerda. O direcional sempre acompanha os eixos da tela.

## Assistir à simulação original
- Dois tanques se movimentam aleatoriamente e permanecem na arena.
- Cada tanque dispara a cada 1,5 segundo de simulação. À esquerda de 40% da largura, escolhe uma direção aleatória para a direita; à direita de 60%, escolhe uma direção aleatória para a esquerda. Na faixa central (40% a 60%), pode disparar em qualquer direção.
- A direção de movimento é independente da mira; ambos os tanques podem percorrer todo o campo.
- Qualquer tanque que passar sobre um soldado, aliado ou adversário, elimina esse soldado. A verificação considera o trajeto percorrido no passo, mesmo entre disparos. O soldado atropelado para de atirar; seus tiros já em voo continuam.
- Cada lateral tem uma trincheira fixa e um soldado que dispara a cada 1,5 segundo, aleatoriamente em direção ao outro lado.
- Um acerto de projétil adversário elimina o soldado; ele para de atirar, mas seus tiros em voo continuam.
- Cada tiro de soldado retira 25 pontos de saúde de qualquer tanque atingido, inclusive o aliado.
- Um tiro de tanque destrói imediatamente o tanque adversário (regra original).
- O primeiro tanque com saúde zero perde; eliminar só o soldado não encerra a partida.
- As barras acima dos tanques exibem porcentagem e cor: 100% azul, 75% verde, 50% laranja, 25% vermelho; 0% indica destruição.
- Pausa interrompe os disparos de ambas as unidades; nova partida restaura tanques e soldados.
- Acertos simultâneos no mesmo passo da simulação podem resultar em empate.
- Tiros desaparecem nas bordas; não há ricochetes.
- Nesse modo os tanques são automáticos.

## Cenário
Gramado texturizado, árvores, riacho com reflexos animados, pedras nas margens e duas pontes. O cenário é visual: árvores, pontes e água não bloqueiam o movimento nem os disparos. Todo o desenho é original em Canvas, sem assets externos.

## Eventos e resgate
- Um civil com bengala branca aparece entre 0,8 e 2 segundos de simulação e cruza pela altura da ponte inferior, da esquerda para a direita ou no sentido inverso, sorteado. Depois de sair, novas travessias podem ocorrer com intervalos de 10 a 20 segundos.
- O balão “Era aqui a faixa de pedestres?” e o aviso “Um cego num tiroteio” fazem humor com o cenário absurdo.
- No começo da partida, um soldado adicional já está ferido no campo. Seu lado (azul ou laranja) e posição vertical são sorteados.
- Um socorrista adicional sai da trincheira do mesmo lado após 1 a 2 segundos, alcança o ferido, presta cuidados durante 1,2 segundo e o leva em uma maca de volta à trincheira.
- O socorrista tem uniforme claro, identificação verde-água e o rótulo **SOCORRISTA**; o ferido tem a cor de sua equipe.
- Civil, ferido e socorrista são personagens narrativos: não atiram, não recebem dano, não são atropelados e não alteram a vitória dos tanques. As regras anteriores de atropelamento continuam valendo para os soldados combatentes.
- A pausa congela eventos, travessia e resgate. Reiniciar recria todos os personagens. A destruição de um tanque encerra a partida e interrompe eventos ainda em andamento.
- Avisos em texto com anúncio acessível acompanham a missão.

## Pausa e revanche

Use **Pausar**, a tecla P ou Esc. Na pausa você pode continuar, reiniciar a rodada ou escolher outro modo. Ao trocar de aba, o duelo pausa e os comandos são soltos. Depois do resultado, **Jogar de novo** inicia outra rodada no mesmo modo.

## Histórico
- **0.6.0:** modo solo com joystick e disparo simultâneos, rival com aviso de mira, recarga visível, arena adaptada à orientação e simulação em passos fixos.
- **0.5.0:** travessia inesperada de civil com bengala branca e missão de resgate com socorrista e maca.
- **0.4.0:** mira aleatória por posição no campo e eliminação de soldados por atropelamento.
- **0.3.0:** duas trincheiras com soldados, disparos direcionais aleatórios, eliminação de soldados e barras de saúde dos tanques.
- **0.2.0:** cenário Operação Riacho, árvores e água animada; disparos reduzidos para 1,5 segundo.
- **0.1.0:** protótipo original transferido do repositório de perfil para o FunDrivenDev, preservando seu código.

[Voltar ao catálogo](../../README.md)
