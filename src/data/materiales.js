// ══════════════════════════════════════════════════════════════
// CATÁLOGO COMPLETO POR ZONA — Marcas reales · Mayo 2026
// ══════════════════════════════════════════════════════════════

export const ZONA_TIPOS = {
  bano: {
    nombre: "Baño",
    icon: "🚿",
    categorias: [
      {
        id: "piso",
        nombre: "Piso",
        unidad: "m²",
        tipo: "selector",
        opciones: [
          { id: "cer_2020",      marca: "San Lorenzo",      desc: "Cerámico esmaltado 20x20",      precio_mat: 15000,  precio_mo: 74568 },
          { id: "cer_3030",      marca: "Alberdi",          desc: "Cerámico esmaltado 30x30",      precio_mat: 19000,  precio_mo: 82784 },
          { id: "porc_rust",     marca: "San Lorenzo D.",   desc: "Porcelanato rústico 50x60",     precio_mat: 23000,  precio_mo: 49491 },
          { id: "porc_pul",      marca: "Portinari",        desc: "Porcelanato pulido 50x60",      precio_mat: 45000,  precio_mo: 49491 },
          { id: "mosaico_ven",   marca: "Veneciano",        desc: "Mosaico veneciano mezcla",      precio_mat: 32000,  precio_mo: 178262 },
        ]
      },
      {
        id: "revestimiento",
        nombre: "Revestimiento pared",
        unidad: "m²",
        tipo: "selector",
        opciones: [
          { id: "rev_cer_2020",  marca: "San Lorenzo",      desc: "Cerámico pared 20x20",          precio_mat: 15000,  precio_mo: 40855 },
          { id: "rev_cer_3030",  marca: "Cerro Negro",      desc: "Cerámico esmaltado 30x30",      precio_mat: 22000,  precio_mo: 82784 },
          { id: "rev_porc",      marca: "Portinari",        desc: "Porcelanato pared 30x60",       precio_mat: 40000,  precio_mo: 46640 },
          { id: "rev_mos",       marca: "Hidráulico",       desc: "Mosaico hidráulico clásico",    precio_mat: 38000,  precio_mo: 135560 },
        ]
      },
      {
        id: "inodoro",
        nombre: "Inodoro",
        unidad: "u",
        tipo: "selector",
        opciones: [
          { id: "inod_ferrum_b", marca: "Ferrum",           desc: "Ferrum Andina corto básico",    precio_mat: 107165, precio_mo: 87085 },
          { id: "inod_johnson",  marca: "Johnson",          desc: "Johnson Ibiza blanco",          precio_mat: 145000, precio_mo: 87085 },
          { id: "inod_roca",     marca: "Roca",             desc: "Roca Nexo estándar",            precio_mat: 155000, precio_mo: 87085 },
          { id: "inod_roca_sus", marca: "Roca",             desc: "Roca GAP Suspendido",           precio_mat: 280000, precio_mo: 87085 },
        ]
      },
      {
        id: "bidet",
        nombre: "Bidet",
        unidad: "u",
        tipo: "selector",
        opciones: [
          { id: "bidet_ferrum",  marca: "Ferrum",           desc: "Ferrum Andina 3 agujeros",      precio_mat: 165000, precio_mo: 87085 },
          { id: "bidet_johnson", marca: "Johnson",          desc: "Johnson Ibiza 3 agujeros",      precio_mat: 195000, precio_mo: 87085 },
          { id: "bidet_roca",    marca: "Roca",             desc: "Roca Nexo 3 agujeros",          precio_mat: 220000, precio_mo: 87085 },
        ]
      },
      {
        id: "lavatorio",
        nombre: "Lavatorio",
        unidad: "u",
        tipo: "selector",
        opciones: [
          { id: "lav_ferrum",    marca: "Ferrum",           desc: "Ferrum Celta Oval sin pie",     precio_mat: 104299, precio_mo: 87085 },
          { id: "lav_johnson",   marca: "Johnson",          desc: "Johnson Ibiza sin pie",         precio_mat: 118000, precio_mo: 87085 },
          { id: "lav_roca",      marca: "Roca",             desc: "Roca Meridian con pie",         precio_mat: 136998, precio_mo: 87085 },
        ]
      },
      {
        id: "griferia_lav",
        nombre: "Grifería lavatorio",
        unidad: "u",
        tipo: "selector",
        opciones: [
          { id: "grif_sedal_h",  marca: "Sedal",            desc: "Sedal Hydros Zen monocomando",  precio_mat: 526237, precio_mo: 91605 },
          { id: "grif_sedal_a",  marca: "Sedal",            desc: "Sedal Allegro monocomando",     precio_mat: 850676, precio_mo: 91605 },
          { id: "grif_fv_tos",   marca: "FV",               desc: "FV Toscana monocomando",        precio_mat: 420000, precio_mo: 91605 },
          { id: "grif_grohe",    marca: "Grohe",            desc: "Grohe Eurosmart monocomando",   precio_mat: 680000, precio_mo: 91605 },
        ]
      },
      {
        id: "griferia_ducha",
        nombre: "Grifería ducha/bañera",
        unidad: "u",
        tipo: "selector",
        opciones: [
          { id: "duc_fv_std",    marca: "FV",               desc: "FV Briggs lluvia monocomando",  precio_mat: 380000, precio_mo: 91605 },
          { id: "duc_fv_lux",    marca: "FV",               desc: "FV Toscana lluvia termostática",precio_mat: 620000, precio_mo: 91605 },
          { id: "duc_grohe",     marca: "Grohe",            desc: "Grohe Vitalio Joy monocomando", precio_mat: 750000, precio_mo: 91605 },
          { id: "duc_roca",      marca: "Roca",             desc: "Roca L90 monocomando",          precio_mat: 320000, precio_mo: 91605 },
        ]
      },
      {
        id: "accesorios",
        nombre: "Accesorios (kit)",
        unidad: "u",
        tipo: "selector",
        opciones: [
          { id: "acc_basico",    marca: "Genérico",         desc: "Kit 3 pzas loza blanca básico", precio_mat: 107640, precio_mo: 17062 },
          { id: "acc_premium",   marca: "Premium",          desc: "Kit 3 pzas loza premium",       precio_mat: 152396, precio_mo: 17062 },
        ]
      },
    ]
  },

  habitacion: {
    nombre: "Habitación",
    icon: "🛏️",
    categorias: [
      {
        id: "piso",
        nombre: "Piso",
        unidad: "m²",
        tipo: "selector",
        opciones: [
          { id: "parq_euca",     marca: "Eucaliptus",       desc: "Parquet eucaliptus cola adhesiva",precio_mat: 28000, precio_mo: 79989 },
          { id: "piso_flotante", marca: "Meister",          desc: "Piso flotante meister",           precio_mat: 35000, precio_mo: 54318 },
          { id: "piso_flot_vin", marca: "LVT Click",        desc: "Piso vinílico LVT Click 4mm",     precio_mat: 22000, precio_mo: 85661 },
          { id: "porc_opaco",    marca: "Pamesa",           desc: "Porcelanato opaco 30x30",         precio_mat: 23000, precio_mo: 49491 },
          { id: "porc_lux",      marca: "Portinari",        desc: "Porcelanato polished 60x120",     precio_mat: 85000, precio_mo: 49491 },
          { id: "cement_alis",   marca: "Ferrocrementado",  desc: "Cemento alisado ferrocrementado", precio_mat: 18000, precio_mo: 86288 },
        ]
      },
      {
        id: "pintura",
        nombre: "Pintura paredes",
        unidad: "m²",
        tipo: "selector",
        opciones: [
          { id: "lat_alba",      marca: "Alba",             desc: "Látex interior mate",             precio_mat: 3500,  precio_mo: 15120 },
          { id: "lat_sherwin",   marca: "Sherwin-Williams", desc: "Látex premium lavable",           precio_mat: 6200,  precio_mo: 15120 },
          { id: "lat_sint",      marca: "Sinteplast",       desc: "Látex satinado interior",         precio_mat: 5800,  precio_mo: 15120 },
          { id: "microcemento",  marca: "Mapei",            desc: "Microcemento Mapei 2mm",          precio_mat: 28000, precio_mo: 92592 },
        ]
      },
      {
        id: "cielorraso",
        nombre: "Cielorraso",
        unidad: "m²",
        tipo: "selector",
        opciones: [
          { id: "yeso_aplic",    marca: "Yesería",          desc: "Cielorraso aplicado cal",        precio_mat: 4200,  precio_mo: 46430 },
          { id: "durlock_susp",  marca: "Durlock",          desc: "Cielorraso suspendido Durlock",  precio_mat: 22000, precio_mo: 42650 },
          { id: "yeso_susp",     marca: "Yesería",          desc: "Suspendido armado hierro",       precio_mat: 8500,  precio_mo: 152316 },
        ]
      },
    ]
  },

  cocina: {
    nombre: "Cocina",
    icon: "🍳",
    categorias: [
      {
        id: "piso",
        nombre: "Piso",
        unidad: "m²",
        tipo: "selector",
        opciones: [
          { id: "cer_3030",      marca: "Cañuelas",         desc: "Cerámico 30x30 esmaltado",      precio_mat: 18000,  precio_mo: 82784 },
          { id: "porc_rust",     marca: "San Lorenzo D.",   desc: "Porcelanato rústico 50x60",     precio_mat: 23000,  precio_mo: 49491 },
          { id: "porc_pul",      marca: "Pamesa",           desc: "Porcelanato pulido 60x60",      precio_mat: 42000,  precio_mo: 49491 },
          { id: "cement_alis",   marca: "Ferrocrementado",  desc: "Cemento alisado ferrocrementado",precio_mat: 18000, precio_mo: 86288 },
        ]
      },
      {
        id: "revestimiento",
        nombre: "Revestimiento pared (guardas)",
        unidad: "m²",
        tipo: "selector",
        opciones: [
          { id: "rev_cer",       marca: "San Lorenzo",      desc: "Cerámico 20x20 + guarda",       precio_mat: 16000,  precio_mo: 40855 },
          { id: "rev_porc",      marca: "Portinari",        desc: "Porcelanato pared 30x60",       precio_mat: 42000,  precio_mo: 46640 },
          { id: "tejuela",       marca: "Tejuela ladrillo", desc: "Tejuela ladrillo visto rústico", precio_mat: 28000, precio_mo: 135560 },
        ]
      },
      {
        id: "pileta",
        nombre: "Pileta cocina",
        unidad: "u",
        tipo: "selector",
        opciones: [
          { id: "pil_j_doble",   marca: "Johnson",          desc: "Johnson doble bacha Inox",      precio_mat: 145044, precio_mo: 87085 },
          { id: "pil_f_doble",   marca: "Ferrum",           desc: "Ferrum doble bajo mesada",      precio_mat: 160000, precio_mo: 87085 },
          { id: "pil_bajo",      marca: "Johnson",          desc: "Johnson simple Inox empotrar",  precio_mat: 120000, precio_mo: 87085 },
          { id: "pil_prem",      marca: "Premium Inox",     desc: "Inox 304 doble con escurridor", precio_mat: 245000, precio_mo: 87085 },
        ]
      },
      {
        id: "griferia",
        nombre: "Grifería cocina",
        unidad: "u",
        tipo: "selector",
        opciones: [
          { id: "grif_fv_sw",    marca: "FV",               desc: "FV Swing cuello de cisne",      precio_mat: 285980, precio_mo: 91605 },
          { id: "grif_sedal_c",  marca: "Sedal",            desc: "Sedal Swing monocomando",       precio_mat: 285980, precio_mo: 91605 },
          { id: "grif_roca_e",   marca: "Roca",             desc: "Roca Esmai monocomando",        precio_mat: 220000, precio_mo: 91605 },
          { id: "grif_fv_2ll",   marca: "FV",               desc: "FV dos llaves tradicional",     precio_mat: 145000, precio_mo: 91605 },
        ]
      },
      {
        id: "mesada",
        nombre: "Mesada",
        unidad: "ml",
        tipo: "selector",
        opciones: [
          { id: "mes_granito",   marca: "Granito Gris Mara",desc: "Granito gris 60cm",              precio_mat: 380000, precio_mo: 199685 },
          { id: "mes_marmol",    marca: "Mármol Carrara",   desc: "Mármol Carrara 60cm",            precio_mat: 650000, precio_mo: 199685 },
          { id: "mes_trav",      marca: "Travertino",       desc: "Travertino 60cm",                precio_mat: 480000, precio_mo: 199685 },
          { id: "mes_sint",      marca: "Sintético",        desc: "Silestone / Corian 60cm",        precio_mat: 550000, precio_mo: 199685 },
        ]
      },
    ]
  },

  living: {
    nombre: "Living/Comedor",
    icon: "🛋️",
    categorias: [
      {
        id: "piso",
        nombre: "Piso",
        unidad: "m²",
        tipo: "selector",
        opciones: [
          { id: "parq_euca",     marca: "Eucaliptus",       desc: "Parquet eucaliptus cola adhesiva",precio_mat: 28000, precio_mo: 79989 },
          { id: "piso_flotante", marca: "Meister",          desc: "Piso flotante meister",           precio_mat: 35000, precio_mo: 54318 },
          { id: "porc_pul",      marca: "Portinari",        desc: "Porcelanato pulido 60x120",       precio_mat: 55000, precio_mo: 49491 },
          { id: "porc_opaco",    marca: "Pamesa",           desc: "Porcelanato opaco 30x60",         precio_mat: 28000, precio_mo: 49491 },
          { id: "cement_alis",   marca: "Ferrocrementado",  desc: "Cemento alisado ferrocrementado", precio_mat: 18000, precio_mo: 86288 },
          { id: "cer_20x20",     marca: "San Lorenzo",      desc: "Cerámico 20x20",                  precio_mat: 14000, precio_mo: 74568 },
        ]
      },
      {
        id: "pintura",
        nombre: "Pintura paredes",
        unidad: "m²",
        tipo: "selector",
        opciones: [
          { id: "lat_alba",      marca: "Alba",             desc: "Látex interior mate",             precio_mat: 3500,  precio_mo: 15120 },
          { id: "lat_sherwin",   marca: "Sherwin-Williams", desc: "Látex premium lavable",           precio_mat: 6200,  precio_mo: 15120 },
          { id: "microcemento",  marca: "Mapei",            desc: "Microcemento Mapei 2mm",          precio_mat: 28000, precio_mo: 92592 },
        ]
      },
      {
        id: "cielorraso",
        nombre: "Cielorraso",
        unidad: "m²",
        tipo: "selector",
        opciones: [
          { id: "yeso_aplic",    marca: "Yesería",          desc: "Cielorraso aplicado cal",        precio_mat: 4200,  precio_mo: 46430 },
          { id: "durlock_susp",  marca: "Durlock",          desc: "Cielorraso suspendido Durlock",  precio_mat: 22000, precio_mo: 42650 },
        ]
      },
    ]
  },

  garage: {
    nombre: "Garaje",
    icon: "🚗",
    categorias: [
      {
        id: "piso",
        nombre: "Piso",
        unidad: "m²",
        tipo: "selector",
        opciones: [
          { id: "cement_rod",    marca: "Cemento",          desc: "Cemento alisado rodillado",       precio_mat: 8000,  precio_mo: 37852 },
          { id: "cement_fer",    marca: "Ferrocrementado",  desc: "Cemento ferrocrementado 5cm",     precio_mat: 18000, precio_mo: 86288 },
          { id: "cement_estam",  marca: "Decorativo",       desc: "Hormigón estampado",              precio_mat: 35000, precio_mo: 92592 },
          { id: "baldoson_60",   marca: "Calcáreo",         desc: "Baldosón 60x40cm vereda",        precio_mat: 16000, precio_mo: 32939 },
        ]
      },
      {
        id: "porton",
        nombre: "Portón garaje",
        unidad: "u",
        tipo: "selector",
        opciones: [
          { id: "port_manual",   marca: "Metálico",         desc: "Portón seccional manual 3x2.1m", precio_mat: 850000, precio_mo: 180000 },
          { id: "port_auto",     marca: "Motorizado",       desc: "Portón seccional motorizado",    precio_mat: 1400000,precio_mo: 180000 },
          { id: "port_levad",    marca: "Levadizo",         desc: "Portón levadizo motorizado",     precio_mat: 1200000,precio_mo: 160000 },
        ]
      },
    ]
  },

  sala_maquinas: {
    nombre: "Sala Máquinas",
    icon: "⚙️",
    categorias: [
      {
        id: "caldera",
        nombre: "Caldera",
        unidad: "u",
        tipo: "selector",
        opciones: [
          { id: "cald_calef",    marca: "Multibrás",        desc: "Caldera 25.000 kcal solo calef.",precio_mat: 1802559,precio_mo: 280000 },
          { id: "cald_combi",    marca: "Beretta",          desc: "Caldera 25.000 kcal agua+calef.",precio_mat: 2377288,precio_mo: 280000 },
          { id: "cald_elect",    marca: "Eléctrica",        desc: "Termotanque eléctrico 80L",      precio_mat: 350000, precio_mo: 120000 },
        ]
      },
      {
        id: "tanque",
        nombre: "Tanque agua",
        unidad: "u",
        tipo: "selector",
        opciones: [
          { id: "tanq_inox_1k",  marca: "Inox",             desc: "Tanque acero inox 1.000L",       precio_mat: 699944, precio_mo: 150000 },
          { id: "tanq_plas",     marca: "Plastiform",       desc: "Tanque plástico 1.000L",         precio_mat: 180000, precio_mo: 120000 },
        ]
      },
      {
        id: "piso",
        nombre: "Piso",
        unidad: "m²",
        tipo: "selector",
        opciones: [
          { id: "cement_rod",    marca: "Cemento",          desc: "Cemento alisado rodillado",       precio_mat: 8000,  precio_mo: 37852 },
          { id: "cement_fer",    marca: "Ferrocrementado",  desc: "Cemento ferrocrementado 5cm",     precio_mat: 18000, precio_mo: 86288 },
        ]
      },
    ]
  },

  pileta: {
    nombre: "Pileta",
    icon: "🏊",
    categorias: [
      {
        id: "tipo_pileta",
        nombre: "Tipo pileta",
        unidad: "u",
        tipo: "selector",
        opciones: [
          { id: "pil_haa_4x8",   marca: "H°A° revestida",   desc: "Pileta H°A° 4x8m revestida",    precio_mat: 8500000,precio_mo: 4200000 },
          { id: "pil_haa_5x10",  marca: "H°A° revestida",   desc: "Pileta H°A° 5x10m revestida",   precio_mat: 14000000,precio_mo: 6800000},
          { id: "pil_pref",      marca: "Prefabricada",      desc: "Pileta prefabricada fibra 4x8m", precio_mat: 6800000,precio_mo: 1200000 },
          { id: "pil_horm_est",  marca: "Hormigón proyect.", desc: "Hormigón proyectado 4x8m",      precio_mat: 9200000,precio_mo: 3800000 },
        ]
      },
      {
        id: "equipamiento",
        nombre: "Equipamiento",
        unidad: "u",
        tipo: "selector",
        opciones: [
          { id: "eq_basico",     marca: "Básico",            desc: "Bomba + filtro + skimmer básico",precio_mat: 950000, precio_mo: 180000 },
          { id: "eq_comp",       marca: "Completo",          desc: "Equipo completo + clorador sal", precio_mat: 2200000,precio_mo: 280000 },
          { id: "eq_premia",     marca: "Premium",           desc: "Equipo premium + automatización",precio_mat: 4500000,precio_mo: 380000 },
        ]
      },
    ]
  },

  jardin: {
    nombre: "Jardín",
    icon: "🌿",
    categorias: [
      {
        id: "piso_ext",
        nombre: "Piso exterior",
        unidad: "m²",
        tipo: "selector",
        opciones: [
          { id: "adoq_gran",     marca: "Granítico",        desc: "Adoquín granítico sobre arena",  precio_mat: 38000, precio_mo: 669082 },
          { id: "adoq_calc",     marca: "Calcáreo",         desc: "Adoquín calcáreo sobre arena",   precio_mat: 22000, precio_mo: 32402 },
          { id: "baldoson",      marca: "Calcáreo",         desc: "Baldosón 60x40 exterior",        precio_mat: 16000, precio_mo: 32939 },
          { id: "cesped",        marca: "Césped natural",   desc: "Cesped natural sembrado",        precio_mat: 12000, precio_mo: 8500  },
        ]
      },
      {
        id: "riego",
        nombre: "Riego automatizado",
        unidad: "u",
        tipo: "selector",
        opciones: [
          { id: "riego_man",     marca: "Manual",           desc: "Toma de agua + manguera",        precio_mat: 45000, precio_mo: 35000 },
          { id: "riego_auto",    marca: "Hunter",           desc: "Riego automático Hunter 6 zonas",precio_mat: 380000,precio_mo: 180000 },
          { id: "riego_gota",    marca: "Goteo",            desc: "Sistema goteo completo",         precio_mat: 220000,precio_mo: 120000 },
        ]
      },
    ]
  },

  camaras: {
    nombre: "Cámaras y seguridad",
    icon: "📷",
    categorias: [
      {
        id: "camaras",
        nombre: "Sistema de cámaras",
        unidad: "u",
        tipo: "selector",
        opciones: [
          { id: "cam_4_hd",      marca: "Hikvision",        desc: "Kit 4 cámaras HD + DVR 1TB",     precio_mat: 680000, precio_mo: 250000 },
          { id: "cam_8_hd",      marca: "Hikvision",        desc: "Kit 8 cámaras HD + DVR 2TB",     precio_mat: 1200000,precio_mo: 380000 },
          { id: "cam_4_4k",      marca: "Dahua",            desc: "Kit 4 cámaras 4K + NVR IP",     precio_mat: 1800000,precio_mo: 280000 },
          { id: "cam_8_4k",      marca: "Dahua",            desc: "Kit 8 cámaras 4K + NVR IP",     precio_mat: 2800000,precio_mo: 420000 },
        ]
      },
      {
        id: "alarma",
        nombre: "Sistema alarma",
        unidad: "u",
        tipo: "selector",
        opciones: [
          { id: "alarm_bas",     marca: "DSC",              desc: "Alarma perimetral básica",       precio_mat: 280000, precio_mo: 120000 },
          { id: "alarm_mon",     marca: "DSC",              desc: "Alarma + monitoreo incluido",    precio_mat: 480000, precio_mo: 180000 },
          { id: "alarm_smart",   marca: "Ajax",             desc: "Alarma smart Ajax wifi/gsm",     precio_mat: 850000, precio_mo: 180000 },
        ]
      },
    ]
  },

  techo: {
    nombre: "Techo",
    icon: "🏠",
    categorias: [
      {
        id: "cubierta",
        nombre: "Tipo de cubierta",
        unidad: "m²",
        tipo: "selector",
        opciones: [
          { id: "terr_mem",      marca: "Membrana",         desc: "Terraza c/barrera vapor + membrana aluminio 4mm", precio_mat: 95000,  precio_mo: 253845 },
          { id: "terr_trans",    marca: "Transitable",      desc: "Cubierta transitable c/baldosas", precio_mat: 130000, precio_mo: 313211 },
          { id: "teja_franc",    marca: "Teja francesa",    desc: "Teja francesa + estr. madera vista", precio_mat: 185000,precio_mo: 223056 },
          { id: "chapa_prep",    marca: "Chapa prepintada", desc: "Chapa prepintada c/aislación",   precio_mat: 95000,  precio_mo: 191986 },
          { id: "chapa_sand",    marca: "Sándwich",         desc: "Chapa sándwich c/aislación térmica", precio_mat: 165000,precio_mo: 88260 },
          { id: "steel_frame",   marca: "Steel Frame",      desc: "Techo steel frame c/aislación",  precio_mat: 220000, precio_mo: 145000 },
        ]
      },
    ]
  },
};

// Factores de desperdicio por categoría
export const DESPERDICIO = {
  piso: 1.07,         // +7%
  revestimiento: 1.10, // +10%
  pintura: 1.10,
  cielorraso: 1.05,
  cubierta: 1.08,
  default: 1.05,
};

// Estructura automática según tipo de obra
export const ESTRUCTURA_AUTO = {
  mamposteria: [
    { ref: '05.02', desc: 'Bases H°A° 60kg/m³',           coef: 0.10, unidad: 'm³' },
    { ref: '05.08', desc: 'Losa esp. 10cm',                coef: 0.10, unidad: 'm³' },
    { ref: '05.13', desc: 'Losa viguetas+ladrillo',        coef: 0.90, unidad: 'm²' },
    { ref: '05.14', desc: 'Vigas 160kg/m³',               coef: 0.06, unidad: 'm³' },
    { ref: '05.15', desc: 'Columnas 85kg/m³',             coef: 0.04, unidad: 'm³' },
    { ref: '07.19', desc: 'Mamp. ladrillo hueco 18x18x33', coef: 0.60, unidad: 'm²' },
    { ref: '07.17', desc: 'Mamp. ladrillo hueco 8x18x33',  coef: 0.35, unidad: 'm²' },
    { ref: '09.04', desc: 'Film polietileno bajo plateas',  coef: 0.95, unidad: 'm²' },
    { ref: '09.05', desc: 'Horiz. cementicia contrapisos', coef: 0.90, unidad: 'm²' },
    { ref: '15.01', desc: 'Contrapiso H° cascote 15cm',    coef: 0.90, unidad: 'm²' },
    { ref: '11.01', desc: 'Revoque grueso + fino',         coef: 2.20, unidad: 'm²' },
  ],
  steel_frame: [
    { ref: '05.03', desc: 'Platea fundación 15kg/m³',      coef: 0.12, unidad: 'm³' },
    { ref: '08.01', desc: 'Tabique simple 9.5cm',           coef: 1.80, unidad: 'm²' },
    { ref: '08.02', desc: 'Tabique c/aislación barras',     coef: 0.60, unidad: 'm²' },
    { ref: '08.08', desc: 'Panel OSB PUR/PIR aislación',    coef: 0.80, unidad: 'm²' },
    { ref: '09.04', desc: 'Film polietileno bajo plateas',  coef: 0.95, unidad: 'm²' },
    { ref: '15.01', desc: 'Contrapiso H° cascote 15cm',    coef: 0.90, unidad: 'm²' },
    { ref: '08.05', desc: 'Cielo raso suspendido',          coef: 0.90, unidad: 'm²' },
  ],
  haa: [
    { ref: '05.02', desc: 'Bases H°A° 60kg/m³',            coef: 0.12, unidad: 'm³' },
    { ref: '05.08', desc: 'Losa H°A° esp. 10cm',            coef: 0.12, unidad: 'm³' },
    { ref: '05.14', desc: 'Vigas 160kg/m³',                coef: 0.08, unidad: 'm³' },
    { ref: '05.15', desc: 'Columnas 85kg/m³',              coef: 0.05, unidad: 'm³' },
    { ref: '05.16', desc: 'Tabiques vistos 80kg/m³',        coef: 0.03, unidad: 'm³' },
    { ref: '09.04', desc: 'Film polietileno bajo plateas',  coef: 0.95, unidad: 'm²' },
    { ref: '09.05', desc: 'Horiz. cementicia contrapisos', coef: 0.90, unidad: 'm²' },
    { ref: '15.01', desc: 'Contrapiso H° cascote 15cm',    coef: 0.90, unidad: 'm²' },
    { ref: '11.01', desc: 'Revoque grueso + fino',         coef: 2.20, unidad: 'm²' },
  ],
};

// Precios MO por ID de ítem (referencia rápida)
export const PRECIO_MO = {
  '05.02': 1442925, '05.03': 766157, '05.08': 2471898, '05.09': 3345457,
  '05.13': 766175,  '05.14': 4130906,'05.15': 5600537, '05.16': 2666108,
  '07.17': 27135,   '07.19': 45404,  '08.01': 49822,   '08.02': 76527,
  '08.05': 42650,   '08.08': 183246, '09.04': 16310,   '09.05': 18488,
  '10.01': 253845,  '11.01': 46317,  '15.01': 79266,
};

// Precios Materiales estimados por ID ($ por unidad)
export const PRECIO_MAT = {
  '05.02': 32000,   '05.03': 28000,  '05.08': 45000,  '05.09': 48000,
  '05.13': 22000,   '05.14': 38000,  '05.15': 42000,  '05.16': 35000,
  '07.17': 8500,    '07.19': 16000,  '08.01': 12500,  '08.02': 18000,
  '08.05': 9800,    '08.08': 45000,  '09.04': 3800,   '09.05': 4200,
  '10.01': 95000,   '11.01': 5500,   '15.01': 12000,
};
