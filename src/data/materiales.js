// ══════════════════════════════════════════════════════════════
// CATÁLOGO COMPLETO POR ZONA — Marcas reales GBA Norte · Mayo 2026
// Marcas disponibles en la zona: Ferrum, Roca, Porcelain, FV, Grohe, Sedal, Hidromet
// Precios materiales: base Clarín ARQ 15/04/2026 + corralones CABA/GBA
// ══════════════════════════════════════════════════════════════

// ── Inodoros disponibles en GBA Norte ────────────────────────
export const INODOROS = [
  { id: 'inod_ferrum_andina',  marca: 'Ferrum', linea: 'Andina',   desc: 'Ferrum Andina corto s/asiento',  precio_mat: 107165, bidet_precio: 165000 },
  { id: 'inod_ferrum_bari',    marca: 'Ferrum', linea: 'Bari',     desc: 'Ferrum Bari alargado s/asiento', precio_mat: 138000, bidet_precio: 178000 },
  { id: 'inod_roca_nexo',      marca: 'Roca',   linea: 'Nexo',     desc: 'Roca Nexo estándar piso',        precio_mat: 155000, bidet_precio: 220000 },
  { id: 'inod_roca_victoria',  marca: 'Roca',   linea: 'Victoria', desc: 'Roca Victoria piso',             precio_mat: 168000, bidet_precio: 215000 },
  { id: 'inod_roca_gap_sus',   marca: 'Roca',   linea: 'GAP',      desc: 'Roca GAP Suspendido',            precio_mat: 280000, bidet_precio: 0      },
  { id: 'inod_porcelain_std',  marca: 'Porcelain', linea: 'Standard', desc: 'Porcelain 665 s/asiento',    precio_mat: 95000,  bidet_precio: 155000 },
];

export const ASIENTOS_INODORO = [
  { id: 'asiento_plast', desc: 'Asiento plástico reforzado',    precio_mat: 27000 },
  { id: 'asiento_mad',   desc: 'Asiento madera laqueada',       precio_mat: 55000 },
];

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
        desperdicio: 0.07,
        opciones: [
          { id: "cer_2020",    marca: "San Lorenzo",    desc: "Cerámico esmaltado 20x20",         precio_mat: 15000, precio_mo: 74568 },
          { id: "cer_3030",    marca: "Alberdi",        desc: "Cerámico esmaltado 30x30",         precio_mat: 19000, precio_mo: 82784 },
          { id: "porc_rust",   marca: "San Lorenzo D.", desc: "Porcelanato rústico 50x60",        precio_mat: 23000, precio_mo: 49491 },
          { id: "porc_pul",    marca: "Portinari",      desc: "Porcelanato pulido 50x60",         precio_mat: 45000, precio_mo: 49491 },
          { id: "mos_ven",     marca: "Veneciano",      desc: "Mosaico veneciano mezcla",         precio_mat: 32000, precio_mo: 178262 },
        ]
      },
      {
        id: "revestimiento",
        nombre: "Revestimiento pared",
        unidad: "m²",
        tipo: "selector",
        desperdicio: 0.10,
        opciones: [
          { id: "rev_cer_2020", marca: "San Lorenzo",   desc: "Cerámico pared 20x20",             precio_mat: 15000, precio_mo: 40855 },
          { id: "rev_cer_3030", marca: "Cerro Negro",   desc: "Cerámico esmaltado 30x30",         precio_mat: 22000, precio_mo: 82784 },
          { id: "rev_porc",     marca: "Portinari",     desc: "Porcelanato pared 30x60",          precio_mat: 40000, precio_mo: 46640 },
          { id: "rev_mos",      marca: "Hidráulico",    desc: "Mosaico hidráulico clásico",       precio_mat: 38000, precio_mo: 135560 },
        ]
      },
      {
        id: "lavatorio",
        nombre: "Lavatorio",
        unidad: "u",
        tipo: "selector",
        opciones: [
          { id: "lav_ferrum_celta",  marca: "Ferrum",    desc: "Ferrum Celta Oval sin pie",        precio_mat: 104299, precio_mo: 87085 },
          { id: "lav_ferrum_varese", marca: "Ferrum",    desc: "Ferrum Varese con pedestal",       precio_mat: 128000, precio_mo: 87085 },
          { id: "lav_roca_merid",    marca: "Roca",      desc: "Roca Meridian sobre mesada",       precio_mat: 136998, precio_mo: 87085 },
          { id: "lav_roca_gap",      marca: "Roca",      desc: "Roca GAP 60cm suspendido",         precio_mat: 198000, precio_mo: 87085 },
          { id: "lav_porcel",        marca: "Porcelain", desc: "Porcelain 420 sobremesada",        precio_mat: 90000,  precio_mo: 87085 },
        ]
      },
      {
        id: "griferia_lav",
        nombre: "Grifería lavatorio",
        unidad: "u",
        tipo: "selector",
        opciones: [
          { id: "grif_hidromet",  marca: "Hidromet",    desc: "Hidromet monocomando cuello cigüeña",precio_mat: 320000, precio_mo: 91605 },
          { id: "grif_fv_nev",    marca: "FV",          desc: "FV Nevada monocomando",             precio_mat: 380000, precio_mo: 91605 },
          { id: "grif_sedal_h",   marca: "Sedal",       desc: "Sedal Hydros Zen monocomando",      precio_mat: 526237, precio_mo: 91605 },
          { id: "grif_sedal_a",   marca: "Sedal",       desc: "Sedal Allegro monocomando",         precio_mat: 850676, precio_mo: 91605 },
          { id: "grif_fv_tos",    marca: "FV",          desc: "FV Toscana monocomando",            precio_mat: 420000, precio_mo: 91605 },
          { id: "grif_grohe",     marca: "Grohe",       desc: "Grohe Eurosmart monocomando",       precio_mat: 680000, precio_mo: 91605 },
        ]
      },
      {
        id: "griferia_ducha",
        nombre: "Grifería ducha",
        unidad: "u",
        tipo: "selector",
        opciones: [
          { id: "duc_fv_syd",    marca: "FV",     desc: "FV Sydney ducha lluvia",            precio_mat: 340000, precio_mo: 91605 },
          { id: "duc_fv_bri",    marca: "FV",     desc: "FV Briggs lluvia monocomando",      precio_mat: 380000, precio_mo: 91605 },
          { id: "duc_sedal_h",   marca: "Sedal",  desc: "Sedal Hydros ducha",                precio_mat: 450000, precio_mo: 91605 },
          { id: "duc_grohe",     marca: "Grohe",  desc: "Grohe Vitalio Joy monocomando",     precio_mat: 750000, precio_mo: 91605 },
          { id: "duc_roca_l90",  marca: "Roca",   desc: "Roca L90 monocomando ducha",        precio_mat: 320000, precio_mo: 91605 },
        ]
      },
      {
        id: "cielorraso",
        nombre: "Cielorraso",
        unidad: "m²",
        tipo: "selector",
        desperdicio: 0.05,
        opciones: [
          { id: "yeso_aplic",   marca: "Yesería", desc: "Cielorraso aplicado a la cal",     precio_mat: 4200,  precio_mo: 46430 },
          { id: "durlock_susp", marca: "Durlock", desc: "Durlock suspendido junta tomada",  precio_mat: 22000, precio_mo: 42650 },
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
        desperdicio: 0.07,
        opciones: [
          { id: "parq_euca",    marca: "Eucaliptus",     desc: "Parquet eucaliptus cola adhesiva",  precio_mat: 28000, precio_mo: 79989 },
          { id: "piso_float",   marca: "Meister",        desc: "Piso flotante Meister AC4",         precio_mat: 35000, precio_mo: 54318 },
          { id: "piso_lvt",     marca: "LVT Click",      desc: "Vinílico LVT Click 4mm",            precio_mat: 22000, precio_mo: 85661 },
          { id: "porc_30",      marca: "Pamesa",         desc: "Porcelanato opaco 30x30",           precio_mat: 23000, precio_mo: 49491 },
          { id: "porc_lux",     marca: "Portinari",      desc: "Porcelanato polished 60x120",       precio_mat: 85000, precio_mo: 49491 },
          { id: "cem_ferro",    marca: "Ferrocrementado",desc: "Cemento alisado ferrocrementado",   precio_mat: 18000, precio_mo: 86288 },
          { id: "pinotea",      marca: "Pinotea",        desc: "Pinotea recuperada tarugada",       precio_mat: 42000, precio_mo: 235988 },
        ]
      },
      {
        id: "pintura",
        nombre: "Pintura paredes + cielorraso",
        unidad: "m²",
        tipo: "selector",
        desperdicio: 0.10,
        opciones: [
          { id: "lat_color",    marca: "Colorín",         desc: "Látex interior mate",              precio_mat: 3200, precio_mo: 15120 },
          { id: "lat_alba",     marca: "Alba",            desc: "Látex interior lavable",            precio_mat: 3800, precio_mo: 15120 },
          { id: "lat_sherwin",  marca: "Sherwin-Williams",desc: "Látex premium lavable",             precio_mat: 6200, precio_mo: 15120 },
          { id: "lat_sint",     marca: "Sinteplast",      desc: "Látex satinado",                    precio_mat: 5800, precio_mo: 15120 },
        ]
      },
      {
        id: "cielorraso",
        nombre: "Cielorraso",
        unidad: "m²",
        tipo: "selector",
        desperdicio: 0.05,
        opciones: [
          { id: "yeso_aplic",   marca: "Yesería", desc: "Cielorraso aplicado a la cal",     precio_mat: 4200,  precio_mo: 46430 },
          { id: "durlock_susp", marca: "Durlock", desc: "Durlock suspendido junta tomada",  precio_mat: 22000, precio_mo: 42650 },
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
        desperdicio: 0.07,
        opciones: [
          { id: "cer_3030",   marca: "Cañuelas",      desc: "Cerámico 30x30 esmaltado",          precio_mat: 18000, precio_mo: 82784 },
          { id: "porc_rust",  marca: "San Lorenzo D.",desc: "Porcelanato rústico 50x60",         precio_mat: 23000, precio_mo: 49491 },
          { id: "porc_pul",   marca: "Pamesa",        desc: "Porcelanato pulido 60x60",          precio_mat: 42000, precio_mo: 49491 },
          { id: "cem_ferro",  marca: "Ferrocrementado",desc: "Cemento ferrocrementado",          precio_mat: 18000, precio_mo: 86288 },
        ]
      },
      {
        id: "revestimiento",
        nombre: "Revestimiento pared",
        unidad: "m²",
        tipo: "selector",
        desperdicio: 0.10,
        opciones: [
          { id: "rev_cer",    marca: "San Lorenzo",   desc: "Cerámico 20x20 + guarda",           precio_mat: 16000, precio_mo: 40855 },
          { id: "rev_porc",   marca: "Portinari",     desc: "Porcelanato pared 30x60",           precio_mat: 42000, precio_mo: 46640 },
          { id: "tejuela",    marca: "Tejuela",       desc: "Tejuela ladrillo visto rústico",    precio_mat: 28000, precio_mo: 135560 },
        ]
      },
      {
        id: "pileta_coc",
        nombre: "Pileta de cocina",
        unidad: "u",
        tipo: "selector",
        opciones: [
          { id: "pil_ferrum_d", marca: "Ferrum",   desc: "Ferrum doble bacha Inox bajo mesada",  precio_mat: 160000, precio_mo: 87085 },
          { id: "pil_ferrum_s", marca: "Ferrum",   desc: "Ferrum simple Inox empotrar",          precio_mat: 125000, precio_mo: 87085 },
          { id: "pil_inox_p",   marca: "Inox 304", desc: "Inox 304 doble con escurridor premium",precio_mat: 245000, precio_mo: 87085 },
        ]
      },
      {
        id: "griferia",
        nombre: "Grifería cocina",
        unidad: "u",
        tipo: "selector",
        opciones: [
          { id: "grif_fv_sw",  marca: "FV",    desc: "FV Swing cuello de cisne monocomando", precio_mat: 285980, precio_mo: 91605 },
          { id: "grif_sed_sw", marca: "Sedal", desc: "Sedal Swing monocomando",              precio_mat: 285980, precio_mo: 91605 },
          { id: "grif_fv_2ll", marca: "FV",    desc: "FV dos llaves tradicional",            precio_mat: 145000, precio_mo: 91605 },
          { id: "grif_grohe",  marca: "Grohe", desc: "Grohe Eurosmart cuello cisne",         precio_mat: 580000, precio_mo: 91605 },
        ]
      },
      {
        id: "mesada",
        nombre: "Mesada",
        unidad: "ml",
        tipo: "selector",
        opciones: [
          { id: "mes_granito", marca: "Granito Gris Mara", desc: "Granito gris Mara 60cm",    precio_mat: 380000, precio_mo: 199685 },
          { id: "mes_marmol",  marca: "Mármol Carrara",    desc: "Mármol Carrara 60cm",       precio_mat: 650000, precio_mo: 199685 },
          { id: "mes_trav",    marca: "Travertino",        desc: "Travertino 60cm",            precio_mat: 480000, precio_mo: 199685 },
          { id: "mes_silest",  marca: "Silestone",         desc: "Silestone / Compac 60cm",   precio_mat: 550000, precio_mo: 199685 },
        ]
      },
      {
        id: "cielorraso",
        nombre: "Cielorraso",
        unidad: "m²",
        tipo: "selector",
        desperdicio: 0.05,
        opciones: [
          { id: "yeso_aplic",   marca: "Yesería", desc: "Cielorraso aplicado a la cal",     precio_mat: 4200,  precio_mo: 46430 },
          { id: "durlock_susp", marca: "Durlock", desc: "Durlock suspendido junta tomada",  precio_mat: 22000, precio_mo: 42650 },
        ]
      },
    ]
  },

  living: {
    nombre: "Living / Comedor",
    icon: "🛋️",
    categorias: [
      {
        id: "piso",
        nombre: "Piso",
        unidad: "m²",
        tipo: "selector",
        desperdicio: 0.07,
        opciones: [
          { id: "parq_euca",   marca: "Eucaliptus",      desc: "Parquet eucaliptus cola adhesiva",  precio_mat: 28000, precio_mo: 79989 },
          { id: "piso_float",  marca: "Meister",         desc: "Piso flotante Meister AC4",         precio_mat: 35000, precio_mo: 54318 },
          { id: "porc_60",     marca: "Portinari",       desc: "Porcelanato pulido 60x120",         precio_mat: 55000, precio_mo: 49491 },
          { id: "porc_30",     marca: "Pamesa",          desc: "Porcelanato opaco 30x60",           precio_mat: 28000, precio_mo: 49491 },
          { id: "cem_ferro",   marca: "Ferrocrementado", desc: "Cemento ferrocrementado",           precio_mat: 18000, precio_mo: 86288 },
          { id: "pinotea",     marca: "Pinotea",         desc: "Pinotea recuperada tarugada",       precio_mat: 42000, precio_mo: 235988 },
        ]
      },
      {
        id: "pintura",
        nombre: "Pintura paredes + cielorraso",
        unidad: "m²",
        tipo: "selector",
        desperdicio: 0.10,
        opciones: [
          { id: "lat_color",   marca: "Colorín",          desc: "Látex interior mate",              precio_mat: 3200, precio_mo: 15120 },
          { id: "lat_sherwin", marca: "Sherwin-Williams",  desc: "Látex premium lavable",            precio_mat: 6200, precio_mo: 15120 },
          { id: "microcemento",marca: "Mapei",             desc: "Microcemento Mapei 2mm",           precio_mat: 28000, precio_mo: 92592 },
        ]
      },
      {
        id: "cielorraso",
        nombre: "Cielorraso",
        unidad: "m²",
        tipo: "selector",
        desperdicio: 0.05,
        opciones: [
          { id: "yeso_aplic",   marca: "Yesería", desc: "Cielorraso aplicado a la cal",     precio_mat: 4200,  precio_mo: 46430 },
          { id: "durlock_susp", marca: "Durlock", desc: "Durlock suspendido junta tomada",  precio_mat: 22000, precio_mo: 42650 },
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
        desperdicio: 0.05,
        opciones: [
          { id: "cem_rod",    marca: "Cemento",        desc: "Cemento alisado rodillado",          precio_mat: 8000,  precio_mo: 37852 },
          { id: "cem_ferro",  marca: "Ferrocrementado",desc: "Ferrocrementado 5cm c/malla",        precio_mat: 18000, precio_mo: 86288 },
          { id: "cem_est",    marca: "Decorativo",     desc: "Hormigón estampado cuadrillé",       precio_mat: 35000, precio_mo: 92592 },
          { id: "baldoson",   marca: "Calcáreo",       desc: "Baldosón 60x40cm calzada",           precio_mat: 16000, precio_mo: 32939 },
        ]
      },
      {
        id: "porton",
        nombre: "Portón garaje",
        unidad: "u",
        tipo: "selector",
        opciones: [
          { id: "port_sec_m", marca: "Metálico",  desc: "Seccional manual 2.8×2.1m",            precio_mat: 850000, precio_mo: 180000 },
          { id: "port_sec_a", marca: "Motorizado",desc: "Seccional motorizado 2.8×2.1m",         precio_mat: 1400000, precio_mo: 180000 },
          { id: "port_lev",   marca: "Levadizo",  desc: "Levadizo motorizado 2.8×2.1m",          precio_mat: 1200000, precio_mo: 160000 },
        ]
      },
    ]
  },

  sala_maquinas: {
    nombre: "Sala de Máquinas",
    icon: "⚙️",
    categorias: [
      {
        id: "caldera",
        nombre: "Generación de calor",
        unidad: "u",
        tipo: "selector",
        opciones: [
          { id: "cald_solo",  marca: "Multical",  desc: "Caldera 25.000 kcal solo calefacción",  precio_mat: 1802559, precio_mo: 280000 },
          { id: "cald_combi", marca: "Beretta",   desc: "Caldera combi 25.000 kcal ACS+calef.",  precio_mat: 2377288, precio_mo: 280000 },
          { id: "termot",     marca: "Eléctrico", desc: "Termotanque eléctrico 80L",             precio_mat: 350000,  precio_mo: 120000 },
        ]
      },
      {
        id: "tanque",
        nombre: "Tanque de agua",
        unidad: "u",
        tipo: "selector",
        opciones: [
          { id: "tanq_inox",  marca: "Inox",      desc: "Tanque acero inox 1.000L",              precio_mat: 699944,  precio_mo: 150000 },
          { id: "tanq_plas",  marca: "Plastiform",desc: "Tanque plástico 1.000L",                precio_mat: 180000,  precio_mo: 120000 },
        ]
      },
      {
        id: "piso",
        nombre: "Piso",
        unidad: "m²",
        tipo: "selector",
        desperdicio: 0.05,
        opciones: [
          { id: "cem_rod",   marca: "Cemento",        desc: "Cemento alisado rodillado",          precio_mat: 8000,  precio_mo: 37852 },
          { id: "cem_ferro", marca: "Ferrocrementado",desc: "Ferrocrementado 5cm c/malla",        precio_mat: 18000, precio_mo: 86288 },
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
        nombre: "Tipo de pileta",
        unidad: "u",
        tipo: "selector",
        opciones: [
          { id: "pil_haa_4x8",   marca: "H°A° mosáico",    desc: "H°A° 4×8m revestida mosaico",      precio_mat: 8500000,  precio_mo: 4200000 },
          { id: "pil_haa_5x10",  marca: "H°A° mosáico",    desc: "H°A° 5×10m revestida mosaico",     precio_mat: 14000000, precio_mo: 6800000 },
          { id: "pil_pref_f",    marca: "Fibra pref.",      desc: "Prefabricada fibra vidrio 4×8m",   precio_mat: 6800000,  precio_mo: 1200000 },
          { id: "pil_horm",      marca: "Hormigón proj.",   desc: "Hormigón proyectado 4×8m",         precio_mat: 9200000,  precio_mo: 3800000 },
        ]
      },
      {
        id: "equipo",
        nombre: "Equipamiento hidráulico",
        unidad: "u",
        tipo: "selector",
        opciones: [
          { id: "eq_bas",   marca: "Básico",   desc: "Bomba Pentair + filtro + skimmer",           precio_mat: 950000,  precio_mo: 180000 },
          { id: "eq_comp",  marca: "Completo", desc: "Equipo completo + clorador sal",             precio_mat: 2200000, precio_mo: 280000 },
          { id: "eq_prem",  marca: "Premium",  desc: "Equipo premium Zodiac + automatización",     precio_mat: 4500000, precio_mo: 380000 },
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
        desperdicio: 0.05,
        opciones: [
          { id: "adoq_gran",  marca: "Granítico",   desc: "Adoquín granítico sobre arena",          precio_mat: 38000, precio_mo: 32402 },
          { id: "adoq_calc",  marca: "Calcáreo",    desc: "Adoquín calcáreo sobre arena",           precio_mat: 22000, precio_mo: 32402 },
          { id: "baldoson",   marca: "Calcáreo",    desc: "Baldosón 60×40 exterior",                precio_mat: 16000, precio_mo: 32939 },
          { id: "cesped",     marca: "Natural",     desc: "Césped natural sembrado + tierra negra", precio_mat: 12000, precio_mo: 8500 },
        ]
      },
      {
        id: "riego",
        nombre: "Sistema de riego",
        unidad: "u",
        tipo: "selector",
        opciones: [
          { id: "riego_man",  marca: "Manual",  desc: "Grifo jardín + manguera",                   precio_mat: 45000,  precio_mo: 35000 },
          { id: "riego_aut",  marca: "Hunter",  desc: "Automático Hunter 6 zonas completo",        precio_mat: 380000, precio_mo: 180000 },
          { id: "riego_got",  marca: "Goteo",   desc: "Sistema goteo por zona completo",           precio_mat: 220000, precio_mo: 120000 },
        ]
      },
    ]
  },

  camaras: {
    nombre: "Cámaras y Seguridad",
    icon: "📷",
    categorias: [
      {
        id: "camaras",
        nombre: "Sistema de cámaras",
        unidad: "u",
        tipo: "selector",
        opciones: [
          { id: "cam4_hd",   marca: "Hikvision", desc: "Kit 4 cámaras HD 1080p + DVR 1TB HDD",    precio_mat: 680000,  precio_mo: 250000 },
          { id: "cam8_hd",   marca: "Hikvision", desc: "Kit 8 cámaras HD 1080p + DVR 2TB HDD",    precio_mat: 1200000, precio_mo: 380000 },
          { id: "cam4_4k",   marca: "Dahua",     desc: "Kit 4 cámaras 4K + NVR IP 2TB",           precio_mat: 1800000, precio_mo: 280000 },
          { id: "cam8_4k",   marca: "Dahua",     desc: "Kit 8 cámaras 4K + NVR IP 4TB",           precio_mat: 2800000, precio_mo: 420000 },
        ]
      },
      {
        id: "alarma",
        nombre: "Sistema de alarma",
        unidad: "u",
        tipo: "selector",
        opciones: [
          { id: "alarm_dsc",  marca: "DSC",   desc: "Alarma DSC perimetral + sirena",             precio_mat: 280000, precio_mo: 120000 },
          { id: "alarm_mon",  marca: "DSC",   desc: "Alarma DSC + monitoreo 12 meses",            precio_mat: 480000, precio_mo: 180000 },
          { id: "alarm_ajax", marca: "Ajax",  desc: "Alarma Ajax SmartHome wifi/GSM",             precio_mat: 850000, precio_mo: 180000 },
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
        desperdicio: 0.08,
        opciones: [
          { id: "terr_mem",   marca: "Membrana", desc: "Terraza c/barrera vapor + membrana alum. 4mm", precio_mat: 95000,  precio_mo: 253845 },
          { id: "terr_trans", marca: "Transit.", desc: "Cubierta transitable baldosas + membrana",    precio_mat: 130000, precio_mo: 313211 },
          { id: "teja_franc", marca: "Teja fr.", desc: "Teja francesa + estructura madera vista",     precio_mat: 185000, precio_mo: 223056 },
          { id: "chapa_prep", marca: "Chapa",    desc: "Chapa prepintada c/aislación térmica",        precio_mat: 95000,  precio_mo: 191986 },
          { id: "chapa_sand", marca: "Sándwich", desc: "Chapa sándwich PIR/PUR c/aislación",         precio_mat: 165000, precio_mo: 88260 },
        ]
      },
    ]
  },
};

// ── Estructura automática por tipo ───────────────────────────
export const ESTRUCTURA_AUTO = {
  mamposteria: [
    { ref:'04.01', desc:'Excavación manual bases',             u:'m³', coef:0.05 },
    { ref:'05.02', desc:'Bases H°A° 60kg/m³',                 u:'m³', coef:0.10 },
    { ref:'05.13', desc:'Losa viguetas + ladrillo c/carpeta', u:'m²', coef:0.90 },
    { ref:'05.14', desc:'Vigas H°A° 160kg/m³',                u:'m³', coef:0.06 },
    { ref:'05.15', desc:'Columnas H°A° 85kg/m³',              u:'m³', coef:0.04 },
    { ref:'07.19', desc:'Mampostería ladrillo hueco 18x18x33', u:'m²', coef:0.60 },
    { ref:'07.17', desc:'Mampostería ladrillo hueco 8x18x33',  u:'m²', coef:0.35 },
    { ref:'09.04', desc:'Film polietileno bajo plateas',       u:'m²', coef:0.95 },
    { ref:'09.05', desc:'Capa aisladora horizontal contrapisos',u:'m²',coef:0.90 },
    { ref:'15.01', desc:'Contrapiso H° cascote 15cm s/terreno',u:'m²', coef:0.90 },
    { ref:'16.01', desc:'Carpeta concreto bajo solados',       u:'m²', coef:0.88 },
    { ref:'11.01', desc:'Revoque grueso + fino a la cal',      u:'m²', coef:2.20 },
    { ref:'11.07', desc:'Revoque proyectable yeso interior',   u:'m²', coef:1.80 },
  ],
  steel_frame: [
    { ref:'04.01', desc:'Excavación manual platea',            u:'m³', coef:0.04 },
    { ref:'05.03', desc:'Platea de fundación 15kg/m³',         u:'m³', coef:0.12 },
    { ref:'08.01', desc:'Tabique Durlock simple 9.5cm',        u:'m²', coef:1.80 },
    { ref:'08.02', desc:'Tabique Durlock c/aislación barras',  u:'m²', coef:0.60 },
    { ref:'08.08', desc:'Panel OSB inyectado PUR/PIR',         u:'m²', coef:0.80 },
    { ref:'09.04', desc:'Film polietileno bajo platea',        u:'m²', coef:0.95 },
    { ref:'15.01', desc:'Contrapiso H° cascote 15cm',          u:'m²', coef:0.90 },
    { ref:'16.01', desc:'Carpeta concreto bajo solados',       u:'m²', coef:0.88 },
    { ref:'08.05', desc:'Cielorraso suspendido junta tomada',  u:'m²', coef:0.90 },
  ],
  haa: [
    { ref:'04.01', desc:'Excavación manual bases',             u:'m³', coef:0.06 },
    { ref:'05.02', desc:'Bases H°A° 60kg/m³',                 u:'m³', coef:0.12 },
    { ref:'05.08', desc:'Losa H°A° 10cm',                     u:'m³', coef:0.12 },
    { ref:'05.14', desc:'Vigas H°A° 160kg/m³',                u:'m³', coef:0.08 },
    { ref:'05.15', desc:'Columnas H°A° 85kg/m³',              u:'m³', coef:0.05 },
    { ref:'05.16', desc:'Tabiques vistos 80kg/m³',             u:'m³', coef:0.03 },
    { ref:'09.04', desc:'Film polietileno bajo plateas',       u:'m²', coef:0.95 },
    { ref:'09.05', desc:'Capa aisladora horizontal',          u:'m²', coef:0.90 },
    { ref:'15.01', desc:'Contrapiso H° cascote 15cm',          u:'m²', coef:0.90 },
    { ref:'16.01', desc:'Carpeta concreto bajo solados',       u:'m²', coef:0.88 },
    { ref:'11.01', desc:'Revoque grueso + fino a la cal',      u:'m²', coef:2.20 },
    { ref:'11.07', desc:'Revoque proyectable yeso interior',   u:'m²', coef:1.80 },
  ],
};

// MO exactos del ARQ Clarín Mayo 2026 ($/unidad)
export const PRECIO_MO_CLARIN = {
  '04.01':90886,    '04.02':91033,
  '05.02':1442925,  '05.03':766157,   '05.08':2471898,  '05.13':766175,
  '05.14':4130906,  '05.15':5600537,  '05.16':2666108,
  '07.17':27135,    '07.19':45404,
  '08.01':49822,    '08.02':76527,    '08.05':42650,    '08.08':183246,
  '09.04':16310,    '09.05':18488,
  '10.01':253845,   '10.03':223056,   '10.07':88260,
  '11.01':46317,    '11.07':48306,
  '15.01':79266,    '16.01':22498,
  '23.01':87085,    '23.02':17062,    '23.03':91605,
  '24.02':6256,     '24.03':35268,
};

// Precios materiales (corralones CABA — precio promedio)
export const PRECIO_MAT_CLARIN = {
  '04.01':0,
  '05.02':32000,  '05.03':28000,   '05.08':45000,   '05.13':22000,
  '05.14':38000,  '05.15':42000,   '05.16':35000,
  '07.17':8500,   '07.19':16000,
  '08.01':12500,  '08.02':18000,   '08.05':9800,    '08.08':45000,
  '09.04':3800,   '09.05':4200,
  '10.01':95000,  '10.03':185000,  '10.07':165000,
  '11.01':5500,   '11.07':4800,
  '15.01':12000,  '16.01':4500,
};

// ── Plomería por unidad (precios de lista corralones) ─────────
export const PLOMERIA = {
  // Desagüe cloacal
  'pvc_110_2m': { desc:'Caño PVC 110mm × 2m',             unidad:'u',  precio: 21015 },
  'pvc_063_2m': { desc:'Caño PVC 63mm × 2m',              unidad:'u',  precio: 12000 },
  'codo_pvc90_110': { desc:'Codo PVC 90° 110mm',          unidad:'u',  precio: 4500  },
  'tee_pvc_110': { desc:'Tee PVC 110mm',                  unidad:'u',  precio: 5800  },
  'pvc_50_2m': { desc:'Caño PVC 50mm × 2m (ventilación)', unidad:'u',  precio: 8000  },
  // Agua fría/caliente (termofusible)
  'tf_25_4m': { desc:'Caño termofusible 25mm × 4m',       unidad:'u',  precio: 42000 },
  'tf_20_4m': { desc:'Caño termofusible 20mm × 4m',       unidad:'u',  precio: 30854 },
  'codo_tf_20': { desc:'Codo 90° termofusible 20mm',      unidad:'u',  precio: 850   },
  'codo_tf_25': { desc:'Codo 90° termofusible 25mm',      unidad:'u',  precio: 1200  },
  'tee_tf_20': { desc:'Tee termofusible 20mm',             unidad:'u',  precio: 1400  },
  // Conexiones
  'flexible_12': { desc:'Flexible acero mallado 1/2" × 30cm', unidad:'u', precio: 3850 },
  'teflon': { desc:'Teflón (rollo)',                       unidad:'u',  precio: 2500  },
  'sellarosca': { desc:'Sellarosca (pomo)',                unidad:'u',  precio: 6500  },
  'llave_12': { desc:'Llave de paso esférica 1/2"',       unidad:'u',  precio: 12500 },
  'llave_34': { desc:'Llave de paso esférica 3/4"',       unidad:'u',  precio: 18500 },
};

// ── Electricidad por unidad ───────────────────────────────────
export const ELECTRICIDAD = {
  'cano_38': { desc:'Caño acero liviano 3/8" × 3m',      unidad:'u',  precio: 5850  }, // ~1,950/ml × 3
  'cano_1p': { desc:'Caño acero liviano 1" × 3m',        unidad:'u',  precio: 9300  }, // ~3,100/ml × 3
  'cable_25_100': { desc:'Cable cobre 2.5mm² × 100m',    unidad:'u',  precio: 86925 },
  'cable_4_100': { desc:'Cable cobre 4mm² × 100m',       unidad:'u',  precio: 116415},
  'termica_25': { desc:'Llave térmica 2×25A',             unidad:'u',  precio: 16052 },
  'termica_40': { desc:'Llave térmica 2×40A',             unidad:'u',  precio: 28500 },
  'diferencial_40': { desc:'Interruptor diferencial 2×40A',unidad:'u', precio: 30992 },
  'tablero_12': { desc:'Tablero 12 circuitos c/barra tierra',unidad:'u',precio: 85000 },
  'tablero_24': { desc:'Tablero 24 circuitos c/barra tierra',unidad:'u',precio: 145000},
};
