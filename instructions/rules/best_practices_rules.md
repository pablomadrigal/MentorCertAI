# Mejores Prácticas de Desarrollo - MentorCertAI

## 1. Estándares de Calidad de Código

### Convenciones de Formato

**Regla 1.1: Consistencia en el Formato**
- Usar 2 espacios para indentación en todo el código
- Máximo 100 caracteres por línea
- Usar punto y coma al final de cada declaración
- Mantener una línea en blanco al final de cada archivo

```typescript
// ✅ Correcto
function calculateScore(answers: Answer[]): number {
  const correctAnswers = answers.filter(a => a.isCorrect);
  return (correctAnswers.length / answers.length) * 100;
}

// ❌ Incorrecto
function calculateScore(answers:Answer[]):number{
    const correctAnswers=answers.filter(a=>a.isCorrect)
    return(correctAnswers.length/answers.length)*100}
```

**Regla 1.2: Organización de Imports**
- Agrupar imports por tipo (externos, internos)
- Ordenar alfabéticamente dentro de cada grupo
- Usar imports específicos en lugar de importar todo

```typescript
// ✅ Correcto
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Certificate } from '@/types';
import { useAuth } from '@/hooks';

// ❌ Incorrecto
import * as React from 'react';
import { Certificate, User, Exam } from '@/types';
import { useAuth, useRouter, useTheme } from '@/hooks';
```

### Requisitos de Documentación

**Regla 1.3: Documentación de Funciones**
- Documentar todas las funciones públicas con JSDoc
- Incluir descripción, parámetros, retorno y ejemplos
- Documentar casos de error y excepciones

```typescript
// ✅ Correcto
/**
 * Genera un certificado blockchain para un estudiante que aprobó el examen
 * @param {string} studentId - ID del estudiante
 * @param {number} score - Calificación obtenida (0-100)
 * @param {string} topic - Tema del certificado
 * @returns {Promise<Certificate>} Certificado generado
 * @throws {Error} Si el estudiante no existe o la calificación es inválida
 * @example
 * const cert = await generateCertificate('123', 85, 'Web3');
 */
async function generateCertificate(
  studentId: string,
  score: number,
  topic: string
): Promise<Certificate> {
  // Implementation
}

// ❌ Incorrecto
// Genera certificado
function generateCertificate(studentId, score, topic) {
  // Implementation
}
```

### Limitaciones de Complejidad

**Regla 1.4: Control de Complejidad**
- Máximo 3 niveles de anidamiento
- Máximo 20 líneas por función
- Máximo 200 líneas por archivo
- Complejidad ciclomática máxima de 10

```typescript
// ✅ Correcto
function processExamResults(results: ExamResult[]): ProcessedResult {
  const passed = results.filter(r => r.score >= 70);
  const failed = results.filter(r => r.score < 70);
  
  return {
    passed: passed.length,
    failed: failed.length,
    average: calculateAverage(results)
  };
}

// ❌ Incorrecto
function processExamResults(results: ExamResult[]): ProcessedResult {
  let passed = 0;
  let failed = 0;
  let total = 0;
  
  for (let i = 0; i < results.length; i++) {
    if (results[i].score >= 70) {
      passed++;
      total += results[i].score;
      if (results[i].hasBonus) {
        total += 5;
      }
    } else {
      failed++;
      if (results[i].hasRetake) {
        // Complex nested logic...
      }
    }
  }
  // More complex calculations...
}
```

### Convenciones de Nomenclatura

**Regla 1.5: Nombres Significativos**
- Usar nombres descriptivos y autoexplicativos
- Seguir convenciones específicas por tipo:
  - Interfaces: PascalCase con prefijo I
  - Tipos: PascalCase
  - Funciones: camelCase
  - Variables: camelCase
  - Constantes: UPPER_SNAKE_CASE

```typescript
// ✅ Correcto
interface ICertificate {
  id: string;
  studentName: string;
  issueDate: Date;
}

const MAX_RETRY_ATTEMPTS = 3;
const DEFAULT_SCORE_THRESHOLD = 70;

function calculateFinalScore(examResults: ExamResult[]): number {
  // Implementation
}

// ❌ Incorrecto
interface cert {
  id: string;
  name: string;
  date: Date;
}

const max = 3;
const threshold = 70;

function calc(exam: any[]): number {
  // Implementation
}
```

## 2. Patrones de Manejo de Errores

### Gestión de Excepciones

**Regla 2.1: Manejo Estructurado de Errores**
- Usar tipos de error personalizados
- Implementar manejo de errores en cada capa
- Propagar errores con contexto

```typescript
// ✅ Correcto
class CertificateError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly context?: any
  ) {
    super(message);
    this.name = 'CertificateError';
  }
}

async function generateCertificate(data: CertificateData): Promise<Certificate> {
  try {
    const student = await findStudent(data.studentId);
    if (!student) {
      throw new CertificateError(
        'Student not found',
        'STUDENT_NOT_FOUND',
        { studentId: data.studentId }
      );
    }
    // Implementation
  } catch (error) {
    if (error instanceof CertificateError) {
      throw error;
    }
    throw new CertificateError(
      'Failed to generate certificate',
      'GENERATION_FAILED',
      { originalError: error }
    );
  }
}

// ❌ Incorrecto
async function generateCertificate(data: any) {
  try {
    // Implementation
  } catch (error) {
    console.error(error);
    throw error;
  }
}
```

### Enfoques de Retroalimentación al Usuario

**Regla 2.2: Mensajes de Error Claros**
- Proporcionar mensajes de error específicos y accionables
- Incluir sugerencias de solución cuando sea posible
- Mantener consistencia en el formato de mensajes

```typescript
// ✅ Correcto
const ErrorMessages = {
  INVALID_SCORE: {
    message: 'La calificación debe estar entre 0 y 100',
    action: 'Por favor, verifica la calificación ingresada'
  },
  STUDENT_NOT_FOUND: {
    message: 'No se encontró el estudiante',
    action: 'Verifica el ID del estudiante o contacta al administrador'
  }
} as const;

// ❌ Incorrecto
const errors = {
  invalid: 'Error',
  notFound: 'No encontrado'
};
```

### Estándares de Registro

**Regla 2.3: Logging Estructurado**
- Usar niveles de log apropiados (error, warn, info, debug)
- Incluir contexto relevante en cada log
- Implementar rotación de logs

```typescript
// ✅ Correcto
const logger = {
  error: (message: string, context: any) => {
    console.error(JSON.stringify({
      level: 'error',
      timestamp: new Date().toISOString(),
      message,
      context
    }));
  },
  info: (message: string, context: any) => {
    console.info(JSON.stringify({
      level: 'info',
      timestamp: new Date().toISOString(),
      message,
      context
    }));
  }
};

// ❌ Incorrecto
console.log('Error:', error);
console.error('Something went wrong');
```

## 3. Mejores Prácticas de Seguridad

### Validación de Entrada

**Regla 3.1: Validación Estricta**
- Validar todas las entradas en los límites del sistema
- Usar esquemas de validación (Zod, Joi)
- Sanitizar datos antes de procesarlos

```typescript
// ✅ Correcto
import { z } from 'zod';

const CertificateSchema = z.object({
  studentId: z.string().uuid(),
  score: z.number().min(0).max(100),
  topic: z.string().min(3).max(100)
});

function validateCertificate(data: unknown): CertificateData {
  return CertificateSchema.parse(data);
}

// ❌ Incorrecto
function validateCertificate(data: any): boolean {
  if (data.score > 0 && data.topic) {
    return true;
  }
  return false;
}
```

### Patrones de Autenticación/Autorización

**Regla 3.2: Seguridad en Autenticación**
- Implementar autenticación basada en tokens
- Usar HTTPS para todas las comunicaciones
- Implementar rate limiting
- Almacenar contraseñas con hash y salt

```typescript
// ✅ Correcto
import { hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return hash(password, saltRounds);
}

function generateToken(user: User): string {
  return sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );
}

// ❌ Incorrecto
function storePassword(password: string): void {
  localStorage.setItem('password', password);
}
```

### Medidas de Protección de Datos

**Regla 3.3: Protección de Datos Sensibles**
- Encriptar datos sensibles en reposo
- Implementar políticas de retención de datos
- Minimizar la recolección de datos personales

```typescript
// ✅ Correcto
interface StudentData {
  id: string;
  name: string;
  email: string;
  // No almacenar datos sensibles innecesarios
}

// ❌ Incorrecto
interface StudentData {
  id: string;
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  // Almacenar datos sensibles innecesarios
}
```

## 4. Optimización de Rendimiento

### Gestión de Recursos

**Regla 4.1: Gestión Eficiente de Recursos**
- Implementar conexiones pooling para bases de datos
- Liberar recursos explícitamente
- Usar streams para archivos grandes

```typescript
// ✅ Correcto
async function processLargeFile(filePath: string): Promise<void> {
  const stream = createReadStream(filePath);
  for await (const chunk of stream) {
    await processChunk(chunk);
  }
}

// ❌ Incorrecto
async function processLargeFile(filePath: string): Promise<void> {
  const content = await readFile(filePath);
  await processContent(content);
}
```

### Estrategias de Caché

**Regla 4.2: Implementación de Caché**
- Usar caché para datos frecuentemente accedidos
- Implementar políticas de invalidación
- Considerar caché distribuido para escalabilidad

```typescript
// ✅ Correcto
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function getCachedData(key: string): Promise<any> {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  const data = await fetchData(key);
  cache.set(key, { data, timestamp: Date.now() });
  return data;
}

// ❌ Incorrecto
const cache = new Map();
function getData(key: string) {
  return cache.get(key) || fetchData(key);
}
```

## 5. Flujos de Trabajo Multistapa

### División de Tareas

**Regla 5.1: Descomposición de Tareas**
- Dividir tareas complejas en pasos manejables
- Implementar estados intermedios
- Validar cada paso antes de continuar

```typescript
// ✅ Correcto
interface ExamGenerationStep {
  step: 'transcription' | 'analysis' | 'questions' | 'validation';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  data?: any;
}

async function generateExam(meetingId: string): Promise<Exam> {
  const steps: ExamGenerationStep[] = [
    { step: 'transcription', status: 'pending' },
    { step: 'analysis', status: 'pending' },
    { step: 'questions', status: 'pending' },
    { step: 'validation', status: 'pending' }
  ];

  for (const step of steps) {
    step.status = 'in_progress';
    try {
      step.data = await processStep(step.step, meetingId);
      step.status = 'completed';
    } catch (error) {
      step.status = 'failed';
      throw error;
    }
  }
  return finalizeExam(steps);
}

// ❌ Incorrecto
async function generateExam(meetingId: string): Promise<Exam> {
  const transcription = await getTranscription(meetingId);
  const analysis = await analyzeTranscription(transcription);
  const questions = await generateQuestions(analysis);
  return questions;
}
```

## 6. Guías de Implementación

### Cuando [Crear un Nuevo Componente]

1. Crear archivo con nombre descriptivo en PascalCase
2. Implementar interfaz de props
3. Documentar con JSDoc
4. Implementar pruebas unitarias
5. Añadir a storybook si es un componente UI

```typescript
// ✅ Correcto
interface ICertificateCardProps {
  certificate: Certificate;
  onViewDetails: (id: string) => void;
}

/**
 * Muestra una tarjeta con la información básica de un certificado
 * @param {ICertificateCardProps} props - Propiedades del componente
 */
export function CertificateCard({ certificate, onViewDetails }: ICertificateCardProps) {
  return (
    <div className="certificate-card">
      <h3>{certificate.topic}</h3>
      <p>Score: {certificate.score}</p>
      <button onClick={() => onViewDetails(certificate.id)}>
        View Details
      </button>
    </div>
  );
}
```

### Cuando [Implementar una Nueva API]

1. Definir contrato de la API
2. Implementar validación de entrada
3. Manejar errores apropiadamente
4. Documentar endpoints
5. Implementar pruebas de integración

```typescript
// ✅ Correcto
/**
 * @api {post} /api/certificates Genera un nuevo certificado
 * @apiName GenerateCertificate
 * @apiGroup Certificates
 * @apiParam {string} studentId ID del estudiante
 * @apiParam {number} score Calificación obtenida
 * @apiParam {string} topic Tema del certificado
 * @apiSuccess {Object} certificate Certificado generado
 * @apiError {Object} error Información del error
 */
async function generateCertificate(req: Request, res: Response) {
  try {
    const data = CertificateSchema.parse(req.body);
    const certificate = await certificateService.generate(data);
    res.json(certificate);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: 'Invalid input data' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
```

### Cuando [Modificar la Base de Datos]

1. Crear migración con nombre descriptivo
2. Implementar rollback
3. Validar cambios en entorno de desarrollo
4. Documentar cambios
5. Actualizar modelos/schemas

```typescript
// ✅ Correcto
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('certificates', (table) => {
    table.uuid('id').primary();
    table.uuid('student_id').references('id').inTable('students');
    table.integer('score').notNullable();
    table.string('topic').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('certificates');
}
```

## 7. Consideraciones de Mantenimiento

### Documentación

**Regla 7.1: Mantener Documentación Actualizada**
- Documentar cambios significativos
- Mantener README actualizado
- Documentar decisiones de arquitectura

```markdown
# Cambios en la API de Certificados

## Versión 1.1.0
- Añadido soporte para múltiples temas por certificado
- Mejorada validación de calificaciones
- Corregido bug en generación de NFTs

## Migración
Ejecutar `npm run migrate` para actualizar la base de datos
```

### Refactorización

**Regla 7.2: Refactorización Regular**
- Revisar código periódicamente
- Identificar patrones repetitivos
- Extraer lógica común
- Mantener deuda técnica baja

```typescript
// ✅ Correcto
// Antes de refactorizar
function processStudentA(student: Student) {
  // Lógica específica para estudiante A
}

function processStudentB(student: Student) {
  // Lógica similar para estudiante B
}

// Después de refactorizar
function processStudent(student: Student, type: StudentType) {
  const processors = {
    [StudentType.A]: processStudentA,
    [StudentType.B]: processStudentB
  };
  return processors[type](student);
}
```

## 8. Consideraciones de Accesibilidad

**Regla 8.1: Implementar Accesibilidad**
- Usar etiquetas semánticas
- Implementar ARIA cuando sea necesario
- Asegurar contraste de colores
- Proporcionar alternativas de texto

```typescript
// ✅ Correcto
function CertificateView({ certificate }: { certificate: Certificate }) {
  return (
    <article aria-labelledby="certificate-title">
      <h2 id="certificate-title">Certificate Details</h2>
      <img 
        src={certificate.image} 
        alt={`Certificate for ${certificate.topic}`}
        role="img"
      />
      <div role="status" aria-live="polite">
        Status: {certificate.status}
      </div>
    </article>
  );
}

// ❌ Incorrecto
function CertificateView({ certificate }) {
  return (
    <div>
      <h2>Certificate Details</h2>
      <img src={certificate.image} />
      <div>Status: {certificate.status}</div>
    </div>
  );
}
```

## 9. Consideraciones de Rendimiento

**Regla 9.1: Optimización de Rendimiento**
- Implementar lazy loading
- Optimizar imágenes
- Minimizar re-renders
- Usar memoización cuando sea apropiado

```typescript
// ✅ Correcto
const CertificateList = React.memo(function CertificateList({ 
  certificates 
}: { 
  certificates: Certificate[] 
}) {
  return (
    <div>
      {certificates.map(cert => (
        <CertificateCard 
          key={cert.id}
          certificate={cert}
        />
      ))}
    </div>
  );
});

// ❌ Incorrecto
function CertificateList({ certificates }) {
  return (
    <div>
      {certificates.map(cert => (
        <CertificateCard 
          key={cert.id}
          certificate={cert}
        />
      ))}
    </div>
  );
}
```

## 10. Consideraciones de Testing

**Regla 10.1: Cobertura de Pruebas**
- Mantener cobertura de pruebas > 80%
- Probar casos límite
- Implementar pruebas de integración
- Usar mocks apropiadamente

```typescript
// ✅ Correcto
describe('CertificateService', () => {
  it('should generate certificate for passing score', async () => {
    const result = await generateCertificate({
      studentId: '123',
      score: 85,
      topic: 'Web3'
    });
    expect(result).toBeDefined();
    expect(result.score).toBe(85);
  });

  it('should throw error for failing score', async () => {
    await expect(generateCertificate({
      studentId: '123',
      score: 65,
      topic: 'Web3'
    })).rejects.toThrow('Score too low');
  });
});

// ❌ Incorrecto
test('generates certificate', () => {
  const result = generateCertificate({
    studentId: '123',
    score: 85,
    topic: 'Web3'
  });
  expect(result).toBeDefined();
});
``` 