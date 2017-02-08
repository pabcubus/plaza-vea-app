# Plaza Vea App
Este es el repositorio para la demo de la app Plaza Vea.

Este proyecto requiere de tener instalado:
- NPM (Node Package Manager)
- Bower
- Cordova
- GIT
- Android SDK con la ultima version de Android (SDK 7)
- XCode

Tambien usa las tecnologías:
- AngularJS
- Material Angular
- UI Route para AngularJS

Para solo preparar el proyecto, se debe correr estos comandos desde la Terminal ó CMD:
```sh
$ git clone https://github.com/pabcubus/plaza-vea-app.git
$ cd /folder/donde/se/clono/el/proyecto
$ cd www
$ npm install
$ bower install
$ cd ..
$ cordova platform add ios (si se quiere correr con iOS)
$ cordova platform add android (si se quiere correr con Android)
```

## Android
Si se quiere correr en un celular o emulador Android, se debe correr un emulador o conectar un dispositivo Android y luego correr el comando:
```sh
$ cordova run android
```
## iOS
Para iOS es necesario tener un MacBook Pro.
Si se quiere correr en un emulador de iOS, se debe correr el emulador y correr el comando:
```sh
$ cordova run ios
```
Si se quiere correr en un dispositivo iPhone, se debe conectar el iPhone al MacBook y tambien tener instalado [XCode](https://developer.apple.com/xcode/) para correr el proyecto.
