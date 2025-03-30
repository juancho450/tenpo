# Tenpo App

Aplicación React que implementa un sistema de login fake y visualización de datos con lista virtualizada.

## Características

- Login fake con persistencia de token en localStorage
- Rutas públicas y privadas
- Visualización de 2000 elementos con lista virtualizada para rendimiento óptimo
- Funcionalidad de logout
- Axios configurado para enviar token en las requests
- Integrado con TailwindCSS para estilos modernos

## Arquitectura

La aplicación está estructurada con:

- **Context API**: Para gestionar la autenticación y estado global
- **Componentes reutilizables**: Como la lista virtualizada
- **Servicios**: Encapsulación de lógica de API
- **Hooks personalizados**: Para funcionalidades específicas

## Persistencia de Token

Se utiliza localStorage para almacenar el token de autenticación, manteniéndolo disponible entre recargas de página mientras proporcionamos un sistema de login/logout funcional.

## Instalación

```bash
# Clonar el repositorio
git clone <repo-url>

# Instalar dependencias
cd tenpo-app
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## Estructura de carpetas

```
/src
  /components     # Componentes reutilizables 
  /context        # Contextos React
  /hooks          # Hooks personalizados
  /pages          # Páginas principales 
  /services       # Servicios y configuración de API
```

## Tecnologías utilizadas

- React 
- TypeScript
- Vite
- React Router
- Axios
- TailwindCSS
- React Query
