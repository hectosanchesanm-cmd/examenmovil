# Examen 2 - Aplicación de Login con React Native

## Descripción del Proyecto

Esta es una aplicación móvil desarrollada con **React Native** y **Expo Router** que implementa un sistema de autenticación básico con navegación entre pantallas. La aplicación permite a los usuarios iniciar sesión con credenciales, navegar por la interfaz mediante pestañas (tabs) y gestionar su sesión de usuario.

## Características Principales

### Sistema de Autenticación

- Pantalla de login con validación de credenciales
- Contraseña predeterminada: `1234`
- Manejo de estado global mediante Context API
- Navegación protegida según estado de autenticación

### Lista de Tareas (TODO List)

- **Gestión de tareas por usuario**: Cada usuario solo ve y administra sus propias tareas
- **Persistencia de datos**: Las tareas se guardan localmente usando AsyncStorage
- **Agregar tareas**: Crear nuevas tareas con título personalizado
- **Marcar como completadas**: Toggle para cambiar el estado de las tareas
- **Eliminar tareas**: Opción para remover tareas de la lista
- **Captura de fotos**: Posibilidad de adjuntar fotos a las tareas usando la cámara del dispositivo
- **Geolocalización**: Las tareas guardan automáticamente las coordenadas de ubicación donde fueron creadas
- **Filtrado automático**: Solo se muestran las tareas del usuario actualmente autenticado

### Interfaz de Usuario

- **Pantalla de Login**: Formulario con campos de email y contraseña
- **Pantalla Home**: Bienvenida con imagen decorativa (vaquita)
- **Pantalla de Perfil**: Muestra el nombre de usuario y permite cerrar sesión
- **Pantalla TODO List**: Gestión completa de tareas personales con interfaz intuitiva
- **Navegación por Tabs**: Tres pestañas principales (Home, Perfil y TODO List) con íconos personalizados
- **Tema Oscuro**: Implementación del modo oscuro de React Navigation

### Componentes Reutilizables

- `EntradaTexto`: Input personalizado con soporte para diferentes tipos de teclado
- `Titulo`: Componente de texto estilizado para títulos
- `Parrafo`: Componente para textos de párrafo
- `TaskItem`: Componente para mostrar y gestionar tareas individuales
- Íconos personalizados para la navegación (Home, Perfil, TODO List, Agregar, Eliminar)

### Tecnologías Utilizadas

- **React Native** (v0.81.5)
- **Expo** (~54.0.20)
- **Expo Router** (~6.0.13): Sistema de navegación basado en archivos
- **React Navigation**: Navegación por tabs y manejo de temas
- **TypeScript** (~5.9.2): Tipado estático
- **React Context API**: Manejo de estado global
- **React Hooks**: useState, useContext, useRouter, useEffect
- **AsyncStorage**: Persistencia de datos local
- **Expo Image Picker**: Captura de fotos desde la cámara
- **Expo Location**: Obtención de coordenadas GPS
- **nanoid**: Generación de IDs únicos para tareas

## Video DEMO

[VIDEO DEMO](https://www.youtube.com/watch?v=rU_sSL_fN8A)

## Estructura del Proyecto

```
ReactNative_Examen1-main/
├── app/
│   ├── _layout.tsx              # Layout principal con ContextProvider
│   ├── index.tsx                # Pantalla de login
│   └── appLogin/
│       ├── _layout.tsx          # Layout con navegación por tabs
│       ├── home.tsx             # Pantalla de bienvenida
│       ├── perfil.tsx           # Pantalla de perfil de usuario
│       └── todolist.tsx         # Pantalla de gestión de tareas
├── components/
│   ├── EntradaTexto.tsx         # Componente de input de texto
│   ├── Titulo.tsx               # Componente de título
│   ├── Parrafo.tsx              # Componente de párrafo
│   ├── TaskItem.tsx             # Componente de item de tarea
│   └── ui/
│       └── icons.tsx            # Íconos personalizados
├── constants/
│   └── types.ts                 # Definiciones de tipos TypeScript
├── hooks/
│   └── globalContext.tsx        # Context API para estado global
├── styles/
│   ├── entradaStyle.tsx         # Estilos para inputs
│   ├── tituloStyles.tsx         # Estilos para títulos
│   ├── indexStyles.tsx          # Estilos generales
│   ├── taskItemStyle.tsx        # Estilos para items de tarea
│   └── todolistStyle.tsx        # Estilos para la lista de tareas
├── assets/
│   └── images/                  # Imágenes y recursos
├── app.json                     # Configuración de Expo
├── package.json                 # Dependencias del proyecto
└── tsconfig.json                # Configuración de TypeScript
```

## Flujo de la Aplicación

1. **Pantalla de Login** (`app/index.tsx`):

   - El usuario ingresa su email y contraseña
   - Se valida que la contraseña sea "1234"
   - Si es correcta, se guarda el usuario en el contexto global y se navega a la zona autenticada
   - Si es incorrecta, se muestra una alerta

2. **Zona Autenticada** (`app/appLogin/`):

   - **Tab Home**: Muestra un mensaje de bienvenida con una imagen
   - **Tab TODO List**: Gestión de tareas personales
     - Ver lista de tareas del usuario actual
     - Agregar nuevas tareas con título
     - Opcionalmente adjuntar foto desde la cámara
     - Las tareas guardan automáticamente la ubicación GPS
     - Marcar tareas como completadas
     - Eliminar tareas
     - Todas las tareas se persisten en AsyncStorage
     - Filtrado automático: solo se muestran las tareas del usuario autenticado
   - **Tab Perfil**: Muestra el nombre del usuario y un botón para cerrar sesión

3. **Gestión de Tareas por Usuario**:

   - Cada tarea incluye: ID único, título, estado (completada/pendiente), usuario propietario, foto opcional, coordenadas GPS opcionales
   - Las tareas se almacenan localmente y persisten entre sesiones
   - El sistema filtra automáticamente para mostrar solo las tareas del usuario activo

4. **Cerrar Sesión**:
   - Limpia el estado global del usuario
   - Redirige de vuelta a la pantalla de login
   - Las tareas permanecen guardadas en AsyncStorage para la próxima sesión

## Instalación y Ejecución

### Prerrequisitos

- Node.js (versión 14 o superior)
- npm o yarn
- Expo CLI
- Emulador de Android/iOS o dispositivo físico con Expo Go

### Pasos de Instalación

1. Clonar el repositorio:

```bash
git clone <url-del-repositorio>
cd ReactNative_Examen1-main
```

2. Instalar dependencias:

```bash
npm install
```

3. Iniciar el proyecto:

```bash
npm start
```

### Comandos Disponibles

- `npm start`: Inicia el servidor de desarrollo de Expo
- `npm run android`: Ejecuta la app en Android
- `npm run ios`: Ejecuta la app en iOS
- `npm run web`: Ejecuta la app en navegador web
- `npm run lint`: Ejecuta el linter de código

## Credenciales de Prueba

Para probar la aplicación, utiliza las siguientes credenciales:

- **Usuario**: Cualquier email válido
- **Contraseña**: `1234`

## Características Técnicas Destacadas

### Context API para Estado Global

La aplicación utiliza React Context para mantener el estado del usuario a través de toda la aplicación, implementado en `hooks/globalContext.tsx`. El contexto almacena información del usuario autenticado y está disponible en todos los componentes.

### AsyncStorage para Persistencia

Implementación de AsyncStorage para guardar las tareas de forma persistente en el dispositivo. Las tareas se almacenan asociadas al usuario que las creó, permitiendo que múltiples usuarios mantengan sus propias listas de tareas.

### Integración de Permisos Nativos

- **Cámara**: Solicitud y manejo de permisos para capturar fotos
- **Ubicación**: Solicitud de permisos de ubicación en primer plano para guardar coordenadas GPS

### Expo Router

Sistema de navegación basado en la estructura de archivos, similar a Next.js, que simplifica el enrutamiento y la navegación.

### TypeScript

Todo el código está escrito en TypeScript, proporcionando tipado estático y mejor experiencia de desarrollo. Se incluyen interfaces personalizadas como `Task` para una mejor estructura de datos.

### Safe Area Context

Manejo apropiado de las áreas seguras en dispositivos modernos (notch, barras de estado, etc.).

### Temas

Soporte para modo oscuro utilizando React Navigation themes.

## Autores

Este proyecto fue desarrollado por:

### Sebastián Rodriguez

### Benjamín Sanchez

### Hector Sanchez

---

## Posibles Mejoras Futuras

- [ ] Implementar autenticación real con backend
- [ ] Sincronización de tareas con servidor remoto
- [ ] Implementar validación de formularios más robusta
- [ ] Añadir recuperación de contraseña
- [ ] Agregar registro de nuevos usuarios
- [ ] Implementar animaciones y transiciones
- [ ] Agregar modo claro/oscuro configurable por el usuario
- [ ] Implementar tests unitarios y de integración
- [ ] Mejorar la seguridad de las credenciales
- [ ] Edición de tareas existentes
- [ ] Categorías y etiquetas para tareas
- [ ] Fechas de vencimiento y recordatorios
- [ ] Búsqueda y filtrado avanzado de tareas
- [ ] Exportar/importar tareas
- [ ] Visualización de ubicaciones en mapa
- [ ] Galería de fotos adjuntas

## Licencia

Este proyecto es un ejercicio académico desarrollado para fines educativos.

---
