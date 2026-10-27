/* Azan Asghar — Portfolio interactions.
   Everything here is original code written for this site:
   loading counter, mobile nav, scroll reveals, contact mailto
   fallback, and a tic-tac-toe opponent (minimax + alpha-beta). */

(function () {
  "use strict";

  /* ---------- Loading screen: 0 → 100% then fade ---------- */
  var loader = document.getElementById("loader");
  var loaderCount = document.getElementById("loaderCount");
  var progress = 0;
  var tick = setInterval(function () {
    progress = Math.min(100, progress + Math.floor(Math.random() * 18) + 8);
    if (loaderCount) loaderCount.textContent = progress + "%";
    if (progress >= 100) {
      clearInterval(tick);
      setTimeout(function () { if (loader) loader.classList.add("done"); }, 250);
    }
  }, 110);

  /* ---------- Mobile nav ---------- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Contact form ---------- */
  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var data = new FormData(form);
      var countryCode = data.get("country_code") || "+92";
      var rawPhone = (data.get("phone") || "").trim();
      var fullPhone = rawPhone ? (countryCode + " " + rawPhone) : "Not provided";
      var need = data.get("need") || "Project Enquiry";
      var name = data.get("name") || "";
      var email = data.get("email") || "";
      var message = data.get("message") || "";

      var subject = "New Project Enquiry: " + need + " — " + name;
      var body = "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Phone / WhatsApp: " + fullPhone + "\n" +
        "Service Needed: " + need + "\n\n" +
        "Project Description:\n" + message;

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalBtnText = submitBtn ? submitBtn.textContent : "SEND THE ENQUIRY";
      if (submitBtn) {
        submitBtn.textContent = "OPENING EMAIL...";
        submitBtn.disabled = true;
      }

      window.location.href = "mailto:azan@corevex.tech?subject=" +
        encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

      if (note) {
        note.innerHTML = "Opening your email app with your enquiry details… If your email app didn't open, <a href='https://wa.me/923427066034?text=" +
          encodeURIComponent("Hi Azan, I submitted an enquiry on your portfolio:\n\n" + body) +
          "' target='_blank' rel='noopener' style='color:#fff;text-decoration:underline;font-weight:600;'>click here to send via WhatsApp ↗</a> or email directly at <a href='mailto:azan@corevex.tech' style='color:#fff;text-decoration:underline;'>azan@corevex.tech</a>.";
      }

      setTimeout(function () {
        if (submitBtn) {
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
        }
      }, 3500);
    });
  }

  /* ---------- Tic-tac-toe: you (X) vs machine (O) ---------- */
  var boardEl = document.getElementById("board");
  var statusEl = document.getElementById("gameStatus");
  var scoreEl = document.getElementById("scoreLine");
  if (!boardEl) return;

  var HUMAN = "X", MACHINE = "O";
  var WINS = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  var board = Array(9).fill("");
  var gameOver = false;
  var difficulty = "casual";
  var score = { you: 0, draws: 0, machine: 0 };
  var cells = [];

  function winner(b) {
    for (var i = 0; i < WINS.length; i++) {
      var line = WINS[i];
      if (b[line[0]] && b[line[0]] === b[line[1]] && b[line[1]] === b[line[2]]) {
        return { player: b[line[0]], line: line };
      }
    }
    return null;
  }
  function emptySquares(b) {
    var out = [];
    for (var i = 0; i < 9; i++) if (!b[i]) out.push(i);
    return out;
  }
  // Minimax with alpha-beta pruning. Machine maximises, human minimises.
  function minimax(b, isMax, alpha, beta, depth) {
    var w = winner(b);
    if (w) return w.player === MACHINE ? 10 - depth : depth - 10;
    if (emptySquares(b).length === 0) return 0;
    if (isMax) {
      var best = -Infinity;
      emptySquares(b).forEach(function (i) {
        b[i] = MACHINE;
        best = Math.max(best, minimax(b, false, alpha, beta, depth + 1));
        b[i] = "";
        alpha = Math.max(alpha, best);
        if (beta <= alpha) return;
      });
      return best;
    }
    var worst = Infinity;
    emptySquares(b).forEach(function (i) {
      b[i] = HUMAN;
      worst = Math.min(worst, minimax(b, true, alpha, beta, depth + 1));
      b[i] = "";
      beta = Math.min(beta, worst);
      if (beta <= alpha) return;
    });
    return worst;
  }
  function bestMove() {
    var bestScore = -Infinity, move = -1;
    emptySquares(board).forEach(function (i) {
      board[i] = MACHINE;
      var s = minimax(board, false, -Infinity, Infinity, 0);
      board[i] = "";
      if (s > bestScore) { bestScore = s; move = i; }
    });
    return move;
  }
  function machineMove() {
    var empties = emptySquares(board);
    if (!empties.length || gameOver) return;
    var move;
    if (difficulty === "impossible") {
      move = bestMove();
    } else if (difficulty === "sharp") {
      // Sharp plays the best move most of the time, slips occasionally.
      move = Math.random() < 0.75 ? bestMove() : empties[Math.floor(Math.random() * empties.length)];
    } else {
      // Casual plays randomly most of the time, smart occasionally.
      move = Math.random() < 0.3 ? bestMove() : empties[Math.floor(Math.random() * empties.length)];
    }
    place(move, MACHINE);
  }
  function renderScore() {
    if (scoreEl) scoreEl.textContent = "You " + score.you + " · Draws " + score.draws + " · Machine " + score.machine;
  }
  function finish(result, line) {
    gameOver = true;
    cells.forEach(function (c) { c.disabled = true; });
    if (line) line.forEach(function (i) { cells[i].classList.add("win"); });
    if (result === HUMAN) { score.you++; statusEl.textContent = "You win! Nicely played."; }
    else if (result === MACHINE) { score.machine++; statusEl.textContent = "Machine wins this one. Hit NEW GAME to go again."; }
    else { score.draws++; statusEl.textContent = "A draw — well held."; }
    renderScore();
  }
  function place(index, player) {
    if (gameOver || board[index]) return;
    board[index] = player;
    cells[index].textContent = player;
    cells[index].disabled = true;
    var w = winner(board);
    if (w) { finish(w.player, w.line); return; }
    if (emptySquares(board).length === 0) { finish(null, null); return; }
    if (player === HUMAN) {
      statusEl.textContent = "Machine is thinking…";
      setTimeout(function () { machineMove(); if (!gameOver) statusEl.textContent = "Your move — click a square."; }, 350);
    }
  }
  function newGame() {
    board = Array(9).fill("");
    gameOver = false;
    cells.forEach(function (c) { c.textContent = ""; c.disabled = false; c.classList.remove("win"); });
    statusEl.textContent = "Your move — click a square.";
  }
  for (var i = 0; i < 9; i++) {
    (function (index) {
      var btn = document.createElement("button");
      btn.className = "cell";
      btn.type = "button";
      btn.setAttribute("aria-label", "Square " + (index + 1));
      btn.addEventListener("click", function () { place(index, HUMAN); });
      boardEl.appendChild(btn);
      cells.push(btn);
    })(i);
  }
  document.querySelectorAll(".diff-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".diff-btn").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      difficulty = btn.getAttribute("data-diff");
      newGame();
    });
  });
  var resetBtn = document.getElementById("resetGame");
  if (resetBtn) resetBtn.addEventListener("click", newGame);
  renderScore();

  /* Work carousel: counter + arrows */
  var workGrid = document.querySelector('#work .work-grid');
  var workIndexEl = document.getElementById('workIndex');
  if (workGrid && workIndexEl) {
    function workCurrentIndex() {
      var cards = Array.prototype.slice.call(workGrid.children);
      var center = workGrid.scrollLeft + workGrid.clientWidth / 2;
      var best = 0, bestDist = Infinity;
      cards.forEach(function (card, i) {
        var mid = card.offsetLeft + card.offsetWidth / 2;
        var d = Math.abs(mid - center);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      return best;
    }
    function workUpdateCounter() {
      workIndexEl.textContent = String(workCurrentIndex() + 1).padStart(2, '0');
    }
    workGrid.addEventListener('scroll', workUpdateCounter, { passive: true });
    document.querySelectorAll('.work-arrow').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var card = workGrid.querySelector('.work-card');
        var step = (card ? card.offsetWidth : 320) + 16;
        workGrid.scrollBy({ left: Number(btn.dataset.dir) * step, behavior: 'smooth' });
        setTimeout(workUpdateCounter, 350);
      });
    });
    workUpdateCounter();
  }

  /* ---------- Stats Counter Animation ---------- */
  var statsSection = document.querySelector("#about .stats");
  if (statsSection && "IntersectionObserver" in window) {
    var statNums = statsSection.querySelectorAll(".stat-num");
    var statsAnimated = false;
    var statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          statNums.forEach(function (el) {
            var rawText = el.textContent.trim();
            var hasPlus = rawText.indexOf("+") !== -1;
            var hasPercent = rawText.indexOf("%") !== -1;
            var isPadded = rawText.length === 2 && rawText.charAt(0) === "0";
            var target = parseInt(rawText.replace(/[^0-9]/g, ""), 10);
            if (isNaN(target)) return;

            var duration = 1200;
            var startTime = null;
            function step(timestamp) {
              if (!startTime) startTime = timestamp;
              var progress = Math.min((timestamp - startTime) / duration, 1);
              var ease = 1 - Math.pow(1 - progress, 4);
              var current = Math.floor(ease * target);
              var formatted = current.toString();
              if (isPadded && current < 10) formatted = "0" + current;
              if (hasPlus) formatted += "+";
              if (hasPercent) formatted += "%";
              el.textContent = formatted;
              if (progress < 1) {
                requestAnimationFrame(step);
              } else {
                el.textContent = rawText;
              }
            }
            requestAnimationFrame(step);
          });
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    statsObserver.observe(statsSection);
  }

  /* ---------- Design Gallery Lightbox Modal ---------- */
  var lightbox = document.getElementById("lightboxModal");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxCaption = document.getElementById("lightboxCaption");
  var lightboxClose = document.getElementById("lightboxClose");

  function openLightbox(src, alt, caption) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    if (lightboxCaption) lightboxCaption.textContent = caption || "";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lightboxImg) lightboxImg.src = "";
  }

  document.querySelectorAll("#design .design-card").forEach(function (card) {
    var frame = card.querySelector(".design-img-frame");
    var img = card.querySelector(".design-img-frame img");
    var cap = card.querySelector("figcaption");
    if (frame && img) {
      frame.addEventListener("click", function () {
        openLightbox(img.currentSrc || img.src, img.alt, cap ? cap.textContent : "");
      });
    }
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", function (ev) {
      if (ev.target === lightbox || ev.target.classList.contains("lightbox-inner")) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("keydown", function (ev) {
    if (ev.key === "Escape" && lightbox && lightbox.classList.contains("open")) {
      closeLightbox();
    }
  });
})();
