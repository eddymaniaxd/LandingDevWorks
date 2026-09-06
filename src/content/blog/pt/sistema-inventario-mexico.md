---
title: "Como construímos um sistema de estoque sob medida: entradas, saídas, lotes e vencimentos"
description: "O processo real por trás de um sistema interno de controle de estoque para uma empresa no México, e por que uma planilha em algum momento deixa de ser suficiente."
publishDate: 2026-09-06
category: "Software empresarial · Estudo de caso"
coverImage: "/blog/sistema-inventario-mexico.svg"
---

Quase todo negócio que gerencia estoque começa da mesma forma: uma planilha. Funciona bem enquanto o catálogo é pequeno e só uma pessoa mexe nela. O problema aparece quando cresce — mais produtos, mais gente registrando movimentos, mais lotes com data de vencimento — e a planilha começa a mostrar números que não batem com o que existe fisicamente no depósito.

Foi, em essência, o ponto de partida de um dos sistemas que construímos para uma empresa no México: substituir um controle manual por uma ferramenta que refletisse o estoque real, em tempo real, sem depender de alguém atualizar uma célula à mão.

## O que o sistema precisava resolver

Não se tratava apenas de "manter uma contagem". O negócio precisava de rastreabilidade real em várias frentes ao mesmo tempo:

**Entradas e saídas.** Toda vez que a mercadoria entra ou sai, o sistema precisa ficar atualizado na hora — não no fim do dia, não "quando alguém tiver tempo de passar para a planilha".

**Devoluções.** Um produto que volta não é a mesma coisa que um que nunca saiu: é preciso conseguir diferenciar, e esse movimento precisa ficar documentado como qualquer outro.

**Controle por lote.** Nem todo o estoque de um mesmo produto é idêntico — chegou em compras diferentes, em datas diferentes, às vezes de fornecedores diferentes. Tratar tudo como um único número agregado esconde informação que em algum momento importa.

**Datas de vencimento.** Essa é a que evita mais dor de cabeça: sem um sistema que as rastreie por lote, é fácil um produto vencido ficar misturado com o resto, ou ninguém perceber que é preciso girá-lo antes que vença.

**Relatórios em tempo real.** De nada adianta ter todo esse detalhe se, para vê-lo, é preciso pedir para alguém montar um resumo. O dono ou o responsável precisa conseguir abrir o sistema e ver o estado atual do estoque ali mesmo.

## Por que isso não é "uma planilha mais organizada"

É tentador achar que o problema se resolve com uma planilha melhor desenhada, com mais colunas e algumas fórmulas. Na prática, é aí que a maioria dos negócios trava: planilhas não têm nenhuma forma nativa de prevenir erro humano (uma célula digitada errada, uma fórmula quebrada sem que ninguém perceba), não escalam bem quando várias pessoas lançam dados ao mesmo tempo, e não dão nenhum tipo de histórico confiável do que aconteceu com cada lote.

Um sistema construído sob medida, por outro lado, é desenhado em volta das regras reais do negócio: o que conta como uma entrada válida, o que acontece quando algo é devolvido, como se calcula o estoque disponível descontando o que já venceu. Essas regras ficam no código, não na memória de uma pessoa.

## Uma ferramenta interna, não um produto público

Esse sistema é de uso exclusivamente interno — não tem site público, porque não precisa. Seu único trabalho é garantir que a equipe que gerencia o estoque tenha, todos os dias, uma fonte de verdade confiável sobre o que existe, onde está, e quanto tempo falta até vencer.

É exatamente o tipo de projeto que mais gostamos de fazer: não é a parte mais vistosa de um site, mas é a que faz a operação de um negócio parar de depender de ninguém errar numa planilha.

Se o seu negócio lida com estoque, lotes ou produtos com data de vencimento e ainda depende de planilhas para controlar isso, você provavelmente já conhece a sensação de não confiar totalmente nesses números. Esse é, quase sempre, o sinal de que vale a pena conversar sobre isso.
