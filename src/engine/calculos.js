// ══════════════════════════════════════════════════════════════
// MOTOR DE CÁLCULO REAL — ARQ Clarín Mayo 2026
// Presupuesto pieza a pieza: estructura, ceramica, pintura,
// Durlock, revoque, plomería, electricidad, zócalos, pluviales
// ══════════════════════════════════════════════════════════════
import {
  ESTRUCTURA_AUTO, PRECIO_MO_CLARIN, PRECIO_MAT_CLARIN,
  ZONA_TIPOS, INODOROS, PLOMERIA, ELECTRICIDAD, COMPANION,
} from '../data/materiales.js';

export const R = (n, d = 0) => Math.round(n * Math.pow(10, d)) / Math.pow(10, d);

// ── Peso de barras de hierro × 12m ────────────────────────────
const BAR_KG = { d12:10.65, d10:7.40, d8:4.73, d6:2.66 };

// ── Especificación de acero por tipo de elemento (kg/m³) ──────
const HIERRO_SPEC = {
  '05.02': { kg:60,  d12:0.30, d10:0.40, d8:0.25, d6:0.05 }, // bases
  '05.03': { kg:50,  d12:0.20, d10:0.40, d8:0.30, d6:0.10 }, // platea
  '05.08': { kg:100, d12:0.20, d10:0.40, d8:0.30, d6:0.10 }, // losa HAA
  '05.14': { kg:160, d12:0.50, d10:0.30, d8:0.10, d6:0.10 }, // vigas
  '05.15': { kg:85,  d12:0.40, d10:0.25, d8:0.10, d6:0.25 }, // columnas (estribos Ø6)
  '05.16': { kg:80,  d12:0.30, d10:0.40, d8:0.20, d6:0.10 }, // tabiques
};

// ── Helper: línea companion genérica ─────────────────────────
function _cmp(k, cant, zona, idSuffix, descOverride) {
  const def = COMPANION[k];
  if (!def || cant <= 0) return null;
  const precio = def.precio;
  const mat = R(cant * precio);
  return {
    id: `cmp_${idSuffix}`,
    grupo: zona ? `zona_${zona.id}` : 'estructura',
    grupoLabel: zona ? `${ZONA_TIPOS[zona.tipo]?.icon||'🔧'} ${zona.nombre}` : '🏗️ Estructura',
    zonaId: zona?.id || null,
    zonaNombre: zona?.nombre || 'Estructura',
    zonaTipo: zona?.tipo || null,
    categoria: 'companion',
    categoriaLabel: descOverride || def.desc,
    rubro_exportacion: def.rubro,
    marca: 'Materiales',
    desc: descOverride || def.desc,
    unidad: def.unidad,
    cant,
    precio_mo: 0,
    precio_mat: precio,
    subtotal_mo: 0,
    subtotal_mat: mat,
    subtotal: mat,
  };
}

// ══════════════════════════════════════════════════════════════
// COMPANIONS POR SECCIÓN
// ══════════════════════════════════════════════════════════════

// ── Ceramica / porcelanato en piso ────────────────────────────
// cant = m² con desperdicio incluido
function cmpCeramicaPiso(selId, cant, zona) {
  const isPorc = selId?.includes('porc') || selId?.includes('lux');
  const isMos  = selId?.includes('mos') || selId?.includes('ven');
  const isCem  = selId?.includes('cem') || selId?.includes('ferro') || selId?.includes('rod') || selId?.includes('est');
  const isFlot = selId?.includes('float') || selId?.includes('lvt');
  const isPar  = selId?.includes('parq') || selId?.includes('pinotea');

  const lines = [];

  if (isCem || isPar) {
    // Cemento ferrocrementado / parquet: no necesita adhesivo cerámico
    if (isPar) {
      lines.push(_cmp('cola_parquet', Math.ceil(cant * 0.5 / 5), zona, `${zona.id}_colapar`, `Cola parquet (0.5 kg/m²)`));
      lines.push(_cmp('piso_film',    Math.ceil(cant / 25),       zona, `${zona.id}_film`,    `Film barrera vapor`));
    }
  } else if (isFlot) {
    lines.push(_cmp('nivelante_25', Math.ceil(cant * 2 / 25), zona, `${zona.id}_nivel`, `Nivelante (2 kg/m²)`));
  } else if (isMos) {
    // Mosaico veneciano: cemento cola blanco + fragüe especial
    lines.push(_cmp('adh_mosaico',    Math.ceil(cant * 3 / 25), zona, `${zona.id}_mosadh`, `Cemento cola blanco mosaico (3 kg/m²)`));
    lines.push(_cmp('frague_mosaico', Math.ceil(cant * 0.30),   zona, `${zona.id}_mosfrg`, `Fragüe blanco mosaico (0.30 kg/m²)`));
  } else {
    // Cerámico o porcelanato
    const kgAdh = isPorc ? 6 : 5;
    const adhKey = isPorc ? 'adh_cem_flex' : 'adh_cem_std';
    lines.push(_cmp(adhKey,        Math.ceil(cant * kgAdh / 25),      zona, `${zona.id}_adh`,   `Adhesivo ${isPorc?'flexible':'std'} (${kgAdh} kg/m²)`));
    lines.push(_cmp('frague_piso', Math.ceil(cant * 0.35 / 2),        zona, `${zona.id}_frg`,   `Fragüe piso (0.35 kg/m²)`));
    lines.push(_cmp('crucetas_2mm',Math.ceil(cant * 25 / 100),         zona, `${zona.id}_cruc`,  `Crucetas 2mm (25 u/m²)`));
  }

  // Zócalo para TODOS los pisos de habitaciones y zonas habitables
  const zonasConZocalo = ['habitacion','living','cocina','garage'];
  if (zonasConZocalo.includes(zona.tipo)) {
    const perim = Math.round(4 * Math.sqrt(zona.m2) * 1.10);
    const zKey  = (isPorc || selId?.includes('cer')) ? 'zocalo_cer' : isPar ? 'zocalo_mad' : 'zocalo_mdf';
    lines.push(_cmp(zKey, perim, zona, `${zona.id}_zoc`, `Zócalo 8cm — perímetro ~${perim}ml`));
  }

  return lines.filter(Boolean);
}

// ── Ceramica en pared/revestimiento ───────────────────────────
// IMPORTANTE: usa área REAL de pared (no zona.m2)
// cant que viene = zona.m2 * 1.10 (incorrecto para paredes)
// Se recalcula internamente con perímetro × altura real
function cmpCeramicaPared(selId, cantOrig, zona) {
  // Área real de pared: perímetro × 2.6m altura × 0.85 (descuento aperturas)
  const areaReal = R(4 * Math.sqrt(zona.m2) * 2.6 * 0.85 * 1.10);
  const isMos  = selId?.includes('mos') || selId?.includes('hidr') || selId?.includes('tejuela');
  const isPorc = selId?.includes('porc');

  if (isMos) {
    // Mosaico: cemento cola blanco + fragüe especial
    return [
      _cmp('adh_cem_blanco', Math.ceil(areaReal * 3 / 25), zona, `${zona.id}_mosa`, `Cemento cola blanco mosaico (3 kg/m²)`),
      _cmp('frague_pared',   Math.ceil(areaReal * 0.30),   zona, `${zona.id}_mosf`, `Fragüe mosaico (0.30 kg/m²)`),
    ].filter(Boolean);
  }

  const kgAdh = isPorc ? 5 : 4;
  return [
    _cmp('adh_cem_blanco', Math.ceil(areaReal * kgAdh / 25), zona, `${zona.id}_radh`, `Adhesivo blanco pared — ${areaReal}m² real (${kgAdh} kg/m²)`),
    _cmp('frague_pared',   Math.ceil(areaReal * 0.40),       zona, `${zona.id}_rfrg`, `Fragüe pared (0.40 kg/m²)`),
    _cmp('crucetas_2mm',   Math.ceil(areaReal * 20 / 100),   zona, `${zona.id}_rcruc`,`Crucetas 2mm (20 u/m²)`),
  ].filter(Boolean);
}

// ── Pintura completa (sellador + enduído + látex en litros) ───
// cant = zona.m2 * 1.10 (de la categoría)
function cmpPintura(zona) {
  // Superficie REAL pintada = paredes (4×√m²×2.8) + cielorraso (m²)
  const m2 = zona.m2;
  const superfReal = Math.round(m2 + 4 * Math.sqrt(m2) * 2.80);

  // Sellador: 0.12 lt/m²
  const sellLt = Math.ceil(superfReal * 0.12);
  // Enduído: 0.30 kg/m² por mano → 1 mano → balde 30kg
  const enduBalde = Math.max(1, Math.ceil(superfReal * 0.30 / 30));
  // Látex: 2 manos × 0.12 lt/m²/mano = 0.24 lt/m² → balde 20lt
  const latBalde = Math.max(1, Math.ceil(superfReal * 0.24 / 20));

  return [
    _cmp('sellador_acr', sellLt,    zona, `${zona.id}_sell`, `Sellador acrílico — ${superfReal}m² sup. real`),
    _cmp('enduido_30',   enduBalde, zona, `${zona.id}_endu`, `Enduído plástico — ${superfReal}m²`),
    _cmp('latex_20lt',   latBalde,  zona, `${zona.id}_lat`,  `Látex 2 manos — ${superfReal}m²`),
  ].filter(Boolean);
}

// ── Durlock cielorraso suspendido ─────────────────────────────
function cmpDurlock(zona, cant) {
  const m2 = zona.m2;
  const perim = 4 * Math.sqrt(m2);

  const placas    = Math.ceil(m2 * 1.05 / 2.88);         // 1 placa = 2.88m²
  const soleras   = Math.ceil(perim * 2 / 3);             // solera arriba y abajo, tramos 3m
  const montantes = Math.ceil(m2 / (0.60 * 3));           // cada 0.60m, largo 3m
  const tornCajas = Math.max(1, Math.ceil(m2 * 25 / 250));// 25 tornillos/m²
  const masilla   = Math.max(1, Math.ceil(m2 * 1.5 / 30));// 1.5 kg/m²
  const cinta     = Math.max(1, Math.ceil(m2 * 0.8 / 90));// 0.8 ml/m²

  return [
    _cmp('placa_yeso_12', placas,    zona, `${zona.id}_dpl`,  `Placas yeso 12.5mm — ${m2}m²`),
    _cmp('perfil_f47',    soleras,   zona, `${zona.id}_dsol`, `Perfiles solera F47 — per. ${Math.round(perim)}ml`),
    _cmp('perfil_w50',    montantes, zona, `${zona.id}_dmon`, `Perfiles montante W50 c/0.60m`),
    _cmp('torn_35x25',    tornCajas, zona, `${zona.id}_dtor`, null),
    _cmp('masilla_30',    masilla,   zona, `${zona.id}_dmas`, null),
    _cmp('cinta_papel',   cinta,     zona, `${zona.id}_dcin`, null),
  ].filter(Boolean);
}

// ── Cielorraso yeso aplicado ──────────────────────────────────
function cmpYesoAplic(zona, cant) {
  // Cal + arena fina por m²
  const m2 = zona.m2;
  const calB  = Math.ceil(m2 * 0.15);      // ~0.15 bolsa 25kg / m²
  const arenaM3 = R(m2 * 0.012);           // 0.012 m³/m²
  const yesoB = Math.ceil(m2 * 0.20);      // yeso fino 0.20 bolsa/m²

  return [
    _cmp('cal_hidra_25',  calB,    zona, `${zona.id}_ycal`,   `Cal hidráulica cielorraso`),
    _cmp('arena_fina_m3', arenaM3, zona, `${zona.id}_yarena`, `Arena fina cielorraso`),
    _cmp('yeso_fino_25',  yesoB,   zona, `${zona.id}_yyeso`,  `Yeso fino cielorraso`),
  ].filter(Boolean);
}

// ══════════════════════════════════════════════════════════════
// ESTRUCTURA — MATERIALES REALES POR ELEMENTO
// ══════════════════════════════════════════════════════════════
function calcularCompanionEstructura(proyecto) {
  const { tipoEstructura, mCubiertos, mSemicubiertos, mBalcones, techo } = proyecto;
  const m2 = (mCubiertos||0) + (mSemicubiertos||0)*0.5 + (mBalcones||0)*0.5;
  if (m2 <= 0) return [];

  const items = ESTRUCTURA_AUTO[tipoEstructura] || ESTRUCTURA_AUTO.mamposteria;
  const lines = [];
  let seqId = 0;
  const id = () => `estm_${seqId++}`;

  const cE = (k, cant, desc) => {
    const def = COMPANION[k]; if (!def || cant <= 0) return null;
    const mat = R(cant * def.precio);
    return {
      id: id(), grupo:'estructura', grupoLabel:'🏗️ Estructura',
      rubro:'estructura', rubro_exportacion: def.rubro,
      marca:'Materiales', categoria:'companion', categoriaLabel: desc||def.desc,
      zonaId:null, zonaNombre:'Estructura', zonaTipo:null,
      desc: desc||def.desc, unidad:def.unidad, cant,
      precio_mo:0, precio_mat:def.precio,
      subtotal_mo:0, subtotal_mat:mat, subtotal:mat,
    };
  };

  items.forEach(it => {
    const cant = R(it.coef * m2);

    // ── HORMIGÓN (05.02, 05.03, 05.08, 05.14, 05.15, 05.16) ───
    const refHorm = ['05.02','05.03','05.08','05.14','05.15','05.16'];
    if (refHorm.includes(it.ref)) {
      // Concreto: 7 bolsas cemento/m³, 0.65m³ arena, 0.85m³ piedra
      lines.push(cE('cemento_50',     Math.ceil(cant * 7),         `Cemento Portland — ${it.desc}`));
      lines.push(cE('arena_media_m3', R(cant * 0.65),              `Arena mediana — ${it.desc}`));
      lines.push(cE('piedra_2040',    R(cant * 0.85),              `Piedra partida — ${it.desc}`));

      // Hierro
      const spec = HIERRO_SPEC[it.ref];
      if (spec) {
        const totalKg = cant * spec.kg;
        ['d12','d10','d8','d6'].forEach(size => {
          const ratio = spec[size] || 0;
          if (ratio <= 0) return;
          const barras = Math.ceil((totalKg * ratio) / BAR_KG[size]);
          lines.push(cE(`hierro_${size}`, barras, `Hierro Ø${size.replace('d','')}mm — ${it.desc}`));
        });
        // Alambre n°17: 2% del peso total de hierro
        const alamKg = totalKg * 0.02;
        const alamRollos = Math.ceil(alamKg / 25);
        if (alamRollos > 0) lines.push(cE('alambre_17', alamRollos, `Alambre n°17 — ${it.desc}`));
      }
    }

    // ── MAMPOSTERÍA 18cm ──────────────────────────────────────
    if (it.ref === '07.19') {
      lines.push(cE('ladrillo_18',  Math.ceil(cant * 12.5),        `Ladrillos 18cm — ${cant} m²`));
      lines.push(cE('cemento_50',   Math.ceil(cant * 0.10),        `Cemento mortero mampostería`));
      lines.push(cE('cal_hidra_25', Math.ceil(cant * 0.15),        `Cal mortero mampostería`));
      lines.push(cE('arena_fina_m3',R(cant * 0.015),               `Arena mortero mampostería`));
    }

    // ── MAMPOSTERÍA 8cm ───────────────────────────────────────
    if (it.ref === '07.17') {
      lines.push(cE('ladrillo_8',   Math.ceil(cant * 17),          `Ladrillos 8cm — ${cant} m²`));
      lines.push(cE('cemento_50',   Math.ceil(cant * 0.08),        `Cemento mortero mampostería`));
      lines.push(cE('cal_hidra_25', Math.ceil(cant * 0.12),        `Cal mortero mampostería`));
      lines.push(cE('arena_fina_m3',R(cant * 0.012),               `Arena mortero mampostería`));
    }

    // ── LOSA VIGUETAS ─────────────────────────────────────────
    if (it.ref === '05.13') {
      const viguetas   = Math.ceil(cant * 1.35);    // 1.35 u/m²
      const bovedillas = Math.ceil(cant * 4);        // 4 u/m²
      const mallas     = Math.ceil(cant * 1.05 / 12.9); // paño 2.15×6m = 12.9m²
      const cementoLosa = Math.ceil(cant * 0.06 * 7); // 0.06 m³/m² de hormigón relleno
      lines.push(cE('vigueta_v50',   viguetas,    `Viguetas pretensadas V50`));
      lines.push(cE('bovedilla_12',  bovedillas,  `Bovedillas 12cm`));
      lines.push(cE('malla_reparto', mallas,      `Malla de reparto Ø4.2 15×15`));
      lines.push(cE('cemento_50',    cementoLosa, `Cemento relleno losa viguetas`));
    }

    // ── REVOQUE GRUESO + FINO ─────────────────────────────────
    if (it.ref === '11.01') {
      // Cal, arena fina, cemento
      lines.push(cE('cal_hidra_25',  Math.ceil(cant * 0.15),   `Cal hidráulica — revoque grueso+fino`));
      lines.push(cE('arena_fina_m3', R(cant * 0.015),          `Arena fina — revoque`));
      lines.push(cE('cemento_50',    Math.ceil(cant * 0.08),   `Cemento — revoque grueso`));
    }

    // ── REVOQUE YESO ─────────────────────────────────────────
    if (it.ref === '11.07') {
      lines.push(cE('yeso_fino_25', Math.ceil(cant * 0.20),    `Yeso fino interior proyectable`));
    }

    // ── PANEL OSB (steel frame) ───────────────────────────────
    if (it.ref === '08.08') {
      // Panel OSB 9mm 2.44×1.22m = 2.97m² por panel
      const paneles = Math.ceil(cant * 1.05 / 2.97);
      lines.push(cE('osb_9mm', paneles, `Panel OSB 9mm — ${cant} m²`));
    }

    // ── STEEL FRAME TABIQUE ───────────────────────────────────
    if (['08.01','08.02'].includes(it.ref)) {
      const montantes  = Math.ceil(cant / (0.60 * 3));         // 1 montante c/0.60m, largo 3m
      const soleras    = Math.ceil(cant / 3 * 2);              // solera piso + techo
      const tornCajas  = Math.ceil(cant * 10 / 100);           // 10 tornillos/m²
      lines.push(cE('perfil_c90',   montantes,  `Perfiles C-90 montante — ${it.desc}`));
      lines.push(cE('perfil_u90',   soleras,    `Perfiles U-90 solera — ${it.desc}`));
      lines.push(cE('torn_sf_100',  tornCajas,  `Tornillos SF — ${it.desc}`));
    }
  });

  // ── CANALETAS Y BAJADAS PLUVIALES ────────────────────────────
  const m2techo = mCubiertos || 0;
  if (m2techo > 0) {
    // Perímetro techo estimado: 4 × √m² (cuadrado) + 30% retiros
    const perTecho = Math.round(4 * Math.sqrt(m2techo) * 1.30);
    const canaletas = Math.ceil(perTecho / 3);             // tramos 3m
    const bajadas   = Math.max(2, Math.round(perTecho / 15)); // 1 bajada c/15m perím.
    lines.push(cE('canaleta_zinc', canaletas, `Canaleta zinc pluvial — ${perTecho}ml`));
    lines.push(cE('bajada_pvc110', bajadas,   `Bajada pluvial PVC 110mm`));
    lines.push(cE('codo_pluvial',  bajadas*2, `Codos pluviales PVC 87°`));
  }

  return lines.filter(Boolean);
}

// ══════════════════════════════════════════════════════════════
// ESTRUCTURA PRINCIPAL (MO + items)
// ══════════════════════════════════════════════════════════════
export function calcularEstructura(proyecto) {
  const { tipoEstructura, mCubiertos, mSemicubiertos, mBalcones, techo } = proyecto;
  const m2 = (mCubiertos||0) + (mSemicubiertos||0)*0.5 + (mBalcones||0)*0.5;
  if (m2 <= 0) return [];

  const items = ESTRUCTURA_AUTO[tipoEstructura] || ESTRUCTURA_AUTO.mamposteria;
  const lineas = items.map((it, i) => {
    const cant = R(it.coef * m2);
    const mo   = PRECIO_MO_CLARIN[it.ref] || 0;
    const mat  = PRECIO_MAT_CLARIN[it.ref] || 0; // 0 para los elementos con companion
    return {
      id:`est_${i}`, grupo:'estructura', grupoLabel:'🏗️ Estructura',
      rubro:'estructura', rubro_exportacion:'Estructura',
      marca:'MO UOCRA', categoria:'estructura', categoriaLabel:'Estructura',
      zonaId:null, zonaNombre:'Estructura', zonaTipo:null,
      ref:it.ref, desc:it.desc, unidad:it.u, cant,
      precio_mo:mo, precio_mat:mat,
      subtotal_mo:R(cant*mo), subtotal_mat:R(cant*mat), subtotal:R(cant*(mo+mat)),
    };
  });

  // Cubierta / techo
  const techoRef  = { terraza:'10.01', dos_aguas:'10.03', steel_frame:'10.07' };
  const techoDesc = {
    terraza:     'Cubierta terraza: barrera vapor + membrana alum. 4mm',
    dos_aguas:   'Cubierta teja francesa + estructura madera vista',
    steel_frame: 'Cubierta chapa sándwich PIR c/aislación térmica',
  };
  const tRef = techoRef[techo]||'10.01';
  const m2t  = R((mCubiertos||0)*1.08);
  const tMO  = PRECIO_MO_CLARIN[tRef]||253845;
  const tMAT = PRECIO_MAT_CLARIN[tRef]||95000;
  lineas.push({
    id:'est_techo', grupo:'estructura', grupoLabel:'🏗️ Estructura',
    rubro:'estructura', rubro_exportacion:'Estructura',
    marca:'Varios', categoria:'cubierta', categoriaLabel:'Cubierta',
    zonaId:null, zonaNombre:'Estructura', zonaTipo:null,
    ref:tRef, desc:techoDesc[techo]||techoDesc.terraza,
    unidad:'m²', cant:m2t,
    precio_mo:tMO, precio_mat:tMAT,
    subtotal_mo:R(m2t*tMO), subtotal_mat:R(m2t*tMAT), subtotal:R(m2t*(tMO+tMAT)),
  });

  // Agregar companion materials (cemento, hierro, ladrillos, etc.)
  const companions = calcularCompanionEstructura(proyecto);
  return [...lineas, ...companions];
}

// ══════════════════════════════════════════════════════════════
// PLOMERÍA BAÑO — pieza a pieza
// ══════════════════════════════════════════════════════════════
function calcularPlomeriaZona(zona, m2Edificio) {
  const dist     = Math.max(4, Math.ceil(Math.sqrt(m2Edificio) * 0.7));
  const conBidet = zona.conBidet !== false;
  const nArtef   = 2 + (conBidet ? 1 : 0);
  const canos110 = Math.max(2, Math.ceil(dist/2));
  const canos075 = 3 + (conBidet ? 1 : 0);
  const tramos25 = Math.max(2, Math.ceil(dist/4)) * 2;
  const tramos20 = 2;
  const tramos16 = nArtef * 2;
  const codos25  = 2 + Math.ceil(dist/2);
  const codos20  = nArtef * 2;
  const codos16  = nArtef * 2;

  const plom = [
    { k:'pvc_110_2m',      cant:canos110,              r:'Plomería — Desagüe',             d:null },
    { k:'pvc_075_2m',      cant:canos075,              r:'Plomería — Desagüe',             d:null },
    { k:'pvc_050_2m',      cant:1,                     r:'Plomería — Desagüe',             d:'Caño PVC 50mm ventilación (columna)' },
    { k:'pvc_040_2m',      cant:1,                     r:'Plomería — Desagüe',             d:'Caño PVC 40mm ventilación secundaria' },
    { k:'codo_pvc90_110',  cant:2,                     r:'Plomería — Desagüe',             d:null },
    { k:'codo_pvc45_110',  cant:1,                     r:'Plomería — Desagüe',             d:null },
    { k:'codo_pvc90_075',  cant:2+(conBidet?1:0),      r:'Plomería — Desagüe',             d:null },
    { k:'codo_pvc45_075',  cant:2,                     r:'Plomería — Desagüe',             d:null },
    { k:'tee_pvc_110',     cant:1,                     r:'Plomería — Desagüe',             d:null },
    { k:'tee_red_110_075', cant:1+(conBidet?1:0),      r:'Plomería — Desagüe',             d:null },
    { k:'tee_red_075_050', cant:1,                     r:'Plomería — Desagüe',             d:null },
    { k:'cupla_pvc_110',   cant:Math.ceil(canos110/2), r:'Plomería — Desagüe',             d:null },
    { k:'cupla_pvc_075',   cant:2,                     r:'Plomería — Desagüe',             d:null },
    { k:'colarin_110',     cant:1,                     r:'Plomería — Desagüe',             d:'Collarín inodoro PVC 110mm c/tornillos' },
    { k:'sifon_ducha',     cant:1,                     r:'Plomería — Desagüe',             d:null },
    { k:'rejilla_piso_50', cant:1,                     r:'Plomería — Desagüe',             d:null },
    { k:'tapon_inspeccion',cant:1,                     r:'Plomería — Desagüe',             d:null },
    { k:'adhesivo_pvc',    cant:1,                     r:'Plomería — Desagüe',             d:null },
    { k:'tf_25_4m',        cant:tramos25,              r:'Plomería — Agua fría/caliente',  d:null },
    { k:'tf_20_4m',        cant:tramos20,              r:'Plomería — Agua fría/caliente',  d:null },
    { k:'tf_16_4m',        cant:tramos16,              r:'Plomería — Agua fría/caliente',  d:null },
    { k:'codo_tf_25',      cant:codos25,               r:'Plomería — Agua fría/caliente',  d:null },
    { k:'codo_tf_20',      cant:codos20,               r:'Plomería — Agua fría/caliente',  d:null },
    { k:'codo_tf_16',      cant:codos16,               r:'Plomería — Agua fría/caliente',  d:null },
    { k:'tee_tf_25',       cant:2,                     r:'Plomería — Agua fría/caliente',  d:null },
    { k:'tee_tf_20',       cant:nArtef,                r:'Plomería — Agua fría/caliente',  d:null },
    { k:'red_tf_25_20',    cant:2,                     r:'Plomería — Agua fría/caliente',  d:null },
    { k:'red_tf_20_16',    cant:nArtef*2,              r:'Plomería — Agua fría/caliente',  d:null },
    { k:'cupla_tf_20',     cant:2,                     r:'Plomería — Agua fría/caliente',  d:null },
    { k:'flexible_12',     cant:nArtef*2,              r:'Plomería — Conexiones',          d:null },
    { k:'flexible_38',     cant:1,                     r:'Plomería — Conexiones',          d:'Flexible 3/8" mochila inodoro' },
    { k:'llave_12',        cant:nArtef,                r:'Plomería — Conexiones',          d:null },
    { k:'valvula_escl_34', cant:1,                     r:'Plomería — Conexiones',          d:'Válvula esclusa 3/4" llave general baño' },
    { k:'teflon',          cant:4,                     r:'Plomería — Conexiones',          d:null },
    { k:'sellarosca',      cant:2,                     r:'Plomería — Conexiones',          d:null },
  ];
  return _lineasPlomeria(plom, zona, `🚿 ${zona.nombre}`, 336000, 'z_plom');
}

// ── Plomería cocina ───────────────────────────────────────────
function calcularPlomeriaCocina(zona, m2Edificio) {
  const dist     = Math.max(3, Math.ceil(Math.sqrt(m2Edificio)*0.45));
  const tramos25 = Math.max(2, Math.ceil(dist/4))*2;
  const codos25  = 2+Math.ceil(dist/2);

  const plom = [
    { k:'pvc_075_2m',      cant:Math.max(1,Math.ceil(dist/2)), r:'Plomería — Desagüe', d:'Caño PVC 75mm desagüe pileta cocina' },
    { k:'pvc_050_2m',      cant:2,  r:'Plomería — Desagüe', d:'Caño PVC 50mm lavarropa + ventilación' },
    { k:'pvc_040_2m',      cant:1,  r:'Plomería — Desagüe', d:'Caño PVC 40mm ventilación secundaria' },
    { k:'codo_pvc90_075',  cant:2,  r:'Plomería — Desagüe', d:null },
    { k:'codo_pvc45_075',  cant:1,  r:'Plomer�