// ══════════════════════════════════════════════════════════════
// MOTOR DE CÁLCULO REAL — Basado en ARQ Clarín Mayo 2026
// Rendimientos reales de obra · Plomería y electricidad completa
// ══════════════════════════════════════════════════════════════
import {
  ESTRUCTURA_AUTO, PRECIO_MO_CLARIN, PRECIO_MAT_CLARIN,
  ZONA_TIPOS, INODOROS, PLOMERIA, ELECTRICIDAD,
} from '../data/materiales.js';

export const R = (n, d = 0) => Math.round(n * Math.pow(10, d)) / Math.pow(10, d);

// ── Rendimientos REALES por rubro (m² o u / jornal) ──────────
// Fuente: estándares UOCRA + experiencia obra residencial GBA
const RENDIMIENTOS = {
  preliminares:   { m2_por_jornal: 50,  jornales_fijos: 2   },
  excavacion:     { m3_por_jornal: 4                          },
  hormigon:       { m3_por_jornal: 3,   dias_fraguado: 7      },
  mamposteria:    { m2_por_jornal: 5,   crew: 2               }, // 2 albañiles
  steel_frame:    { m2_por_jornal: 12,  crew: 2               },
  losa_vigueta:   { m2_por_jornal: 20,  dias_fraguado: 14     },
  cubierta_chapa: { m2_por_jornal: 8                          },
  cubierta_teja:  { m2_por_jornal: 5                          },
  sanitaria_rough:{ dias_por_bano: 3                          }, // plomero
  electrica_rough:{ m2_por_jornal: 18                         }, // electricista
  revoque_grueso: { m2_por_jornal: 7                          },
  revoque_fino:   { m2_por_jornal: 9                          },
  cielorraso:     { m2_por_jornal: 8                          },
  ceramica_piso:  { m2_por_jornal: 4                          },
  porc_piso:      { m2_por_jornal: 3                          },
  parquet:        { m2_por_jornal: 4                          },
  ceramica_pared: { m2_por_jornal: 3.5                        },
  terminacion_san:{ artefactos_dia: 4                         }, // plomero (artefactos)
  pintura:        { m2_por_jornal: 20,  manos: 2              },
  limpieza:       { jornales_fijos: 3                         },
};

// ── 1. ESTRUCTURA AUTOMÁTICA ──────────────────────────────────
export function calcularEstructura(proyecto) {
  const { tipoEstructura, mCubiertos, mSemicubiertos, mBalcones, techo } = proyecto;
  const m2 = (mCubiertos||0) + (mSemicubiertos||0)*0.5 + (mBalcones||0)*0.5;
  if (m2 <= 0) return [];

  const items = ESTRUCTURA_AUTO[tipoEstructura] || ESTRUCTURA_AUTO.mamposteria;
  const lineas = items.map((it, i) => {
    const cant = R(it.coef * m2);
    const mo  = PRECIO_MO_CLARIN[it.ref]  || 0;
    const mat = PRECIO_MAT_CLARIN[it.ref] || 0;
    return {
      id: `est_${i}`,
      grupo: 'estructura', grupoLabel: '🏗️ Estructura',
      rubro: 'estructura',
      ref: it.ref, desc: it.desc, unidad: it.u,
      cant, precio_mo: mo, precio_mat: mat,
      subtotal_mo: R(cant * mo),
      subtotal_mat: R(cant * mat),
      subtotal: R(cant * (mo + mat)),
    };
  });

  // Techo
  const techoRef = { terraza:'10.01', dos_aguas:'10.03', steel_frame:'10.07' };
  const techoDesc = {
    terraza:    'Cubierta terraza: barrera vapor + membrana alum. 4mm',
    dos_aguas:  'Cubierta teja francesa + estructura madera vista',
    steel_frame:'Cubierta chapa sándwich PIR c/aislación térmica',
  };
  const tRef = techoRef[techo]  || '10.01';
  const m2t  = R((mCubiertos||0) * 1.08);
  const tMO  = PRECIO_MO_CLARIN[tRef]  || 253845;
  const tMAT = PRECIO_MAT_CLARIN[tRef] || 95000;
  lineas.push({
    id:'est_techo', grupo:'estructura', grupoLabel:'🏗️ Estructura',
    rubro:'estructura', ref:tRef,
    desc: techoDesc[techo] || techoDesc.terraza,
    unidad:'m²', cant:m2t,
    precio_mo: tMO, precio_mat: tMAT,
    subtotal_mo: R(m2t * tMO), subtotal_mat: R(m2t * tMAT),
    subtotal: R(m2t * (tMO + tMAT)),
  });

  return lineas;
}

// ── 2. PLOMERÍA COMPLETA POR BAÑO ─────────────────────────────
// Calcula caños, codos, tees, flexibles, téflón desde sala de máquinas
function calcularPlomeriaZona(zona, m2Edificio) {
  const tipoDef = ZONA_TIPOS[zona.tipo];
  const dist = Math.max(5, Math.ceil(Math.sqrt(m2Edificio) * 0.75)); // metros de caño SM→baño
  const conBidet = zona.conBidet !== false;
  const nArtefactos = 2 + (conBidet ? 1 : 0); // lavatorio + ducha + bidet

  // Tramos de caño frío + caliente
  const tramos25 = Math.ceil(dist / 4) * 2;  // ×2: ida AF + AC
  const tramos20 = 3;                          // ramales interiores

  const plom = [
    // DESAGÜE
    { k:'pvc_110_2m', cant: Math.ceil(dist * 0.3) + 1, rubro_exp: 'Plomería — Desagüe' },
    { k:'pvc_063_2m', cant: 1,                          rubro_exp: 'Plomería — Desagüe' },
    { k:'codo_pvc90_110', cant: 3,                      rubro_exp: 'Plomería — Desagüe' },
    { k:'tee_pvc_110',    cant: 2,                      rubro_exp: 'Plomería — Desagüe' },
    { k:'pvc_50_2m',      cant: 1,                      rubro_exp: 'Plomería — Desagüe' },
    // AGUA FRÍA + CALIENTE
    { k:'tf_25_4m',   cant: tramos25,                   rubro_exp: 'Plomería — Agua fría/caliente' },
    { k:'tf_20_4m',   cant: tramos20,                   rubro_exp: 'Plomería — Agua fría/caliente' },
    { k:'codo_tf_25', cant: Math.ceil(dist * 0.4),      rubro_exp: 'Plomería — Agua fría/caliente' },
    { k:'codo_tf_20', cant: 4 * 2,                      rubro_exp: 'Plomería — Agua fría/caliente' },
    { k:'tee_tf_20',  cant: 3,                           rubro_exp: 'Plomería — Agua fría/caliente' },
    // CONEXIONES
    { k:'flexible_12', cant: nArtefactos * 2,           rubro_exp: 'Plomería — Conexiones' },
    { k:'llave_12',    cant: 2,                         rubro_exp: 'Plomería — Conexiones' },
    { k:'teflon',      cant: 3,                         rubro_exp: 'Plomería — Conexiones' },
    { k:'sellarosca',  cant: 2,                         rubro_exp: 'Plomería — Conexiones' },
  ];

  // MO plomería rough baño: maestro plomero 3 jornales = estimado por jornal de $112,000
  const MO_ROUGH_BANO = 336000;
  const lineas = plom.map((p, i) => {
    const def = PLOMERIA[p.k];
    if (!def) return null;
    const mat = R(p.cant * def.precio);
    return {
      id: `z_${zona.id}_plom_${i}`,
      grupo: `zona_${zona.id}`,
      grupoLabel: `🚿 ${zona.nombre}`,
      zonaId: zona.id, zonaNombre: zona.nombre, zonaTipo: zona.tipo,
      categoria: 'plomeria', categoriaLabel: 'Plomería',
      rubro_exportacion: p.rubro_exp,
      marca: 'Materiales sanitarios',
      desc: def.desc, unidad: def.unidad, cant: p.cant,
      precio_mo: i === 0 ? MO_ROUGH_BANO : 0,
      precio_mat: def.precio,
      subtotal_mo: i === 0 ? MO_ROUGH_BANO : 0,
      subtotal_mat: mat,
      subtotal: (i === 0 ? MO_ROUGH_BANO : 0) + mat,
    };
  }).filter(Boolean);

  return lineas;
}

// ── 3. ELECTRICIDAD COMPLETA POR ZONA ─────────────────────────
function calcularElectricidadZona(zona, m2Edificio) {
  // Circuitos por zona según tipo
  const circuitosPorTipo = {
    bano:12, cocina:20, habitacion:8, living:12, garage:6, sala_maquinas:8, default:6,
  };
  const nCircuitos = circuitosPorTipo[zona.tipo] || circuitosPorTipo.default;
  // ml de caño liviano 3/8" = perímetro zona × 1.5 (subida + horizontal)
  const mlCano = Math.ceil(Math.sqrt(zona.m2) * 4 * 1.5);
  // metros de cable = ml × 2 cables × 1.2 factor
  const mCable = Math.ceil(mlCano * 2.4);
  const canos38  = Math.ceil(mlCano / 3);   // caños de 3m
  const cable25r = Math.ceil(mCable / 100) + 1; // rollos 100m

  const elec = [
    { k:'cano_38',  cant: canos38,  rubro_exp:'Electricidad — Caños y conductos' },
    { k:'cable_25_100', cant: cable25r, rubro_exp:'Electricidad — Cables' },
    { k:'termica_25',   cant: Math.ceil(nCircuitos / 3), rubro_exp:'Electricidad — Tablero y protecciones' },
  ];

  // Tablero lo agregamos una sola vez (no por zona sino por edificio en sala_maquinas)
  const MO_ELEC_ZONA = R(zona.m2 * 3800); // ~$3,800/m² MO electricidad rough

  return elec.map((e, i) => {
    const def = ELECTRICIDAD[e.k];
    if (!def) return null;
    return {
      id:`z_${zona.id}_elec_${i}`,
      grupo:`zona_${zona.id}`, grupoLabel:`${ZONA_TIPOS[zona.tipo]?.icon||'🔌'} ${zona.nombre}`,
      zonaId:zona.id, zonaNombre:zona.nombre, zonaTipo:zona.tipo,
      categoria:'electricidad', categoriaLabel:'Electricidad',
      rubro_exportacion: e.rubro_exp,
      marca:'Materiales eléctricos',
      desc:def.desc, unidad:def.unidad, cant:e.cant,
      precio_mo: i === 0 ? MO_ELEC_ZONA : 0,
      precio_mat: def.precio,
      subtotal_mo: i === 0 ? MO_ELEC_ZONA : 0,
      subtotal_mat: R(e.cant * def.precio),
      subtotal: (i === 0 ? MO_ELEC_ZONA : 0) + R(e.cant * def.precio),
    };
  }).filter(Boolean);
}

// ── 4. LÍNEAS COMPLETAS POR ZONA ──────────────────────────────
export function calcularLineasZona(zona, m2Edificio = 100) {
  const tipoDef = ZONA_TIPOS[zona.tipo];
  if (!tipoDef) return [];

  const lineas = [];
  const inodSel = INODOROS.find(i => i.id === zona.materiales?.inodoro?.id);
  const conBidet = zona.conBidet !== false;

  // Materiales seleccionados por el arquitecto
  tipoDef.categorias.forEach(cat => {
    const sel = zona.materiales?.[cat.id];
    if (!sel || sel.tipo === 'omitir') return;

    let precio_mat, precio_mo, desc, marca;
    if (sel.tipo === 'personalizado') {
      precio_mat = sel.precio_mat || 0;
      precio_mo  = sel.precio_mo  || 0;
      desc  = sel.desc  || cat.nombre;
      marca = sel.marca || 'Personalizado';
    } else {
      const op = cat.opciones?.find(o => o.id === sel.id);
      if (!op) return;
      precio_mat = op.precio_mat; precio_mo = op.precio_mo;
      desc = op.desc; marca = op.marca;
    }

    const desp = cat.desperdicio || 0;
    let cant;
    if (cat.unidad === 'm²') cant = R(zona.m2 * (1 + desp));
    else if (cat.unidad === 'ml') cant = R(Math.sqrt(zona.m2) * 2);
    else cant = 1;

    lineas.push({
      id:`z_${zona.id}_${cat.id}`,
      grupo:`zona_${zona.id}`, grupoLabel:`${tipoDef.icon} ${zona.nombre}`,
      zonaId:zona.id, zonaNombre:zona.nombre, zonaTipo:zona.tipo,
      categoria:cat.id, categoriaLabel:cat.nombre,
      rubro_exportacion: categoriaARubro(cat.id),
      marca, desc, unidad:cat.unidad, cant,
      precio_mo, precio_mat,
      subtotal_mo: R(cant * precio_mo),
      subtotal_mat: R(cant * precio_mat),
      subtotal: R(cant * (precio_mo + precio_mat)),
    });
  });

  // INODORO (del catálogo INODOROS)
  if (inodSel && zona.materiales?.inodoro?.id) {
    lineas.push({
      id:`z_${zona.id}_inodoro`,
      grupo:`zona_${zona.id}`, grupoLabel:`${tipoDef.icon} ${zona.nombre}`,
      zonaId:zona.id, zonaNombre:zona.nombre, zonaTipo:'bano',
      categoria:'inodoro', categoriaLabel:'Inodoro',
      rubro_exportacion:'Sanitarios',
      marca:inodSel.marca, desc:inodSel.desc, unidad:'u', cant:1,
      precio_mo: PRECIO_MO_CLARIN['23.01'] || 87085,
      precio_mat: inodSel.precio_mat,
      subtotal_mo: PRECIO_MO_CLARIN['23.01'] || 87085,
      subtotal_mat: inodSel.precio_mat,
      subtotal: (PRECIO_MO_CLARIN['23.01']||87085) + inodSel.precio_mat,
    });

    // BIDET — mismo brand, auto
    if (conBidet && inodSel.bidet_precio > 0) {
      lineas.push({
        id:`z_${zona.id}_bidet`,
        grupo:`zona_${zona.id}`, grupoLabel:`${tipoDef.icon} ${zona.nombre}`,
        zonaId:zona.id, zonaNombre:zona.nombre, zonaTipo:'bano',
        categoria:'bidet', categoriaLabel:`Bidet (mismo que inodoro: ${inodSel.marca} ${inodSel.linea})`,
        rubro_exportacion:'Sanitarios',
        marca:inodSel.marca,
        desc:`${inodSel.marca} ${inodSel.linea} bidet 3 agujeros`,
        unidad:'u', cant:1,
        precio_mo: PRECIO_MO_CLARIN['23.01'] || 87085,
        precio_mat: inodSel.bidet_precio,
        subtotal_mo: PRECIO_MO_CLARIN['23.01'] || 87085,
        subtotal_mat: inodSel.bidet_precio,
        subtotal: (PRECIO_MO_CLARIN['23.01']||87085) + inodSel.bidet_precio,
      });
    }

    // Asiento inodoro
    const asientoSel = zona.materiales?.asiento?.id;
    const asientoPrecios = { asiento_plast: 27000, asiento_mad: 55000 };
    const asientoDesc = { asiento_plast: 'Asiento plástico reforzado', asiento_mad: 'Asiento madera laqueada' };
    if (asientoSel) {
      lineas.push({
        id:`z_${zona.id}_asiento`,
        grupo:`zona_${zona.id}`, grupoLabel:`${tipoDef.icon} ${zona.nombre}`,
        zonaId:zona.id, zonaNombre:zona.nombre, zonaTipo:'bano',
        categoria:'asiento', categoriaLabel:'Asiento inodoro',
        rubro_exportacion:'Sanitarios',
        marca:inodSel.marca, desc:asientoDesc[asientoSel]||asientoSel, unidad:'u', cant:1,
        precio_mo:0, precio_mat: asientoPrecios[asientoSel]||0,
        subtotal_mo:0, subtotal_mat: asientoPrecios[asientoSel]||0,
        subtotal: asientoPrecios[asientoSel]||0,
      });
    }
  }

  // PLOMERÍA completa (baño y cocina)
  if (['bano','cocina','sala_maquinas'].includes(zona.tipo)) {
    lineas.push(...calcularPlomeriaZona(zona, m2Edificio));
  }

  // ELECTRICIDAD por zona
  lineas.push(...calcularElectricidadZona(zona, m2Edificio));

  return lineas;
}

// Mapeo categoría → rubro exportación
function categoriaARubro(cat) {
  const m = {
    piso:'Pisos', piso_ext:'Pisos exteriores', revestimiento:'Revestimientos',
    pintura:'Pintura', cielorraso:'Cielorrasos',
    lavatorio:'Sanitarios', griferia_lav:'Griferías', griferia_ducha:'Griferías',
    griferia:'Griferías', pileta_coc:'Sanitarios', mesada:'Marmolería',
    plomeria:'Plomería', electricidad:'Electricidad',
    caldera:'Calefacción', tanque:'Instalaciones', cubierta:'Cubierta',
    inodoro:'Sanitarios', bidet:'Sanitarios', accesorios:'Sanitarios',
    porton:'Carpintería', camaras:'Seguridad', alarma:'Seguridad',
    tipo_pileta:'Pileta', equipo:'Pileta',
    riego:'Jardín',
  };
  return m[cat] || 'Varios';
}

// ── 5. TOTALES ────────────────────────────────────────────────
export function calcularTotales(lineas) {
  const sub_mo  = R(lineas.reduce((s,l) => s + (l.subtotal_mo  || 0), 0));
  const sub_mat = R(lineas.reduce((s,l) => s + (l.subtotal_mat || 0), 0));
  const subtotal = R(sub_mo + sub_mat);
  const gg        = R(subtotal * 0.10);
  const beneficio = R(subtotal * 0.12);
  const base_iva  = R(subtotal + gg + beneficio);
  const iva       = R(base_iva * 0.21);
  const iibb      = R(base_iva * 0.025);
  const totalObra = R(base_iva + iva + iibb);
  return { sub_mo, sub_mat, subtotal, gg, beneficio, base_iva, iva, iibb, totalObra };
}

// ── 6. RESUMEN POR ZONA ────────────────────────────────────────
export function resumenPorZona(lineas) {
  const map = {};
  lineas.forEach(l => {
    const key = l.zonaId || 'estructura';
    if (!map[key]) map[key] = {
      id:key, nombre:l.grupoLabel||'Estructura', mo:0, mat:0, total:0, items:0
    };
    map[key].mo    += l.subtotal_mo  || 0;
    map[key].mat   += l.subtotal_mat || 0;
    map[key].total += l.subtotal     || 0;
    map[key].items++;
  });
  return Object.values(map);
}

// ── 7. CONSOLIDAR MATERIALES (agrupa ítems iguales) ───────────
export function consolidarMateriales(lineas) {
  const map = {};
  lineas.forEach(l => {
    if (!l.subtotal_mat || l.subtotal_mat <= 0) return;
    const key = `${l.desc}__${l.unidad}__${l.precio_mat}`;
    if (!map[key]) {
      map[key] = {
        desc:l.desc, marca:l.marca, unidad:l.unidad, precio_mat:l.precio_mat,
        cant:0, total_mat:0, zonas:[], rubro:l.rubro_exportacion||'Varios',
        categoriaLabel:l.categoriaLabel,
      };
    }
    map[key].cant      += l.cant || 0;
    map[key].total_mat += l.subtotal_mat || 0;
    if (!map[key].zonas.includes(l.zonaNombre||'Estructura')) {
      map[key].zonas.push(l.zonaNombre||'Estructura');
    }
  });
  return Object.values(map).sort((a,b) => a.rubro.localeCompare(b.rubro) || a.desc.localeCompare(b.desc));
}

// ── 8. CRONOGRAMA REAL ────────────────────────────────────────
// Duración en días hábiles basada en rendimientos reales
export function calcularCronograma(proyecto, zonas = []) {
  const m2  = Math.max(20, proyecto.mCubiertos || 0);
  const nBa = zonas.filter(z => z.tipo === 'bano').length || 1;
  const tipo = proyecto.tipoEstructura;
  const CREW = 4; // maestro + 2 oficiales + ayudante
  const DH   = 22; // días hábiles/mes

  const dias = (m2, rend, crew=1) => Math.max(1, Math.ceil(m2 / (rend * (crew||1))));

  const etapas = [
    {
      etapa:'Trabajos preliminares y obrador',
      dias: 5 + Math.ceil(m2 * 0.02),
      pct:2, gremio:'Varios',
    },
    {
      etapa:'Excavación y movimiento de tierra',
      dias: dias(m2 * 0.05, 4, 2),
      pct:3, gremio:'Excavaciones',
    },
    {
      etapa:'Fundaciones y estructura H°A°',
      dias: tipo==='haa'
        ? dias(m2 * 0.12, 3, 2) + 14 // fraguado
        : dias(m2 * 0.10, 3, 2) + 7,
      pct:18, gremio:'Hormigón',
    },
    {
      etapa: tipo==='steel_frame'
        ? 'Tabiquería y paneles Steel Frame'
        : tipo==='haa'
        ? 'Cerramiento y tabiques H°A°'
        : 'Mampostería y encadenados',
      dias: tipo==='steel_frame'
        ? dias(m2 * 1.6, 12, CREW)
        : dias(m2 * 0.95, 5, CREW),
      pct:15, gremio:'Albañilería',
    },
    {
      etapa:'Cubierta y techo',
      dias: proyecto.techo==='terraza'
        ? dias(m2 * 1.05, 8, 2) + 7
        : dias(m2 * 1.08, 5, 2),
      pct:8, gremio:'Cubierta',
    },
    {
      etapa:'Instalación sanitaria (cañería rough)',
      dias: dias(nBa, 1/3, 1), // 3 días/baño, 1 plomero
      pct:10, gremio:'Plomería',
    },
    {
      etapa:'Instalación eléctrica (cañería rough)',
      dias: dias(m2, 18, 1), // electricista
      pct:8, gremio:'Electricidad',
    },
    {
      etapa:'Revoques gruesos y finos',
      dias: dias(m2 * 2.2, 7, CREW),
      pct:12, gremio:'Yesería',
    },
    {
      etapa:'Cielorrasos',
      dias: dias(m2 * 0.9, 8, 2),
      pct:5, gremio:'Yesería',
    },
    {
      etapa:'Pisos y revestimientos cerámicos',
      dias: dias(m2 * 0.7, 3.5, 2) + dias(m2 * 0.3 + nBa * 8, 3.5, 2),
      pct:10, gremio:'Colocador cerámico',
    },
    {
      etapa:'Colocación artefactos y terminación sanitaria',
      dias: Math.ceil(nBa * 1.5),
      pct:5, gremio:'Plomería',
    },
    {
      etapa:'Instalación eléctrica (terminación)',
      dias: dias(m2, 25, 1),
      pct:5, gremio:'Electricidad',
    },
    {
      etapa:'Pintura (2 manos interior + exterior)',
      dias: dias(m2 * 2.4, 20, 2),
      pct:7, gremio:'Pintura',
    },
    {
      etapa:'Carpintería, vidrios y herrajes',
      dias: Math.ceil(m2 * 0.05) + 4,
      pct:4, gremio:'Carpintería',
    },
    {
      etapa:'Limpieza final y entrega',
      dias: 3,
      pct:1, gremio:'Limpieza',
    },
  ];

  let diaAcum = 0;
  const totalDias = etapas.reduce((s,e) => s + e.dias, 0);
  return etapas.map(e => {
    const inicio  = diaAcum;
    const fin     = diaAcum + e.dias;
    diaAcum = fin;
    return {
      ...e,
      dia_inicio: inicio,
      dia_fin:    fin,
      mes_inicio: +(inicio / DH).toFixed(1),
      mes_fin:    +(fin    / DH).toFixed(1),
      pct_acum:   Math.round((fin / totalDias) * 100),
    };
  });
}
