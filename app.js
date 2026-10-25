(function () {
  "use strict";

  var app = document.getElementById("app");
  var topbar = document.getElementById("topbar");

  /* ---------- Utilidades ---------- */

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function volver() {
    return '<div class="pie-nav"><a class="btn secundario" href="#/menu">Volver al menú principal</a></div>';
  }

  function encabezado(titulo, intro) {
    return "<h1>" + esc(titulo) + "</h1>" + (intro ? '<p class="intro">' + esc(intro) + "</p>" : "");
  }

  function video(id, titulo) {
    return (
      '<div class="video">' +
      '<iframe src="https://www.youtube.com/embed/' + esc(id) + '" title="' + esc(titulo) + '" ' +
      'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ' +
      'referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe>' +
      "</div>"
    );
  }

  function listaItems(arr) {
    return arr
      .map(function (p) {
        return '<article class="item"><h2>' + esc(p.titulo) + "</h2><p>" + esc(p.texto) + "</p></article>";
      })
      .join("");
  }

  /* Imagen con respaldo: usa el archivo local; si no existe, prueba el remoto; si falla, se oculta. */
  function imagen(clave) {
    var d = IMAGENES[clave];
    if (!d) return "";
    return (
      '<figure class="foto">' +
      '<img src="' + esc(d.local) + '"' + (d.remoto ? ' data-respaldo="' + esc(d.remoto) + '"' : "") +
      ' alt="' + esc(d.alt) + '" loading="lazy">' +
      "<figcaption>" + esc(d.credito) + "</figcaption>" +
      "</figure>"
    );
  }

  /* El evento "error" de las imágenes no burbujea, por eso se escucha en la fase de captura. */
  app.addEventListener("error", function (e) {
    var img = e.target;
    if (!img || img.tagName !== "IMG") return;
    var respaldo = img.getAttribute("data-respaldo");
    if (respaldo) {
      img.removeAttribute("data-respaldo");
      img.src = respaldo;
    } else if (img.parentNode) {
      img.parentNode.hidden = true;
    }
  }, true);

  /* ---------- Audio de frases ---------- */

  var audioActual = null;
  var botonActual = null;

  function detenerAudio() {
    if (audioActual) {
      audioActual.pause();
      audioActual.currentTime = 0;
    }
    if (botonActual) {
      botonActual.setAttribute("aria-pressed", "false");
      botonActual.textContent = "Escuchar frase";
    }
    audioActual = null;
    botonActual = null;
  }

  function alternarAudio(boton) {
    var estado = boton.parentNode.querySelector(".estado");
    var ruta = boton.getAttribute("data-audio");

    if (botonActual === boton) {
      detenerAudio();
      return;
    }

    detenerAudio();
    estado.textContent = "";
    estado.classList.remove("error");

    var a = new Audio(ruta);
    a.addEventListener("ended", function () {
      if (audioActual === a) detenerAudio();
    });
    a.addEventListener("error", function () {
      /* Solo reacciona si este audio sigue siendo el activo (evita cortar otro que ya empezó) */
      if (audioActual !== a) return;
      detenerAudio();
      estado.classList.add("error");
      estado.textContent = "Este audio aún no está cargado. Sube el archivo " + ruta + " al repositorio de GitHub.";
    });

    audioActual = a;
    botonActual = boton;
    boton.setAttribute("aria-pressed", "true");
    boton.textContent = "Detener";

    var p = a.play();
    if (p && p.catch) {
      p.catch(function () { /* el evento "error" ya informa si falta el archivo */ });
    }
  }

  /* ---------- Quiz ---------- */

  var quiz = null;

  function mezclar(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function iniciarQuiz() {
    quiz = {
      preguntas: mezclar(QUIZ).map(function (q) {
        var opciones = q.o.map(function (texto, i) { return { texto: texto, ok: i === q.c }; });
        return { p: q.p, e: q.e, o: mezclar(opciones) };
      }),
      i: 0,
      puntos: 0,
      respondida: false
    };
  }

  function pintarQuiz() {
    var cont = document.getElementById("quiz-area");
    if (!cont) return;

    if (quiz.i >= quiz.preguntas.length) {
      var total = quiz.preguntas.length;
      var msg = quiz.puntos === total ? "Respuestas perfectas."
        : quiz.puntos >= total * 0.7 ? "Muy buen resultado."
        : "Repasa las secciones y vuelve a intentarlo.";
      cont.innerHTML =
        '<div class="item"><h2>Resultado: ' + quiz.puntos + " de " + total + "</h2><p>" + msg + "</p>" +
        '<button type="button" class="btn" data-quiz="reiniciar">Repetir el quiz</button></div>';
      return;
    }

    var q = quiz.preguntas[quiz.i];
    var opciones = q.o.map(function (o, k) {
      return '<li><button type="button" class="opcion" data-quiz="resp" data-k="' + k + '">' + esc(o.texto) + "</button></li>";
    }).join("");

    cont.innerHTML =
      '<p class="progreso">Pregunta ' + (quiz.i + 1) + " de " + quiz.preguntas.length + "</p>" +
      '<h2 class="pregunta" id="pregunta-actual">' + esc(q.p) + "</h2>" +
      '<ul class="opciones" aria-labelledby="pregunta-actual">' + opciones + "</ul>" +
      '<div class="respuesta" role="status" aria-live="polite"></div>';
  }

  function responder(k) {
    if (quiz.respondida) return;
    quiz.respondida = true;
    var q = quiz.preguntas[quiz.i];
    var botones = app.querySelectorAll(".opcion");
    var acierto = q.o[k].ok;
    if (acierto) quiz.puntos++;

    Array.prototype.forEach.call(botones, function (b, idx) {
      b.disabled = true;
      if (q.o[idx].ok) b.classList.add("correcta");
      else if (idx === k) b.classList.add("incorrecta");
    });

    var ultima = quiz.i === quiz.preguntas.length - 1;
    app.querySelector(".respuesta").innerHTML =
      "<p><strong>" + (acierto ? "Correcto." : "No es esa.") + "</strong> " + esc(q.e) + "</p>" +
      '<button type="button" class="btn" data-quiz="siguiente">' + (ultima ? "Ver resultado" : "Siguiente pregunta") + "</button>";
    var sig = app.querySelector('[data-quiz="siguiente"]');
    if (sig) sig.focus();
  }

  /* ---------- Vistas ---------- */

  var vistas = {
    inicio: function () {
      return (
        '<section class="hero">' +
        "<h1>Crimen y castigo</h1>" +
        '<p class="autor">Fiódor Dostoievski, 1866</p>' +
        '<p class="lema">Un joven cree que puede cruzar la línea de la moral por una buena razón. ' +
        "Esta guía recorre sus personajes, su época, su forma de contar y las ideas que la sostienen.</p>" +
        '<a class="btn" href="#/menu">Entrar a la guía</a>' +
        "</section>"
      );
    },

    menu: function () {
      var tarjetas = SECCIONES.map(function (s) {
        return '<li><a href="#/' + s.id + '"><h2>' + esc(s.titulo) + "</h2><p>" + esc(s.resumen) + "</p></a></li>";
      }).join("");
      return (
        '<div class="page">' +
        encabezado("Menú principal", "Elige un tema para explorar la novela.") +
        '<ul class="menu-grid">' + tarjetas + "</ul>" +
        "</div>"
      );
    },

    personajes: function () {
      var html = PERSONAJES.map(function (p) {
        return '<article class="item"><h2>' + esc(p.nombre) + '</h2><p class="rol">' + esc(p.rol) + "</p><p>" + esc(p.texto) + "</p></article>";
      }).join("");
      return '<div class="page">' + encabezado("Personajes principales", "Cada personaje encarna una postura frente al crimen, la culpa y la fe.") + html + volver() + "</div>";
    },

    contexto: function () {
      return '<div class="page">' + encabezado("Contexto histórico", CONTEXTO.intro) + imagen("contexto") + listaItems(CONTEXTO.puntos) + volver() + "</div>";
    },

    narracion: function () {
      return (
        '<div class="page">' +
        encabezado("Análisis narrativo", NARRACION.intro) +
        '<div class="bloque"><h2>Video de apoyo</h2>' + video(VIDEO_NARRACION, "Video sobre el análisis narrativo de Crimen y castigo") + "</div>" +
        listaItems(NARRACION.puntos) +
        volver() +
        "</div>"
      );
    },

    conflictos: function () {
      return '<div class="page">' + encabezado("Conflictos psicológicos", "Las tensiones internas que mueven al protagonista y a quienes lo rodean.") + listaItems(CONFLICTOS) + volver() + "</div>";
    },

    espacios: function () {
      return '<div class="page">' + encabezado("Espacios de la obra", "En esta novela los lugares son un reflejo del estado mental de los personajes.") + imagen("espacios") + listaItems(ESPACIOS) + volver() + "</div>";
    },

    frases: function () {
      var html = FRASES.map(function (f) {
        return (
          '<figure class="frase">' +
          "<blockquote>" + esc(f.es) + "</blockquote>" +
          '<p class="quien">' + esc(f.quien) + "</p>" +
          '<p class="original" lang="en">' + esc(f.garnett) + "</p>" +
          '<p class="significado">' + esc(f.sentido) + "</p>" +
          '<div><button type="button" class="btn btn-audio" aria-pressed="false" data-audio="' + esc(f.audio) + '">Escuchar frase</button>' +
          '<span class="estado" role="status"></span></div>' +
          "</figure>"
        );
      }).join("");
      return (
        '<div class="page">' +
        encabezado("Frases importantes", "Frases que muestran la intención de la obra. Pulsa el botón de cada una para escucharla.") +
        '<p class="nota">' + esc(FUENTE_FRASES) + "</p>" +
        html +
        volver() +
        "</div>"
      );
    },

    autor: function () {
      var parrafos = AUTOR.parrafos.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
      var motivos = AUTOR.motivos.map(function (m) { return "<li>" + esc(m) + "</li>"; }).join("");
      return (
        '<div class="page">' +
        encabezado("Sobre el autor", AUTOR.nombre + ". " + AUTOR.fechas + ".") +
        imagen("autor") +
        '<div class="bloque"><h2>Biografía</h2>' + parrafos + "</div>" +
        '<div class="bloque"><h2>Qué lo impulsó a escribir</h2><ul>' + motivos + "</ul></div>" +
        '<div class="bloque"><h2>Video</h2>' + video(VIDEO_AUTOR, "Video sobre Fiódor Dostoievski") + "</div>" +
        volver() +
        "</div>"
      );
    },

    quiz: function () {
      iniciarQuiz();
      return (
        '<div class="page">' +
        encabezado("Quiz", "Diez preguntas sobre la novela. Las preguntas y las opciones cambian de orden cada vez.") +
        '<div id="quiz-area"></div>' +
        volver() +
        "</div>"
      );
    }
  };

  /* ---------- Router ---------- */

  function render() {
    var ruta = (location.hash.replace(/^#\/?/, "") || "inicio").split("?")[0];
    if (!vistas[ruta]) ruta = "inicio";

    detenerAudio();
    app.innerHTML = vistas[ruta]();
    if (ruta === "quiz") pintarQuiz();
    topbar.hidden = ruta === "inicio";

    var sec = SECCIONES.filter(function (s) { return s.id === ruta; })[0];
    var nombre = ruta === "inicio" ? "" : (sec ? sec.titulo : "Menú principal") + " | ";
    document.title = nombre + "Crimen y castigo";

    window.scrollTo(0, 0);
    app.focus({ preventScroll: true });
  }

  app.addEventListener("click", function (e) {
    var audioBtn = e.target.closest(".btn-audio");
    if (audioBtn) { alternarAudio(audioBtn); return; }

    var q = e.target.closest("[data-quiz]");
    if (!q || !quiz) return;
    var accion = q.getAttribute("data-quiz");

    if (accion === "resp") {
      responder(parseInt(q.getAttribute("data-k"), 10));
    } else if (accion === "siguiente") {
      quiz.i++;
      quiz.respondida = false;
      pintarQuiz();
      var h = document.getElementById("pregunta-actual") || app.querySelector(".item h2");
      if (h) { h.setAttribute("tabindex", "-1"); h.focus(); }
    } else if (accion === "reiniciar") {
      iniciarQuiz();
      pintarQuiz();
    }
  });

  window.addEventListener("hashchange", render);
  render();
})();
