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
```

## Comandos para correr el proyecto (Mobile & Web)
Correr el proyecto en ios o android o web:
```sh
$ npm run run-android-complete-mac (run-<android or ios or web>-complete-<win or mac>)
```

Compilar el proyecto en ios o android:
```sh
$ npm run build-android-complete-mac (build-<android or ios>-complete-<win or mac>)
```

Recuerde que para correr la app en Android o iOS, debe tener un emulador asignado en su maquina local o tener el dipositivo deseado para correrlo.

## Correr el proyecto por aparte
Si se quiere agregar los sistemas operativos mobiles de manera personalizada, lo puede hacer con los comandos de cordova:
```sh
$ cordova platform add <ios or android>
```
### Android
Si se quiere correr en un celular o emulador Android, se debe correr un emulador o conectar un dispositivo Android y luego correr el comando:
```sh
$ cordova run android
```
### iOS
Para iOS es necesario tener un MacBook Pro.
Si se quiere correr en un emulador de iOS, se debe correr el emulador y correr el comando:
```sh
$ cordova run ios
```
Si se quiere correr en un dispositivo iPhone, se debe conectar el iPhone al MacBook y tambien tener instalado [XCode](https://developer.apple.com/xcode/) para correr el proyecto.
