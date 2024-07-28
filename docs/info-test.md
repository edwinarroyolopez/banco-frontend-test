Por favor al momento de enviar su respuesta, crear un repositorio público en Github con todos los archivos generados y colocar la URL al repositorio en los comentarios de este ejercicio (por favor ponerle como nombre a la URL su nombre, por ejemplo, https://github.com/JuanPerez). 
*Añadir un archivo ReadMe.md con las instrucciones de ejecución del proyecto y sus pruebas unitarias.
Adicional, Subir un .zip o .rar con todos los archivos generados. 

# run backend
 npm run start:dev
 http://localhost:3002

# Prueba Técnica  

Indicaciones generales 

Aplique todas las buenas prácticas, clean code, SOLID (se tomará en cuenta este punto  para la calificación). 
Se debe realizar el UI Development (Maquetación) sin usar frameworks de estilos o  componentes prefabricados. 
Se debe manejar excepciones y mostrar mensajes de errores visuales. 
Se debe realizar pruebas unitarias y contar con un mínimo de 70% coverage. 
Posterior a la entrega de este ejercicio, dependiendo de los resultados, se podrá agendar una entrevista técnica donde deberás defender la solución planteada.
Nota: Los servicios necesarios a consumir para este proyecto son locales. Más adelante se 
detallará la manera de hacerlo.

# Herramientas y tecnologías utilizadas 
TypeScript 4.8 o superior. (Obligatorio para pruebas con Angular / Opcional, pero altamente deseable para pruebas con React).
Pruebas unitarias de preferencia con Jest. 
Requerimiento de Microservicios y Funcionalidades


Generar una aplicación frontend para cumplir las funcionalidades: F1, F2, F3, F4. Es deseable la funcionalidad F5 y el uso de rutas. 

*Consideraciones Adicionales (para obtener la máxima puntuación)

Si quieres sobresalir, además de cumplir con los requisitos mencionados anteriormente, se espera la implementación de las funcionalidades F5 y F6. 

Deseable que la solución tome en cuenta: rendimiento, pantallas de precarga (Skeletons) y responsive design.

## Funcionalidades del Frontend 

1. F1. Listado de productos financieros: 
Se requiere una aplicación para visualizar los diferentes productos financieros ofertados por la  Institución Banco cargados de una API. Realizar la maquetación en base al diseño D1. 

2. F2. Búsqueda de productos financieros:  
Se requiere realizar búsqueda de los productos financieros mediante un campo de texto. Realizar  la maquetación en base al diseño D1. 

3. F3. Cantidad de registros:  
Se requiere que se muestre la cantidad de resultados mostrados en el listado y un select que  permita seleccionar la cantidad de registros a mostrar debe contener los siguientes valores: 5, 10  y 20. Realizar la maquetación en base al diseño D1. Es deseable agregar una paginación simple en caso de que haya un número considerable de registros.

4. F4. Agregar producto:  
Se requiere la implementación un botón de “Agregar” para navegar al formulario de registro, el  formulario debe permitir la creación de un producto mediante un botón “Agregar” y debe  permitir la limpieza del formulario mediante un botón de “Reiniciar”. Realizar la maquetación del formulario base al diseño D2 y de la ubicación del botón principal en base a diseño D3. 

Cada campo del formulario contendrá su respectiva validación previa al envío del formulario: 

Campo 
Validación

Id 
- Requerido, mínimo 3 caracteres y máximo 10, validación de ser un Id que  no exista mediante el consumo del servicio de verificación.

Nombre 
- Requerido, mínimo 5 caracteres y máximo 100

Descripción 
- Requerido, mínimo 10 caracteres y máximo 200

Logo 
- Requerido

Fecha de Liberación 
- Requerido, la Fecha debe ser igual o mayor a la fecha actual

Fecha de Revisión
- Requerido, la Fecha debe ser exactamente un año posterior a la fecha de liberación

En caso de no cumplirse con alguna de las validaciones se deberá mostrar visualmente al usuario  el estado de error de cada campo, de la siguiente manera: 

# IMAGE 1 -> image bp.png


5. F5. Editar producto:  

Se requiere la implementación un menú contextual (en formato dropdown) que permita  seleccionar la opción de editar por cada producto, al hacer clic se deberá navegar a la pantalla de  edición del producto y debe mantener el campo de ID deshabilitado, el formulario de editar debe  mantener las mismas validaciones de la funcionalidad F4 y mostrar errores por cada campo.  Realizar la maquetación del formulario de edición en base al diseño D2 y la maquetación del menú  de cada producto en base al diseño D3.  

6. F6. Eliminar producto:  

Se requiere la implementación una opción de eliminar dentro del menú contextual de cada  producto, al hacer clic en la opción de eliminar se deberá mostrar un modal con un botón de  “Cancelar” y un botón “Eliminar”, al hacer clic en Eliminar se debe proceder con la eliminación,  en el caso de cancelar seria solo ocultar el modal. Realizar maquetación del menú de cada  producto en base al diseño D3 y la maquetación del modal en base al diseño D4.

Diseño D1: -> tabla con buscador 
# d11.png

Diseño D2: -> Formulario de registro
# d22.png

Diseño D3: -> tabla con buscador  -> boton agregar
# d33.png

Diseño D4: -> modal eliminar
# d44.png


Documentación:

Estructura de Producto Financiero

Clave 

Tipo 

Valor de ejemplo 

Descripción

id 

String 

trj-crd 

Identificador único del  producto.

name 

String 

Tarjetas de Crédito 

Nombre del Producto.

description 

String

Tarjeta de consumo  bajo la modalidad de  crédito

Descripción del Producto.

logo 

String

enlace

Url de un logo representativo para el  producto

date_release 

Date 

2023-02-01

Fecha a liberar el producto  para los clientes en General

date_revision 

Date 

2024-02-01

Fecha de revisión del producto para cambiar  Términos y Condiciones

 

Servicios 

Los servicios por consumir serán de manera local. Tendrá que correr un proyecto backend 
realizado con Node.js.

Para hacerlo debe seguir los siguientes pasos:

1. Descargar al final de esta pregunta en 'Download starter project'.
2. Descomprimir el archivo repo-interview-main.zip. 
3. Abrir un terminal apuntando a la carpeta descomprimida.
4. Instalar las dependencias con npm install.
5. Correr el proyecto con el comando npm run start:dev
6. Se abrirá el servicio en el puerto http://localhost:3002

Url Base: http://localhost:3002

 

OBTENER PRODUCTOS FINANCIEROS 

URL 

/bp/products

METHOD 

GET

EXAMPLE 

http://localhost:3002/bp/products

RESPONSES

Code 

Description

200

{
    "data": [
        {
            "id": "uno",
            "name": "Nombre producto",
            "description": "Descripción producto",
            "logo": "assets-1.png",
            "date_release": "2025-01-01",
            "date_revision": "2025-01-01"
        }
   ]
 

CREAR PRODUCTO FINANCIERO

URL 

/bp/products

METHOD 

POST

EXAMPLE 

http://localhost:3002/bp/products

REQUEST

Json Body

{
    "id": "dos",
    "name": "Nombre producto",
    "description": "Descripción producto",
    "logo": "assets-1.png",
    "date_release": "2025-01-01",
    "date_revision": "2025-01-01"
}
RESPONSES

Code 

Description

200

{
    "message": "Product added successfully",
    "data": {
        "id": "dos",
        "name": "Nombre producto",
        "description": "Descripción producto",
        "logo": "assets-1.png",
        "date_release": "2025-01-01",
        "date_revision": "2025-01-01"
    }
} 
400 

{
    "name": "BadRequestError",
    "message": "Invalid body, check 'errors' property for more info.",
    ...
}

 

ACTUALIZAR PRODUCTO FINANCIERO

URL 

/bp/products/:id

METHOD 

PUT

EXAMPLE 

http://localhost:3002/bp/products/uno

REQUEST

Json Body

{
    "name": "Nombre actualizado",
    "description": "Descripción producto",
    "logo": "assets-1.png",
    "date_release": "2025-01-01",
    "date_revision": "2025-01-01"
}
RESPONSES

Code 

Description

200

{
    "message": "Product updated successfully",
    "data": {
        "name": "Nombre actualizado",
        "description": "Descripción producto",
        "logo": "assets-1.png",
        "date_release": "2025-01-01",
        "date_revision": "2025-01-01"
    }
}
404

{
    "name": "NotFoundError",
    "message": "Not product found with that identifier",
    ...
} 

 

ELIMINAR PRODUCTOS FINANCIEROS

URL 

/bp/products/:id

METHOD 

DELETE

EXAMPLE 

http://localhost:3002/bp/products/dos

PARAMS

id 

dos

RESPONSES

Code 

Description

200 

{
    "message": "Product removed successfully"
} 

404 

{
    "name": "NotFoundError",
    "message": "Not product found with that identifier",
    ...
} 

 

VERIFICACIÓN DE EXISTENCIA DE ID 

URL 

/bp/products/verification/:id 

METHOD 

GET

EXAMPLE 

http://localhost:3002/bp/products/verification/uno

PARAMS

id 

uno

RESPONSES

Code 

Description

200 

true/false (true existe / false no existe)

 

Recordatorio de Entregables 

Por favor al momento de enviar su respuesta, crear un repositorio público en Github con todos los archivos generados y colocar la URL al repositorio en los comentarios de este ejercicio.
Añadir un archivo ReadMe.md con las instrucciones de ejecución del proyecto y sus pruebas unitarias.
Adicional, Subir un .zip o .rar con todos los archivos generados.

