# Contribuir com o FunDrivenDev

## Uma ideia ou uma falha
Use os formulários em Issues. Descreva a experiência desejada ou os passos para reproduzir o problema. Para bugs, informe navegador, dispositivo e resultado observado. Evite dados pessoais e segredos.

## Adicionar um jogo
1. Proponha a ideia em uma issue antes de mudanças grandes.
2. Crie uma branch e uma pasta `jogos/nome-em-kebab-case/`.
3. Inclua o ponto de entrada `index.html` e um README baseado no [modelo](docs/MODELO-DE-JOGO.md).
4. Atualize o catálogo no README principal e na página `index.html`.
5. Registre a origem e as permissões dos assets. Não acrescente licenças de terceiros ao código do autor.
6. Execute `python3 scripts/check.py` (Python 3 e Node.js).
7. Teste início, pausa quando existente, reinício, vitória/derrota e comportamento no celular.
8. Abra um pull request com objetivo, mudanças, testes e limitações.

## Escolhas técnicas
Prefira HTML/CSS/JavaScript sem dependências quando suficientes. Proponha frameworks, engines, serviços pagos ou backends com justificativa antes de incluí-los. Cada jogo deve documentar seus requisitos.

## Acessibilidade
Mantenha foco de teclado visível, rótulos claros, texto legível e controles adequados para toque. Não comunique resultados apenas por cor. Documente limitações de experiências em Canvas.

## Commits
Use mensagens objetivas como `feat(tanques): adiciona placar` ou `fix(tanques): corrige reinício`. Não inclua alterações sem relação com o objetivo.

## Direitos
A licença do projeto ainda não foi definida. Não inclua conteúdo sem autorização e não presuma que o repositório público concede permissão de redistribuição.
