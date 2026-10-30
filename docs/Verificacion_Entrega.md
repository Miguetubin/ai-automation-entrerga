# Doble revisión de la entrega

Autor: Miguel Tubin. Fecha: 30 de octubre de 2026, Argentina.

## Primera revisión contra la consigna

| Requisito | Implementación y evidencia verificable |
| --- | --- |
| Proceso de negocio de extremo a extremo | Producto Pendiente → generación comercial → revisión humana → Listo para publicar o rechazo auditado. No se publica en marketplaces. |
| Cuatro tecnologías | n8n, Airtable, OpenAI mediante gateway de n8n y Gmail. |
| Trigger autónomo y selectivo | Airtable Trigger cada minuto sobre Última modificación; fórmula filtra Pendiente. Ejecuciones automáticas 71 y 78. El segundo trigger sólo toma decisiones sin procesar. |
| Datos dinámicos y tipos correctos | Validación de strings no vacíos, Precio numérico finito no negativo e ID. IF con typeValidation strict. Los productos fijos se limitan a bancos QA manuales. |
| Memoria relacionada y estados | Productos ↔ Publicaciones IA. Borradores, auditorías y fallos vinculados. Estados de operación: Pendiente, Pendiente de aprobación, Aprobado, Rechazado y Error. Procesado por IA y Enviado permanecen disponibles, pero no se usan como transiciones separadas. |
| IA y costo controlado | Prompt dinámico minimizado; GPT 4o mini; máximo 500 tokens. Parser normaliza cuatro campos y verifica salida completa y título de hasta 70 caracteres. |
| Resiliencia y registro | OpenAI y Gmail: continueErrorOutput, ruta de auditoría y finalización controlada. Datos incompletos 57, API IA 59 y Gmail 72. Si falla Airtable, n8n conserva el historial y detiene la rama. |
| HITL bloqueante | Pendiente de aprobación no ejecuta la acción crítica. Segundo workflow requiere Aprobado o Rechazado y Resultado de revisión vacío. La aprobación marca Listo para publicar; rechazo queda auditado. Rechazo humano real 76. |
| Comunicación y organización | Gmail solicita revisión; respuesta de aprobación usa Message ID y Thread ID originales. Ejecuciones 68 y 70 comparten hilo; 78 verifica envío automático. |
| Más de un canal de salida | Gmail para el revisor y dashboard web con KPIs agregados. No se implementaron Slack ni WhatsApp. |
| Evitar bucles | Fórmulas por estado, IF y marcador Resultado de revisión. Repeticiones 63 y 64 omitidas. No hay reintento infinito. |
| Cinco pruebas y camino infeliz | Dos rondas de cinco ejecuciones, más decisiones, correo, triggers y errores; 15 casos documentados en tests/resultados.csv. |
| Entregables | PDF técnico, diagrama PDF independiente, Word actualizado, seis JSON, esquemas, capturas, README, enlaces y video de 180 s. |
| Video | Recorrido de 3 minutos con capturas reales, títulos y subtítulos; sin audio ni credenciales. Muestra trigger, ejecución y resultados. No se presenta como una grabación continua. |

## Segunda revisión contra cada devolución docente

| Observación | Corrección y comprobación |
| --- | --- |
| Completar textos de plantilla y links | README e informe reescritos con datos observados, enlaces concretos y resultados reales. No quedan campos por completar. |
| Sustituir manual y datos fijos | Los workflows activos se disparan con Airtable Trigger; los manuales sólo sirven a QA. 78 es DB → IA → Gmail sin Execute. |
| IF false huérfano | Generación conecta false a Ignorar productos fuera de Pendiente; aprobación conecta estados excluidos a Ignorar otros estados. |
| HITL con acción posterior | Segundo workflow marca listo o registra rechazo. La espera se implementa con estado persistente en Airtable, no con nodo Wait. Corresponde al ejemplo de la devolución del profesor. |
| OpenAI y Gmail con error output | Configuración y conexiones verificadas en JSON final; pruebas reales 59 y 72 guardaron fallos. Se corta la rama comercial tras auditar, equivalente funcional a Break en esta arquitectura n8n. |
| Nombres de nodos claros | Se reemplazaron If, If1, Message a model, Code in JavaScript, Update record y Send a message por nombres descriptivos. Se comprobaron todas las referencias y conexiones del JSON exportado. |
| Matriz de costos y Batch | Informe compara GPT 4o mini y GPT 4.1 mini; calcula 1000 productos y Batch al 50%. Son estimaciones de OpenAI directo; no una factura del gateway. Batch no está implementado en el recorrido online. |
| Dashboard | Webhook de producción respondió con 16 productos, 13 QA, 7 borradores, 5 registros de error y 2 listos al corte de 13:58 ART. |
| Base en sólo lectura | Vista compartida filtrada a SKU QA-, sin relación interna ni fechas, sin copia de datos. Renderizado público observado. No se realizó comprobación independiente en navegador sin sesión. |
| Minimización y esquemas JSON | Sólo nombre, precio, características y público van al modelo. Esquemas de producto, salida normalizada y error incluidos; son contratos documentales, no validación JSON Schema ejecutada por un nodo dedicado. |
| Sanear exportaciones | Sin credenciales, instanceId, datos fijados ni correo real. Se preserva lógica y se entrega active=false. Configurar revisor e integraciones antes de activar. |
| Capturas y demo | Evidencias reales de historial, contenido, correo, triggers, errores, decisión humana y dashboard; video de 180 segundos. |
| GitHub y versiones | Se actualizan los tres archivos originales de raíz y se agrega la estructura final; las versiones anteriores se conservan en Git. |

## Alcance operativo y límites

La acción crítica implementada es marcar un producto como listo. Una aprobación comercial humana real no se inventa: las aprobaciones QA fueron simuladas; la ejecución 76 sí corresponde a un rechazo humano real. El borrador de la ejecución 78 permanece Pendiente de aprobación.

El contenido puede incluir afirmaciones no respaldadas aun con reglas explícitas en el prompt. El HITL requiere revisión semántica, especialmente de seguridad y compatibilidad. Gmail verificó aceptación y persistencia del hilo; no se afirma una comprobación independiente de entrega en el buzón.

El diseño evita reprocesamiento habitual por estado y marcador; no implementa bloqueo transaccional ante múltiples ejecuciones concurrentes. El volumen de este proyecto es de pruebas y el polling es cada minuto. La recuperación de una base inaccesible requiere revisar el historial n8n y reintentar después de restablecer el servicio.
