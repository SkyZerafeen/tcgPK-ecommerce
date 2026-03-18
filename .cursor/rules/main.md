# Rule: Core Architecture & Cutting-Edge Standards
# Scope: Applies to all files in /app, /components, and /lib

## Technology Stack
- Framework: Next.js 15+ (App Router).
- Styling: Tailwind CSS v4+ (or latest).
- Language: TypeScript (Strict).
- State Management: Zustand.

## AI Solver Protocols
- **Context7 Integration:** Antes de proponer cualquier solución técnica, utiliza el MCP de Context7 para verificar la documentación más reciente de Next.js y Tailwind. No asumas que los métodos de 2024 siguen vigentes.
- **Self-Verification:** Al finalizar una tarea, revisa tu propio código buscando antipatrones. Si detectas una forma más eficiente o "nativa" de hacerlo, corrígela antes de presentarla.
- **Principles:** Aplica estrictamente SOLID y Clean Code. Las funciones deben ser atómicas y los Server Components son la prioridad.

## Instructions
- Siempre prefiere "Server Actions" para mutaciones de datos.
- Utiliza la arquitectura de carpetas modular para escalabilidad.