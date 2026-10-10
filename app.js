import { fields, parseValue, classify, correctedSodium, calculatedOsmolality, effectiveOsmolality, waterDeficit, clinicalAlerts } from './clinical.js';
import { protocols, references, evidenceStatus, getProtocol, getReference } from './protocols.js';

const icons = {
  grid:'<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
  book:'<path d="M12 5c-3-2-7-2-10-1v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1Z"/><path d="M12 5v15"/>',
  activity:'<path d="M2 12h4l3-8 6 16 3-8h4"/>',
  arrow:'<path d="M5 12h14m-5-5 5 5-5 5"/>',
  check:'<path d="m5 12 4 4L19 6"/>',
  alert:'<path d="m12 3 10 18H2L12 3Z"/><path d="M12 9v4m0 3v1"/>',
  flask:'<path d="M9 3h6m-5 0v6l-6 10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2L14 9V3M7 15h10"/>',
  search:'<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/>',
  external:'<path d="M14 3h7v7m0-7L10 14M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5"/>',
  print:'<path d="M6 9V3h12v6M6 17H3V9h18v8h-3M6 14h12v7H6Zm11-2h1"/>',
  copy:'<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V3H3v13h5"/>',
  close:'<path d="m6 6 12 12M6 18 18 6"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  heart:'<path d="M20 5c-3-3-6-1-8 1-2-2-5-4-8-1-4 4 0 8 8 15 8-7 12-11 8-15Z"/>'
};
const icon = (name, cls='') => `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.book}</svg>`;
const esc = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const state = { view:'evaluation', selected:null, filter:'Todos', query:'', raw:{}, flags:{}, duration:'unknown', factor:'0.5', results:null, labs:null, error:'', calculations:[] };
const $ = sel=>document.querySelector(sel);
const format = (n, digits=1)=>n.toLocaleString('es-MX',{minimumFractionDigits:digits,maximumFractionDigits:digits});
const refButtons = ids=>`<span class="citations">${ids.map(id=>`<button class="citation" data-ref="${id}" title="Ver referencia: ${esc(getReference(id).title)}">${getReference(id).year} ${icon('external')}</button>`).join('')}</span>`;

function shell() {
  $('#app').innerHTML = `
    <aside class="sidebar">
      <a class="brand" href="#evaluation" data-view="evaluation"><span class="brand-mark">${icon('activity')}</span><span>Medinterna<span class="brand-sub">HERRAMIENTAS CLÍNICAS</span></span></a>
      <div class="workspace-label">ESPACIO DE TRABAJO</div>
      <nav aria-label="Navegación principal">${[['evaluation','grid','Evaluación inicial'],['protocols','book','Protocolos clínicos'],['references','external','Bibliografía']].map(([view,i,label])=>`<button class="nav-item ${state.view===view?'active':''}" data-view="${view}" ${state.view===view?'aria-current="page"':''}>${icon(i)}<span>${label}</span>${view==='protocols'?'<span class="nav-count">10</span>':''}</button>`).join('')}</nav>
      <div class="sidebar-note"><span class="tiny-label">ALCANCE CLÍNICO</span><p>Adultos<br>Urgencias y hospitalización</p><span class="small muted">Apoyo al juicio clínico. Las dosis requieren contexto y protocolo local.</span></div>
      <div class="sidebar-bottom"><span class="version-dot"></span> Prototipo v0.1 <span>ES</span></div>
    </aside>
    <div class="workspace">
      <header class="topbar"><span>Medicina interna <span class="slash">/</span> Hidroelectrolitos</span><button class="review-pill" data-view="references">${icon('clock')} Bibliografía por cotejar</button></header>
      <main id="main" tabindex="-1"></main>
      <footer class="footer"><span>Medinterna · Algoritmos para adultos</span><span>Datos de la evaluación solo en esta sesión · Sin almacenamiento</span></footer>
    </div>`;
  renderMain();
}

function renderMain() {
  if (state.view==='evaluation') renderEvaluation();
  if (state.view==='protocols') state.selected ? renderProtocol() : renderLibrary();
  if (state.view==='references') renderReferences();
}

function heading(eyebrow, title, description, action='') {
  return `<div class="page-heading"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p>${description}</p></div>${action}</div>`;
}

function fieldInput(key) {
  const f=fields[key];
  return `<label class="field" for="${key}"><span class="field-label">${f.label}<span>${f.unit}</span></span><input id="${key}" name="${key}" type="text" inputmode="decimal" autocomplete="off" placeholder="${f.placeholder}" value="${esc(state.raw[key] || '')}" aria-describedby="${key}-hint"><span class="field-hint" id="${key}-hint">${f.normal ? `Referencia: ${f.normal}` : key==='bun'?'BUN, no urea total':key==='weight'?'Para estimar agua corporal':key==='measuredOsm'?'Para calcular brecha osmolar':'Para interpretar tonicidad'}</span></label>`;
}

function renderEvaluation() {
  $('#main').innerHTML = heading('EQUILIBRIO HIDROELECTROLÍTICO','De la clasificación al manejo.','Una evaluación estructurada, con algoritmos y fundamento bibliográfico.',`<button class="button secondary" data-action="demo">${icon('flask')} Cargar ejemplo ficticio</button>`) + `
    <div class="workflow"><div class="workflow-title">${icon('activity')} Ruta de evaluación</div>${['Estabilizar y ECG','Confirmar muestra y tonicidad','Clasificar y buscar causa','Tratar y reevaluar'].map((text,i)=>`<div class="workflow-step"><span>${i+1}</span>${text}</div>`).join('')}</div>
    <div class="scope-note">${icon('book')} <span><strong>Borrador para revisión clínica.</strong> Fuentes de 2023–2024 y documentos de fundamento anteriores. Actualización 2025–2026 pendiente. <button class="text-link" data-view="references">Ver estado de evidencia ${icon('arrow')}</button></span></div>
    <div class="evaluation-layout">
      <section class="card lab-card" aria-labelledby="lab-title">
        <div class="card-heading"><span class="section-icon">${icon('flask')}</span><div><h2 id="lab-title">Resultados y contexto</h2><p>Introduce solo los valores disponibles.</p></div><span class="label-chip">ADULTOS</span></div>
        <form id="evaluation-form" novalidate>
          <div class="fields-grid">${['sodium','potassium','calcium','ionized','magnesium','phosphate'].map(fieldInput).join('')}</div>
          <details class="additional-labs" ${['glucose','bun','weight','measuredOsm'].some(k=>state.raw[k])?'open':''}><summary>Datos para cálculos orientativos <span>Glucosa, BUN, peso y osmolalidad</span></summary><div class="fields-grid additional-grid">${['glucose','bun','weight','measuredOsm'].map(fieldInput).join('')}</div><label class="field" for="factor"><span class="field-label">Coeficiente de agua corporal estimada</span><select id="factor" name="factor">${[['0.45','0.45 · Mujer adulta mayor / menor proporción de agua'],['0.5','0.50 · Mujer adulta / varón adulto mayor'],['0.6','0.60 · Varón adulto']].map(([v,t])=>`<option value="${v}" ${state.factor===v?'selected':''}>${t}</option>`).join('')}</select><span class="field-hint">Estimación; composición corporal y deshidratación pueden reducirlo.</span></label></details>
          <div class="context-title">CONTEXTO QUE CAMBIA EL MANEJO</div>
          <div class="flags">${[['neuro','Síntomas neurológicos graves','Convulsiones, coma o deterioro marcado'],['ecg','Cambios en ECG o arritmia','Valoración inmediata, independientemente de la cifra'],['renal','Oliguria o eGFR <30 mL/min/1.73 m²','Ajustar líquidos y reposiciones'],['ods','Alto riesgo de desmielinización','Na ≤105, K bajo, desnutrición, alcohol o hepatopatía avanzada']].map(([key,title,hint])=>`<label class="flag"><input type="checkbox" name="${key}" ${state.flags[key]?'checked':''}><span><strong>${title}</strong><small>${hint}</small></span></label>`).join('')}</div>
          <label class="field duration-field" for="duration"><span class="field-label">Duración de la alteración del sodio</span><select name="duration" id="duration"><option value="unknown" ${state.duration==='unknown'?'selected':''}>Desconocida · Tratar como crónica</option><option value="chronic" ${state.duration==='chronic'?'selected':''}>Crónica · ≥48 horas</option><option value="acute" ${state.duration==='acute'?'selected':''}>Aguda · <48 horas documentadas</option></select><span class="field-hint">Duración desconocida: aplicar límites de corrección de la crónica.</span></label>
          <p id="form-error" class="form-error" role="alert">${esc(state.error)}</p>
          <div class="form-actions"><button class="button primary" type="submit">Evaluar resultados ${icon('arrow')}</button><button class="button ghost" type="button" data-action="reset">Limpiar</button></div>
          <p class="form-footnote">Intervalos orientativos; prevalecen el laboratorio, síntomas y contexto. La clasificación no es una prescripción.</p>
        </form>
      </section>
      <section id="results" class="results-column" aria-label="Resultados de la evaluación" aria-live="polite"></section>
    </div>
    <section class="quick-section"><div class="section-heading"><h2>Explorar protocolos</h2><button class="text-link" data-view="protocols">Ver los 10 protocolos ${icon('arrow')}</button></div><div class="quick-grid">${['hyponatremia','hyperkalemia','hypokalemia'].map(id=>{const p=getProtocol(id);return `<button class="quick-card" data-protocol="${id}"><span class="element-symbol ${p.family.toLowerCase()}">${p.symbol}</span><div><h3>${p.name}</h3><p>${p.range}</p></div>${icon('arrow')}</button>`;}).join('')}</div></section>`;
  renderResults();
}

function getCalculations(labs) {
  const out=[];
  const corr=correctedSodium(labs.sodium,labs.glucose);
  if (corr && labs.glucose >100) out.push({title:'Sodio corregido por hiperglucemia',value:`${format(corr.low)}–${format(corr.high)}`,unit:'mmol/L',formula:'Na medido + (1.6 a 2.4) × [(glucosa − 100) / 100]',note:'Rango estimado, no objetivo de tratamiento. El factor no es constante en todas las hiperglucemias.',refs:['hillier','hyperna2023']});
  const effective=effectiveOsmolality(labs.sodium,labs.glucose);
  if (effective!==null) out.push({title:'Osmolalidad efectiva estimada',value:format(effective),unit:'mOsm/kg',formula:'2 × Na + glucosa / 18',note:'Aproxima tonicidad; excluye BUN. Interpretar con la osmolalidad medida y solutos no incluidos.',refs:['naeu','hyperna2023']});
  const osm=calculatedOsmolality(labs.sodium,labs.glucose,labs.bun);
  if (osm!==null) out.push({title:'Osmolalidad calculada',value:format(osm),unit:'mOsm/kg',formula:'2 × Na + glucosa / 18 + BUN / 2.8',note:'Glucosa y BUN en mg/dL. No introducir urea total en lugar de BUN.',refs:['hyperna2023','naeu']});
  if (osm!==null && labs.measuredOsm!=null) out.push({title:'Brecha osmolar estimada',value:format(labs.measuredOsm-osm),unit:'mOsm/kg',formula:'Osmolalidad medida − calculada',note:'No diagnostica ni excluye una intoxicación por sí sola; depende de fórmula, tiempo y otros solutos.',refs:['naeu']});
  const water=waterDeficit(labs.sodium,labs.weight,Number(state.factor));
  if (water!==null) out.push({title:'Déficit de agua estimado',value:format(water,2),unit:'L',formula:`Peso × ${state.factor} × (Na / 140 − 1)`,note:'Estimación total hasta Na 140. No es una orden ni el volumen de las primeras 24 h; faltan pérdidas continuas y corrección de perfusión.',refs:['hyperna2023']});
  return out;
}

function renderResults() {
  const target=$('#results');
  if (!target) return;
  if (state.results===null) {
    target.innerHTML=`<div class="card empty-results"><span class="empty-icon">${icon('activity')}</span><span class="tiny-label">EVALUACIÓN ORIENTATIVA</span><h2>Un punto de partida claro.</h2><p>Introduce los resultados para identificar alteraciones, criterios de prioridad y protocolos relacionados.</p><div class="empty-list"><span>${icon('check')} Clasificación por electrolito</span><span>${icon('check')} Alertas según contexto</span><span>${icon('check')} Cálculos con supuestos explícitos</span><span>${icon('check')} Referencias por recomendación</span></div></div><div class="card emergency-note">${icon('alert')}<div><h3>Primero, la estabilidad clínica</h3><p>Ante convulsiones, arritmia, shock o compromiso respiratorio, activa la atención urgente. La herramienta no debe retrasarla.</p></div></div>`;
    return;
  }
  const alerts=clinicalAlerts(state.labs,state.flags);
  const severity={high:0,moderate:1,normal:2};
  const results=[...state.results].sort((a,b)=>severity[a.level]-severity[b.level]);
  const abnormal=results.filter(r=>r.level!=='normal').length;
  state.calculations=getCalculations(state.labs);
  target.innerHTML=`<div class="section-heading result-heading"><div><span class="tiny-label">EVALUACIÓN ACTUAL</span><h2>${!results.length ? 'Valoración por criterios clínicos · Sin electrolitos' : abnormal ? `${abnormal} resultado${abnormal===1?'':'s'} fuera de intervalo` : 'Sin alteraciones en valores introducidos'}</h2></div><button class="icon-button" data-action="copy" aria-label="Copiar resumen anónimo">${icon('copy')}</button></div>
    ${state.duration==='acute' && state.labs.sodium!=null && (state.labs.sodium<135 || state.labs.sodium>145)?'<div class="notice moderate">Duración aguda declarada: documenta el inicio. Esto no cambia automáticamente las metas ni prescribe una velocidad de corrección.</div>':''}
    ${alerts.map(a=>`<div class="notice ${a.level}">${icon('alert')}<p>${a.text}</p></div>`).join('')}
    ${results.map(r=>`<article class="card result-card ${r.level}"><div class="result-top"><span class="result-electrolyte">${fields[r.key].label}</span><span class="status-badge ${r.level}">${r.level==='high'?'Prioridad alta':r.level==='moderate'?'Evaluar contexto':'En intervalo'}</span></div><div class="result-number">${format(r.value,r.key==='ionized'?2:1)} <span>${r.unit}</span></div><h3>${r.label}</h3>${r.note?`<p>${r.note}</p>`:''}${r.protocol?`<button class="text-link" data-protocol="${r.protocol}">Abrir protocolo y fundamento ${icon('arrow')}</button>`:''}</article>`).join('')}
    ${state.calculations.length?`<div class="card calculator-card"><h2>${icon('flask')} Cálculos orientativos</h2>${state.calculations.map(c=>`<div class="calculation"><h3>${c.title}</h3><div class="calculation-value">${c.value}<span>${c.unit}</span></div><code>${c.formula}</code><p>${c.note}</p>${refButtons(c.refs)}</div>`).join('')}</div>`:''}
    <p class="results-footnote">Se evalúan solo los valores introducidos. Las banderas son criterios de valoración, no diagnósticos ni indicaciones automáticas.</p>`;
}

function evaluate() {
  state.error='';
  try {
    const labs=Object.fromEntries(Object.keys(fields).map(k=>[k,parseValue(state.raw[k],k)]));
    const results=classify(labs);
    if (!results.length && !Object.values(state.flags).some(Boolean)) throw new Error('Introduce al menos un electrolito o selecciona un criterio clínico.');
    state.results=results;
    state.labs=labs;
    renderResults();
  } catch(e) {
    state.error=e.message;
    state.results=null;
    state.labs=null;
    renderResults();
  }
  $('#form-error').textContent=state.error;
  if (state.error) $('#form-error').scrollIntoView({block:'nearest'});
}

function renderLibrary() {
  $('#main').innerHTML=heading('BIBLIOTECA CLÍNICA','Protocolos de manejo','Diez algoritmos: clasificación, diagnóstico, tratamiento y seguimiento.')+`
    <div class="library-toolbar"><label class="search-input">${icon('search')}<input id="protocol-search" type="search" placeholder="Buscar alteración, causa o tratamiento…" aria-label="Buscar protocolos" value="${esc(state.query)}"></label><div class="filter-tabs" aria-label="Filtrar por electrolito">${['Todos','Sodio','Potasio','Calcio','Magnesio','Fósforo'].map(f=>`<button data-filter="${f}" class="${state.filter===f?'selected':''}" aria-pressed="${state.filter===f}">${f}</button>`).join('')}</div></div>
    <div class="scope-note">${icon('clock')} <span>Contenido de apoyo pendiente de cotejo bibliográfico y revisión institucional. <button class="text-link" data-view="references">Consultar evidencia</button></span></div><div id="protocol-grid" class="protocol-grid"></div>`;
  renderProtocolGrid();
}

function renderProtocolGrid() {
  const query=state.query.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  const list=protocols.filter(p=>{
    const text=JSON.stringify(p).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
    return (state.filter==='Todos'||p.family===state.filter)&&(!query||text.includes(query));
  });
  $('#protocol-grid').innerHTML=list.length?list.map(p=>`<button class="card protocol-card" data-protocol="${p.id}"><div class="protocol-card-top"><span class="element-symbol ${p.family.toLowerCase()}">${p.symbol}</span><span class="small muted">${p.family}</span></div><h2>${p.name}</h2><p>${p.summary}</p><div class="protocol-card-footer"><span>${p.range}</span>${icon('arrow')}</div></button>`).join(''):'<div class="card no-results">No hay protocolos para esa búsqueda. Prueba otro término o cambia el filtro.</div>';
}

function renderProtocol() {
  const p=getProtocol(state.selected);
  if (!p) {state.selected=null;renderLibrary();return;}
  $('#main').innerHTML=`<div class="protocol-nav"><button class="text-link" data-action="back">← Todos los protocolos</button><button class="button secondary" data-action="print">${icon('print')} Imprimir protocolo</button></div>`+heading(`${p.family.toUpperCase()} · ALGORITMO PARA ADULTOS`,p.name,p.summary)+`
    <div class="protocol-urgency">${icon('alert')}<div><strong>Criterios de atención urgente</strong><p>${p.urgency}</p></div></div>
    <p class="protocol-draft">Borrador clínico. Fuentes pendientes de cotejo; las dosis son pautas de referencia, sujetas a función renal, presentación y protocolo institucional.</p>
    <div class="protocol-detail-layout"><section class="algorithm" aria-label="Algoritmo clínico">${p.steps.map((s,i)=>`<article class="card algorithm-step"><div class="step-number">${String(i+1).padStart(2,'0')}</div><div class="step-content"><h2>${s.title}</h2><ul>${s.items.map(item=>`<li>${item}</li>`).join('')}</ul><div class="rationale"><span class="tiny-label">FUNDAMENTO</span><p>${s.rationale}</p>${refButtons(s.refs)}</div></div></article>`).join('')}</section>
    <aside class="protocol-aside"><div class="card classification-card"><h2>Clasificación</h2><div class="range-label">${p.range}</div>${p.classification.map(([label,value])=>`<div class="classification-row"><strong>${label}</strong><span>${value}</span></div>`).join('')}</div><div class="card pitfalls-card"><h2>Evitar estos errores</h2><ul>${p.pitfalls.map(s=>`<li>${s}</li>`).join('')}</ul></div><div class="card protocol-sources"><h2>Fuentes de este algoritmo</h2>${p.refs.map(id=>{const r=getReference(id);return `<button class="source-mini" data-ref="${id}"><span>${r.year}</span><strong>${r.title}</strong>${icon('external')}</button>`;}).join('')}<p class="small muted">Consulta directa y actualización 2025–2026 pendientes.</p></div></aside></div><section class="print-references"><h2>Referencias del protocolo · Cotejo pendiente</h2><ol>${p.refs.map(id=>{const r=getReference(id);return `<li>${r.authors} ${r.title}. ${r.journal}; ${r.year}. <a href="${r.url}">${r.url}</a></li>`;}).join('')}</ol></section>`;
}

function renderReferences() {
  $('#main').innerHTML=heading('EVIDENCIA Y TRAZABILIDAD','Bibliografía clínica','Cada algoritmo enlaza las fuentes que sustentan sus decisiones.')+`
    <section class="evidence-note"><span class="section-icon amber">${icon('clock')}</span><div><h2>${evidenceStatus.label}</h2><p>${evidenceStatus.detail}</p><p>Antes de adoptar estos algoritmos, cotejar texto completo, versiones y dosis con las fuentes originales, y completar revisión clínica y farmacéutica local. La antigüedad por sí sola no confirma ni descarta vigencia.</p></div></section>
    <div class="reference-stats"><div><strong>${references.length}</strong><span>Fuentes identificadas</span></div><div><strong>${references.filter(r=>r.year>=2023).length}</strong><span>Publicadas en 2023–2024</span></div><div><strong>10</strong><span>Algoritmos con referencias</span></div><div><strong>Pendiente</strong><span>Cotejo web y actualización</span></div></div>
    <div class="reference-list">${references.map((r,i)=>`<article class="card reference-card"><span class="reference-number">${String(i+1).padStart(2,'0')}</span><div><div class="reference-meta"><span class="year-badge">${r.year}</span><span>${r.journal}</span></div><h2>${r.title}</h2><p class="reference-authors">${r.authors}</p><p>${r.scope}</p><div class="reference-bottom"><span class="verification-pending">Cotejo de texto/versión pendiente</span><a href="${r.url}" target="_blank" rel="noopener noreferrer">Fuente original ${icon('external')}</a></div></div></article>`).join('')}</div>`;
}

function showSource(id) {
  const r=getReference(id);
  if (!r) return;
  const d=$('#source-dialog');
  d.innerHTML=`<div class="dialog-top"><span class="tiny-label">REFERENCIA BIBLIOGRÁFICA · ${r.year}</span><button class="icon-button" data-action="close-source" aria-label="Cerrar referencia">${icon('close')}</button></div><h2 id="source-title">${r.title}</h2><p>${r.authors}</p><p class="muted">${r.journal}</p><div class="source-scope"><strong>Qué fundamenta</strong><p>${r.scope}</p></div><p class="verification-note">Cotejo directo del texto y vigencia pendientes. No se ha confirmado cobertura de cambios de 2025–2026.</p><a class="button primary" href="${r.url}" target="_blank" rel="noopener noreferrer">Abrir fuente original ${icon('external')}</a>`;
  d.showModal();
}

function navigate(view, selected=null) {
  state.view=view;
  state.selected=selected;
  history.replaceState(null,'',`#${selected || view}`);
  shell();
  window.scrollTo({top:0,behavior:'instant'});
  $('#main').focus({preventScroll:true});
}

function summaryText() {
  const flags=Object.entries(state.flags).filter(([,v])=>v).map(([k])=>({neuro:'Síntomas neurológicos graves',ecg:'Cambios en ECG/arritmia',renal:'Oliguria/eGFR <30',ods:'Alto riesgo de desmielinización'}[k]));
  const alerts=clinicalAlerts(state.labs,state.flags);
  return ['MEDINTERNA · Evaluación anónima de apoyo (borrador clínico)', 'Adultos, urgencias y hospitalización. No es una prescripción.', '',
    ...Object.entries(state.labs).filter(([,v])=>v!=null).map(([k,v])=>`${fields[k].label}: ${v} ${fields[k].unit}`),
    `Duración de alteración de Na: ${{unknown:'desconocida',acute:'<48 h documentadas',chronic:'≥48 h'}[state.duration]}`,
    ...(flags.length?['Contexto: '+flags.join('; ')]:[]),'',
    ...state.results.map(r=>`${fields[r.key].label}: ${r.label}. ${r.note}`),'',
    ...alerts.map(a=>`ALERTA: ${a.text}`),'',
    ...state.calculations.map(c=>`${c.title}: ${c.value} ${c.unit}. ${c.formula}. ${c.note}`),'',
    'Protocolos relacionados:',...([...new Set(state.results.map(r=>r.protocol).filter(Boolean))].map(id=>{
      const p=getProtocol(id);return `${p.name}: ${p.refs.map(rid=>`${getReference(rid).title} (${getReference(rid).year}) — ${getReference(rid).url}`).join('; ')}`;
    })), '', evidenceStatus.detail].join('\n');
}

let toastTimer;
function toast(text) {$('#toast').textContent=text;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),3500);}

document.addEventListener('click',async e=>{
  const b=e.target.closest('[data-view],[data-protocol],[data-filter],[data-ref],[data-action]');
  if (!b) return;
  if (b.dataset.view) {e.preventDefault();navigate(b.dataset.view);return;}
  if (b.dataset.protocol) {navigate('protocols',b.dataset.protocol);return;}
  if (b.dataset.ref) {showSource(b.dataset.ref);return;}
  if (b.dataset.filter) {state.filter=b.dataset.filter;renderLibrary();return;}
  const action=b.dataset.action;
  if (action==='close-source') $('#source-dialog').close();
  if (action==='back') navigate('protocols');
  if (action==='print') window.print();
  if (action==='reset') {state.raw={};state.flags={};state.results=null;state.labs=null;state.error='';state.duration='unknown';state.factor='0.5';renderEvaluation();}
  if (action==='demo') {state.raw={sodium:'126',potassium:'2.9',magnesium:'1.3',glucose:'100',bun:'16',weight:'70'};state.flags={};state.duration='unknown';state.results=null;state.error='';renderEvaluation();evaluate();toast('Ejemplo ficticio cargado. No corresponde a un paciente real.');}
  if (action==='copy' && state.results!==null) {
    try {await navigator.clipboard.writeText(summaryText());toast('Resumen anónimo copiado con referencias.');}
    catch {toast('El navegador no permitió copiar. Usa la impresión del protocolo.');}
  }
});
document.addEventListener('submit',e=>{if (e.target.id==='evaluation-form') {e.preventDefault();evaluate();}});
document.addEventListener('input',e=>{
  if (e.target.id==='protocol-search') {state.query=e.target.value;renderProtocolGrid();return;}
  if (e.target.closest('#evaluation-form')) {
    const input=e.target;
    if (input.name in fields) state.raw[input.name]=input.value;
    else if (['neuro','ecg','renal','ods'].includes(input.name)) state.flags[input.name]=input.checked;
    else if (input.name==='duration') state.duration=input.value;
    else if (input.name==='factor') state.factor=input.value;
    state.results=null;state.labs=null;state.error='';
    $('#form-error').textContent='';renderResults();
  }
});
$('#source-dialog').addEventListener('click',e=>{if (e.target===$('#source-dialog')) {const r=e.target.getBoundingClientRect();if (e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}});
const initial=location.hash.slice(1);
if (getProtocol(initial)) {state.view='protocols';state.selected=initial;}
else if (['evaluation','protocols','references'].includes(initial)) state.view=initial;
shell();
