# etpay_proyecto

**Hola !!**

Si estas aca estas en el lugar correcto 😏, vamos a manejar de la mejor forma
esas transacciones !

este desarrollo esta en node14 y alojado en AWS, se uso DynamoDB como base de
datos y serverless con lambda 😱

## Utilizar el proyecto 💪🏽
utilizar el proyecto es muy sencillo, si quieres obtener la informacion de las
transacciones lo puedes hacer desde el navegador 🤯, si vas a realizar alguna
peticion diferente (crear un registro, actualizar un dato, borrarlo o realizar
una consulta mas elavorada) necesitaras alguna herramienta o programa para
enviar peticiones a una API,

### Solicitar informacion (GET) 🧐
#### Solicitar todos los datos
**URL**:
[a https://d1w4cees06.execute-api.us-east-1.amazonaws.com/transaction]
(https://d1w4cees06.execute-api.us-east-1.amazonaws.com/transaction)

Usando esta url vas a poder obtener todas las transacciones que existen en la
base de datos 😱

#### Solicitar solo un dato
**URL**:
[a https://d1w4cees06.execute-api.us-east-1.amazonaws.com/transaction/{id}]
(https://d1w4cees06.execute-api.us-east-1.amazonaws.com/transaction/ID)

**Parametro de la url ({id})**: este es el indentificador con el que se creo el
registro (puedes obtenerlo tambien revisando todos los datos)

Usando esta url vas a poder obtener el registro que buscas en las transacciones
😱

## Crear un registro (POST) 🤓
**URL**:
[a https://d1w4cees06.execute-api.us-east-1.amazonaws.com/transaction]
(https://d1w4cees06.execute-api.us-east-1.amazonaws.com/transaction)

Puedes usar cualquiera de los dos formatos JSON mostrados acontinuacion para
crear una nueva transaccion en la base de datos:

**Formato JSON**:
```json
{
  "id": "C00001", //String
  "validated": true, //Boolean
  "inUse": true, //Boolean
  "monto": "1", //String
  "tipo": "abono", //String
  "fechaMovimiento": 1649909719000, //String/Date/Timestamp
  "fecha": "14-04-2022 00:15", //String/Date/Timestamp
  "originName": "NOMBRE EMPRESA", //String
  "originRut": "0223335554", //String
  "originAccount": "00000000000087654321", //String
  "receiverRut": "0112223334", //String
  "receiverAccount": "00000012345678", //String
  "originBankCode": "cl_bci", //String
  "originBankName": "Banco BCI", //String
  "comment": "", //String
  "originAccountType": "cuenta_corriente", //String
  "validatedAt": "2022-04-14T04:18:32.922Z", //String/Date/Timestamp
  "createdAt": "2022-04-14T04:15:19.000Z", //String/Date/Timestamp
  "updatedAt": "2022-06-07T23:59:58.569Z" //String/Date/Timestamp
}
```
```json
{
  "validated": true, //Boolean
  "inUse": true, //Boolean
  "amount": "1", //String
  "type": "abono", //String
  "transactionDate": 1649909719000, //String/Date/Timestamp
  "date": "14-04-2022 00:15", //String/Date/Timestamp
  "originName": "NOMBRE EMPRESA", //String
  "originRut": "0223335554", //String
  "originAccount": "00000000000087654321", //String
  "receiverRut": "0112223334", //String
  "receiverAccount": "00000012345678", //String
  "originBankCode": "cl_bci", //String
  "originBankName": "Banco BCI", //String
  "comment": "", //String
  "originAccountType": "cuenta_corriente", //String
  "validatedAt": "2022-04-14T04:18:32.922Z", //String/Date/Timestamp
  "createdAt": "2022-04-14T04:15:19.000Z", //String/Date/Timestamp
  "updatedAt": "2022-06-07T23:59:58.569Z" //String/Date/Timestamp
}
```

## Actualizar un registro (PUT) 😰
**URL**:
[a https://d1w4cees06.execute-api.us-east-1.amazonaws.com/transaction/{id}]
(https://d1w4cees06.execute-api.us-east-1.amazonaws.com/transaction/ID)

**Parametro de la url ({id})**: este es el indentificador con el que se creo el
registro (puedes obtenerlo tambien revisando todos los datos)

Siguiendo los formatos mostrados anteriormente y los datos obtenidos usando las
consultas GET, puedes identificar el valor que deseas modificar (puedes
modificar mas de un valor)

**Formato JSON**:
```json
{
  "inUse": true, //Boolean
  "originName": "Juanpis SAS", //String
  "originBankName": "Banco Citybanamex", //String
  "comment": "Se pago el dia que era !", //String
}
```

## Eliminar un registro (DELETE) ☠️
**URL**:
[a https://d1w4cees06.execute-api.us-east-1.amazonaws.com/transaction/{id}]
(https://d1w4cees06.execute-api.us-east-1.amazonaws.com/transaction/ID)

**Parametro de la url ({id})**: este es el indentificador con el que se creo el
registro (puedes obtenerlo tambien revisando todos los datos)

Usando esta URL eliminaras el registro seleccionado, ten cuidado no hay vuelta
atras !

## Consltas mas elavoradas (POST) 🧑🏽‍💻
**URL**:
[a https://d1w4cees06.execute-api.us-east-1.amazonaws.com/transaction/query]
(https://d1w4cees06.execute-api.us-east-1.amazonaws.com/transaction/query)

Desde esta URL podras hacer consultas mas elaboradas para traer informacion, no
necesitas entrar a una base de datos para obtener los datos que quieres y de
esta forma es mas facil que programar 😱

**Formato JSON**:
```json
{
  "select": ["id", "originName", "originBankName", "comment", "amount"],
  "conditions": [
    ["AND", "amount", "1", ">"],
    ["OR", "tipo", "p", "begins_with"]
  ]
}
```
**Explicacion de JSON**
La logica de este JSON es diferente pero no es tan dificil, tiene dos llaves
`select` y `conditions`:
- `select` => es un arreglo de los valores que quieren ver: `["id", "comment"]`
asi solo traeran los datos de `id` y de `comment`
- `conditions` (Opcional): Es una matriz, que define que condiciones va a tener
la consulta que haras:
```js
[
  "AND", //Puede ser "AND" o "OR"
  "amount", //Esta es la llave de la base de datos
  "1", //Este es el valor que deseas operar
  ">" //Operador (>, >=, <, <=, =, begins_with, !=) por defecto si no se envia es =
]
```
Con esto podras tener los datos que necesites como todo un desarrollador
buscando en la base de datos

## Iniciar proyecto para desarrollo 🧑🏽‍💻
1. Abrir la consola
2. Correr el comando `npm i` (instalar las dependencias usadas en el proyecto)
3. Correr el comando `npm run database_init` (generar los primeros registros en
la base de datos)
