// ══════════════════════════════════════════════════════════════
// MOTOR DE CÁLCULO — 3 pantallas
// calcularEstructura + calcularZonas + calcularTotales
// ══════════════════════════════════════════════════════════════
import { ESTRUCTURA_AUTO, PRECIO_MO, PRECIO_MAT, DESPERDICIO, ZONA_TIPOS } from '../data/materiales.js';

export const R = (n, d = 0) => Math.round(n * Math.pow(10, d)) / Math.pow(10, d);

// ── 1. Calcular estructura automática (Pantalla 1) ─────────────
export function calcularEstructura(proyecto) {
  const { tipoEstructura, mCubiertos, mSemicubiertos, mBalcones, techo } = proyecto;
  const m2total = (mCubiertos || 0) + (mSemicubiertos || 0) * 0.5 + (mBalcones || 0) * 0.5;
  if (m2total <= 0) return [];

  const items = ESTRUCTURA_AUTO[tipoEstructura] || ESTRUCTURA_AUTO.mamposteria;
  const lineas = items.map((it, i) => {
    const cant = R(it.coef * m2total);
    const mo  = PRECIO_MO[it.ref] || 0;
    const mat = PRECIO_MAT[it.ref] || 0;
    return {
      id: `est_${i}`,
      grupo: 'estructura',
      grupoLabel: 'Estructura',
      ref: it.ref,
      desc: it.desc,
      unidad: it.unidad,
      cant,
      precio_mo: mo,
      precio_mat: mat,
      subtotal_mo: R(cant * mo),
      subtotal_mat: R(cant * mat),
      subtotal: R(cant * (mo + mat)),
    };
  });

  // Techo
  const techoMap = {
    terraza:    { ref: '10.01', desc: 'Cubierta terraza c/membrana alum.', mo: 253845, mat: 95000 },
    dos_aguas:  { ref: '10.03', desc: 'Teja francesa estr. madera',        mo: 223056, mat: 185000 },
    steel_frame:{ ref: '10.07', desc: 'Chapa sándwich c/aislación',         mo: 88260,  mat: 165000 },
  };
  const tc = techoMap[techo] || techoMap.terraza;
  const m2techo = R(mCubiertos * 1.08); // pendiente
  lineas.push({
    id: 'est_techo',
    grupo: 'estructura',
    grupoLabel: 'Estructura',
    ref: tc.ref,
    desc: tc.desc,
    unidad: 'm²',
    cant: m2techo,
    precio_mo: tc.mo,
    precio_mat: tc.mat,
    subtotal_mo: R(m2techo * tc.mo),
    subtotal_mat: R(m2techo * tc.mat),
    subtotal: R(m2techo * (tc.mo + tc.mat)),
  });

  return lineas;
}

// ── 2. Calcular líneas de una zona (Pantalla 2) ──────────────────
export function calcularLineasZona(zona) {
  const tipoDef = ZONA_TIPOS[zona.tipo];
  if (!tipoDef || !zona.materiales) return [];

  const lineas = [];
  tipoDef.categorias.forEach(cat => {
    const sel = zona.materiales[cat.id];
    if (!sel || sel.tipo === 'omitir') return;

    let precio_mat, precio_mo, desc, marca;
    if (sel.tipo === 'personalizado') {
      precio_mat = sel.precio_mat || 0;
      precio_mo  = sel.precio_mo  || 0;
      desc  = sel.desc  || cat.nombre;
      marca = sel.marca || 'Personalizado';
    } else {
      const opcion = cat.opciones.find(o => o.id === sel.id);
      if (!opcion) return;
      precio_mat = opcion.precio_mat;
      precio_mo  = opcion.precio_mo;
      desc  = opcion.desc;
      marca = opcion.marca;
    }

    // Cantidad según unidad
    let cant;
    if (cat.unidad === 'm²') {
      const desp = DESPERDICIO[cat.id] || DESPERDICIO.default;
      cant = R(zona.m2 * desp);
    } else if (cat.unidad === 'ml') {
      cant = R(Math.sqrt(zona.m2) * 2); // estimación perímetro mesada
    } else {
      cant = 1; // u (unidad)
    }

    lineas.push({
      id: `z_${zona.id}_${cat.id}`,
      grupo: `zona_${zona.id}`,
      grupoLabel: `${tipoDef.icon} ${zona.nombre}`,
      zonaId: zona.id,
      zonaNombre: zona.nombre,
      zonaTipo: zona.tipo,
      categoria: cat.id,
      categoriaLabel: cat.nombre,
      marca,
      desc,
      unidad: cat.unidad,
      cant,
      precio_mo,
      precio_mat,
      subtotal_mo: R(cant * precio_mo),
      subtotal_mat: R(cant * precio_mat),
      subtotal: R(cant * (precio_mo + precio_mat)),
    });
  });

  // Llave de paso: 2 por sector con zona húmeda
  if (['bano', 'cocina', 'sala_maquinas', 'pileta'].includes(zona.tipo)) {
    lineas.push({
      id: `z_${zona.id}_llaves`,
      grupo: `zona_${zona.id}`,
      grupoLabel: `${tipoDef.icon} ${zona.nombre}`,
      zonaId: zona.id,
      zonaNombre: zona.nombre,
      zonaTipo: zona.tipo,
      categoria: 'llaves',
      categoriaLabel: 'Llaves de paso (2 por sector)',
      marca: 'Genérico',
      desc: 'Llave de paso esférica 1/2" (x2)',
      unidad: 'u',
      cant: 2,
      precio_mo: 12000,
      precio_mat: 12500,
      subtotal_mo: 24000,
      subtotal_mat: 25000,
      subtotal: 49000,
    });
  }

  return lineas;
}

// ── 3. Calcular totales ─────────────────────────────────────────
export function calcularTotales(lineas) {
  const subtotal_mo  = R(lineas.reduce((s, l) => s + (l.subtotal_mo  || 0), 0));
  const subtotal_mat = R(lineas.reduce((s, l) => s + (l.subtotal_mat || 0), 0));
  const subtotal     = R(subtotal_mo + subtotal_mat);
  const gg           = R(subtotal * 0.10);  // Gastos generales 10%
  const beneficio    = R(subtotal * 0.12);  // Beneficio 12%
  const base_iva     = R(subtotal + gg + beneficio);
  const iva          = R(base_iva * 0.21);
  const iibb         = R(base_iva * 0.025);
  const totalObra    = R(base_iva + iva + iibb);
  return { subtotal_mo, subtotal_mat, subtotal, gg, beneficio, base_iva, iva, iibb, totalObra };
}

// ── 4. Resumen por zona ─────────────────────────────────────────
export function resumenPorZona(lineas) {
  const map = {};
  lineas.forEach(l => {
    const key = l.zonaId || 'estructura';
    if (!map[key]) map[key] = {
      id: key,
      nombre: l.grupoLabel || 'Estructura',
      mo: 0, mat: 0, total: 0, items: 0
    };
    map[key].mo    += l.subtotal_mo  || 0;
    map[key].mat   += l.subtotal_mat || 0;
    map[key].total += l.subtotal     || 0;
    map[key].items++;
  });
  return Object.values(map);
}

// ── 5. Cronograma estimado ───────────────────────────────────────
export function calcularCronograma(proyecto) {
  const m2 = (proyecto.mCubiertos || 0);
  const meses = Math.max(4, Math.round(m2 / 25));
  const etapas = [
    { etapa: 'Demolición / Preliminares',  duracion: 1,              pct: 2  },
    { etapa: 'Estructura y fundaciones',    duracion: Math.ceil(meses*0.25), pct: 20 },
    { etapa: 'Mampostería / Steel Frame',   duracion: Math.ceil(meses*0.20), pct: 15 },
    { etapa: 'Cubierta / Techo',            duracion: Math.ceil(meses*0.10), pct: 8  },
    { etapa: 'Inst. Sanitaria',             duracion: Math.ceil(meses*0.15), pct: 12 },
    { etapa: 'Inst. Eléctrica',             duracion: Math.ceil(meses*0.15), pct: 8  },
    { etapa: 'Revoques y terminaciones',    duracion: Math.ceil(meses*0.20), pct: 20 },
    { etapa: 'Pisos y revestimientos',      duracion: Math.ceil(meses*0.15), pct: 10 },
    { etapa: 'Pintura y detalles',          duracion: Math.ceil(meses*0.10), pct: 4  },
    { etapa: 'Limpieza final',              duracion: 0.5,            pct: 1  },
  ];
  let mesInicio = 1;
  return etapas.map(e => {
    const inicio = mesInicio;
    const fin = Math.round(mesInicio + e.duracion);
    mesInicio = fin;
    return { ...e, inicio, fin, mesesDuracion: e.duracion };
  });
}
