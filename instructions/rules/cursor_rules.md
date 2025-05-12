# Reglas de Cursor para MentorCertAI

## 1. Estructura de Archivos

**Regla 1.1: Organización de Archivos**
- Mantener archivos relacionados en la misma carpeta
- Usar nombres descriptivos en kebab-case para archivos
- Separar componentes, hooks y utilidades en carpetas específicas

```
src/
  components/
    certificate/
      CertificateCard.tsx
      CertificateList.tsx
  hooks/
    useCertificate.ts
    useAuth.ts
  utils/
    validation.ts
    blockchain.ts
```

## 2. Convenciones de Código

**Regla 2.1: Formato**
- Usar Prettier con configuración estándar
- Máximo 100 caracteres por línea
- 2 espacios para indentación
- Punto y coma al final de declaraciones

**Regla 2.2: Imports**
- Agrupar imports en este orden:
  1. React y Next.js
  2. Bibliotecas externas
  3. Componentes internos
  4. Hooks y utilidades
  5. Tipos y constantes

```typescript
// ✅ Correcto
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { z } from 'zod';
import { CertificateCard } from '@/components/certificate';
import { useAuth } from '@/hooks';
import { Certificate } from '@/types';
```

## 3. Componentes React

**Regla 3.1: Estructura de Componentes**
- Un componente por archivo
- Nombre del archivo igual al componente
- Exportar como default solo si es necesario
- Usar TypeScript para props

```typescript
// ✅ Correcto
interface ICertificateCardProps {
  certificate: Certificate;
  onViewDetails: (id: string) => void;
}

export function CertificateCard({ 
  certificate, 
  onViewDetails 
}: ICertificateCardProps) {
  // Implementation
}
```

**Regla 3.2: Hooks Personalizados**
- Prefijo 'use' para nombres de hooks
- Un hook por archivo
- Documentar con JSDoc
- Manejar estados de carga y error

```typescript
// ✅ Correcto
/**
 * Hook para gestionar certificados
 * @param {string} studentId - ID del estudiante
 */
export function useCertificates(studentId: string) {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Implementation
  }, [studentId]);

  return { certificates, loading, error };
}
```

## 4. Manejo de Estado

**Regla 4.1: Estado Global**
- Usar Context para estado compartido
- Implementar providers en archivos separados
- Documentar valores del contexto

```typescript
// ✅ Correcto
interface IAuthContext {
  user: User | null;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Implementation
}
```

## 5. API y Servicios

**Regla 5.1: Estructura de API**
- Usar servicios para lógica de negocio
- Implementar interceptores para manejo de errores
- Documentar endpoints con JSDoc

```typescript
// ✅ Correcto
/**
 * Servicio para gestionar certificados
 */
export class CertificateService {
  /**
   * Genera un nuevo certificado
   * @param {CertificateData} data - Datos del certificado
   */
  async generate(data: CertificateData): Promise<Certificate> {
    // Implementation
  }
}
```

## 6. Testing

**Regla 6.1: Estructura de Tests**
- Un archivo de test por componente/servicio
- Nombre del archivo: `[nombre].test.ts`
- Usar describe para agrupar tests relacionados
- Implementar mocks en archivos separados

```typescript
// ✅ Correcto
describe('CertificateCard', () => {
  const mockCertificate: Certificate = {
    id: '123',
    topic: 'Web3',
    score: 85
  };

  it('renders certificate details', () => {
    render(<CertificateCard certificate={mockCertificate} />);
    expect(screen.getByText('Web3')).toBeInTheDocument();
  });
});
```

## 7. Documentación

**Regla 7.1: Comentarios de Código**
- Usar JSDoc para documentar funciones y componentes
- Incluir ejemplos en la documentación
- Documentar casos de error

```typescript
// ✅ Correcto
/**
 * Componente que muestra los detalles de un certificado
 * @param {ICertificateDetailsProps} props - Propiedades del componente
 * @example
 * <CertificateDetails 
 *   certificate={certificate}
 *   onVerify={() => {}}
 * />
 */
export function CertificateDetails({ 
  certificate, 
  onVerify 
}: ICertificateDetailsProps) {
  // Implementation
}
```

## 8. Optimización

**Regla 8.1: Rendimiento**
- Usar React.memo para componentes puros
- Implementar lazy loading para rutas
- Optimizar re-renders con useMemo y useCallback

```typescript
// ✅ Correcto
const CertificateList = React.memo(function CertificateList({ 
  certificates 
}: { 
  certificates: Certificate[] 
}) {
  const handleViewDetails = useCallback((id: string) => {
    // Implementation
  }, []);

  return (
    <div>
      {certificates.map(cert => (
        <CertificateCard 
          key={cert.id}
          certificate={cert}
          onViewDetails={handleViewDetails}
        />
      ))}
    </div>
  );
});
```

## 9. Seguridad

**Regla 9.1: Validación**
- Usar Zod para validación de datos
- Implementar sanitización de inputs
- Validar datos en los límites del sistema

```typescript
// ✅ Correcto
const CertificateSchema = z.object({
  studentId: z.string().uuid(),
  score: z.number().min(0).max(100),
  topic: z.string().min(3).max(100)
});

function validateCertificate(data: unknown): CertificateData {
  return CertificateSchema.parse(data);
}
```

## 10. Manejo de Errores

**Regla 10.1: Estructura de Errores**
- Crear tipos de error personalizados
- Implementar manejo de errores en cada capa
- Proporcionar mensajes de error claros

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

const ErrorMessages = {
  INVALID_SCORE: {
    message: 'La calificación debe estar entre 0 y 100',
    action: 'Por favor, verifica la calificación ingresada'
  }
} as const;
```

## 11. Guías de Implementación

### Cuando [Crear un Nuevo Componente]

1. Crear archivo en la carpeta apropiada
2. Definir interfaz de props
3. Implementar componente con TypeScript
4. Añadir documentación JSDoc
5. Crear archivo de test

### Cuando [Implementar una Nueva API]

1. Crear servicio en la carpeta services
2. Definir tipos y esquemas de validación
3. Implementar endpoints
4. Añadir manejo de errores
5. Crear pruebas de integración

### Cuando [Modificar la Base de Datos]

1. Crear migración con nombre descriptivo
2. Implementar up y down
3. Actualizar modelos TypeScript
4. Probar en entorno de desarrollo
5. Documentar cambios

## 12. Consideraciones de Accesibilidad

**Regla 12.1: Implementación de ARIA**
- Usar roles ARIA apropiados
- Proporcionar etiquetas para elementos interactivos
- Implementar navegación por teclado

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
```

## 13. Consideraciones de Rendimiento

**Regla 13.1: Optimización de Componentes**
- Implementar lazy loading
- Usar memoización apropiadamente
- Optimizar re-renders
- Implementar virtualización para listas largas

```typescript
// ✅ Correcto
const CertificateList = React.lazy(() => import('./CertificateList'));

function CertificatesPage() {
  return (
    <Suspense fallback={<Loading />}>
      <CertificateList />
    </Suspense>
  );
}
```

## 14. Consideraciones de Testing

**Regla 14.1: Cobertura de Pruebas**
- Mantener cobertura > 80%
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
``` 