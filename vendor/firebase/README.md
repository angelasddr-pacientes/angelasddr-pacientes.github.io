Firebase JS SDK 12.19.0: app, auth e firestore.

- Origem: pacote npm `firebase@12.19.0` (arquivos `firebase-app.js`, `firebase-auth.js` e `firebase-firestore.js`, os módulos ES que o Google publica para uso direto no navegador).
- Mudanças: o endereço `https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js` virou `./firebase-app.js`, e as linhas `sourceMappingURL` saíram. O site carrega o SDK do próprio endereço, e o modo offline guarda os arquivos.
- Licença: Apache License 2.0 (`LICENSE`).
- Só a versão hospedada (`build.mjs --pages ... --firebase ...`) usa estes arquivos.
