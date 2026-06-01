// ══════════════════════════════════════════════════════════════
// MOTOR DE CÁLCULO REAL — Basado en ARQ Clarín Mayo 2026
// Rendimientos UOCRA · Plomería y electricidad pieza a pieza
// ══════════════════════════════════════════════════════════════
import {
  ESTRUCTURA_AUTO, PRECIO_MO_CLARIN, PRECIO_MAT_CLARIN,
  ZONA_TIPOS, INODOROS, PLOMERIA, ELECTRICIDAD,
} from '../data/materiales.js';

export const R = (n, d = 0) => Math.round(n * Math.pow(10, d)) / Math.pow(10, d);

// ── 1. ESTRUCTURA AUTOMÁTICA ──────────────────────────────────
export function calcularEstructura(proyecto) {
  const { tipoEstructura, mCubiertos, mSemicubiertos, mBalcones, techo } = proyecto;
  const m2 = (mCubiertos||0) + (mSemicubiertos||0)*0.5 + (mBalcones||0)*0.5;
  if (m2 <= 0) return [];

  const items = ESTRUCTURA_AUTO[tipoEstructura] || ESTRUCTURA_AUTO.mamposteria;
  const lineas = items.map((it, i) => {
    const cant = R(it.coef * m2);
    const mo   = PRECIO_MO_CLARIN[it.ref]  || 0;
    const mat  = PRECIO_MAT_CLARIN[it.ref] || 0;
    return {
      id: `est_${i}`,
      grupo: 'estructura',  grupoLabel: '🏗️ Estructura',
      rubro: 'estructura',  rubro_exportacion: 'Estructura',
      marca: 'Varios',      categoria: 'estructura', categoriaLabel: 'Estructura',
      zonaId: null,         zonaNombre: 'Estructura', zonaTipo: null,
      ref: it.ref, desc: it.desc, unidad: it.u,
      cant, precio_mo: mo, precio_mat: mat,
      subtotal_mo:  R(cant * mo),
      subtotal_mat: R(cant * mat),
      subtotal:     R(cant * (mo + mat)),
    };
  });

  // Cubierta / techo
  const techoRef  = { terraza:'10.01', dos_aguas:'10.03', steel_frame:'10.07' };
  const techoDesc = {
    terraza:     'Cubierta terraza: barrera vapor + membrana alum. 4mm',
    dos_aguas:   'Cubierta teja francesa + estructura madera vista',
    steel_frame: 'Cubierta chapa sándwich PIR c/aislación térmica',
  };
  const tRef = techoRef[techo] || '10.01';
  const m2t  = R((mCubiertos||0) * 1.08);
  const tMO  = PRECIO_MO_CLARIN[tRef]  || 253845;
  const tMAT = PRECIO_MAT_CLARIN[tRef] || 95000;
  lineas.push({
    id: 'est_techo',
    grupo: 'estructura',  grupoLabel: '🏗️ Estructura',
    rubro: 'estructura',  rubro_exportacion: 'Estructura',
    marca: 'Varios',      categoria: 'cubierta', categoriaLabel: 'Cubierta',
    zonaId: null,         zonaNombre: 'Estructura', zonaTipo: null,
    ref: tRef, desc: techoDesc[techo] || techoDesc.terraza,
    unidad: 'm²', cant: m2t,
    precio_mo: tMO, precio_mat: tMAT,
    subtotal_mo:  R(m2t * tMO),
    subtotal_mat: R(m2t * tMAT),
    subtotal:     R(m2t * (tMO + tMAT)),
  });

  return lineas;
}

// ══════════════════════════════════════════════════════════════
// PLOMERÍA BAÑO — pieza a pieza
// ══════════════════════════════════════════════════════════════
// Metodología:
//   dist = distancia estimada (metros) desde sala de máquinas hasta el baño
//   conBidet = true → incluye ramal bidet en desagüe y supply
//
// Desagüe:
//   110mm — colector inodoro hasta ramal cloacal
//   75mm  — ducha + bidet + lavatorio hasta colector
//   50mm  — columna ventilación
//   40mm  — ventilación secundaria
//
// Supply (termofusión):
//   25mm → 20mm → 16mm  (distribución principal → ramales → llegadas artefactos)
// ══════════════════════════════════════════════════════════════
function calcularPlomeriaZona(zona, m2Edificio) {
  const dist     = Math.max(4, Math.ceil(Math.sqrt(m2Edificio) * 0.7));
  const conBidet = zona.conBidet !== false;

  // Cantidad de artefactos con supply (lavatorio + ducha + bidet optativo)
  const nArtef = 2 + (conBidet ? 1 : 0);

  // Caños 110mm: tramo inodoro → colector (1 caño cada 2m + la vuelta)
  const canos110 = Math.max(2, Math.ceil(dist / 2));
  // Caños 75mm: siempre 3 (lavatorio + ducha + bidet hasta colector)
  const canos075 = 3 + (conBidet ? 1 : 0);
  // Tramos supply 25mm: ida (AF) + ida (AC) × tramos de 4m hasta baño
  const tramos25 = Math.max(2, Math.ceil(dist / 4)) * 2;
  // Tramos 20mm: distribución interna (4m alcanza siempre para el baño)
  const tramos20 = 2;
  // Tramos 16mm: llegada a cada artefacto (AF + AC = 2 tramos por artefacto)
  const tramos16 = nArtef * 2;

  // Codos 25mm: arranque SM + quiebres de recorrido (≈ 1 cada 2m de dist)
  const codos25 = 2 + Math.ceil(dist / 2);
  // Codos 20mm: distribución interna baño (2 por ramal)
  const codos20 = nArtef * 2;
  // Codos 16mm: llegada a artefacto (1 codo por llegada AF + 1 por AC)
  const codos16 = nArtef * 2;

  // Tees 20mm: 1 por cada derivación (AF + AC)
  const tees20 = nArtef;
  // Reducciones 25→20: arranque de distribución (AF + AC)
  const red25_20 = 2;
  // Reducciones 20→16: 1 por cada llegada a artefacto (AF + AC)
  const red20_16 = nArtef * 2;

  const plom = [
    // ── DESAGÜE CLOACAL ──────────────────────────────────────
    { k:'pvc_110_2m',      cant: canos110,          rubro:'Plomería — Desagüe',        desc_override: null },
    { k:'pvc_075_2m',      cant: canos075,           rubro:'Plomería — Desagüe',        desc_override: null },
    { k:'pvc_050_2m',      cant: 1,                  rubro:'Plomería — Desagüe',        desc_override: 'Caño PVC 50mm ventilación (columna)' },
    { k:'pvc_040_2m',      cant: 1,                  rubro:'Plomería — Desagüe',        desc_override: 'Caño PVC 40mm ventilación secundaria' },
    { k:'codo_pvc90_110',  cant: 2,                  rubro:'Plomería — Desagüe' },
    { k:'codo_pvc45_110',  cant: 1,                  rubro:'Plomería — Desagüe' },
    { k:'codo_pvc90_075',  cant: 2 + (conBidet?1:0), rubro:'Plomería — Desagüe' },
    { k:'codo_pvc45_075',  cant: 2,                  rubro:'Plomería — Desagüe' },
    { k:'tee_pvc_110',     cant: 1,                  rubro:'Plomería — Desagüe' },
    { k:'tee_red_110_075', cant: 1 + (conBidet?1:0), rubro:'Plomería — Desagüe' },
    { k:'tee_red_075_050', cant: 1,                  rubro:'Plomería — Desagüe' },
    { k:'cupla_pvc_110',   cant: Math.ceil(canos110/2), rubro:'Plomería — Desagüe' },
    { k:'cupla_pvc_075',   cant: 2,                  rubro:'Plomería — Desagüe' },
    { k:'colarin_110',     cant: 1,                  rubro:'Plomería — Desagüe',        desc_override: 'Collarín inodoro PVC 110mm c/tornillos' },
    { k:'sifon_ducha',     cant: 1,                  rubro:'Plomería — Desagüe' },
    { k:'rejilla_piso_50', cant: 1,                  rubro:'Plomería — Desagüe' },
    { k:'tapon_inspeccion',cant: 1,                  rubro:'Plomería — Desagüe' },
    { k:'adhesivo_pvc',    cant: 1,                  rubro:'Plomería — Desagüe' },

    // ── AGUA FRÍA + CALIENTE (termofusión) ───────────────────
    { k:'tf_25_4m',        cant: tramos25,            rubro:'Plomería — Agua fría/caliente' },
    { k:'tf_20_4m',        cant: tramos20,            rubro:'Plomería — Agua fría/caliente' },
    { k:'tf_16_4m',        cant: tramos16,            rubro:'Plomería — Agua fría/caliente' },
    { k:'codo_tf_25',      cant: codos25,             rubro:'Plomería — Agua fría/caliente' },
    { k:'codo_tf_20',      cant: codos20,             rubro:'Plomería — Agua fría/caliente' },
    { k:'codo_tf_16',      cant: codos16,             rubro:'Plomería — Agua fría/caliente' },
    { k:'tee_tf_25',       cant: 2,                   rubro:'Plomería — Agua fría/caliente' }, // bifurcación AF + AC
    { k:'tee_tf_20',       cant: tees20,              rubro:'Plomería — Agua fría/caliente' },
    { k:'red_tf_25_20',    cant: red25_20,            rubro:'Plomería — Agua fría/caliente' },
    { k:'red_tf_20_16',    cant: red20_16,            rubro:'Plomería — Agua fría/caliente' },
    { k:'cupla_tf_20',     cant: 2,                   rubro:'Plomería — Agua fría/caliente' },

    // ── CONEXIONES Y LLAVES ──────────────────────────────────
    { k:'flexible_12',     cant: nArtef * 2,          rubro:'Plomería — Conexiones' }, // AF+AC por artefacto
    { k:'flexible_38',     cant: 1,                   rubro:'Plomería — Conexiones',   desc_override: 'Flexible 3/8" mochila inodoro' },
    { k:'llave_12',        cant: nArtef,              rubro:'Plomería — Conexiones' }, // 1 por artefacto (AC)
    { k:'valvula_escl_34', cant: 1,                   rubro:'Plomería — Conexiones',   desc_override: 'Válvula esclusa 3/4" llave general baño' },
    { k:'teflon',          cant: 4,                   rubro:'Plomería — Conexiones' },
    { k:'sellarosca',      cant: 2,                   rubro:'Plomería — Conexiones' },
  ];

  // MO rough baño: maestro plomero + ayudante, ~3 jornales
  // Jornal maestro plomero UOCRA = ~$112,000/día → 3 días = $336,000
  const MO_ROUGH_BANO = 336000;

  return _lineasPlomeria(plom, zona, `🚿 ${zona.nombre}`, MO_ROUGH_BANO, 'z_plom');
}

// ══════════════════════════════════════════════════════════════
// PLOMERÍA COCINA — pieza a pieza
// ══════════════════════════════════════════════════════════════
// Desagüe: pileta cocina (75mm) + lavarropa (50mm)
// Supply: pileta cocina + lavarropa + lavavajillas (todos 1/2")
// ══════════════════════════════════════════════════════════════
function calcularPlomeriaCocina(zona, m2Edificio) {
  const dist = Math.max(3, Math.ceil(Math.sqrt(m2Edificio) * 0.45));

  const tramos25 = Math.max(2, Math.ceil(dist / 4)) * 2; // AF + AC
  const tramos20 = 2;
  const tramos16 = 6; // pileta AF+AC + lavarropa AF+AC + lavavajillas AF+AC
  const codos25  = 2 + Math.ceil(dist / 2);
  const codos20  = 3;
  const codos16  = 4;

  const plom = [
    // ── DESAGÜE ──────────────────────────────────────────────
    { k:'pvc_075_2m',      cant: Math.max(1, Math.ceil(dist/2)),  rubro:'Plomería — Desagüe', desc_override:'Caño PVC 75mm desagüe pileta cocina' },
    { k:'pvc_050_2m',      cant: 2,                               rubro:'Plomería — Desagüe', desc_override:'Caño PVC 50mm desagüe lavarropa + ventilación' },
    { k:'pvc_040_2m',      cant: 1,                               rubro:'Plomería — Desagüe', desc_override:'Caño PVC 40mm ventilación secundaria' },
    { k:'codo_pvc90_075',  cant: 2,                               rubro:'Plomería — Desagüe' },
    { k:'codo_pvc45_075',  cant: 1,                               rubro:'Plomería — Desagüe' },
    { k:'codo_pvc90_050',  cant: 2,                               rubro:'Plomería — Desagüe' },
    { k:'tee_pvc_075',     cant: 1,                               rubro:'Plomería — Desagüe' },
    { k:'tee_red_075_050', cant: 1,                               rubro:'Plomería — Desagüe' },
    { k:'cupla_pvc_075',   cant: 2,                               rubro:'Plomería — Desagüe' },
    { k:'tapon_inspeccion',cant: 1,                               rubro:'Plomería — Desagüe' },
    { k:'adhesivo_pvc',    cant: 1,                               rubro:'Plomería — Desagüe' },

    // ── AGUA FRÍA + CALIENTE (termofusión) ───────────────────
    { k:'tf_25_4m',        cant: tramos25,  rubro:'Plomería — Agua fría/caliente' },
    { k:'tf_20_4m',        cant: tramos20,  rubro:'Plomería — Agua fría/caliente' },
    { k:'tf_16_4m',        cant: tramos16,  rubro:'Plomería — Agua fría/caliente' },
    { k:'codo_tf_25',      cant: codos25,   rubro:'Plomería — Agua fría/caliente' },
    { k:'codo_tf_20',      cant: codos20,   rubro:'Plomería — Agua fría/caliente' },
    { k:'codo_tf_16',      cant: codos16,   rubro:'Plomería — Agua fría/caliente' },
    { k:'tee_tf_25',       cant: 2,         rubro:'Plomería — Agua fría/caliente' },
    { k:'tee_tf_20',       cant: 3,         rubro:'Plomería — Agua fría/caliente' },
    { k:'red_tf_25_20',    cant: 2,         rubro:'Plomería — Agua fría/caliente' },
    { k:'red_tf_20_16',    cant: 4,         rubro:'Plomería — Agua fría/caliente' },
    { k:'cupla_tf_20',     cant: 2,         rubro:'Plomería — Agua fría/caliente' },

    // ── CONEXIONES ───────────────────────────────────────────
    { k:'flexible_12',     cant: 6,         rubro:'Plomería — Conexiones', desc_override:'Flexible 1/2" pileta + lavarropa + lavavajillas (AF+AC)' },
    { k:'llave_12',        cant: 3,         rubro:'Plomería — Conexiones', desc_override:'Llave 1/2" pileta / lavarropa / lavavajillas (AC)' },
    { k:'llave_34',        cant: 1,         rubro:'Plomería — Conexiones', desc_override:'Llave 3/4" general cocina' },
    { k:'teflon',          cant: 3,         rubro:'Plomería — Conexiones' },
    { k:'sellarosca',      cant: 2,         rubro:'Plomería — Conexiones' },
  ];

  // MO rough cocina: ~2.5 jornales plomero
  const MO_ROUGH_COCINA = 280000;

  return _lineasPlomeria(plom, zona, `🍳 ${zona.nombre}`, MO_ROUGH_COCINA, 'z_plom_coc');
}

// ── Helper interno: convierte un array de spec → líneas de presupuesto ──
function _lineasPlomeria(plom, zona, grupoLabel, moTotal, idPrefix) {
  return plom.map((p, i) => {
    const def = PLOMERIA[p.k];
    if (!def) return null;
    const mat = R(p.cant * def.precio);
    return {
      id: `${idPrefix}_${zona.id}_${i}`,
      grupo: `zona_${zona.id}`, grupoLabel,
      zonaId: zona.id, zonaNombre: zona.nombre, zonaTipo: zona.tipo,
      categoria: 'plomeria', categoriaLabel: 'Plomería',
      rubro_exportacion: p.rubro,
      marca: 'Materiales sanitarios',
      desc: p.desc_override || def.desc,
      unidad: def.unidad, cant: p.cant,
      precio_mo:  i === 0 ? moTotal : 0,
      precio_mat: def.precio,
      subtotal_mo:  i === 0 ? moTotal : 0,
      subtotal_mat: mat,
      subtotal:     (i === 0 ? moTotal : 0) + mat,
    };
  }).filter(Boolean);
}

// ══════════════════════════════════════════════════════════════
// ELECTRICIDAD — pieza a pieza por zona
// ══════════════════════════════════════════════════════════════
function calcularElectricidadZona(zona, m2Edificio) {
  // Circuitos reales por tipo (standard residencial ADEPA/IRAM 2200)
  const circuitosPorTipo = {
    bano: 4, cocina: 8, habitacion: 6, living: 8, garage: 4, sala_maquinas: 6, default: 4,
  };
  const nCircuitos = circuitosPorTipo[zona.tipo] || circuitosPorTipo.default;

  // ml de caño: perímetro estimado × 1.5 (sube + horizontal)
  const mlCano  = Math.ceil(Math.sqrt(zona.m2) * 4 * 1.5);
  const mCable  = Math.ceil(mlCano * 2.4);   // 2 conductores + 20% cruce
  const canos38 = Math.ceil(mlCano / 3);
  const cable25r = Math.ceil(mCable / 100) + 1;

  const esPotencia = ['cocina', 'sala_maquinas'].includes(zona.tipo);
  const esTablero  = zona.tipo === 'sala_maquinas';

  const elec = [
    { k:'cano_38',        cant: canos38,                        rubro:'Electricidad — Caños y conductos' },
    { k:'cano_1p',        cant: 2,                              rubro:'Electricidad — Caños y conductos' },
    { k:'cable_25_100',   cant: cable25r,                       rubro:'Electricidad — Cables' },
    ...(esPotencia ? [{ k:'cable_4_100', cant: 1,               rubro:'Electricidad — Cables' }] : []),
    { k:'termica_25',     cant: Math.ceil(nCircuitos / 3),      rubro:'Electricidad — Tablero y protecciones' },
    ...(esPotencia ? [{ k:'termica_40',  cant: 2,               rubro:'Electricidad — Tablero y protecciones' }] : []),
    { k:'diferencial_40', cant: 1,                              rubro:'Electricidad — Tablero y protecciones' },
    ...(esTablero ? [{ k:'tablero_24',   cant: 1,               rubro:'Electricidad — Tablero y protecciones' }] : []),
  ];

  const MO_ELEC_ZONA = R(zona.m2 * 3800);

  return elec.map((e, i) => {
    const def = ELECTRICIDAD[e.k];
    if (!def) return null;
    return {
      id: `z_${zona.id}_elec_${i}`,
      grupo: `zona_${zona.id}`, grupoLabel: `${ZONA_TIPOS[zona.tipo]?.icon||'🔌'} ${zona.nombre}`,
      zonaId: zona.id, zonaNombre: zona.nombre, zonaTipo: zona.tipo,
      categoria: 'electricidad', categoriaLabel: 'Electricidad',
      rubro_exportacion: e.rubro,
      marca: 'Materiales eléctricos',
      desc: def.desc, unidad: def.unidad, cant: e.cant,
      precio_mo:  i === 0 ? MO_ELEC_ZONA : 0,
      precio_mat: def.precio,
      subtotal_mo:  i === 0 ? MO_ELEC_ZONA : 0,
      subtotal_mat: R(e.cant * def.precio),
      subtotal:     (i === 0 ? MO_ELEC_ZONA : 0) + R(e.cant * def.precio),
    };
  }).filter(Boolean);
}

// ══════════════════════════════════════════════════════════════
// LÍNEAS COMPLETAS POR ZONA
// ══════════════════════════════════════════════════════════════
export function calcularLineasZona(zona, m2Edificio = 100) {
  const tipoDef = ZONA_TIPOS[zona.tipo];
  if (!tipoDef) return [];

  const lineas   = [];
  const inodSel  = INODOROS.find(i => i.id === zona.materiales?.inodoro?.id);
  const conBidet = zona.conBidet !== false;

  // ── A. Materiales seleccionados por el arquitecto ─────────
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
      precio_mat = op.precio_mat;
      precio_mo  = op.precio_mo;
      desc  = op.desc;
      marca = op.marca;
    }

    const desp = cat.desperdicio || 0;
    let cant;
    if (cat.unidad === 'm²') {
      cant = R(zona.m2 * (1 + desp));
    } else if (cat.unidad === 'ml') {
      // Mesada: perímetro funcional ≈ raíz(m²) × 1.5
      // Cocina 14m² → ~5.6ml; 20m² → ~6.7ml
      cant = R(Math.max(2, Math.ceil(Math.sqrt(zona.m2) * 1.5)));
    } else {
      cant = 1;
    }

    lineas.push({
      id: `z_${zona.id}_${cat.id}`,
      grupo: `zona_${zona.id}`, grupoLabel: `${tipoDef.icon} ${zona.nombre}`,
      zonaId: zona.id, zonaNombre: zona.nombre, zonaTipo: zona.tipo,
      categoria: cat.id, categoriaLabel: cat.nombre,
      rubro_exportacion: categoriaARubro(cat.id),
      marca, desc, unidad: cat.unidad, cant,
      precio_mo, precio_mat,
      subtotal_mo:  R(cant * precio_mo),
      subtotal_mat: R(cant * precio_mat),
      subtotal:     R(cant * (precio_mo + precio_mat)),
    });
  });

  // ── B. Inodoro + bidet + asiento ─────────────────────────
  if (inodSel && zona.materiales?.inodoro?.id) {
    const moInst = PRECIO_MO_CLARIN['23.01'] || 87085;
    lineas.push({
      id: `z_${zona.id}_inodoro`,
      grupo: `zona_${zona.id}`, grupoLabel: `${tipoDef.icon} ${zona.nombre}`,
      zonaId: zona.id, zonaNombre: zona.nombre, zonaTipo: 'bano',
      categoria: 'inodoro', categoriaLabel: 'Inodoro',
      rubro_exportacion: 'Sanitarios',
      marca: inodSel.marca, desc: inodSel.desc, unidad: 'u', cant: 1,
      precio_mo: moInst, precio_mat: inodSel.precio_mat,
      subtotal_mo: moInst, subtotal_mat: inodSel.precio_mat,
      subtotal: moInst + inodSel.precio_mat,
    });

    if (conBidet && inodSel.bidet_precio > 0) {
      lineas.push({
        id: `z_${zona.id}_bidet`,
        grupo: `zona_${zona.id}`, grupoLabel: `${tipoDef.icon} ${zona.nombre}`,
        zonaId: zona.id, zonaNombre: zona.nombre, zonaTipo: 'bano',
        categoria: 'bidet', categoriaLabel: `Bidet (mismo brand: ${inodSel.marca} ${inodSel.linea})`,
        rubro_exportacion: 'Sanitarios',
        marca: inodSel.marca,
        desc: `${inodSel.marca} ${inodSel.linea} bidet 3 agujeros`,
        unidad: 'u', cant: 1,
        precio_mo: moInst, precio_mat: inodSel.bidet_precio,
        subtotal_mo: moInst, subtotal_mat: inodSel.bidet_precio,
        subtotal: moInst + inodSel.bidet_precio,
      });
    }

    const asientoSel    = zona.materiales?.asiento?.id;
    const asientoPrecios = { asiento_plast: 27000, asiento_mad: 55000 };
    const asientoDescs   = { asiento_plast: 'Asiento plástico reforzado', asiento_mad: 'Asiento madera laqueada' };
    if (asientoSel) {
      lineas.push({
        id: `z_${zona.id}_asiento`,
        grupo: `zona_${zona.id}`, grupoLabel: `${tipoDef.icon} ${zona.nombre}`,
        zonaId: zona.id, zonaNombre: zona.nombre, zonaTipo: 'bano',
        categoria: 'asiento', categoriaLabel: 'Asiento inodoro',
        rubro_exportacion: 'Sanitarios',
        marca: inodSel.marca, desc: asientoDescs[asientoSel] || asientoSel, unidad: 'u', cant: 1,
        precio_mo: 0, precio_mat: asientoPrecios[asientoSel] || 0,
        subtotal_mo: 0, subtotal_mat: asientoPrecios[asientoSel] || 0,
        subtotal: asientoPrecios[asientoSel] || 0,
      });
    }
  }

  // ── C. Plomería rough diferenciada por tipo ───────────────
  // sala_maquinas: MO instalación ya incluida en precio_mo de caldera/tanque
  if (zona.tipo === 'bano') {
    lineas.push(...calcularPlomeriaZona(zona, m2Edificio));
  } else if (zona.tipo === 'cocina') {
    lineas.push(...calcularPlomeriaCocina(zona, m2Edificio));
  }

  // ── D. Electricidad rough — solo zonas habitables ─────────
  // techo / jardin / pileta / camaras: MO instalación ya en sus categorías
  const ZONAS_CON_ELEC = ['bano', 'cocina', 'habitacion', 'living', 'garage', 'sala_maquinas'];
  if (ZONAS_CON_ELEC.includes(zona.tipo)) {
    lineas.push(...calcularElectricidadZona(zona, m2Edificio));
  }

  return lineas;
}

// ── Mapeo categoría → rubro exportación ──────────────────────
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
    tipo_pileta:'Pileta', equipo:'Pileta', riego:'Jardín',
  };
  return m[cat] || 'Varios';
}

// ── TOTALES ───────────────────────────────────────────────────
export function calcularTotales(lineas) {
  const sub_mo  = R(lineas.reduce((s, l) => s + (l.subtotal_mo  || 0), 0));
  const sub_mat = R(lineas.reduce((s, l) => s + (l.subtotal_mat || 0), 0));
  const subtotal  = R(sub_mo + sub_mat);
  const gg        = R(subtotal * 0.10);
  const beneficio = R(subtotal * 0.12);
  const base_iva  = R(subtotal + gg + beneficio);
  const iva       = R(base_iva * 0.21);
  const iibb      = R(base_iva * 0.025);
  const totalObra = R(base_iva + iva + iibb);
  return { sub_mo, sub_mat, subtotal, gg, beneficio, base_iva, iva, iibb, totalObra };
}

// ── RESUMEN POR ZONA ──────────────────────────────────────────
export function resumenPorZona(lineas) {
  const map = {};
  lineas.forEach(l => {
    const key = l.zonaId || 'estructura';
    if (!map[key]) map[key] = {
      id: key, nombre: l.grupoLab