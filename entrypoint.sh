#!/bin/sh

echo "== Iniciando inicialização do banco =="
node init.js

echo "== Iniciando aplicação =="
exec node index.js
