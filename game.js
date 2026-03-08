const ASSETS = {
  horse: "assets/horse.png",
  planets: [
    "assets/planet00.png",
    "assets/planet01.png",
    "assets/planet02.png",
    "assets/planet03.png",
    "assets/planet04.png",
    "assets/planet05.png",
    "assets/planet06.png",
    "assets/planet07.png",
    "assets/planet08.png",
    "assets/planet09.png"
  ],
  ships: [
    "assets/shipBlue.png",
    "assets/shipGreen.png",
    "assets/shipPink.png",
    "assets/shipYellow.png"
  ],
  astronaut: [
    "assets/astronautA_E.png",
    "assets/astronautA_N.png",
    "assets/astronautA_S.png",
    "assets/astronautA_W.png"
  ],
  meteors: [
    "assets/meteor_NE.png",
    "assets/meteor_NW.png",
    "assets/meteor_SE.png",
    "assets/meteor_SW.png"
  ],
  rocks: [
    "assets/rock_NE.png",
    "assets/rock_NW.png",
    "assets/rock_SE.png",
    "assets/rock_SW.png"
  ],
  crystals: [
    "assets/rock_crystals_NE.png",
    "assets/rock_crystals_SW.png"
  ],
  hangars: [
    "assets/hangar_largeA_NE.png",
    "assets/hangar_roundA_SW.png"
  ]
};

const STORAGE_KEY = "missao-matematica-save-v3";

const PHASES = [
  {
    id: "mult2",
    title: "Multiplicação do 2",
    short: "Grupos de 2",
    mode: "multiplicacao",
    n: 2,
    planet: ASSETS.planets[0],
    ship: ASSETS.ships[0],
    badge: "🪐 1"
  },
  {
    id: "mult3",
    title: "Multiplicação do 3",
    short: "Grupos de 3",
    mode: "multiplicacao",
    n: 3,
    planet: ASSETS.planets[1],
    ship: ASSETS.ships[1],
    badge: "🪐 2"
  },
  {
    id: "mult4",
    title: "Multiplicação do 4",
    short: "Grupos de 4",
    mode: "multiplicacao",
    n: 4,
    planet: ASSETS.planets[2],
    ship: ASSETS.ships[2],
    badge: "🪐 3"
  },
  {
    id: "mult5",
    title: "Multiplicação do 5",
    short: "Grupos de 5",
    mode: "multiplicacao",
    n: 5,
    planet: ASSETS.planets[3],
    ship: ASSETS.ships[3],
    badge: "🪐 4"
  },
  {
    id: "div2",
    title: "Divisão por 2",
    short: "Separar em 2 grupos",
    mode: "divisao",
    n: 2,
    planet: ASSETS.planets[4],
    ship: ASSETS.ships[0],
    badge: "🪐 5"
  },
  {
    id: "div3",
    title: "Divisão por 3",
    short: "Separar em 3 grupos",
    mode: "divisao",
    n: 3,
    planet: ASSETS.planets[5],
    ship: ASSETS.ships[1],
    badge: "🪐 6"
  },
  {
    id: "div4",
    title: "Divisão por 4",
    short: "Separar em 4 grupos",
    mode: "divisao",
    n: 4,
    planet: ASSETS.planets[6],
    ship: ASSETS.ships[2],
    badge: "🪐 7"
  },
  {
    id: "div5",
    title: "Divisão por 5",
    short: "Separar em 5 grupos",
    mode: "divisao",
    n: 5,
    planet: ASSETS.planets[7],
    ship: ASSETS.ships[3],
    badge: "🪐 8"
  }
];

const app = document.getElementById("app");

let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        unlocked: 1,
        medals: 0,
        crystals: 0,
        completed: {},
        quizStats: {}
      };
    }
    const parsed = JSON.parse(raw);
    return {
      unlocked: typeof parsed.unlocked === "number" ? parsed.unlocked : 1,
      medals: typeof parsed.medals === "number" ? parsed.medals : 0,
      crystals: typeof parsed.crystals === "number" ? parsed.crystals : 0,
      completed: parsed.completed || {},
      quizStats: parsed.quizStats || {}
    };
  } catch {
    return {
      unlocked: 1,
      medals: 0,
      crystals: 0,
      completed: {},
      quizStats: {}
    };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function emojiForNumber(n) {
  if (n === 2) return "🟦";
  if (n === 3) return "🟨";
  if (n === 4) return "🟪";
  return "🟧";
}

function makeRepeatRow(symbol, count) {
  return Array.from({ length: count }, () => symbol).join(" ");
}

function multiplicationFacts(n) {
  return Array.from({ length: 10 }, (_, i) => {
    const multiplier = i + 1;
    return {
      left: `${n} × ${multiplier}`,
      right: n * multiplier
    };
  });
}

function divisionFacts(n) {
  return Array.from({ length: 10 }, (_, i) => {
    const answer = i + 1;
    const total = n * answer;
    return {
      left: `${total} ÷ ${n}`,
      right: answer
    };
  });
}

function makeVisualExamplesMultiplication(n) {
  const symbol = emojiForNumber(n);
  return [
    {
      title: "Ver",
      speech: `Olhe os grupos. Cada linha tem ${n}.`,
      html: `
        <div class="group-stack">
          <div class="group-row">${makeRepeatRow(symbol, n)}</div>
          <div class="group-row">${makeRepeatRow(symbol, n)}</div>
          <div class="group-row">${makeRepeatRow(symbol, n)}</div>
        </div>
      `
    },
    {
      title: "Contar",
      speech: `Conte de ${n} em ${n}.`,
      html: `
        <div class="sequence">
          ${n}<br>
          ${n * 2}<br>
          ${n * 3}
        </div>
      `
    },
    {
      title: "Entender",
      speech: `Três grupos de ${n} dão ${n * 3}.`,
      html: `
        <div class="sequence">
          3 grupos de ${n}<br>
          3 × ${n} = ${n * 3}
        </div>
      `
    }
  ];
}

function makeVisualExamplesDivision(n) {
  const symbol = emojiForNumber(n);
  const total = n * 3;
  return [
    {
      title: "Ver",
      speech: `Veja ${total} itens separados em ${n} grupos.`,
      html: `
        <div class="group-stack">
          ${Array.from({ length: n }, () => `<div class="group-row">${makeRepeatRow(symbol, 3)}</div>`).join("")}
        </div>
      `
    },
    {
      title: "Contar",
      speech: `Olhe só um grupo. Cada grupo tem 3.`,
      html: `
        <div class="sequence">
          ${makeRepeatRow(symbol, 3)}<br>
          3 em cada grupo
        </div>
      `
    },
    {
      title: "Entender",
      speech: `${total} dividido por ${n} dá 3.`,
      html: `
        <div class="sequence">
          ${total} ÷ ${n} = 3
        </div>
      `
    }
  ];
}

function multiplicationTips(n) {
  if (n === 2) {
    return [
      "Macete visual: multiplicar por 2 é dobrar.",
      "Exemplo: 6 × 2 é 6 + 6."
    ];
  }
  if (n === 3) {
    return [
      "Macete visual: conte de 3 em 3.",
      "Exemplo: 3, 6, 9, 12, 15..."
    ];
  }
  if (n === 4) {
    return [
      "Macete visual: multiplicar por 4 é dobrar e dobrar de novo.",
      "Exemplo: 5 × 4 → 5 × 2 = 10 → 10 × 2 = 20."
    ];
  }
  return [
    "Macete visual: a tabuada do 5 termina em 0 ou 5.",
    "Exemplo: 5, 10, 15, 20, 25..."
  ];
}

function divisionTips(n) {
  if (n === 2) {
    return [
      "Macete visual: dividir por 2 é separar em duas partes iguais.",
      "Exemplo: 8 ÷ 2 → 4 em cada lado."
    ];
  }
  if (n === 3) {
    return [
      "Macete visual: pense na multiplicação ao contrário.",
      "Exemplo: 12 ÷ 3 → qual número vezes 3 dá 12?"
    ];
  }
  if (n === 4) {
    return [
      "Macete visual: dividir por 4 é fazer 4 grupos iguais.",
      "Exemplo: 20 ÷ 4 → 5 em cada grupo."
    ];
  }
  return [
    "Macete visual: a resposta é quantos grupos de 5 cabem no total.",
      "Exemplo: 25 ÷ 5 → 5 grupos."
  ];
}

function buildQuestions(phase) {
  const questions = [];
  const used = new Set();
  while (questions.length < 5) {
    const a = Math.floor(Math.random() * 10) + 1;
    if (used.has(a)) continue;
    used.add(a);

    if (phase.mode === "multiplicacao") {
      const correct = phase.n * a;
      const options = shuffleUnique([correct, correct + 2, Math.max(1, correct - 1)]);
      questions.push({
        prompt: `${phase.n} × ${a}`,
        help: `Pense em ${a} grupos de ${phase.n}.`,
        correct,
        options
      });
    } else {
      const total = phase.n * a;
      const correct = a;
      const options = shuffleUnique([correct, correct + 1, Math.max(1, correct - 1)]);
      questions.push({
        prompt: `${total} ÷ ${phase.n}`,
        help: `Pense: qual número vezes ${phase.n} dá ${total}?`,
        correct,
        options
      });
    }
  }
  return questions;
}

function shuffleUnique(arr) {
  const unique = [...new Set(arr)];
  for (let i = unique.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [unique[i], unique[j]] = [unique[j], unique[i]];
  }
  return unique;
}

function completePhase(phase) {
  if (!state.completed[phase.id]) {
    state.completed[phase.id] = true;
    state.medals += 1;
    state.crystals += 3;
    const index = PHASES.findIndex(p => p.id === phase.id);
    state.unlocked = Math.max(state.unlocked, index + 2);
    saveState();
  }
}

function updateQuizStats(phaseId, correct, total) {
  state.quizStats[phaseId] = { correct, total };
  saveState();
}

function render() {
  app.innerHTML = `
    <div class="app-shell">
      <section id="screen-map" class="screen active"></section>
      <section id="screen-lesson" class="screen"></section>
      <section id="screen-quiz" class="screen"></section>
      <section id="screen-teacher" class="screen"></section>
    </div>
  `;
  renderMap();
}

function setScreen(screenId) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.toggle("active", screen.id === screenId);
  });
}

function renderMap() {
  const map = document.getElementById("screen-map");
  map.innerHTML = `
    <div class="topbar">
      <h1>🚀 Missão Matemática</h1>
      <p class="subtitle">Explore os planetas, aprenda a tabuada inteira e vença os desafios.</p>
    </div>

    <div class="hero card">
      <div class="hero-row">
        <img class="hero-avatar" src="${ASSETS.horse}" alt="Cavalo guia" />
        <div>
          <div class="hero-title">Cavalo Dançante</div>
          <p class="hero-speech">Olá Pedro! Cada planeta ensina uma missão. Primeiro aprender. Depois jogar.</p>
        </div>
      </div>
    </div>

    <div class="hud">
      <div class="hud-chip">
        <span class="hud-label">Medalhas</span>
        🏆 ${state.medals}
      </div>
      <div class="hud-chip">
        <span class="hud-label">Cristais</span>
        💎 ${state.crystals}
      </div>
      <div class="hud-chip">
        <span class="hud-label">Planetas</span>
        ${Object.keys(state.completed).length}/${PHASES.length}
      </div>
    </div>

    <div class="map-wrap card">
      <div class="space-bg">
        <img src="${ASSETS.meteors[0]}" class="space-item medium" style="top:16px;left:10px;">
        <img src="${ASSETS.meteors[1]}" class="space-item small" style="top:90px;right:18px;">
        <img src="${ASSETS.meteors[2]}" class="space-item medium" style="top:250px;left:18px;">
        <img src="${ASSETS.meteors[3]}" class="space-item small" style="top:420px;right:26px;">
        <img src="${ASSETS.rocks[0]}" class="space-item small" style="top:172px;right:10px;">
        <img src="${ASSETS.rocks[1]}" class="space-item small" style="top:325px;left:14px;">
        <img src="${ASSETS.rocks[2]}" class="space-item medium" style="bottom:42px;left:24px;">
        <img src="${ASSETS.rocks[3]}" class="space-item small" style="bottom:78px;right:20px;">
        <img src="${ASSETS.crystals[0]}" class="space-item medium" style="top:62px;left:120px;">
        <img src="${ASSETS.crystals[1]}" class="space-item medium" style="bottom:34px;right:110px;">
        <img src="${ASSETS.planets[8]}" class="space-item large" style="top:6px;right:110px;">
        <img src="${ASSETS.planets[9]}" class="space-item large" style="bottom:4px;left:110px;">
        <img src="${ASSETS.ships[0]}" class="orbit-ship" style="top:40px;left:34px;">
        <img src="${ASSETS.ships[1]}" class="orbit-ship" style="top:200px;right:30px;animation-delay:1s;">
        <img src="${ASSETS.ships[2]}" class="orbit-ship" style="bottom:120px;left:46px;animation-delay:.4s;">
        <img src="${ASSETS.ships[3]}" class="orbit-ship" style="bottom:18px;right:24px;animation-delay:1.2s;">
        <img src="${ASSETS.astronaut[0]}" class="space-item small" style="top:144px;left:138px;">
        <img src="${ASSETS.astronaut[1]}" class="space-item small" style="top:288px;right:136px;">
        <img src="${ASSETS.astronaut[2]}" class="space-item small" style="bottom:118px;left:164px;">
        <img src="${ASSETS.astronaut[3]}" class="space-item small" style="bottom:178px;right:148px;">
        <img src="${ASSETS.hangars[0]}" class="space-item medium" style="top:118px;right:102px;">
        <img src="${ASSETS.hangars[1]}" class="space-item medium" style="bottom:88px;left:86px;">
      </div>
      <div class="map-grid" id="map-grid"></div>
    </div>

    <div class="top-actions">
      <button class="ghost-btn" id="teacher-open">Painel do professor</button>
      <button class="ghost-btn" id="reset-game">Reiniciar progresso</button>
    </div>
  `;

  const grid = map.querySelector("#map-grid");
  PHASES.forEach((phase, index) => {
    const unlocked = index < state.unlocked;
    const complete = !!state.completed[phase.id];
    const stat = state.quizStats[phase.id];

    const card = document.createElement("div");
    card.className = `planet-card${unlocked ? "" : " locked"}${complete ? " complete" : ""}`;
    card.innerHTML = `
      <img class="planet-img" src="${phase.planet}" alt="${escapeHtml(phase.title)}">
      <div class="planet-title">${phase.badge} ${escapeHtml(phase.title)}</div>
      <div class="planet-sub">${escapeHtml(phase.short)}</div>
      <div class="planet-badges">
        <span class="badge">${phase.mode === "multiplicacao" ? "×" : "÷"} ${phase.n}</span>
        ${complete ? '<span class="badge good">Concluído</span>' : unlocked ? '<span class="badge gold">Disponível</span>' : '<span class="badge lock">Bloqueado</span>'}
        ${stat ? `<span class="badge">${stat.correct}/${stat.total}</span>` : ""}
      </div>
      <button class="tap-btn"${unlocked ? "" : " disabled"}>${unlocked ? "Entrar no planeta" : "Fase bloqueada"}</button>
    `;
    if (unlocked) {
      card.querySelector("button").addEventListener("click", () => renderLesson(index));
    }
    grid.appendChild(card);
  });

  map.querySelector("#teacher-open").addEventListener("click", renderTeacher);
  map.querySelector("#reset-game").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    state = loadState();
    render();
  });

  setScreen("screen-map");
}

function renderLesson(index) {
  const phase = PHASES[index];
  const lesson = document.getElementById("screen-lesson");
  const visuals = phase.mode === "multiplicacao"
    ? makeVisualExamplesMultiplication(phase.n)
    : makeVisualExamplesDivision(phase.n);
  const tips = phase.mode === "multiplicacao"
    ? multiplicationTips(phase.n)
    : divisionTips(phase.n);
  const facts = phase.mode === "multiplicacao"
    ? multiplicationFacts(phase.n)
    : divisionFacts(phase.n);

  lesson.innerHTML = `
    <div class="topbar">
      <h1>${escapeHtml(phase.title)}</h1>
      <p class="subtitle">Primeiro aprender toda a tabuada. Depois jogar o desafio.</p>
    </div>

    <div class="lesson-card">
      <div class="lesson-header">
        <img src="${ASSETS.horse}" alt="Cavalo guia">
        <div>
          <h2 class="lesson-title">${escapeHtml(phase.title)}</h2>
          <p class="lesson-speech">${phase.mode === "multiplicacao"
            ? `Hoje vamos aprender a tabuada do ${phase.n} com grupos, contagem e macetes.`
            : `Hoje vamos aprender divisão por ${phase.n} vendo grupos iguais.`}
          </p>
        </div>
      </div>

      ${visuals.map(v => `
        <div class="section-card">
          <div class="section-title">${escapeHtml(v.title)}</div>
          <div class="visual-box">${v.html}</div>
          <div class="tip-box" style="margin-top:10px;">${escapeHtml(v.speech)}</div>
        </div>
      `).join("")}

      <div class="section-card">
        <div class="section-title">Dicas e macetes</div>
        <div class="tip-box">
          ${tips.map(t => `• ${escapeHtml(t)}`).join("<br>")}
        </div>
      </div>

      <div class="section-card">
        <div class="section-title">Tabuada completa</div>
        <div class="full-table">
          ${facts.map(f => `<div class="fact">${escapeHtml(f.left)} = ${escapeHtml(f.right)}</div>`).join("")}
        </div>
      </div>

      <div class="lesson-actions">
        <button class="ghost-btn" id="back-map">Voltar ao mapa</button>
        <button class="primary-btn" id="start-quiz">Começar missão</button>
      </div>
    </div>
  `;

  lesson.querySelector("#back-map").addEventListener("click", renderMap);
  lesson.querySelector("#start-quiz").addEventListener("click", () => renderQuiz(index));

  setScreen("screen-lesson");
}

function renderQuiz(index) {
  const phase = PHASES[index];
  const questions = buildQuestions(phase);
  let current = 0;
  let correct = 0;

  const quiz = document.getElementById("screen-quiz");
  quiz.innerHTML = `
    <div class="topbar">
      <h1>Missão do planeta</h1>
      <p class="subtitle">Responda 5 perguntas para conquistar a medalha deste planeta.</p>
    </div>

    <div class="quiz-card">
      <div class="lesson-header">
        <img src="${ASSETS.astronaut[0]}" alt="Explorador">
        <div>
          <h2 class="lesson-title">${escapeHtml(phase.title)}</h2>
          <p class="lesson-speech">O explorador chegou ao hangar. Hora do desafio.</p>
        </div>
      </div>

      <div class="visual-box" style="min-height:110px;margin-bottom:12px;">
        <div class="group-stack">
          <img src="${phase.ship}" style="width:62px;margin:0 auto;">
          <img src="${ASSETS.hangars[index % ASSETS.hangars.length]}" style="width:92px;margin:0 auto;">
        </div>
      </div>

      <div class="quiz-progress" id="quiz-progress"></div>
      <div class="question-box" id="question-box"></div>
      <div class="question-help" id="question-help"></div>
      <div class="answer-grid" id="answer-grid"></div>
      <div class="feedback" id="feedback"></div>

      <div class="footer-actions">
        <button class="ghost-btn" id="quit-quiz">Sair da missão</button>
      </div>
    </div>
  `;

  quiz.querySelector("#quit-quiz").addEventListener("click", () => renderLesson(index));

  function showQuestion() {
    const q = questions[current];
    quiz.querySelector("#quiz-progress").textContent = `Pergunta ${current + 1} de ${questions.length}`;
    quiz.querySelector("#question-box").textContent = `${q.prompt} = ?`;
    quiz.querySelector("#question-help").textContent = q.help;
    quiz.querySelector("#feedback").textContent = "";
    quiz.querySelector("#feedback").className = "feedback";

    const answerGrid = quiz.querySelector("#answer-grid");
    answerGrid.innerHTML = "";
    q.options.forEach(option => {
      const btn = document.createElement("button");
      btn.className = "answer-btn";
      btn.textContent = option;
      btn.addEventListener("click", () => {
        const buttons = [...answerGrid.querySelectorAll("button")];
        buttons.forEach(b => b.disabled = true);

        if (option === q.correct) {
          btn.classList.add("correct");
          correct += 1;
          quiz.querySelector("#feedback").textContent = "⭐ Muito bem!";
          quiz.querySelector("#feedback").className = "feedback good";
        } else {
          btn.classList.add("wrong");
          buttons.find(b => Number(b.textContent) === q.correct)?.classList.add("correct");
          quiz.querySelector("#feedback").textContent = "Vamos tentar lembrar do macete.";
          quiz.querySelector("#feedback").className = "feedback bad";
        }

        setTimeout(() => {
          current += 1;
          if (current < questions.length) {
            showQuestion();
          } else {
            updateQuizStats(phase.id, correct, questions.length);
            if (correct >= 4) {
              completePhase(phase);
              renderQuizEnd(phase, true, correct, questions.length);
            } else {
              renderQuizEnd(phase, false, correct, questions.length);
            }
          }
        }, 900);
      });
      answerGrid.appendChild(btn);
    });
  }

  showQuestion();
  setScreen("screen-quiz");
}

function renderQuizEnd(phase, success, correct, total) {
  const quiz = document.getElementById("screen-quiz");
  quiz.innerHTML = `
    <div class="topbar">
      <h1>${success ? "Planeta concluído" : "Missão incompleta"}</h1>
      <p class="subtitle">${success ? "Você conquistou medalha e cristais." : "Revise a tabuada e tente de novo."}</p>
    </div>

    <div class="quiz-card">
      <div class="visual-box" style="min-height:140px;margin-bottom:12px;">
        <div class="group-stack">
          <img src="${phase.planet}" style="width:100px;">
          <img src="${success ? ASSETS.crystals[0] : ASSETS.crystals[1]}" style="width:54px;">
        </div>
      </div>

      <div class="question-box">${success ? "🏆 Missão vencida!" : "🛰️ Quase lá!"}</div>
      <div class="question-help">Acertos: ${correct} de ${total}</div>
      <div class="feedback ${success ? "good" : "bad"}" style="min-height:auto;">
        ${success
          ? "A próxima fase foi liberada no mapa."
          : "Volte à explicação, use os macetes e tente novamente."}
      </div>

      <div class="footer-actions">
        <button class="ghost-btn" id="back-lesson">Voltar à explicação</button>
        <button class="primary-btn" id="back-map-finish">Ir ao mapa</button>
      </div>
    </div>
  `;

  quiz.querySelector("#back-lesson").addEventListener("click", () => {
    const index = PHASES.findIndex(p => p.id === phase.id);
    renderLesson(index);
  });
  quiz.querySelector("#back-map-finish").addEventListener("click", renderMap);

  setScreen("screen-quiz");
}

function renderTeacher() {
  const teacher = document.getElementById("screen-teacher");
  const rows = PHASES.map((phase, index) => {
    const stat = state.quizStats[phase.id];
    const done = !!state.completed[phase.id];
    return `
      <div class="teacher-stat">
        <strong>${index + 1}. ${escapeHtml(phase.title)}</strong>
        Status: ${done ? "Concluído" : index < state.unlocked ? "Disponível" : "Bloqueado"}<br>
        Quiz: ${stat ? `${stat.correct}/${stat.total}` : "ainda não jogado"}
      </div>
    `;
  }).join("");

  teacher.innerHTML = `
    <div class="topbar">
      <h1>Painel do professor</h1>
      <p class="subtitle">Resumo do progresso da missão.</p>
    </div>

    <div class="teacher-card">
      <div class="teacher-grid">
        <div class="teacher-stat">
          <strong>Medalhas</strong>
          ${state.medals}
        </div>
        <div class="teacher-stat">
          <strong>Cristais</strong>
          ${state.crystals}
        </div>
        <div class="teacher-stat">
          <strong>Planetas concluídos</strong>
          ${Object.keys(state.completed).length}/${PHASES.length}
        </div>
        ${rows}
      </div>

      <div class="footer-actions">
        <button class="ghost-btn" id="teacher-back">Voltar ao mapa</button>
      </div>
    </div>
  `;

  teacher.querySelector("#teacher-back").addEventListener("click", renderMap);
  setScreen("screen-teacher");
}

render();