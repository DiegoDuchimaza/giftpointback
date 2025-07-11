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
