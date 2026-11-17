# Duelo de Tanques

> Dois tanques. Direções aleatórias. Um único sobrevivente.

**Estado:** protótipo · **Tecnologia:** HTML Canvas e JavaScript · **Modo:** simulação automática

## Executar
Abra [index.html](index.html) localmente no navegador, ou escolha o jogo pelo catálogo na raiz. No GitHub este link exibe o código.

## Regras
- Dois tanques se movimentam aleatoriamente e permanecem na arena.
- Cada tanque dispara a cada 3 segundos de simulação, em uma direção aleatória.
- O primeiro atingido por um tiro do adversário perde.
- Acertos simultâneos no mesmo passo da simulação podem resultar em empate.
- Tiros desaparecem nas bordas; não há ricochetes.
- Não há controle manual dos tanques.

## Controles

| Botão | Ação |
| --- | --- |
| Pausar / Continuar | Suspender ou retomar a simulação |
| Nova partida | Reiniciar tanques, tiros e resultado |

Ao ocultar a aba, a partida pausa. O intervalo é contado em tempo de simulação.

## Histórico
- **0.1.0:** protótipo original transferido do repositório de perfil para o FunDrivenDev, preservando seu código.

## Limitações
A movimentação usa passos por quadro. A colisão considera o trajeto dos tiros e a posição dos tanques no passo atual. A validação visual e de jogabilidade em diferentes dispositivos ainda está pendente.

[Voltar ao catálogo](../../README.md)
