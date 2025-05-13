# Guías de Estilo - MentorCertAi

**Versión:** 1.0
**Fecha:** 12 de mayo de 2025
**Estado:** Borrador Final para MVP

## 1. Fundamentos del Sistema de Diseño

### 1.1 Paleta de Colores

```javascript
const colors = {
    primary: {
        main: '#0047FF',       // Azul principal
        light: '#668cff',      // Tono más claro (opcional)
        dark: '#0029b3',       // Tono más oscuro (opcional)
    },
    secondary: {
        main: '#000000',       // Negro
        light: '#333333',      // Gris más oscuro (opcional)
        dark: '#000000',       // Negro (sin variación oscura)
    },
    accent: {
        main: '#00E5FF',       // Cian/Turquesa
    },
    icon: {
        main: '#C7440D',       // Color para iconos (rojo-naranja oscuro)
    },
    background: {
        main: '#FFFFFF',       // Blanco
        light: '#f0f0f0',      // Gris muy claro (opcional)
    },
    text: {
        primary: '#000000',      // Negro para el texto principal
        secondary: '#808080',    // Gris para el texto secundario
    },
    grey: {
        main: '#808080'
    },
    error: {
        main: '#FF0000'        // Rojo para errores
    },
    success: {
        main: '#00FF00'        // Verde para éxito
    }
};

const typography = {
    titleGradient: `linear-gradient(to right, ${colors.primary.main}, ${colors.icon.main})`,
};
```

Primario: #0047FF (Azul) - Para acciones principales y elementos clave.
Secundario: #000000 (Negro) - Para texto principal y algunos fondos.
Acento: #00E5FF (Cian/Turquesa) - Para énfasis y elementos interactivos.
Icono: #C7440D (Rojo-Naranja Oscuro) - Color específico para iconos.
Fondo: #FFFFFF (Blanco) - Fondo principal.
Texto: #000000 (Negro) y #808080 (Gris) - Para texto principal y secundario.
Degradado: Un degradado lineal entre el azul primario y el color de icono, usado para los títulos principales.

### 1.2 Tipografía
```javascript
const typography = {
    fontFamily: {
        primary: 'Montserrat, sans-serif',
        secondary: 'Raleway, sans-serif',
    },
    h1: {
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '2.5rem',         // 40px
        fontWeight: 700,            // Negrita
        lineHeight: 1.2,
        color: colors.text.primary,
        background: typography.titleGradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    h2: {
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '2rem',           // 32px
        fontWeight: 700,
        lineHeight: 1.3,
        color: colors.text.primary,
    },
    h3: {
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '1.5rem',           // 24px
        fontWeight: 600,            // Semibold
        lineHeight: 1.4,
        color: colors.text.primary,
    },
    h4: {
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '1.25rem',          // 20px
        fontWeight: 600,
        lineHeight: 1.5,
        color: colors.text.primary,
    },
    body1: {
        fontFamily: 'Raleway, sans-serif',
        fontSize: '1rem',           // 16px
        fontWeight: 400,            // Regular
        lineHeight: 1.6,
        color: colors.text.primary,
    },
    body2: {
        fontFamily: 'Raleway, sans-serif',
        fontSize: '0.875rem',       // 14px
        fontWeight: 400,
        lineHeight: 1.5,
        color: colors.text.secondary,
    },
    caption: {
        fontFamily: 'Raleway, sans-serif',
        fontSize: '0.75rem',        // 12px
        fontWeight: 400,
        lineHeight: 1.4,
        color: colors.text.secondary,
    },
    button: {
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '1rem',           // 16px
        fontWeight: 600,
        textTransform: 'uppercase',
    },
    overline: {
        fontFamily: 'Raleway, sans-serif',
        fontSize: '0.75rem',        // 12px
        fontWeight: 500,
        lineHeight: 1.3,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: colors.text.secondary,
    },
};
```

Principal: Montserrat, sans-serif
Secundaria: Raleway, sans-serif
Encabezados (h1-h4): Montserrat, con h1 usando el degradado de color.
Cuerpo (body1, body2), Caption, Overline: Raleway.
Botones: Montserrat, uppercase.

### 1.3 Sistema de Espaciado

```javascript
const spacing = {
    base: 8,
    xxs: '0.25rem',    // 2px
    xs:  '0.5rem',     // 4px
    sm:  '0.75rem',    // 6px
    md:  '1rem',       // 8px
    lg:  '1.5rem',     // 12px
    xl:  '2rem',       // 16px
    xxl: '3rem',       // 24px
    xxxl: '4rem',      // 32px
    xxxxl: '6rem',     // 48px
};
```

Basado en una unidad base de 8px.
Escala en rem para escalabilidad.
Usar para márgenes, rellenos, espaciado entre elementos.
### 1.4 Estilo de Iconografía
Tipo: Iconos lineales (outline).
Fuente: Feather Icons (https://feathericons.com/).
Color: #C7440D (colors.icon.main).
Tamaño:
Pequeños: 16px (spacing.xl)
Medianos: 24px (spacing.xxl)
Grandes: 32px (spacing.xxxl)
Proporcionar etiquetas de texto o texto alternativo para accesibilidad.
## 2. Patrones de Diseño de Componentes
### 2.1 Variaciones de Botones (Tailwind CSS)

```javascript
const buttonStyles = {
    primary: 'bg-primary-main text-background-main font-button text-button font-semibold py-2 px-4 rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-accent-main',
    secondary: 'bg-background-main text-primary-main font-button text-button font-semibold py-2 px-4 rounded border border-primary-main hover:bg-primary-light hover:text-background-main focus:outline-none focus:ring-2 focus:ring-accent-main',
    disabled: 'bg-gray-500 text-background-main font-button text-button font-semibold py-2 px-4 rounded cursor-not-allowed',
};
```

Primario: Botón azul con texto blanco, para acciones principales.
Secundario: Botón blanco con borde azul, para acciones secundarias.
Deshabilitado: Botón gris, para indicar que no está disponible.
Usa clases de Tailwind CSS para estilos.
### 2.2 Elementos de Formulario (Tailwind CSS)

```javascript
const inputStyles = {
    input: 'appearance-none block w-full bg-background-main text-gray-700 border border-gray-300 rounded py-2 px-4 leading-tight focus:outline-none focus:border-primary-main',
    label: 'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2',
    helperText: 'text-gray-500 text-xs italic',
    error: 'text-red-500 text-xs italic',
    errorInput: 'appearance-none block w-full bg-background-main text-gray-700 border border-red-500 rounded py-2 px-4 leading-tight focus:outline-none focus:border-red-500',
};

const selectStyles = {
    select: 'appearance-none block w-full bg-background-main text-gray-700 border border-gray-300 rounded py-2 px-4 leading-tight focus:outline-none focus:border-primary-main',
    selectWrapper: 'relative',
    selectArrow: 'absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none',
};

const checkboxStyles = {
    checkbox: 'appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-background-main checked:bg-primary-main checked:border-primary-main focus:outline-none',
    label: 'ml-2 text-gray-700',
    wrapper: 'flex items-center',
};
```

Inputs: Estilos para inputs de texto, email, etc. Incluye estilos para etiquetas, texto de ayuda y errores.
Selects: Estilos para selects, incluyendo un contenedor para la flecha.
Checkboxes: Estilos para checkboxes y sus etiquetas.
Usa clases de Tailwind CSS.
### 2.3 Elementos de Navegación (Tailwind CSS)
```javascript

const navStyles = {
    nav: 'bg-background-main py-4',
    navList: 'flex items-center justify-between',
    navItem: 'text-gray-700 hover:text-primary-main px-4 py-2',
    navLink: 'font-semibold',
    navActive: 'text-primary-main',
};

const paginationStyles = {
    pagination: 'flex justify-center py-4',
    pageButton: 'px-4 py-2 mx-1 border border-gray-300 rounded hover:bg-gray-100',
    pageActive: 'bg-primary-main text-background-main border-primary-main',
    pageDisabled: 'text-gray-400 cursor-not-allowed',
};
```

Barra de Navegación: Estilos para la barra de navegación principal.
Paginación: Estilos para la paginación (opcional para el MVP).
Usa clases de Tailwind CSS.
### 2.4 Estilos de Tarjetas/Contenedores (Tailwind CSS)

```javascript
const cardStyles = {
    card: 'bg-background-main rounded-lg shadow-md overflow-hidden',
    cardHeader: 'px-6 py-4 bg-gray-50',
    cardTitle: 'text-xl font-semibold text-gray-900',
    cardBody: 'px-6 py-4',
    cardFooter: 'px-6 py-4 bg-gray-50 border-t border-gray-200',
};
```

Estilos para tarjetas y contenedores con encabezado, cuerpo y pie de página opcionales.
Usa clases de Tailwind CSS.
## 3. Directrices de Diseño Responsivo
(Esto se ampliará en una versión posterior, pero para el MVP, usar las utilidades responsivas de Tailwind CSS para adaptar los componentes a diferentes tamaños de pantalla).

## 4. Estándares de Accesibilidad
(Esto se ampliará en una versión posterior, pero para el MVP, seguir las mejores prácticas básicas de accesibilidad:

Semántica HTML.*
Contraste de color suficiente.*
Navegación con teclado.*
Texto alternativo para imágenes.*
Etiquetas adecuadas para los elementos de formulario.*)