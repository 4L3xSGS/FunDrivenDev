# Duelo de Tanques

> Dois tanques. Direções aleatórias. Um único sobrevivente.

**Estado:** protótipo · **Tecnologia:** HTML Canvas e JavaScript · **Modo:** simulação automática

## Executar
Abra [index.html](index.html) localmente no navegador, ou escolha o jogo pelo catálogo na raiz. No GitHub este link exibe o código.

## Regras
- Dois tanques se movimentam aleatoriamente e permanecem na arena.
- Cada tanque dispara a cada 1,5 segundo de simulação, em uma direção aleatória.
- Cada lateral tem uma trincheira fixa e um soldado que dispara a cada 1,5 segundo, aleatoriamente em direção ao outro lado.
- Um acerto de projétil adversário elimina o soldado; ele para de atirar, mas seus tiros em voo continuam.
- Cada tiro de soldado retira 25 pontos de saúde de qualquer tanque atingido, inclusive o aliado.
- Um tiro de tanque destrói imediatamente o tanque adversário (regra original).
- O primeiro tanque com saúde zero perde; eliminar só o soldado não encerra a partida.
- As barras acima dos tanques exibem porcentagem e cor: 100% azul, 75% verde, 50% laranja, 25% vermelho; 0% indica destruição.
- Pausa interrompe os disparos de ambas as unidades; nova partida restaura tanques e soldados.
- Acertos simultâneos no mesmo passo da simulação podem resultar em empate.
- Tiros desaparecem nas bordas; não há ricochetes.
- Não há controle manual dos tanques.

## Cenário
Gramado texturizado, árvores, riacho com reflexos animados, pedras nas margens e duas pontes. O cenário é visual: árvores, pontes e água não bloqueiam o movimento nem os disparos. Todo o desenho é original em Canvas, sem assets externos.

## Controles

| Botão | Ação |
| --- | --- |
| Pausar / Continuar | Suspender ou retomar a simulação |
| Nova partida | Reiniciar tanques, tiros e resultado |

Ao ocultar a aba, a partida pausa. O intervalo é contado em tempo de simulação.

## Histórico
- **0.3.0:** duas trincheiras com soldados, disparos direcionais aleatórios, eliminação de soldados e barras de saúde dos tanques.
- **0.2.0:** cenário Operação Riacho, árvores e água animada; disparos reduzidos para 1,5 segundo.
- **0.1.0:** protótipo original transferido do repositório de perfil para o FunDrivenDev, preservando seu código.

## Limitações
A movimentação usa passos por quadro. A colisão considera o trajeto dos tiros e a posição dos tanques no passo atual. A validação visual e de jogabilidade em diferentes dispositivos ainda está pendente.

[Voltar ao catálogo](../../README.md)
