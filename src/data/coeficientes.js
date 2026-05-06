// ══════════════════════════════════════════════════════════════
// COEFICIENTES DE CONSUMO POR M²
// Fuente: ARQ_Clarin_Mayo2026_BaseDatos.xlsx — hoja COEFICIENTES
// Uso: cant = m² × coef[tipoObra][item][calidad]
// ══════════════════════════════════════════════════════════════

export const COEF = {

  // ── VIVIENDA NUEVA ───────────────────────────────────────
  vivienda_nueva: [
    // itemId, descripcion, unid, basico, estandar, premium, lujo, notas
    { ref:'04.04', desc:'Movimiento de tierra',                         u:'m³/m²', b:0.5,  e:0.6,  p:0.7,  l:0.8  },
    { ref:'05.02', desc:'Bases de hormigón 60kg/m³',                    u:'m³/m²', b:0.08, e:0.10, p:0.12, l:0.15 },
    { ref:'05.13', desc:'Losa viguetas y ladrillo c/carpeta',           u:'m²/m²', b:0.85, e:0.90, p:0.95, l:1.00 },
    { ref:'07.19', desc:'Mampostería ladrillo hueco 18x18x33',          u:'m²/m²', b:0.5,  e:0.60, p:0.65, l:0.70, notas:'Muros exteriores+interiores' },
    { ref:'07.17', desc:'Mampostería ladrillo hueco 8x18x33',           u:'m²/m²', b:0.3,  e:0.35, p:0.40, l:0.45, notas:'Divisiones internas' },
    { ref:'10.05', desc:'Cubierta chapa ondulada N24 (básico)',         u:'m²/m²', b:0.9,  e:0,    p:0,    l:0    },
    { ref:'10.06', desc:'Cubierta chapa prepintada (estándar)',         u:'m²/m²', b:0,    e:0.9,  p:0,    l:0    },
    { ref:'10.08', desc:'Cubierta teja colonial madera (premium/lujo)', u:'m²/m²', b:0,    e:0,    p:0.9,  l:1.10 },
    { ref:'11.04', desc:'Revoque proyectable exterior c/hidrófugo',     u:'m²/m²', b:0.7,  e:0.80, p:0.90, l:1.00 },
    { ref:'11.05', desc:'Revoque proyectable grueso cal interior',      u:'m²/m²', b:1.2,  e:1.40, p:1.50, l:1.60 },
    { ref:'15.01', desc:'Contrapiso H° de cascote 15cm s/terreno',     u:'m²/m²', b:0.9,  e:1.00, p:1.00, l:1.00 },
    { ref:'16.01', desc:'Carpeta de concreto bajo solados',             u:'m²/m²', b:0.9,  e:1.00, p:1.00, l:1.00 },
    { ref:'17.05', desc:'Piso cerámico esmaltado 20x20 (básico)',       u:'m²/m²', b:1.1,  e:0,    p:0,    l:0    },
    { ref:'17.04', desc:'Piso porcelanato opaco 30x30 (estándar)',      u:'m²/m²', b:0,    e:1.1,  p:0,    l:0    },
    { ref:'17.04', desc:'Piso porcelanato pulido importado (prem/lujo)',u:'m²/m²', b:0,    e:0,    p:1.15, l:1.20 },
    { ref:'12.01', desc:'Revestimiento cerámica paredes',               u:'m²/m²', b:0.4,  e:0.55, p:0.70, l:0.90 },
    { ref:'14.03', desc:'Enlucido de yeso',                             u:'m²/m²', b:0.8,  e:1.00, p:1.10, l:1.20 },
    { ref:'13.04', desc:'Cielo raso suspendido cal armado en hierro',   u:'m²/m²', b:0.7,  e:0.85, p:0.90, l:1.00 },
    { ref:'22.01', desc:'Pintura látex muros interiores',               u:'m²/m²', b:1.6,  e:1.70, p:1.80, l:1.90 },
    { ref:'22.03', desc:'Pintura látex acrílico exteriores',            u:'m²/m²', b:0.5,  e:0.55, p:0.60, l:0.65 },
    { ref:'20.03', desc:'Zócalo de cerámica',                           u:'ml/m²', b:0.35, e:0.40, p:0.45, l:0.50 },
    { ref:'21.01', desc:'Mesada de granito 60cm',                       u:'ml/m²', b:0.08, e:0.10, p:0.12, l:0.15 },
    { ref:'29.01', desc:'Inst. sanitaria — baño completo',              u:'gl/baño',b:1,    e:1,    p:1,    l:1,   notas:'Por baño' },
    { ref:'33.01', desc:'Inst. eléctrica — puntos ilum/toma',           u:'u/m²',  b:1.0,  e:1.20, p:1.50, l:1.80 },
    { ref:'31.01', desc:'Inst. de gas cocina y termotanque',            u:'gl/local',b:1,   e:1,    p:1,    l:1,   notas:'Por local húmedo' },
    { ref:'24.01', desc:'Limpieza periódica',                           u:'mes/m²', b:0.05, e:0.05, p:0.05, l:0.05, notas:'Meses por cada 20m²' },
    { ref:'24.03', desc:'Ayuda de gremios',                             u:'m²/m²', b:1,    e:1,    p:1,    l:1    },
  ],

  // ── REFORMA COCINA ───────────────────────────────────────
  reforma_cocina: [
    { ref:'03.04', desc:'Demolición de contrapisos',                    u:'m³/m²', b:0.12, e:0.12, p:0.12, l:0.12, notas:'Siempre necesario' },
    { ref:'03.05', desc:'Demolición de revoques / Picado',              u:'m²/m²', b:1.5,  e:2.0,  p:2.0,  l:2.5,  notas:'Incluye paredes laterales' },
    { ref:'15.01', desc:'Contrapiso H° de cascote 15cm',               u:'m²/m²', b:1,    e:1,    p:1,    l:1    },
    { ref:'16.01', desc:'Carpeta bajo solados',                         u:'m²/m²', b:1,    e:1,    p:1,    l:1    },
    { ref:'17.04', desc:'Porcelanato piso 30x30 (colocación c/desp.)', u:'m²/m²', b:1.1,  e:1.1,  p:1.2,  l:1.3,  notas:'Factor pérdida incluido' },
    { ref:'12.01', desc:'Revestimiento paredes cerámica',               u:'m²/m²', b:0.8,  e:1.2,  p:1.5,  l:2.0,  notas:'Incluye salpicadera' },
    { ref:'11.03', desc:'Revoque grueso bajo revestimiento',            u:'m²/m²', b:0.8,  e:1.2,  p:1.5,  l:2.0  },
    { ref:'14.03', desc:'Enlucido de yeso',                             u:'m²/m²', b:0.5,  e:0.8,  p:1.0,  l:1.2  },
    { ref:'13.01', desc:'Cielo raso suspendido',                        u:'m²/m²', b:1,    e:1,    p:1,    l:1    },
    { ref:'22.01', desc:'Pintura látex muros interiores',               u:'m²/m²', b:1.5,  e:1.8,  p:1.8,  l:2.0  },
    { ref:'26.03', desc:'Mueble bajo mesada (colocación)',              u:'ml/m²', b:0.5,  e:0.65, p:0.8,  l:1.0,  notas:'ml por m² de cocina' },
    { ref:'26.04', desc:'Alacena',                                      u:'ml/m²', b:0.3,  e:0.40, p:0.5,  l:0.6  },
    { ref:'21.01', desc:'Mesada de granito 60cm',                       u:'ml/m²', b:0.3,  e:0.40, p:0.5,  l:0.6  },
    { ref:'29.02', desc:'Inst. sanitaria cocina y lavadero',            u:'gl/local',b:1,   e:1,    p:1,    l:1,   notas:'Por local' },
    { ref:'33.01', desc:'Inst. eléctrica — puntos',                     u:'u/m²',  b:1.2,  e:1.5,  p:2.0,  l:2.5  },
    { ref:'23.01', desc:'Pileta cocina doble bacha colocación',         u:'u/local',b:0,    e:1,    p:1,    l:1    },
    { ref:'23.03', desc:'Griferías monocomando cocina',                 u:'u/local',b:0,    e:1,    p:1,    l:1    },
    { ref:'24.02', desc:'Limpieza final',                               u:'m²/m²', b:1,    e:1,    p:1,    l:1    },
    { ref:'24.03', desc:'Ayuda de gremios',                             u:'m²/m²', b:1,    e:1,    p:1,    l:1    },
  ],

  // ── REFORMA BAÑO ────────────────────────────────────────
  reforma_bano: [
    { ref:'03.04', desc:'Demolición de contrapisos',                    u:'m³/m²', b:0.12, e:0.12, p:0.12, l:0.12 },
    { ref:'03.05', desc:'Demolición de revoques / Picado',              u:'m²/m²', b:2.0,  e:2.5,  p:2.5,  l:3.0,  notas:'Paredes perimetrales' },
    { ref:'15.03', desc:'Contrapiso H° sobre losa sanitario 25cm',     u:'m²/m²', b:1,    e:1,    p:1,    l:1    },
    { ref:'16.01', desc:'Carpeta bajo solados',                         u:'m²/m²', b:1,    e:1,    p:1,    l:1    },
    { ref:'17.04', desc:'Porcelanato piso (colocación c/desp.)',        u:'m²/m²', b:1.1,  e:1.1,  p:1.2,  l:1.3  },
    { ref:'12.01', desc:'Revestimiento paredes cerámica',               u:'m²/m²', b:2.5,  e:3.0,  p:3.5,  l:4.0,  notas:'Piso al techo 4 paredes' },
    { ref:'11.03', desc:'Revoque grueso bajo revestimiento',            u:'m²/m²', b:2.5,  e:3.0,  p:3.5,  l:4.0  },
    { ref:'14.07', desc:'Enlucido de yeso cielo raso',                  u:'m²/m²', b:1,    e:1,    p:1,    l:1    },
    { ref:'22.01', desc:'Pintura látex muros interiores',               u:'m²/m²', b:1,    e:1,    p:1,    l:1    },
    { ref:'29.01', desc:'Instalación sanitaria baño completo',          u:'gl/local',b:1,   e:1,    p:1,    l:1,   notas:'Por baño' },
    { ref:'23.01', desc:'Inodoro — colocación',                         u:'u/local',b:1,    e:1,    p:1,    l:1    },
    { ref:'23.01', desc:'Bidet — colocación',                           u:'u/local',b:1,    e:1,    p:1,    l:1    },
    { ref:'23.01', desc:'Lavatorio — colocación',                       u:'u/local',b:1,    e:1,    p:1,    l:1    },
    { ref:'23.01', desc:'Bañera/duchero',                               u:'u/local',b:0,    e:0,    p:1,    l:1,   notas:'Solo premium/lujo' },
    { ref:'23.03', desc:'Griferías — juego completo',                   u:'set/local',b:1,  e:1,    p:1,    l:1    },
    { ref:'12.02', desc:'Mosaico veneciano revestimiento',              u:'m²/m²', b:0,    e:0,    p:0.5,  l:1.0,  notas:'Solo premium/lujo' },
    { ref:'33.01', desc:'Inst. eléctrica — puntos',                     u:'u/m²',  b:1.0,  e:1.2,  p:1.5,  l:2.0  },
    { ref:'24.02', desc:'Limpieza final',                               u:'m²/m²', b:1,    e:1,    p:1,    l:1    },
  ],

  // ── REFORMA OFICINA ──────────────────────────────────────
  reforma_oficina: [
    { ref:'03.05', desc:'Demolición revoques / Picado',                 u:'m²/m²', b:1.0,  e:1.5,  p:1.5,  l:2.0  },
    { ref:'08.01', desc:'Tabique steel frame simple 9,5cm',             u:'m²/m²', b:0.3,  e:0.4,  p:0.5,  l:0.6,  notas:'Por m² de oficina' },
    { ref:'13.05', desc:'Cielo raso suspendido junta tomada',           u:'m²/m²', b:1,    e:1,    p:1,    l:1    },
    { ref:'18.06', desc:'Piso vinílico / alfombra',                     u:'m²/m²', b:0,    e:1.1,  p:0,    l:0,   notas:'Estándar' },
    { ref:'17.04', desc:'Piso porcelanato pulido',                      u:'m²/m²', b:0,    e:0,    p:1.1,  l:1.15, notas:'Premium/Lujo' },
    { ref:'11.05', desc:'Revoque proyectable grueso interior',          u:'m²/m²', b:0.4,  e:0.6,  p:0.8,  l:1.0  },
    { ref:'22.01', desc:'Pintura látex muros interiores',               u:'m²/m²', b:1.4,  e:1.6,  p:1.8,  l:2.0  },
    { ref:'33.01', desc:'Inst. eléctrica — puntos',                     u:'u/m²',  b:1.2,  e:1.5,  p:2.0,  l:2.5  },
    { ref:'24.02', desc:'Limpieza final',                               u:'m²/m²', b:1,    e:1,    p:1,    l:1    },
  ],

};

// Tipos de obra disponibles en el presupuestador
export const TIPOS_OBRA = [
  { id:'vivienda_nueva',   label:'Vivienda nueva',         coef:'vivienda_nueva'  },
  { id:'reforma_cocina',   label:'Reforma cocina',         coef:'reforma_cocina'  },
  { id:'reforma_bano',     label:'Reforma baño',           coef:'reforma_bano'    },
  { id:'reforma_oficina',  label:'Reforma oficina',        coef:'reforma_oficina' },
];
