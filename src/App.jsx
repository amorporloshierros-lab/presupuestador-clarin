import { useState, useMemo, useCallback } from 'react';
import { ZONA_TIPOS, INODOROS, ASIENTOS_INODORO } from './data/materiales.js';
import { calcularEstructura, calcularLineasZona, calcularTotales, resumenPorZona, consolidarMateriales, calcularCronograma, R } from './engine/calculos.js';

// ── Formateo ──────────────────────────────────────────────────
const N = v => (v||0).toLocaleString('es-AR',{maximumFractionDigits:2});
let _tc=1400, _usd=false;
const $ = v => {
  const n=Math.round(v||0);
  return _usd ? 'U$D '+Math.round(n/_tc).toLocaleString('es-AR') : '$ '+n.toLocaleString('es-AR');
};

const ZONA_COLORS = {
  bano:'#3b82f6',habitacion:'#10b981',cocina:'#f59e0b',living:'#8b5cf6',
  garage:'#6b7280',sala_maquinas:'#ef4444',pileta:'#06b6d4',jardin:'#84cc16',
  camaras:'#ec4899',techo:'#f97316',
};

// ════════════════════════════════════════════════════════════════
// PANTALLA 1
// ════════════════════════════════════════════════════════════════
function Pantalla1({ proyecto, setProyecto, onSiguiente }) {
  const set = (k,v) => setProyecto(p=>({...p,[k]:v}));
  const m2t = (proyecto.mCubiertos||0)+(proyecto.mSemicubiertos||0)*0.5+(proyecto.mBalcones||0)*0.5;

  const estructuraPreview = useMemo(()=>
    m2t>0 ? calcularEstructura(proyecto) : [],
    [proyecto.tipoEstructura,proyecto.mCubiertos,proyecto.mSemicubiertos,proyecto.mBalcones,proyecto.techo]
  );
  const totalEstr = estructuraPreview.reduce((s,l)=>s+l.subtotal,0);

  return (
    <div style={{maxWidth:820,margin:'0 auto',padding:'24px 16px'}}>
      <div style={{...S.card,marginBottom:16}}>
        <div style={S.sectionH2}>📋 Datos del proyecto</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0 20px'}}>
          {[['nombre','Nombre de la obra','Vivienda Familia García'],
            ['cliente','Cliente','Juan García'],
          ].map(([k,lbl,ph])=>(
            <div key={k} style={{marginBottom:14}}>
              <label style={S.label}>{lbl}</label>
              <input style={S.input} placeholder={ph} value={proyecto[k]||''} onChange={e=>set(k,e.target.value)}/>
            </div>
          ))}
          <div style={{gridColumn:'1/-1',marginBottom:14}}>
            <label style={S.label}>Dirección</label>
            <input style={S.input} placeholder="Av. Libertador 1234, Tigre" value={proyecto.direccion||''} onChange={e=>set('direccion',e.target.value)}/>
          </div>
        </div>

        <div style={S.sectionH3}>🏗️ Tipo de estructura</div>
        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:16}}>
          {[['mamposteria','🧱 Mampostería'],['steel_frame','⚙️ Steel Frame'],['haa','🏢 H°A°']].map(([v,lbl])=>(
            <div key={v} style={{...S.chip,background:proyecto.tipoEstructura===v?'#1e293b':'#f8fafc',color:proyecto.tipoEstructura===v?'#fff':'#475569',border:`2px solid ${proyecto.tipoEstructura===v?'#1e293b':'#e2e8f0'}`,fontWeight:proyecto.tipoEstructura===v?700:500}} onClick={()=>set('tipoEstructura',v)}>{lbl}</div>
          ))}
        </div>

        <div style={S.sectionH3}>📐 Superficies</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'0 16px'}}>
          {[['mCubiertos','M² cubiertos',100],['mSemicubiertos','M² semicubiertos',0],['mBalcones','M² balcones',0],['plantas','Plantas',1]].map(([k,lbl,def])=>(
            <div key={k} style={{marginBottom:14}}>
              <label style={S.label}>{lbl}</label>
              <input style={S.input} type="number" min="0" value={proyecto[k]??def} onChange={e=>set(k,+e.target.value)}/>
            </div>
          ))}
        </div>
        <div style={{fontSize:12,color:'#64748b',marginBottom:16}}>
          M² computable: <strong>{N(m2t)} m²</strong> · semicubiertos y balcones al 50%
        </div>

        <div style={S.sectionH3}>🏠 Tipo de techo</div>
        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:8}}>
          {[['terraza','🏢 Terraza'],['dos_aguas','⛺ Dos aguas teja'],['steel_frame','⚙️ Chapa steel']].map(([v,lbl])=>(
            <div key={v} style={{...S.chip,background:proyecto.techo===v?'#1e293b':'#f8fafc',color:proyecto.techo===v?'#fff':'#475569',border:`2px solid ${proyecto.techo===v?'#1e293b':'#e2e8f0'}`,fontWeight:proyecto.techo===v?700:500}} onClick={()=>set('techo',v)}>{lbl}</div>
          ))}
        </div>
      </div>

      {estructuraPreview.length>0 && (
        <div style={{...S.card,marginBottom:16}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
            <div style={S.sectionH2}>⚡ Estructura calculada (ARQ Clarín Mayo 2026)</div>
            <span style={{fontWeight:800,fontSize:16}}>{$(totalEstr)}</span>
          </div>
          <div style={{fontSize:11,color:'#64748b',marginBottom:8}}>
            MO: precios exactos ARQ Clarín · Materiales: promedio corralones CABA Mayo 2026
          </div>
          <TablaSimple lineas={estructuraPreview.map(l=>({...l,cols:['ref','desc','unidad','cant','mo','mat','total']}))} />
        </div>
      )}

      <button style={{...S.btnP,opacity:(proyecto.nombre&&proyecto.mCubiertos)?1:.5}} onClick={onSiguiente} disabled={!proyecto.nombre||!proyecto.mCubiertos}>
        Siguiente: Agregar zonas →
      </button>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// PANTALLA 2
// ════════════════════════════════════════════════════════════════
function Pantalla2({ zonas, setZonas, onSiguiente, onAnterior }) {
  const [zonaActiva, setZonaActiva] = useState(null);

  const agregarZona = tipo => {
    const td = ZONA_TIPOS[tipo];
    const nueva = {
      id:`z_${Date.now()}`, tipo, nombre:td.nombre,
      m2: tipo==='bano'?6:tipo==='cocina'?14:tipo==='pileta'?35:tipo==='techo'?100:20,
      conBidet: tipo==='bano' ? true : undefined,
      materiales:{},
    };
    setZonas(p=>[...p,nueva]);
    setZonaActiva(nueva.id);
  };

  const actualizarZona = useCallback((id,campo,val) =>
    setZonas(p=>p.map(z=>z.id===id?{...z,[campo]:val}:z)), []);

  const setMat = useCallback((zonaId,catId,val) =>
    setZonas(p=>p.map(z=>z.id===zonaId?{...z,materiales:{...z.materiales,[catId]:val}}:z)), []);

  const eliminarZona = id => {
    setZonas(p=>p.filter(z=>z.id!==id));
    if(zonaActiva===id) setZonaActiva(null);
  };

  const zona = zonas.find(z=>z.id===zonaActiva);

  return (
    <div style={{maxWidth:1100,margin:'0 auto',padding:'24px 16px',display:'grid',gridTemplateColumns:'270px 1fr',gap:16}}>
      {/* Panel izquierdo */}
      <div>
        <div style={{...S.card,marginBottom:12}}>
          <div style={{fontWeight:800,fontSize:13,marginBottom:10}}>📍 Zonas de la obra</div>
          {zonas.length===0&&<div style={{fontSize:12,color:'#94a3b8',textAlign:'center',padding:'8px 0'}}>Sin zonas aún</div>}
          {zonas.map(z=>{
            const col=ZONA_COLORS[z.tipo]||'#64748b';
            const act=zonaActiva===z.id;
            return (
              <div key={z.id} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 10px',borderRadius:8,marginBottom:4,cursor:'pointer',background:act?col+'15':'#f8fafc',border:`1.5px solid ${act?col:'#e2e8f0'}`}} onClick={()=>setZonaActiva(z.id)}>
                <span style={{fontSize:15}}>{ZONA_TIPOS[z.tipo]?.icon}</span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:600,color:act?col:'#1e293b',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{z.nombre}</div>
                  <div style={{fontSize:11,color:'#94a3b8'}}>{z.m2} m²{z.tipo==='bano'?` · bidet: ${z.conBidet?'✓':'✕'}`:''}
                  </div>
                </div>
                <span style={{fontSize:18,cursor:'pointer',color:'#cbd5e1'}} onClick={e=>{e.stopPropagation();eliminarZona(z.id);}}>×</span>
              </div>
            );
          })}
        </div>
        <div style={S.card}>
          <div style={{fontWeight:700,fontSize:12,marginBottom:8,color:'#475569'}}>+ AGREGAR ZONA</div>
          {Object.entries(ZONA_TIPOS).map(([tipo,def])=>(
            <div key={tipo} style={{display:'flex',alignItems:'center',gap:8,padding:'6px 10px',borderRadius:6,cursor:'pointer',background:'#f8fafc',border:'1px solid #e2e8f0',fontSize:12,color:'#475569',marginBottom:4}} onClick={()=>agregarZona(tipo)}>
              <span>{def.icon}</span>{def.nombre}
            </div>
          ))}
        </div>
      </div>

      {/* Panel derecho */}
      <div>
        {!zona
          ? <div style={{...S.card,textAlign:'center',padding:48}}><div style={{fontSize:36,marginBottom:10}}>🏗️</div><div style={{fontWeight:700,fontSize:16}}>Seleccioná o agregá una zona</div></div>
          : <ConfigZona zona={zona} tipoDef={ZONA_TIPOS[zona.tipo]} onNombre={v=>actualizarZona(zona.id,'nombre',v)} onM2={v=>actualizarZona(zona.id,'m2',v)} onBidet={v=>actualizarZona(zona.id,'conBidet',v)} onMat={(c,v)=>setMat(zona.id,c,v)} />
        }
        <div style={{display:'flex',gap:12,marginTop:16}}>
          <button style={{...S.btnS,flex:1}} onClick={onAnterior}>← Volver</button>
          <button style={{...S.btnP,flex:2,opacity:zonas.length>0?1:.5}} onClick={onSiguiente} disabled={zonas.length===0}>
            Ver Resumen ({zonas.length} zona{zonas.length!==1?'s':''}) →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Config zona ───────────────────────────────────────────────
function ConfigZona({ zona, tipoDef, onNombre, onM2, onBidet, onMat }) {
  const col = ZONA_COLORS[zona.tipo]||'#3b82f6';
  const [exp, setExp] = useState({});
  const toggle = id => setExp(p=>({...p,[id]:!p[id]}));
  const esBano = zona.tipo === 'bano';

  return (
    <div style={S.card}>
      {/* Header zona */}
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:18}}>
        <span style={{fontSize:26}}>{tipoDef.icon}</span>
        <input style={{...S.input,marginBottom:0,fontWeight:700,fontSize:16,border:'none',borderBottom:`2px solid ${col}`,borderRadius:0,padding:'4px 0',flex:1}} value={zona.nombre} onChange={e=>onNombre(e.target.value)}/>
        <div>
          <label style={{...S.label,marginBottom:2}}>M²</label>
          <input style={{...S.input,marginBottom:0,width:70,textAlign:'center'}} type="number" min="1" value={zona.m2} onChange={e=>onM2(+e.target.value)}/>
        </div>
      </div>

      {/* Toggle bidet */}
      {esBano && (
        <div style={{display:'flex',alignItems:'center',gap:12,padding:'10px 14px',borderRadius:10,border:'1.5px solid #e2e8f0',marginBottom:8,background:'#f8fafc'}}>
          <span style={{fontWeight:700,fontSize:13,flex:1}}>🚽 ¿Incluye bidet?</span>
          <div style={{display:'flex',borderRadius:8,overflow:'hidden',border:'1px solid #e2e8f0'}}>
            {[true,false].map(v=>(
              <div key={String(v)} style={{padding:'5px 18px',fontSize:12,fontWeight:700,cursor:'pointer',background:zona.conBidet===v?(v?'#10b981':'#ef4444'):'#fff',color:zona.conBidet===v?'#fff':'#64748b'}} onClick={()=>onBidet(v)}>
                {v?'SÍ':'NO'}
              </div>
            ))}
          </div>
          {zona.conBidet&&<span style={{fontSize:11,color:'#94a3b8'}}>Mismo brand que inodoro (auto)</span>}
        </div>
      )}

      {/* Selector inodoro para baño */}
      {esBano && (
        <SelectInodoro zona={zona} onSelect={id=>onMat('inodoro',{id})} onAsiento={id=>onMat('asiento',{id})} col={col} />
      )}

      {/* Categorías de materiales */}
      {tipoDef.categorias.map(cat => {
        const sel = zona.materiales[cat.id];
        const selOp = sel?.id ? cat.opciones?.find(o=>o.id===sel.id) : null;
        return (
          <div key={cat.id} style={{borderRadius:10,border:'1.5px solid #e2e8f0',marginBottom:6,overflow:'hidden'}}>
            <div style={{display:'flex',alignItems:'center',gap:10,padding:'9px 14px',background:sel&&sel.tipo!=='omitir'?'#f8fafc':'#fff',cursor:'pointer'}} onClick={()=>toggle(cat.id)}>
              <div style={{flex:1}}>
                <span style={{fontWeight:600,fontSize:13}}>{cat.nombre}</span>
                <span style={{fontSize:11,color:'#94a3b8',marginLeft:6}}>{cat.unidad}</span>
              </div>
              {selOp&&<span style={{fontSize:11,color:col,fontWeight:600,maxWidth:200,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{selOp.marca} — {selOp.desc.slice(0,28)}</span>}
              {sel?.tipo==='omitir'&&<span style={{fontSize:11,color:'#94a3b8'}}>No incluir</span>}
              {!sel&&<span style={{fontSize:11,color:'#f59e0b',fontWeight:600}}>Sin seleccionar</span>}
              <span style={{color:'#cbd5e1',fontSize:13}}>{exp[cat.id]?'▾':'▸'}</span>
            </div>
            {exp[cat.id]&&(
              <div style={{padding:'8px 12px 12px',borderTop:'1px solid #f1f5f9'}}>
                {cat.opciones?.map(op=>(
                  <div key={op.id} style={{display:'flex',alignItems:'center',gap:10,padding:'7px 10px',borderRadius:7,cursor:'pointer',marginBottom:4,background:sel?.id===op.id?col+'12':'#f8fafc',border:`1.5px solid ${sel?.id===op.id?col:'#e2e8f0'}`}} onClick={()=>{onMat(cat.id,{id:op.id});toggle(cat.id);}}>
                    <div style={{flex:1}}>
                      <div style={{fontSize:12,fontWeight:700,color:sel?.id===op.id?col:'#1e293b'}}>{op.marca}</div>
                      <div style={{fontSize:11,color:'#64748b'}}>{op.desc}</div>
                    </div>
                    <div style={{textAlign:'right',fontSize:11,whiteSpace:'nowrap'}}>
                      <div style={{color:'#3b82f6',fontWeight:600}}>MO: {$(op.precio_mo)}</div>
                      <div style={{color:'#10b981',fontWeight:600}}>Mat: {$(op.precio_mat)}</div>
                    </div>
                  </div>
                ))}
                {/* Personalizado */}
                <div style={{padding:'8px 10px',borderRadius:7,border:'1.5px dashed #e2e8f0',marginBottom:4,background:sel?.tipo==='personalizado'?'#fef9ec':'#fafafa'}}>
                  <div style={{fontSize:11,fontWeight:700,color:'#f59e0b',marginBottom:6}}>✏️ Personalizado</div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:6}}>
                    {[['marca','Marca','text'],['desc','Descripción','text'],['precio_mo','MO $/u','number'],['precio_mat','Mat $/u','number']].map(([k,lbl,t])=>(
                      <div key={k}>
                        <label style={{...S.label,marginBottom:2}}>{lbl}</label>
                        <input style={{...S.input,marginBottom:0,fontSize:11}} type={t} value={sel?.tipo==='personalizado'?sel[k]||'':''} onChange={e=>onMat(cat.id,{...(sel||{}),tipo:'personalizado',[k]:t==='number'?+e.target.value:e.target.value})}/>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{padding:'6px 10px',borderRadius:7,cursor:'pointer',border:`1.5px solid ${sel?.tipo==='omitir'?'#ef4444':'#f1f5f9'}`,background:sel?.tipo==='omitir'?'#fef2f2':'#fafafa',fontSize:11,color:'#ef4444',fontWeight:600}} onClick={()=>{onMat(cat.id,{tipo:'omitir'});toggle(cat.id);}}>
                  ✕ No incluir
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Selector de inodoro específico ───────────────────────────
function SelectInodoro({ zona, onSelect, onAsiento, col }) {
  const [open, setOpen] = useState(false);
  const selInod = INODOROS.find(i=>i.id===zona.materiales?.inodoro?.id);
  const selAsiento = zona.materiales?.asiento?.id;

  return (
    <div style={{borderRadius:10,border:'1.5px solid #e2e8f0',marginBottom:6,overflow:'hidden'}}>
      <div style={{display:'flex',alignItems:'center',gap:10,padding:'9px 14px',background:selInod?'#f8fafc':'#fff',cursor:'pointer'}} onClick={()=>setOpen(o=>!o)}>
        <div style={{flex:1}}>
          <span style={{fontWeight:600,fontSize:13}}>Inodoro</span>
          <span style={{fontSize:11,color:'#94a3b8',marginLeft:6}}>u</span>
        </div>
        {selInod?<span style={{fontSize:11,color:col,fontWeight:600}}>{selInod.marca} {selInod.linea}</span>:<span style={{fontSize:11,color:'#f59e0b',fontWeight:600}}>Sin seleccionar</span>}
        <span style={{color:'#cbd5e1',fontSize:13}}>{open?'▾':'▸'}</span>
      </div>
      {open&&(
        <div style={{padding:'8px 12px 12px',borderTop:'1px solid #f1f5f9'}}>
          {INODOROS.map(op=>(
            <div key={op.id} style={{display:'flex',alignItems:'center',gap:10,padding:'7px 10px',borderRadius:7,cursor:'pointer',marginBottom:4,background:selInod?.id===op.id?col+'12':'#f8fafc',border:`1.5px solid ${selInod?.id===op.id?col:'#e2e8f0'}`}} onClick={()=>{onSelect(op.id);setOpen(false);}}>
              <div style={{flex:1}}>
                <div style={{fontSize:12,fontWeight:700,color:selInod?.id===op.id?col:'#1e293b'}}>{op.marca} {op.linea}</div>
                <div style={{fontSize:11,color:'#64748b'}}>{op.desc}</div>
              </div>
              <div style={{textAlign:'right',fontSize:11}}>
                <div style={{color:'#10b981',fontWeight:600}}>$ {op.precio_mat.toLocaleString('es-AR')}</div>
                {op.bidet_precio>0&&zona.conBidet&&<div style={{color:'#94a3b8'}}>+ bidet: ${op.bidet_precio.toLocaleString('es-AR')}</div>}
              </div>
            </div>
          ))}
          {/* Asiento */}
          <div style={{marginTop:8,fontSize:12,fontWeight:600,color:'#64748b',marginBottom:4}}>Asiento inodoro:</div>
          <div style={{display:'flex',gap:8}}>
            {ASIENTOS_INODORO.map(a=>(
              <div key={a.id} style={{flex:1,padding:'6px 10px',borderRadius:7,cursor:'pointer',border:`1.5px solid ${selAsiento===a.id?col:'#e2e8f0'}`,background:selAsiento===a.id?col+'12':'#f8fafc',fontSize:11,fontWeight:600}} onClick={()=>onAsiento(a.id)}>
                {a.desc}<br/><span style={{color:'#10b981'}}>$ {a.precio_mat.toLocaleString('es-AR')}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// PANTALLA 3
// ════════════════════════════════════════════════════════════════
function Pantalla3({ proyecto, zonas, estructuraLineas, onAnterior }) {
  const [tab, setTab] = useState('presupuesto');
  const [rubroExp, setRubroExp] = useState('');

  const m2 = (proyecto.mCubiertos||0)+(proyecto.mSemicubiertos||0)*0.5+(proyecto.mBalcones||0)*0.5;

  const todasLineas = useMemo(()=>{
    const zl = zonas.flatMap(z=>calcularLineasZona(z, m2));
    return [...estructuraLineas, ...zl];
  },[estructuraLineas,zonas,m2]);

  const totales  = useMemo(()=>calcularTotales(todasLineas),[todasLineas]);
  const porZona  = useMemo(()=>resumenPorZona(todasLineas),[todasLineas]);
  const consolid = useMemo(()=>consolidarMateriales(todasLineas),[todasLineas]);
  const crono    = useMemo(()=>calcularCronograma(proyecto,zonas),[proyecto,zonas]);
  const cxm2 = m2>0 ? R(totales.totalObra/m2) : 0;

  const rubros = [...new Set(consolid.map(c=>c.rubro))].sort();

  const TABS = [
    {id:'presupuesto',label:'📋 Presupuesto'},
    {id:'materiales', label:'🧱 Lista materiales'},
    {id:'mo',         label:'👷 MO'},
    {id:'cronograma', label:'📅 Cronograma'},
    {id:'resumen',    label:'💰 Resumen'},
  ];

  return (
    <div style={{maxWidth:1200,margin:'0 auto',padding:'24px 16px'}}>
      {/* KPIs */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:16}}>
        {[['💰 Total obra (c/IVA)',$(totales.totalObra),'#0f172a'],['📐 Costo/m²',$(cxm2),'#1e3a5f'],['🔨 MO',$(totales.sub_mo),'#166534'],['🧱 Materiales',$(totales.sub_mat),'#7c2d12']].map(([lbl,val,bg])=>(
          <div key={lbl} style={{background:bg,color:'#fff',borderRadius:12,padding:'14px 16px'}}>
            <div style={{fontSize:11,opacity:.7,marginBottom:3}}>{lbl}</div>
            <div style={{fontSize:17,fontWeight:800}}>{val}</div>
          </div>
        ))}
      </div>

      {/* Info obra */}
      <div style={{...S.card,marginBottom:12,padding:'12px 18px'}}>
        <div style={{display:'flex',gap:20,flexWrap:'wrap',fontSize:13}}>
          {[['OBRA',proyecto.nombre||'—'],['CLIENTE',proyecto.cliente||'—'],['DIRECCIÓN',proyecto.direccion||'—'],['ESTRUCTURA',{mamposteria:'Mampostería',steel_frame:'Steel Frame',haa:'H°A°'}[proyecto.tipoEstructura]],['M²',N(m2)+' m²'],['TECHO',{terraza:'Terraza',dos_aguas:'Dos aguas',steel_frame:'Steel frame'}[proyecto.techo]]].map(([lbl,val])=>(
            <div key={lbl}><span style={{fontSize:10,color:'#94a3b8',display:'block'}}>{lbl}</span><strong>{val}</strong></div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:'flex',gap:3,marginBottom:12,background:'#f1f5f9',borderRadius:10,padding:4,width:'fit-content'}}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{padding:'6px 14px',border:'none',borderRadius:7,cursor:'pointer',fontWeight:600,fontSize:12,background:tab===t.id?'#fff':'transparent',color:tab===t.id?'#1e293b':'#64748b',boxShadow:tab===t.id?'0 1px 3px rgba(0,0,0,.1)':''}}>{t.label}</button>
        ))}
      </div>

      {/* PRESUPUESTO */}
      {tab==='presupuesto' && (
        <TablaLineas lineas={todasLineas} cols={['ref','grupoLabel','desc','unidad','cant','mo','mat','total']} />
      )}

      {/* LISTA MATERIALES CONSOLIDADA */}
      {tab==='materiales' && (
        <div style={S.card}>
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:14,flexWrap:'wrap'}}>
            <div style={{fontWeight:800,fontSize:15,flex:1}}>🧱 Lista de materiales consolidada</div>
            <select style={{...S.input,marginBottom:0,width:200}} value={rubroExp} onChange={e=>setRubroExp(e.target.value)}>
              <option value="">Todos los rubros</option>
              {rubros.map(r=><option key={r} value={r}>{r}</option>)}
            </select>
            <button style={{...S.btnS,width:'auto',padding:'6px 14px',fontSize:12}} onClick={()=>window.print()}>🖨️ Imprimir lista</button>
          </div>
          <div style={{fontSize:11,color:'#64748b',marginBottom:10,background:'#f8fafc',padding:'6px 10px',borderRadius:6}}>
            ✅ Ítems iguales de múltiples zonas están <strong>consolidados</strong> — podés usar esta lista para pedir presupuesto al corralón por rubro.
          </div>
          {rubros.filter(r=>!rubroExp||r===rubroExp).map(rubro=>{
            const items = consolid.filter(c=>c.rubro===rubro);
            if(!items.length) return null;
            const total = items.reduce((s,i)=>s+i.total_mat,0);
            return (
              <div key={rubro} style={{marginBottom:16}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',background:'#f1f5f9',padding:'7px 12px',borderRadius:8,marginBottom:4}}>
                  <span style={{fontWeight:800,fontSize:13}}>{rubro}</span>
                  <span style={{fontWeight:700,fontSize:13}}>{$(total)}</span>
                </div>
                <table style={S.tbl}>
                  <thead><tr>
                    <th style={S.th}>Marca</th>
                    <th style={S.th}>Descripción</th>
                    <th style={{...S.th,width:60}}>Unid.</th>
                    <th style={{...S.th,textAlign:'right',width:80}}>Cant.</th>
                    <th style={{...S.th,textAlign:'right',width:110}}>P. Unit.</th>
                    <th style={{...S.th,textAlign:'right',width:120}}>Total</th>
                    <th style={{...S.th,width:100}}>Zonas</th>
                  </tr></thead>
                  <tbody>
                    {items.map((it,i)=>(
                      <tr key={i}>
                        <td style={{...S.td,fontWeight:600,fontSize:12}}>{it.marca}</td>
                        <td style={S.td}>{it.desc}</td>
                        <td style={{...S.td,color:'#64748b'}}>{it.unidad}</td>
                        <td style={{...S.tdR,fontWeight:700}}>{N(it.cant)}</td>
                        <td style={S.tdR}>{$(it.precio_mat)}</td>
                        <td style={{...S.tdR,fontWeight:700}}>{$(it.total_mat)}</td>
                        <td style={{...S.td,fontSize:10,color:'#94a3b8'}}>{it.zonas.join(', ')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      )}

      {/* MO */}
      {tab==='mo' && (
        <TablaLineas lineas={todasLineas.filter(l=>l.subtotal_mo>0)} cols={['grupoLabel','categoriaLabel','desc','unidad','cant','mo']} />
      )}

      {/* CRONOGRAMA */}
      {tab==='cronograma' && (
        <div style={S.card}>
          <div style={{fontWeight:800,fontSize:15,marginBottom:4}}>📅 Cronograma de obra estimado</div>
          <div style={{fontSize:11,color:'#64748b',marginBottom:14}}>
            Basado en rendimientos reales UOCRA · Crew estándar: maestro mayor + 2 oficiales + ayudante
          </div>
          <div style={{overflowX:'auto'}}>
            <table style={{...S.tbl,minWidth:650}}>
              <thead><tr>
                <th style={S.th}>Etapa</th>
                <th style={S.th}>Gremio</th>
                <th style={{...S.th,textAlign:'right',width:70}}>Días háb.</th>
                <th style={{...S.th,textAlign:'right',width:80}}>Inicio mes</th>
                <th style={{...S.th,textAlign:'right',width:80}}>Fin mes</th>
                <th style={{...S.th,width:140}}>% avance</th>
                <th style={S.th}>Barra</th>
              </tr></thead>
              <tbody>
                {crono.map((e,i)=>{
                  const maxDia = crono[crono.length-1].dia_fin;
                  const w = ((e.dia_fin-e.dia_inicio)/maxDia)*100;
                  const o = (e.dia_inicio/maxDia)*100;
                  return (
                    <tr key={i}>
                      <td style={S.td}>{e.etapa}</td>
                      <td style={{...S.td,fontSize:11,color:'#64748b'}}>{e.gremio}</td>
                      <td style={S.tdR}>{e.dias}</td>
                      <td style={S.tdR}>{e.mes_inicio}</td>
                      <td style={S.tdR}>{e.mes_fin}</td>
                      <td style={S.tdR}>{e.pct_acum}%</td>
                      <td style={{...S.td,minWidth:140}}>
                        <div style={{height:12,background:'#f1f5f9',borderRadius:3,position:'relative'}}>
                          <div style={{position:'absolute',left:`${o}%`,width:`${w}%`,height:'100%',background:`hsl(${i*24},65%,50%)`,borderRadius:3}}/>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr style={{background:'#f8fafc',fontWeight:800}}>
                  <td style={S.td} colSpan={2}>TOTAL OBRA</td>
                  <td style={S.tdR}>{crono.reduce((s,e)=>s+e.dias,0)} días hábiles</td>
                  <td style={S.tdR}>—</td>
                  <td style={S.tdR}>{(crono[crono.length-1]?.mes_fin||0)} meses</td>
                  <td colSpan={2}/>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* RESUMEN */}
      {tab==='resumen' && (
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
          <div style={S.card}>
            <div style={{fontWeight:800,fontSize:14,marginBottom:12}}>Por zona</div>
            <table style={S.tbl}>
              <thead><tr>
                <th style={S.th}>Zona</th>
                <th style={{...S.th,textAlign:'right'}}>MO</th>
                <th style={{...S.th,textAlign:'right'}}>Mat.</th>
                <th style={{...S.th,textAlign:'right'}}>Total</th>
                <th style={{...S.th,textAlign:'right',width:50}}>%</th>
              </tr></thead>
              <tbody>
                {porZona.map(z=>(
                  <tr key={z.id}>
                    <td style={S.td}>{z.nombre}</td>
                    <td style={S.tdR}>{$(z.mo)}</td>
                    <td style={S.tdR}>{$(z.mat)}</td>
                    <td style={{...S.tdR,fontWeight:700}}>{$(z.total)}</td>
                    <td style={S.tdR}>{((z.total/totales.subtotal)*100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={S.card}>
            <div style={{fontWeight:800,fontSize:14,marginBottom:12}}>Composición precio</div>
            {[['Trabajos directos',totales.subtotal,'#1e293b'],['GG (10%)',totales.gg,'#f59e0b'],['Beneficio (12%)',totales.beneficio,'#10b981'],['IVA (21%)',totales.iva,'#ef4444'],['IIBB CABA (2.5%)',totales.iibb,'#8b5cf6']].map(([lbl,val,c])=>(
              <div key={lbl} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid #f1f5f9'}}>
                <span style={{fontSize:13}}>{lbl}</span>
                <span style={{fontWeight:700,color:c}}>{$(val)}</span>
              </div>
            ))}
            <div style={{background:'#0f172a',color:'#fff',borderRadius:10,padding:'12px 16px',marginTop:12,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div><div style={{fontSize:11,color:'#94a3b8'}}>TOTAL c/IVA+IIBB</div><div style={{fontSize:22,fontWeight:900}}>{$(totales.totalObra)}</div></div>
              <div style={{textAlign:'right'}}><div style={{fontSize:11,color:'#94a3b8'}}>$/m²</div><div style={{fontSize:17,fontWeight:800}}>{$(cxm2)}</div></div>
            </div>
          </div>
        </div>
      )}

      <div style={{display:'flex',gap:12,marginTop:16}}>
        <button style={{...S.btnS,flex:1}} onClick={onAnterior}>← Volver a zonas</button>
        <button style={{...S.btnP,flex:2}} onClick={()=>window.print()}>🖨️ Imprimir presupuesto completo</button>
      </div>
    </div>
  );
}

// ── Tabla genérica ─────────────────────────────────────────────
function TablaLineas({ lineas, cols }) {
  const [filtro, setFiltro] = useState('');
  const grupos = [...new Set(lineas.map(l=>l.grupoLabel))];
  const filtradas = filtro ? lineas.filter(l=>l.grupoLabel===filtro) : lineas;

  const COL = {
    ref:         {lbl:'Ítem',    style:{fontSize:11,color:'#94a3b8',width:70}},
    grupoLabel:  {lbl:'Zona',    style:{fontSize:11,color:'#64748b',maxWidth:120}},
    categoriaLabel:{lbl:'Categoría',style:{fontSize:11,color:'#64748b',maxWidth:120}},
    desc:        {lbl:'Descripción',style:{}},
    unidad:      {lbl:'U.',      style:{width:50,color:'#64748b'}},
    cant:        {lbl:'Cant.',   style:{textAlign:'right',width:70}},
    mo:          {lbl:'MO',      style:{textAlign:'right',width:130,color:'#1d4ed8'}},
    mat:         {lbl:'Mat.',    style:{textAlign:'right',width:130,color:'#15803d'}},
    total:       {lbl:'Total',   style:{textAlign:'right',width:130,fontWeight:700}},
  };

  const tMO  = filtradas.reduce((s,l)=>s+(l.subtotal_mo||0),0);
  const tMat = filtradas.reduce((s,l)=>s+(l.subtotal_mat||0),0);
  const tAll = filtradas.reduce((s,l)=>s+(l.subtotal||0),0);

  return (
    <div style={S.card}>
      <div style={{display:'flex',gap:10,alignItems:'center',marginBottom:10,flexWrap:'wrap'}}>
        <select style={{...S.input,marginBottom:0,width:220}} value={filtro} onChange={e=>setFiltro(e.target.value)}>
          <option value="">Todas las zonas ({lineas.length} ítems)</option>
          {grupos.map(g=><option key={g} value={g}>{g}</option>)}
        </select>
      </div>
      <div style={{overflowX:'auto'}}>
        <table style={S.tbl}>
          <thead><tr>
            {cols.map(c=><th key={c} style={{...S.th,...(COL[c]?.style||{})}}>{COL[c]?.lbl||c}</th>)}
          </tr></thead>
          <tbody>
            {filtradas.map(l=>(
              <tr key={l.id} style={{borderLeft:`3px solid ${ZONA_COLORS[l.zonaTipo]||'#e2e8f0'}`}}>
                {cols.map(c=>{
                  let v;
                  if(c==='ref') v=l.ref||'—';
                  else if(c==='grupoLabel') v=l.grupoLabel;
                  else if(c==='categoriaLabel') v=l.categoriaLabel;
                  else if(c==='desc') v=l.desc;
                  else if(c==='unidad') v=l.unidad;
                  else if(c==='cant') v=N(l.cant);
                  else if(c==='mo') v=$(l.subtotal_mo);
                  else if(c==='mat') v=$(l.subtotal_mat);
                  else if(c==='total') v=$(l.subtotal);
                  const st={...S.td,...(COL[c]?.style||{})};
                  return <td key={c} style={st}>{v}</td>;
                })}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{background:'#f8fafc',fontWeight:800}}>
              {cols.map(c=>{
                let v='';
                if(c==='desc') v=`TOTAL (${filtradas.length})`;
                if(c==='mo')   v=$(tMO);
                if(c==='mat')  v=$(tMat);
                if(c==='total')v=$(tAll);
                const st={...S.td,fontWeight:800,...(COL[c]?.style||{})};
                return <td key={c} style={st}>{v}</td>;
              })}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

// ── Tabla simple sin filtro ────────────────────────────────────
function TablaSimple({ lineas }) {
  return (
    <div style={{overflowX:'auto'}}>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.th}>Ítem</th><th style={S.th}>Descripción</th>
          <th style={{...S.th,width:50}}>U.</th>
          <th style={{...S.th,textAlign:'right',width:70}}>Cant.</th>
          <th style={{...S.th,textAlign:'right',width:120}}>MO</th>
          <th style={{...S.th,textAlign:'right',width:120}}>Mat.</th>
          <th style={{...S.th,textAlign:'right',width:130}}>Subtotal</th>
        </tr></thead>
        <tbody>
          {lineas.map(l=>(
            <tr key={l.id}>
              <td style={{...S.td,color:'#94a3b8',fontSize:11}}>{l.ref}</td>
              <td style={S.td}>{l.desc}</td>
              <td style={{...S.td,color:'#64748b'}}>{l.unidad}</td>
              <td style={S.tdR}>{N(l.cant)}</td>
              <td style={S.tdR}>{$(l.subtotal_mo)}</td>
              <td style={S.tdR}>{$(l.subtotal_mat)}</td>
              <td style={{...S.tdR,fontWeight:700}}>{$(l.subtotal)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Estilos ────────────────────────────────────────────────────
const S = {
  card:     {background:'#fff',borderRadius:14,padding:22,boxShadow:'0 2px 8px rgba(0,0,0,.06)'},
  label:    {fontSize:11,fontWeight:700,color:'#475569',marginBottom:4,display:'block',textTransform:'uppercase',letterSpacing:.5},
  input:    {width:'100%',padding:'8px 10px',border:'1px solid #e2e8f0',borderRadius:8,fontSize:14,outline:'none',boxSizing:'border-box',marginBottom:12},
  chip:     {display:'inline-flex',alignItems:'center',gap:6,padding:'8px 14px',borderRadius:10,fontSize:13,cursor:'pointer',userSelect:'none'},
  btnP:     {background:'#1e293b',color:'#fff',border:'none',borderRadius:10,padding:'12px 24px',fontWeight:800,fontSize:14,cursor:'pointer',width:'100%'},
  btnS:     {background:'#fff',color:'#1e293b',border:'2px solid #e2e8f0',borderRadius:10,padding:'12px 24px',fontWeight:700,fontSize:13,cursor:'pointer',width:'100%'},
  sectionH2:{fontWeight:800,fontSize:16,marginBottom:16,color:'#1e293b'},
  sectionH3:{fontSize:14,fontWeight:800,color:'#1e293b',margin:'14px 0 8px',borderBottom:'1px solid #f1f5f9',paddingBottom:4},
  tbl:      {width:'100%',borderCollapse:'collapse',fontSize:13},
  th:       {textAlign:'left',padding:'6px 10px',background:'#f8fafc',color:'#64748b',fontWeight:700,fontSize:11,textTransform:'uppercase',borderBottom:'2px solid #e2e8f0'},
  td:       {padding:'6px 10px',borderBottom:'1px solid #f8fafc',verticalAlign:'middle'},
  tdR:      {padding:'6px 10px',borderBottom:'1px solid #f8fafc',textAlign:'right',verticalAlign:'middle',fontVariantNumeric:'tabular-nums'},
};

// ════════════════════════════════════════════════════════════════
// ROOT
// ════════════════════════════════════════════════════════════════
export default function App() {
  const [pantalla, setPantalla] = useState(1);
  const [proyecto, setProyecto] = useState({
    nombre:'',cliente:'',direccion:'',
    tipoEstructura:'mamposteria',
    mCubiertos:100,mSemicubiertos:0,mBalcones:0,plantas:1,
    techo:'terraza',
  });
  const [zonas, setZonas] = useState([]);
  const [moneda, setMoneda] = useState('ARS');
  const [tc, setTc] = useState(1400);
  _tc=tc; _usd=moneda==='USD';

  const estructuraLineas = useMemo(()=>calcularEstructura(proyecto),
    [proyecto.tipoEstructura,proyecto.mCubiertos,proyecto.mSemicubiertos,proyecto.mBalcones,proyecto.techo]);

  const PASOS=['Datos del proyecto','Zonas y materiales','Resumen'];

  return (
    <div style={{fontFamily:'Inter,system-ui,sans-serif',background:'#f1f5f9',minHeight:'100vh',color:'#1e293b'}}>
      {/* Header */}
      <div style={{background:'#0f172a',color:'#fff',padding:'0 24px'}}>
        <div style={{maxWidth:1200,margin:'0 auto',display:'flex',alignItems:'center',gap:14,height:54}}>
          <div>
            <div style={{fontWeight:900,fontSize:17,letterSpacing:'-0.5px'}}>🏗️ Presupuestador ARQ</div>
            <div style={{fontSize:10,color:'#94a3b8'}}>Base ARQ Clarín · Mayo 2026 · CABA y GBA</div>
          </div>
          <div style={{flex:1}}/>
          {/* Moneda */}
          <div style={{display:'flex',alignItems:'center',gap:6}}>
            <span style={{fontSize:11,color:'#64748b'}}>TC Blue:</span>
            <div style={{display:'flex',alignItems:'center',background:'#1e293b',borderRadius:6,border:'1px solid #334155'}}>
              <input type="number" value={tc} onChange={e=>setTc(+e.target.value)} style={{width:68,background:'transparent',border:'none',color:'#94a3b8',fontSize:12,padding:'4px 6px',outline:'none',textAlign:'right'}}/>
              <span style={{fontSize:11,color:'#64748b',padding:'0 6px'}}>$/U$D</span>
            </div>
            <div style={{display:'flex',borderRadius:6,overflow:'hidden',border:'1px solid #334155'}}>
              {['ARS','USD'].map(m=>(
                <div key={m} style={{padding:'4px 10px',fontSize:11,fontWeight:700,cursor:'pointer',background:moneda===m?'#3b82f6':'transparent',color:moneda===m?'#fff':'#64748b'}} onClick={()=>setMoneda(m)}>{m}</div>
              ))}
            </div>
          </div>
          {/* Stepper */}
          <div style={{display:'flex',alignItems:'center',gap:3}}>
            {PASOS.map((p,i)=>{
              const n=i+1,act=pantalla===n,ok=pantalla>n;
              return (
                <div key={p} style={{display:'flex',alignItems:'center'}}>
                  {i>0&&<div style={{width:16,height:1,background:ok?'#3b82f6':'#334155',margin:'0 3px'}}/>}
                  <div style={{display:'flex',alignItems:'center',gap:5,cursor:ok?'pointer':'default'}} onClick={()=>ok&&setPantalla(n)}>
                    <div style={{width:20,height:20,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:800,background:ok?'#3b82f6':act?'#fff':'#334155',color:ok||act?'#0f172a':'#94a3b8',border:act?'2px solid #3b82f6':'2px solid transparent'}}>{ok?'✓':n}</div>
                    <span style={{fontSize:11,fontWeight:act?700:500,color:act?'#fff':'#64748b'}}>{p}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {pantalla===1&&<Pantalla1 proyecto={proyecto} setProyecto={setProyecto} onSiguiente={()=>setPantalla(2)}/>}
      {pantalla===2&&<Pantalla2 zonas={zonas} setZonas={setZonas} onSiguiente={()=>setPantalla(3)} onAnterior={()=>setPantalla(1)}/>}
      {pantalla===3&&<Pantalla3 proyecto={proyecto} zonas={zonas} estructuraLineas={estructuraLineas} onAnterior={()=>setPantalla(2)}/>}
    </div>
  );
}
