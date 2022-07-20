## Desafío: Servidor con balance de carga
#### Como ejecutar el programa en su computadora:

Ejecutar "npm install" para instalar las dependecias.

Definir las variables de entorno en el .env de acuerdo al .env.sample

Ejecutar "npm start" para crear la estructura de db y arrancar el server.

Se agregó el parámetro "modo" de manera que se puede ejecutar de la siguiente manera:
```
node server.js --port NUMERO_PUERTO --modo fork
node server.js --port NUMERO_PUERTO --modo cluster
```
Si no se indica parámetro modo, por defecto la opción es fork

#### Modo fork con PM2
```
pm2 start server.js --watch -- -- NUMERO_PUERTO
```

#### Modo cluster con PM2
Reemplazando el 0 por otro numero se generan n cluster, mientras que con 0 genera la cantidad máxima.
```
pm2 start server.js --watch -i 0 -- -- NUMERO_PUERTO
```

### Resolución:
Para resolver el desafío se deben ejecutar en modo cluster los siguientes comandos:
```
pm2  start server.js --name="8082" --watch -i 3  -- -- 8082
pm2  start server.js --name="8083" --watch -i 3  -- -- 8083
pm2  start server.js --name="8084" --watch -i 3  -- -- 8084
pm2  start server.js --name="8085" --watch -i 3  -- -- 8085
```
De esta manera quedan repartidas las instancias en clusters de 3 para los diferentes puertos. El nombre se agregó para diferenciar y porque no pueden estar corriendo procesos con el mismo nombre en puertos diferentes.


Para monitorear el rendimiento se puede ver con:
```
pm2 monit
```

***
El archivo de configuracion del Nginx debe tener la siguientes información:

```
events {
}

http {
    include       mime.types;

    upstream node_app {
        server localhost:8082;
        server localhost:8083;
        server localhost:8084;
        server localhost:8085;
    }

    server {
        listen 8080;
        location /api/randoms/ {
            proxy_pass http://node_app;
        }
    }

}
```

Se debe reiniciar el servicio para ver los cambios aplicados:
```
nginx.exe -s stop
start nginx.exe
```

Para ver el resultado del proceso es [http://localhost:8080/api/randoms/](http://localhost:8080/api/randoms/)