/* Todo el contenido de la app vive aquí. Edita los textos sin tocar el resto del código. */

const VIDEO_NARRACION = "OPETqN20AN0";
const VIDEO_AUTOR = "rDyUHQ3DAQU";


/* Imágenes. Ninguna está hecha con IA.
   "local" es el archivo que tú subes a la carpeta img/. Si no existe, la app usa "remoto" (si lo hay);
   si tampoco carga, la imagen simplemente no se muestra. */
const IMAGENES = {
  autor: {
    local: "dostoievski.jpg",
    remoto: "https://commons.wikimedia.org/wiki/Special:FilePath/Vasily_Perov_-_%D0%9F%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82_%D0%A4.%D0%9C.%D0%94%D0%BE%D1%81%D1%82%D0%BE%D0%B5%D0%B2%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_-_Google_Art_Project.jpg?width=640",
    alt: "Retrato de Fiódor Dostoievski pintado por Vasili Perov en 1872",
    credito: "Vasili Perov, Retrato de F. M. Dostoievski (1872). Óleo sobre lienzo, Galería Tretiakov. Dominio público, vía Wikimedia Commons."
  },
  contexto: {
    local: "plaza-sennaya.jpg",
    alt: "Fotografía antigua de la plaza Sennaya, en San Petersburgo",
    credito: "Plaza Sennaya, San Petersburgo. Escribe aquí el autor, el año y la fuente de la foto que subas."
  },
  espacios: {
    local: "san-petersburgo.jpg",
    alt: "Vista de San Petersburgo en el siglo XIX",
    credito: "San Petersburgo en el siglo XIX. Escribe aquí el autor, el año y la fuente de la foto que subas."
  }
};

const SECCIONES = [
  { id: "personajes", titulo: "Personajes principales", resumen: "Quiénes mueven la historia y qué representa cada uno." },
  { id: "contexto", titulo: "Contexto histórico", resumen: "La Rusia de 1860 y cómo atraviesa toda la obra." },
  { id: "narracion", titulo: "Análisis narrativo", resumen: "Quién cuenta la historia y cómo lo hace." },
  { id: "conflictos", titulo: "Conflictos psicológicos", resumen: "Las luchas internas que sostienen la novela." },
  { id: "espacios", titulo: "Espacios de la obra", resumen: "Los lugares donde ocurre la historia y su peso simbólico." },
  { id: "frases", titulo: "Frases importantes", resumen: "Frases clave que puedes escuchar en audio." },
  { id: "autor", titulo: "Sobre el autor", resumen: "Dostoievski, su vida y lo que lo llevó a escribir." },
  { id: "quiz", titulo: "Quiz", resumen: "Comprueba lo que aprendiste con 10 preguntas." }
];

const PERSONAJES = [
  {
    nombre: "Rodión Raskólnikov",
    rol: "Protagonista",
    texto: "Joven estudiante de derecho, pobre y orgulloso, que abandonó la universidad por falta de dinero. Sostiene una teoría según la cual existen hombres extraordinarios con derecho a transgredir la moral si su fin lo justifica. Para probarse a sí mismo, asesina a una usurera. Después, la culpa, la fiebre y el aislamiento lo van quebrando hasta llevarlo a confesar."
  },
  {
    nombre: "Sonia Marmeládova",
    rol: "Guía moral y redención",
    texto: "Hija de Marmeládov. Se prostituye para sostener a su familia, pero conserva una fe profunda y una compasión enorme. Es la primera persona a quien Raskólnikov confiesa su crimen y quien lo acompaña hasta Siberia. Representa el sufrimiento aceptado como camino hacia la renovación."
  },
  {
    nombre: "Porfiri Petróvich",
    rol: "Juez de instrucción",
    texto: "Investigador astuto y paciente. No busca atrapar a Raskólnikov con pruebas, sino con su propia psicología: conversa, insinúa y deja que la culpa haga el trabajo. Conoce la teoría de Raskólnikov porque leyó su artículo."
  },
  {
    nombre: "Arkadi Svidrigáilov",
    rol: "Doble oscuro del protagonista",
    texto: "Antiguo patrón de Dunia, libertino y sin escrúpulos, sospechado de crímenes. Es lo que Raskólnikov podría llegar a ser si no encontrara redención: alguien para quien nada tiene límite y que termina vacío. Su final es el suicidio."
  },
  {
    nombre: "Dunia (Avdotia Románovna)",
    rol: "Hermana de Raskólnikov",
    texto: "Mujer íntegra y decidida. Acepta comprometerse con Luzhin para ayudar a su hermano, pero rompe el compromiso al descubrir su mezquindad. Su dignidad contrasta con el cálculo de los hombres que la rodean."
  },
  {
    nombre: "Pulqueria Aleksándrovna",
    rol: "Madre de Raskólnikov",
    texto: "Viuda que vive con sacrificio por sus hijos. Su amor ciego e idealizado pesa sobre Raskólnikov, que se siente en deuda con ella y, al mismo tiempo, incapaz de mirarla a los ojos."
  },
  {
    nombre: "Dmitri Razumijin",
    rol: "Amigo leal",
    texto: "Compañero de universidad de Raskólnikov. Pobre pero trabajador, generoso y optimista. Lo cuida durante la enfermedad y representa la vida sencilla, solidaria y sana que el protagonista rechaza."
  },
  {
    nombre: "Semión Marmeládov",
    rol: "Funcionario alcohólico",
    texto: "Padre de Sonia. Se hunde en la bebida y en la vergüenza, pero su confesión en la taberna es una de las escenas más conmovedoras de la obra. Muestra hasta dónde puede llevar la pobreza a una persona."
  },
  {
    nombre: "Aliona Ivánovna y Lizaveta",
    rol: "Las víctimas",
    texto: "Aliona es la usurera a la que Raskólnikov planea matar, considerada por él un \"piojo\" dañino. Lizaveta, su hermana, mansa y bondadosa, llega por sorpresa y también muere. Su muerte rompe la lógica de la teoría: ella era inocente."
  },
  {
    nombre: "Pyotr Petróvich Luzhin",
    rol: "Prometido de Dunia",
    texto: "Hombre acomodado que predica el egoísmo racional y el interés propio. Quiere una esposa agradecida y sumisa. Intenta incriminar a Sonia, y su plan fracasa. Es una caricatura de las ideas utilitaristas."
  }
];

const CONTEXTO = {
  intro: "Crimen y castigo se publicó por entregas en 1866 y transcurre en San Petersburgo en esos mismos años. No es una novela que \"use\" la época como fondo: las ideas, la pobreza y las tensiones sociales de la Rusia de entonces son lo que hace posible el crimen.",
  puntos: [
    {
      titulo: "Una Rusia en transición",
      texto: "Tras la abolición de la servidumbre en 1861, el zar Alejandro II impulsó reformas que trastocaron el orden social. Muchos antiguos siervos y pequeños nobles quedaron sin sustento y migraron a la ciudad. Raskólnikov es un producto de ese desarraigo."
    },
    {
      titulo: "Pobreza urbana",
      texto: "San Petersburgo aparece como una ciudad sucia, calurosa y superpoblada, con cuartos minúsculos, tabernas y prestamistas. La miseria empuja a Marmeládov a la bebida, a Sonia a la prostitución y a Raskólnikov a la desesperación. La pobreza no justifica el crimen, pero lo vuelve verosímil."
    },
    {
      titulo: "Nihilismo y utilitarismo",
      texto: "En los años sesenta circulaban ideas materialistas, utilitaristas y nihilistas entre los jóvenes intelectuales: la moral tradicional era vista como prejuicio, y lo útil como criterio. Dostoievski las pone a prueba: si se aplican hasta el final, ¿qué queda de la persona?"
    },
    {
      titulo: "La figura del hombre extraordinario",
      texto: "La admiración por figuras como Napoleón alimentaba la idea de que ciertos individuos están por encima de la ley común. Raskólnikov toma esa idea y la lleva a la práctica; la novela muestra su costo humano."
    },
    {
      titulo: "La fe ortodoxa",
      texto: "Frente al racionalismo, Dostoievski propone una respuesta cristiana ortodoxa: el sufrimiento como purificación y la humildad como salida. Por eso la redención llega por medio de Sonia, del Evangelio (la lectura de la resurrección de Lázaro) y de la confesión."
    }
  ]
};

const NARRACION = {
  intro: "La novela se cuenta en tercera persona, pero casi nunca nos aleja de la cabeza de Raskólnikov. Esa mezcla entre voz externa y mente del personaje es la clave de su efecto.",
  puntos: [
    {
      titulo: "Narrador omnisciente con foco en Raskólnikov",
      texto: "Un narrador en tercera persona sabe lo que ocurre y lo que piensan los personajes, pero la mayor parte del tiempo sigue de cerca al protagonista. Vemos la ciudad y a los demás a través de su fiebre, su desconfianza y sus obsesiones."
    },
    {
      titulo: "Estilo indirecto libre",
      texto: "Los pensamientos del protagonista se mezclan con la voz del narrador sin marcas claras. El lector siente que está dentro de su conciencia, con sus dudas y sus saltos."
    },
    {
      titulo: "Novela policial al revés",
      texto: "Sabemos desde el principio quién cometió el crimen. La tensión no está en descubrir al culpable, sino en ver cómo la conciencia, y no la policía, lo va cercando. El interés pasa del \"quién\" al \"por qué\" y al \"qué le hace esto a una persona\"."
    },
    {
      titulo: "Polifonía",
      texto: "El crítico Mijaíl Bajtín llamó así a la convivencia de voces e ideas que compiten sin que el autor las resuelva de inmediato. Raskólnikov, Sonia, Porfiri, Svidrigáilov y Luzhin defienden visiones distintas del mundo, y cada una tiene fuerza propia."
    },
    {
      titulo: "Tiempo y estructura",
      texto: "La acción principal ocurre en pocos días, con un ritmo intenso y casi claustrofóbico. Se organiza en seis partes y un epílogo, donde la historia se abre hacia la redención. Los sueños y delirios, como el del caballo maltratado, funcionan como espejos de su conflicto interno."
    }
  ]
};

const CONFLICTOS = [
  {
    titulo: "Teoría contra conciencia",
    texto: "Raskólnikov cree que puede ser un hombre \"extraordinario\" y actuar sin remordimiento. Pero su mente lo contradice: la enfermedad, las pesadillas y la paranoia aparecen apenas comete el crimen. La razón fría pierde frente a la conciencia moral."
  },
  {
    titulo: "Culpa y castigo interior",
    texto: "El verdadero castigo no es la cárcel, sino el tormento mental que empieza antes de la confesión. Raskólnikov se castiga solo, y el sufrimiento legal del epílogo resulta casi un alivio."
  },
  {
    titulo: "Orgullo contra humildad",
    texto: "Su soberbia intelectual lo separa de los demás. Solo cuando acepta que es una persona común, capaz de equivocarse, puede iniciar su cambio. Sonia representa esa humildad que él se resiste a aceptar."
  },
  {
    titulo: "Aislamiento contra comunidad",
    texto: "Tras el crimen, Raskólnikov se aleja de su familia, de su amigo y de todos. Siente que lo que hizo lo separa del resto de los seres humanos. Confesar es también volver a pertenecer."
  },
  {
    titulo: "Razón contra fe",
    texto: "La novela enfrenta el cálculo utilitario con la compasión y la fe. Raskólnikov duda entre ambas hasta el final, y la resolución se da más por el amor que por una demostración lógica."
  },
  {
    titulo: "Compasión contra frialdad",
    texto: "Raskólnikov ayuda a Marmeládov y a su familia con gestos generosos, y al mismo tiempo ha matado a dos mujeres. Esta contradicción muestra que no es un monstruo, sino alguien dividido entre un corazón sensible y una idea destructiva."
  },
  {
    titulo: "Pobreza y dignidad",
    texto: "Las condiciones materiales pesan sobre todos los personajes. La pregunta es hasta dónde justifican las decisiones, y la novela responde que explican, pero no absuelven."
  }
];

const ESPACIOS = [
  {
    titulo: "El cuarto de Raskólnikov",
    texto: "Una habitación diminuta bajo el techo, más parecida a un armario o a un ataúd que a un hogar. Es el lugar donde el protagonista se encierra con sus ideas. Su estrechez refleja el encierro mental."
  },
  {
    titulo: "La casa de la usurera",
    texto: "Escenario del crimen: un piso oscuro, con muebles viejos y olor a encierro. El acto ocurre en un espacio cerrado y silencioso, y después regresa en las pesadillas y en las visitas del protagonista."
  },
  {
    titulo: "Las calles y la Plaza Sennaya",
    texto: "Las calles calurosas, sucias y llenas de gente de San Petersburgo, con tabernas, mendigos y borrachos. Es el espacio de la miseria colectiva. Raskólnikov camina sin rumbo, y en la plaza, hacia el final, se arrodilla y besa la tierra por pedido de Sonia."
  },
  {
    titulo: "La taberna",
    texto: "Allí conoce a Marmeládov y escucha la conversación que alimenta su idea del crimen. Es un lugar de confesiones y de desahogo, donde la gente habla de lo que no se dice en otra parte."
  },
  {
    titulo: "El cuarto de Sonia",
    texto: "Una habitación irregular y pobre, alquilada a unos vecinos. Allí se leen los versículos de Lázaro y Raskólnikov confiesa. Aunque modesto, es un espacio de calor humano y de fe."
  },
  {
    titulo: "El puente y el río Neva",
    texto: "Lugares de paso y de crisis, donde los personajes se detienen a mirar el agua. Sugieren el abismo, la tentación del suicidio y el sentimiento de extrañeza ante la ciudad."
  },
  {
    titulo: "La comisaría",
    texto: "El lugar de las conversaciones con Porfiri y de la confesión formal. Es un espacio de poder, pero el verdadero interrogatorio sigue ocurriendo dentro de la cabeza del protagonista."
  },
  {
    titulo: "Siberia (el epílogo)",
    texto: "El presidio, a orillas de un río, en un paisaje abierto. Después de la ciudad cerrada y asfixiante, el espacio se ensancha, y con él la posibilidad de una vida nueva."
  }
];

/* Frases. Texto base: traducción al inglés de Constance Garnett (1914), de dominio público,
   disponible en Project Gutenberg (ebook 2554). "es" es la versión en español de esa traducción,
   hecha para esta app (no pertenece a ninguna edición publicada). "garnett" es el texto base citado.
   Cada frase tiene un audio en la carpeta /audio: reemplaza el archivo o cambia la ruta en "audio". */
const FUENTE_FRASES = "Traducción base: Constance Garnett (1914), dominio público, Project Gutenberg. Versión en español: propia, a partir de esa traducción.";

const FRASES = [
  {
    es: "El dolor y el sufrimiento son siempre inevitables para una inteligencia amplia y un corazón profundo.",
    garnett: "Pain and suffering are always inevitable for a large intelligence and a deep heart.",
    quien: "Raskólnikov, Parte III, cap. 5",
    sentido: "Resume la idea central: la conciencia profunda implica sufrir, y ese sufrimiento tiene valor moral.",
    audio: "frase-1.mp3"
  },
  {
    es: "No me incliné ante ti, me incliné ante todo el sufrimiento humano.",
    garnett: "I did not bow down to you, I bowed down to all the suffering of humanity.",
    quien: "Raskólnikov a Sonia, Parte IV, cap. 4",
    sentido: "El protagonista reconoce por primera vez el dolor ajeno: es el inicio de su cambio.",
    audio: "frase-2.mp3"
  },
  {
    es: "¿Entiende usted lo que significa no tener absolutamente adónde ir?",
    garnett: "Do you understand, sir, do you understand what it means when you have absolutely nowhere to turn?",
    quien: "Marmeládov, Parte I, cap. 2",
    sentido: "Denuncia la soledad y el abandono que genera la miseria.",
    audio: "frase-3.mp3"
  },
  {
    es: "¿No quedaría un pequeño crimen borrado por miles de buenas acciones?",
    garnett: "Would not one tiny crime be wiped out by thousands of good deeds?",
    quien: "Un estudiante en la taberna, Parte I, cap. 6",
    sentido: "El razonamiento utilitario que seduce a Raskólnikov y que la novela pone en cuestión.",
    audio: "frase-4.mp3"
  },
  {
    es: "Me aplasté a mí mismo de una vez por todas, para siempre.",
    garnett: "I crushed myself once for all, forever.",
    quien: "Raskólnikov",
    sentido: "Entiende que el crimen destruyó su propia humanidad antes que a la víctima.",
    audio: "frase-5.mp3"
  },
  {
    es: "El hombre lo tiene todo en las manos, y todo se le escapa entre los dedos por pura cobardía.",
    garnett: "Man has it all in his hands, and it all slips through his fingers from sheer cowardice.",
    quien: "Raskólnikov",
    sentido: "Una reflexión sobre el miedo como lo que impide actuar y decidir.",
    audio: "frase-6.mp3"
  },
  {
    es: "Porque el sufrimiento, Rodión Románovich, es algo grande.",
    garnett: "For suffering, Rodion Romanovitch, is a great thing.",
    quien: "Porfiri Petróvich, Parte VI, cap. 2",
    sentido: "Porfiri le propone aceptar su sufrimiento como camino hacia la redención.",
    audio: "frase-7.mp3"
  },
  {
    es: "Hay que romper lo que debe romperse de una vez por todas, y cargar con el sufrimiento.",
    garnett: "Break what must be broken, once for all, that's all, and take the suffering on oneself.",
    quien: "Raskólnikov",
    sentido: "Expresa la decisión de enfrentar las consecuencias en lugar de huir de ellas.",
    audio: "frase-8.mp3"
  }
];


const QUIZ = [
  { p: "¿En qué año se publicó por entregas Crimen y castigo?", o: ["1866", "1846", "1881", "1905"], c: 0,
    e: "Salió mes a mes en la revista El Mensajero Ruso durante 1866." },
  { p: "¿En qué ciudad transcurre la historia?", o: ["Moscú", "San Petersburgo", "Kiev", "Varsovia"], c: 1,
    e: "San Petersburgo, con sus barrios pobres como la zona de la plaza Sennaya." },
  { p: "¿Cuál es la situación de Raskólnikov al comienzo de la novela?", o: ["Es un noble terrateniente", "Es un militar retirado", "Es un exestudiante de derecho en la pobreza", "Es un juez joven"], c: 2,
    e: "Dejó la universidad por falta de dinero y vive en un cuarto minúsculo." },
  { p: "¿A quién planea asesinar Raskólnikov?", o: ["A un funcionario corrupto", "A una usurera", "A su casero", "A un banquero"], c: 1,
    e: "A Aliona Ivánovna. Lizaveta, su hermana, también muere al llegar por sorpresa." },
  { p: "¿Qué idea defiende Raskólnikov en su teoría?", o: ["Que todos los hombres son iguales ante la ley", "Que existen hombres extraordinarios con derecho a transgredir la moral", "Que el dinero corrompe a todos", "Que el crimen siempre se castiga"], c: 1,
    e: "Divide a las personas en ordinarias y extraordinarias, y se pregunta a cuál pertenece." },
  { p: "¿Quién es Sonia Marmeládova?", o: ["La hermana de Raskólnikov", "Una joven que se prostituye para mantener a su familia y lo guía hacia la redención", "La hija de la usurera", "La prometida de Razumijin"], c: 1,
    e: "Es hija de Marmeládov, y su fe y compasión son clave en el final." },
  { p: "¿Cuál es el cargo de Porfiri Petróvich?", o: ["Sacerdote", "Médico", "Juez de instrucción", "Director de la cárcel"], c: 2,
    e: "Investiga el caso y lo resuelve más con psicología que con pruebas." },
  { p: "¿Qué tipo de narrador tiene la novela?", o: ["Primera persona del protagonista", "Tercera persona, muy cercana a la mente de Raskólnikov", "Narrador-testigo que no conoce a los personajes", "Varias cartas entre personajes"], c: 1,
    e: "Es un narrador en tercera persona con foco casi constante en Raskólnikov." },
  { p: "¿Qué pasaje del Evangelio lee Sonia a Raskólnikov?", o: ["El sermón de la montaña", "La resurrección de Lázaro", "El diluvio", "La última cena"], c: 1,
    e: "La resurrección de Lázaro anticipa la renovación del protagonista." },
  { p: "¿Dónde cumple Raskólnikov su condena?", o: ["En una prisión de Moscú", "En Siberia", "En el Cáucaso", "En San Petersburgo"], c: 1,
    e: "En un presidio en Siberia, adonde Sonia lo acompaña." }
];

const AUTOR = {
  nombre: "Fiódor Mijáilovich Dostoievski",
  fechas: "Moscú, 1821 – San Petersburgo, 1881",
  parrafos: [
    "Nació en Moscú en una familia de clase media. Su padre era médico en un hospital para pobres, un ambiente que le dio desde niño contacto con el dolor y la miseria. Estudió ingeniería militar en San Petersburgo, pero su verdadera vocación era la literatura.",
    "Debutó en 1846 con Pobres gentes, que fue muy elogiada. Poco después se unió al círculo de Petrashevski, un grupo que discutía ideas socialistas. En 1849 fue arrestado y condenado a muerte; en el último momento, ya frente al pelotón, la pena fue conmutada. Pasó cuatro años en trabajos forzados en Siberia y luego sirvió como soldado.",
    "Esa experiencia lo cambió: conoció a criminales de todo tipo, se acercó a la fe y desconfió de las teorías abstractas sobre el ser humano. Sufría epilepsia, y arrastró durante años deudas y problemas económicos por el juego.",
    "Escribió Crimen y castigo en 1866, en medio de la presión de las deudas y de los plazos de la revista que lo publicaba por entregas. Lo impulsaron tres cosas: su experiencia en presidio, su rechazo a las ideas nihilistas y utilitaristas de su tiempo, y la convicción de que ninguna teoría puede justificar quitar una vida. Después escribió El idiota, Los demonios y Los hermanos Karamázov."
  ],
  motivos: [
    "Haber visto de cerca la cárcel, la pobreza y la culpa.",
    "Su debate con las ideas materialistas y utilitaristas de su tiempo.",
    "Su fe ortodoxa y su búsqueda de la redención por el sufrimiento.",
    "La necesidad económica: escribía por entregas y con deudas."
  ]
};
