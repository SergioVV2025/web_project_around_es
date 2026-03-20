Around the U.S.

Aplicación web interactiva que permite gestionar un perfil de usuario y una colección de tarjetas mediante integración con una API REST.

Incluye operaciones CRUD completas y actualización dinámica de la interfaz.

🚀 Demo

👉 Live App: https://sergiovv2025.github.io/web_project_around_es/
👉 Repositorio: https://github.com/SergioVV2025/web_project_around_es

🎯 Funcionalidad principal

- Edición de perfil (nombre, descripción, avatar)
- Creación de nuevas tarjetas
- Eliminación de tarjetas
- Sistema de “likes”
- Renderizado dinámico desde API

📸 Preview

(tus screenshots)

✨ Features

- Integración con API REST
- Operaciones CRUD completas (GET, POST, PATCH, PUT, DELETE)
- Sincronización entre UI y backend
- Renderizado dinámico de contenido
- Manejo de estado en frontend

🛠️ Tech Stack

- JavaScript (ES6+)
- HTML5
- CSS3
- API REST
- Fetch API
- OOP (clases)

🧠 Arquitectura

- Api.js → manejo de requests HTTP
- Card.js → renderizado de tarjetas
- FormValidator.js → validación
- Popup.js → ventana con formulario
- Section.js → renderiza tarjetas

Separación de responsabilidades para mantener escalabilidad.

🧠 Decisiones técnicas

- Centralización de llamadas a API en una clase dedicada
- Uso de promesas para manejo asíncrono
- Renderizado dinámico tras cada operación CRUD
- Manejo de estado basado en respuesta del servidor

📚 Lecciones aprendidas

- Consumo de APIs reales
- Manejo de asincronía en JavaScript
- Sincronización entre frontend y backend
- Diseño modular en aplicaciones web


