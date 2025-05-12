# Lista de Verificación de Desarrollo - Plataforma de Mentorías 1a1

**Documentos de Referencia:**

* **spec.md:** Especificación detallada del proyecto.
* **plan.md:** Plan de desarrollo detallado con iteraciones y pasos (generado previamente).

**Objetivo:** Desarrollar el MVP de la plataforma de mentorías en 15 días, para 2 desarrolladores, siguiendo las especificaciones de `spec.md`.

**Consideraciones:**

* Las tareas están priorizadas para mantener el flujo principal de la aplicación.
* Se asume que la gestión de usuarios (mentores) y el agendamiento de llamadas están fuera del alcance del MVP.
* Se enfoca en la funcionalidad esencial para demostrar el valor de la plataforma.

**Lista de Verificación:**

**Fase 1: Configuración Inicial y Estructura Básica**

* \[ ]   **1.1 Configurar el Proyecto Backend**
    * \[ ]   Crear un nuevo proyecto backend (Node).
    * \[ ]   Configurar un entorno de desarrollo.
    * \[ ]   Definir la estructura básica del proyecto (carpetas para modelos, controladores, rutas, middlewares, etc.).
    * \[ ]   Configurar la conexión a una base de datos (SQLite para desarrollo inicial).
    * **Referencia:** `plan.md` - Paso 1.1, `spec.md` - Sección 7
* \[ ]   **1.2 Configurar el Proyecto Frontend**
    * \[ ]   Crear un nuevo proyecto frontend (React).
    * \[ ]   Configurar un entorno de desarrollo.
    * \[ ]   Establecer la estructura básica del proyecto (componentes, páginas, estilos, etc.).
    * **Referencia:** `plan.md` - Paso 1.2, `spec.md` - Sección 7
* \[ ]   **1.3 Modelo de Datos Estudiantes**
    * \[ ]   Implementar el modelo de datos `Estudiantes` en el backend (id, correo, contrasena\_hash, nombre, apellido).
    * **Referencia:** `plan.md` - Paso 1.3, `spec.md` - Sección 8
* \[ ]   **1.4 Migraciones/Esquemas Estudiantes**
    * \[ ]   Crear las migraciones/esquemas de la base de datos para el modelo `Estudiantes`.
    * **Referencia:** `plan.md` - Paso 1.4, `spec.md` - Sección 8
* \[ ]   **1.5 Rutas/Controladores Creación Estudiantes**
    * \[ ]   Definir la ruta `/estudiantes` (POST).
    * \[ ]   Implementar el controlador para crear un nuevo estudiante (hashear contraseña, guardar en la base de datos).
    * \[ ]   Devolver código 201 y el ID del estudiante creado.
    * **Referencia:** `plan.md` - Paso 1.5, `spec.md` - FR10
* \[ ]   **1.6 Pruebas Unitarias Creación Estudiantes**
    * \[ ]   Escribir pruebas unitarias para el controlador de creación de estudiantes (creación exitosa, hasheo de contraseña, manejo de errores).
    * **Referencia:** `plan.md` - Paso 1.6, `spec.md` - Sección 14

**Fase 2: Integración de Videollamadas y Transcripción (Simulado)**

* \[ ]   **2.1 Función Simulada Transcripción**
    * \[ ]   Crear la función `obtenerTranscripcionSimulada` en el backend (devuelve transcripción de ejemplo con hablantes).
    * **Referencia:** `plan.md` - Paso 2.1
* \[ ]   **2.2 Ruta/Controlador Transcripción (Simulado)**
    * \[ ]   Definir la ruta `/transcripcion` (POST).
    * \[ ]   Llamar a `obtenerTranscripcionSimulada` y devolver la transcripción.
    * **Nota:** Temporal, se reemplazará con la API real.
    * **Referencia:** `plan.md` - Paso 2.2, `spec.md` - FR02
* \[ ]   **2.3 Pruebas Unitarias Transcripción (Simulado)**
    * \[ ]   Escribir pruebas unitarias para la ruta `/transcripcion` (verifica formato de la transcripción).
    * **Referencia:** `plan.md` - Paso 2.3, `spec.md` - Sección 14

**Fase 3:  Análisis de IA (Simulado) y Modelo de Exámenes**

* \[ ]   **3.1 Función Simulada Agente de IA**
    * \[ ]   Crear la función `generarExamenSimulado` en el backend (recibe transcripción, devuelve examen JSON con preguntas sí/no y selección múltiple, y clave de respuestas).
    * **Referencia:** `plan.md` - Paso 3.1
* \[ ]   **3.2 Ruta/Controlador Generación Examen (Simulado)**
    * \[ ]   Definir la ruta `/examen` (POST).
    * \[ ]   Recibir la transcripción, llamar a `generarExamenSimulado`, y devolver el examen JSON.
    * **Referencia:** `plan.md` - Paso 3.2, `spec.md` - FR03, FR04
* \[ ]   **3.3 Modelo de Datos Examenes (Temporal)**
    * \[ ]   Implementar el modelo de datos `Examenes` en el backend (id, estudiante\_id, preguntas, respuestas\_estudiante, calificacion, fecha\_realizacion, transcripcion\_id (opcional)).
    * **Referencia:** `plan.md` - Paso 3.3, `spec.md` - Sección 8
* \[ ]   **3.4 Migraciones/Esquemas Examenes**
    * \[ ]   Crear las migraciones/esquemas de la base de datos para el modelo `Examenes`.
    * **Referencia:** `plan.md` - Paso 3.4, `spec.md` - Sección 8
* \[ ]   **3.5 Pruebas Unitarias Generación Examen (Simulado)**
    * \[ ]   Escribir pruebas unitarias para la ruta `/examen` (verifica que se recibe transcripción, se devuelve JSON válido, y que contiene preguntas y clave).
    * **Referencia:** `plan.md` - Paso 3.5, `spec.md` - Sección 14

**Fase 4:  Frontend Básico y Corrección del Examen**

* \[ ]   **4.1 Componente Frontend Pregunta Sí/No**
    * \[ ]   Crear el componente `PreguntaSiNo` en React (recibe pregunta, muestra texto, botones 'Sí'/'No', devuelve respuesta).
    * **Referencia:** `plan.md` - Paso 4.1
* \[ ]   **4.2 Componente Frontend Pregunta Selección Múltiple**
    * \[ ]   Crear el componente `PreguntaSeleccionMultiple` en React (recibe pregunta, muestra texto, opciones, botones, devuelve respuesta).
    * **Referencia:** `plan.md` - Paso 4.2
* \[ ]   **4.3 Página Frontend Examen**
    * \[ ]   Crear la página `PaginaExamen` en React (recibe array de preguntas JSON, renderiza preguntas con los componentes, botón 'Enviar Examen').
    * **Referencia:** `plan.md` - Paso 4.3
* \[ ]   **4.4 Lógica Frontend Enviar Respuestas**
    * \[ ]   Implementar en `PaginaExamen` la lógica para enviar las respuestas del usuario (JSON) a la ruta `/respuestas-examen` (POST) en el backend.
    * **Referencia:** `plan.md` - Paso 4.4
* \[ ]   **5.1 Ruta/Controlador Corrección Examen**
    * \[ ]   Definir la ruta `/respuestas-examen` (POST).
    * \[ ]   Recibir respuestas y examen original, calcular la calificación, guardar en la tabla `Examenes`.
    * **Referencia:** `plan.md` - Paso 5.1, `spec.md` - FR05
* \[ ]   **5.2 Pruebas Unitarias Corrección Examen**
    * \[ ]   Escribir pruebas unitarias para la ruta `/respuestas-examen` (verifica cálculo de calificación, guardado de datos, manejo de errores).
    * **Referencia:** `plan.md` - Paso 5.2, `spec.md` - Sección 14

**Fase 6: Modelo de Certificados y Generación de Datos (Sin Blockchain)**

* \[ ]   **6.1 Modelo de Datos Certificados**
    * \[ ]   Implementar el modelo de datos `Certificados` en el backend (id, estudiante\_id, fecha\_emision, tematica, calificacion, hash\_certificado, id\_certificado\_blockcert, token\_id\_nft).
    * **Referencia:** `plan.md` - Paso 6.1, `spec.md` - Sección 8
* \[ ]   **6.2 Migraciones/Esquemas Certificados**
    * \[ ]   Crear las migraciones/esquemas de la base de datos para el modelo `Certificados`.
    * **Referencia:** `plan.md` - Paso 6.2, `spec.md` - Sección 8
* \[ ]   **6.3 Lógica Generación Datos Certificado (Simulado)**
    * \[ ]   En el controlador `/respuestas-examen`, agregar lógica para crear un registro en `Certificados` si la calificación >= 70%.
    * \[ ]   Generar `hash_certificado` y `id_certificado_blockcert` aleatorios (simulados).
    * **Nota:** No se implementa la lógica de Blockcerts en este paso.
    * **Referencia:** `plan.md` - Paso 6.3, `spec.md` - FR06
* \[ ]   **6.4 Pruebas Unitarias Generación Certificado (Simulado)**
    * \[ ]   Escribir pruebas unitarias para `/respuestas-examen` (verifica creación de certificado según calificación, generación de hash e ID simulados).
    * **Referencia:** `plan.md` - Paso 6.4, `spec.md` - Sección 14

**Fase 7 y siguientes:  Integración Real y Finalización**

* **Nota:** Estos pasos son más complejos y pueden requerir más tiempo. Se recomienda dividirlos aún más si es necesario.
* \[ ]   **7.1 Integración Real API Videollamadas**
    * \[ ]   Investigar y seleccionar la API (Zoom o Google Meet).
    * \[ ]   Implementar la autenticación con la API.
    * \[ ]   Reemplazar la función simulada `obtenerTranscripcionSimulada` con la llamada real a la API.
    * \[ ]   Adaptar el código para manejar diferentes formatos de transcripción (si es necesario).
    * \[ ]   Probar la integración con llamadas reales (o grabadas).
    * **Referencia:** `spec.md` - Sección 10, `instructions/video-api-integration.md` (si existe)
* \[ ]   **8.1 Integración Real Agente de IA**
    * \[ ]   Seleccionar el servicio de IA o modelo de lenguaje (OpenAI, Cohere, etc.).
    * \[ ]   Configurar la comunicación con la API del agente de IA.
    * \[ ]   Reemplazar la función simulada `generarExamenSimulado` con la llamada real al agente de IA.
    * \[ ]   Adaptar el código para procesar el formato de respuesta del agente de IA.
    * \[ ]   Probar la generación de exámenes con transcripciones reales.
    * **Referencia:** `spec.md` - Sección 11, `instructions/ai-integration.md` (si existe)
* \[ ]   **9.1 Integración con Starknet**
    * \[ ]   Desarrollar el contrato inteligente en Cairo (mintCertificateNFT, getCertificateMetadata).
    * \[ ]   Desplegar el contrato en la red de prueba de Starknet.
    * \[ ]   Implementar la lógica en el backend para interactuar con el contrato (acuñar NFTs, obtener metadatos).
    * \[ ]   Actualizar el modelo `Certificados` para guardar el `token_id_nft`.
    * **Referencia:** `spec.md` - Sección 9, `instructions/starknet-contract.md` (si existe)
* \[ ]   **10.1 Landing Page del Estudiante**
    * \[ ]   Desarrollar la landing page en el frontend (mostrar certificados, enlaces a Blockcert y NFT).
    * \[ ]   Integrar con el backend para obtener los datos del estudiante y sus certificados.
    * **Referencia:** `spec.md` - FR09, `instructions/ui-ux-design.md` (si existe)
* \[ ]   **11.1 Pruebas de Integración**
    * \[ ]   Realizar pruebas de integración exhaustivas de todos los componentes.
    * \[ ]   Probar el flujo completo de la aplicación (desde la transcripción hasta la visualización del NFT).
    * **Referencia:** `spec.md` - Sección 14
* \[ ]   **12.1 Pruebas de Usuario**
    * \[ ]   Realizar pruebas con usuarios reales (o simulados) para evaluar la usabilidad.
    * \[ ]   Recopilar comentarios y realizar ajustes.
    * **Referencia:** `spec.md` - Sección 14, NFR04
* \[ ]   **13.1 Manejo de Errores y Logging**
    * \[ ]   Implementar el manejo de errores en el backend (excepciones, validaciones, etc.).
    * \[ ]   Implementar el logging para registrar eventos y errores.
    * **Referencia:** `spec.md` - Sección 13, NFR02
* \[ ]   **14.1 Despliegue**
    * \[ ]   Preparar el entorno de despliegue.
    * \[ ]   Desplegar el frontend y el backend.
    * \[ ]   Desplegar el contrato inteligente en la red de prueba de Starknet.
    * \[ ]   Configurar el monitoreo de la aplicación.
    * **Referencia:** `spec.md` - Sección 15, NFR01, NFR03, NFR05

**Notas Adicionales:**

* La comunicación constante entre los desarrolladores es crucial.
* Se recomienda utilizar un sistema de control de versiones (Git) para la gestión del código.
* Se deben realizar revisiones de código periódicas para garantizar la calidad.
* Se debe adaptar esta lista de verificación a medida que avanza el desarrollo y surgen nuevos requisitos o desafíos.

Esta lista de verificación proporciona una guía completa para el desarrollo del MVP. Al seguir estos pasos y hacer referencia a los documentos `spec.md` y `plan.md`, el equipo de desarrollo podrá construir una plataforma de mentorías funcional y valiosa dentro del plazo establecido.