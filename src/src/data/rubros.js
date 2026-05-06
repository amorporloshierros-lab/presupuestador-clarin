// ══════════════════════════════════════════════════════════════
// BASE DE DATOS — ARQ CLARÍN MAYO 2026
// Fuente: ARQ_Clarin_Mayo2026_BaseDatos.xlsx
// 33 Rubros completos — precios en $ incluyen MO — sin IVA — CABA/GBA
// ══════════════════════════════════════════════════════════════

export const RUBROS = {

  '01': {
    nombre: 'TRABAJOS PRELIMINARES',
    items: [
      { id:'01.01', desc:'Limpieza y nivelación del terreno',    u:'m²',  precio:188887 },
      { id:'01.02', desc:'Obrador, depósito y sanitarios',       u:'m²',  precio:567117 },
    ]
  },

  '02': {
    nombre: 'PROCEDIMIENTOS Y CUMPLIMIENTOS',
    items: [
      { id:'02.01', desc:'Replanteo',                             u:'m²',  precio:6055   },
      { id:'02.02', desc:'Cartel de obra',                        u:'u',   precio:522638 },
      { id:'02.03', desc:'Cerco de obra',                         u:'ml',  precio:44826  },
      { id:'02.04', desc:'Luz y fuerza motriz',                   u:'mes', precio:77880  },
      { id:'02.05', desc:'Defensa para trabajo en obra',          u:'ml',  precio:424465 },
    ]
  },

  '03': {
    nombre: 'DEMOLICIONES',
    items: [
      { id:'03.01', desc:'Demolición de estructura de hormigón',  u:'m³',  precio:1610362, notas:'Incluye retiro' },
      { id:'03.02', desc:'Demolición de mampostería',             u:'m³',  precio:1392176, notas:'Incluye retiro' },
      { id:'03.03', desc:'Demolición capa de hormigón',           u:'m³',  precio:134738  },
      { id:'03.04', desc:'Demolición de contrapisos',             u:'m³',  precio:225240  },
      { id:'03.05', desc:'Picado de revoques',                    u:'m²',  precio:188027  },
      { id:'03.07', desc:'Demolición de obra completa',           u:'m²',  precio:2079584 },
      { id:'03.08', desc:'Volquete alquiler',                     u:'u',   precio:94800   },
    ]
  },

  '04': {
    nombre: 'MOVIMIENTO DE TIERRA',
    items: [
      { id:'04.01', desc:'Excavación manual de bases',                    u:'m³', precio:90886  },
      { id:'04.02', desc:'Excavación manual vigas de fundación',          u:'m³', precio:91033  },
      { id:'04.03', desc:'Pozo para pilotín diám. 20cm prof 1,50m',       u:'ml', precio:23508  },
      { id:'04.04', desc:'Excavación de sótanos a máquina',               u:'m³', precio:112898 },
      { id:'04.05', desc:'Relleno compacto',                              u:'m³', precio:548796 },
      { id:'04.06', desc:'Carga y retiro de tierra con camión',           u:'m³', precio:170887 },
    ]
  },

  '05': {
    nombre: 'ESTRUCTURA DE HORMIGÓN ARMADO',
    items: [
      { id:'05.01', desc:'Pilotín diámetro 20cm prof 1,50m',              u:'ml', precio:129424  },
      { id:'05.02', desc:'Bases cerámicas cuantía 60kg/m³',               u:'m³', precio:1442925 },
      { id:'05.03', desc:'Plateas de fundación 15kg/m³ de hierro',        u:'m³', precio:766157  },
      { id:'05.04', desc:'Vigas de fundación 60kg/m³',                    u:'m³', precio:1562386 },
      { id:'05.05', desc:'Zapata tabique de hormigón 80kg/m³',            u:'m³', precio:1525772 },
      { id:'05.06', desc:'Zapata de ladrillo para pared de 30cm',         u:'m²', precio:1235512 },
      { id:'05.07', desc:'Tabiques sótano una cara vista 80kg/m³',        u:'m³', precio:2275325 },
      { id:'05.08', desc:'Losas espesor 10cm',                            u:'m³', precio:2471898 },
      { id:'05.09', desc:'Losa H° a la vista encofrado fenólico',         u:'m³', precio:3345457 },
      { id:'05.10', desc:'Losas nervuradas 110kg/m³',                     u:'m³', precio:3936050 },
      { id:'05.11', desc:'Losa casetonada 70kg/m³',                       u:'m³', precio:2928448 },
      { id:'05.12', desc:'Losa pretensada 12cm con juntas',               u:'m²', precio:795689  },
      { id:'05.13', desc:'Losa viguetas y ladrillo con carpeta',          u:'m²', precio:766175  },
      { id:'05.14', desc:'Vigas 160kg/m³',                                u:'m³', precio:4130906 },
      { id:'05.15', desc:'Columnas 85kg/m³',                              u:'m³', precio:5600537 },
      { id:'05.16', desc:'Tabiques vistos 80kg/m³',                       u:'m³', precio:2666108 },
      { id:'05.17', desc:'Escaleras 75kg/m³',                             u:'m³', precio:3671290 },
      { id:'05.18', desc:'Tanque de bombeo 105kg/m³',                     u:'m³', precio:2500966 },
      { id:'05.19', desc:'Tanque de reserva 105kg/m³',                    u:'m³', precio:3465225 },
      { id:'05.20', desc:'Junta PVC para hormigón',                       u:'ml', precio:16511   },
    ]
  },

  '06': {
    nombre: 'ESTRUCTURAS METÁLICAS',
    items: [
      { id:'06.01', desc:'Estructuras metálicas — perfiles normales',     u:'kg', precio:9668  },
      { id:'06.02', desc:'Estructuras metálicas — perfiles ángulo',       u:'kg', precio:12150 },
      { id:'06.03', desc:'Estructuras metálicas — hierros redondo',       u:'kg', precio:7114  },
    ]
  },

  '07': {
    nombre: 'MAMPOSTERÍA',
    items: [
      { id:'07.01', desc:'Mampostería — bloques H° estándar 20x20x40',   u:'m²', precio:55691  },
      { id:'07.02', desc:'Mampostería — bloques 10x20x40',               u:'m²', precio:35082  },
      { id:'07.05', desc:'Ladrillos comunes espesor 30cm',               u:'ml', precio:450016 },
      { id:'07.06', desc:'Ladrillo vista 90cm c/tomado de junta',        u:'m³', precio:979844 },
      { id:'07.07', desc:'Ladrillo común 15cm',                          u:'ml', precio:384953 },
      { id:'07.08', desc:'Ladrillo vista 15cm c/tomado de junta',        u:'m³', precio:1060528},
      { id:'07.17', desc:'Ladrillo hueco 8x18x33',                       u:'m²', precio:27135  },
      { id:'07.19', desc:'Ladrillo hueco 18x18x33',                      u:'m²', precio:45404  },
      { id:'07.20', desc:'Ladrillo cerámico portante 12x19x33',          u:'m²', precio:36596  },
      { id:'07.22', desc:'Ladrillo cerámico con armadura',               u:'m²', precio:77906  },
    ]
  },

  '08': {
    nombre: 'CONSTRUCCIÓN EN SECO (STEEL FRAME / DURLOCK)',
    items: [
      { id:'08.01', desc:'Steel frame — tabique simple 9,5cm (placa 15mm)',      u:'m²', precio:49822,  notas:'Durlock' },
      { id:'08.02', desc:'Steel frame — ídem c/aislación barras de vidrio',      u:'m²', precio:76527  },
      { id:'08.03', desc:'Steel frame — medio tabique 8,5cm',                   u:'m²', precio:45984  },
      { id:'08.04', desc:'Steel frame — panel divisorio funcional',             u:'m²', precio:89666  },
      { id:'08.05', desc:'Steel frame — cielo raso suspendido junta tomada',    u:'m²', precio:42650  },
      { id:'08.06', desc:'Steel frame — ídem placa verde (húmedo)',             u:'m²', precio:50846  },
      { id:'08.07', desc:'Steel frame — cielo raso desmontable',               u:'m²', precio:32768  },
      { id:'08.08', desc:'Steel frame — panel OSB inyectado PUR/PIR',          u:'m²', precio:183246 },
    ]
  },

  '09': {
    nombre: 'AISLACIONES E IMPERMEABILIZACIONES',
    items: [
      { id:'09.01', desc:'Aislación de sótano cementicia',                      u:'m²', precio:54351  },
      { id:'09.02', desc:'Capa aisladora con tabique panderete',                u:'m²', precio:58933  },
      { id:'09.03', desc:'Horizontal doble en muros cajón',                     u:'m²', precio:19776  },
      { id:'09.04', desc:'Film de polietileno bajo plateas',                    u:'m²', precio:16310  },
      { id:'09.05', desc:'Horizontal cementicia contrapisos s/terreno',         u:'m²', precio:18488  },
      { id:'09.06', desc:'Horizontal sobre losa locales húmedos',               u:'m²', precio:34401  },
      { id:'09.07', desc:'Azotado hidrófugo bajo revestimientos',               u:'m²', precio:9773   },
      { id:'09.08', desc:'Vertical sobre muros',                                u:'m²', precio:18658  },
      { id:'09.09', desc:'Interior tanques de agua',                            u:'m²', precio:73873  },
    ]
  },

  '10': {
    nombre: 'CUBIERTAS Y TECHOS',
    items: [
      { id:'10.01', desc:'Cubierta — losa c/barrera vapor + membrana aluminio',  u:'m²', precio:253845  },
      { id:'10.02', desc:'Cubierta transitable con baldosas',                    u:'m²', precio:313211  },
      { id:'10.03', desc:'Teja francesa estructura madera vista',               u:'m²', precio:223056  },
      { id:'10.04', desc:'Teja francesa madera sin cepillar',                   u:'m²', precio:266689  },
      { id:'10.05', desc:'Chapa ondulada N24 estructura madera',                u:'m²', precio:94372   },
      { id:'10.06', desc:'Chapa prepintada',                                    u:'m²', precio:191986  },
      { id:'10.07', desc:'Chapa ambas caras c/aislación térmica',               u:'m²', precio:88260   },
      { id:'10.08', desc:'Teja colonial madera vista',                          u:'m²', precio:1369349 },
      { id:'10.09', desc:'Teja colonial madera sin cepillar',                   u:'m²', precio:1366135 },
      { id:'10.10', desc:'Chapa imitación tejas',                               u:'m²', precio:954216  },
      { id:'10.11', desc:'Junta de dilatación membrana asfáltica',              u:'ml', precio:52287   },
      { id:'10.12', desc:'Tinglado chapa galv. sobre viga spagueti',            u:'m²', precio:65473   },
    ]
  },

  '11': {
    nombre: 'REVOQUES',
    items: [
      { id:'11.01', desc:'Revoque grueso y fino a la cal al fieltro',            u:'m²', precio:46317,  notas:'Sin andamio' },
      { id:'11.02', desc:'Revoque grueso cal impermeable exterior',              u:'m²', precio:40382  },
      { id:'11.03', desc:'Revoque grueso bajo revestimientos',                  u:'m²', precio:29320  },
      { id:'11.04', desc:'Revoque proyectable exterior c/hidrófugo',            u:'m²', precio:229374 },
      { id:'11.05', desc:'Revoque proyectable grueso cal interior',             u:'m²', precio:199386 },
      { id:'11.06', desc:'Revoque proyectable fino cal interior',               u:'m²', precio:78133  },
      { id:'11.07', desc:'Revoque proyectable yeso interior engrosado',         u:'m²', precio:48306  },
      { id:'11.08', desc:'Salpicado con molinete',                              u:'m²', precio:19848  },
      { id:'11.09', desc:'Salpicado molinete exterior planchado',               u:'m²', precio:23323  },
      { id:'11.10', desc:'Revoque especial tipo super iggam',                   u:'m²', precio:71428  },
      { id:'11.11', desc:'Bufas para super iggam',                              u:'ml', precio:17278  },
    ]
  },

  '12': {
    nombre: 'REVESTIMIENTOS',
    items: [
      { id:'12.01', desc:'Revestimiento — cerámico 20x20 en pared',             u:'m²', precio:40855,  notas:'Incluye MO+adhesivo+juntas' },
      { id:'12.02', desc:'Revestimiento — mosaico veneciano',                   u:'m²', precio:178262 },
      { id:'12.03', desc:'Revestimiento — cerámica esmaltada 30x30 c/guardas', u:'m²', precio:82784  },
      { id:'12.04', desc:'Revestimiento — porcellanato 30x30 rústico',          u:'m²', precio:46640  },
      { id:'12.05', desc:'Revestimiento — tejuelas de ladrillo',                u:'m²', precio:135560 },
      { id:'12.06', desc:'Revestimiento — machiembrado madera pino 1/2"',       u:'m²', precio:81683  },
    ]
  },

  '13': {
    nombre: 'CIELO RASOS',
    items: [
      { id:'13.01', desc:'Cielo raso — aplicado a la cal fina frasada',         u:'m²', precio:46430  },
      { id:'13.02', desc:'Cielo raso — ídem al fieltro',                        u:'m²', precio:51037  },
      { id:'13.03', desc:'Cielo raso — suspendido cal armado en madera',        u:'m²', precio:118399 },
      { id:'13.04', desc:'Cielo raso — suspendido cal armado en hierro',        u:'m²', precio:152316 },
      { id:'13.05', desc:'Cielo raso — taparollos armado a la cal',             u:'m²', precio:86879  },
      { id:'13.06', desc:'Cielo raso — suspendido termoacústico',               u:'m²', precio:84499  },
      { id:'13.07', desc:'Cielo raso — suspendido con dorso de aluminio',       u:'m²', precio:66130  },
      { id:'13.08', desc:'Cielo raso — paneles aluminio microperforado',        u:'m²', precio:107344 },
    ]
  },

  '14': {
    nombre: 'YESERÍA',
    items: [
      { id:'14.01', desc:'Yesería — enlucido de yeso',                          u:'m²', precio:31923  },
      { id:'14.02', desc:'Yesería — enlucido yeso reforzado c/cemento',         u:'m²', precio:32973  },
      { id:'14.03', desc:'Yesería — enlucido yeso engrosado c/yeso gris',       u:'m²', precio:41679  },
      { id:'14.04', desc:'Yesería — guardacantones de yesero',                  u:'ml', precio:25908  },
      { id:'14.05', desc:'Yesería — fajas sobre revestimientos',                u:'ml', precio:47931  },
      { id:'14.07', desc:'Yesería — cielo raso aplicado al yeso',               u:'m²', precio:31921  },
      { id:'14.08', desc:'Yesería — cielo raso yeso armado estruc. madera',     u:'m²', precio:74954  },
      { id:'14.09', desc:'Yesería — cielo raso yeso estruc. de hierro',         u:'m²', precio:106954 },
      { id:'14.10', desc:'Yesería — taparollo de yeso armado',                  u:'ml', precio:74876  },
    ]
  },

  '15': {
    nombre: 'CONTRAPISOS',
    items: [
      { id:'15.01', desc:'Contrapiso H° de cascote armado 15cm s/terreno',     u:'m²', precio:79266  },
      { id:'15.02', desc:'Contrapiso H° de cascote sobre losa 7cm',            u:'m²', precio:34967  },
      { id:'15.03', desc:'Contrapiso H° sobre losa sanitario 25cm',            u:'m²', precio:121246 },
      { id:'15.04', desc:'Contrapiso mortero celular 7cm',                     u:'m²', precio:17643  },
    ]
  },

  '16': {
    nombre: 'CARPETAS',
    items: [
      { id:'16.01', desc:'Carpeta de concreto bajo solados',                    u:'m²', precio:22498 },
      { id:'16.02', desc:'Carpeta de mortero celular 2cm',                      u:'m²', precio:22006 },
      { id:'16.03', desc:'Carpeta clavadora para parquet',                      u:'m²', precio:30714 },
    ]
  },

  '17': {
    nombre: 'PISOS',
    items: [
      { id:'17.01', desc:'Piso — alisado cemento ferrocrementado 5cm',          u:'m²', precio:86288  },
      { id:'17.02', desc:'Piso — alisado cemento ferrocrementado 25cm',         u:'m²', precio:212906 },
      { id:'17.03', desc:'Piso — cemento alisado rodillado',                    u:'m²', precio:37852  },
      { id:'17.04', desc:'Piso — porcelanato opaco 30x30',                      u:'m²', precio:49491  },
      { id:'17.05', desc:'Piso — cerámico esmaltado 20x20',                     u:'m²', precio:74568  },
      { id:'17.06', desc:'Piso — baldosa azotea 30x30 junta ancha',             u:'m²', precio:78456  },
      { id:'17.07', desc:'Piso — baldosón vereda 60x40',                        u:'m²', precio:32939  },
      { id:'17.08', desc:'Piso — mosaico granítico 30x30 a la cal',             u:'m²', precio:100005 },
      { id:'17.09', desc:'Piso — pulido de mosaico granítico',                  u:'m²', precio:32068  },
      { id:'17.10', desc:'Piso — hormigón estampado',                           u:'m²', precio:92592  },
      { id:'17.11', desc:'Piso — baldosón cemento sobre discos plásticos',      u:'m²', precio:80141  },
    ]
  },

  '18': {
    nombre: 'PISOS ESPECIALES',
    items: [
      { id:'18.01', desc:'Piso especial — parquet eucaliptus c/cola adhesiva',          u:'m²', precio:79989  },
      { id:'18.02', desc:'Piso especial — parquet c/adhesivo epoxi bi-comp.',           u:'m²', precio:78642  },
      { id:'18.03', desc:'Piso especial — entablonado tarugado viradó/alfajías',        u:'m²', precio:235988 },
      { id:'18.04', desc:'Piso especial — pulido y plastificado pisos madera',          u:'m²', precio:238486 },
      { id:'18.05', desc:'Piso especial — piso de goma c/masa niveladora',              u:'m²', precio:85661  },
      { id:'18.06', desc:'Piso especial — alfombra de nylon pelo cortado',              u:'m²', precio:80240  },
      { id:'18.07', desc:'Piso especial — adoquines graníticos sobre arena',            u:'m²', precio:669082 },
      { id:'18.08', desc:'Piso especial — bloques intertrabados sobre arena',           u:'m²', precio:32402  },
      { id:'18.09', desc:'Piso especial — piso flotante de madera',                     u:'m²', precio:54318  },
    ]
  },

  '19': {
    nombre: 'ESCALERAS',
    items: [
      { id:'19.01', desc:'Escalera — carpeta de nivelación',                     u:'m²', precio:31051  },
      { id:'19.02', desc:'Escalera — alzada y pedada cemento alisado',           u:'m²', precio:48324  },
      { id:'19.03', desc:'Escalera — nariz metálica',                            u:'ml', precio:30934  },
      { id:'19.05', desc:'Escalera — alzada y pedada cerámica 20x20',            u:'m²', precio:117127 },
      { id:'19.06', desc:'Escalera — alzada y pedada granítica reconstituida',   u:'m²', precio:316548 },
    ]
  },

  '20': {
    nombre: 'ZÓCALOS',
    items: [
      { id:'20.01', desc:'Zócalo — cemento alisado',    u:'ml', precio:14902 },
      { id:'20.02', desc:'Zócalo — madera 1/2"x2" liso',u:'ml', precio:21923 },
      { id:'20.03', desc:'Zócalo — de cerámica',         u:'ml', precio:20803 },
      { id:'20.04', desc:'Zócalo — granítico',            u:'ml', precio:27097 },
    ]
  },

  '21': {
    nombre: 'MARMOLERÍA Y MESADAS',
    items: [
      { id:'21.01', desc:'Marmolería — mesada granito 60cm c/trasforo y pileta', u:'ml', precio:199685 },
      { id:'21.02', desc:'Marmolería — frentín mesada granito 20cm',             u:'ml', precio:54287  },
      { id:'21.03', desc:'Marmolería — respaldo granito 60cm',                   u:'ml', precio:123922 },
      { id:'21.04', desc:'Marmolería — piso mármoles granito gris',              u:'m²', precio:295663 },
      { id:'21.05', desc:'Marmolería — revestimiento mármoles granito gris',     u:'m²', precio:302413 },
      { id:'21.06', desc:'Marmolería — colocación de mesadas',                   u:'ml', precio:43413  },
      { id:'21.07', desc:'Marmolería — colocación revestimiento s/pared',        u:'ml', precio:106373 },
    ]
  },

  '22': {
    nombre: 'PINTURAS',
    items: [
      { id:'22.01', desc:'Pintura — látex sobre muros interiores',               u:'m²', precio:15120,  notas:'Fijador + 3 manos' },
      { id:'22.02', desc:'Pintura — látex sobre cielo rasos',                    u:'m²', precio:15600  },
      { id:'22.03', desc:'Pintura — látex acrílico exteriores c/andamio',        u:'m²', precio:45731  },
      { id:'22.04', desc:'Pintura — silicona sobre ladrillo visto c/andamio',    u:'m²', precio:23997  },
      { id:'22.05', desc:'Pintura — esmalte sint. carpinterías madera',          u:'m²', precio:46020  },
      { id:'22.06', desc:'Pintura — esmalte sint. carpinterías metálicas',       u:'m²', precio:27807  },
      { id:'22.07', desc:'Pintura — esmalte sint. estructuras metálicas',        u:'tn', precio:3014850 },
      { id:'22.08', desc:'Pintura — barniz poliuretánico (3 manos)',             u:'m²', precio:29686  },
      { id:'22.09', desc:'Pintura — impermeabilizante fibrado (2 manos)',         u:'m²', precio:7910   },
      { id:'22.10', desc:'Pintura — empapelado c/papel base',                    u:'m²', precio:19457  },
    ]
  },

  '23': {
    nombre: 'ARTEFACTOS SANITARIOS',
    items: [
      { id:'23.01', desc:'Artefactos sanitarios — colocación',  u:'u', precio:87085  },
      { id:'23.02', desc:'Artefactos sanitarios — accesorios',  u:'u', precio:17062  },
      { id:'23.03', desc:'Artefactos sanitarios — griferías',   u:'u', precio:91605  },
    ]
  },

  '24': {
    nombre: 'LIMPIEZA Y AYUDA DE GREMIOS',
    items: [
      { id:'24.01', desc:'Limpieza periódica',   u:'mes', precio:1494000 },
      { id:'24.02', desc:'Limpieza final',        u:'m²',  precio:6256   },
      { id:'24.03', desc:'Ayuda de gremios',      u:'m²',  precio:35268  },
    ]
  },

  '25': {
    nombre: 'CARPINTERÍAS METÁLICAS',
    items: [
      { id:'25.01', desc:'Carp. metálica — marco chapa y puerta doble',              u:'m²', precio:451104  },
      { id:'25.02', desc:'Carp. metálica — marco chapa muro 15cm',                  u:'m²', precio:51118   },
      { id:'25.03', desc:'Carp. metálica — marco chapa y puerta simple',             u:'m²', precio:353638  },
      { id:'25.04', desc:'Carp. metálica — marco placard con baulera 2x2m',          u:'m²', precio:196444  },
      { id:'25.06', desc:'Carp. metálica — baranda pasamanos y malla',              u:'ml', precio:136895  },
      { id:'25.07', desc:'Carp. metálica — baranda pasamanos y vidrio lam.',        u:'ml', precio:180720  },
      { id:'25.08', desc:'Carp. metálica — reja hierro redondo y planchuela',       u:'m²', precio:309151  },
      { id:'25.09', desc:'Carp. metálica — puerta doble chapa F60 Dl 16',          u:'u',  precio:4389475 },
      { id:'25.10', desc:'Carp. metálica — puerta doble chapa DDN 16',             u:'u',  precio:3648720 },
      { id:'25.13', desc:'Carp. metálica — escalera metálica c/guardarraíl',       u:'ml', precio:943545  },
      { id:'25.14', desc:'Carp. metálica — escalera metálica c/peldaños madera',   u:'ml', precio:891525  },
      { id:'25.15', desc:'Carp. metálica — pasamanos de hierro',                   u:'ml', precio:79330   },
    ]
  },

  '26': {
    nombre: 'CARPINTERÍAS DE MADERA',
    items: [
      { id:'26.01', desc:'Carp. madera — ventana 1,50 x 1,50',                      u:'m²', precio:277129, notas:'Sin vidrios' },
      { id:'26.02', desc:'Carp. madera — ventana vidrio repartido 1,50x1,50',       u:'m²', precio:390309 },
      { id:'26.03', desc:'Carp. madera — mueble de cocina bajo mesada',             u:'m²', precio:489054 },
      { id:'26.04', desc:'Carp. madera — alacena',                                  u:'m²', precio:503924 },
      { id:'26.06', desc:'Carp. madera — colocación muebles de cocina',             u:'ml', precio:64871  },
      { id:'26.07', desc:'Carp. madera — puerta de acceso cedro',                   u:'u',  precio:579360 },
      { id:'26.10', desc:'Carp. madera — pasamanos',                                u:'ml', precio:68524  },
      { id:'26.11', desc:'Carp. madera — escalera de madera con baranda',           u:'u',  precio:371757 },
      { id:'26.12', desc:'Carp. madera — puerta placa',                             u:'u',  precio:450957 },
    ]
  },

  '27': {
    nombre: 'CARPINTERÍAS DE ALUMINIO',
    items: [
      { id:'27.01', desc:'Carp. aluminio — premarco',                               u:'ml', precio:55905  },
      { id:'27.02', desc:'Carp. aluminio — ventana 1,50x1,50 hojas de abrir',      u:'m²', precio:186540 },
      { id:'27.03', desc:'Carp. aluminio — baranda',                                u:'m²', precio:106585 },
      { id:'27.04', desc:'Carp. aluminio — baranda vidrio laminado',                u:'m²', precio:209407 },
    ]
  },

  '28': {
    nombre: 'CRISTALES Y VIDRIOS',
    items: [
      { id:'28.01', desc:'Cristal — espejo float 6mm',           u:'m²', precio:81322  },
      { id:'28.02', desc:'Cristal — vidrio de 4mm',              u:'m²', precio:35429  },
      { id:'28.03', desc:'Cristal — vidrio de 6mm',              u:'m²', precio:70735  },
      { id:'28.04', desc:'Cristal — laminado de seguridad 3+3mm',u:'m²', precio:102368 },
    ]
  },

  '29': {
    nombre: 'INSTALACIÓN SANITARIA',
    items: [
      { id:'29.01', desc:'Inst. sanitaria — baño completo (incl. montante y bajada)', u:'gl', precio:8784902 },
      { id:'29.02', desc:'Inst. sanitaria — cocina y lavadero',                       u:'gl', precio:3098241 },
    ]
  },

  '30': {
    nombre: 'INSTALACIÓN CONTRA INCENDIO',
    items: [
      { id:'30.01', desc:'Inst. contra incendio — boca de incendio completa', u:'u', precio:963960 },
    ]
  },

  '31': {
    nombre: 'INSTALACIÓN DE GAS',
    items: [
      { id:'31.01', desc:'Inst. de gas — cocina y termotanque (hasta medidor)', u:'gl', precio:3302682 },
    ]
  },

  '32': {
    nombre: 'INSTALACIÓN CALEFACCIÓN',
    items: [
      { id:'32.01', desc:'Inst. calefacción — piso radiante c/conexiones caldera',  u:'m²', precio:56646  },
      { id:'32.02', desc:'Inst. calefacción — cañería y radiadores c/caldera',      u:'m²', precio:162025 },
    ]
  },

  '33': {
    nombre: 'INSTALACIÓN ELÉCTRICA',
    items: [
      { id:'33.01', desc:'Inst. eléctrica — iluminación y toma',                u:'u', precio:251463  },
      { id:'33.02', desc:'Inst. eléctrica — box de TE',                         u:'u', precio:112746  },
      { id:'33.03', desc:'Inst. eléctrica — box de TV',                         u:'u', precio:82458   },
      { id:'33.04', desc:'Inst. eléctrica — instalación de timbre',             u:'u', precio:504428  },
      { id:'33.05', desc:'Inst. eléctrica — pilar caja medición y jabalina',    u:'u', precio:351773  },
      { id:'33.06', desc:'Inst. eléctrica — tablero fuerza motriz ascensor',    u:'u', precio:946907  },
      { id:'33.07', desc:'Inst. eléctrica — tablero de bombas',                 u:'u', precio:719308  },
      { id:'33.08', desc:'Inst. eléctrica — instalación pararrayos 40mts',      u:'u', precio:1406833 },
      { id:'33.09', desc:'Inst. eléctrica — colocación de artefactos',          u:'u', precio:34397   },
    ]
  },

};

// Modelos de referencia (ARQ Clarín — 12 modelos)
export const MODELOS = [
  { n:1,  tipo:'vivienda_unifamiliar',  desc:'Vivienda unifamiliar — 3 dorm, estar, cocina, lavadero, baño, toilette y garage. 1 planta.',        costoM2:2805308,  varMes:0.0202, supRef:110.97  },
  { n:2,  tipo:'vivienda_country',      desc:'Vivienda country — 2 plantas. Cubierta chapa, paredes ladrillo hueco portante.',                    costoM2:2502717,  varMes:0.0195, supRef:182.80  },
  { n:3,  tipo:'vivienda_industrial',   desc:'Vivienda industrializada — Steel frame, placas cementícias y yeso.',                               costoM2:2385892,  varMes:0.0258, supRef:182.80  },
  { n:4,  tipo:'local_comercial',       desc:'Local comercial — planta libre, frente vidriado, sanitario, depósito.',                            costoM2:1950000,  varMes:0.0210, supRef:80.00   },
  { n:5,  tipo:'edificio_dptos',        desc:'Edificio de departamentos — PH + 4 pisos, ascensor, SUM.',                                         costoM2:3200000,  varMes:0.0195, supRef:600.00  },
  { n:6,  tipo:'oficinas',              desc:'Oficinas — planta libre c/divisiones steel frame, aire acondicionado, piso técnico.',               costoM2:2800000,  varMes:0.0220, supRef:300.00  },
  { n:7,  tipo:'nave_industrial',       desc:'Nave industrial — estructura metálica, chapa, portón seccional.',                                  costoM2:1200000,  varMes:0.0180, supRef:500.00  },
  { n:8,  tipo:'ampliacion',            desc:'Ampliación vivienda existente — 1 piso adicional, losa, mampostería, terminaciones completas.',     costoM2:2650000,  varMes:0.0202, supRef:50.00   },
  { n:9,  tipo:'reforma_integral',      desc:'Reforma integral vivienda — demolición, contrapisos, terminaciones, inst. sanitaria y eléctrica.',  costoM2:1800000,  varMes:0.0210, supRef:80.00   },
  { n:10, tipo:'pileta_piscina',        desc:'Pileta de hormigón armado — 8×4m, equipamiento, iluminación, terminación perimetral.',             costoM2:4500000,  varMes:0.0215, supRef:32.00   },
  { n:11, tipo:'vivienda_premium',      desc:'Vivienda premium — 4 dorm en suite, piso radiante, caldera, pileta, domótica.',                    costoM2:5800000,  varMes:0.0195, supRef:350.00  },
  { n:12, tipo:'galpón',                desc:'Galpón de almacenamiento — estructura metálica liviana, cerramiento chapa, solado.',               costoM2:850000,   varMes:0.0175, supRef:800.00  },
];
