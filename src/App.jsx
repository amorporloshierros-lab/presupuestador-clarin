import { useState, useMemo, useCallback } from 'react';
import { ZONA_TIPOS } from './data/materiales.js';
import { calcularEstructura, calcularLineasZona, calcularTotales, resumenPorZona, calcularCronograma, R } from './engine/calculos.js';

// ── Formateo ──────────────────────────────────────────────────
const $ = v => '$ ' + Math.round(v || 0).toLocaleString('es-AR');
const N = v => (v || 0).toLocaleString('es-AR', { maximumFractionDigits: 2 });

// ── Colores de zonas ──────────────────────────────────────────
const ZONA_COLORS = {
  bano:'#3b82f6', habitacion:'#10b981', cocina:'#f59e0b', living:'#8b5cf6',
  garage:'#6b7280', sala_maquinas:'#ef4444', pileta:'#06b6d4', jardin:'#84cc16',
  camaras:'#ec4899', techo:'#f97316',
};

// ════════════════════════════════════════════════════════════════
// PANTALLA 1 — Datos del proyecto
// ════════════════════════════════════════════════════════════════
function Pantalla1({ proyecto, setProyecto, onSiguiente }) {
  const set = (k, v) => setProyecto(p => ({ ...p, [k]: v }));
  const m2total = (proyecto.mCubiertos || 0) + (proyecto.mSemicubiertos || 0) * 0.5 + (proyecto.mBalcones || 0) * 0.5;

  const estructuraPreview = useMemo(() =>
    m2total > 0 ? calcularEstructura(proyecto) : [],
    [proyecto.tipoEstructura, proyecto.mCubiertos, proyecto.mSemicubiertos, proyecto.mBalcones, proyecto.techo]
  );
  const totalEstr = estructuraPreview.reduce((s, l) => s + l.subtotal, 0);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px 16px' }}>
      <div style={{ background:'#fff', borderRadius:16, padding:28, boxShadow:'0 2px 8px rgba(0,0,0,.07)', marginBottom:20 }}>
        <h2 style={{ margin:'0 0 20px', fontSize:18, fontWeight:800, color:'#1e293b' }}>📋 Datos del proyecto</h2>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 20px' }}>
          {[
            ['nombre',   'Nombre de la obra',    'text',   'Vivienda Familia García'],
            ['cliente',  'Cliente',               'text',   'Juan García'],
            ['direccion','Dirección',             'text',   'Av. Libertador 1234, Tigre'],
          ].map(([k, lbl, type, ph]) => (
            <div key={k} style={{ gridColumn: k==='direccion' ? '1/-1' : 'auto', marginBottom:14 }}>
              <label style={styles.label}>{lbl}</label>
              <input style={styles.input} type={type} placeholder={ph}
                value={proyecto[k] || ''} onChange={e => set(k, e.target.value)} />
            </div>
          ))}
        </div>

        <h3 style={styles.sectionTitle}>🏗️ Tipo de estructura</h3>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:16 }}>
          {[
            ['mamposteria',  '🧱 Mampostería'],
            ['steel_frame',  '⚙️ Steel Frame'],
            ['haa',          '🏢 H°A° (hormigón)'],
          ].map(([v, lbl]) => (
            <div key={v}
              style={{ ...styles.chip, background:proyecto.tipoEstructura===v?'#1e293b':'#f8fafc',
                color:proyecto.tipoEstructura===v?'#fff':'#475569',
                border:`2px solid ${proyecto.tipoEstructura===v?'#1e293b':'#e2e8f0'}`,
                fontWeight: proyecto.tipoEstructura===v ? 700 : 500 }}
              onClick={() => set('tipoEstructura', v)}>
              {lbl}
            </div>
          ))}
        </div>

        <h3 style={styles.sectionTitle}>📐 Superficies</h3>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:'0 16px' }}>
          {[
            ['mCubiertos',      'M² cubiertos',      100],
            ['mSemicubiertos',  'M² semicubiertos',  0],
            ['mBalcones',       'M² balcones',        0],
            ['plantas',         'Plantas',             1],
          ].map(([k, lbl, def]) => (
            <div key={k} style={{ marginBottom:14 }}>
              <label style={styles.label}>{lbl}</label>
              <input style={styles.input} type="number" min="0"
                value={proyecto[k] ?? def} onChange={e => set(k, +e.target.value)} />
            </div>
          ))}
        </div>
        <div style={{ fontSize:12, color:'#64748b', marginBottom:16 }}>
          Superficie total computable: <strong>{N(m2total)} m²</strong> (semicubiertos y balcones al 50%)
        </div>

        <h3 style={styles.sectionTitle}>🏠 Tipo de techo</h3>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:20 }}>
          {[
            ['terraza',     '🏢 Terraza transitable'],
            ['dos_aguas',   '⛺ Dos aguas (teja)'],
            ['steel_frame', '⚙️ Steel frame chapa'],
          ].map(([v, lbl]) => (
            <div key={v}
              style={{ ...styles.chip, background:proyecto.techo===v?'#1e293b':'#f8fafc',
                color:proyecto.techo===v?'#fff':'#475569',
                border:`2px solid ${proyecto.techo===v?'#1e293b':'#e2e8f0'}`,
                fontWeight: proyecto.techo===v ? 700 : 500 }}
              onClick={() => set('techo', v)}>
              {lbl}
            </div>
          ))}
        </div>
      </div>

      {/* Preview estructura */}
      {estructuraPreview.length > 0 && (
        <div style={{ background:'#fff', borderRadius:16, padding:24, boxShadow:'0 2px 8px rgba(0,0,0,.07)', marginBottom:20 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
            <h3 style={{ margin:0, fontSize:15, fontWeight:800 }}>⚡ Estructura calculada automáticamente</h3>
            <span style={{ fontWeight:800, fontSize:16, color:'#1e293b' }}>{$(totalEstr)}</span>
          </div>
          <table style={styles.tbl}>
            <thead><tr>
              <th style={styles.th}>Ítem</th>
              <th style={styles.th}>Descripción</th>
              <th style={{ ...styles.th, width:60 }}>U.</th>
              <th style={{ ...styles.th, textAlign:'right', width:70 }}>Cant.</th>
              <th style={{ ...styles.th, textAlign:'right', width:120 }}>MO</th>
              <th style={{ ...styles.th, textAlign:'right', width:120 }}>Materiales</th>
              <th style={{ ...styles.th, textAlign:'right', width:130 }}>Subtotal</th>
            </tr></thead>
            <tbody>
              {estructuraPreview.map(l => (
                <tr key={l.id}>
                  <td style={{ ...styles.td, color:'#94a3b8', fontSize:11 }}>{l.ref}</td>
                  <td style={styles.td}>{l.desc}</td>
                  <td style={{ ...styles.td, color:'#64748b', fontSize:11 }}>{l.unidad}</td>
                  <td style={styles.tdR}>{N(l.cant)}</td>
                  <td style={styles.tdR}>{$(l.subtotal_mo)}</td>
                  <td style={styles.tdR}>{$(l.subtotal_mat)}</td>
                  <td style={{ ...styles.tdR, fontWeight:700 }}>{$(l.subtotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button style={styles.btnPrimary}
        onClick={onSiguiente}
        disabled={!proyecto.nombre || !proyecto.mCubiertos}>
        Siguiente: Agregar zonas →
      </button>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// PANTALLA 2 — Zonas y materiales
// ════════════════════════════════════════════════════════════════
function Pantalla2({ zonas, setZonas, onSiguiente, onAnterior }) {
  const [zonaActiva, setZonaActiva] = useState(null);

  const agregarZona = (tipo) => {
    const tipoDef = ZONA_TIPOS[tipo];
    const nueva = {
      id: `z_${Date.now()}`,
      tipo,
      nombre: tipoDef.nombre,
      m2: tipo === 'bano' ? 5 : tipo === 'cocina' ? 12 : tipo === 'pileta' ? 30 : tipo === 'techo' ? 100 : 20,
      materiales: {},
    };
    setZonas(prev => [...prev, nueva]);
    setZonaActiva(nueva.id);
  };

  const eliminarZona = (id) => {
    setZonas(prev => prev.filter(z => z.id !== id));
    if (zonaActiva === id) setZonaActiva(null);
  };

  const actualizarZona = (id, campo, valor) => {
    setZonas(prev => prev.map(z => z.id === id ? { ...z, [campo]: valor } : z));
  };

  const setMaterial = (zonaId, catId, valor) => {
    setZonas(prev => prev.map(z => z.id === zonaId
      ? { ...z, materiales: { ...z.materiales, [catId]: valor } }
      : z));
  };

  const zonaEditando = zonas.find(z => z.id === zonaActiva);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 16px', display:'grid', gridTemplateColumns:'280px 1fr', gap:20 }}>
      {/* Panel izquierdo: lista de zonas + agregar */}
      <div>
        <div style={{ background:'#fff', borderRadius:16, padding:16, boxShadow:'0 2px 8px rgba(0,0,0,.07)', marginBottom:16 }}>
          <div style={{ fontWeight:800, fontSize:14, marginBottom:12 }}>📍 Zonas agregadas</div>
          {zonas.length === 0 && (
            <div style={{ fontSize:12, color:'#94a3b8', textAlign:'center', padding:'12px 0' }}>
              Seleccioná una zona abajo para agregarla
            </div>
          )}
          {zonas.map(z => {
            const col = ZONA_COLORS[z.tipo] || '#64748b';
            const activa = zonaActiva === z.id;
            return (
              <div key={z.id} style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 10px',
                borderRadius:8, marginBottom:4, cursor:'pointer',
                background: activa ? col+'18' : '#f8fafc',
                border: `1.5px solid ${activa ? col : '#e2e8f0'}`,
              }} onClick={() => setZonaActiva(z.id)}>
                <span style={{ fontSize:16 }}>{ZONA_TIPOS[z.tipo]?.icon}</span>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13, fontWeight:600, color:activa?col:'#1e293b', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{z.nombre}</div>
                  <div style={{ fontSize:11, color:'#94a3b8' }}>{z.m2} m²</div>
                </div>
                <span style={{ fontSize:16, cursor:'pointer', color:'#cbd5e1' }}
                  onClick={e => { e.stopPropagation(); eliminarZona(z.id); }}>×</span>
              </div>
            );
          })}
        </div>

        <div style={{ background:'#fff', borderRadius:16, padding:16, boxShadow:'0 2px 8px rgba(0,0,0,.07)' }}>
          <div style={{ fontWeight:800, fontSize:13, marginBottom:10, color:'#475569' }}>+ AGREGAR ZONA</div>
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            {Object.entries(ZONA_TIPOS).map(([tipo, def]) => (
              <div key={tipo} style={{ display:'flex', alignItems:'center', gap:8, padding:'7px 10px',
                borderRadius:8, cursor:'pointer', background:'#f8fafc',
                border:'1.5px solid #e2e8f0', fontSize:13,
                color:'#475569', transition:'all .15s' }}
                onClick={() => agregarZona(tipo)}
                onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
                onMouseLeave={e => e.currentTarget.style.background = '#f8fafc'}>
                <span>{def.icon}</span> {def.nombre}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Panel derecho: configurar zona activa */}
      <div>
        {!zonaEditando ? (
          <div style={{ background:'#fff', borderRadius:16, padding:48, boxShadow:'0 2px 8px rgba(0,0,0,.07)', textAlign:'center' }}>
            <div style={{ fontSize:40, marginBottom:12 }}>🏗️</div>
            <div style={{ fontSize:18, fontWeight:700 }}>Seleccioná o agregá una zona</div>
            <div style={{ fontSize:13, color:'#94a3b8', marginTop:8 }}>
              Agregá las zonas de la obra desde el panel izquierdo y configurá los materiales de cada una.
            </div>
          </div>
        ) : (
          <ConfigZona
            zona={zonaEditando}
            tipoDef={ZONA_TIPOS[zonaEditando.tipo]}
            onNombre={v => actualizarZona(zonaEditando.id, 'nombre', v)}
            onM2={v => actualizarZona(zonaEditando.id, 'm2', v)}
            onMaterial={(catId, val) => setMaterial(zonaEditando.id, catId, val)}
          />
        )}

        <div style={{ display:'flex', gap:12, marginTop:20 }}>
          <button style={{ ...styles.btnSecondary, flex:1 }} onClick={onAnterior}>← Volver</button>
          <button style={{ ...styles.btnPrimary, flex:2 }} onClick={onSiguiente}
            disabled={zonas.length === 0}>
            Ver Resumen ({zonas.length} zona{zonas.length!==1?'s':''}) →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Config de una zona ───────────────────────────────────────────
function ConfigZona({ zona, tipoDef, onNombre, onM2, onMaterial }) {
  const col = ZONA_COLORS[zona.tipo] || '#3b82f6';
  const [expandidos, setExpandidos] = useState({});
  const toggle = (id) => setExpandidos(p => ({ ...p, [id]: !p[id] }));

  return (
    <div style={{ background:'#fff', borderRadius:16, padding:24, boxShadow:'0 2px 8px rgba(0,0,0,.07)' }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
        <span style={{ fontSize:28 }}>{tipoDef.icon}</span>
        <div style={{ flex:1 }}>
          <input style={{ ...styles.input, marginBottom:0, fontWeight:700, fontSize:16, border:'none',
            borderBottom:`2px solid ${col}`, borderRadius:0, padding:'4px 0' }}
            value={zona.nombre} onChange={e => onNombre(e.target.value)} />
        </div>
        <div style={{ textAlign:'right' }}>
          <label style={{ ...styles.label, marginBottom:2 }}>M²</label>
          <input style={{ ...styles.input, marginBottom:0, width:70, textAlign:'center' }}
            type="number" min="1" value={zona.m2} onChange={e => onM2(+e.target.value)} />
        </div>
      </div>

      {tipoDef.categorias.map(cat => {
        const sel = zona.materiales[cat.id];
        const exp = expandidos[cat.id];
        const selOpcion = sel && sel.tipo !== 'personalizado' && sel.tipo !== 'omitir'
          ? cat.opciones.find(o => o.id === sel.id) : null;

        return (
          <div key={cat.id} style={{ borderRadius:10, border:'1.5px solid #e2e8f0', marginBottom:8, overflow:'hidden' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px',
              background: sel && sel.tipo !== 'omitir' ? '#f8fafc' : '#fff',
              cursor:'pointer' }} onClick={() => toggle(cat.id)}>
              <div style={{ flex:1 }}>
                <span style={{ fontWeight:600, fontSize:13 }}>{cat.nombre}</span>
                <span style={{ fontSize:11, color:'#94a3b8', marginLeft:6 }}>{cat.unidad}</span>
              </div>
              {selOpcion && <span style={{ fontSize:11, color:col, fontWeight:600 }}>{selOpcion.marca} — {selOpcion.desc.slice(0,30)}</span>}
              {sel?.tipo === 'omitir' && <span style={{ fontSize:11, color:'#94a3b8' }}>No incluir</span>}
              {!sel && <span style={{ fontSize:11, color:'#f59e0b', fontWeight:600 }}>Sin seleccionar</span>}
              <span style={{ color:'#cbd5e1', fontSize:14 }}>{exp ? '▾' : '▸'}</span>
            </div>

            {exp && (
              <div style={{ padding:'8px 14px 14px', borderTop:'1px solid #f1f5f9' }}>
                <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                  {cat.opciones.map(op => (
                    <div key={op.id} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 12px',
                      borderRadius:8, cursor:'pointer',
                      background: sel?.id===op.id ? col+'12' : '#f8fafc',
                      border: `1.5px solid ${sel?.id===op.id ? col : '#e2e8f0'}` }}
                      onClick={() => { onMaterial(cat.id, { id: op.id }); toggle(cat.id); }}>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:12, fontWeight:600, color:sel?.id===op.id?col:'#1e293b' }}>
                          {op.marca}
                        </div>
                        <div style={{ fontSize:11, color:'#64748b' }}>{op.desc}</div>
                      </div>
                      <div style={{ textAlign:'right', fontSize:11 }}>
                        <div style={{ color:'#3b82f6', fontWeight:600 }}>MO: {$(op.precio_mo)}</div>
                        <div style={{ color:'#10b981', fontWeight:600 }}>Mat: {$(op.precio_mat)}</div>
                      </div>
                    </div>
                  ))}

                  {/* Personalizado */}
                  <div style={{ padding:'10px 12px', borderRadius:8, border:'1.5px dashed #e2e8f0',
                    background: sel?.tipo==='personalizado' ? '#fef9ec' : '#fafafa' }}>
                    <div style={{ fontSize:12, fontWeight:600, color:'#f59e0b', marginBottom:6 }}>✏️ Personalizado</div>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:6 }}>
                      {[
                        ['marca', 'Marca', 'text'],
                        ['desc', 'Descripción', 'text'],
                      ].map(([k, lbl, t]) => (
                        <div key={k}>
                          <label style={{ ...styles.label, marginBottom:2 }}>{lbl}</label>
                          <input style={{ ...styles.input, marginBottom:0, fontSize:12 }} type={t}
                            value={sel?.tipo==='personalizado' ? sel[k]||'' : ''}
                            onChange={e => onMaterial(cat.id, { ...(sel||{}), tipo:'personalizado', [k]: e.target.value })} />
                        </div>
                      ))}
                      {[
                        ['precio_mo', 'MO $/u', 'number'],
                        ['precio_mat', 'Mat $/u', 'number'],
                      ].map(([k, lbl, t]) => (
                        <div key={k}>
                          <label style={{ ...styles.label, marginBottom:2 }}>{lbl}</label>
                          <input style={{ ...styles.input, marginBottom:0, fontSize:12 }} type={t}
                            value={sel?.tipo==='personalizado' ? sel[k]||'' : ''}
                            onChange={e => onMaterial(cat.id, { ...(sel||{}), tipo:'personalizado', [k]: +e.target.value })} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Omitir */}
                  <div style={{ padding:'7px 12px', borderRadius:8, cursor:'pointer',
                    border:`1.5px solid ${sel?.tipo==='omitir' ? '#ef4444' : '#f1f5f9'}`,
                    background: sel?.tipo==='omitir' ? '#fef2f2' : '#fafafa',
                    fontSize:12, color:'#ef4444', fontWeight:600 }}
                    onClick={() => { onMaterial(cat.id, { tipo:'omitir' }); toggle(cat.id); }}>
                    ✕ No incluir este ítem
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// PANTALLA 3 — Resumen tipo Excel
// ════════════════════════════════════════════════════════════════
function Pantalla3({ proyecto, zonas, estructuraLineas, onAnterior }) {
  const [tab, setTab] = useState('presupuesto');

  const todasLineas = useMemo(() => {
    const zonasLineas = zonas.flatMap(z => calcularLineasZona(z));
    return [...estructuraLineas, ...zonasLineas];
  }, [estructuraLineas, zonas]);

  const totales = useMemo(() => calcularTotales(todasLineas), [todasLineas]);
  const porZona = useMemo(() => resumenPorZona(todasLineas), [todasLineas]);
  const cronograma = useMemo(() => calcularCronograma(proyecto), [proyecto]);
  const m2 = (proyecto.mCubiertos || 0) + (proyecto.mSemicubiertos || 0) * 0.5 + (proyecto.mBalcones || 0) * 0.5;
  const cxm2 = m2 > 0 ? R(totales.totalObra / m2) : 0;

  const TABS = [
    { id:'presupuesto', label:'📋 Presupuesto' },
    { id:'materiales',  label:'🧱 Materiales'  },
    { id:'mo',          label:'👷 MO'           },
    { id:'cronograma',  label:'📅 Cronograma'   },
    { id:'resumen',     label:'💰 Resumen'      },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 16px' }}>
      {/* KPIs superiores */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:12, marginBottom:20 }}>
        {[
          ['💰 Total obra (c/IVA)', $(totales.totalObra), '#0f172a', '#fff'],
          ['📐 Costo por m²', $(cxm2), '#1e3a5f', '#fff'],
          ['🔨 MO', $(totales.subtotal_mo), '#166534', '#fff'],
          ['🧱 Materiales', $(totales.subtotal_mat), '#7c2d12', '#fff'],
        ].map(([lbl, val, bg, fg]) => (
          <div key={lbl} style={{ background:bg, color:fg, borderRadius:14, padding:'16px 18px' }}>
            <div style={{ fontSize:11, opacity:.7, marginBottom:4 }}>{lbl}</div>
            <div style={{ fontSize:18, fontWeight:800 }}>{val}</div>
          </div>
        ))}
      </div>

      {/* Header proyecto */}
      <div style={{ background:'#fff', borderRadius:14, padding:'14px 20px', marginBottom:16,
        boxShadow:'0 1px 4px rgba(0,0,0,.06)', display:'flex', gap:20, flexWrap:'wrap' }}>
        <div><span style={{ fontSize:11, color:'#94a3b8' }}>OBRA</span><br/><strong>{proyecto.nombre || '—'}</strong></div>
        <div><span style={{ fontSize:11, color:'#94a3b8' }}>CLIENTE</span><br/><strong>{proyecto.cliente || '—'}</strong></div>
        <div><span style={{ fontSize:11, color:'#94a3b8' }}>DIRECCIÓN</span><br/><strong>{proyecto.direccion || '—'}</strong></div>
        <div><span style={{ fontSize:11, color:'#94a3b8' }}>ESTRUCTURA</span><br/><strong>{{ mamposteria:'Mampostería', steel_frame:'Steel Frame', haa:'H°A°' }[proyecto.tipoEstructura]}</strong></div>
        <div><span style={{ fontSize:11, color:'#94a3b8' }}>M² TOTALES</span><br/><strong>{N(m2)} m²</strong></div>
        <div><span style={{ fontSize:11, color:'#94a3b8' }}>TECHO</span><br/><strong>{{ terraza:'Terraza', dos_aguas:'Dos aguas', steel_frame:'Steel frame' }[proyecto.techo]}</strong></div>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:4, marginBottom:12, background:'#f1f5f9', borderRadius:10, padding:4, width:'fit-content' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding:'7px 16px', border:'none', borderRadius:8, cursor:'pointer',
            fontWeight:600, fontSize:13, transition:'all .15s',
            background: tab===t.id ? '#fff' : 'transparent',
            color: tab===t.id ? '#1e293b' : '#64748b',
            boxShadow: tab===t.id ? '0 1px 4px rgba(0,0,0,.1)' : '',
          }}>{t.label}</button>
        ))}
      </div>

      {/* Tab: Presupuesto completo */}
      {tab === 'presupuesto' && (
        <TablaLineas lineas={todasLineas} columnas={['ref','desc','unidad','cant','mo','mat','total']} />
      )}

      {/* Tab: Materiales */}
      {tab === 'materiales' && (
        <TablaLineas lineas={todasLineas} columnas={['desc','unidad','cant','mat']} titulo="🧱 Solo materiales" />
      )}

      {/* Tab: MO */}
      {tab === 'mo' && (
        <TablaLineas lineas={todasLineas} columnas={['desc','unidad','cant','mo']} titulo="👷 Solo mano de obra" />
      )}

      {/* Tab: Cronograma */}
      {tab === 'cronograma' && (
        <div style={{ background:'#fff', borderRadius:14, padding:24, boxShadow:'0 1px 4px rgba(0,0,0,.06)' }}>
          <div style={{ fontWeight:800, fontSize:15, marginBottom:16 }}>📅 Cronograma estimado</div>
          <div style={{ overflow:'auto' }}>
            <table style={styles.tbl}>
              <thead><tr>
                <th style={styles.th}>Etapa</th>
                <th style={{ ...styles.th, textAlign:'right', width:80 }}>Inicio</th>
                <th style={{ ...styles.th, textAlign:'right', width:80 }}>Fin</th>
                <th style={{ ...styles.th, textAlign:'right', width:80 }}>Duración</th>
                <th style={{ ...styles.th, textAlign:'right', width:80 }}>Avance</th>
                <th style={styles.th}>Barra</th>
              </tr></thead>
              <tbody>
                {cronograma.map((e, i) => {
                  const maxMes = cronograma[cronograma.length-1]?.fin || 12;
                  const pct = ((e.fin - e.inicio) / maxMes) * 100;
                  const offset = (e.inicio / maxMes) * 100;
                  return (
                    <tr key={i}>
                      <td style={styles.td}>{e.etapa}</td>
                      <td style={styles.tdR}>Mes {e.inicio}</td>
                      <td style={styles.tdR}>Mes {e.fin}</td>
                      <td style={styles.tdR}>{N(e.mesesDuracion)} mes{e.mesesDuracion!==1?'es':''}</td>
                      <td style={styles.tdR}>{e.pct}%</td>
                      <td style={styles.td}>
                        <div style={{ height:14, background:'#f1f5f9', borderRadius:4, position:'relative', minWidth:120 }}>
                          <div style={{ position:'absolute', left:`${offset}%`, width:`${pct}%`, height:'100%',
                            background:`hsl(${i*36}, 70%, 50%)`, borderRadius:4 }} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Resumen financiero */}
      {tab === 'resumen' && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
          {/* Por zona */}
          <div style={{ background:'#fff', borderRadius:14, padding:24, boxShadow:'0 1px 4px rgba(0,0,0,.06)' }}>
            <div style={{ fontWeight:800, fontSize:15, marginBottom:16 }}>📊 Por zona</div>
            <table style={styles.tbl}>
              <thead><tr>
                <th style={styles.th}>Zona</th>
                <th style={{ ...styles.th, textAlign:'right' }}>MO</th>
                <th style={{ ...styles.th, textAlign:'right' }}>Mat.</th>
                <th style={{ ...styles.th, textAlign:'right' }}>Total</th>
                <th style={{ ...styles.th, textAlign:'right', width:50 }}>%</th>
              </tr></thead>
              <tbody>
                {porZona.map(z => (
                  <tr key={z.id}>
                    <td style={styles.td}>{z.nombre}</td>
                    <td style={styles.tdR}>{$(z.mo)}</td>
                    <td style={styles.tdR}>{$(z.mat)}</td>
                    <td style={{ ...styles.tdR, fontWeight:700 }}>{$(z.total)}</td>
                    <td style={styles.tdR}>{((z.total / totales.subtotal) * 100).toFixed(1)}%</td>
                  </tr>
                ))}
                <tr style={{ background:'#f8fafc', fontWeight:800 }}>
                  <td style={styles.td}>SUBTOTAL</td>
                  <td style={styles.tdR}>{$(totales.subtotal_mo)}</td>
                  <td style={styles.tdR}>{$(totales.subtotal_mat)}</td>
                  <td style={styles.tdR}>{$(totales.subtotal)}</td>
                  <td style={styles.tdR}>100%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Composición financiera */}
          <div style={{ background:'#fff', borderRadius:14, padding:24, boxShadow:'0 1px 4px rgba(0,0,0,.06)' }}>
            <div style={{ fontWeight:800, fontSize:15, marginBottom:16 }}>💰 Composición del precio</div>
            {[
              ['Trabajos directos (MO + Mat.)', totales.subtotal, '#1e293b'],
              ['Gastos generales (10%)',         totales.gg,       '#f59e0b'],
              ['Beneficio empresa (12%)',         totales.beneficio,'#10b981'],
              ['IVA (21%)',                       totales.iva,      '#ef4444'],
              ['IIBB CABA (2.5%)',                totales.iibb,     '#8b5cf6'],
            ].map(([lbl, val, col]) => (
              <div key={lbl} style={{ display:'flex', justifyContent:'space-between',
                padding:'9px 0', borderBottom:'1px solid #f1f5f9', alignItems:'center' }}>
                <span style={{ fontSize:13 }}>{lbl}</span>
                <span style={{ fontWeight:700, color:col }}>{$(val)}</span>
              </div>
            ))}
            <div style={{ background:'#0f172a', color:'#fff', borderRadius:10, padding:'12px 16px',
              marginTop:12, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div>
                <div style={{ fontSize:11, color:'#94a3b8' }}>TOTAL OBRA (con IVA + IIBB)</div>
                <div style={{ fontSize:24, fontWeight:900 }}>{$(totales.totalObra)}</div>
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontSize:11, color:'#94a3b8' }}>Costo/m²</div>
                <div style={{ fontSize:18, fontWeight:800 }}>{$(cxm2)}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ display:'flex', gap:12, marginTop:20 }}>
        <button style={{ ...styles.btnSecondary, flex:1 }} onClick={onAnterior}>← Volver a zonas</button>
        <button style={{ ...styles.btnPrimary, flex:2 }} onClick={() => window.print()}>🖨️ Imprimir / Exportar PDF</button>
      </div>
    </div>
  );
}

// ── Tabla reutilizable de líneas ─────────────────────────────────
function TablaLineas({ lineas, columnas, titulo }) {
  const [filtroZona, setFiltroZona] = useState('');
  const zonas = [...new Set(lineas.map(l => l.grupoLabel))];
  const filtradas = filtroZona ? lineas.filter(l => l.grupoLabel === filtroZona) : lineas;

  const colMap = {
    ref:     { label:'Ítem', style: { color:'#94a3b8', fontSize:11, width:70 } },
    desc:    { label:'Descripción', style: {} },
    unidad:  { label:'U.', style: { color:'#64748b', width:50 } },
    cant:    { label:'Cant.', style: { textAlign:'right', width:70 } },
    mo:      { label:'MO', style: { textAlign:'right', width:130, color:'#1d4ed8' } },
    mat:     { label:'Materiales', style: { textAlign:'right', width:130, color:'#15803d' } },
    total:   { label:'Total', style: { textAlign:'right', width:130, fontWeight:700 } },
    marca:   { label:'Marca', style: { width:100 } },
  };

  const totalMO  = filtradas.reduce((s, l) => s + (l.subtotal_mo  || 0), 0);
  const totalMat = filtradas.reduce((s, l) => s + (l.subtotal_mat || 0), 0);
  const totalAll = filtradas.reduce((s, l) => s + (l.subtotal     || 0), 0);

  return (
    <div style={{ background:'#fff', borderRadius:14, padding:20, boxShadow:'0 1px 4px rgba(0,0,0,.06)' }}>
      <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:14, flexWrap:'wrap' }}>
        {titulo && <span style={{ fontWeight:800, fontSize:15, flex:1 }}>{titulo}</span>}
        <select style={{ ...styles.input, marginBottom:0, width:200 }}
          value={filtroZona} onChange={e => setFiltroZona(e.target.value)}>
          <option value="">Todas las zonas ({lineas.length} ítems)</option>
          {zonas.map(z => <option key={z} value={z}>{z}</option>)}
        </select>
      </div>
      <div style={{ overflow:'auto' }}>
        <table style={styles.tbl}>
          <thead><tr>
            {columnas.map(c => (
              <th key={c} style={{ ...styles.th, ...(colMap[c]?.style||{}) }}>{colMap[c]?.label || c}</th>
            ))}
            <th style={{ ...styles.th, width:80 }}>Zona</th>
          </tr></thead>
          <tbody>
            {filtradas.map(l => (
              <tr key={l.id} style={{ borderLeft: `3px solid ${ZONA_COLORS[l.zonaTipo]||'#e2e8f0'}` }}>
                {columnas.map(c => {
                  let val;
                  if (c==='ref')   val = l.ref || '—';
                  if (c==='desc')  val = l.desc;
                  if (c==='unidad')val = l.unidad;
                  if (c==='cant')  val = N(l.cant);
                  if (c==='mo')    val = $(l.subtotal_mo);
                  if (c==='mat')   val = $(l.subtotal_mat);
                  if (c==='total') val = $(l.subtotal);
                  if (c==='marca') val = l.marca;
                  const styleC = { ...styles.td, ...(colMap[c]?.style||{}) };
                  if (c==='cant'||c==='mo'||c==='mat'||c==='total') styleC.textAlign = 'right';
                  return <td key={c} style={styleC}>{val}</td>;
                })}
                <td style={{ ...styles.td, fontSize:10, color:'#94a3b8', maxWidth:80, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                  {l.grupoLabel}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ background:'#f8fafc', fontWeight:800 }}>
              {columnas.map(c => {
                let val = '';
                if (c==='desc')  val = `TOTAL (${filtradas.length} ítems)`;
                if (c==='mo')    val = $(totalMO);
                if (c==='mat')   val = $(totalMat);
                if (c==='total') val = $(totalAll);
                const styleC = { ...styles.td, fontWeight:800 };
                if (c==='cant'||c==='mo'||c==='mat'||c==='total') styleC.textAlign = 'right';
                return <td key={c} style={styleC}>{val}</td>;
              })}
              <td style={styles.td} />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// ESTILOS BASE
// ════════════════════════════════════════════════════════════════
const styles = {
  label:      { fontSize:11, fontWeight:700, color:'#475569', marginBottom:4, display:'block', textTransform:'uppercase', letterSpacing:.5 },
  input:      { width:'100%', padding:'8px 10px', border:'1px solid #e2e8f0', borderRadius:8, fontSize:14, outline:'none', boxSizing:'border-box', marginBottom:12 },
  chip:       { display:'inline-flex', alignItems:'center', gap:6, padding:'8px 16px', borderRadius:10, fontSize:13, cursor:'pointer', userSelect:'none' },
  btnPrimary: { background:'#1e293b', color:'#fff', border:'none', borderRadius:10, padding:'12px 24px', fontWeight:800, fontSize:15, cursor:'pointer', width:'100%' },
  btnSecondary:{ background:'#fff', color:'#1e293b', border:'2px solid #e2e8f0', borderRadius:10, padding:'12px 24px', fontWeight:700, fontSize:14, cursor:'pointer', width:'100%' },
  sectionTitle:{ fontSize:14, fontWeight:800, color:'#1e293b', margin:'16px 0 10px', borderBottom:'1px solid #f1f5f9', paddingBottom:6 },
  tbl:        { width:'100%', borderCollapse:'collapse', fontSize:13 },
  th:         { textAlign:'left', padding:'7px 10px', background:'#f8fafc', color:'#64748b', fontWeight:700, fontSize:11, textTransform:'uppercase', borderBottom:'2px solid #e2e8f0' },
  td:         { padding:'7px 10px', borderBottom:'1px solid #f8fafc', verticalAlign:'middle' },
  tdR:        { padding:'7px 10px', borderBottom:'1px solid #f8fafc', textAlign:'right', verticalAlign:'middle', fontVariantNumeric:'tabular-nums' },
};

// ════════════════════════════════════════════════════════════════
// APP ROOT
// ════════════════════════════════════════════════════════════════
export default function App() {
  const [pantalla, setPantalla] = useState(1);
  const [proyecto, setProyecto] = useState({
    nombre: '', cliente: '', direccion: '',
    tipoEstructura: 'mamposteria',
    mCubiertos: 100, mSemicubiertos: 0, mBalcones: 0, plantas: 1,
    techo: 'terraza',
  });
  const [zonas, setZonas] = useState([]);

  const estructuraLineas = useMemo(() =>
    calcularEstructura(proyecto),
    [proyecto.tipoEstructura, proyecto.mCubiertos, proyecto.mSemicubiertos, proyecto.mBalcones, proyecto.techo]
  );

  const PASOS = ['Datos del proyecto', 'Zonas y materiales', 'Resumen'];

  return (
    <div style={{ fontFamily:'Inter, system-ui, sans-serif', background:'#f1f5f9', minHeight:'100vh', color:'#1e293b' }}>
      {/* Header */}
      <div style={{ background:'#0f172a', color:'#fff', padding:'0 24px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', alignItems:'center', gap:16, height:56 }}>
          <div>
            <div style={{ fontWeight:900, fontSize:18, letterSpacing:'-0.5px' }}>🏗️ Presupuestador ARQ</div>
            <div style={{ fontSize:11, color:'#94a3b8' }}>Base ARQ Clarín · Mayo 2026 · CABA y GBA</div>
          </div>
          <div style={{ flex:1 }} />
          {/* Stepper */}
          <div style={{ display:'flex', alignItems:'center', gap:4 }}>
            {PASOS.map((p, i) => {
              const n = i + 1;
              const activo = pantalla === n;
              const hecho = pantalla > n;
              return (
                <div key={p} style={{ display:'flex', alignItems:'center' }}>
                  {i > 0 && <div style={{ width:20, height:1, background: hecho?'#3b82f6':'#334155', margin:'0 4px' }} />}
                  <div style={{ display:'flex', alignItems:'center', gap:6, cursor: hecho?'pointer':'default' }}
                    onClick={() => hecho && setPantalla(n)}>
                    <div style={{ width:22, height:22, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:11, fontWeight:800,
                      background: hecho?'#3b82f6' : activo?'#fff':'#334155',
                      color: hecho||activo?'#0f172a':'#94a3b8',
                      border: activo?'2px solid #3b82f6':'2px solid transparent',
                    }}>{hecho ? '✓' : n}</div>
                    <span style={{ fontSize:12, fontWeight: activo?700:500, color: activo?'#fff':'#64748b' }}>{p}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contenido */}
      {pantalla === 1 && (
        <Pantalla1
          proyecto={proyecto}
          setProyecto={setProyecto}
          onSiguiente={() => setPantalla(2)}
        />
      )}
      {pantalla === 2 && (
        <Pantalla2
          zonas={zonas}
          setZonas={setZonas}
          onSiguiente={() => setPantalla(3)}
          onAnterior={() => setPantalla(1)}
        />
      )}
      {pantalla === 3 && (
        <Pantalla3
          proyecto={proyecto}
          zonas={zonas}
          estructuraLineas={estructuraLineas}
          onAnterior={() => setPantalla(2)}
        />
      )}
    </div>
  );
}
