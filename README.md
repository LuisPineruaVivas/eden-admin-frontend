✨ eden-admin-frontend ✨
¡Bienvenido al proyecto eden-admin-frontend! Este es un panel de administración robusto y moderno, construido con las últimas tecnologías frontend para ofrecer una experiencia de usuario excepcional y un desarrollo eficiente.

🚀 Tecnologías Clave
Este proyecto está construido con:

React: Una biblioteca de JavaScript para construir interfaces de usuario interactivas.

TypeScript: Un superconjunto de JavaScript que añade tipado estático para un código más robusto y mantenible.

Vite: Un bundler de próxima generación que ofrece una experiencia de desarrollo extremadamente rápida.

ShadcnUI: Un conjunto de componentes de interfaz de usuario hermosos y accesibles, construidos con Tailwind CSS y Radix UI.

📦 Estructura de Variables de Entorno
Para una gestión flexible de las configuraciones, todas las variables de entorno que comienzan con VITE_ se cargan desde la carpeta env/. Necesitarás crear los siguientes archivos dentro de esta carpeta:

eden-admin-frontend/
├─
├─ .env.development    # Variables para desarrollo local
├─ .env.debug          # Variables para modo debug / staging
├─ .env.production     # Variables para producción
├─ src/
└─ vite.config.ts

Cada archivo .env.<mode> debe incluir al menos las variables necesarias para su entorno específico.

⚠️ ¡IMPORTANTE: Seguridad de Credenciales! ⚠️
NUNCA incluyas tokens, claves API o credenciales sensibles directamente en tu repositorio Git. Para secretos de producción, utiliza tu pipeline de CI/CD o un gestor de secretos dedicado (como HashiCorp Vault, Azure Key Vault, AWS Secrets Manager, etc.) y pásalos como variables de entorno en tiempo de ejecución.

⚙️ Scripts Disponibles
En el archivo package.json, encontrarás los siguientes comandos útiles para el desarrollo y la construcción del proyecto:

npm run dev: Levanta el servidor de desarrollo local (utiliza env/.env.development).

npm run dev:debug: Inicia el servidor en modo debug/staging (utiliza env/.env.debug).

npm run build: Compila el proyecto para producción (utiliza env/.env.production).

npm run build:staging: Compila el proyecto en modo staging/debug.

npm run preview: Sirve la carpeta dist para una vista previa de la compilación.

npm run lint: Ejecuta el linter para verificar el estilo y la calidad del código.

npm run test: Ejecuta los tests del proyecto.

🏁 Cómo Arrancar el Proyecto
Sigue estos sencillos pasos para poner el proyecto en marcha en tu máquina local:

1. Instala Dependencias
Abre tu terminal en la raíz del proyecto y ejecuta:

1. Instala Dependencias
   Abre tu terminal en la raíz del proyecto y ejecuta:
   ```bash
   yarn install
   ```

2. Configura tus Archivos .env
Copia el archivo env/.env.development.example (o similar, si existe) a env/.env.development y ajusta las URLs, tenant o token según tus necesidades.

Si necesitas sobrescribir algún secreto específicamente para tu máquina local sin afectar el repositorio, puedes crear un archivo .env.local en la raíz del proyecto. Las variables definidas aquí tendrán prioridad.

3. Arranca en Desarrollo
Una vez que las dependencias estén instaladas y tus variables de entorno configuradas, inicia el servidor de desarrollo:

3. Arranca en Desarrollo
   Una vez que las dependencias estén instaladas y tus variables de entorno configuradas, inicia el servidor de desarrollo:
   ```bash
   yarn dev
   ```

4. Abre tu Navegador
Una vez que el servidor esté en ejecución, abre tu navegador web y visita la siguiente URL para ver la aplicación:

http://localhost:5173

(O el puerto que Vite te indique en la terminal).
4. Abre tu Navegador
   Una vez que el servidor esté en ejecución, abre tu navegador web y visita la siguiente URL para ver la aplicación:
   ```
   http://localhost:5173
   ```
   (O el puerto que Vite te indique en la terminal).

📖 Cómo Funciona la Carga de Entornos
El archivo vite.config.ts está configurado para manejar la carga de variables de entorno de manera inteligente:

Según el mode pasado (por ejemplo, development, debug, production), Vite cargará automáticamente el archivo correspondiente .env.<mode> de la carpeta env/. Todas las variables definidas en estos archivos se expondrán en tu código como import.meta.env.VITE_NOMBRE_DE_TU_VARIABLE.

¡Esperamos que disfrutes desarrollando con eden-admin-frontend! Si tienes alguna pregunta o encuentras algún problema, no dudes en consultar la documentación o contactar al equipo.