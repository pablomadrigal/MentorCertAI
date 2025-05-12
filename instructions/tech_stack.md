# Tech Stack para MentorCertAi

Este documento detalla la pila de tecnologías (Tech Stack) seleccionada para el desarrollo del Producto Mínimo Viable (MVP) de MentorCertAi, considerando un plazo de desarrollo de 15 días para un Hackathon. Se priorizan tecnologías estables, bien documentadas y adecuadas para el alcance del MVP.

## Tecnologías Principales

* **Frontend:** React (v18.2.0)
* **Backend:** Node.js (v18.x LTS) con Express.js (v4.18.x)
* **Base de Datos:** SQLite (v3.39.x) (para desarrollo rápido, se migrará a PostgreSQL en producción)
* **Blockchain:** Starknet (para la acuñación de NFTs y registro de certificados)
* **Lenguaje de Contratos Inteligentes:** Cairo (para el contrato en Starknet)
* **Agente de IA:** OpenAI API (gpt-3.5-turbo)
* **Videollamadas:** Zoom API (para la transcripción)

## Justificaciones y Detalles

###   Frontend: React (v18.2.0)

* **Justificación:** React es una biblioteca de JavaScript popular y eficiente para construir interfaces de usuario. Su naturaleza basada en componentes facilita el desarrollo rápido y la reutilización de código. La versión 18.2.0 ofrece mejoras de rendimiento y características modernas.
* **Configuración:**
    * Utilizar `create-react-app` o Vite para inicializar el proyecto.
    * Asegurar la instalación de las dependencias necesarias (ej., `react-router-dom` para la navegación).
    * Considerar el uso de un gestor de estado como Context API o Redux Toolkit si la complejidad de la aplicación lo justifica (para el MVP, Context API podría ser suficiente).
* **Bibliotecas Esenciales:**
    * `react-router-dom` (v6.x): Para la navegación entre páginas.
    * `axios` (v1.x): Para las peticiones HTTP al backend.

###   Backend: Node.js (v18.x LTS) con Express.js (v4.18.x)

* **Justificación:** Node.js es un entorno de ejecución de JavaScript del lado del servidor que permite utilizar JavaScript tanto en el frontend como en el backend, facilitando la cohesión del equipo. Express.js es un framework web minimalista y flexible para Node.js que simplifica la creación de APIs RESTful. La versión LTS (18.x) asegura soporte a largo plazo.
* **Configuración:**
    * Inicializar un proyecto Node.js con `npm init -y`.
    * Instalar Express.js y otras dependencias (ej., `cors`, `body-parser`, `sqlite3` (temporal)).
    * Utilizar un gestor de paquetes como `npm` o `yarn`.
* **Tecnologías Backend:**
    * Express.js (v4.18.x): Framework web para Node.js.
    * cors: Para habilitar solicitudes de origen cruzado.
    * body-parser: Para analizar el cuerpo de las solicitudes HTTP.
    * sqlite3 (v5.x): Driver para la base de datos SQLite (solo para desarrollo).
    * bcrypt (v5.x): Para el hash de contraseñas.
    * jsonwebtoken (v9.x): Para la autenticación basada en tokens (si se implementa en el MVP).

###   Base de Datos: SQLite (v3.39.x)

* **Justificación:** SQLite es una base de datos embebida, ligera y sin servidor, ideal para el desarrollo rápido y prototipos. No requiere configuración compleja y permite un desarrollo ágil.  **Importante:** Para producción, se debe migrar a una base de datos más robusta y escalable como PostgreSQL.
* **Configuración:**
    * Instalar el driver `sqlite3` para Node.js.
    * Utilizar un ORM (como Sequelize o Prisma) o un query builder (como Knex.js) para interactuar con la base de datos de manera más eficiente y segura, aunque para el MVP, queries directas podrían ser suficientes para agilizar el desarrollo.
* **Migración a PostgreSQL (Post-MVP):**
    * PostgreSQL es una base de datos relacional robusta y escalable, adecuada para producción.
    * Se recomienda definir un esquema de base de datos claro desde el inicio para facilitar la migración.
    * Considerar el uso de una herramienta de migración de bases de datos (como Knex.js o Sequelize Migrations) para automatizar el proceso.

###   Blockchain: Starknet

* **Justificación:** Starknet es una Validity Rollup (ZK-Rollup) en Ethereum que permite escalar las transacciones. Es adecuada para la acuñación de NFTs y el registro de certificados debido a su seguridad y menores costos de transacción en comparación con la capa 1 de Ethereum.
* **Configuración:**
    * Instalar las herramientas de desarrollo de Starknet (Cairo).
    * Configurar un entorno de desarrollo con una billetera compatible (ej., Argent X o Braavos).
    * Conectarse a la red de prueba de Starknet (Goerli o Sepolia para Starknet).
* **Consideraciones:**
    * El desarrollo de contratos inteligentes en Cairo requiere aprendizaje.
    * La interacción con Starknet desde el backend se realizará utilizando bibliotecas de Starknet.js.

###   Lenguaje de Contratos Inteligentes: Cairo

* **Justificación:** Cairo es el lenguaje de programación nativo para Starknet. Está diseñado para escribir programas demostrables, lo que es esencial para la tecnología ZK-Rollup.
* **Herramientas de Desarrollo:**
    * Starknet CLI: Para compilar y desplegar contratos.
    * Bibliotecas de Starknet.js: Para interactuar con los contratos desde el backend.

###   Agente de IA: OpenAI API (gpt-3.5-turbo)

* **Justificación:** OpenAI API proporciona acceso a modelos de lenguaje potentes que pueden analizar texto y generar contenido. `gpt-3.5-turbo` ofrece un buen equilibrio entre costo y rendimiento para el análisis de transcripciones y la generación de exámenes.
* **Configuración:**
    * Obtener una clave de API de OpenAI.
    * Instalar la biblioteca de Node.js para interactuar con la API de OpenAI.
    * Manejar la autenticación y las peticiones a la API de forma segura.
* **Consideraciones:**
    * El costo de uso de la API puede variar según el volumen de solicitudes.
    * Es importante diseñar prompts efectivos para obtener los resultados deseados del modelo de IA.

###   Videollamadas: Zoom API

* **Justificación:** Zoom es una plataforma de videollamadas popular que ofrece una API para acceder a las transcripciones de las llamadas. Para el MVP, la prioridad es la disponibilidad de la transcripción más que la gestión completa de la videollamada.
* **Configuración:**
    * Obtener credenciales de desarrollador de Zoom.
    * Utilizar la API de Zoom para recuperar la transcripción de las llamadas.
    * Manejar la autenticación y el manejo de errores de la API.
* **Alternativas (si el tiempo lo permite):**
    * Google Meet API (si ofrece la funcionalidad de transcripción necesaria).

## Herramientas de Desarrollo

* **IDE:** Visual Studio Code (con extensiones para JavaScript, React, Node.js, y Cairo)
* **Gestor de Paquetes:** npm o yarn
* **Control de Versiones:** Git (GitHub o GitLab)
* **Pruebas:** Jest (para pruebas unitarias en el frontend y backend)

## Requisitos de Despliegue (MVP)

* **Frontend:**
    * Servidor web (ej., Netlify, Vercel, AWS Amplify) para alojar la aplicación React.
    * Configurar variables de entorno para las URLs del backend y otras claves de API.
* **Backend:**
    * Servidor Node.js (ej., Heroku, AWS EC2, Google Cloud Functions) para alojar la API.
    * Configurar variables de entorno para la conexión a la base de datos y las claves de API.
* **Base de Datos:**
    * Inicialmente, SQLite (para desarrollo).
    * Para producción (post-MVP), PostgreSQL en un servicio gestionado (ej., AWS RDS, Heroku Postgres, Google Cloud SQL).
* **Contrato Inteligente:**
    * Desplegar el contrato Cairo en la red de prueba de Starknet (Goerli o Sepolia).
    * Guardar la dirección del contrato desplegado para la interacción desde el backend.

## Requisitos de Versiones

* Mantener las versiones especificadas para asegurar la compatibilidad y evitar problemas inesperados.
* Utilizar un gestor de dependencias (npm o yarn) para controlar las versiones de las bibliotecas.
* Documentar claramente las versiones utilizadas en el archivo `package.json` (para Node.js) y en la documentación del proyecto.

Este Tech Stack se ha seleccionado para maximizar la velocidad de desarrollo del MVP sin sacrificar la estabilidad y la escalabilidad futura (considerando la migración a PostgreSQL y el uso de Starknet). La clave es mantener la simplicidad y enfocarse en las funcionalidades esenciales definidas en la especificación.