# Proyecto Ferramas (Aplicación Universitaria)

Este proyecto es una aplicación web simple desarrollada para la asignatura Integracion de plataformas. Permite a los usuarios registrarse e iniciar sesión. La información del usuario logueado se gestiona globalmente para simular una sesión de usuario.

## Tecnologías Utilizadas

El proyecto está construido con las siguientes tecnologías principales:

- **Next.js:** Framework de React para desarrollo de aplicaciones web modernas, con renderizado del lado del servidor (SSR) y generación de sitios estáticos (SSG).
- **TypeScript:** Superset de JavaScript que añade tipado estático opcional, mejorando la robustez y mantenibilidad del código.
- **Tailwind CSS:** Framework de CSS "utility-first" para crear diseños personalizados rápidamente.
- **Zustand:** Solución de gestión de estado global ligera y sencilla para React.
- **SQLite3:** Motor de base de datos SQL ligero y basado en archivos, utilizado para almacenar la información de los usuarios.


## Funcionalidades Implementadas

1.  **Registro de Usuarios:**
    *   Los usuarios pueden crear una cuenta proporcionando su nombre completo, RUT, correo electrónico y contraseña.
    *   La información se almacena en una base de datos SQLite.
    *   Se realizan validaciones básicas en el frontend y backend (campos requeridos, longitud de contraseña).
    *   Ruta de API: `POST /api/register`

2.  **Inicio de Sesión de Usuarios:**
    *   Los usuarios pueden iniciar sesión con su correo electrónico y contraseña.
    *   Se verifica la existencia del usuario y la coincidencia de la contraseña (actualmente la comparación de contraseña en el backend es directa, sin hashing).
    *   Ruta de API: `POST /api/login` (la implementación de esta ruta no se ha mostrado en detalle pero se asume su existencia para el flujo de login).

3.  **Gestión de Estado Global del Usuario:**
    *   Se utiliza Zustand para almacenar la información del usuario que ha iniciado sesión.
    *   Esto permite que diferentes componentes de la aplicación accedan al estado del usuario (por ejemplo, para mostrar el nombre del usuario en lugar del botón de inicio de sesión).

4.  **Interfaz de Usuario:**
    *   Páginas dedicadas para el inicio de sesión (`/login`) y el registro (`/registro`).
    *   Componente condicional para mostrar el nombre del usuario o un botón de "Iniciar Sesión" (se asume que se integra en un layout o header).

## Estructura del Proyecto (Simplificada)

```
ferramas/
├── public/                 # Archivos estáticos
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── login/      # Lógica de backend para login
│   │   │   │   └── route.ts
│   │   │   └── register/   # Lógica de backend para registro
│   │   │       └── route.ts
│   │   ├── login/        # Página de inicio de sesión
│   │   │   └── page.tsx
│   │   ├── registro/     # Página de registro
│   │   │   └── page.tsx
│   │   ├── layout.tsx    # Layout principal de la aplicación
│   │   └── page.tsx      # Página principal (Home)
│   ├── components/         # Componentes reutilizables de React
│   │   └── UserDisplay.tsx # Componente para mostrar info de usuario o login
│   ├── lib/
│   │   └── db.ts         # Utilidad para la conexión y queries a SQLite
│   └── store/
│       └── userStore.ts  # Store de Zustand para el estado del usuario
├── db                      # Archivo de base de datos SQLite (se crea automáticamente)
├── package.json
├── next.config.js
└── tsconfig.json
```

## Instalación y Ejecución

Sigue estos pasos para instalar y ejecutar el proyecto en tu entorno local:

### Prerrequisitos

-   Node.js (v16 o superior recomendado)
-   npm (generalmente viene con Node.js)

### 1. Clonar el Repositorio (si aplica)

Si el proyecto está en un repositorio Git:

```bash
git clone <URL_DEL_REPOSITORIO>
cd ferramas
```

Si tienes los archivos localmente, simplemente navega a la carpeta raíz del proyecto.

### 2. Instalar Dependencias

Abre una terminal en la carpeta raíz del proyecto y ejecuta:

```bash
npm install
```

Esto instalará todas las dependencias necesarias definidas en el archivo `package.json`, incluyendo Next.js, React, Zustand, SQLite3, etc.

### 3. Configuración de la Base de Datos

La base de datos SQLite (`db`) se creará automáticamente en la raíz del proyecto la primera vez que la aplicación intente conectarse a ella (gracias a la configuración en `src/lib/db.ts`).

Sin embargo, necesitas crear la tabla `Usuarios`. Puedes usar una herramienta de gestión de SQLite como "DB Browser for SQLite" o ejecutar un script. La estructura básica de la tabla es:

```sql
CREATE TABLE Usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    rut TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);
```

*(Nota: Asegúrate de que los nombres de columna `name`, `rut`, `email`, `password` coincidan con los usados en las queries dentro de `src/app/api/register/route.ts` y la lógica de login.)*

### 4. Ejecutar la Aplicación en Modo Desarrollo

Una vez instaladas las dependencias, puedes iniciar el servidor de desarrollo de Next.js:

```bash
npm run dev
```

Esto iniciará la aplicación generalmente en `http://localhost:3000`.
Podrás ver los cambios que hagas en el código reflejados en tiempo real en el navegador.

### 5. Acceder a la Aplicación

Abre tu navegador y ve a:

-   `http://localhost:3000/registro` para crear una nueva cuenta.
-   `http://localhost:3000/login` para iniciar sesión.

## Desarrollo

### Lógica del Backend

-   Las rutas de la API de Next.js se encuentran en `src/app/api/`.
-   La interacción con la base de datos SQLite se maneja a través de las funciones en `src/lib/db.ts`.

### Lógica del Frontend

-   Las páginas se encuentran en `src/app/` (por ejemplo, `src/app/login/page.tsx`).
-   Los componentes reutilizables están en `src/components/`.
-   El estado global del usuario se gestiona con el store de Zustand en `src/store/userStore.ts`.

### Consideraciones de Seguridad (Importante para Proyectos Reales)

-   **Hashing de Contraseñas:** En la implementación actual de `src/app/api/register/route.ts`, la contraseña se almacena tal como la ingresa el usuario. En un proyecto real, es **CRUCIAL** hashear las contraseñas antes de guardarlas en la base de datos (por ejemplo, usando `bcryptjs`). Aunque se omitió por simplicidad para este proyecto universitario, no es una práctica segura para producción.
-   **Validación de Entradas:** Se deben implementar validaciones más robustas tanto en el frontend como en el backend para prevenir ataques (ej. XSS, inyección SQL si no se usan parámetros correctamente).
-   **Gestión de Sesiones Segura:** Para aplicaciones en producción, se deben usar mecanismos de sesión más seguros que el simple almacenamiento en el estado de Zustand (ej. tokens JWT almacenados en cookies HttpOnly).

---

Este `README.md` proporciona una visión general del proyecto, cómo fue estructurado y cómo ponerlo en marcha. Recuerda adaptar las rutas de los archivos y los comandos si tu estructura de proyecto difiere ligeramente.
