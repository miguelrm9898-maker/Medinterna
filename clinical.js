// Pure functions. Units are explicit; these estimates never create treatment orders.
export const fields = {
  sodium: { label: 'Sodio', unit: 'mmol/L', min: 80, max: 200, step: '0.1', normal: '135–145', placeholder: '140' },
  potassium: { label: 'Potasio', unit: 'mmol/L', min: 0.5, max: 12, step: '0.1', normal: '3.5–5.0', placeholder: '4.0' },
  calcium: { label: 'Calcio total', unit: 'mg/dL', min: 3, max: 25, step: '0.1', normal: '8.5–10.5', placeholder: '9.2' },
  ionized: { label: 'Calcio ionizado', unit: 'mmol/L', min: 0.3, max: 3, step: '0.01', normal: '1.12–1.32', placeholder: '1.20' },
  magnesium: { label: 'Magnesio', unit: 'mg/dL', min: 0.1, max: 20, step: '0.1', normal: '1.7–2.4', placeholder: '2.0' },
  phosphate: { label: 'Fósforo', unit: 'mg/dL', min: 0.1, max: 20, step: '0.1', normal: '2.5–4.5', placeholder: '3.5' },
  glucose: { label: 'Glucosa', unit: 'mg/dL', min: 20, max: 1500, step: '1', placeholder: '100' },
  bun: { label: 'BUN (nitrógeno ureico)', unit: 'mg/dL', min: 1, max: 250, step: '1', placeholder: '14' },
  weight: { label: 'Peso', unit: 'kg', min: 20, max: 350, step: '0.1', placeholder: '70' },
  measuredOsm: { label: 'Osmolalidad medida', unit: 'mOsm/kg', min: 150, max: 500, step: '1', placeholder: '285' }
};

export function parseValue(value, key) {
  if (value == null || String(value).trim() === '') return null;
  const normalized = String(value).trim().replace(',', '.');
  if (!/^\d+(\.\d+)?$/.test(normalized)) throw new Error(`${fields[key].label}: introduce un número válido.`);
  const n = Number(normalized);
  const f = fields[key];
  if (!Number.isFinite(n) || n < f.min || n > f.max) throw new Error(`${f.label}: revisa el valor y la unidad (rango admitido ${f.min}–${f.max} ${f.unit}).`);
  return n;
}

function finding(key, value, protocol, label, level, note = '') {
  return { key, value, protocol, label, level, note, unit: fields[key].unit };
}

export function classify(labs) {
  const out = [];
  for (const key of ['sodium', 'potassium', 'calcium', 'ionized', 'magnesium', 'phosphate']) {
    const n = labs[key];
    if (n == null) continue;
    if (!Number.isFinite(n) || n < fields[key].min || n > fields[key].max) throw new Error(`Valor inválido: ${key}`);
    if (key === 'sodium') {
      if (n < 135) out.push(finding(key,n,'hyponatremia', n < 125 ? 'Hiponatremia profunda' : n < 130 ? 'Hiponatremia moderada' : 'Hiponatremia leve',n < 125 ? 'high' : 'moderate','La urgencia depende también de síntomas, tonicidad y duración.'));
      else if (n > 145) out.push(finding(key,n,'hypernatremia',n > 155 ? 'Hipernatremia grave' : n > 150 ? 'Hipernatremia moderada' : 'Hipernatremia leve',n > 155 ? 'high' : 'moderate'));
      else out.push(finding(key,n,null,'En intervalo orientativo','normal'));
    }
    if (key === 'potassium') {
      if (n < 3.5) out.push(finding(key,n,'hypokalemia',n <= 2.5 ? 'Hipopotasemia grave' : n < 3 ? 'Hipopotasemia moderada' : 'Hipopotasemia leve', n <= 2.5 ? 'high' : 'moderate'));
      else if (n >= 5.5) out.push(finding(key,n,'hyperkalemia',n >= 6.5 ? 'Hiperpotasemia grave' : n >= 6 ? 'Hiperpotasemia moderada' : 'Hiperpotasemia leve',n >= 6 ? 'high' : 'moderate'));
      else if (n > 5) out.push(finding(key,n,'hyperkalemia','Potasio sobre el intervalo','moderate','5.1–5.4: confirmar y evaluar la tendencia; no equivale al umbral UKKA ≥5.5.'));
      else out.push(finding(key,n,null,'En intervalo orientativo','normal'));
    }
    if (key === 'calcium') {
      const note = 'Calcio total sin ajustar: la albúmina y el pH pueden cambiar su interpretación. Prioriza calcio ionizado en pacientes críticos.';
      if (n < 8.5) out.push(finding(key,n,'hypocalcemia', n < 7.6 ? 'Calcio total muy bajo' : 'Calcio total bajo', n < 7.6 ? 'high' : 'moderate',note));
      else if (n > 10.5) out.push(finding(key,n,'hypercalcemia', n > 14 ? 'Hipercalcemia grave' : n >= 12 ? 'Hipercalcemia moderada' : 'Hipercalcemia leve',n > 14 ? 'high' : 'moderate',note));
      else out.push(finding(key,n,null,'En intervalo orientativo','normal',note));
    }
    if (key === 'ionized') {
      if (n < 1.12) out.push(finding(key,n,'hypocalcemia','Calcio ionizado bajo',n < 0.9 ? 'high' : 'moderate','Confirma el intervalo del laboratorio y el pH; <0.9 requiere valoración urgente.'));
      else if (n > 1.32) out.push(finding(key,n,'hypercalcemia','Calcio ionizado alto','moderate','La gravedad se integra con síntomas, función renal y evolución.'));
      else out.push(finding(key,n,null,'En intervalo orientativo','normal'));
    }
    if (key === 'magnesium') {
      if (n < 1.7) out.push(finding(key,n,'hypomagnesemia',n < 1.2 ? 'Hipomagnesemia grave' : 'Hipomagnesemia',n < 1.2 ? 'high' : 'moderate'));
      else if (n > 2.4) out.push(finding(key,n,'hypermagnesemia','Hipermagnesemia',n >= 6 ? 'high' : 'moderate','La toxicidad depende de la concentración, reflejos, respiración y función renal.'));
      else out.push(finding(key,n,null,'En intervalo orientativo','normal'));
    }
    if (key === 'phosphate') {
      if (n < 2.5) out.push(finding(key,n,'hypophosphatemia',n < 1 ? 'Hipofosfatemia grave' : n < 2 ? 'Hipofosfatemia moderada' : 'Hipofosfatemia leve',n < 1 ? 'high' : 'moderate'));
      else if (n > 4.5) out.push(finding(key,n,'hyperphosphatemia','Hiperfosfatemia','moderate','El tratamiento depende de la causa; en enfermedad renal, valorar tendencias de Ca, P y PTH conjuntamente.'));
      else out.push(finding(key,n,null,'En intervalo orientativo','normal'));
    }
  }
  return out;
}

export function correctedSodium(sodium, glucose) {
  if (![sodium, glucose].every(Number.isFinite)) return null;
  const excess = Math.max(0, glucose - 100) / 100;
  return { low: sodium + 1.6 * excess, high: sodium + 2.4 * excess };
}
export function calculatedOsmolality(sodium, glucose, bun) {
  if (![sodium, glucose, bun].every(Number.isFinite)) return null;
  return 2 * sodium + glucose / 18 + bun / 2.8;
}
export function effectiveOsmolality(sodium, glucose) {
  if (![sodium, glucose].every(Number.isFinite)) return null;
  return 2 * sodium + glucose / 18;
}
export function waterDeficit(sodium, weight, factor) {
  if (![sodium, weight, factor].every(Number.isFinite)) return null;
  if (sodium <= 145 || weight <= 0 || ![0.45,0.5,0.6].includes(factor)) return null;
  return weight * factor * (sodium / 140 - 1);
}
export function clinicalAlerts(labs, flags) {
  const alerts = [];
  if (flags.neuro) alerts.push({level:'high',text:'Síntomas neurológicos graves: valoración inmediata, ABCDE y tratamiento supervisado. No esperes a completar el formulario.'});
  if (flags.ecg) alerts.push({level:'high',text:'Cambios en ECG o arritmia: monitorización continua y valoración urgente, incluso con alteraciones analíticas pequeñas.'});
  if (flags.renal) alerts.push({level:'moderate',text:'Oliguria o eGFR <30: individualiza líquidos y reposiciones; puede requerir nefrología. Las dosis estándar pueden acumularse.'});
  if (flags.ods && labs.sodium != null && labs.sodium < 135) alerts.push({level:'high',text:'Alto riesgo de desmielinización: objetivo habitual +4–6 mmol/L en 24 h y límite de +8 mmol/L en cualquier período de 24 h; cuenta la reposición de K y vigila la diuresis.'});
  if (labs.sodium != null && labs.sodium < 135 && labs.glucose > 100) alerts.push({level:'moderate',text:'Hiponatremia con hiperglucemia: revisa sodio corregido y tonicidad antes de diagnosticar hiponatremia hipotónica. El cálculo no sustituye el protocolo de crisis hiperglucémica.'});
  if (labs.potassium < 3.5 && labs.magnesium < 1.7 && labs.potassium != null && labs.magnesium != null) alerts.push({level:'moderate',text:'Hipopotasemia e hipomagnesemia simultáneas: corregir el déficit de Mg ayuda a evitar una hipopotasemia refractaria.'});
  if (labs.calcium != null && labs.ionized != null) {
    const totalDirection = labs.calcium < 8.5 ? -1 : labs.calcium > 10.5 ? 1 : 0;
    const ionDirection = labs.ionized < 1.12 ? -1 : labs.ionized > 1.32 ? 1 : 0;
    if (totalDirection !== ionDirection) alerts.push({level:'moderate',text:'Calcio total e ionizado discordantes: revisa albúmina, pH y calidad de la muestra. No indiques reposición solo por el calcio total.'});
  }
  return alerts;
}
