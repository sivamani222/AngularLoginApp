1.npm i primeng primeicons primeflex
2.Import styles inside angular.json
-- "node_modules/primeng/resources/themes/lara-light-blue/theme.css",
"node_modules/primeng/resources/primeng.min.css",
"node_modules/primeflex/primeflex.css"
3.create components
ng g c components/login
ng g c components/register
ng g c components/home
4.Create services
ng g s services/auth
5.Create guards
ng g g guards/auth
6.Create interfaces
ng g i interfaces/auth
7.Create paths in routing module
8.Put <router-outlet> inside appcomponent.html file

ng generate module admin --routing=true
ng generate component admin/dashboard --module=admin

npm ls json-server
npm install -g json-server@0.17.4
