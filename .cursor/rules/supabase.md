# Rule: Supabase Native Integration
# Scope: Applies to /lib/supabase, /supabase, and database-related files

## Database Management
- **No Prisma:** Está estrictamente prohibido el uso de Prisma. Toda la interacción con la base de datos se realiza mediante `supabase-js` y la **Supabase CLI**.
- **Schema & Types:** Utiliza `supabase gen types typescript --local` para mantener los tipos sincronizados. No definas interfaces de base de datos manualmente si pueden ser generadas.
- **SQL Migrations:** Los cambios en la base de datos deben hacerse mediante archivos de migración en `/supabase/migrations`. 

## Security (RLS)
- Cada tabla debe tener habilitado Row Level Security (RLS). 
- Las políticas deben asegurar que los usuarios solo puedan ver sus propias órdenes, pero que cualquiera pueda ver los productos (cartas TCG).

## AI Solver Tip
- Antes de escribir una consulta compleja, verifica si existe un "Edge Function" de Supabase que sea más eficiente para esa tarea específica.