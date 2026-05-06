// ══════════════════════════════════════════════════════════════
// MOTOR DE CÁLCULO — Basado en ARQ Clarín Mayo 2026
// Lógica: m² × coeficiente × precio × factor_calidad
// ══════════════════════════════════════════════════════════════
import { RUBROS } from '../data/rubros.js';
import { COEF } from '../data/coeficientes.js';
import { CALIDAD } from '../data/calidad.js';

const R2 = v => Math.round(v * 100) / 100;
const R0 = v => Math.round(v);

// Obtener precio de un ítem por su ID
function getPrecio(itemId) {
  const rubro = itemId.split('.')[0].padStart(2,'0');
  const r = RUBROS[rubro];
  if (!r) return 0;
  const item = r.items.find(i => i.id === itemId);
  return item ? item.precio : 0;
}

// Calcular líneas de presupuesto para un tipo de obra
export function calcularObra({
  tipoObra = 'vivienda_nueva',
  m2 = 100,
  nBanos = 2,
  nLocales = 1,       // cocinas / locales húmedos
  nMeses = 6,
  calidad = 'estandar',
  // Rubros manuales extra (usuario agrega ítems sueltos)
  extras = [],
}) {
  const nivelIdx = { basico:'b', estandar:'e', premium:'p', lujo:'l' }[calidad] || 'e';
  const coefs = COEF[tipoObra] || COEF.vivienda_nueva;
  const lineas = [];

  coefs.forEach(c => {
    const cantidad_base = c[nivelIdx] || 0;
    if (cantidad_base === 0) return;

    // Determinar la cantidad real según unidad
    let cant;
    const u = c.u;
    if (u.includes('/m²')) {
      cant = R2(m2 * cantidad_base);
    } else if (u.includes('/baño')) {
      cant = R2(nBanos * cantidad_base);
    } else if (u.includes('/local')) {
      cant = R2(nLocales * cantidad_base);
    } else if (u.includes('/mes')) {
      cant = R2(nMeses * cantidad_base);
    } else {
      cant = R2(cantidad_base);
    }

    if (cant === 0) return;

    const precioUnit = getPrecio(c.ref);
    const subtotal = R0(cant * precioUnit);
    const rubro = c.ref.split('.')[0].padStart(2,'0');

    lineas.push({
      id: `${c.ref}_${Date.now()}_${Math.random()}`,
      rubro,
      itemId: c.ref,
      desc: c.desc,
      u: u.split('/')[0],
      cant,
      precioUnit,
      subtotal,
      notas: c.notas || '',
      editable: true,
    });
  });

  // Agregar extras
  extras.forEach(e => lineas.push({ ...e, editable: true }));

  return lineas;
}

// Agrupar líneas por rubro
export function agruparPorRubro(lineas) {
  const grupos = {};
  lineas.forEach(l => {
    if (!grupos[l.rubro]) {
      grupos[l.rubro] = {
        rubro: l.rubro,
        nombre: RUBROS[l.rubro]?.nombre || `Rubro ${l.rubro}`,
        lineas: [],
        total: 0,
      };
    }
    grupos[l.rubro].lineas.push(l);
    grupos[l.rubro].total += l.subtotal || 0;
  });
  return Object.values(grupos).sort((a,b) => a.rubro.localeCompare(b.rubro));
}

// Totales generales
export function calcularTotales(lineas) {
  const total = lineas.reduce((s, l) => s + (l.subtotal || 0), 0);
  return {
    subtotal: total,
    iva: R0(total * 0.21),
    totalConIva: R0(total * 1.21),
    gg: R0(total * 0.20),         // Gastos generales estimados 20%
    beneficio: R0(total * 0.10),  // Beneficio 10%
    totalObra: R0(total * 1.30),  // Sub + GG + Benef (sin IVA)
  };
}

// Recalcular subtotal de una línea editada
export function recalcularLinea(linea) {
  return { ...linea, subtotal: R0((linea.cant || 0) * (linea.precioUnit || 0)) };
}

// Costo por m² resultante
export function costoM2(lineas, m2) {
  if (!m2 || m2 <= 0) return 0;
  const tot = calcularTotales(lineas);
  return R0(tot.totalObra / m2);
}
