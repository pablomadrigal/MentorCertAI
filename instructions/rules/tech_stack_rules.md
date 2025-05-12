# Reglas de Generación de Código para MentorCertAI

## 1. Contexto del Stack Tecnológico

### Versiones y Configuraciones Específicas

1. **Frontend (React v18.2.0)**
   - Usar Vite como bundler para mejor rendimiento
   - Implementar React Router v6.x para navegación
   - Utilizar Context API para estado global (evitar Redux para MVP)
   - Versiones específicas:
     ```json
     {
       "react": "^18.2.0",
       "react-dom": "^18.2.0",
       "react-router-dom": "^6.x",
       "axios": "^1.x"
     }
     ```

2. **Backend (Node.js v18.x LTS + Express v4.18.x)**
   - Usar Express con middleware estándar
   - Versiones específicas:
     ```json
     {
       "express": "^4.18.x",
       "cors": "^2.8.5",
       "body-parser": "^1.20.2",
       "sqlite3": "^5.x",
       "bcrypt": "^5.x",
       "jsonwebtoken": "^9.x"
     }
     ```

3. **Base de Datos (SQLite v3.39.x)**
   - Usar queries directas para MVP (evitar ORM)
   - Mantener esquema compatible con PostgreSQL para migración futura

4. **Blockchain (Starknet)**
   - Usar Starknet.js para interacción con contratos
   - Desplegar en red de prueba (Goerli/Sepolia)
   - Versión Cairo: última estable compatible con Starknet

### Patrones de Biblioteca/Framework

1. **Frontend**
   - Componentes funcionales con hooks
   - Custom hooks para lógica reutilizable
   - Context API para estado global
   - Axios para peticiones HTTP

2. **Backend**
   - Middleware pattern para autenticación
   - Service pattern para lógica de negocio
   - Repository pattern para acceso a datos
   - Controller pattern para rutas

3. **Blockchain**
   - Factory pattern para contratos
   - Service pattern para interacción con blockchain
   - Event-driven pattern para notificaciones

### Errores Comunes a Evitar

1. **Frontend**
   - Evitar prop drilling excesivo
   - No usar class components
   - Evitar efectos secundarios innecesarios
   - No olvidar cleanup en useEffect

2. **Backend**
   - Evitar callbacks anidados
   - No exponer información sensible en logs
   - Evitar queries SQL inseguras
   - No olvidar manejo de errores en promesas

3. **Blockchain**
   - Evitar gas innecesario en contratos
   - No hardcodear direcciones de contrato
   - Evitar lógica compleja en contratos
   - No olvidar validaciones de entrada

## 2. Directrices de Generación de Código

### Convenciones de Estructura de Archivos

```
src/
├── components/          # Componentes React reutilizables
│   ├── common/         # Componentes base (Button, Input, etc.)
│   └── features/       # Componentes específicos de features
├── hooks/              # Custom hooks
├── context/            # Context providers
├── services/           # Servicios de API
├── utils/              # Utilidades y helpers
└── pages/              # Componentes de página

backend/
├── controllers/        # Controladores de rutas
├── services/          # Lógica de negocio
├── repositories/      # Acceso a datos
├── middleware/        # Middleware de Express
├── utils/             # Utilidades
└── config/            # Configuración
```

### Patrones de Nomenclatura

1. **Frontend**
   - Componentes: PascalCase (ej: `VideoCall.jsx`)
   - Hooks: camelCase con prefijo 'use' (ej: `useAuth.js`)
   - Utilidades: camelCase (ej: `formatDate.js`)
   - Archivos de test: `.test.js` o `.spec.js`

2. **Backend**
   - Controladores: camelCase (ej: `authController.js`)
   - Servicios: camelCase (ej: `certificateService.js`)
   - Modelos: PascalCase (ej: `Student.js`)
   - Middleware: camelCase (ej: `authMiddleware.js`)

### Organización de Importaciones

```javascript
// 1. React y librerías externas
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Componentes internos
import { Button } from '../common/Button';
import { useAuth } from '../../hooks/useAuth';

// 3. Utilidades y constantes
import { formatDate } from '../../utils/date';
import { API_URL } from '../../constants';
```

### Patrones de Manejo de Errores

1. **Frontend**
   ```javascript
   try {
     const response = await api.getData();
     // Manejo exitoso
   } catch (error) {
     if (error.response?.status === 401) {
       // Manejo específico de error
     } else {
       // Manejo genérico
     }
   }
   ```

2. **Backend**
   ```javascript
   const errorHandler = (err, req, res, next) => {
     if (err.name === 'ValidationError') {
       return res.status(400).json({ error: err.message });
     }
     // Log error
     res.status(500).json({ error: 'Internal server error' });
   };
   ```

### Enfoques de Pruebas

1. **Frontend**
   - Jest + React Testing Library
   - Pruebas de componentes
   - Pruebas de hooks
   - Pruebas de integración

2. **Backend**
   - Jest para pruebas unitarias
   - Supertest para pruebas de API
   - Pruebas de integración con base de datos

## 3. Reglas Específicas del Proyecto

### Patrones de Arquitectura

1. **Frontend**
   - Arquitectura basada en componentes
   - Estado global con Context API
   - Servicios para llamadas API
   - Hooks para lógica reutilizable

2. **Backend**
   - Arquitectura en capas (Controller-Service-Repository)
   - Middleware para autenticación y validación
   - Servicios para lógica de negocio
   - Repositorios para acceso a datos

### Comentarios de Código Requeridos

1. **Documentación de Componentes**
   ```javascript
   /**
    * @component VideoCall
    * @description Componente para manejar videollamadas
    * @param {Object} props
    * @param {string} props.roomId - ID de la sala de videollamada
    * @param {Function} props.onEnd - Callback al finalizar la llamada
    */
   ```

2. **Documentación de Funciones**
   ```javascript
   /**
    * Genera un certificado basado en la calificación del examen
    * @param {Object} examData - Datos del examen
    * @param {number} examData.score - Calificación obtenida
    * @returns {Promise<Object>} Certificado generado
    * @throws {Error} Si la calificación es insuficiente
    */
   ```

### Consideraciones de Seguridad

1. **Frontend**
   - Sanitizar inputs de usuario
   - Validar datos antes de enviar
   - Manejar tokens de forma segura
   - Implementar CSRF protection

2. **Backend**
   - Validar todos los inputs
   - Sanitizar queries SQL
   - Implementar rate limiting
   - Usar HTTPS
   - Hash de contraseñas con bcrypt

3. **Blockchain**
   - Validar inputs de contratos
   - Implementar controles de acceso
   - Manejar errores de forma segura
   - No exponer claves privadas

### Requisitos de Rendimiento

1. **Frontend**
   - Lazy loading de componentes
   - Memoización de componentes pesados
   - Optimización de imágenes
   - Caching de datos

2. **Backend**
   - Caching de respuestas
   - Paginación de resultados
   - Optimización de queries
   - Compresión de respuestas

## 4. Guías de Implementación

### Cuando Implementar un Nuevo Componente

1. Crear archivo en estructura correcta
2. Implementar componente funcional
3. Agregar PropTypes o TypeScript
4. Documentar con JSDoc
5. Crear tests básicos
6. Implementar manejo de errores
7. Agregar estilos (CSS modules)

### Cuando Implementar un Nuevo Endpoint

1. Crear controlador
2. Implementar servicio
3. Agregar validación
4. Implementar manejo de errores
5. Documentar con JSDoc
6. Crear tests
7. Agregar a rutas

### Cuando Implementar un Nuevo Contrato

1. Definir interfaz
2. Implementar lógica básica
3. Agregar validaciones
4. Implementar eventos
5. Crear tests
6. Documentar
7. Desplegar en testnet

## 5. Ejemplos de Implementación

### Componente de Videollamada

```javascript
/**
 * @component VideoCall
 * @description Componente para manejar videollamadas con Zoom
 */
const VideoCall = ({ roomId, onEnd }) => {
  const [isConnected, setIsConnected] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const initializeCall = async () => {
      try {
        await connectToZoom(roomId);
        setIsConnected(true);
      } catch (error) {
        handleError(error);
      }
    };

    initializeCall();
    return () => cleanup();
  }, [roomId]);

  return (
    <div className="video-call">
      {/* Implementación */}
    </div>
  );
};
```

### Servicio de Certificados

```javascript
/**
 * @service CertificateService
 * @description Servicio para manejar certificados
 */
class CertificateService {
  async generateCertificate(examData) {
    try {
      const certificate = await this.createCertificate(examData);
      const nft = await this.mintNFT(certificate);
      return { certificate, nft };
    } catch (error) {
      throw new CertificateError(error.message);
    }
  }
}
```

Estas reglas están diseñadas para mantener la consistencia y calidad del código en el proyecto MentorCertAI. Se actualizarán según sea necesario durante el desarrollo. 