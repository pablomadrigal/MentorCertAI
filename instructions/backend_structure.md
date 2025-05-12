# Estructura del Backend - MentorCertAi

**Documentos de Referencia:**

* **spec.md:** Especificación detallada del proyecto.
* **plan.md:** Plan de desarrollo detallado con iteraciones y pasos.
* **app_flow.md:** Diagramas de flujo de la aplicación.

## 1.  Estructura de la API Principal

La API del backend se diseñará siguiendo principios RESTful para facilitar la comunicación con el frontend y mantener la escalabilidad. Se utilizará Node.js con Express.js como framework principal.

**Principios Clave:**

* **Recursos:** Cada entidad principal (Estudiante, Examen, Certificado) se representará como un recurso.
* **Endpoints:** Se utilizarán endpoints claros y descriptivos para acceder y manipular los recursos.
* **Métodos HTTP:** Se utilizarán los métodos HTTP apropiados (GET, POST, PUT, DELETE) para cada operación.
* **Códigos de Estado:** Se utilizarán códigos de estado HTTP estándar para indicar el resultado de cada solicitud.
* **Formato ```json:** Se utilizará ```json para el intercambio de datos entre el frontend y el backend.

## 2.  Patrones de Endpoint

Se seguirán patrones de endpoint RESTful para organizar la API:

* `/estudiantes`: Manejo de la creación de estudiantes.
* `/transcripcion`:  (Temporal) Obtención de la transcripción de la videollamada.
* `/examen`: Generación del examen a partir de la transcripción.
* `/respuestas-examen`: Envío y corrección de las respuestas del examen.
* `/certificados`:  Manejo de la creación y obtención de certificados.

**Ejemplos:**

* `POST /estudiantes`: Crear un nuevo estudiante.
* `POST /examen`: Generar un nuevo examen.
* `POST /respuestas-examen`: Enviar las respuestas del estudiante para su corrección.
* `GET /certificados/{id_estudiante}`: Obtener los certificados de un estudiante específico.

## 3.  Formatos de Solicitud/Respuesta

Todas las solicitudes y respuestas se realizarán en formato ```json.

**Ejemplo de Solicitud (Crear Estudiante):**

```json
{
  "correo": "estudiante@ejemplo.com",
  "contrasena": "contrasena123",
  "nombre": "Juan",
  "apellido": "Pérez"
}
```

Ejemplo de Respuesta (Crear Estudiante - Éxito):

```json
{
  "id": 123,
  "mensaje": "Estudiante creado con éxito"
}
```

Ejemplo de Respuesta (Error):

```json
{
  "error": "El correo electrónico ya está registrado",
  "codigo": "EMAIL_DUPLICADO"
}
```

## 4. Estándares de Manejo de Errores
Se implementará un manejo de errores consistente en toda la API, utilizando códigos de estado HTTP apropiados y mensajes de error descriptivos.

Códigos de Estado HTTP:
200 OK: Éxito.
201 Created: Recurso creado con éxito.
400 Bad Request: Solicitud incorrecta (ej., datos faltantes o inválidos).
401 Unauthorized: No autorizado.
404 Not Found: Recurso no encontrado.
500 Internal Server Error: Error interno del servidor.
Formato de Error: Las respuestas de error incluirán un mensaje de error y, opcionalmente, un código de error específico.
Logging: Se implementará un sistema de logging para registrar los errores y facilitar la depuración.
Ejemplo de Manejo de Errores (Crear Estudiante):

Si se intenta crear un estudiante con un correo electrónico ya existente, el backend devolverá un código de estado 400 y un mensaje de error:

```json
{
  "error": "El correo electrónico ya está registrado",
  "codigo": "EMAIL_DUPLICADO"
}
```

## 5. Modelos de Datos (Entidades MVP)
Se definen los siguientes modelos de datos para las entidades principales del MVP:

Estudiante:

```JavaScript
{
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  correo: { type: DataTypes.STRING, unique: true, allowNull: false },
  contrasena_hash: { type: DataTypes.STRING, allowNull: false },
  nombre: { type: DataTypes.STRING, allowNull: false },
  apellido: { type: DataTypes.STRING, allowNull: false }
}
```

Examen (Temporal):

```JavaScript
{
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  estudiante_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Estudiantes', key: 'id' } },
  preguntas: { type: DataTypes.```json, allowNull: true }, //  ```json para flexibilidad
  respuestas_estudiante: { type: DataTypes.```json, allowNull: true },
  calificacion: { type: DataTypes.FLOAT },
  fecha_realizacion: { type: DataTypes.DATE },
  transcripcion_id: { type: DataTypes.STRING } //  Opcional, para desarrollo
}
```

Certificado:

```JavaScript
{
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  estudiante_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Estudiantes', key: 'id' } },
  fecha_emision: { type: DataTypes.DATE, allowNull: false },
  tematica: { type: DataTypes.STRING, allowNull: false },
  calificacion: { type: DataTypes.FLOAT, allowNull: false },
  hash_certificado: { type: DataTypes.STRING, allowNull: false, unique: true },
  id_certificado_blockcert: { type: DataTypes.STRING, allowNull: false, unique: true },
  token_id_nft: { type: DataTypes.STRING, unique: true }
}
```

## 6. Flujo de Autenticación (Registro Automático - MVP)
Para el MVP, se implementará un registro automático simplificado de estudiantes:

Acceso al Enlace: El estudiante accede a la plataforma a través de un enlace único.
Verificación de Existencia: El backend verifica si ya existe una cuenta con el correo electrónico proporcionado.
Creación de Cuenta (Si No Existe): Si no existe, se crea una nueva cuenta con los datos proporcionados (correo, contraseña, nombre, apellido). La contraseña se hashea antes de almacenarla en la base de datos.
Inicio de Sesión (Implícito): El estudiante se considera "logueado" automáticamente para la sesión actual. No se implementa un sistema de login/logout completo en el MVP.
Ejemplo de Código (Creación de Estudiante):

```JavaScript

//  Controlador para POST /estudiantes
const crearEstudiante = async (req, res) => {
  try {
    const { correo, contrasena, nombre, apellido } = req.body;

    //  Verificar si el correo ya existe
    const estudianteExistente = await Estudiante.findOne({ where: { correo } });
    if (estudianteExistente) {
      return res.status(400).json({ error: "El correo electrónico ya está registrado", codigo: "EMAIL_DUPLICADO" });
    }

    //  Hashear la contraseña
    const contrasena_hash = await bcrypt.hash(contrasena, 10);

    //  Crear el estudiante
    const nuevoEstudiante = await Estudiante.create({
      correo,
      contrasena_hash,
      nombre,
      apellido
    });

    return res.status(201).json({ id: nuevoEstudiante.id, mensaje: "Estudiante creado con éxito" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al crear el estudiante" });
  }
};
```
Criterios de Validación:

Se verifica que el correo electrónico no exista previamente en la base de datos.
La contraseña se hashea correctamente antes de almacenarla.
Se devuelve un código de estado 201 y el ID del estudiante creado en caso de éxito.
Se manejan los errores y se devuelve un código de estado 400 o 500 según el tipo de error.

## 7. Dependencias Externas (Críticas)
Express.js: Framework de Node.js para la creación de la API.
Sequelize: ORM (Object-Relational Mapping) para interactuar con la base de datos. (Se puede usar otro ORM o un cliente de base de datos directamente).
SQLite: Base de datos para desarrollo (se puede cambiar a PostgreSQL o MySQL en producción).
bcrypt: Librería para el hasheo de contraseñas.
axios o node-fetch: Para realizar peticiones HTTP a la API del Agente de IA y a la API de la plataforma de videollamadas.

## 8. Línea de Tiempo (15 Días)
La siguiente línea de tiempo se basa en el plan de desarrollo detallado (plan.md) y se adapta al desarrollo del backend. Se asumen 2 desarrolladores trabajando en paralelo.

Día 1-2: Configuración Inicial y Modelo de Estudiantes

Desarrollador 1: Configurar el proyecto backend, definir el modelo de datos Estudiantes, crear las migraciones. (Pasos 1.1, 1.3, 1.4 de plan.md)
Desarrollador 2: Configurar las rutas y controladores para la creación de estudiantes, implementar las pruebas unitarias. (Pasos 1.5, 1.6 de plan.md)
Día 3-4: Integración de Videollamadas (Simulado)

Desarrollador 1: Crear la función simulada para obtener la transcripción, definir la ruta y el controlador correspondiente. (Pasos 2.1, 2.2 de plan.md)
Desarrollador 2: Implementar las pruebas unitarias para la obtención de la transcripción (con la función simulada). (Paso 2.3 de plan.md)
Día 5-6:  Análisis de IA (Simulado) y Modelo de Exámenes

Desarrollador 1: Crear la función simulada para el agente de IA, definir la ruta y el controlador para generar el examen. (Pasos 3.1, 3.2 de plan.md)
Desarrollador 2: Implementar el modelo de datos Examenes, crear las migraciones, implementar las pruebas unitarias para la generación del examen. (Pasos 3.3, 3.4, 3.5 de plan.md)
Día 7-8:  Lógica de Corrección del Examen

Ambos Desarrolladores: Colaborar en la implementación de la ruta y el controlador para recibir las respuestas del examen y corregirlo, así como en las pruebas unitarias. (Pasos 5.1, 5.2 de plan.md)
Día 9-10:  Modelo de Certificados y Generación de Datos (Sin Blockchain)

Desarrollador 1: Implementar el modelo de datos Certificados, crear las migraciones. (Pasos 6.1, 6.2 de plan.md)
Desarrollador 2: Implementar la lógica para generar los datos del certificado (simulado), implementar las pruebas unitarias. (Pasos 6.3, 6.4 de plan.md)
Día 11-13: Integración Real

Ambos Desarrolladores: Trabajar en la integración real con la API de videollamadas y el Agente de IA (si es posible avanzar con esto en el MVP), y en la integración con Starknet (si se decide incluir algo de esta lógica en el backend en el MVP). (Pasos 7.1, 8.1, 9.1 de plan.md - Priorizar la API de videollamadas si hay tiempo)
Día 14-15: Pruebas, Manejo de Errores y Ajustes

Ambos Desarrolladores: Realizar pruebas de integración, implementar el manejo de errores y logging, realizar ajustes finales. (Pasos 11.1, 13.1 de verificacion.md)
Notas:

Esta línea de tiempo es una guía y puede ajustarse según las prioridades y los avances del desarrollo.
La comunicación constante entre los desarrolladores y el uso de un sistema de control de versiones (Git) son cruciales.
Se prioriza la implementación del flujo principal de la aplicación y las funcionalidades esenciales para el MVP.
La integración completa con Starknet puede requerir más tiempo y podría posponerse para una fase posterior si es necesario.