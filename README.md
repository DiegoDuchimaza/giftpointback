# Guia de instalación y configuración del proyecto GiftPointBack

## EJECUCION DEL PROYECTO

### 1. Para ejecutar el proyecto una vez descargado en nuestros equipos, desde VSC en la raiz se debe ejecutar el comando:  
```
npm install
```  
### el cual se utiliza para instalar todas las dependencias necesarias que requiere el proyecto.    
### 2. Una vez Hecho esto, en la raiz del proyecto se debe crear un archivo llamado .env en el cual se deben agregar estas dos líneas:  
```
PORT=3000
JWT_SECRET=clave-secreta-gift-point
```
### Las cuales indican el puerto en el cual se levantará el proyecto y la clave secreta JWT (es opcional modificar los valores de éstos campos)  
### 3. Una vez con la configuración realizada, se procede a ejecutar el proyecto con la siguiente linea de comandos en la raiz del proyecto:
```
npm start
```
### En la salida del terminal debe mostrarse el siguiente mensaje como prueba de que el proyecto de ejecutó correctamente:
```
Servidor corriendo en http://localhost:3000
```

## NOTA  
La version de node con la que estoy trabajando es la v22.17.0 y las versiones de los paquetes instalados se puede revisar en el archivo package.json  
También es importante revisar que mi base de datos en sqlite3 esté en el proyecto, por ello hay que ir a la ruta \src\configs y verificar que exista el archivo database.db. En el caso de no existir, desde la raíz del proyecto se deberá ejecutar la siguiente líena para crear el archivo de base de datos
```
node .\src\configs\db.js
```

## PRUEBAS UNITARIAS

Las pruebas unitarias están implementadas Jest + Supertest para testear endpoints, lo que hice fué crear los archivos auth.test.js y giftcard.test.js para configurar las rutas de logeo con sus parámetros y el obtener la lista de giftcards. 

### 1. Lo primero para ejecutar las pruebas es que enla raiz del proyecto se debe ejecutar la siguiente línea de comando
```
npm test
```
### el cual se encargará de ejecutar las pruebas. 
### 2. En la consola se deberá presentar un mensaje similar a este
```
Test Suites: 2 passed, 2 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        1.271 s, estimated 2 s
```
### indicando que las pruebas se hicieron correctamente

### LEVANTAR SERVICIO APIRESTFULL PARA FLUTTERFLOW

### 1. Para poder llamar a mis endpoint locales desde la plataforma de flutterFlow, tuve que utilizar NGROk, el cual es un servicio que nos permite crear nuestro servidor local en un subdominio para poder visualizarlo fuera de la LAN. Entonces, lo primero que se hace es crear una cuenta en el siguiente enlace https://dashboard.ngrok.com.
### 2. Luego copiar el authtoken que me da en la siguiente ruta https://dashboard.ngrok.com/get-started/your-authtoken.
### 3. En la raíz de mi proyecto ejecutar la siguiente línea
```
ngrok config add-authtoken TU_AUTHTOKEN
```
### 4. También ejecutar esta línea
```
ngrok http 3000
```
### 5. Se abrirá una ventana de cmd con un texto similar a esto
<img width="841" height="312" alt="image" src="https://github.com/user-attachments/assets/139871ab-390f-495b-bbb0-ed270b23bdf6" />

### 6. Se debe copiar la ruta que dice Forwarding, en mi caso es esta ruta: https://15c3f2d771ce.ngrok-free.app, cada uno debe copiar la ruta que le de su cmd, la ruta siempre varía cada vez que se ejecute de nuevo. Ademas es necesario que el proyecto se ejecute localmente, por ello es necesario tambien ejecutrar la siguiente linea de codigo
```
npm start
```
### 7. En la plataforma de FlutterFlow, en el proyecto de giftCars, en la sección de Api Calls, en la ruta raíz, en la parte de Api Base URL pegar o reemplazar la ruta copiada anteriormente sin olvidar que al final debe quedar concatenado /api, debe quedar algo asi
<img width="1729" height="669" alt="image" src="https://github.com/user-attachments/assets/535a4352-875f-4fdb-af58-12b02dd99ba6" />
### 8. Guardar los cambios y ejecutar la aplicación, ya debe poder interactuar con la app correctamente.

## DATOS PARA PRUEBAS

```
Usuario: duchimazadiego68@gmail.com
Clave: Prueba1.

Usuario: pablo@gmail.com
Clave: Pablo1.

```

## NOTA
### Mi aplicación del back cuenta con un middleware que se encarga de autenticar todas las peticiones necesarias con el token de acceso.
### En la consola se imprime también el tiempo de respuesta de cada peticón que se realice.
### En el back se han implementado las consultas API Rest Full con POST, GET, PATCH y DELETE, ya que éstas tambien se han implementado para los tests, pero hubo un problema para las llamadas GET desde FLUTTERFLOW, por eso es que he agregado dos endpoints POST para poder llamarlp desde flutterFlow, esto lo hice ya que estamos trabajando en pruebas, pero para producción debería llamar correctamente a los endpoints GET.
