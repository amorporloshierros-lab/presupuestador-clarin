// ══════════════════════════════════════════════════════════════
// MULTIPLICADORES DE CALIDAD
// Fuente: ARQ_Clarin_Mayo2026_BaseDatos.xlsx — hoja CALIDAD
// ══════════════════════════════════════════════════════════════

export const CALIDAD = {
  basico:    { label:'Básico',    factor:1.0, color:'#64748b', desc:'Cerámico 20x20 · FV estándar · Placa MDF · Aluminio sin RPT' },
  estandar:  { label:'Estándar', factor:1.4, color:'#3b82f6', desc:'Porcelanato · Allegro · MDF enchapado · DVH' },
  premium:   { label:'Premium',  factor:2.2, color:'#8b5cf6', desc:'Importado 60×120 · Hydros Zen · Madera maciza · RPT+DVH' },
  lujo:      { label:'Lujo',     factor:3.8, color:'#f59e0b', desc:'Mármol natural · Grohe/Hansgrohe · Diseño personalizado · Acero/Madera' },
};

// Multiplicadores por categoría y nivel
export const MULT = {
  pisos_ceramico:       { basico:1,   estandar:1.3, premium:1.8, lujo:2.8 },
  pisos_madera:         { basico:1,   estandar:1.4, premium:2.2, lujo:3.5 },
  revestimientos_pared: { basico:1,   estandar:1.4, premium:2.0, lujo:3.2 },
  mesadas:              { basico:1,   estandar:1.5, premium:2.5, lujo:4.0 },
  griferias_bano:       { basico:1,   estandar:1.4, premium:2.2, lujo:4.5 },
  griferias_cocina:     { basico:1,   estandar:1.5, premium:2.8, lujo:5.0 },
  inodoro:              { basico:1,   estandar:1.5, premium:2.5, lujo:5.0 },
  bidet:                { basico:1,   estandar:1.5, premium:2.5, lujo:4.0 },
  banera_duchero:       { basico:1,   estandar:1.6, premium:2.8, lujo:6.0 },
  muebles_cocina:       { basico:1,   estandar:1.6, premium:2.8, lujo:5.0 },
  puertas_int:          { basico:1,   estandar:1.4, premium:2.2, lujo:4.0 },
  ventanas_ext:         { basico:1,   estandar:1.5, premium:2.5, lujo:4.5 },
  iluminacion:          { basico:1,   estandar:1.6, premium:3.0, lujo:6.0 },
  aislaciones:          { basico:1,   estandar:1.3, premium:1.8, lujo:2.5 },
  terminacion_global:   { basico:1,   estandar:1.4, premium:2.2, lujo:3.8 },
};

export const NIVELES = ['basico','estandar','premium','lujo'];
