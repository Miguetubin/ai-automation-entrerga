# Demo de 3 minutos

Recorrido subtitulado sin audio, compuesto con capturas reales verificadas. No es una grabación continua en tiempo real. Las primeras decisiones QA fueron simuladas; el rechazo de la ejecución 76 fue una decisión humana real. No incluye credenciales ni muestra una publicación en marketplace.

000-015 s. **AI Listing Builder | Miguel Tubin**

Recorrido de tres minutos con capturas reales. n8n, Airtable, OpenAI y Gmail. Se distinguen las simulaciones de la validación humana real.

015-030 s. **1. Memoria del sistema**

La base guarda productos, estados y contenido generado. La vista pública limita la evaluación a registros QA y oculta los registros internos de correo.

030-045 s. **2. Trigger automático desde Airtable**

Un producto nuevo pasó a Pendiente desde Airtable. La ejecución de producción 71 empezó automáticamente y terminó en 6,149 segundos, sin pulsar Execute workflow.

045-060 s. **3. IA y borrador para revisión**

OpenAI usa datos dinámicos y un máximo de 500 tokens. Se guardan título, descripción, beneficios y palabras clave. La revisión semántica sigue siendo necesaria.

060-075 s. **4. Gmail solicita revisión**

La ejecución automática 78 completó Airtable, IA y Gmail en 8,615 segundos. La solicitud fue aceptada y su Message ID y Thread ID quedaron guardados.

075-090 s. **5. Continuación en el mismo hilo**

La ejecución 70 respondió con el mismo Thread ID. La aprobación de ese producto QA fue simulada para probar la rama; no fue una aprobación comercial humana.

090-105 s. **6. Validación humana real**

El revisor rechazó un borrador con afirmaciones no respaldadas. La decisión se aplicó en Airtable y n8n creó automáticamente la auditoría de la ejecución 76.

105-120 s. **7. Camino infeliz de IA**

Dos rondas de cinco casos verificaron productos completos, datos faltantes, estado excluido y una API de IA fallida. El error se registra relacionado al producto.

120-135 s. **8. Camino infeliz de Gmail**

La ejecución 72 usó un hilo inexistente: Gmail devolvió un error real. La rama de error lo guardó en Airtable sin enviar un correo.

135-150 s. **9. Segundo canal: KPIs web**

El dashboard de producción consulta Airtable: 16 productos, 7 borradores, 5 registros de error y 2 listos. Incluye 13 productos QA; no son métricas comerciales de producción.

150-165 s. **10. Idempotencia y privacidad**

Las ejecuciones 63 y 64 omitieron decisiones ya procesadas. El JSON público elimina referencias a credenciales, instanceId y destinatarios reales.

165-180 s. **Estado de la entrega**

Trigger, correo automático, continuación por decisión y KPIs activos. Rechazo humano real auditado. La entrega incluye PDF, diagrama, JSON, evidencias, pruebas y enlaces de evaluación.