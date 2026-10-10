// Clinical draft. Bibliographic metadata and current applicability require source review.
export const evidenceStatus = {
  label: 'Borrador clínico · revisión pendiente',
  detail: 'La consulta web de las fuentes está bloqueada por la red del entorno. Las referencias identificadas incluyen publicaciones de 2023–2024 y documentos anteriores aún usados como fundamento. No se ha confirmado cobertura de cambios de 2025–2026 ni validación institucional.'
};

export const references = [
  { id:'na2024', year:2024, title:'Treatment Guidelines for Hyponatremia: Stay the Course', authors:'Sterns RH, Rondon-Berrios H, Adrogué HJ, et al.', journal:'Clinical Journal of the American Society of Nephrology', url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC10843202/', scope:'Corrección de Na, riesgo de desmielinización, sobrecorrección y desmopresina.' },
  { id:'naeu', year:2014, title:'Clinical practice guideline on diagnosis and treatment of hyponatraemia', authors:'Spasovski G, Vanholder R, Allolio B, et al.', journal:'European Journal of Endocrinology', url:'https://doi.org/10.1530/EJE-13-1020', scope:'Clasificación, osmolalidad, sodio urinario y bolos de solución hipertónica.' },
  { id:'siad2023', year:2023, title:'Syndrome of Inappropriate Antidiuresis: From Pathophysiology to Management', authors:'Warren AM, Grossmann M, Christ-Crain M, Russell N.', journal:'Endocrine Reviews', url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC10502587/', scope:'Diagnóstico de SIAD, restricción hídrica y límites de las opciones de segunda línea.' },
  { id:'hyperna2023', year:2023, title:'Evaluation and management of hypernatremia in adults: clinical perspectives', authors:'Yun G, Baek SH, Kim S.', journal:'The Korean Journal of Internal Medicine', url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC10175862/', scope:'Déficit de agua, volemia, diabetes insípida y velocidad de corrección.' },
  { id:'hillier', year:1999, title:'Hyponatremia: evaluating the correction factor for hyperglycemia', authors:'Hillier TA, Abbott RD, Barrett EJ.', journal:'The American Journal of Medicine', url:'https://doi.org/10.1016/S0002-9343(99)00055-8', scope:'Estimación de Na corregido: comparación de factores 1.6 y 2.4. Estudio de fundamento, no guía reciente.' },
  { id:'ukka2023', year:2023, title:'Clinical Practice Guideline: Management of Hyperkalaemia in Adults', authors:'UK Kidney Association.', journal:'Guía clínica UKKA', url:'https://guidelines.ukkidney.org/hyperkalaemia/', scope:'Clasificación de K elevado, ECG, calcio, insulina/glucosa, eliminación de K y controles.' },
  { id:'k2023', year:2023, title:'Potassium Disorders: Hypokalemia and Hyperkalemia', authors:'Kim MJ, Valerio C, Knobloch GK.', journal:'American Family Physician', url:'https://www.aafp.org/pubs/afp/issues/2023/0100/potassium-disorders-hypokalemia-hyperkalemia.html', scope:'Diagnóstico de alteraciones de K, reposición oral e IV, ECG y función renal.' },
  { id:'hypoca2016', year:2016, title:'Emergency management of acute hypocalcaemia in adult patients', authors:'Turner J, Gittoes N, Selby P; Society for Endocrinology.', journal:'Endocrine Connections', url:'https://doi.org/10.1530/EC-16-0056', scope:'Hipocalcemia grave, calcio IV, monitorización y corrección de Mg.' },
  { id:'hyperca2016', year:2016, title:'Emergency management of acute hypercalcaemia in adult patients', authors:'Walsh J, Gittoes N, Selby P; Society for Endocrinology.', journal:'Endocrine Connections', url:'https://doi.org/10.1530/EC-16-0055', scope:'Gravedad, hidratación y tratamiento de la hipercalcemia aguda.' },
  { id:'cancer2023', year:2023, title:'Treatment of Hypercalcemia of Malignancy in Adults: An Endocrine Society Clinical Practice Guideline', authors:'El-Hajj Fuleihan G, Clines GA, Hu MI, et al.', journal:'The Journal of Clinical Endocrinology & Metabolism', url:'https://doi.org/10.1210/clinem/dgac621', scope:'Hipercalcemia por malignidad: antirresortivos, calcitonina y consideraciones renales. No extrapolar a todas las causas.' },
  { id:'mg2024', year:2024, title:'Treating acute hypomagnesaemia in adults', authors:'NHS Specialist Pharmacy Service.', journal:'Recurso profesional NHS SPS; fecha/versión por cotejar', url:'https://www.sps.nhs.uk/articles/treating-acute-hypomagnesaemia-in-adults/', scope:'Reposición de magnesio oral e IV, dosis de referencia y precaución renal.' },
  { id:'hypermg2023', year:2023, title:'Hypermagnesemia in Clinical Practice', authors:'Aal-Hamad AH, Al-Alawi AM, Kashoub MS, Falhammar H.', journal:'Medicina', url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC10384947/', scope:'Causas, toxicidad clínica, calcio IV y eliminación renal o diálisis.' },
  { id:'phos2012', year:2012, title:'Approach to the Hypophosphatemic Patient', authors:'Imel EA, Econs MJ.', journal:'The Journal of Clinical Endocrinology & Metabolism', url:'https://doi.org/10.1210/jc.2011-1319', scope:'Pérdida renal, redistribución, reposición oral/IV y riesgos. Documento de fundamento pendiente de actualización.' },
  { id:'aspen2020', year:2020, title:'ASPEN Consensus Recommendations for Refeeding Syndrome', authors:'da Silva JSV, Seres DS, Sabino K, et al.', journal:'Nutrition in Clinical Practice', url:'https://doi.org/10.1002/ncp.10474', scope:'Riesgo de realimentación, tiamina, vigilancia de P/K/Mg y avance nutricional.' },
  { id:'kdigo2017', year:2017, title:'KDIGO 2017 Clinical Practice Guideline Update for CKD–MBD', authors:'KDIGO CKD–MBD Update Work Group.', journal:'Kidney International Supplements', url:'https://kdigo.org/wp-content/uploads/2017/02/2017-KDIGO-CKD-MBD-GL-Update.pdf', scope:'Hiperfosfatemia en enfermedad renal crónica: tendencias, dieta, quelantes y Ca/P/PTH.' }
];

const step = (title, items, rationale, refs) => ({title, items, rationale, refs});
export const protocols = [
  {
    id:'hyponatremia', family:'Sodio', symbol:'Na', name:'Hiponatremia', summary:'Confirmar tonicidad, evaluar síntomas y controlar la corrección.', range:'Na <135 mmol/L', urgency:'Convulsiones, coma o compromiso cardiorrespiratorio requieren tratamiento inmediato en área monitorizada.', refs:['na2024','naeu','siad2023','hillier'],
    classification:[['Leve','130–134 mmol/L'],['Moderada','125–129 mmol/L'],['Profunda','<125 mmol/L'],['Duración','Aguda <48 h documentadas; crónica ≥48 h. Si se desconoce, usar límites de corrección de la crónica.']],
    steps:[
      step('Confirmar y caracterizar',[
        'Valorar ABCDE, Glasgow, convulsiones, cefalea, vómitos y signos de herniación. Los síntomas graves prevalecen sobre el número de Na.',
        'Repetir Na si es inesperado. Medir osmolalidad sérica, glucosa, K, creatinina y urea. Osmolalidad medida <275 mOsm/kg respalda hiponatremia hipotónica; la tonicidad efectiva excluye urea.',
        'En hiperglucemia, revisar Na corregido. Considerar pseudohiponatremia con hipertrigliceridemia/hiperproteinemia y medición por electrodo indirecto; confirmar con método directo cuando proceda.'
      ],'La solución hipertónica no es el tratamiento de toda natremia baja; primero hay que reconocer la tonicidad, excepto cuando la emergencia exige actuación simultánea.',['naeu','hillier','siad2023']),
      step('Investigar la causa',[
        'Obtener osmolalidad y Na urinarios, preferentemente antes de líquidos si no retrasa la emergencia. Osm urinaria ≤100 mOsm/kg orienta a exceso de agua o baja ingesta de solutos.',
        'Con Osm urinaria >100: Na urinario ≤30 mmol/L sugiere volumen arterial efectivo bajo; >30 obliga a integrar diuréticos, función renal, insuficiencia suprarrenal y SIAD. El examen de volemia aislado tiene limitaciones.',
        'Revisar tiazidas, antidepresivos, anticonvulsivos y desmopresina; valorar cortisol y función tiroidea según contexto. SIAD es diagnóstico de exclusión.'
      ],'La orina ayuda a identificar actividad antidiurética y pérdidas de sal; diuréticos y enfermedad renal pueden invalidar umbrales aislados.',['naeu','siad2023']),
      step('Elegir el manejo por escenario',[
        'Síntomas graves compatibles con hiponatremia hipotónica: en área monitorizada, una pauta europea es NaCl 3% 150 mL IV en 20 min; medir Na al terminar y considerar repetir hasta dos veces según síntomas y respuesta. Objetivo inicial aproximado +4–6 mmol/L, no normalizar el Na. Usar una sola pauta institucional; existen pautas de 100 mL.',
        'Sin síntomas graves: tratar la causa. Hipovolemia: solución isotónica y vigilancia de acuariuresis. SIAD: retirar desencadenantes y restricción de líquidos individualizada; evitar suero isotónico indiscriminado, que puede empeorar el Na.',
        'Hipervolemia: abordar insuficiencia cardiaca/cirrosis y balance de líquidos. Urea, vaptanes o desmopresina requieren selección y supervisión especializada; no son opciones automáticas.'
      ],'Una subida inicial pequeña suele aliviar el edema cerebral; la corrección excesiva posterior aumenta el riesgo de desmielinización.',['naeu','na2024','siad2023']),
      step('Vigilar y prevenir sobrecorrección',[
        'Na tras cada bolo; durante corrección activa, habitualmente cada 2–4 h y antes si hay diuresis brusca. Medir diuresis y balance, y contabilizar toda reposición de K.',
        'Límite europeo general: ≤10 mmol/L en las primeras 24 h y ≤8 mmol/L por cada 24 h posterior. En alto riesgo, objetivo +4–6 y máximo +8 mmol/L en cualquier 24 h; son límites, no metas a alcanzar.',
        'Alto riesgo: Na ≤105, hipopotasemia, desnutrición, uso intenso de alcohol o hepatopatía avanzada. Si se prevé o aparece sobrecorrección: suspender medidas correctoras, pedir apoyo experto y valorar desmopresina/agua libre IV con vigilancia estrecha.'
      ],'La recuperación de excreción de agua puede elevar el Na más que el líquido administrado. El seguimiento seriado controla ese riesgo.',['na2024','naeu'])
    ], pitfalls:['No asumir SIAD por apariencia de euvolemia.','El déficit de K y su reposición modifican el Na.','No corregir una duración desconocida como si fuera aguda.']
  },
  {
    id:'hypernatremia', family:'Sodio', symbol:'Na', name:'Hipernatremia', summary:'Recuperar perfusión y reponer agua con vigilancia de pérdidas.', range:'Na >145 mmol/L', urgency:'Shock, alteración neurológica marcada o Na >155 mmol/L requieren valoración y vigilancia urgentes.', refs:['hyperna2023'],
    classification:[['Leve','146–150 mmol/L'],['Moderada','151–155 mmol/L'],['Grave','>155 mmol/L'],['Duración','Aguda <48 h documentadas; crónica o desconocida con corrección gradual.']],
    steps:[
      step('Determinar volumen y mecanismo',[
        'Evaluar estado neurológico, perfusión, volemia y acceso al agua. Revisar balance, fiebre, diarrea, nutrición, diuréticos, litio y aporte de sodio.',
        'Medir glucosa, K, función renal, osmolalidad y volumen urinarios. Poliuria con orina inadecuadamente diluida orienta a diabetes insípida; glucosuria o alta carga de solutos orientan a diuresis osmótica.'
      ],'Suele representar déficit relativo de agua, pero el líquido inicial depende de la circulación y el mecanismo de pérdida.',['hyperna2023']),
      step('Restaurar perfusión antes del agua libre',[
        'Si hay shock o hipotensión: cristaloide isotónico, con reevaluación clínica, independientemente del Na. No usar agua libre como expansor inicial.',
        'Estable: agua oral/enteral si es segura, glucosa 5% IV o solución hipotónica según volemia y déficits concomitantes. En sobrecarga de volumen, valorar agua libre y diurético con supervisión.',
        'Estimar déficit de agua con ACT × (Na/140 − 1). Añadir pérdidas continuas e insensibles y restar aportes; la fórmula sola no define la prescripción.'
      ],'Una fórmula no predice bien cambios en pérdidas o función renal. El déficit total tampoco equivale al volumen que debe darse en el primer día.',['hyperna2023']),
      step('Individualizar velocidad y causa',[
        'En duración crónica/desconocida, una pauta conservadora limita la caída a aproximadamente ≤0.5 mmol/L/h y ≤10–12 mmol/L/día; repartir el déficit, habitualmente en 48–72 h, según evolución.',
        'La evidencia adulta sobre estos límites es observacional; evitar corrección excesivamente lenta. Una carga aguda de sodio puede requerir corrección más rápida bajo supervisión experta.',
        'Tratar pérdidas gastrointestinales/renales, hiperglucemia e hipopotasemia. Sospecha de diabetes insípida: estudio y desmopresina solo tras valorar el mecanismo; vigilar hiponatremia.'
      ],'El tiempo de instauración cambia la adaptación cerebral; los objetivos requieren controles y ajuste, no una velocidad fija mantenida.',['hyperna2023']),
      step('Reevaluar la respuesta',[
        'Control de Na, glucosa y balance cada 2–4 h al inicio de corrección activa o en pacientes inestables; ampliar cuando la tendencia sea predecible.',
        'Ajustar la pauta a la caída real del Na, diuresis y tolerancia cardiopulmonar. Consultar nefrología si la función renal o sobrecarga impide corregir con seguridad.'
      ],'La medición seriada del Na sustituye las predicciones cuando cambia la pérdida de agua.',['hyperna2023'])
    ], pitfalls:['No confundir BUN con urea total en el cálculo.','No interpretar el déficit de agua como orden de infusión.','No aplicar una pauta rápida de carga aguda a duración desconocida.']
  },
  {
    id:'hypokalemia', family:'Potasio', symbol:'K', name:'Hipopotasemia', summary:'Identificar riesgo eléctrico, reponer potasio y corregir magnesio.', range:'K <3.5 mmol/L', urgency:'K ≤2.5 mmol/L, arritmia, cambios de ECG, debilidad intensa o compromiso respiratorio son criterios de atención urgente.', refs:['k2023','mg2024'],
    classification:[['Leve','3.0–3.4 mmol/L'],['Moderada','>2.5 y <3.0 mmol/L'],['Grave','≤2.5 mmol/L o manifestaciones graves']],
    steps:[
      step('Valorar el riesgo y confirmar',[
        'ECG, síntomas neuromusculares, función renal, Mg, glucosa y equilibrio ácido-base. Un ECG normal no excluye riesgo de arritmia.',
        'Revisar pérdidas digestivas, diuréticos, insulina, betaagonistas y baja ingesta. Si la causa no es clara, valorar K urinario y contexto ácido-base; la medición urinaria puede alterarse por reposición.'
      ],'El mecanismo puede ser pérdida corporal o redistribución; la cantidad de reposición y el riesgo de rebote difieren.',['k2023']),
      step('Seleccionar la vía',[
        'Paciente estable, K >2.5 y vía digestiva funcional: preferir KCl oral en dosis divididas. Una pauta de referencia es 20–40 mEq por dosis, ajustada a déficit, tolerancia, función renal y presentación.',
        'Grave, ECG alterado, síntomas importantes o imposibilidad oral: KCl IV diluido mediante bomba y monitorización. Nunca administrar KCl concentrado en bolo.',
        'Velocidades de referencia: hasta 10 mEq/h por vía periférica; hasta 20 mEq/h por vía central con ECG continuo y controles frecuentes. Verificar concentración máxima y normativa local; velocidades superiores son de cuidados críticos.'
      ],'La vía oral reduce el riesgo de elevación brusca y rebote. La infusión IV rápida puede causar arritmias fatales.',['k2023']),
      step('Tratar la causa y el déficit concomitante',[
        'Corregir hipomagnesemia concomitante; revisar y tratar pérdidas persistentes. Evitar soluciones glucosadas como vehículo inicial habitual cuando la insulina endógena pueda agravar la hipopotasemia.',
        'En oliguria o enfermedad renal avanzada, reducir e individualizar la reposición. No calcular una dosis total únicamente a partir del K sérico.'
      ],'El Mg bajo favorece la pérdida renal de K, mientras la insuficiencia renal aumenta el riesgo de sobrecorrección.',['k2023','mg2024']),
      step('Controlar la corrección',[
        'En corrección urgente IV: K aproximadamente cada 2–4 h, ECG continuo, Mg y función renal. Evitar muestras de la misma vía por la que se infunde K.',
        'En manejo oral estable: programar el control según gravedad, función renal y pérdidas. Reajustar antes de repetir dosis; revisar cardiopatía y fármacos que aumentan riesgo eléctrico.'
      ],'La respuesta depende de las pérdidas y redistribución; un control oportuno evita infra y sobrecorrección.',['k2023'])
    ], pitfalls:['Nunca KCl IV directo.','No olvidar Mg en hipopotasemia refractaria.','No asumir que un ECG normal elimina el riesgo.']
  },
  {
    id:'hyperkalemia', family:'Potasio', symbol:'K', name:'Hiperpotasemia', summary:'Proteger el corazón, redistribuir K y eliminarlo del organismo.', range:'K ≥5.5 mmol/L (UKKA)', urgency:'K ≥6.5 mmol/L, arritmia o ECG compatible requieren actuación inmediata; K 6.0–6.4 necesita evaluación urgente.', refs:['ukka2023','k2023'],
    classification:[['Leve','5.5–5.9 mmol/L'],['Moderada','6.0–6.4 mmol/L'],['Grave','≥6.5 mmol/L'],['ECG','Un ECG normal no excluye hiperpotasemia peligrosa.']],
    steps:[
      step('Reconocer y confirmar sin demorar',[
        'ECG de 12 derivaciones si K ≥6.0; monitorización continua si K ≥6.5, ECG alterado o paciente clínicamente enfermo con K 6.0–6.4.',
        'Comprobar hemólisis, técnica de toma, plaquetas/leucocitos y repetir muestra si se sospecha pseudohiperpotasemia. No retrasar tratamiento si hay gravedad clínica/eléctrica.',
        'Medir glucosa, función renal y gasometría según contexto; revisar suplementos de K, RAAS, antagonistas de mineralocorticoides, trimetoprim y AINE.'
      ],'La confirmación evita tratar un artefacto, pero el riesgo eléctrico puede exigir tratamiento antes de la repetición.',['ukka2023','k2023']),
      step('Proteger el miocardio si hay cambios en ECG',[
        'Calcio IV según entorno y presentación. UKKA contempla gluconato cálcico 10% 30 mL en 10 min; en reanimación/periparo, cloruro cálcico 10% 10 mL en 5 min. Dosis equivalentes de calcio elemental; no son volúmenes intercambiables.',
        'Reevaluar ECG a los 5–10 min y repetir según persistencia de cambios y protocolo de reanimación. El cloruro requiere especial cuidado por daño por extravasación.',
        'El calcio estabiliza la membrana, pero no disminuye el K. Continuar redistribución y eliminación simultáneamente.'
      ],'La protección eléctrica actúa rápido y dura menos que la amenaza metabólica; no sustituye la eliminación de potasio.',['ukka2023']),
      step('Redistribuir y eliminar',[
        'K ≥6.5: insulina soluble/regular 10 U IV con 25 g de glucosa según pauta UKKA; considerar también en K 6.0–6.4. Verificar glucemia, acceso y protocolo local. Si glucosa basal <126 mg/dL (7 mmol/L), UKKA propone glucosa 10% 50 mL/h durante 5 h después del tratamiento para reducir hipoglucemia.',
        'Salbutamol nebulizado 10–20 mg como coadyuvante, no como monoterapia en hiperpotasemia grave. No usar bicarbonato IV rutinario; valorar indicaciones específicas de acidosis.',
        'Retirar fuentes de K y desencadenantes. Valorar diurético si hay función renal/volemia adecuadas, quelante de K según disponibilidad y guía, y diálisis urgente si es refractaria, con insuficiencia renal grave u otras indicaciones. Los quelantes no sustituyen medidas de emergencia.'
      ],'La redistribución es transitoria y puede haber rebote; se necesita una vía efectiva de eliminación.',['ukka2023']),
      step('Vigilar K y glucosa',[
        'K tras tratamiento aproximadamente a 1, 2, 4, 6 y 24 h, ajustando a gravedad y respuesta. ECG continuo cuando está indicado.',
        'Tras insulina/glucosa: glucemia basal y a 30, 60, 90, 120, 180, 240, 300 y 360 min; prolongar si hay riesgo o dosis repetidas. No repetir insulina sin integrar K y glucosa.',
        'Escalar a cuidados críticos/nefrología si persisten alteraciones de ECG, K grave o rebote sin eliminación efectiva.'
      ],'La hipoglucemia puede ser tardía, sobre todo en enfermedad renal; el rebote de K aparece al terminar el efecto redistributivo.',['ukka2023'])
    ], pitfalls:['Calcio no elimina K.','No usar salbutamol como único tratamiento de un caso grave.','No omitir seis horas de vigilancia glucémica tras insulina.']
  },
  {
    id:'hypocalcemia', family:'Calcio', symbol:'Ca', name:'Hipocalcemia', summary:'Confirmar calcio biológicamente activo y buscar el mecanismo.', range:'Ca total <8.5 mg/dL o ionizado bajo', urgency:'Tetania, convulsiones, laringoespasmo, QT prolongado/arritmia o Ca ajustado <1.9 mmol/L (~7.6 mg/dL) requieren valoración urgente.', refs:['hypoca2016','mg2024'],
    classification:[['Intervalo','Usar el intervalo local y Ca ionizado cuando sea pertinente.'],['Grave','Síntomas graves o Ca ajustado <1.9 mmol/L; un Ca total bajo sin albúmina no confirma este criterio.']],
    steps:[
      step('Confirmar e identificar la causa',[
        'Medir Ca ionizado en pacientes críticos, con hipoalbuminemia o trastorno ácido-base. Medir Mg, P, creatinina, albúmina, PTH y 25-OH vitamina D según contexto.',
        'ECG y revisión de cirugía cervical, pancreatitis, sepsis, transfusión, antirresortivos y déficit de vitamina D. Interpretar PTH con el Ca simultáneo.',
        'No automatizar fórmulas de calcio ajustado por albúmina en pacientes críticos; pueden clasificar erróneamente el calcio activo.'
      ],'La fracción ionizada produce el efecto fisiológico, y un Mg bajo puede comprometer secreción/acción de PTH.',['hypoca2016','mg2024']),
      step('Tratar la emergencia bajo monitorización',[
        'En hipocalcemia grave confirmada o sintomática: gluconato cálcico 10% 10–20 mL diluidos en 50–100 mL de glucosa 5%, en 10 min con ECG. Repetir según síntomas y Ca, seguido de infusión titulada si es necesario.',
        'Comprobar presentación y calcio elemental. Cloruro cálcico es una alternativa de mayor riesgo de extravasación, generalmente mediante vía central; no sustituir volumen por volumen.',
        'No compartir vía con fosfato o bicarbonato por riesgo de precipitación. En diálisis/enfermedad renal avanzada, individualizar con nefrología.'
      ],'El calcio IV controla manifestaciones inmediatas; su efecto puede ser corto si no se corrige la causa.',['hypoca2016']),
      step('Corregir el mecanismo',[
        'Leve y estable: calcio oral y tratamiento del déficit de vitamina D según etiología y función renal.',
        'Corregir Mg bajo. Hipoparatiroidismo u otras indicaciones de vitamina D activa: valorar calcitriol/alfacalcidol con seguimiento especializado, evitando hipercalcemia e hipercalciuria.'
      ],'Reponer calcio sin tratar Mg, vitamina D o PTH puede no sostener la respuesta.',['hypoca2016','mg2024']),
      step('Monitorizar',[
        'En tratamiento IV, controles frecuentes de Ca ionizado/total según contexto, ECG, síntomas y vía. Ajustar la infusión a resultados y protocolo institucional.',
        'Al pasar a oral, planificar Ca, P, Mg y función renal; tras vitamina D activa vigilar también hipercalcemia.'
      ],'El balance de calcio y fosfato cambia con la causa y su tratamiento; la misma dosis no es segura en todas las funciones renales.',['hypoca2016'])
    ], pitfalls:['No reponer por calcio total aislado sin interpretar albúmina/pH.','No mezclar calcio IV con fosfato o bicarbonato.','Hipocalcemia refractaria obliga a revisar Mg.']
  },
  {
    id:'hypercalcemia', family:'Calcio', symbol:'Ca', name:'Hipercalcemia', summary:'Evaluar gravedad, recuperar volumen y tratar la causa.', range:'Ca total >10.5 mg/dL o ionizado alto', urgency:'Ca >14 mg/dL (~3.5 mmol/L), confusión, arritmia o lesión renal aguda requieren tratamiento urgente.', refs:['hyperca2016','cancer2023'],
    classification:[['Leve','>10.5 y <12 mg/dL'],['Moderada','12–14 mg/dL'],['Grave','>14 mg/dL o repercusión clínica importante']],
    steps:[
      step('Confirmar y estudiar',[
        'Confirmar calcio, preferiblemente ionizado si albúmina/pH alterados; ECG, función renal, P, Mg y volemia. Revisar tiazidas, litio, calcio y vitamina D.',
        'PTH simultánea: elevada/inapropiadamente normal orienta a mecanismo dependiente de PTH. Suprimida: estudiar malignidad, exceso de vitamina D y otras causas según contexto.',
        'No extrapolar la guía de malignidad a hipercalcemia por hiperparatiroidismo sin evaluar la causa.'
      ],'PTH organiza el estudio etiológico; la causa determina el tratamiento definitivo.',['hyperca2016','cancer2023']),
      step('Hidratar de forma individualizada',[
        'En déficit de volumen: solución salina isotónica, titulada a perfusión, diuresis y tolerancia. Reducir ritmo y vigilar sobrecarga en insuficiencia cardiaca o renal.',
        'No usar un volumen fijo para todos los pacientes. Los diuréticos de asa no se recomiendan rutinariamente para bajar Ca; pueden usarse si aparece sobrecarga.'
      ],'La hipercalcemia causa pérdida de agua y reduce filtrado; restaurar volumen mejora la eliminación renal de calcio.',['hyperca2016','cancer2023']),
      step('Aplicar tratamiento dirigido',[
        'Hipercalcemia por malignidad: antirresortivo IV (bisfosfonato) o denosumab según función renal y contexto. La guía sugiere denosumab sobre bisfosfonato IV, con evidencia de certeza baja; valorar disponibilidad y riesgo de hipocalcemia.',
        'Malignidad con hipercalcemia grave: añadir calcitonina como puente junto al antirresortivo; limitar a 48–72 h por taquifilaxia. No esperar un efecto inmediato del bisfosfonato.',
        'Exceso de calcitriol: valorar glucocorticoide según causa. Hiperparatiroidismo: tratamiento especializado. Refractaria con limitaciones de líquidos o insuficiencia renal grave: valorar diálisis.'
      ],'Los antirresortivos tardan en actuar; calcitonina proporciona un efecto más rápido y transitorio. La causa condiciona la selección.',['cancer2023','hyperca2016']),
      step('Vigilar resolución y toxicidad',[
        'Control seriado de Ca, P, Mg, función renal, diuresis y sobrecarga. Durante gravedad/inestabilidad, aumentar frecuencia respecto al control diario.',
        'Tras antirresortivos vigilar hipocalcemia, especialmente con enfermedad renal o déficit de vitamina D; seguir respuesta durante los días posteriores.'
      ],'La respuesta puede retrasarse y los antirresortivos pueden producir hipocalcemia duradera.',['cancer2023'])
    ], pitfalls:['No usar furosemida rutinaria sin corregir volemia.','Denosumab puede causar hipocalcemia importante en enfermedad renal.','Una PTH normal puede ser inapropiadamente alta en hipercalcemia.']
  },
  {
    id:'hypomagnesemia', family:'Magnesio', symbol:'Mg', name:'Hipomagnesemia', summary:'Relacionar Mg con el riesgo eléctrico y los déficits de K y Ca.', range:'Mg <1.7 mg/dL (~0.7 mmol/L)', urgency:'Arritmia, convulsiones, tetania o Mg <1.2 mg/dL (~0.5 mmol/L) requieren valoración urgente.', refs:['mg2024','k2023','hypoca2016'],
    classification:[['Leve/moderada','1.2 a <1.7 mg/dL; confirmar intervalo local.'],['Grave','<1.2 mg/dL o síntomas importantes.'],['Conversión','1 mmol de Mg ≈24.3 mg de Mg elemental; no equivale a gramos de MgSO₄.']],
    steps:[
      step('Evaluar déficit y contexto',[
        'ECG si síntomas/gravedad; medir K, Ca, función renal y buscar diarrea, alcohol, desnutrición, diuréticos, inhibidores de bomba de protones y pérdidas renales.',
        'Un Mg sérico normal no descarta por completo déficit corporal. Si persiste sin causa clara, investigar excreción renal con apoyo especializado.'
      ],'Mg bajo favorece arritmias e impide una corrección eficaz de K y Ca.',['mg2024','k2023','hypoca2016']),
      step('Seleccionar reposición',[
        'Leve, estable y vía oral disponible: sales de Mg por vía oral en dosis divididas, según Mg elemental de la presentación y tolerancia digestiva.',
        'Grave o sintomática: MgSO₄ IV en hospital. NHS SPS describe como dosis inicial de referencia 5 g (aproximadamente 20 mmol de Mg), con velocidad habitual 1–2 g/h; requiere ajuste a función renal y protocolo local, y no es la pauta de bolo de una arritmia.',
        'Torsades de pointes es una emergencia con pauta específica de reanimación; activar el protocolo de arritmia y no esperar a una reposición lenta de déficit.'
      ],'La vía y velocidad dependen de los síntomas y función renal. Confundir Mg elemental con MgSO₄ puede producir errores de dosis.',['mg2024']),
      step('Tratar pérdidas y ajustar por función renal',[
        'Revisar fármacos causales y pérdidas digestivas. Reponer K y Ca cuando corresponda.',
        'Oliguria, lesión renal aguda o eGFR <30: reducción/individualización con especialista y controles cercanos; riesgo de acumulación y depresión neuromuscular.'
      ],'La excreción renal determina seguridad, mientras el déficit intracelular puede requerir reposición sostenida.',['mg2024']),
      step('Vigilar respuesta',[
        'Durante IV: presión arterial, respiración, ECG si riesgo y síntomas; valorar reflejos con dosis altas o disfunción renal.',
        'Control de Mg después de la infusión y controles seriados de K, Ca y función renal; no tomar la muestra de la vía de infusión. Continuar según pérdidas y respuesta.'
      ],'La subida sérica temprana no garantiza reposición tisular y el exceso de Mg puede ser tóxico.',['mg2024'])
    ], pitfalls:['La fecha/versión de la fuente NHS SPS está pendiente de cotejo.','No confundir gramos de sal con Mg elemental.','La pauta para torsades no es la pauta de reposición habitual.']
  },
  {
    id:'hypermagnesemia', family:'Magnesio', symbol:'Mg', name:'Hipermagnesemia', summary:'Suspender aporte, identificar toxicidad y facilitar eliminación.', range:'Mg >2.4 mg/dL (intervalo orientativo)', urgency:'Hipotensión, bradicardia, arreflexia, depresión respiratoria o alteración de conciencia requieren intervención urgente.', refs:['hypermg2023'],
    classification:[['Leve','Por encima del intervalo, sin manifestaciones; integrar función renal.'],['Toxicidad','No existe un único umbral seguro: valorar ECG, reflejos, respiración y tendencia.'],['Alerta analítica','Mg ≥6 mg/dL activa valoración prioritaria en esta herramienta; no es una escala universal.']],
    steps:[
      step('Detectar exposición y repercusión',[
        'Revisar función renal, laxantes/antiácidos con Mg, suplementos y perfusiones de MgSO₄. Evaluar respiración, presión arterial, ECG, conciencia y reflejos.',
        'Medir Ca, K, Mg y función renal. Confirmar resultados inesperados sin retrasar actuación si hay toxicidad.'
      ],'La eliminación renal limitada y los aportes exógenos pueden producir acumulación incluso sin una dosis reciente aparentemente alta.',['hypermg2023']),
      step('Suspender aporte y estabilizar',[
        'Retirar fuentes de Mg. Toxicidad cardiovascular/neuromuscular: soporte ABCDE y monitorización.',
        'El calcio IV puede antagonizar efectos del Mg: una pauta de referencia es gluconato cálcico 10% 10 mL IV en unos 10 min, con ECG y valoración de repetición. Verificar presentación y protocolo local.'
      ],'El calcio antagoniza efectos fisiológicos del Mg, pero no elimina su exceso.',['hypermg2023']),
      step('Favorecer eliminación según función renal',[
        'En paciente con filtrado y diuresis adecuados: valorar solución isotónica y diurético de asa, evitando sobrecarga y pérdidas de otros electrolitos.',
        'Toxicidad grave, insuficiencia renal o respuesta insuficiente: valoración urgente de hemodiálisis por nefrología.'
      ],'La depuración extracorpórea puede ser necesaria cuando la eliminación renal no basta.',['hypermg2023']),
      step('Comprobar reversión',[
        'Reevaluar respiración, reflejos, ECG y presión, además de Mg, Ca y función renal seriados.',
        'Vigilar persistencia/rebote y corregir el mecanismo de exposición antes de retirar la monitorización.'
      ],'La mejoría clínica y la tendencia analítica deben ser concordantes; una medición aislada no demuestra eliminación sostenida.',['hypermg2023'])
    ], pitfalls:['Un antídoto funcional no elimina Mg.','No forzar diuresis en oliguria.','Laxantes y antiácidos pueden ser la fuente.']
  },
  {
    id:'hypophosphatemia', family:'Fósforo', symbol:'P', name:'Hipofosfatemia', summary:'Distinguir redistribución, déficit y pérdida renal; revisar realimentación.', range:'P <2.5 mg/dL', urgency:'P <1 mg/dL, debilidad respiratoria, rabdomiólisis, hemólisis o disfunción cardiaca requieren valoración urgente.', refs:['phos2012','aspen2020'],
    classification:[['Leve','2.0 a <2.5 mg/dL'],['Moderada','1.0 a <2.0 mg/dL'],['Grave','<1.0 mg/dL (~0.32 mmol/L)']],
    steps:[
      step('Identificar mecanismo y riesgo',[
        'Revisar alimentación reciente, alcohol, desnutrición, insulina, alcalosis respiratoria, antiácidos, función renal y pérdidas digestivas.',
        'Medir K, Mg, Ca y función renal; valorar fuerza/respiración y CK si síntomas. En pérdida renal persistente, estudiar fosfaturia con especialista.'
      ],'La redistribución puede cambiar rápidamente; en realimentación suelen coexistir déficits de K y Mg.',['phos2012','aspen2020']),
      step('Elegir reposición por gravedad',[
        'Estable y vía digestiva funcional: fosfato oral en dosis divididas, titulado a concentración, tolerancia y función renal.',
        'Grave, sintomática o sin vía oral: considerar fosfato IV monitorizado, individualizado al peso y función renal. Verificar si la preparación aporta sodio o potasio y la concentración de mmol/mL.',
        'No hay una dosis IV universal segura. Usar una pauta institucional validada por farmacia; evitar reposición IV indiscriminada si hay hipocalcemia significativa y ajustar en enfermedad renal.'
      ],'El fosfato IV puede causar hipocalcemia, hipotensión, sobrecarga de K/Na y precipitación de calcio-fosfato.',['phos2012']),
      step('Abordar posible realimentación',[
        'Identificar riesgo antes de aumentar calorías. ASPEN recomienda tiamina 100 mg antes de alimentación o soluciones con dextrosa en pacientes de riesgo; continuar según riesgo y cuadro clínico. No retrasar dextrosa en hipoglucemia urgente.',
        'Si hay déficits graves de P/K/Mg, corregir y reconsiderar inicio/aumento de aporte calórico; avanzar de forma controlada con nutrición clínica.',
        'En alto riesgo, vigilar P/K/Mg aproximadamente cada 12 h durante los primeros 3 días, con mayor frecuencia si es clínicamente necesario.'
      ],'La insulina de la realimentación desplaza electrolitos al interior celular y aumenta la necesidad de tiamina.',['aspen2020']),
      step('Monitorizar reposición',[
        'Durante reposición IV controlar P, Ca, K, Mg y función renal antes de repetir dosis; frecuencia según pauta, habitualmente cada 6 h en regímenes IV publicados.',
        'Vigilar respiración, hemodinamia y balance; tratar la causa y reevaluar antes de continuar reposición.'
      ],'La combinación de electrolitos y función renal condiciona tanto respuesta como toxicidad.',['phos2012'])
    ], pitfalls:['La fuente de reposición de 2012 requiere actualización antes de adopción institucional.','El fosfato potásico también aporta K.','No omitir el riesgo de realimentación.']
  },
  {
    id:'hyperphosphatemia', family:'Fósforo', symbol:'P', name:'Hiperfosfatemia', summary:'Evaluar función renal, liberación celular y repercusión sobre calcio.', range:'P >4.5 mg/dL', urgency:'Hiperfosfatemia aguda con lesión renal, hipocalcemia sintomática o sospecha de lisis tumoral requiere evaluación urgente.', refs:['kdigo2017','phos2012'],
    classification:[['Elevado','>4.5 mg/dL, según intervalo local.'],['Gravedad','No se determina por una escala única de P; integrar Ca, síntomas, causa, función renal y velocidad de ascenso.']],
    steps:[
      step('Confirmar y buscar mecanismo',[
        'Repetir si el resultado es inesperado; revisar hemólisis y posibles interferencias analíticas. Medir Ca, K, creatinina y, si corresponde, ácido úrico/LDH.',
        'Investigar enfermedad renal, lisis tumoral, rabdomiólisis, acidosis, enemas/suplementos de fosfato e hipoparatiroidismo.'
      ],'Un aumento agudo por liberación celular requiere un abordaje distinto al de CKD–MBD crónica.',['phos2012','kdigo2017']),
      step('Actuar en cuadros agudos',[
        'Suspender aporte exógeno y tratar la causa. Sospecha de lisis tumoral o rabdomiólisis: activar el protocolo correspondiente y consultar nefrología.',
        'Hidratación solo si está indicada por volemia y causa, con vigilancia de sobrecarga. Valorar diálisis en lesión renal grave/refractariedad y otras indicaciones.',
        'Evitar calcio IV por hipocalcemia asintomática asociada a gran carga de fosfato; puede favorecer precipitación. Si hay tetania, convulsiones o arritmia por hipocalcemia, el rescate con calcio requiere evaluación experta urgente.'
      ],'La caída de calcio puede acompañar una carga de fosfato; tratar solo el número de calcio puede empeorar depósitos.',['phos2012']),
      step('Manejo crónico en enfermedad renal',[
        'KDIGO: basar decisiones en tendencias conjuntas de Ca, P y PTH, y en elevación progresiva/persistente de fosfato.',
        'Individualizar ingesta de fosfato, especialmente aditivos, sin inducir desnutrición. Quelantes con comidas si están indicados; restringir carga de quelantes cálcicos según contexto.',
        'Revisar adherencia, nutrición y diálisis con nefrología. No indicar quelantes preventivos por una sola medición normal o limítrofe.'
      ],'En CKD–MBD la estrategia integra balance mineral y riesgo de carga de calcio, no una medición aislada.',['kdigo2017']),
      step('Seguir tendencia y complicaciones',[
        'Agudo: controles estrechos de P, Ca, K y función renal según estabilidad. Crónico: intervalos según estadio de enfermedad renal y tratamiento.',
        'Documentar causa, respuesta y plan de seguimiento; evitar extrapolar recomendaciones de CKD–MBD al paciente sin enfermedad renal.'
      ],'El seguimiento distingue una elevación transitoria de una carga persistente y guía la intensidad de tratamiento.',['kdigo2017'])
    ], pitfalls:['No indicar quelantes por una cifra aislada sin contexto.','No extrapolar manejo renal crónico a lisis tumoral.','Valorar Ca y P conjuntamente.']
  }
];

export function getProtocol(id) { return protocols.find(p=>p.id===id); }
export function getReference(id) { return references.find(r=>r.id===id); }
