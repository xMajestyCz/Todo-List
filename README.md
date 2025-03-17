# Todo-List
Esta es una aplicación móvil desarrollada con Ionic Framework que permite gestionar tareas (“ToDo List”) usando Firebase Firestore como base de datos en tiempo real. La app permite crear, editar, listar y eliminar tareas, cada una con fecha y descripción.

## 🚀 Características
✅ Gestión de Tareas: Crear, editar, eliminar y listar tareas.
🔥 Integración con Firestore: Lectura/escritura de documentos sin necesidad de autenticación.
⚙️ Firestore actualiza automáticamente la lista de tareas cuando se realizan cambios.
📱 Responsive & Fluido: Interfaz ágil con Ionic Components (ion-card, ion-datetime, etc.).

## 💡 Tecnologías Usadas
- **Ionic Framework (Angular).**
- **Firebase Firestore.**
- **TypeScript.**

## 🚀 Instalación
1. Clonar repositorio:
```bash
git clone https://github.com/xMajestyCz/Todo-List.git
cd Todo-List
```
2. Instalar dependencias:
```bash
npm install
```
3.Configurar Firebase:
- Crear un proyecto en [Firebase Console](https://console.firebase.google.com/u/0/) y habilita firestore.
- Obtener el objeto de configuración de Firebase (apiKey, projectId, etc.).
- Reemplazarlo en src/environments/environment.ts:
```bash
export const environment = {
  firebase: {
    apiKey: 'TU_API_KEY',
    authDomain: 'TU_AUTH_DOMAIN',
    projectId: 'TU_PROJECT_ID',
    storageBucket: 'TU_STORAGE_BUCKET',
    messagingSenderId: 'TU_SENDER_ID',
    appId: 'TU_APP_ID'
  }
};
```
4. Ejecutar app:
```bash
ionic serve
```

## ✨ Uso
1. Abre la app, visualiza la lista de tareas.
2. Crea nuevas tareas con título y fecha.
3. Edita o elimina tareas existentes.
4. Las fechas se seleccionan con ion-datetime, mostrando formato amigable.
5. Los datos se guardan en Firestore y se sincronizan en tiempo real.

## Enlace de demostración 🔗
https://todo-list-tau-eight-90.vercel.app/home
