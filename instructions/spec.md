# Especificación Detallada de la Plataforma de Mentorías 1a1 con Certificación Blockchain en Starknet

**Versión:** 1.0
**Fecha:** 12 de mayo de 2025
**Estado:** Borrador Final para MVP Hackathon

## 1. Introducción

Este documento describe la especificación detallada para el desarrollo de una plataforma web que permita a mentores individuales realizar videollamadas 1a1 con sus clientes/estudiantes. La plataforma integrará transcripción automática, análisis de inteligencia artificial para la generación de exámenes personalizados basados en el contenido de la llamada, y la emisión de certificados de aprendizaje verificables en la blockchain de Starknet, junto con NFTs asociados. El objetivo principal de esta especificación es proporcionar una guía clara y completa para el equipo de desarrollo, permitiendo la creación de un Producto Mínimo Viable (MVP) funcional para un Hackathon de 2 semanas del ecosistema Starknet.

## 2. Objetivos del MVP

* Permitir a mentores realizar videollamadas 1a1 con estudiantes.
* Generar automáticamente una transcripción de la videollamada.
* Analizar la transcripción mediante un agente de IA para identificar el área general, ideas principales y subáreas de evaluación.
* Generar automáticamente un examen sencillo (preguntas de sí/no y selección múltiple) basado en el análisis de la IA.
* Corregir automáticamente el examen.
* Emitir un certificado digital verificable en la blockchain de Starknet (siguiendo las especificaciones de Blockcerts) a los estudiantes que obtengan una calificación superior al 70%.
* Crear un NFT asociado a cada certificado emitido en Starknet, almacenando metadatos relevantes (calificación, fecha, temática, ID y hash del certificado).
* Proporcionar una landing page básica para los estudiantes donde puedan ver sus certificados y futuras llamadas.

## 3. Usuarios

* **Mentor Individual:** El usuario principal que utiliza la plataforma para interactuar con sus estudiantes y ofrecer valor añadido a través de la certificación.
* **Estudiante/Cliente:** El usuario que participa en las videollamadas y realiza los exámenes para obtener certificados verificables.

## 4. Flujo de Trabajo Principal

1.  **Agendamiento de la Llamada:** El mentor agenda una videollamada con el estudiante (fuera del alcance del MVP, se asume que ya está agendada y se comparte un enlace).
2.  **Acceso a la Videollamada:** El estudiante accede a la plataforma a través de un enlace único, lo que genera la creación automática de una cuenta (almacenando correo, contraseña hasheada, nombre y apellido).
3.  **Videollamada:** El mentor y el estudiante realizan la videollamada. Se utiliza una plataforma de videoconferencias de terceros con capacidades de transcripción (Zoom o Google Meet son las opciones iniciales).
4.  **Obtención de la Transcripción:** Una vez finalizada la llamada, se obtiene la transcripción con identificación de hablantes a través de la API de la plataforma de videoconferencias seleccionada.
5.  **Análisis de la IA:** La transcripción se envía a un agente de IA para:
    * Identificar el área general de la llamada (de un conjunto predefinido de 20+ áreas).
    * Extraer entre 3 y 5 ideas principales.
    * Definir subáreas de evaluación.
    * Identificar ejemplos y conceptos clave.
6.  **Generación del Examen:** La IA genera automáticamente un examen con preguntas de sí/no y selección múltiple basadas en el análisis de la transcripción. El número y la complejidad de las preguntas serán dinámicos según la duración y profundidad de la llamada.
7.  **Presentación y Corrección del Examen:** Al finalizar la llamada, el estudiante es redirigido automáticamente a la página del examen. El examen se corrige automáticamente por el software.
8.  **Emisión del Certificado:** Si la calificación es superior al 70%, se genera un certificado digital siguiendo las especificaciones de Blockcerts. La información del certificado incluirá el nombre del estudiante, el nombre del mentor (o plataforma), la fecha de emisión, un identificador único, y los criterios de aprobación.
9.  **Acuñación del NFT:** Se acuña un NFT en la blockchain de Starknet asociado al certificado. Los metadatos del NFT incluirán la calificación, fecha de emisión, temática (área general), ID del certificado y hash del certificado Blockcert. El nombre del estudiante no se incluirá en los metadatos del NFT por privacidad.
10. **Visualización para el Estudiante:** El estudiante puede ver sus certificados obtenidos en una landing page personal. Cada certificado mostrará un resumen y tendrá enlaces para ver el certificado Blockcert completo y el NFT asociado (a través de un explorador de bloques como Starkscan).

## 5. Requisitos Funcionales

* **FR01: Videollamada 1a1:** La plataforma debe permitir la integración con una solución de videollamadas de terceros para facilitar las sesiones 1a1 entre mentores y estudiantes.
* **FR02: Transcripción Automática:** El sistema debe obtener automáticamente la transcripción de la videollamada, identificando quién dijo qué.
* **FR03: Análisis de IA:** Un agente de IA debe analizar la transcripción para identificar el área general, ideas principales y subáreas de evaluación.
* **FR04: Generación de Exámenes:** El sistema debe generar automáticamente exámenes con preguntas de sí/no y selección múltiple basadas en el análisis de la IA.
* **FR05: Corrección Automática:** El sistema debe corregir automáticamente los exámenes y determinar si el estudiante aprueba (calificación > 70%).
* **FR06: Generación de Certificados Blockcerts:** Si el estudiante aprueba, el sistema debe generar un certificado digital siguiendo las especificaciones de Blockcerts.
* **FR07: Acuñación de NFTs en Starknet:** El sistema debe acuñar un NFT en la blockchain de Starknet asociado a cada certificado aprobado.
* **FR08: Metadatos del NFT:** El NFT debe contener metadatos que incluyan la calificación, fecha de emisión, temática (área general), ID del certificado y hash del certificado Blockcert.
* **FR09: Landing Page del Estudiante:** El estudiante debe tener una página donde pueda ver sus certificados obtenidos, con enlaces para ver el certificado Blockcert y el NFT asociado.
* **FR10: Registro Automático de Estudiantes:** Al acceder al enlace de la primera llamada, se debe crear automáticamente una cuenta para el estudiante (correo, contraseña hasheada, nombre, apellido).

## 6. Requisitos No Funcionales

* **NFR01: Rendimiento:** La redirección al examen después de la llamada debe ser rápida. La generación del certificado y el NFT deben realizarse en un tiempo razonable.
* **NFR02: Seguridad:** Las contraseñas de los estudiantes deben almacenarse de forma segura (hasheadas y con salt). La comunicación con la blockchain de Starknet debe ser segura.
* **NFR03: Escalabilidad (Consideración Futura):** Aunque no es un requisito primario para el MVP, la arquitectura debe considerar la posibilidad de escalar el número de usuarios y mentorías en el futuro.
* **NFR04: Usabilidad:** La experiencia del estudiante al acceder a la plataforma, realizar el examen y ver sus certificados debe ser intuitiva y sencilla.
* **NFR05: Confiabilidad:** El sistema debe ser confiable en la generación de exámenes y la emisión de certificados.

## 7. Arquitectura del Sistema (MVP)

Para el MVP, se propone una arquitectura simplificada:

+---------------------+      +---------------------+      +---------------------+      +---------------------+
| Frontend (React)    | <--> | Backend (Python/Node) | <--> | Agente de IA        | <--> | Starknet Blockchain |
+---------------------+      +---------------------+      +---------------------+      +---------------------+
|                         |                         |                         |
|                         |                         |                         |
v                         v                         v                         v
+---------------------------------------------------------------------------------------+
|                                   Base de Datos (Básica)                              |
+---------------------------------------------------------------------------------------+


* **Frontend (React):** Interfaz de usuario para el estudiante (acceso a la llamada, presentación del examen, visualización de certificados).
* **Backend (Node):** Lógica del servidor para:
    * Gestionar la integración con la plataforma de videollamadas (obtención de la transcripción a través de su API).
    * Comunicación con el Agente de IA (envío de la transcripción y recepción del examen).
    * Lógica de corrección del examen.
    * Generación de los datos del certificado Blockcert.
    * Interacción con la blockchain de Starknet (despliegue del contrato, acuñación de NFTs, almacenamiento del hash del certificado).
    * Gestión de la base de datos (creación de cuentas de estudiantes, almacenamiento de información básica).
    * Servir la landing page del estudiante.
* **Agente de IA:** Servicio dedicado (podría ser un modelo de lenguaje grande alojado en la nube) para analizar la transcripción y generar el examen.
* **Starknet Blockchain:** Red donde se desplegará el contrato inteligente para la gestión de certificados y la acuñación de NFTs.
* **Base de Datos (Básica):** Almacenamiento de la información de los estudiantes (correo, contraseña hasheada, nombre, apellido) y la relación entre certificados y NFTs. Las transcripciones no se almacenarán.

## 8. Diseño de la Base de Datos (MVP)

Se requerirán al menos las siguientes tablas:

* **Estudiantes:**
    * `id` (Primary Key, Autoincremental)
    * `correo` (Unique, Not Null)
    * `contrasena_hash` (Not Null)
    * `nombre` (Not Null)
    * `apellido` (Not Null)
* **Certificados:**
    * `id` (Primary Key, Autoincremental)
    * `estudiante_id` (Foreign Key referencing `Estudiantes.id`, Not Null)
    * `fecha_emision` (Not Null)
    * `tematica` (Not Null)
    * `calificacion` (Not Null)
    * `hash_certificado` (Not Null, Unique)
    * `id_certificado_blockcert` (Not Null, Unique)
    * `token_id_nft` (Unique)
* **Examenes (Temporal):**
    * `id` (Primary Key, Autoincremental)
    * `estudiante_id` (Foreign Key referencing `Estudiantes.id`, Not Null)
    * `preguntas` (JSON - Almacena las preguntas generadas)
    * `respuestas_estudiante` (JSON - Almacena las respuestas del estudiante)
    * `calificacion` (Float)
    * `fecha_realizacion` (Timestamp)
    * `transcripcion_id` (Opcional - Para referencia durante el desarrollo)

## 9. Contratos Inteligentes en Starknet

* **Un único contrato inteligente (para el MVP)** gestionará tanto el registro básico de los certificados (almacenando el hash y metadatos clave) como la acuñación de los NFTs asociados.
* **Funcionalidades del Contrato:**
    * `mintCertificateNFT(estudiante_id, calificacion, fecha_emision, tematica, hash_certificado, id_certificado_blockcert)`: Acuña un nuevo NFT asociado a un certificado. El `estudiante_id` podría ser un identificador interno. El `token_id` del NFT podría ser un hash único derivado del `id_certificado_blockcert`.
    * `getCertificateMetadata(token_id)`: Permite consultar los metadatos asociados a un `token_id` de NFT.
    * Posiblemente, una función para verificar la existencia de un certificado por su `id_certificado_blockcert` o `hash_certificado`.
* **Implementación:** Se utilizará Cairo para desarrollar el contrato inteligente. Se recomienda seguir las mejores prácticas de seguridad y eficiencia de gas en Starknet.

## 10. Integración con Plataforma de Videollamadas

* Se investigarán las APIs de **Zoom y Google Meet** para identificar la forma más sencilla y rápida de obtener la transcripción de la llamada con identificación de hablantes.
* Se desarrollará la lógica en el backend para autenticarse con la API seleccionada y recuperar la transcripción una vez finalizada la llamada.

## 11. Agente de Inteligencia Artificial

* Se utilizará un modelo de lenguaje grande (posiblemente a través de una API de terceros como OpenAI, Cohere, o una solución open-source si se encuentra una adecuada para el MVP) para analizar la transcripción.
* **Proceso de Análisis:**
    1.  Recibir la transcripción como entrada.
    2.  Identificar el área general de la conversación (clasificación en 20+ categorías predefinidas).
    3.  Extraer las ideas principales (3-5).
    4.  Identificar subáreas de evaluación basadas en las ideas principales.
    5.  Generar preguntas de sí/no y selección múltiple que evalúen la comprensión de los conceptos clave y los ejemplos discutidos.
* **Formato de Salida:** El agente de IA debe devolver el examen en un formato estructurado (ej: JSON) que el backend pueda procesar fácilmente para presentarlo al estudiante y corregirlo.

## 12. Manejo de Datos

* **Transcripciones:** No se almacenarán de forma persistente una vez que sean procesadas por el agente de IA.
* **Datos Personales de Estudiantes:** Se almacenará el mínimo necesario (correo, contraseña hasheada, nombre, apellido) en la base de datos para la gestión de cuentas y la visualización de certificados.
* **Datos de Certificados y NFTs:** Se almacenarán en la base de datos para mantener la relación entre estudiantes, certificados y sus NFTs asociados. El hash del certificado se almacenará tanto en la base de datos como en los metadatos del NFT.

## 13. Estrategias de Manejo de Errores

* **Integración con API de Videollamadas:** Implementar mecanismos para manejar errores de conexión, problemas de autenticación o fallos en la obtención de la transcripción (ej: reintentos, logs de error).
* **Comunicación con el Agente de IA:** Manejar errores de conexión, timeouts o respuestas inválidas del agente de IA. En caso de fallo, podría haber un examen por defecto o notificar al mentor (fuera del alcance del MVP).
* **Interacción con la Blockchain de Starknet:** Implementar manejo de errores en las transacciones de despliegue y acuñación (ej: fallos de conexión, errores en el contrato).
* **Validación de Datos:** Validar los datos antes de almacenarlos en la base de datos y antes de interactuar con el contrato inteligente.
* **Logging:** Implementar un sistema de logging básico para registrar eventos importantes y errores para facilitar la depuración.

## 14. Plan de Pruebas (MVP)

Se realizarán las siguientes pruebas:

* **Pruebas Unitarias:** Probar funciones individuales del backend (ej: lógica de corrección del examen, generación de datos del certificado).
* **Pruebas de Integración:** Probar la interacción entre los diferentes componentes del sistema:
    * Backend y la API de la plataforma de videollamadas (obtención de la transcripción).
    * Backend y el Agente de IA (envío de la transcripción y recepción del examen).
    * Backend y la blockchain de Starknet (despliegue del contrato, acuñación de NFTs).
    * Frontend y Backend (flujo del estudiante al realizar el examen y ver sus certificados).
* **Pruebas de Usuario (Básicas):** Simular el flujo completo de un estudiante: acceder a la llamada (simulado), ser redirigido al examen, responder el examen, ver el resultado y (si aprueba) ver el certificado en su landing page y el enlace al NFT en Starkscan.
* **Pruebas del Contrato Inteligente:** Desplegar el contrato en una red de prueba de Starknet (Goerli o Sepolia para Starknet) y probar las funciones de acuñación y consulta de metadatos.

## 15. Despliegue (MVP)

Para el MVP, se podría considerar un despliegue simplificado utilizando servicios en la nube para el backend y el frontend. El contrato inteligente se desplegará en la red de prueba de Starknet.

## 16. Propiedad Intelectual y Licencias

*(Este punto se discutirá más a fondo fuera del alcance inmediato del MVP del Hackathon, pero se reconoce su importancia para el futuro del proyecto.)*

## 17. Referencias Cruzadas

* **instructions/ui-ux-design.md:** *(Este archivo podría contener más detalles sobre el diseño del landing page del estudiante si se hubiera creado una especificación visual más detallada durante la lluvia de ideas.)*
* **instructions/starknet-contract.md:** *(Este archivo podría contener el código del contrato inteligente en Cairo una vez desarrollado.)*
* **instructions/ai-integration.md:** *(Este archivo podría contener detalles sobre la selección y configuración del agente de IA.)*
* **instructions/video-api-integration.md:** *(Este archivo podría contener detalles sobre la integración específica con la API de Zoom o Google Meet.)*

Este documento proporciona una especificación detallada para el desarrollo del MVP. El equipo de desarrollo debe revisar cuidadosamente cada sección antes de comenzar la implementación. Durante el proceso de desarrollo, es posible que surjan preguntas o se necesiten aclaraciones adicionales. La comunicación constante y la colaboración serán clave para el éxito del proyecto en el plazo del Hackathon.