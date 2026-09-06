---
title: "Cómo construimos un sistema de inventario a medida: entradas, salidas, lotes y vencimientos"
description: "El proceso real detrás de un sistema interno de control de stock para una empresa en México, y por qué una hoja de cálculo deja de alcanzar en algún momento."
publishDate: 2026-09-06
category: "Software empresarial · Caso de estudio"
coverImage: "/blog/sistema-inventario-mexico.svg"
---

Casi todos los negocios que manejan inventario empiezan de la misma forma: una hoja de cálculo. Funciona bien mientras el catálogo es chico y solo una persona la toca. El problema aparece cuando crece — más productos, más gente registrando movimientos, más lotes con fecha de vencimiento — y la hoja empieza a mostrar números que no cuadran con lo que hay físicamente en la bodega.

Eso fue, en esencia, el punto de partida de uno de los sistemas que construimos para una empresa en México: reemplazar un control manual por una herramienta que reflejara el stock real, en tiempo real, sin depender de que nadie actualizara una celda a mano.

## Qué tenía que resolver el sistema

No se trataba solo de "llevar un conteo". El negocio necesitaba trazabilidad real sobre varios frentes a la vez:

**Entradas y salidas.** Cada vez que entra o sale mercadería, el sistema tiene que quedar actualizado al instante — no al final del día, no "cuando alguien tenga tiempo de pasarlo a la hoja".

**Devoluciones.** Un producto que vuelve no es lo mismo que uno que nunca salió: hay que poder distinguirlo, y que ese movimiento quede documentado igual que cualquier otro.

**Control por lotes.** No todo el stock de un mismo producto es idéntico — llegó en distintas compras, en distintas fechas, y a veces con distinto proveedor. Tratar todo como un solo número agregado esconde información que en algún momento importa.

**Fechas de vencimiento.** Esta es la que más dolores de cabeza evita: sin un sistema que las trackee por lote, es fácil que un producto vencido se quede mezclado con el resto, o que nadie note que hay que rotarlo antes de que caduque.

**Reportes en tiempo real.** De nada sirve tener todo ese detalle si para verlo hay que pedirle a alguien que arme un resumen. El dueño o el encargado tiene que poder abrir el sistema y ver el estado actual del stock ahí mismo.

## Por qué esto no es "una hoja de cálculo más ordenada"

Es tentador pensar que el problema se resuelve con una hoja mejor diseñada, con más columnas y algunas fórmulas. En la práctica, ahí es donde la mayoría de los negocios se traban: las hojas de cálculo no tienen forma nativa de prevenir errores humanos (una celda mal escrita, una fórmula rota sin que nadie lo note), no escalan bien cuando varias personas cargan datos al mismo tiempo, y no dan ningún tipo de historial confiable de qué pasó con cada lote.

Un sistema construido a medida, en cambio, se diseña alrededor de las reglas reales del negocio: qué se considera una entrada válida, qué pasa cuando algo se devuelve, cómo se calcula el stock disponible descontando lo que ya venció. Esas reglas quedan en el código, no en la memoria de una persona.

## Una herramienta interna, no un producto público

Este sistema es de uso exclusivamente interno — no tiene un sitio público, porque no lo necesita. Su único trabajo es que el equipo que gestiona el inventario tenga, todos los días, una fuente de verdad confiable sobre qué hay, dónde está, y cuánto tiempo le queda antes de vencer.

Es exactamente el tipo de proyecto que más disfrutamos: no es la parte más vistosa de un sitio web, pero es la que hace que la operación de un negocio deje de depender de que nadie se equivoque en una hoja de cálculo.

Si tu negocio maneja inventario, lotes o productos con fecha de vencimiento y sigue dependiendo de planillas para llevar la cuenta, probablemente ya conoces la sensación de no confiar del todo en esos números. Esa es, casi siempre, la señal de que vale la pena conversarlo.
