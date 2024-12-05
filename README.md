# efectiva-technical-test
  It´s a full stack technical test 

# Reto técnico

El frontend logre usar buenas prácticas y en el backend la arquitectura en 3 capas.
La estructura tanto para backend y frontend esta estructurada para que sea modular, escalable, flexible y mantenible, para que se cumpla con los requerimientos que vengan más adelante.

### .Net Core

Se ejecuta en el program que esta en la capa de Application.

#### Conexión a DB

Los cambios se harán en appsettings.json que esta en la capa de Application.

#### Migraciones

Las migraciones se ejecutan en Infrastructure con estas instrucciones:
Add-Migration InitialCreate
Update-Database

### Nextjs
Primero instalar dependencias:
npm run i

-------------
Para levantar el proyecto:
npm run dev


