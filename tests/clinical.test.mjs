import test from 'node:test';
import assert from 'node:assert/strict';
import { parseValue, classify, correctedSodium, calculatedOsmolality, effectiveOsmolality, waterDeficit, clinicalAlerts } from '../clinical.js';
import { protocols, references } from '../protocols.js';

test('Blank results remain missing; comma decimal and zero are not silently confused',()=>{
  assert.equal(parseValue('', 'potassium'),null);
  assert.equal(parseValue('  ', 'sodium'),null);
  assert.equal(parseValue('2,9', 'potassium'),2.9);
  for (const bad of ['0','-1','Infinity','NaN','1e2','2.9 mEq/L','<2','20']) assert.throws(()=>parseValue(bad,'potassium'));
  assert.deepEqual(classify({sodium:null,potassium:null}),[]);
});

test('Critical K boundaries trigger appropriate urgency, including 2.5 and 6.5',()=>{
  assert.equal(classify({potassium:2.5})[0].level,'high');
  assert.equal(classify({potassium:2.6})[0].level,'moderate');
  assert.equal(classify({potassium:3.5})[0].level,'normal');
  assert.equal(classify({potassium:5})[0].level,'normal');
  assert.equal(classify({potassium:5.3})[0].label,'Potasio sobre el intervalo');
  assert.equal(classify({potassium:5.5})[0].label,'Hiperpotasemia leve');
  assert.equal(classify({potassium:6})[0].level,'high');
  assert.equal(classify({potassium:6.5})[0].label,'Hiperpotasemia grave');
});

test('Sodium classification uses measured values; normal endpoints are inclusive',()=>{
  assert.equal(classify({sodium:124.9})[0].label,'Hiponatremia profunda');
  assert.equal(classify({sodium:125})[0].label,'Hiponatremia moderada');
  assert.equal(classify({sodium:130})[0].label,'Hiponatremia leve');
  assert.equal(classify({sodium:135})[0].level,'normal');
  assert.equal(classify({sodium:145})[0].level,'normal');
  assert.equal(classify({sodium:155})[0].label,'Hipernatremia moderada');
  assert.equal(classify({sodium:155.1})[0].level,'high');
});

test('Severe phosphorus and magnesium thresholds retain correct units',()=>{
  assert.equal(classify({phosphate:0.9})[0].level,'high');
  assert.equal(classify({phosphate:1})[0].level,'moderate');
  assert.equal(classify({magnesium:1.1})[0].level,'high');
  assert.equal(classify({magnesium:1.2})[0].level,'moderate');
  assert.equal(classify({magnesium:6})[0].protocol,'hypermagnesemia');
  assert.equal(classify({magnesium:6})[0].level,'high');
});

test('Normal available electrolytes do not produce a treatment recommendation',()=>{
  const list=classify({sodium:140,potassium:4,calcium:9.2,ionized:1.2,magnesium:2,phosphate:3.5});
  assert.equal(list.length,6);
  assert.ok(list.every(r=>r.protocol===null&&r.level==='normal'));
});

test('Calcium total and ionized discordance prompts clinical interpretation',()=>{
  const alerts=clinicalAlerts({calcium:7.4,ionized:1.2},{});
  assert.ok(alerts.some(a=>a.text.includes('discordantes')));
  assert.ok(classify({calcium:7.4})[0].note.includes('sin ajustar'));
});

test('Hyperglycemic sodium estimate presents both factors without overwriting measured sodium',()=>{
  assert.deepEqual(correctedSodium(125,500),{low:131.4,high:134.6});
  assert.deepEqual(correctedSodium(140,80),{low:140,high:140});
  assert.equal(correctedSodium(null,500),null);
  assert.equal(correctedSodium(125,null),null);
  assert.equal(classify({sodium:125,glucose:500})[0].value,125);
  assert.ok(clinicalAlerts({sodium:125,glucose:500},{}).some(a=>a.text.includes('hiperglucemia')));
});

test('Effective osmolality excludes BUN; total osmolality includes BUN in mg/dL',()=>{
  assert.equal(effectiveOsmolality(140,90),285);
  assert.equal(calculatedOsmolality(140,90,14),290);
  assert.equal(calculatedOsmolality(140,90,null),null);
  assert.equal(effectiveOsmolality(null,90),null);
});

test('Water deficit is an estimate for hypernatremia, never negative or a normal-sodium dose',()=>{
  assert.ok(Math.abs(waterDeficit(160,70,0.5)-5)<1e-10);
  assert.equal(waterDeficit(140,70,0.5),null);
  assert.equal(waterDeficit(130,70,0.5),null);
  assert.equal(waterDeficit(160,null,0.5),null);
  assert.equal(waterDeficit(160,70,2),null);
});

test('Severe clinical symptoms remain urgent without available laboratory values',()=>{
  assert.ok(clinicalAlerts({}, {neuro:true}).some(a=>a.level==='high'));
  assert.ok(clinicalAlerts({potassium:4}, {ecg:true}).some(a=>a.level==='high'));
  assert.ok(clinicalAlerts({sodium:110}, {ods:true}).some(a=>a.text.includes('+8')));
});

test('Low K with missing Mg does not fabricate a combined deficit',()=>{
  assert.ok(!clinicalAlerts({potassium:2.9,magnesium:null},{}).some(a=>a.text.includes('simultáneas')));
  assert.ok(clinicalAlerts({potassium:2.9,magnesium:1.3},{}).some(a=>a.text.includes('simultáneas')));
});

test('Every management and rationale step has a resolvable bibliography link',()=>{
  const ids=new Set(references.map(r=>r.id));
  assert.equal(ids.size,references.length);
  assert.equal(new Set(protocols.map(p=>p.id)).size,10);
  for(const p of protocols) {
    for (const s of p.steps) {
      assert.ok(s.refs.length>0,`${p.id}/${s.title}`);
      assert.ok(s.rationale.length>0);
      assert.ok(s.refs.every(id=>ids.has(id)),p.id);
    }
  }
  for(const r of references) assert.equal(new URL(r.url).protocol,'https:');
});
