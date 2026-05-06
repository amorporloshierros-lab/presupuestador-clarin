import { useState, useMemo, useCallback } from 'react';
import { RUBROS, MODELOS } from './data/rubros.js';
import { COEF, TIPOS_OBRA } from './data/coeficientes.js';
import { CALIDAD, NIVELES, MULT } from './data/calidad.js';
import { calcularObra, agruparPorRubro, calcularTotales, recalcularLinea, costoM2 } from './engine/calcular.js';

// ── Utilidades ───────────────────────────────────────────────
const fmt$ = v => '$ ' + Math.round(v).toLocaleString('es-AR');
const fmtN = v => (+v).toLocaleString('es-AR', { maximumFractionDigits: 2 });

// ── Estilos inline base ───────────────────────────────────────
const S = {
  app:      { fontFamily:'Inter,system-ui,sans-serif', background:'#f1f5f9', minHeight:'100vh', color:'#1e293b' },
  header:   { background:'#0f172a', color:'#fff', padding:'16px 32px', display:'flex', alignItems:'center', gap:16 },
  logo:     { fontSize:22, fontWeight:800, letterSpacing:'-0.5px' },
  subtitle: { fontSize:12, color:'#94a3b8', marginTop:2 },
  main:     { maxWidth:1400, margin:'0 auto', padding:'24px 16px', display:'grid', gridTemplateColumns:'320px 1fr', gap:20, alignItems:'start' },
  card:     { background:'#fff', borderRadius:12, padding:20, boxShadow:'0 1px 4px rgba(0,0,0,.08)' },
  label:    { fontSize:12, fontWeight:600, color:'#475569', marginBottom:4, display:'block', textTransform:'uppercase', letterSpacing:'.5px' },
  select:   { width:'100%', padding:'8px 10px', border:'1px solid #e2e8f0', borderRadius:8, fontSize:14, background:'#fff', outline:'none', marginBottom:12, boxSizing:'border-box' },
  input:    { width:'100%', padding:'8px 10px', border:'1px solid #e2e8f0', borderRadius:8, fontSize:14, outline:'none', marginBottom:12, boxSizing:'border-box' },
  btn:      (c='#3b82f6') => ({ background:c, color:'#fff', border:'none', borderRadius:8, padding:'10px 20px', fontWeight:700, fontSize:14, cursor:'pointer', width:'100%', marginTop:4 }),
  chip:     (active,c='#3b82f6') => ({ display:'inline-flex', alignItems:'center', gap:4, padding:'4px 12px', borderRadius:20, fontSize:12, fontWeight:600, cursor:'pointer', border:`1.5px solid ${active?c:'#e2e8f0'}`, background:active?c+'18':'#f8fafc', color:active?c:'#64748b', margin:'0 4px 4px 0', userSelect:'none' }),
  rubroHdr: { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 14px', background:'#f8fafc', borderRadius:8, cursor:'pointer', marginBottom:4, border:'1px solid #e2e8f0' },
  tbl:      { width:'100%', borderCollapse:'collapse', fontSize:13 },
  th:       { textAlign:'left', padding:'6px 8px', background:'#f1f5f9', color:'#64748b', fontWeight:600, fontSize:11, textTransform:'uppercase' },
  td:       { padding:'6px 8px', borderBottom:'1px solid #f1f5f9' },
  tdNum:    { padding:'6px 8px', borderBottom:'1px solid #f1f5f9', textAlign:'right', fontVariantNumeric:'tabular-nums' },
  editCell: { background:'none', border:'none', borderBottom:'1.5px solid #3b82f6', padding:'0 2px', width:'70px', fontSize:13, textAlign:'right', outline:'none' },
  badge:    (c) => ({ background:c+'22', color:c, fontSize:11, fontWeight:700, padding:'2px 8px', borderRadius:20 }),
  total:    { display:'flex', justifyContent:'space-between', padding:'10px 14px', borderTop:'2px solid #e2e8f0', marginTop:8, fontWeight:700 },
  kpi:      { background:'#0f172a', color:'#fff', borderRadius:12, padding:'16px 20px', textAlign:'center' },
};

// ── Celda editable ────────────────────────────────────────────
function EditCell({ value, onChange }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value);
  if (editing) return (
    <input style={S.editCell} autoFocus value={val}
      onChange={e => setVal(e.target.value)}
      onBlur={() => { setEditing(false); const n = parseFloat(val); if (!isNaN(n)) onChange(n); else setVal(value); }}
      onKeyDown={e => { if (e.key==='Enter') e.target.blur(); if (e.key==='Escape') { setEditing(false); setVal(value); } }}
    />
  );
  return <span style={{ cursor:'pointer', borderBottom:'1px dashed #94a3b8' }} onDoubleClick={()=>setEditing(true)} title="Doble clic para editar">{fmtN(value)}</span>;
}

// ── Panel lateral: datos de la obra ──────────────────────────
function PanelObra({ datos, onChange }) {
  const mod = MODELOS.find(m => m.tipo === datos.tipoObra);
  return (
    <div style={S.card}>
      <div style={{ fontWeight:800, fontSize:16, marginBottom:16 }}>📋 Datos de la obra</div>

      <label style={S.label}>Tipo de obra</label>
      <select style={S.select} value={datos.tipoObra} onChange={e=>onChange('tipoObra',e.target.value)}>
        {TIPOS_OBRA.map(t=><option key={t.id} value={t.id}>{t.label}</option>)}
      </select>

      {mod && <div style={{ fontSize:12, color:'#64748b', marginTop:-8, marginBottom:12, lineHeight:1.5, background:'#f8fafc', padding:'8px 10px', borderRadius:8 }}>
        Referencia: <strong>{fmt$(mod.costoM2)}/m²</strong> · var. mensual: +{(mod.varMes*100).toFixed(2)}%
      </div>}

      <label style={S.label}>Nivel de calidad</label>
      <div style={{ display:'flex', gap:6, marginBottom:12, flexWrap:'wrap' }}>
        {NIVELES.map(n => {
          const c = CALIDAD[n];
          return <div key={n} style={S.chip(datos.calidad===n, c.color)} onClick={()=>onChange('calidad',n)}>
            {c.label}
          </div>;
        })}
      </div>
      <div style={{ fontSize:11, color:'#64748b', marginBottom:12 }}>{CALIDAD[datos.calidad]?.desc}</div>

      <label style={S.label}>Superficie cubierta (m²)</label>
      <input style={S.input} type="number" min="1" value={datos.m2} onChange={e=>onChange('m2',+e.target.value)} />

      <label style={S.label}>Cantidad de baños</label>
      <input style={S.input} type="number" min="1" max="10" value={datos.nBanos} onChange={e=>onChange('nBanos',+e.target.value)} />

      <label style={S.label}>Locales húmedos (cocinas)</label>
      <input style={S.input} type="number" min="1" max="5" value={datos.nLocales} onChange={e=>onChange('nLocales',+e.target.value)} />

      <label style={S.label}>Duración estimada (meses)</label>
      <input style={S.input} type="number" min="1" max="60" value={datos.nMeses} onChange={e=>onChange('nMeses',+e.target.value)} />

      <div style={{ borderTop:'1px solid #f1f5f9', paddingTop:12, marginTop:4 }}>
        <div style={S.label}>Rubros disponibles (33)</div>
        <div style={{ fontSize:12, color:'#64748b', lineHeight:1.6 }}>
          {Object.entries(RUBROS).map(([k,r])=>(
            <span key={k} style={{ display:'inline-block', margin:'1px 3px', color:'#475569' }}>
              <strong>{k}</strong> · {r.nombre.split(' ').slice(0,3).join(' ')}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Fila de ítem de rubro ─────────────────────────────────────
function FilaItem({ linea, onUpdate, onDelete }) {
  return (
    <tr style={{ background: linea.editado ? '#fffbeb' : 'white' }}>
      <td style={{ ...S.td, color:'#94a3b8', fontSize:11 }}>{linea.itemId}</td>
      <td style={S.td}>{linea.desc}{linea.notas&&<span style={{ color:'#94a3b8', fontSize:11 }}> — {linea.notas}</span>}</td>
      <td style={{ ...S.tdNum, color:'#64748b' }}>{linea.u}</td>
      <td style={S.tdNum}>
        <EditCell value={linea.cant} onChange={v=>onUpdate({ ...linea, cant:v, subtotal:Math.round(v*(linea.precioUnit||0)), editado:true })} />
      </td>
      <td style={S.tdNum}>
        <EditCell value={linea.precioUnit} onChange={v=>onUpdate({ ...linea, precioUnit:v, subtotal:Math.round((linea.cant||0)*v), editado:true })} />
      </td>
      <td style={{ ...S.tdNum, fontWeight:700 }}>{fmt$(linea.subtotal||0)}</td>
      <td style={S.td}>
        <span style={{ cursor:'pointer', color:'#ef4444', fontSize:16 }} onClick={()=>onDelete(linea.id)} title="Eliminar">×</span>
      </td>
    </tr>
  );
}

// ── Bloque de un rubro ────────────────────────────────────────
function BloqueRubro({ grupo, onUpdate, onDelete, onAgregarItem }) {
  const [abierto, setAbierto] = useState(true);
  const [agregando, setAgregando] = useState(false);
  const [nuevaLinea, setNuevaLinea] = useState({ itemId:'', desc:'', u:'m²', cant:1, precioUnit:0 });

  const colores = ['#3b82f6','#10b981','#f59e0b','#8b5cf6','#ef4444','#06b6d4','#ec4899','#84cc16'];
  const color = colores[(parseInt(grupo.rubro,10)-1) % colores.length];

  return (
    <div style={{ marginBottom:8, border:'1px solid #e2e8f0', borderRadius:10, overflow:'hidden' }}>
      <div style={{ ...S.rubroHdr, border:'none', borderRadius:0, background: abierto?'#f8fafc':'#fff' }} onClick={()=>setAbierto(a=>!a)}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ ...S.badge(color), fontSize:13, padding:'3px 10px' }}>{grupo.rubro}</span>
          <span style={{ fontWeight:700, fontSize:14 }}>{grupo.nombre}</span>
          <span style={{ fontSize:12, color:'#94a3b8' }}>{grupo.lineas.length} ítems</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <span style={{ fontWeight:800, fontSize:15 }}>{fmt$(grupo.total)}</span>
          <span style={{ fontSize:18, color:'#94a3b8' }}>{abierto?'▾':'▸'}</span>
        </div>
      </div>

      {abierto && (
        <div style={{ padding:'0 2px 8px' }}>
          <table style={S.tbl}>
            <thead>
              <tr>
                <th style={{ ...S.th, width:60 }}>Ítem</th>
                <th style={S.th}>Descripción</th>
                <th style={{ ...S.th, width:50 }}>Unid</th>
                <th style={{ ...S.th, width:80, textAlign:'right' }}>Cant.</th>
                <th style={{ ...S.th, width:110, textAlign:'right' }}>Precio u.</th>
                <th style={{ ...S.th, width:120, textAlign:'right' }}>Subtotal</th>
                <th style={{ width:24 }}></th>
              </tr>
            </thead>
            <tbody>
              {grupo.lineas.map(l => (
                <FilaItem key={l.id} linea={l} onUpdate={onUpdate} onDelete={onDelete} />
              ))}
              {agregando && (
                <tr style={{ background:'#f0fdf4' }}>
                  <td style={S.td}>
                    <input style={{ ...S.editCell, width:60 }} placeholder="33.01" value={nuevaLinea.itemId} onChange={e=>setNuevaLinea(p=>({...p,itemId:e.target.value}))} />
                  </td>
                  <td style={S.td}>
                    <input style={{ ...S.editCell, width:220 }} placeholder="Descripción del ítem" value={nuevaLinea.desc} onChange={e=>setNuevaLinea(p=>({...p,desc:e.target.value}))} />
                  </td>
                  <td style={S.td}>
                    <input style={{ ...S.editCell, width:40 }} value={nuevaLinea.u} onChange={e=>setNuevaLinea(p=>({...p,u:e.target.value}))} />
                  </td>
                  <td style={S.td}>
                    <input style={S.editCell} type="number" value={nuevaLinea.cant} onChange={e=>setNuevaLinea(p=>({...p,cant:+e.target.value}))} />
                  </td>
                  <td style={S.td}>
                    <input style={S.editCell} type="number" value={nuevaLinea.precioUnit} onChange={e=>setNuevaLinea(p=>({...p,precioUnit:+e.target.value}))} />
                  </td>
                  <td style={{ ...S.tdNum, fontWeight:700 }}>{fmt$(nuevaLinea.cant*nuevaLinea.precioUnit)}</td>
                  <td style={S.td}>
                    <span style={{ cursor:'pointer', color:'#10b981', fontWeight:700, marginRight:6 }} onClick={()=>{
                      onAgregarItem({ ...nuevaLinea, rubro:grupo.rubro, id:`manual_${Date.now()}`, subtotal:nuevaLinea.cant*nuevaLinea.precioUnit, editable:true });
                      setAgregando(false); setNuevaLinea({ itemId:'', desc:'', u:'m²', cant:1, precioUnit:0 });
                    }}>✓</span>
                    <span style={{ cursor:'pointer', color:'#ef4444' }} onClick={()=>setAgregando(false)}>×</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div style={{ paddingLeft:8, marginTop:4 }}>
            <span style={{ fontSize:12, color:color, cursor:'pointer', fontWeight:600 }} onClick={()=>setAgregando(true)}>+ Agregar ítem manual</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Selector de ítems del catálogo ───────────────────────────
function ModalCatalogo({ onAgregar, onCerrar }) {
  const [busqueda, setBusqueda] = useState('');
  const [rubroFiltro, setRubroFiltro] = useState('');
  const todos = useMemo(() => {
    const arr = [];
    Object.entries(RUBROS).forEach(([rk,r]) => r.items.forEach(it => arr.push({ ...it, rubro:rk, nombreRubro:r.nombre })));
    return arr;
  }, []);
  const filtrados = todos.filter(i =>
    (!rubroFiltro || i.rubro===rubroFiltro) &&
    (!busqueda || i.desc.toLowerCase().includes(busqueda.toLowerCase()) || i.id.includes(busqueda))
  );
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.5)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ background:'#fff', borderRadius:16, width:760, maxHeight:'80vh', display:'flex', flexDirection:'column', overflow:'hidden' }}>
        <div style={{ padding:'16px 20px', borderBottom:'1px solid #e2e8f0', display:'flex', gap:12, alignItems:'center' }}>
          <span style={{ fontWeight:800, fontSize:16, flex:1 }}>📖 Catálogo de ítems — ARQ Clarín Mayo 2026</span>
          <span style={{ cursor:'pointer', fontSize:20, color:'#94a3b8' }} onClick={onCerrar}>×</span>
        </div>
        <div style={{ padding:'12px 20px', display:'flex', gap:10, borderBottom:'1px solid #f1f5f9' }}>
          <input style={{ ...S.input, marginBottom:0, flex:1 }} placeholder="Buscar ítem..." value={busqueda} onChange={e=>setBusqueda(e.target.value)} />
          <select style={{ ...S.select, marginBottom:0, width:200 }} value={rubroFiltro} onChange={e=>setRubroFiltro(e.target.value)}>
            <option value="">Todos los rubros</option>
            {Object.entries(RUBROS).map(([k,r])=><option key={k} value={k}>{k} — {r.nombre}</option>)}
          </select>
        </div>
        <div style={{ overflow:'auto', flex:1 }}>
          <table style={S.tbl}>
            <thead><tr>
              <th style={S.th}>Ítem</th>
              <th style={S.th}>Rubro</th>
              <th style={S.th}>Descripción</th>
              <th style={{ ...S.th, textAlign:'right' }}>Precio</th>
              <th style={S.th}>U.</th>
              <th style={S.th}></th>
            </tr></thead>
            <tbody>
              {filtrados.slice(0,200).map(i=>(
                <tr key={i.id} style={{ cursor:'pointer' }} onDoubleClick={()=>onAgregar(i)}>
                  <td style={{ ...S.td, color:'#94a3b8', fontSize:11 }}>{i.id}</td>
                  <td style={{ ...S.td, fontSize:11, color:'#64748b' }}>{i.rubro}</td>
                  <td style={S.td}>{i.desc}</td>
                  <td style={S.tdNum}>{fmt$(i.precio)}</td>
                  <td style={{ ...S.td, color:'#64748b' }}>{i.u}</td>
                  <td style={S.td}>
                    <span style={{ cursor:'pointer', color:'#3b82f6', fontWeight:700 }} onClick={()=>onAgregar(i)}>+ Agregar</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding:'10px 20px', borderTop:'1px solid #f1f5f9', fontSize:12, color:'#94a3b8' }}>
          {filtrados.length} ítems — doble clic o "Agregar" para incluir en el presupuesto
        </div>
      </div>
    </div>
  );
}

// ── App principal ─────────────────────────────────────────────
export default function App() {
  const [datos, setDatos] = useState({ tipoObra:'vivienda_nueva', calidad:'estandar', m2:100, nBanos:2, nLocales:1, nMeses:6 });
  const [lineas, setLineas] = useState(null);   // null = sin calcular aún
  const [showCatalogo, setShowCatalogo] = useState(false);
  const [tabActiva, setTabActiva] = useState('presupuesto');

  const cambiarDato = (k,v) => setDatos(p=>({...p,[k]:v}));

  const calcular = () => {
    const ls = calcularObra({ tipoObra:datos.tipoObra, m2:datos.m2, nBanos:datos.nBanos, nLocales:datos.nLocales, nMeses:datos.nMeses, calidad:datos.calidad });
    setLineas(ls);
    setTabActiva('presupuesto');
  };

  const actualizarLinea = useCallback(linea => {
    setLineas(prev => prev.map(l => l.id===linea.id ? linea : l));
  }, []);

  const eliminarLinea = useCallback(id => {
    setLineas(prev => prev.filter(l => l.id !== id));
  }, []);

  const agregarLinea = useCallback(linea => {
    setLineas(prev => [...(prev||[]), { ...linea, id:`add_${Date.now()}` }]);
  }, []);

  const agregarDesdesCatalogo = (item) => {
    agregarLinea({ rubro:item.rubro, itemId:item.id, desc:item.desc, u:item.u, cant:1, precioUnit:item.precio, subtotal:item.precio, notas:item.notas||'' });
  };

  const grupos = useMemo(() => lineas ? agruparPorRubro(lineas) : [], [lineas]);
  const totales = useMemo(() => lineas ? calcularTotales(lineas) : null, [lineas]);
  const cxm2 = lineas ? costoM2(lineas, datos.m2) : 0;

  const TABS = [
    { id:'presupuesto', label:'📋 Presupuesto' },
    { id:'resumen',     label:'💰 Resumen'     },
    { id:'catalogo_ref',label:'📖 Catálogo'     },
  ];

  return (
    <div style={S.app}>
      {/* Header */}
      <div style={S.header}>
        <div>
          <div style={S.logo}>🏗️ Presupuestador ARQ</div>
          <div style={S.subtitle}>Base ARQ Clarín · Mayo 2026 · 33 Rubros · CABA y GBA</div>
        </div>
        <div style={{ flex:1 }} />
        {lineas && <button style={{ ...S.btn(), width:'auto', marginTop:0 }} onClick={()=>setShowCatalogo(true)}>
          + Agregar del catálogo
        </button>}
      </div>

      {/* Main layout */}
      <div style={S.main}>
        {/* Panel lateral */}
        <div>
          <PanelObra datos={datos} onChange={cambiarDato} />
          <button style={{ ...S.btn('#10b981'), marginTop:12 }} onClick={calcular}>
            {lineas ? '🔄 Recalcular' : '▶ Calcular presupuesto'}
          </button>
          {lineas && totales && (
            <div style={{ marginTop:12, display:'flex', flexDirection:'column', gap:8 }}>
              <div style={{ ...S.kpi, background:'#0f172a' }}>
                <div style={{ fontSize:11, color:'#94a3b8', marginBottom:4 }}>TOTAL OBRA (s/IVA + GG + Benef.)</div>
                <div style={{ fontSize:22, fontWeight:800 }}>{fmt$(totales.totalObra)}</div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                <div style={{ ...S.kpi, background:'#1e3a5f', padding:'12px 16px' }}>
                  <div style={{ fontSize:10, color:'#94a3b8' }}>Costo/m²</div>
                  <div style={{ fontSize:16, fontWeight:800 }}>{fmt$(cxm2)}</div>
                </div>
                <div style={{ ...S.kpi, background:'#1e3a5f', padding:'12px 16px' }}>
                  <div style={{ fontSize:10, color:'#94a3b8' }}>Subtotal s/IVA</div>
                  <div style={{ fontSize:16, fontWeight:800 }}>{fmt$(totales.subtotal)}</div>
                </div>
              </div>
              <div style={{ ...S.card, padding:'12px 14px' }}>
                <div style={{ fontSize:11, color:'#94a3b8', marginBottom:6, fontWeight:600 }}>COMPOSICIÓN</div>
                {[
                  ['Trabajos directos', totales.subtotal],
                  ['G. Generales (20%)', totales.gg],
                  ['Beneficio (10%)', totales.beneficio],
                  ['IVA sobre total (21%)', totales.iva],
                ].map(([lbl,val])=>(
                  <div key={lbl} style={{ display:'flex', justifyContent:'space-between', fontSize:13, padding:'3px 0', borderBottom:'1px solid #f1f5f9' }}>
                    <span>{lbl}</span><span style={{ fontWeight:700 }}>{fmt$(val)}</span>
                  </div>
                ))}
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:14, padding:'6px 0', fontWeight:800, borderTop:'2px solid #e2e8f0', marginTop:2 }}>
                  <span>TOTAL c/IVA</span><span>{fmt$(totales.totalConIva)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Panel derecho */}
        <div>
          {/* Tabs */}
          <div style={{ display:'flex', gap:4, marginBottom:12 }}>
            {TABS.map(t=>(
              <button key={t.id} onClick={()=>setTabActiva(t.id)} style={{ padding:'8px 16px', border:'none', borderRadius:8, cursor:'pointer', fontWeight:600, fontSize:13, background:tabActiva===t.id?'#fff':'transparent', color:tabActiva===t.id?'#1e293b':'#64748b', boxShadow:tabActiva===t.id?'0 1px 4px rgba(0,0,0,.1)':'' }}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab: Presupuesto */}
          {tabActiva==='presupuesto' && (
            <div>
              {!lineas ? (
                <div style={{ ...S.card, textAlign:'center', padding:60 }}>
                  <div style={{ fontSize:48 }}>📋</div>
                  <div style={{ fontSize:18, fontWeight:700, marginTop:12 }}>Completá los datos y presioná Calcular</div>
                  <div style={{ fontSize:14, color:'#64748b', marginTop:8 }}>El sistema aplicará los coeficientes de ARQ Clarín según m², tipo de obra y nivel de calidad.</div>
                </div>
              ) : (
                grupos.map(g => (
                  <BloqueRubro key={g.rubro} grupo={g} onUpdate={actualizarLinea} onDelete={eliminarLinea} onAgregarItem={agregarLinea} />
                ))
              )}
            </div>
          )}

          {/* Tab: Resumen */}
          {tabActiva==='resumen' && lineas && totales && (
            <div style={S.card}>
              <div style={{ fontWeight:800, fontSize:16, marginBottom:16 }}>💰 Resumen por rubro</div>
              <table style={S.tbl}>
                <thead><tr>
                  <th style={{ ...S.th, width:50 }}>N°</th>
                  <th style={S.th}>Rubro</th>
                  <th style={{ ...S.th, width:80 }}>Ítems</th>
                  <th style={{ ...S.th, textAlign:'right', width:140 }}>Total</th>
                  <th style={{ ...S.th, textAlign:'right', width:80 }}>%</th>
                </tr></thead>
                <tbody>
                  {grupos.map(g=>{
                    const pct = totales.subtotal>0 ? ((g.total/totales.subtotal)*100).toFixed(1) : '0.0';
                    const colores=['#3b82f6','#10b981','#f59e0b','#8b5cf6','#ef4444','#06b6d4','#ec4899','#84cc16'];
                    const col=colores[(parseInt(g.rubro,10)-1)%colores.length];
                    return (
                      <tr key={g.rubro}>
                        <td style={{ ...S.td }}><span style={S.badge(col)}>{g.rubro}</span></td>
                        <td style={S.td}>{g.nombre}</td>
                        <td style={{ ...S.tdNum, color:'#64748b' }}>{g.lineas.length}</td>
                        <td style={{ ...S.tdNum, fontWeight:700 }}>{fmt$(g.total)}</td>
                        <td style={S.tdNum}>
                          <div style={{ display:'flex', alignItems:'center', gap:6, justifyContent:'flex-end' }}>
                            <div style={{ width:40, height:6, background:'#f1f5f9', borderRadius:3, overflow:'hidden' }}>
                              <div style={{ width:`${Math.min(+pct,100)}%`, height:'100%', background:col, borderRadius:3 }}/>
                            </div>
                            {pct}%
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div style={S.total}>
                <span>SUBTOTAL TRABAJOS DIRECTOS</span>
                <span>{fmt$(totales.subtotal)}</span>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginTop:16 }}>
                {[['GG (20%)', totales.gg, '#f59e0b'],['Benef. (10%)', totales.beneficio, '#10b981'],['IVA (21%)', totales.iva, '#ef4444']].map(([l,v,c])=>(
                  <div key={l} style={{ background:c+'11', border:`1px solid ${c}44`, borderRadius:8, padding:'10px 14px' }}>
                    <div style={{ fontSize:11, color:c, fontWeight:600 }}>{l}</div>
                    <div style={{ fontSize:16, fontWeight:800, marginTop:2 }}>{fmt$(v)}</div>
                  </div>
                ))}
              </div>
              <div style={{ background:'#0f172a', color:'#fff', borderRadius:10, padding:'14px 20px', marginTop:12, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div>
                  <div style={{ fontSize:12, color:'#94a3b8' }}>TOTAL OBRA c/IVA ({datos.m2}m² — {CALIDAD[datos.calidad]?.label})</div>
                  <div style={{ fontSize:26, fontWeight:800, marginTop:2 }}>{fmt$(totales.totalConIva)}</div>
                </div>
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontSize:12, color:'#94a3b8' }}>Costo por m²</div>
                  <div style={{ fontSize:20, fontWeight:800 }}>{fmt$(cxm2)}</div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Catálogo de referencia */}
          {tabActiva==='catalogo_ref' && (
            <div style={S.card}>
              <div style={{ fontWeight:800, fontSize:16, marginBottom:16 }}>📖 Catálogo completo ARQ Clarín — Mayo 2026</div>
              {Object.entries(RUBROS).map(([rk,r])=>(
                <div key={rk} style={{ marginBottom:16 }}>
                  <div style={{ fontWeight:700, fontSize:14, color:'#3b82f6', marginBottom:6, paddingBottom:4, borderBottom:'2px solid #eff6ff' }}>
                    Rubro {rk} — {r.nombre}
                  </div>
                  <table style={S.tbl}>
                    <thead><tr>
                      <th style={{ ...S.th, width:60 }}>Ítem</th>
                      <th style={S.th}>Descripción</th>
                      <th style={{ ...S.th, width:50 }}>U.</th>
                      <th style={{ ...S.th, textAlign:'right', width:140 }}>Precio ($ mayo 2026)</th>
                    </tr></thead>
                    <tbody>
                      {r.items.map(i=>(
                        <tr key={i.id}>
                          <td style={{ ...S.td, color:'#94a3b8', fontSize:11 }}>{i.id}</td>
                          <td style={S.td}>{i.desc}{i.notas&&<span style={{ color:'#94a3b8', fontSize:11 }}> — {i.notas}</span>}</td>
                          <td style={{ ...S.td, color:'#64748b' }}>{i.u}</td>
                          <td style={{ ...S.tdNum, fontWeight:600 }}>{fmt$(i.precio)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal catálogo */}
      {showCatalogo && <ModalCatalogo onAgregar={it=>{ agregarDesdesCatalogo(it); }} onCerrar={()=>setShowCatalogo(false)} />}
    </div>
  );
}
