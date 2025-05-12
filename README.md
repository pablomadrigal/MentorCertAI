# MentorCertAI - Plataforma de Mentorías 1a1 con Certificación Blockchain

## Descripción

MentorCertAI es una plataforma web que permite a mentores realizar videollamadas 1a1 con sus estudiantes, generando automáticamente certificados verificables en la blockchain de Starknet. La plataforma integra transcripción automática, análisis de IA para generar exámenes personalizados, y emisión de certificados con NFTs asociados.

## Características Principales

- 📹 Videollamadas 1a1 entre mentores y estudiantes
- 🎯 Transcripción automática de las sesiones
- 🤖 Análisis de IA para generar exámenes personalizados
- 📝 Generación automática de certificados verificables
- 🔗 Integración con Starknet para NFTs de certificados
- 📱 Landing page personalizada para estudiantes

## Requisitos del Sistema

- Node.js >= 18.x
- Python >= 3.8 (para integración con IA)
- Base de datos PostgreSQL
- Cuenta de desarrollador en Zoom/Google Meet
- Acceso a Starknet (testnet para desarrollo)

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/your-org/mentor-cert-ai.git
cd mentor-cert-ai
```

2. Instalar dependencias del backend:
```bash
cd backend
npm install
```

3. Instalar dependencias del frontend:
```bash
cd frontend
npm install
```

4. Configurar variables de entorno:
```bash
cp .env.example .env
# Editar .env con tus credenciales
```

5. Iniciar la base de datos:
```bash
npm run db:migrate
```

## Estructura del Proyecto

```
mentor-cert-ai/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   └── tests/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── utils/
│   └── tests/
└── contracts/
    └── starknet/
```

## Flujo de Trabajo

1. **Agendamiento**: El mentor agenda una videollamada con el estudiante
2. **Videollamada**: Se realiza la sesión 1a1
3. **Transcripción**: Sistema obtiene la transcripción automáticamente
4. **Análisis**: IA analiza el contenido y genera un examen
5. **Evaluación**: Estudiante completa el examen
6. **Certificación**: Si aprueba (>70%), se genera certificado y NFT

## Desarrollo

### Fases del Proyecto

1. **Fase 1**: Configuración Inicial y Estructura Básica
   - Setup de backend y frontend
   - Modelo de datos inicial
   - Rutas básicas

2. **Fase 2**: Integración de Videollamadas
   - Integración con Zoom/Google Meet
   - Sistema de transcripción

3. **Fase 3**: Análisis de IA
   - Integración con modelo de lenguaje
   - Generación de exámenes

4. **Fase 4**: Frontend y Certificados
   - Interfaz de examen
   - Sistema de certificados

5. **Fase 5**: Blockchain
   - Contrato Starknet
   - NFTs de certificados

6. **Fase 6**: Pruebas y Despliegue
   - Testing completo
   - Despliegue en producción

### Guías de Desarrollo

- Seguir las convenciones de código en `instructions/rules/cursor_rules.md`
- Mantener cobertura de pruebas > 80%
- Documentar cambios significativos
- Revisar PRs antes de merge

## API Endpoints

### Estudiantes
- `POST /api/students` - Crear nuevo estudiante
- `GET /api/students/:id` - Obtener estudiante
- `GET /api/students/:id/certificates` - Listar certificados

### Certificados
- `POST /api/certificates` - Generar certificado
- `GET /api/certificates/:id` - Obtener certificado
- `GET /api/certificates/:id/nft` - Obtener NFT asociado

### Exámenes
- `POST /api/exams` - Generar examen
- `POST /api/exams/:id/submit` - Enviar respuestas
- `GET /api/exams/:id/results` - Obtener resultados

## Contribución

1. Fork el repositorio
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## Contacto

- Equipo de Desarrollo - dev@mentorcertai.com
- Sitio Web - [https://mentorcertai.com](https://mentorcertai.com)

## Agradecimientos

- [Starknet](https://starknet.io/) por la infraestructura blockchain
- [Blockcerts](https://www.blockcerts.org/) por el estándar de certificados
- [Zoom/Google Meet](https://zoom.us/) por las APIs de videollamadas 