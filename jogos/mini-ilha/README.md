# Mini Ilha 4.1 — Cidade Viva

> City builder pixel art com moradores, profissões, economia, caminhos e sincronização com São Paulo.

**Estado:** protótipo em branch isolada, não publicado  
**Tecnologia:** HTML5, CSS, JavaScript e Canvas  
**Modo:** um jogador

## Executar
Abra `index.html` no navegador. Para testar o clima, use preferencialmente um servidor HTTP local.

## Regras e controles
Construa casas, fazendas, serrarias, pedreiras, mercados, parques e caminhos. Administre recursos e felicidade. Selecione uma ferramenta e clique ou toque no mapa. Moradores seguem horários reais de São Paulo e caminham entre suas casas e atividades. O botão de avanço de dia permite testar a economia sem esperar o calendário real.

## Clima e privacidade
Open-Meteo usa coordenadas fixas da capital paulista; não acessa a localização do jogador. A API exige internet e pode ficar indisponível. O relógio usa o fuso `America/Sao_Paulo`.

## Validação
A versão deve passar pelo verificador `python3 scripts/check.py` do repositório e por testes manuais de jogabilidade, clima e salvamento. Não considerar homologada até essas etapas.

## Limitações
Rotinas e economia simplificadas; clima depende de API; salvamento local. O botão de velocidade acelera movimentos, não o horário real.

## Assets e direitos
Arte via Canvas e emojis do sistema; dados meteorológicos da Open-Meteo. Confirmar atribuição e termos antes de publicação.

## Histórico
- 4.1: horário real de São Paulo, clima real e efeitos visuais.
- 4.0: rotinas, trabalho, alimentação, lazer e sono.
- 3.0: moradores, profissões e caminhos.
