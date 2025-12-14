# Examen 3 - Aplicación de TODO List con React Native y Backend

## Descripción del Proyecto

Esta es una aplicación móvil desarrollada con **React Native** y **Expo Router** que implementa un sistema completo de gestión de tareas (TODO List) con autenticación mediante backend API REST. La aplicación permite a los usuarios registrarse, iniciar sesión, y gestionar sus tareas personales con funcionalidades avanzadas como captura de fotos y geolocalización.

## Características Principales

### Sistema de Autenticación

- **Autenticación real con backend API REST**: Login y registro de usuarios
- **JWT (JSON Web Tokens)**: Tokens de autenticación almacenados en AsyncStorage
- **Endpoints de autenticación**:
  - `POST /auth/login` - Inicio de sesión
  - `POST /auth/register` - Registro de nuevos usuarios
- **Manejo de estado global** mediante Context API
- **Navegación protegida** según estado de autenticación
- **Authorization Header**: Todas las peticiones autenticadas incluyen Bearer token

### Lista de Tareas (TODO List)

- **Gestión de tareas por usuario**: Cada usuario solo ve y administra sus propias tareas
- **Persistencia en backend**: Las tareas se almacenan en servidor mediante API REST
- **CRUD completo de tareas**:
  - `GET /todos` - Obtener todas las tareas del usuario
  - `POST /todos` - Crear nueva tarea
  - `PATCH /todos/:id` - Actualizar tarea (marcar como completada)
  - `DELETE /todos/:id` - Eliminar tarea
- **Agregar tareas**: Crear nuevas tareas con título personalizado
- **Marcar como completadas**: Toggle para cambiar el estado de las tareas
- **Eliminar tareas**: Opción para remover tareas de la lista
- **Captura de fotos**: Adjuntar fotos a las tareas usando la cámara del dispositivo
- **Upload de imágenes**: Las fotos se suben al servidor mediante `POST /images`
- **Geolocalización**: Las tareas guardan automáticamente las coordenadas GPS de ubicación
- **Filtrado por usuario**: El backend retorna solo las tareas del usuario autenticado

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

### API Backend

- **URL Base**: `https://todo-list.dobleb.cl`
- **Autenticación**: JWT Bearer Token
- **Endpoints disponibles**:
  - **Auth**: `/auth/login`, `/auth/register`
  - **Tareas**: `/todos`, `/todos/:id`
  - **Imágenes**: `/images`, `/images/:userId/:imageId`
- **Formato**: JSON (Content-Type: application/json)
- **Upload de archivos**: multipart/form-data para imágenes

### Tecnologías Utilizadas

**Frontend:**
- **React Native** (v0.81.5)
- **Expo** (~54.0.20)
- **Expo Router** (~6.0.13): Sistema de navegación basado en archivos
- **React Navigation**: Navegación por tabs y manejo de temas
- **TypeScript** (~5.9.2): Tipado estático
- **React Context API**: Manejo de estado global
- **React Hooks**: useState, useContext, useRouter, useEffect
- **AsyncStorage**: Almacenamiento de tokens JWT y datos de usuario
- **Expo Image Picker**: Captura de fotos desde la cámara
- **Expo Location**: Obtención de coordenadas GPS
- **nanoid**: Generación de IDs únicos para tareas

**Backend:**
- **API REST**: https://todo-list.dobleb.cl
- **Autenticación**: JSON Web Tokens (JWT)
- **Base de datos**: Persistencia de usuarios, tareas e imágenes

## Video DEMO

[VIDEO DEMO](https://youtu.be/rvqYBSkTJ5Q)

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
├── infraestructure/             # Capa de servicios API
│   ├── auth.ts                  # Servicio de autenticación
│   ├── todos.ts                 # Servicio CRUD de tareas
│   └── image.ts                 # Servicio de imágenes
├── utils/
│   ├── callApi.ts               # Wrapper de fetch para llamadas HTTP
│   └── utils.ts                 # Utilidades generales
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
├── .env                         # Variables de entorno (API URL)
├── app.json                     # Configuración de Expo
├── package.json                 # Dependencias del proyecto
└── tsconfig.json                # Configuración de TypeScript
```

## Flujo de la Aplicación

1. **Pantalla de Login** (`app/index.tsx`):

   - El usuario ingresa su email y contraseña
   - Se envía petición POST a `/auth/login` en el backend
   - Si la autenticación es exitosa:
     - Se recibe un token JWT
     - El token se almacena en AsyncStorage
     - Los datos del usuario se guardan en AsyncStorage
     - Se navega a la zona autenticada
   - Si falla, se muestra una alerta de error

2. **Zona Autenticada** (`app/appLogin/`):

   - **Tab Home**: Muestra un mensaje de bienvenida con una imagen
   - **Tab TODO List**: Gestión de tareas personales con backend
     - GET `/todos` - Cargar lista de tareas del usuario desde el servidor
     - Agregar nuevas tareas con título
     - Opcionalmente capturar foto desde la cámara
     - POST `/images` - Upload de foto al servidor
     - Las tareas guardan automáticamente la ubicación GPS
     - PATCH `/todos/:id` - Marcar tareas como completadas
     - DELETE `/todos/:id` - Eliminar tareas del servidor
     - El backend filtra y retorna solo las tareas del usuario autenticado
   - **Tab Perfil**: Muestra el nombre del usuario y un botón para cerrar sesión

3. **Gestión de Tareas por Usuario**:

   - Cada tarea incluye: ID único, título, estado (completada/pendiente), userId, foto URL (opcional), coordenadas GPS (opcional)
   - Las tareas se almacenan en el servidor backend
   - Todas las operaciones requieren token JWT en el header Authorization
   - El backend asocia automáticamente las tareas al usuario autenticado
   - Persistencia permanente en base de datos del servidor

4. **Cerrar Sesión**:
   - Limpia el estado global del usuario
   - Redirige de vuelta a la pantalla de login
   - Las tareas permanecen guardadas en el servidor backend
   - El token se elimina del dispositivo

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

Para probar la aplicación:

1. **Registrar nuevo usuario**:
   - Puedes registrarte con cualquier email y contraseña
   - La app creará una cuenta en el backend

2. **Iniciar sesión**:
   - Usa el email y contraseña que registraste
   - El backend validará las credenciales y retornará un token JWT

## Características Técnicas Destacadas

### Arquitectura Cliente-Servidor

La aplicación implementa una arquitectura completa cliente-servidor:
- **Frontend**: React Native con Expo
- **Backend**: API REST en `https://todo-list.dobleb.cl`
- **Comunicación**: HTTP/HTTPS con JSON
- **Autenticación**: JWT Bearer Tokens

### Capa de Infraestructura (Service Layer)

Organización del código en capas con servicios especializados:
- **auth.ts**: Manejo de login y registro
- **todos.ts**: CRUD completo de tareas
- **image.ts**: Upload y gestión de imágenes
- **callApi.ts**: Wrapper centralizado de fetch con headers automáticos

### Context API para Estado Global

La aplicación utiliza React Context (`hooks/globalContext.tsx`) para mantener el estado del usuario a través de toda la aplicación. El contexto almacena información del usuario autenticado y está disponible en todos los componentes.

### AsyncStorage para Tokens

Implementación de AsyncStorage para almacenar de forma segura:
- **Token JWT**: Usado en todas las peticiones autenticadas
- **Datos de usuario**: Información del perfil del usuario
- No se almacenan tareas localmente, estas residen en el servidor

### Integración de Permisos Nativos

- **Cámara**: Solicitud y manejo de permisos para capturar fotos usando Expo Image Picker
- **Ubicación**: Solicitud de permisos de ubicación en primer plano para obtener coordenadas GPS con Expo Location

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

## Funcionalidades Implementadas

- [x] Autenticación real con backend API REST
- [x] Sincronización de tareas con servidor remoto
- [x] Registro de nuevos usuarios
- [x] Upload de imágenes al servidor
- [x] Geolocalización GPS en tareas
- [x] Modo oscuro con React Navigation themes
- [x] CRUD completo de tareas
- [x] Captura de fotos desde la cámara
- [x] Persistencia en base de datos del servidor

## Posibles Mejoras Futuras

- [ ] Implementar validación de formularios más robusta (email, longitud de contraseña)
- [ ] Añadir recuperación de contraseña (forgot password)
- [ ] Implementar refresh tokens para renovar sesiones
- [ ] Implementar animaciones y transiciones suaves
- [ ] Agregar modo claro/oscuro configurable por el usuario
- [ ] Implementar tests unitarios y de integración
- [ ] Encriptar tokens en AsyncStorage
- [ ] Edición de tareas existentes (actualizar título, foto)
- [ ] Categorías y etiquetas para organizar tareas
- [ ] Fechas de vencimiento y sistema de recordatorios push
- [ ] Búsqueda y filtrado avanzado de tareas
- [ ] Exportar/importar tareas (JSON, CSV)
- [ ] Visualización de ubicaciones en mapa interactivo
- [ ] Galería de fotos adjuntas a las tareas
- [ ] Modo offline con sincronización automática
- [ ] Compartir tareas entre usuarios
- [ ] Notificaciones push
- [ ] Optimistic UI updates
- [ ] Paginación en lista de tareas
- [ ] Cache de imágenes optimizado

## Licencia

Este proyecto es un ejercicio académico desarrollado para fines educativos.

---
