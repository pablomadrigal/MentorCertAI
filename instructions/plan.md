# Plan de Desarrollo Detallado - Plataforma de Mentorías 1a1 con Certificación Blockchain en Starknet

Este documento describe el plan de desarrollo detallado para la construcción de la plataforma de mentorías 1a1, basado en la especificación `spec.md`.  Se desglosa el proceso en iteraciones y pasos pequeños, priorizando el progreso incremental y las pruebas tempranas.

**Plan Detallado Paso a Paso**

**Fase 1: Configuración Inicial y Estructura Básica**

1.  **Configurar el Proyecto Backend:**
    * Crear un nuevo proyecto backend (Node).
    * Configurar un entorno de desarrollo.
    * Definir la estructura básica del proyecto (carpetas para modelos, controladores, rutas, etc.).
    * Configurar la conexión a una base de datos (SQLite para desarrollo inicial).
2.  **Configurar el Proyecto Frontend:**
    * Crear un nuevo proyecto frontend (React).
    * Configurar un entorno de desarrollo.
    * Establecer la estructura básica del proyecto (componentes, páginas, etc.).
3.  **Modelo de Datos Inicial:**
    * Implementar el modelo de datos `Estudiantes` en el backend.
    * Crear las migraciones/esquemas de la base de datos correspondientes.
4.  **Rutas y Controladores de Estudiantes:**
    * Definir las rutas para la creación de estudiantes.
    * Implementar los controladores para manejar la creación de estudiantes (FR10 - Registro Automático).

**Fase 2: Integración de Videollamadas y Transcripción**

5.  **Integración con API de Videollamadas:**
    * Investigar y seleccionar una API de videollamadas (Zoom o Google Meet).
    * Implementar la autenticación con la API.
    * Desarrollar la lógica para obtener la transcripción de una llamada (FR02).
6.  **Pruebas de la Integración de Videollamadas:**
    * Escribir pruebas unitarias para la función de obtención de la transcripción.
    * Realizar pruebas de integración simulando una llamada y verificando la obtención de la transcripción.

**Fase 3:  Análisis de IA y Generación de Exámenes**

7.  **Integración con el Agente de IA:**
    * Seleccionar un servicio de IA o modelo de lenguaje.
    * Implementar la comunicación con el agente de IA (envío de la transcripción, recepción del examen).
8.  **Modelo de Datos para Exámenes:**
    * Implementar el modelo de datos `Examenes` en el backend (temporalmente para desarrollo).
    * Crear las migraciones/esquemas de la base de datos correspondientes.
9.  **Lógica de Generación de Exámenes:**
    * Implementar la lógica en el backend para procesar la respuesta del agente de IA y almacenar el examen (temporalmente).
10. **Pruebas de la Integración de IA y Generación de Exámenes:**
    * Escribir pruebas unitarias para la lógica de generación de exámenes.
    * Realizar pruebas de integración simulando una transcripción y verificando la generación del examen.

**Fase 4:  Frontend, Corrección y Certificados**

11. **Interfaz de Usuario para el Examen:**
    * Desarrollar la interfaz en el frontend para mostrar el examen al estudiante.
    * Implementar la lógica para capturar las respuestas del estudiante.
12. **Lógica de Corrección del Examen:**
    * Implementar la lógica en el backend para corregir el examen (FR05).
13. **Modelo de Datos para Certificados:**
    * Implementar el modelo de datos `Certificados` en el backend.
    * Crear las migraciones/esquemas de la base de datos correspondientes.
14. **Generación de Certificados Blockcerts:**
    * Implementar la lógica en el backend para generar los datos del certificado Blockcerts (FR06).
15. **Pruebas del Flujo de Examen y Certificación:**
    * Realizar pruebas de integración del frontend y backend para el flujo completo del examen (presentación, captura de respuestas, corrección).
    * Probar la generación del certificado Blockcerts.

**Fase 5:  Integración con Starknet y NFTs**

16. **Contrato Inteligente en Starknet:**
    * Desarrollar el contrato inteligente en Cairo para la gestión de certificados y NFTs (FR07, FR08).
    * Desplegar el contrato en una red de prueba de Starknet.
17. **Integración con Starknet:**
    * Implementar la lógica en el backend para interactuar con el contrato inteligente (acuñación de NFTs).
18. **Landing Page del Estudiante:**
    * Desarrollar la landing page en el frontend para que el estudiante vea sus certificados y NFTs (FR09).
19. **Pruebas de la Integración con Starknet y NFTs:**
    * Probar la acuñación de NFTs y la consulta de metadatos en Starknet.
    * Probar el flujo completo desde la generación del certificado hasta la visualización del NFT en la landing page.

**Fase 6:  Pruebas Finales y Despliegue**

20. **Pruebas de Usuario:**
    * Realizar pruebas de usuario completas para todo el flujo de la plataforma.
21. **Manejo de Errores y Logging:**
    * Implementar el manejo de errores y logging en el backend.
22. **Despliegue:**
    * Desplegar el frontend y el backend en un entorno de prueba.
    * Desplegar el contrato inteligente en la red de prueba de Starknet.

**Desglose en Iteraciones y Pasos Pequeños**

A continuación, se detalla el desglose en iteraciones y pasos pequeños, adecuados para el desarrollo iterativo con prompts para un LLM.

**Iteración 1:  Configuración Inicial y Modelo de Estudiantes**

* **Paso 1.1:** Configurar el proyecto backend (Node) con la estructura básica.
    * **Prompt:** "Crea un nuevo proyecto backend en [Node] con la estructura de carpetas para modelos, controladores, rutas y middlewares. Configura un entorno de desarrollo con las dependencias necesarias (ej., Flask/Express, ORM si aplica)."
* **Paso 1.2:** Configurar el proyecto frontend (React) con la estructura básica.
    * **Prompt:** "Crea un nuevo proyecto frontend en React con la estructura de carpetas para componentes, páginas y estilos. Configura un entorno de desarrollo con las dependencias necesarias (ej., `create-react-app` o Vite)."
* **Paso 1.3:** Definir el modelo de datos `Estudiantes` en el backend.
    * **Prompt:** "Define el modelo de datos `Estudiantes` en [ORM/lenguaje] con los campos: `id` (entero, clave primaria, autoincremental), `correo` (cadena, único, no nulo), `contrasena_hash` (cadena, no nulo), `nombre` (cadena, no nulo), `apellido` (cadena, no nulo)."
* **Paso 1.4:** Crear las migraciones/esquemas de la base de datos para `Estudiantes`.
    * **Prompt:** "Crea las migraciones/esquemas de la base de datos para el modelo `Estudiantes` en [ORM/lenguaje] para [base de datos, ej., SQLite]."
* **Paso 1.5:** Definir las rutas y controladores para la creación de estudiantes.
    * **Prompt:** "Define la ruta `/estudiantes` (POST) y el controlador correspondiente para crear un nuevo estudiante en el backend. El controlador debe recibir `correo`, `contrasena`, `nombre` y `apellido` en el cuerpo de la solicitud, hashear la contraseña, y guardar el nuevo estudiante en la base de datos.  Devuelve un código de estado 201 y el ID del estudiante creado."
* **Paso 1.6:** Implementar pruebas unitarias para la creación de estudiantes.
    * **Prompt:** "Escribe pruebas unitarias para el controlador de creación de estudiantes. Las pruebas deben verificar que se crea un estudiante correctamente, que se hashea la contraseña, que se manejan los errores de validación (ej., correo duplicado), y que se devuelve el código de estado correcto."

**Iteración 2: Integración de Videollamadas (Ejemplo con Transcripción Simulada)**

* **Paso 2.1:** Crear una función simulada para obtener la transcripción. (Esto es temporal para avanzar sin la API real)
    * **Prompt:** "Crea una función en el backend llamada `obtenerTranscripcionSimulada` que devuelve una transcripción de ejemplo (cadena de texto) con identificación de hablantes (ej., 'Mentor: Hola, estudiante. Estudiante: Hola, mentor.'). Esta función simula la llamada a la API de la plataforma de videollamadas."
* **Paso 2.2:** Definir la ruta y el controlador para obtener la transcripción (usando la función simulada).
    * **Prompt:** "Define la ruta `/transcripcion` (POST) que llama a la función `obtenerTranscripcionSimulada` y devuelve la transcripción.  Este paso es temporal; luego se reemplazará con la integración real de la API."
* **Paso 2.3:** Implementar pruebas unitarias para la obtención de la transcripción (con la función simulada).
    * **Prompt:** "Escribe pruebas unitarias para la ruta `/transcripcion`.  Verifica que la ruta devuelve una transcripción (cadena de texto) y que tiene el formato esperado (con identificación de hablantes)."

**Iteración 3:  Integración con el Agente de IA (Simulada) y Modelo de Exámenes**

* **Paso 3.1:** Crear una función simulada para el agente de IA.
    * **Prompt:** "Crea una función en el backend llamada `generarExamenSimulado` que recibe una transcripción y devuelve un examen de ejemplo en formato JSON. El examen debe contener preguntas de sí/no y selección múltiple (al menos 3 de cada tipo). Incluye la clave de respuestas correctas en el JSON."
* **Paso 3.2:** Definir la ruta y el controlador para generar el examen (usando la función simulada).
    * **Prompt:** "Define la ruta `/examen` (POST) que recibe una transcripción en el cuerpo de la solicitud, llama a `generarExamenSimulado`, y devuelve el examen en formato JSON."
* **Paso 3.3:** Implementar el modelo de datos `Examenes` (temporal).
    * **Prompt:** "Define el modelo de datos `Examenes` en [ORM/lenguaje] con los campos: `id` (entero, clave primaria, autoincremental), `estudiante_id` (entero, clave foránea a `Estudiantes.id`, no nulo), `preguntas` (JSON), `respuestas_estudiante` (JSON), `calificacion` (flotante), `fecha_realizacion` (timestamp)."
* **Paso 3.4:** Crear las migraciones/esquemas de la base de datos para `Examenes`.
    * **Prompt:** "Crea las migraciones/esquemas de la base de datos para el modelo `Examenes` en [ORM/lenguaje]."
* **Paso 3.5:** Implementar pruebas unitarias para la generación del examen (con la función simulada).
    * **Prompt:** "Escribe pruebas unitarias para la ruta `/examen`.  Verifica que la ruta recibe una transcripción, devuelve un examen en formato JSON válido, y que el JSON contiene preguntas de ambos tipos y la clave de respuestas."

**Iteración 4:  Frontend Básico para el Examen**

* **Paso 4.1:** Crear un componente en el frontend para mostrar una pregunta de sí/no.
    * **Prompt:** "Crea un componente en React llamado `PreguntaSiNo` que recibe un objeto de pregunta (con `texto` y `tipo`) y muestra el texto de la pregunta con dos botones: 'Sí' y 'No'. El componente debe manejar la selección del usuario y devolver la respuesta."
* **Paso 4.2:** Crear un componente en el frontend para mostrar una pregunta de selección múltiple.
    * **Prompt:** "Crea un componente en React llamado `PreguntaSeleccionMultiple` que recibe un objeto de pregunta (con `texto`, `opciones` y `tipo`) y muestra el texto de la pregunta con botones para cada opción. El componente debe manejar la selección del usuario y devolver la respuesta."
* **Paso 4.3:** Crear una página en el frontend para mostrar el examen.
    * **Prompt:** "Crea una página en React llamada `PaginaExamen` que recibe un array de preguntas en formato JSON. La página debe renderizar cada pregunta usando los componentes `PreguntaSiNo` o `PreguntaSeleccionMultiple` según el tipo de pregunta.  La página debe tener un botón 'Enviar Examen' que recopila todas las respuestas del usuario y las envía al backend."
* **Paso 4.4:** Implementar la lógica en el frontend para enviar las respuestas del examen al backend.
    * **Prompt:** "En la `PaginaExamen`, implementa la lógica para enviar las respuestas del usuario (en formato JSON) a una nueva ruta `/respuestas-examen` (POST) en el backend."

**Iteración 5:  Lógica de Corrección del Examen**

* **Paso 5.1:** Definir la ruta y el controlador para recibir las respuestas del examen y corregirlo.
    * **Prompt:** "Define la ruta `/respuestas-examen` (POST) en el backend. El controlador debe recibir las respuestas del estudiante y el examen original (con la clave de respuestas) en el cuerpo de la solicitud.  El controlador debe calcular la calificación del estudiante (porcentaje de preguntas correctas) y guardarla en la tabla `Examenes` junto con las respuestas del estudiante."
* **Paso 5.2:** Implementar pruebas unitarias para la corrección del examen.
    * **Prompt:** "Escribe pruebas unitarias para el controlador de `/respuestas-examen`.  Verifica que la calificación se calcula correctamente, que las respuestas y la calificación se guardan en la base de datos, y que se manejan los casos donde faltan datos o el formato es incorrecto."

**Iteración 6:  Modelo de Certificados y Generación de Datos (Sin Blockchain)**

* **Paso 6.1:** Implementar el modelo de datos `Certificados`.
    * **Prompt:** "Define el modelo de datos `Certificados` en [ORM/lenguaje] con los campos: `id` (entero, clave primaria, autoincremental), `estudiante_id` (entero, clave foránea a `Estudiantes.id`, no nulo), `fecha_emision` (fecha), `tematica` (cadena), `calificacion` (flotante), `hash_certificado` (cadena, único), `id_certificado_blockcert` (cadena, único), `token_id_nft` (cadena, único)."
* **Paso 6.2:** Crear las migraciones/esquemas de la base de datos para `Certificados`.
    * **Prompt:** "Crea las migraciones/esquemas de la base de datos para el modelo `Certificados` en [ORM/lenguaje]."
* **Paso 6.3:** Implementar la lógica para generar los datos del certificado (sin Blockcerts aún).
    * **Prompt:** "En el controlador de `/respuestas-examen`, después de calcular la calificación, agrega la lógica para crear un registro en la tabla `Certificados` si la calificación es mayor o igual al 70%.  Genera un `hash_certificado` aleatorio (simulado para ahora) y un `id_certificado_blockcert` aleatorio (simulado para ahora).  No te preocupes por `token_id_nft` aún."
* **Paso 6.4:** Implementar pruebas unitarias para la generación del certificado (simulada).
    * **Prompt:** "Escribe pruebas unitarias para el controlador de `/respuestas-examen`.  Verifica que se crea un certificado si la calificación es suficiente, que no se crea si no lo es, y que los campos `hash_certificado` y `id_certificado_blockcert` se generan (aunque sean simulados)."

**Iteración 7 y siguientes:** Continuar con la implementación de la integración de la API de videollamadas real, la integración real del agente de IA, la integración con Starknet, la acuñación de NFTs, la landing page, las pruebas de usuario, el manejo de errores y el despliegue.

**Puntos Clave de la Estrategia:**

* **Simulación Inicial:** Se utilizan funciones simuladas (`obtenerTranscripcionSimulada`, `generarExamenSimulado`) para poder avanzar con el desarrollo del frontend y la lógica básica del backend antes de tener las integraciones reales listas.  Esto permite un desarrollo paralelo y reduce la dependencia de servicios externos en las primeras etapas.
* **Pruebas en Cada Paso:** Cada paso tiene un paso de pruebas unitarias asociado. Esto asegura que cada parte del código funciona correctamente antes de pasar al siguiente paso.  Las pruebas de integración se realizarán en etapas posteriores, cuando haya más componentes para integrar.
* **Iteraciones Pequeñas:** Cada iteración se centra en una funcionalidad específica y se divide en pasos pequeños y manejables.  Esto facilita el desarrollo, las pruebas y la depuración.
* **Enfoque en el Flujo:** El desarrollo se centra en construir el flujo principal de la aplicación: desde la creación del estudiante hasta la generación del certificado (y eventualmente, el NFT).
* **Abstracción:**