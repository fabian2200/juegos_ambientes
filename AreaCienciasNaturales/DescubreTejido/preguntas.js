let Preguntas = [
  {
    numb: 1,
    question:
      "Es un tejido formado por células muertas, debido al enorme engrosamiento de sus paredes celulares que las asfixia hasta su muerte.",
    options: ["Esclerénquima", "Colénquima", "Epidermis", "Parénquima"],
    answer: "Esclerénquima",
    img: "Esclerénquima.png",
  },
  {
    numb: 2,
    question:
      "Es un tejido de células vivas poco diferenciadas. Responsable de brindar soporte a tallos jóvenes o herbáceos, hojas y pedúnculos florales.",
    options: ["Colénquima", "Esclerénquima", "Floema", "Parénquima"],
    answer: "Colénquima",
    img: "Colénquima.png",
  },
  {
    numb: 3,
    question:
      "Se halla exclusivamente en partes jóvenes de la planta. Se encuentra formado por células vivas incoloras de formas variables y dispuestas en una sola capa.",
    options: ["Floema", "Colénquima", "Epidermis", "Muscular Esquelético"],
    answer: "Epidermis",
    img: "Epidermis.png",
  },
  {
    numb: 4,
    question:
      "Es el tejido vegetal más abundante. Forma el relleno del cuerpo de una planta y por ello, realiza muchas funciones (fotosíntesis, almacenamiento, secreción, etc).",
    options: ["Esclerénquima", "Colénquima", "Epidermis", "Parénquima"],
    answer: "Parénquima",
    img: "Parénquima.png",
  },
  {
    numb: 5,
    question:
      "Es un tejido formado por células muertas. Las células son tubulares y poseen una pared celular bien desarrollada. Se unen unas a otras formando tubos que ascienden desde la raíz hacia la parte superior.",
    options: ["Esclerénquima", "Xilema", "Epidermis", "Muscular Liso"],
    answer: "Xilema",
    img: "Xilema.png",
  },
  {
    numb: 6,
    question:
      "Es un tejido formado por células vivas que transportan la savia elaborada. Los vasos están formados por células que presentan tabiques de separación entre ellas. Estos tabiques forman una estructura llamada placa cribosa.",
    options: ["Floema", "Colénquima", "Epidermis", "Xilema"],
    answer: "Floema",
    img: "Floema.png",
  },
  {
    numb: 7,
    question:
      "Se encuentra insertado en cartílagos que constituye la porción serosa de los miembros y las paredes del cuerpo.",
    options: ["Esclerénquima", "Muscular Esquelético", "Epidermis", "Muscular Liso"],
    answer: "Muscular Esquelético",
    img: "Muscular_Esqueletico.png",
  },
  {
    numb: 8,
    question:
      " Formado por células alargadas y mononucleadas, al microscopio no se ven bandas claras y oscuras. Se encuentra en las paredes de las vísceras huecas y en la mayor parte de los vasos sanguíneos.",
    options: ["Esclerénquima", "Colénquima", "uscular Liso", "Muscular Liso"],
    answer: "Muscular Liso",
    img: "Muscular_Liso.png",
  },
  {
    numb: 9,
    question:
      "Sus células son cortas, ramificadas y con un solo núcleo. Se forma en las paredes del corazón y se encuentra en las paredes de los vasos sanguíneos principales del cuerpo.",
    options: ["Muscular Liso", "Colénquima", "Epidermis", "Muscular Cardiaco"],
    answer: "Muscular Cardiaco",
    img: "Muscular_Cardiaco.png",
  },
  {
    numb: 10,
    question:
      "Está compuesto principalmente por sustancia fundamental y relativamente poco componente fibroso. Es el tipo de tejido conectivo más abundante en la mayoría de vertebrados.",
    options: ["Tejido Conectivo Denso Irregular", "Colénquima", "Tejido Conjutivo Laxo", "Muscular Cardiaco"],
    answer: "Tejido Conjutivo Laxo",
    img: "Tejido_Conjutivo_Laxo.png",
  },
  {
    numb: 11,
    question:
      "Es el tejido conectivo con fibras de colágeno paralelas típico de tendones, ligamentos y aponeurosis.",
    options: ["Tejido Conjuntivo Elástico", "Tejido Conectivo Denso Regular", "Epidermis", "Esclerénquima"],
    answer: "Tejido Conectivo Denso Regular",
    img: "Tejido_Conectivo_Denso_Regular.png",
  },
  {
    numb: 12,
    question:
      "En este tipo de tejido conectivo denso, las fibras de colágeno aparecen con una distribución aleatoria.",
    options: ["Tejido Conectivo Denso Irregular", "Colénquima", "Epidermis", "Muscular Cardiaco"],
    answer: "Tejido Conectivo Denso Irregular",
    img: "Tejido_Conectivo_Denso_Irregular.png",
  },
  {
    numb: 13,
    question:
      "Es un tejido rico en fibras elásticas ramificadas ordenándose de forma paralela unas a otras",
    options: ["Esclerénquima", "Tejido Conjuntivo Elástico", "Tejido Conectivo Denso Irregular", "Tejido Óseo"],
    answer: "Tejido Conjuntivo Elástico",
    img: "Tejido_Conjuntivo_Elástico.png",
  },
  {
    numb: 14,
    question:
      "Similar al tejido conjuntivo laxo, pero con menos fibras. Sus células características, denominadas adipocitos, se especializan en el almacenamiento de lípidos",
    options: ["Tejido Conectivo Denso Irregular", "Tejido Adiposo", "Epidermis", "Muscular Cardiaco"],
    answer: "Tejido Adiposo",
    img: "Tejido_Adiposo.png",
  },
  {
    numb: 13,
    question:
      "Formado por una matriz muy rica en fibras de colágena y elastina, gelatinosa pero muchas más consistentes que el tejido conjuntivo y con unas células específicas denominadas condrocitos",
    options: ["Tejido Cartilaginoso", "Tejido Conjuntivo Elástico", "Tejido Óseo", "Tejido Sanguíneo"],
    answer: "Tejido Cartilaginoso",
    img: "Tejido_Cartilaginoso.png",
  },
  {
    numb: 13,
    question:
      "Formado por tres tipos de células: osteoblastos, osteocitos y osteoclastos",
    options: ["Muscular Cardiaco", "Tejido Óseo", "Tejido Conjutivo Laxo", "Tejido Cartilaginoso"],
    answer: "Tejido Óseo",
    img: "Tejido_oseo.png",
  },
  {
    numb: 13,
    question:
      "Es un tejido conectivo cuya sustancia intercelular es líquida.",
    options: ["Tejido Adiposo", "Tejido Sanguíneo", "Epidermis", "Muscular Cardiaco"],
    answer: "Tejido Sanguíneo",
    img: "Tejido_Sanguíneo.png",
  },
];


