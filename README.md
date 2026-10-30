# AI Listing Builder
Autor: Miguel Tubin. Entrega final de Automatización IA, Coderhouse.

Genera borradores desde Airtable, registra publicaciones relacionadas y errores, espera una decisión humana y marca el producto como listo para publicar o registra su rechazo. No publica productos en marketplaces.

## Accesos para evaluar

- [Informe técnico PDF](docs/Documentacion_AI_Listing_Builder.pdf) y [versión Word](docs/Documentacion_AI_Listing_Builder.docx).
- [Diagrama de arquitectura PDF](docs/Diagrama_Arquitectura.pdf).
- [Generación JSON](workflows/01-generacion.json), [aprobación JSON](workflows/02-aprobacion.json) y [dashboard JSON](workflows/05-dashboard.json).
- [Resultados de 15 casos](tests/resultados.csv) y [doble revisión de requisitos y correcciones](docs/Verificacion_Entrega.md).
- [Capturas de evidencia](evidencias/) y [video de 3 minutos](video/AI_Listing_Builder_Demo_3min.mp4).
- [Airtable en modo lectura](https://airtable.com/app5mOoXRKRTlhO6D/shr3t8BklHfPWM4Ct) y [dashboard en vivo](https://reus55667.app.n8n.cloud/webhook/ai-listing-builder-kpis).

## Estado de la entrega
Implementación y pruebas verificadas el 30/10/2026. Generación, aprobación y dashboard están publicados y activos. Las exportaciones se entregan inactivas para evitar activaciones accidentales al importarlas. Las notificaciones automáticas al revisor están habilitadas (`modo_prueba=false`) y verificadas mediante la ejecución 78. El producto queda Pendiente de aprobación hasta recibir la decisión humana.

## Tecnologías y salidas
n8n, Airtable, OpenAI a través del gateway de n8n y Gmail. Canal de correo probado con dos comunicaciones autorizadas y canal web de KPIs publicado y probado en producción. La respuesta en el hilo original mapea Message ID y Thread ID guardados en Publicaciones IA.

## Estructura
- `docs/Documentacion_AI_Listing_Builder.pdf`: arquitectura, operación, pruebas, costos y privacidad.
- `docs/Diagrama_Arquitectura.pdf`: diagrama independiente.
- `docs/Documentacion_AI_Listing_Builder.docx`: versión editable del informe.
- `docs/Verificacion_Entrega.md`: doble revisión contra requisitos y devoluciones.
- `workflows/`: generación, aprobación, pruebas y dashboard.
- `schemas/`: contratos de entrada, salida normalizada y error.
- `tests/resultados.csv`: resultados observados.
- `evidencias/`: capturas reales; no son recreaciones de interfaces.

## Instalación en otra instancia
Importar cada archivo en un workflow vacío: la importación de n8n es aditiva. Asignar credenciales propias de Airtable, Gmail y OpenAI/gateway. Configurar base y tablas, el correo del revisor en Configurar contexto y los IDs de los subworkflows en los bancos de pruebas. El correo `revision@example.invalid` es un valor de configuración deliberadamente no entregable. Los IDs de la instancia y las referencias a credenciales se eliminaron de las exportaciones públicas. Antes de activar las importaciones, configurar el revisor y comprobar las credenciales. Para ejecutar los bancos 03 y 04 sin enviar correos, poner `modo_prueba=true` en Configurar contexto (generación) y Contexto de decisión (aprobación); el caso de error de modelo también requiere ese modo. Al terminar, restaurar `false` para habilitar las notificaciones autorizadas. Los datos comerciales fijos sólo pertenecen a bancos QA manuales, no al trigger de producción.

Productos requiere Nombre del producto, SKU, Precio, Características, Público objetivo, Estado del producto, Publicaciones IA, Fecha de creación, Última modificación, Título generado, Descripcion comercial, Beneficios, Palabras clave y Resultado de revisión. Publicaciones IA requiere Título generado, Producto (relación), Descripción comercial, Beneficios, Palabras clave, Fecha de generación, Resultado del envío y Registro de errores.

## Control y resiliencia
Airtable Trigger filtra Pendiente. IF compara strings con validación estricta. Se verifican campos obligatorios y precio numérico. OpenAI y Gmail usan `continueErrorOutput`. Las rutas de error registran etapa, detalle e ID de ejecución en Airtable y marcan el producto con Error. Si Airtable no está disponible, la ejecución debe detenerse y conservarse en el historial n8n; no se asegura persistencia en una base inaccesible. El reintento exige corregir el problema y devolver el producto a Pendiente. No hay reintentos infinitos.

La aprobación se procesa sólo si Resultado de revisión está vacío. Una aprobación marca Listo para publicar; un rechazo se registra sin publicar. El contenido exige revisión semántica humana: los filtros estructurales no detectan todas las afirmaciones no respaldadas.

## Verificación
Dos rondas de cinco ejecuciones de generación: 49–53 y 55–59. Pruebas de decisión 61–64. Dos casos completos por ronda, un dato faltante, un estado excluido y un error real de modelo inexistente. Las primeras decisiones de QA fueron simuladas para validar las ramas; no equivalen a una aprobación comercial de productos reales. Se enviaron dos correos autorizados al revisor: solicitud en ejecución 68 (8.544 s) y respuesta en ejecución 70 (2.339 s). Se verificó que ambos comparten Thread ID. En esa etapa se restableció modo_prueba=true; al cierre se habilitaron las notificaciones automáticas autorizadas y se verificaron de extremo a extremo en la ejecución 78. La decisión del producto QA fue simulada para probar la continuación; no representa una aprobación comercial humana.

## Repositorio existente
https://github.com/Miguetubin/ai-automation-entrerga

## Enlaces de evaluación
- Base de datos en modo lectura: https://airtable.com/app5mOoXRKRTlhO6D/shr3t8BklHfPWM4Ct
- Dashboard web: https://reus55667.app.n8n.cloud/webhook/ai-listing-builder-kpis
- Video: `video/AI_Listing_Builder_Demo_3min.mp4` (180 segundos; recorrido con capturas reales, subtitulado, sin audio; no es una grabación continua).

## Validación automática y correo
La ejecución 71 nació del Airtable Trigger después de crear un producto QA y ponerlo en Pendiente. En 6.149 s generó el borrador. La ejecución 73 detectó un rechazo QA y registró su resultado en 3.182 s. La ejecución 72 provocó un error real de Gmail con un hilo inexistente y guardó el fallo relacionado; no envió correo. El caso 72 es un banco aislado que reutiliza los nodos de Gmail y auditoría de la versión final.

## Cierre operativo
Las notificaciones automáticas están habilitadas y probadas. En la ejecución 78, Airtable disparó el procesamiento sin pulsar Execute: IA generó el contenido, se guardó el borrador relacionado y Gmail aceptó la revisión en 8.615 s. Message ID y Thread ID quedaron registrados. Se verificó aceptación por Gmail, sin afirmar una comprobación independiente de recepción en el buzón.

El revisor rechazó un borrador QA con una promesa de seguridad no respaldada. La decisión se aplicó en Airtable y n8n auditó el rechazo automáticamente en la ejecución 76. Ver [validación humana](docs/Revision_Humana.md). Las decisiones anteriores de QA siguen identificadas como simuladas. El último borrador permanece Pendiente de aprobación; no se publica ni se marca listo automáticamente.

El corte final del dashboard (30/10/2026, 13:58 ART) muestra 16 productos, 13 QA, 7 borradores, 5 registros de error y 2 listos. No representa métricas de actividad comercial ni facturación real.

Los tres archivos originales de la raíz se actualizan a esta versión; el JSON de raíz corresponde a generación. Para el ecosistema completo se incluyen también aprobación y dashboard en `workflows/`. El historial de Git conserva las versiones anteriores.
