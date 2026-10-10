# Medinterna

Aplicación web en español para apoyar la evaluación de trastornos hidroelectrolíticos en **adultos de urgencias y hospitalización**. Prototipo clínico: no está validado para adopción asistencial.

Incluye diez algoritmos de hipo/hipernatremia, hipo/hiperpotasemia, hipo/hipercalcemia, hipo/hipermagnesemia e hipo/hiperfosfatemia. Cada algoritmo presenta clasificación, criterios de urgencia, estudio etiológico, manejo, vigilancia, errores a evitar y referencias por decisión. La evaluación admite valores parciales, indica las unidades, reconoce criterios clínicos de prioridad y permite copiar un resumen anónimo. Los protocolos se pueden imprimir con sus referencias.

## Abrir sin servidor

La pantalla de configuración del entorno no ofrece vista previa web ni descarga mediante enlaces a rutas internas. La versión de entrega está en `Medinterna.html`, en la raíz de este repositorio. Para descargarla, usar [el ZIP de la rama del prototipo](https://github.com/miguelrm9898-maker/Medinterna/archive/refs/heads/codex/medinterna-prototipo.zip), descomprimirlo y abrir ese archivo con Chrome o Edge en una computadora.

Para volver a generar una versión independiente a partir del código:

```bash
cd /workspace/Medinterna
npm run export
```

Descargar `dist/Medinterna.html` y abrirlo con Chrome, Edge, Firefox o Safari. Incluye la interfaz, algoritmos, referencias y cálculos en un único archivo: no requiere instalación ni servidor. La consulta a las fuentes externas sí requiere conexión. No abrir el `index.html` original como archivo local: utiliza módulos separados que requieren el servidor.

El navegador puede limitar el botón de copiar en archivos locales; la impresión de protocolos está disponible desde la propia aplicación. La versión independiente conserva los avisos de revisión bibliográfica y clínica pendiente.

Se comprobó el documento exportado en Chromium, sin servidor ni solicitudes externas: evaluación, cálculos, navegación, filtros, referencias, impresión y móvil. La política del navegador administrado de la nube bloquea el esquema `file://`; por eso se probó cargando el contenido exacto del HTML en el navegador, y no se afirma que se haya validado su apertura directa desde disco en esta máquina. Para reproducir esa comprobación: `python3 tests/portable_smoke.py` después de exportar.

## Ejecutar

Node.js ≥22; validado con Node.js 24.19.0. Sin dependencias externas, instalación de paquetes, base de datos, claves o compilación.

```bash
cd /workspace/Medinterna
npm start
```

El servidor utiliza el puerto 3000 y escucha en loopback para validación local. `PORT` y `HOST` permiten ajustar el enlace de red cuando se configure un despliegue. No se ha publicado un sitio ni configurado acceso remoto. Cada tarea de nube ya está aislada: utilizar este checkout; no crear un worktree salvo solicitud expresa.

## Validación

```bash
cd /workspace/Medinterna
npm run check
npm test
# Con el servidor activo y Playwright Python + Chromium disponibles:
python3 tests/browser_smoke.py
```

Las 12 pruebas de Node comprueban límites críticos, unidades, datos ausentes, sodio corregido, tonicidad, déficit de agua, discordancia de calcio, alertas clínicas y enlaces internos de referencias. Las pruebas de navegador comprueban evaluación, rechazo de entradas con unidades incorrectas, invalidación de resultados al editar, criterios graves sin analítica, cálculos, filtros, ventanas de fuentes, impresión y ausencia de desbordamiento en móvil. Estas pruebas verifican software; **no certifican exactitud, vigencia ni validación clínica**.

El entorno actual ya dispone de Playwright Python y Chromium. El script de navegador no es una dependencia de ejecución de la aplicación. Genera capturas/PDF en `/tmp`.

## Bibliografía: estado real

15 fuentes identificadas, con publicaciones de 2023–2024 y documentos anteriores de fundamento. Las fuentes incluyen UK Kidney Association, Endocrine Society, NHS SPS, KDIGO, ASPEN y revisiones sobre sodio y potasio. El inventario está en `protocols.js`.

El acceso a Europe PMC, PubMed, AAFP, UKKA, DOI y KDIGO recibió rechazo del proxy (`403 Forbidden`). No se pudo cotejar texto completo, metadatos/versión ni buscar cambios de 2025–2026. Ese estado aparece en la interfaz, las referencias, los resúmenes y la impresión. Algunas recomendaciones antiguas requieren cotejo y actualización; no se ha establecido su vigencia por el solo hecho de citarlas.

La ampliación de dominios se guardó como borrador de configuración. Guardar el borrador no aplica la política al proceso actual ni publica el entorno. Tras aplicar el acceso en ajustes, continuar con [el registro de revisión](docs/REVISION_CLINICA.md). No hacen falta credenciales para las fuentes públicas.

## Límites clínicos y datos

- No cubre pediatría, embarazo, prescripción automática, crisis hiperglucémicas, lisis tumoral o reanimación como protocolos completos. Identifica situaciones que requieren los protocolos correspondientes.
- Intervalos y umbrales son orientativos. La gravedad integra síntomas, ECG, duración, pH, volemia y función renal; una cifra normal no descarta una emergencia.
- No ajusta calcio por albúmina automáticamente; propone medición de calcio ionizado en contextos pertinentes.
- Las fórmulas indican sus unidades y supuestos. El déficit total de agua no es una indicación de infusión durante 24 horas. El sodio corregido por hiperglucemia no reemplaza el medido.
- Las pautas de referencia de medicación requieren cotejo de fuente, presentación, función renal, concentraciones y protocolo institucional. No se generan órdenes.
- No solicita identificadores personales y no envía ni guarda analítica en el servidor, `localStorage` o `sessionStorage`. El estado permanece en la memoria de la pestaña y se pierde al recargar. Un resumen copiado o impreso depende de cómo lo maneje el usuario.

## Estructura

- `index.html`, `styles.css`, `app.js`: interfaz responsive, evaluación, biblioteca y fuentes.
- `clinical.js`: clasificación, alertas y cálculos puros con unidades explícitas.
- `protocols.js`: contenido clínico y bibliografía; todas las fuentes están pendientes de cotejo directo.
- `server.mjs`: servidor estático, lista explícita de archivos públicos y política CSP.
- `tests/`: comprobaciones del software.

El código y la versión HTML independiente están en la rama `codex/medinterna-prototipo` del repositorio de GitHub seleccionado. Se verificó la descarga ZIP y su HTML. No se ha desplegado un sitio web ni completado la revisión bibliográfica o clínica.
