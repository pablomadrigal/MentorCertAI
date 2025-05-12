# Guía de Desarrollo Frontend - MentorCertAi

**Documentos de Referencia:**

* [spec.md](./spec.md): Especificación detallada del proyecto.
* [plan.md](./plan.md): Plan de desarrollo detallado con iteraciones y pasos.
* [app_flow.md](./app_flow.md): Diagramas de flujo de la aplicación.

## 1. Arquitectura de Componentes

La arquitectura de componentes se basará en un enfoque jerárquico y reutilizable, con un máximo de 3 niveles de profundidad para mantener la simplicidad y el rendimiento.

* **Componentes Atómicos:** Son los componentes más pequeños y reutilizables, como botones, inputs, etiquetas, etc.
* **Componentes Moleculares:** Son combinaciones de componentes atómicos que forman una unidad funcional, como un formulario de inicio de sesión o una tarjeta de examen.
* **Componentes de Organismo:** Son componentes más complejos que combinan componentes moleculares y atómicos para formar secciones completas de una página, como la sección de preguntas del examen o el panel de resultados.
* **Páginas:** Representan una ruta completa en la aplicación y se componen de uno o más organismos.

## 2. Componentes Principales

Los siguientes son los componentes principales que se utilizarán en el proyecto:

* `EstudianteView`: Contenedor principal para la vista del estudiante, mostrando el examen y el certificado.
* `ExamenView`: Muestra las preguntas del examen y permite al estudiante enviar sus respuestas.
* `ResultadoView`: Muestra los resultados del examen al estudiante.
* `CertificadoView`: Muestra el certificado obtenido por el estudiante.
* `LandingPage`: Página principal para los estudiantes donde pueden ver sus certificados y futuras llamadas.

## 3. Patrones de Gestión de Estado

Para la gestión del estado, se utilizará una combinación de:

* **Estado Local de Componente:** Para el estado que solo es relevante para un componente específico (ej., el valor de un input). Se utilizará `useState` de React.
* **Context API:** Para el estado que necesita ser compartido entre varios componentes, pero no a nivel global de la aplicación (ej., información del estudiante autenticado).
* **Redux (Si es necesario):** Si la aplicación crece mucho en complejidad, se considerará Redux para una gestión de estado más centralizada. Para el MVP, Context API debería ser suficiente.

## 4. Diagrama de Flujo de Datos

El flujo de datos será principalmente unidireccional, pasando de los componentes padre a los componentes hijo a través de `props`, y de los componentes hijo a los componentes padre a través de funciones de callback.

```mermaid
    A[Página] --> B[Componente de Organismo];
    B --> C[Componente Molecular];
    C --> D[Componente Atómico];
    D --> E{Estado};
    E --> C;
    E --> B;
    E --> A;
```

## 5. Estándares de Estilo
Se utilizará una combinación de:

CSS Modules: Para el alcance local de los estilos y evitar colisiones.
Variables de CSS: Para mantener la consistencia de los colores, las fuentes y otros valores de estilo.
Convención de Nombres BEM: Para nombrar las clases de CSS de forma clara y organizada.
## 6. Estados de Carga y Error
Todos los componentes principales manejarán los estados de carga y error de forma adecuada.

Estado de Carga: Se mostrará un indicador de carga (spinner) mientras se espera una respuesta del servidor o se realiza una operación asíncrona.
Estado de Error: Se mostrará un mensaje de error claro y conciso si ocurre un error, permitiendo al usuario entender el problema y saber qué hacer.
## 7. Requisitos de Accesibilidad (Nivel A de WCAG)
Se cumplirán los requisitos de accesibilidad de nivel A de WCAG 2.1. Esto incluye:

Texto Alternativo para Imágenes: Todas las imágenes tendrán un texto alternativo descriptivo.
Etiquetas para Controles de Formulario: Todos los controles de formulario (inputs, selects, etc.) estarán correctamente etiquetados.
Navegación con Teclado: La aplicación será completamente navegable con el teclado.
Contraste de Color: Se asegurará un contraste de color suficiente entre el texto y el fondo.
## 8. Ejemplo de Componente Principal: ExamenView

```TypeScript

import React, { useState, useEffect } from 'react';
import { obtenerExamen, enviarRespuestas } from '../api'; // Función simulada para obtener el examen
import { Examen, Respuesta } from '../types'; // Interfaces para tipado (ver más abajo)
import styles from './ExamenView.module.css'; // CSS Modules

const ExamenView: React.FC = () => {
    const [examen, setExamen] = useState<Examen | null>(null);
    const [respuestas, setRespuestas] = useState<Respuesta[]>([]);
    const [cargando, setCargando] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const cargarExamen = async () => {
            try {
                const datosExamen = await obtenerExamen(); // Llamada a la API (simulada)
                setExamen(datosExamen);
            } catch (err: any) {
                setError('No se pudo cargar el examen. Por favor, inténtelo de nuevo más tarde.');
            } finally {
                setCargando(false);
            }
        };

        cargarExamen();
    }, []);

    const manejarRespuesta = (preguntaId: number, respuesta: string) => {
        const nuevaRespuesta = { preguntaId, respuesta };
        const existeRespuesta = respuestas.some(r => r.preguntaId === preguntaId);

        if (existeRespuesta) {
            const nuevasRespuestas = respuestas.map(r =>
                r.preguntaId === preguntaId ? nuevaRespuesta : r
            );
            setRespuestas(nuevasRespuestas);
        } else {
            setRespuestas([...respuestas, nuevaRespuesta]);
        }
    };

    const enviarExamen = async () => {
        try {
            setCargando(true);
            setError(null);
            await enviarRespuestas(respuestas); // Llamada a la API para enviar respuestas
            alert('¡Examen enviado con éxito!');
            // Redirigir a la página de resultados (opcional)
        } catch (err: any) {
            setError('No se pudieron enviar las respuestas. Por favor, inténtelo de nuevo.');
        } finally {
            setCargando(false);
        }
    };

    if (cargando) {
        return <div>Cargando examen...</div>; // Indicador de carga
    }

    if (error) {
        return <div>Error: {error}</div>; // Mensaje de error
    }

    if (!examen) {
        return <div>No se pudo obtener el examen.</div>;
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.titulo}>Examen</h2>
            {examen.preguntas.map(pregunta => (
                <div key={pregunta.id} className={styles.pregunta}>
                    <p className={styles.textoPregunta}>{pregunta.texto}</p>
                    {pregunta.opciones && (
                        <div className={styles.opciones}>
                            {pregunta.opciones.map(opcion => (
                                <label key={opcion} className={styles.labelOpcion}>
                                    <input
                                        type="radio"
                                        name={`pregunta-${pregunta.id}`}
                                        value={opcion}
                                        onChange={() => manejarRespuesta(pregunta.id, opcion)}
                                    />
                                    {opcion}
                                </label>
                            ))}
                        </div>
                    )}
                    {pregunta.tipo === 'si-no' && (
                        <div className={styles.opciones}>
                            <label className={styles.labelOpcion}>
                                <input
                                    type="radio"
                                    name={`pregunta-${pregunta.id}`}
                                    value="Sí"
                                    onChange={() => manejarRespuesta(pregunta.id, "Sí")}
                                />
                                Sí
                            </label>
                            <label className={styles.labelOpcion}>
                                <input
                                    type="radio"
                                    name={`pregunta-${pregunta.id}`}
                                    value="No"
                                    onChange={() => manejarRespuesta(pregunta.id, "No")}
                                />
                                No
                            </label>
                        </div>
                    )}
                </div>
            ))}
            <button onClick={enviarExamen} className={styles.botonEnviar}>Enviar Examen</button>
        </div>
    );
};
```

export default ExamenView;

```TypeScript

// types.ts (Ejemplo de interfaces para tipado)
export interface Examen {
    id: number;
    titulo: string;
    preguntas: Pregunta[];
}

export interface Pregunta {
    id: number;
    texto: string;
    tipo: 'si-no' | 'opcion-multiple';
    opciones?: string[]; // Opcional para preguntas de sí/no
}

export interface Respuesta {
    preguntaId: number;
    respuesta: string;
}
CSS

/* ExamenView.module.css (Ejemplo de CSS Modules) */
.container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

.titulo {
    text-align: center;
    margin-bottom: 20px;
}

.pregunta {
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.textoPregunta {
    font-weight: bold;
    margin-bottom: 10px;
}

.opciones {
    display: flex;
    flex-direction: column;
}

.labelOpcion {
    margin-bottom: 5px;
}

.botonEnviar {
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.botonEnviar:hover {
    background-color: #3e8e41;
}
```
## 9. Línea de Tiempo Tentativa (15 días, 2 desarrolladores)
Esta es una línea de tiempo aproximada y puede variar según la complejidad y los desafíos encontrados. Se asume que ambos desarrolladores tienen experiencia en React y desarrollo web.

### Día 1-4:  Configuración y Componentes Atómicos/Moleculares

Ambos desarrolladores: Configurar el proyecto (React), definir la estructura de carpetas, crear los componentes atómicos y moleculares básicos (botones, inputs, etiquetas, formularios reutilizables, etc.), y establecer los estilos globales (variables CSS). Implementar la lógica de autenticación simulada (registro automático).
### Día 5-7: Componente de Organismo ExamenView

Ambos desarrolladores: Crear el componente de organismo ExamenView, implementar la lógica para mostrar las preguntas, capturar las respuestas del estudiante y manejar el envío del examen. (Paso 11 de plan.md)
### Día 8-9: Componente de Organismo ResultadoView

Ambos desarrolladores: Crear el componente de organismo ResultadoView, implementar la lógica para mostrar los resultados del examen.
### Día 10-11: Componente de Organismo CertificadoView y LandingPage

Desarrollador 1: Crear el componente de organismo CertificadoView, implementar la lógica para mostrar el certificado.
Desarrollador 2: Crear el componente LandingPage, implementar la lógica para mostrar los certificados del estudiante.
### Día 12-13: Integración con el Backend

Ambos desarrolladores: Integrar el frontend con el backend (API) para obtener los datos del examen, enviar las respuestas y obtener los datos del certificado.
### Día 14-15: Pruebas y Ajustes

Ambos desarrolladores: Realizar pruebas de integración, pruebas de usabilidad, corregir errores, realizar ajustes finales.
Notas:

Esta línea de tiempo es una guía y puede ajustarse según las prioridades y los avances del desarrollo.
La comunicación constante entre los desarrolladores y el uso de un sistema de control de versiones (Git) son cruciales.
Se prioriza la implementación del flujo principal de la aplicación y las funcionalidades esenciales para el MVP.
