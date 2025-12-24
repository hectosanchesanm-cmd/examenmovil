# Examen Final - Aplicación Móvil TODO List con React Native y Backend API REST

## Descripción del Proyecto

Aplicación móvil multiplataforma desarrollada con **React Native**, **Expo Router** y **TypeScript** que implementa un sistema completo de gestión de tareas (TODO List) con autenticación real mediante backend API REST. La aplicación permite a los usuarios registrarse, iniciar sesión, y gestionar sus tareas personales con funcionalidades avanzadas como captura de fotos desde la cámara, upload de imágenes al servidor y geolocalización GPS automática.

## 📋 Tabla de Contenidos

- [Highlights del Proyecto](#-highlights-del-proyecto)
- [Características Principales](#características-principales)
- [Video DEMO](#video-demo)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Flujo de la Aplicación](#flujo-de-la-aplicación)
- [Instalación y Ejecución](#instalación-y-ejecución)
- [API Backend](#api-backend)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Características Técnicas Destacadas](#características-técnicas-destacadas)
- [Flujo de Datos](#flujo-de-datos-de-la-aplicación)
- [Pantallas de la Aplicación](#pantallas-de-la-aplicación)
- [Resumen de Cambios](#resumen-de-cambios-implementados-en-el-proyecto)
- [Configuración de Permisos](#configuración-de-permisos-appjson)
- [Autores](#autores)

## 🚀 Highlights del Proyecto

- ✅ **Arquitectura en capas profesional**: Service Layer + Custom Hooks + UI Components
- ✅ **Backend API REST real**: Integración completa con https://todo-list.dobleb.cl
- ✅ **JWT Authentication**: Sistema de tokens Bearer con AsyncStorage
- ✅ **CRUD completo**: Operaciones Create, Read, Update, Delete sincronizadas con servidor
- ✅ **Upload de imágenes**: Captura de fotos y subida al servidor (multipart/form-data)
- ✅ **Geolocalización GPS**: Coordenadas automáticas al crear tareas
- ✅ **TypeScript completo**: Tipado estático con interfaces personalizadas
- ✅ **Custom Hook (useTodoHook)**: Lógica de negocio encapsulada y reutilizable
- ✅ **Expo Router**: Sistema de navegación file-based routing
- ✅ **Dark Theme**: Tema oscuro con React Navigation
- ✅ **Optimizaciones**: useCallback, image caching, loading states

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

**URL Base**: `https://todo-list.dobleb.cl`

**Autenticación**: JWT Bearer Token en header `Authorization: Bearer <token>`

#### Endpoints de Autenticación

**POST /auth/login**
```json
Request:
{
  "email": "usuario@email.com",
  "password": "1234"
}

Response (200 OK):
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user_id",
      "email": "usuario@email.com"
    }
  }
}
```

**POST /auth/register**
```json
Request:
{
  "email": "nuevo@email.com",
  "password": "password123"
}

Response (201 Created):
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Endpoints de Tareas

**GET /todos**
- Headers: `Authorization: Bearer <token>`
- Retorna solo las tareas del usuario autenticado

```json
Response (200 OK):
{
  "success": true,
  "data": [
    {
      "id": "task_id",
      "userId": "user_id",
      "title": "Comprar leche",
      "completed": false,
      "photoUri": "https://todo-list.dobleb.cl/images/user_id/image_id",
      "location": {
        "latitude": -33.45,
        "longitude": -70.66
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

**POST /todos**
- Headers: `Authorization: Bearer <token>`, `Content-Type: application/json`

```json
Request:
{
  "title": "Nueva tarea",
  "completed": false,
  "photoUri": "https://todo-list.dobleb.cl/images/user_id/image_id",
  "location": {
    "latitude": -33.45,
    "longitude": -70.66
  }
}

Response (201 Created):
{
  "success": true,
  "data": {
    "id": "new_task_id",
    "userId": "user_id",
    "title": "Nueva tarea",
    "completed": false,
    "photoUri": "...",
    "location": { ... },
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

**PATCH /todos/:id**
- Headers: `Authorization: Bearer <token>`, `Content-Type: application/json`
- Actualización parcial (solo campos enviados)

```json
Request:
{
  "completed": true
}

Response (200 OK):
{
  "success": true,
  "data": {
    "id": "task_id",
    "completed": true,
    ...
  }
}
```

**DELETE /todos/:id**
- Headers: `Authorization: Bearer <token>`

```json
Response (200 OK):
{
  "success": true,
  "message": "Tarea eliminada exitosamente"
}
```

#### Endpoints de Imágenes

**POST /images**
- Headers: `Authorization: Bearer <token>`, `Content-Type: multipart/form-data`
- Body: FormData con campo `image` (file)

```json
Response (201 Created):
{
  "success": true,
  "data": {
    "url": "https://todo-list.dobleb.cl/images/user_id/image_id",
    "key": "image_id",
    "size": 45678,
    "contentType": "image/jpeg"
  }
}
```

**GET /images/:userId/:imageId**
- Headers: `Authorization: Bearer <token>`
- Retorna: Blob de la imagen (image/jpeg, image/png, etc.)

**DELETE /images/:userId/:imageId**
- Headers: `Authorization: Bearer <token>`

```json
Response (200 OK):
{
  "success": true,
  "message": "Imagen eliminada exitosamente"
}
```

### Tecnologías Utilizadas

**Frontend:**
- **React Native** (v0.81.5) - Framework multiplataforma
- **Expo** (~54.0.20) - Plataforma de desarrollo
- **Expo Router** (~6.0.13) - Sistema de navegación basado en archivos (file-based routing)
- **React Navigation** (v7.1.8) - Navegación por tabs y manejo de temas
- **TypeScript** (~5.9.2) - Tipado estático para mayor robustez
- **React Context API** - Manejo de estado global de autenticación
- **Custom Hooks** - Lógica reutilizable (`useTodoHook`)
- **AsyncStorage** (@react-native-async-storage/async-storage 2.2.0) - Persistencia local de tokens JWT
- **Expo Image Picker** (~17.0.8) - Captura de fotos desde la cámara nativa
- **Expo Location** (~19.0.7) - Obtención de coordenadas GPS del dispositivo
- **React Native Gesture Handler** (~2.28.0) - Manejo de gestos táctiles
- **React Native Reanimated** (~4.1.1) - Animaciones fluidas
- **nanoid** (v5.1.6) - Generación de IDs únicos para keys de React

**Backend:**
- **API REST**: https://todo-list.dobleb.cl
- **Autenticación**: JSON Web Tokens (JWT) con Bearer scheme
- **Base de datos**: Persistencia en servidor de usuarios, tareas e imágenes
- **Storage**: Sistema de almacenamiento de imágenes en servidor

## Video DEMO

[VIDEO DEMO](https://youtu.be/p2ZL2No5ju8)

## Estructura del Proyecto

```
ReactNative_Examen1-main/
├── app/                                    # Sistema de rutas (Expo Router)
│   ├── _layout.tsx                        # Layout raíz con ContextProvider, ThemeProvider, SafeAreaProvider
│   ├── index.tsx                          # Pantalla de Login (ruta principal "/")
│   └── appLogin/                          # Grupo de rutas autenticadas
│       ├── _layout.tsx                    # Layout con Tabs Navigator (3 tabs)
│       ├── home.tsx                       # Tab 1: Pantalla de bienvenida con imagen
│       ├── perfil.tsx                     # Tab 2: Perfil de usuario y logout
│       └── todolist.tsx                   # Tab 3: Gestión de tareas (CRUD completo)
│
├── components/                            # Componentes reutilizables de UI
│   ├── EntradaTexto.tsx                   # Input personalizado con soporte de teclados
│   ├── Titulo.tsx                         # Componente de texto para títulos
│   ├── Parrafo.tsx                        # Componente de texto para párrafos
│   ├── TaskItem.tsx                       # Card de tarea (toggle, delete, foto, coords)
│   └── ui/
│       └── icons.tsx                      # Íconos SVG personalizados (Home, Login, TodoList, Add, Trash)
│
├── infraestructure/                       # Capa de servicios API (Service Layer)
│   ├── auth.ts                            # Servicios: login(), register()
│   ├── todos.ts                           # Servicios: getAll(), create(), update(), delete()
│   └── image.ts                           # Servicios: UPLOAD(), GET(), DELETE()
│
├── hooks/                                 # Custom Hooks
│   ├── globalContext.tsx                  # Context API para estado global de usuario
│   └── todoListHook.tsx                   # useTodoHook() - Lógica completa de TODO List
│
├── utils/                                 # Utilidades y helpers
│   ├── callApi.ts                         # Wrapper de fetch (GET, POST, PATCH, DELETE, PostImage)
│   └── utils.ts                           # Funciones auxiliares (isBlob, etc.)
│
├── constants/                             # Definiciones globales
│   └── types.ts                           # Interfaces TypeScript (Task, User, Response, etc.)
│
├── styles/                                # Hojas de estilos (StyleSheet)
│   ├── entradaStyle.tsx                   # Estilos para EntradaTexto
│   ├── tituloStyles.tsx                   # Estilos para Titulo
│   ├── indexStyles.tsx                    # Estilos globales y pantalla login
│   ├── taskItemStyle.tsx                  # Estilos para TaskItem
│   └── todolistStyle.tsx                  # Estilos para pantalla TodoList
│
├── assets/                                # Recursos estáticos
│   └── images/                            # Imágenes (icon, splash, vaquitaVistoBueno.jpg)
│       ├── icon.png                       # Ícono de la app
│       ├── splash-icon.png                # Splash screen
│       ├── favicon.png                    # Favicon para web
│       └── vaquitaVistoBueno.jpg          # Imagen decorativa Home
│
├── .env                                   # Variables de entorno (EXPO_PUBLIC_API_URL)
├── app.json                               # Configuración de Expo (permisos, plugins, bundle IDs)
├── package.json                           # Dependencias y scripts del proyecto
├── tsconfig.json                          # Configuración de TypeScript
└── eslint.config.js                       # Configuración de ESLint
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

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v18.0.0 o superior) - [Descargar aquí](https://nodejs.org/)
- **npm** (v9.0.0 o superior) o **yarn**
- **Git** - Para clonar el repositorio
- **Expo CLI** - Se instalará automáticamente con las dependencias
- Una de las siguientes opciones para ejecutar la app:
  - **Expo Go App** en tu dispositivo móvil ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
  - **Android Studio** con emulador Android configurado
  - **Xcode** (solo macOS) con simulador iOS

### Pasos de Instalación

1. **Clonar el repositorio**:

```bash
git clone <url-del-repositorio>
cd ReactNative_Examen1-main
```

2. **Instalar dependencias**:

```bash
npm install
```

3. **Verificar variables de entorno**:

El archivo `.env` debe contener:
```env
EXPO_PUBLIC_API_URL=https://todo-list.dobleb.cl
```

4. **Iniciar el servidor de desarrollo**:

```bash
npm start
```

Esto iniciará Expo DevTools en tu navegador y mostrará un QR code en la terminal.

5. **Ejecutar la aplicación**:

**Opción A: En dispositivo físico (Recomendado)**
- Abre la app **Expo Go** en tu dispositivo
- Escanea el código QR mostrado en la terminal:
  - iOS: Usa la cámara nativa
  - Android: Usa el escáner de Expo Go
- La app se cargará automáticamente

**Opción B: En emulador Android**
```bash
npm run android
```

**Opción C: En simulador iOS (solo macOS)**
```bash
npm run ios
```

**Opción D: En navegador web**
```bash
npm run web
```

### Comandos Disponibles

```bash
npm start           # Inicia servidor de desarrollo Expo
npm run android     # Compila y ejecuta en emulador Android
npm run ios         # Compila y ejecuta en simulador iOS
npm run web         # Ejecuta versión web en navegador
npm run lint        # Ejecuta ESLint para verificar código
```

### Solución de Problemas Comunes

**Error: "Metro bundler not starting"**
```bash
npm start -- --reset-cache
```

**Error de dependencias**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Problemas con permisos en Android**
- Asegúrate de que el emulador tenga permisos de cámara y ubicación habilitados
- Ve a Configuración > Apps > Expo Go > Permisos

**Problemas con permisos en iOS**
- Cuando la app solicite permisos, debes aceptarlos
- Si los rechazaste, ve a Ajustes > Expo Go > Permisos

## Credenciales de Prueba

Para probar la aplicación:

1. **Registrar nuevo usuario**:
   - Puedes registrarte con cualquier email y contraseña
   - La app creará una cuenta en el backend

2. **Iniciar sesión**:
   - Usa el email y contraseña que registraste
   - El backend validará las credenciales y retornará un token JWT

## Características Técnicas Destacadas

### 1. Arquitectura Cliente-Servidor

La aplicación implementa una arquitectura completa cliente-servidor:
- **Frontend**: React Native con Expo (multiplataforma: iOS, Android, Web)
- **Backend**: API REST en `https://todo-list.dobleb.cl`
- **Comunicación**: HTTP/HTTPS con JSON
- **Autenticación**: JWT Bearer Tokens en headers Authorization
- **Separación de responsabilidades**: UI → Hooks → Services → API

### 2. Capa de Infraestructura (Service Layer)

Organización del código en capas con servicios especializados:

**`infraestructure/auth.ts`**
- `login(email, password)`: Autenticación y almacenamiento de token
- `register(email, password)`: Registro de nuevos usuarios

**`infraestructure/todos.ts`**
- `getAll()`: Obtener todas las tareas del usuario autenticado
- `getById(taskId)`: Obtener tarea específica
- `create(task)`: Crear nueva tarea con foto y ubicación
- `update(task)`: Actualización completa de tarea
- `partialUpdate(task)`: Actualización parcial (toggle completed)
- `delete(id)`: Eliminar tarea del servidor

**`infraestructure/image.ts`**
- `UPLOAD(mimetype, uri)`: Subir imagen al servidor (multipart/form-data)
- `GET(userId, imageId)`: Descargar imagen como Blob
- `DELETE(userId, imageId)`: Eliminar imagen del servidor

**`utils/callApi.ts`**
- Wrapper centralizado de fetch con métodos: GET, POST, PATCH, PUT, DELETE
- `PostImage()`: Manejo especial de FormData para upload de archivos
- Inyección automática de Authorization Bearer Token
- Manejo de errores HTTP consistente

### 3. Custom Hooks para Lógica de Negocio

**`hooks/useTodoHook.tsx`** - Hook personalizado que encapsula toda la lógica de TODO List:

**Estado manejado:**
```typescript
- tasks: TaskResponse[]           // Lista de tareas
- photoUri: string                 // URI de foto capturada
- isCapturingPhoto: boolean        // Loading state para cámara
- isSaving: boolean                // Loading state para guardar
- showAddNewTask: boolean          // Toggle vista agregar/listar
- newTaskTitle: string             // Título de nueva tarea
```

**Funciones expuestas:**
```typescript
- refreshTask()                    // Recargar tareas desde API
- toggleTask(id, completed)        // Toggle estado completado
- handleTakePhoto()                // Abrir cámara y subir foto
- removeTask(id)                   // Eliminar tarea (DELETE)
- addTask()                        // Crear tarea con foto y GPS
- setNewTaskTitle()                // Actualizar título
- setShowAddNewTask()              // Cambiar vista
```

**Características especiales:**
- **useCallback** para optimizar renders
- **useEffect** para carga inicial de tareas
- Manejo de permisos de cámara y ubicación
- Upload automático de imágenes al servidor
- Captura automática de coordenadas GPS al crear tarea
- Manejo de errores con Alerts nativos
- Loading states para mejor UX

### 4. Context API para Estado Global

**`hooks/globalContext.tsx`**
```typescript
const AppContext = createContext<any>(null);
- ContextProvider: Wrapper para toda la app
- useAppContext(): Hook para acceder al estado global
- Almacena: datos de usuario autenticado (disponible en toda la app)
```

### 5. AsyncStorage para Persistencia Local

Implementación de AsyncStorage para almacenar:
- **`token`**: JWT Bearer Token para autenticación
- **`user`**: Objeto JSON con datos del usuario (id, email)
- Las tareas NO se almacenan localmente (única fuente de verdad: servidor)
- Tokens se recuperan en cada llamada API
- Se limpian al cerrar sesión (logout)

### 6. Integración de Permisos Nativos

**Permisos de Cámara** (`expo-image-picker`):
```typescript
requestCameraPermissionsAsync()
launchCameraAsync({ quality: 0.3, allowsEditing: false })
```

**Permisos de Ubicación** (`expo-location`):
```typescript
requestForegroundPermissionsAsync()
getCurrentPositionAsync({ accuracy: Accuracy.Lowest })
```

Configuración en `app.json`:
- iOS: `NSCameraUsageDescription`, `NSLocationWhenInUseUsageDescription`
- Android: Permisos automáticos

### 7. Expo Router (File-Based Routing)

Sistema de navegación basado en la estructura de archivos (similar a Next.js):
- `app/index.tsx` → Ruta raíz "/"
- `app/appLogin/home.tsx` → Ruta "/appLogin/home"
- Layouts anidados con `_layout.tsx`
- Navegación con `useRouter()` hook
- Stack Navigator en layout raíz
- Tabs Navigator en layout de zona autenticada

### 8. TypeScript Tipado Estático

Interfaces definidas en `constants/types.ts`:

```typescript
interface TaskResponse {
  id?: string;
  userId?: string;
  title?: string;
  completed?: boolean;
  photoUri?: string;
  location?: { latitude: number; longitude: number };
  createdAt?: Date;
  updatedAt?: Date;
}

interface User {
  id: string;
  email: string;
}

interface Response<T> {
  success: boolean;
  count?: number;
  data?: T | null;
  message?: string;
  error?: string;
}
```

Beneficios:
- Autocompletado en editores
- Detección de errores en tiempo de desarrollo
- Refactorización segura
- Documentación implícita del código

### 9. Safe Area Context

Manejo apropiado de áreas seguras en dispositivos modernos:
```typescript
const insets = useSafeAreaInsets();
paddingTop: insets.top
paddingBottom: insets.bottom
```
- Evita superposición con notch, islas dinámicas, barras de estado
- Compatible con iOS y Android
- Soporte para modo landscape

### 10. React Navigation Dark Theme

Tema oscuro aplicado globalmente:
```typescript
<ThemeProvider value={DarkTheme}>
  ...
</ThemeProvider>
```
- Modo oscuro consistente en toda la app
- Colores de tabs, headers y backgrounds unificados
- Mejor experiencia visual nocturna

### 11. Componentes Reutilizables

**TaskItem.tsx** - Card completo de tarea:
- Circle indicator (verde si completada, transparente si pendiente)
- Título de la tarea con color dinámico
- Coordenadas GPS formateadas
- Imagen con loading indicator (ActivityIndicator)
- Botón de eliminar con ícono de basura
- TouchableOpacity para toggle

**EntradaTexto.tsx** - Input personalizado:
- Soporte para diferentes tipos de teclado (email, numeric, default)
- Modo secureTextEntry para contraseñas
- Estilos consistentes

**Icons.tsx** - Íconos SVG personalizados:
- HomeIcon, LoginIcon, ToDoListIcon
- AddIcon (botón flotante)
- TrashIcon (eliminar tarea)
- Props: color, size (personalizables)

### 12. Optimizaciones de Rendimiento

- **useCallback**: Memoización de funciones en hooks
- **Image caching**: `cache: "force-cache"` en imágenes
- **ActivityIndicator**: Loading states visuales
- **nanoid keys**: Keys únicas para listas React
- **Quality optimization**: Fotos con quality: 0.3 para reducir tamaño
- **Accuracy.Lowest**: GPS con precisión mínima para ahorrar batería

## Flujo de Datos de la Aplicación

### Flujo de Autenticación

```
1. Usuario ingresa email + password en Login Screen
   ↓
2. validateLogin() en app/index.tsx
   ↓
3. auth.login(email, password) en infraestructure/auth.ts
   ↓
4. callApi.POST() → Fetch a https://todo-list.dobleb.cl/auth/login
   ↓
5. Backend valida credenciales y retorna JWT token
   ↓
6. AsyncStorage.setItem("token", jwt)
   AsyncStorage.setItem("user", userObject)
   ↓
7. router.replace("/appLogin/home") → Navega a zona autenticada
```

### Flujo de Creación de Tarea

```
1. Usuario hace tap en AddIcon (botón flotante)
   ↓
2. setShowAddNewTask(true) → Muestra vista de agregar tarea
   ↓
3. Usuario ingresa título en EntradaTexto
   ↓
4. (Opcional) handleTakePhoto():
   - requestCameraPermissionsAsync()
   - launchCameraAsync()
   - image.UPLOAD() → POST /images (multipart/form-data)
   - setPhotoUri(response.data.url)
   ↓
5. Usuario hace tap en "Agregar"
   ↓
6. addTask() en useTodoHook:
   - requestForegroundPermissionsAsync()
   - getCurrentPositionAsync() → Obtiene GPS coords
   - Construye objeto TaskResponse { title, completed, photoUri, location }
   - todos.create(newTask) → POST /todos
   ↓
7. refreshTask() → GET /todos (actualiza lista)
   ↓
8. setShowAddNewTask(false) → Vuelve a vista de lista
```

### Flujo de Toggle Tarea (Marcar como Completada)

```
1. Usuario hace tap en círculo de TaskItem
   ↓
2. toggleTask(id, completed) en useTodoHook
   ↓
3. todos.partialUpdate({ id, completed: !completed })
   ↓
4. callApi.PATCH() → PATCH /todos/:id
   ↓
5. Backend actualiza tarea en BD
   ↓
6. refreshTask() → GET /todos (refresca lista)
   ↓
7. setTasks(newTasks) → Re-render con nuevo estado
```

### Flujo de Eliminación de Tarea

```
1. Usuario hace tap en TrashIcon de TaskItem
   ↓
2. removeTask(id) en useTodoHook
   ↓
3. todos.delete(id) → DELETE /todos/:id
   ↓
4. Backend elimina tarea de BD
   ↓
5. refreshTask() → GET /todos (refresca lista sin la tarea eliminada)
```

### Flujo de Logout

```
1. Usuario hace tap en "Cerrar sesión" en perfil.tsx
   ↓
2. logoutHandler():
   - AsyncStorage.removeItem("user")
   - AsyncStorage.removeItem("token")
   ↓
3. router.replace("/") → Navega a Login Screen
```

## Pantallas de la Aplicación

### 1. Login Screen (`app/index.tsx`)
**Ruta**: `/`
- Input de email (EntradaTexto con keyboardType="email-address")
- Input de contraseña (secureTextEntry=true)
- Botón "ENTRAR"
- Texto de ayuda: "Contraseña: 1234"
- Validación mediante backend API
- Navegación a /appLogin/home tras login exitoso

### 2. Home Screen (`app/appLogin/home.tsx`)
**Ruta**: `/appLogin/home`
- Imagen decorativa (vaquitaVistoBueno.jpg, circular, 150x150)
- Título: "Bienvenido a la App"
- Párrafo descriptivo
- Padding con SafeAreaInsets
- Tab navigation icon: HomeIcon

### 3. Perfil Screen (`app/appLogin/perfil.tsx`)
**Ruta**: `/appLogin/perfil`
- Muestra email del usuario autenticado (desde AsyncStorage)
- Botón "Cerrar sesión"
- Layout centrado verticalmente
- useEffect para cargar datos de usuario al montar
- Tab navigation icon: LoginIcon

### 4. TodoList Screen (`app/appLogin/todolist.tsx`)
**Ruta**: `/appLogin/todolist`

**Vista de Lista** (showAddNewTask=false):
- Título: "Todo LIST"
- Subtítulo: "Tareas"
- Mapeo de tasks con TaskItem components
- Botón flotante AddIcon (verde, 48px)
- Cada TaskItem muestra:
  - Circle toggle (verde si completada)
  - Título de tarea
  - Coordenadas GPS formateadas
  - Imagen adjunta (con loading)
  - Botón eliminar (TrashIcon)

**Vista de Agregar Tarea** (showAddNewTask=true):
- Título: "Agregar tarea"
- EntradaTexto para título
- Preview de foto o placeholder vacío
- Botón "Tomar Foto" / "Retomar Foto"
- Botón "Agregar" (crea tarea)
- Botón flotante AddIcon (vuelve a vista lista)
- Tab navigation icon: ToDoListIcon

## Resumen de Cambios Implementados en el Proyecto

### Arquitectura y Estructura
✅ **Arquitectura en capas**: Separación clara entre UI, lógica de negocio (hooks), servicios (infraestructure) y utilidades
✅ **Custom Hook (useTodoHook)**: Encapsulación de toda la lógica de TODO List en un hook reutilizable
✅ **Service Layer**: Capa de infraestructura con servicios especializados (auth, todos, image)
✅ **TypeScript**: Tipado estático completo con interfaces personalizadas

### Autenticación y Backend
✅ **Login real con API REST**: Integración completa con https://todo-list.dobleb.cl
✅ **JWT Bearer Tokens**: Autenticación mediante tokens almacenados en AsyncStorage
✅ **Registro de usuarios**: Endpoint /auth/register implementado
✅ **Headers Authorization**: Inyección automática de Bearer token en todas las peticiones

### Gestión de Tareas
✅ **CRUD completo**: GET, POST, PATCH, DELETE de tareas sincronizadas con servidor
✅ **Persistencia en backend**: Única fuente de verdad en base de datos remota
✅ **Filtrado por usuario**: Backend retorna solo tareas del usuario autenticado
✅ **Toggle de completado**: Actualización optimista del estado de tareas

### Funcionalidades Multimedia
✅ **Captura de fotos**: Integración con cámara nativa usando expo-image-picker
✅ **Upload de imágenes**: Subida de fotos al servidor mediante multipart/form-data
✅ **Preview de imágenes**: Visualización de fotos adjuntas a tareas con loading indicators
✅ **Optimización de calidad**: Compresión de imágenes (quality: 0.3)

### Geolocalización
✅ **GPS automático**: Captura de coordenadas al crear tareas
✅ **Permisos nativos**: Solicitud de permisos de ubicación en primer plano
✅ **Visualización de coords**: Muestra latitude y longitude en cada TaskItem
✅ **Precisión optimizada**: Accuracy.Lowest para ahorrar batería

### Navegación y UI/UX
✅ **Expo Router**: Sistema de navegación file-based routing
✅ **Tabs Navigator**: 3 pestañas (Home, Perfil, TodoList) con íconos personalizados
✅ **Dark Theme**: Tema oscuro global con React Navigation
✅ **Safe Area Context**: Manejo correcto de áreas seguras (notch, status bar)
✅ **Loading states**: ActivityIndicators y estados de carga visuales
✅ **Botón flotante**: AddIcon para agregar tareas con mejor UX

### Componentes Reutilizables
✅ **EntradaTexto**: Input personalizado con múltiples tipos de teclado
✅ **TaskItem**: Card completa de tarea con todas las funcionalidades
✅ **Icons personalizados**: 5 íconos SVG (Home, Login, TodoList, Add, Trash)
✅ **Titulo y Parrafo**: Componentes de texto estilizados

### Optimizaciones
✅ **useCallback**: Memoización de funciones en hooks
✅ **Image caching**: Caché de imágenes para mejor rendimiento
✅ **Manejo de errores**: Alerts nativos con mensajes descriptivos
✅ **nanoid**: Keys únicas para listas React
✅ **Compresión**: Reducción de tamaño de fotos

### Configuración y Deploy
✅ **Variables de entorno**: .env con EXPO_PUBLIC_API_URL
✅ **app.json**: Configuración completa de permisos para iOS y Android
✅ **Bundle IDs**: Identificadores únicos para plataformas
✅ **Splash screen**: Pantalla de carga personalizada
✅ **Adaptive icons**: Íconos adaptativos para Android

## Autores

Este proyecto fue desarrollado por:

### Sebastián Rodriguez

### Benjamín Sanchez

### Hector Sanchez

---

## Funcionalidades Implementadas

- [x] Autenticación real con backend API REST (JWT)
- [x] Sincronización de tareas con servidor remoto
- [x] Registro de nuevos usuarios
- [x] Upload de imágenes al servidor (multipart/form-data)
- [x] Geolocalización GPS automática en tareas
- [x] Modo oscuro con React Navigation themes
- [x] CRUD completo de tareas (Create, Read, Update, Delete)
- [x] Captura de fotos desde la cámara nativa
- [x] Persistencia en base de datos del servidor
- [x] Custom Hook para lógica de TODO List (useTodoHook)
- [x] Service Layer con arquitectura en capas
- [x] TypeScript con interfaces tipadas
- [x] Manejo de permisos nativos (cámara y ubicación)
- [x] Loading states y feedback visual
- [x] Safe Area Context para dispositivos modernos
- [x] Componentes reutilizables (EntradaTexto, TaskItem, Icons)
- [x] AsyncStorage para tokens JWT
- [x] Tabs Navigator con 3 pantallas
- [x] Expo Router (file-based routing)
- [x] Manejo de errores con Alerts
- [x] Optimizaciones de rendimiento (useCallback, cache)

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

## Configuración de Permisos (app.json)

La aplicación requiere permisos especiales que están configurados en `app.json`:

### iOS (Info.plist)
```json
{
  "NSCameraUsageDescription": "Necesito acceder a la camara para tomar fotos.",
  "NSPhotoLibraryUsageDescription": "Necesito acceder a la biblioteca de fotos.",
  "NSLocationWhenInUseUsageDescription": "Necesito acceder a tu ubicacion"
}
```

### Android
Los permisos se manejan automáticamente mediante Expo, pero requieren:
- `CAMERA`: Para captura de fotos
- `ACCESS_FINE_LOCATION`: Para obtener coordenadas GPS
- `ACCESS_COARSE_LOCATION`: Ubicación aproximada
- `READ_EXTERNAL_STORAGE`: Lectura de galería (implícito en image picker)
- `WRITE_EXTERNAL_STORAGE`: Escritura temporal de archivos

### Plugins de Expo
```json
{
  "plugins": [
    "expo-router",
    ["expo-splash-screen", { ... }]
  ]
}
```

### Características Habilitadas
- `newArchEnabled: true`: Habilita la nueva arquitectura de React Native
- `edgeToEdgeEnabled: true`: Modo edge-to-edge en Android
- `predictiveBackGestureEnabled: false`: Desactiva gesto predictivo de back
- `typedRoutes: true`: Rutas tipadas en Expo Router
- `reactCompiler: true`: Compilador experimental de React

## Licencia

Este proyecto es un ejercicio académico desarrollado para fines educativos.

---
