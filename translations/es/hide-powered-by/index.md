---
layout: page
title: Hide Powered-By
permalink: /translations/es/hide-powered-by/
---
Brevemente: la función middleware *Hide Powered-By* remueve la cabecera `X-Powered-By` para esconder qué tecnología está siendo utilizada para proveer tu sitio y así dificultar un poco la detección de posibles vulnerabilidades por parte de un atacante.

El ataque
------------

Los hackers pueden explotar posibles vulnerabilidades en Express y Node si saben que los estás utilizando. Express (y otras teconologías orientadas al desarrollo web como PHP) utilizan una cabecera `X-Powered-By` para cada petición, indicando así la tecnología usada por el servidor. Al hacer esto, Express provee información importante a los posibles atacantes.

Así, un hacker podría usar esta información y correr con ventaja. Si ellos conocen realmente alguna vulnerabilidad en Express o Node, podrían simplemente chequear si lo estás usando y enfocarse en la construcción de un ataque enfocado hacia esas debilidades.

La solución
-------

La solución simplemente consiste en remover esa cabecera.

Para ser sinceros, si un hacker está empeñado en hacerte daño, el hecho de no encontrar esa cabecera no hará que se de por vencido. Ellos simplemente buscarán otras pistas que le permitan averiguar si estás usando Node, o simplemente podrían tratar otros ataques y ver si alguno de ellos da resultados. Omitir esta cabecera no significa que ya nadie puede explotar posibles vulnerabilidades en tu servidor, pero quizás pueda retrazar el proceso... o detenerlo si el hacker es realmente perezoso.

Otra de las cosas que puede mensionarse al respecto es una pequeña mejora en la *performance* de tu servidor, dado que omitir la emisión de esa cabecera implica que menos bytes serán enviados hacia el usuario.

Leer más:

- ["Removing the header provides no security benefits"](https://github.com/expressjs/express/pull/2813#issuecomment-159270428)

El código
--------

Sobre todo, esta función middleware es más útli cuando se incluye con el paquete Helmet como en el siguiente ejemplo:

```javascript
const helmet = require('helmet')

app.use(helmet())
```

Si estás usando cada uno de las cabeceras seteadas por Helmet, una por una, hay una mejor manera de omitir ésta cabecera utilizando la función nativa de Express:

```javascript
app.disable('x-powered-by')
```

Si de todas formas prefieres utilizar la función provista por Helmet, también está permitido. Para utilizar el módulo en solitario simplemente debes seguir el siguiente ejemplo:

```javascript
app.use(helmet.hidePoweredBy())
```

O incluso puedes requerir el módulo, asignarlo a una variable y luego usarlo como una función middleware en Express:

```javascript
const hidePoweredBy = require('hide-powered-by')

app.use(hidePoweredBy())
```
También puedes *mentir* usando esta cabecera y desorientar a los hackers. Por ejemplo, para simular que estás usando PHP podrías utilizar la siguiente función:

```javascript
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }))
```
