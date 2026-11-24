// =========================================================================
// CONFIGURAÇÃO: Cole aqui os links das Planilhas CSV e do Google Forms
// =========================================================================
const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRlhxNsPo1x1LhYlb5FoKgK1Tudadq__JN6NkoF3Wh6O41STGW-S3fYqRS77SlBlOI4bJh29eH1qbbY/pub?gid=1259216439&single=true&output=csv"; // Link CSV da aba do Guia de Itapoá
const FAQ_CSV_URL = "https://docs.google.com/forms/d/e/1FAIpQLSckSNGGT4XxRpJ1QMV6avOQPgM1pdqWCnOLBamvy9aAdUJyhg/viewform?usp=publish-editor";   // Link CSV da aba 'faq'
const SUGGEST_FORM_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRlhxNsPo1x1LhYlb5FoKgK1Tudadq__JN6NkoF3Wh6O41STGW-S3fYqRS77SlBlOI4bJh29eH1qbbY/pub?gid=2028583301&single=true&output=csv"; // Link do Google Forms de sugestões

const CACHE_KEY = "ibc_guia_csv_cache_v1";
const FAQ_CACHE_KEY = "ibc_faq_csv_cache_v1";

// Ícones SVG inline (zero dependências externas)
const ICONS = {
  pin: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  map: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/></svg>`,
  phone: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  whatsapp: `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m5.81 14.07c-.24.68-1.41 1.3-1.95 1.38-.5.07-1.13.1-1.82-.12-.42-.14-.96-.31-1.65-.61-2.9-1.25-4.79-4.18-4.94-4.38-.14-.2-1.18-1.57-1.18-3 0-1.43.75-2.13 1.01-2.42.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2.01.89 2.16.07.15.12.32.02.51-.1.19-.15.32-.29.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.35 1.46.29.15.46.12.63-.07.17-.19.73-.85.92-1.14.19-.29.39-.24.65-.15.27.1 1.69.8 1.98.94.29.15.49.22.56.34.07.12.07.7-.17 1.38Z"/></svg>`,
  instagram: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>`
};

const FALLBACK_DATA = [
  { categoria: "Saúde e Emergência", nome: "Pronto Atendimento 24 Horas (PA)", endereco: "Rua Mariana Michels Borges, 685 - Itapema do Norte", observacao: "Atendimento médico de urgência 24h.", contato: "4735395970", deslocamento: "3,161", instagram: "", tags: "24 horas; Emergência; Saúde" },
  { categoria: "Utilidade Pública", nome: "Whats da Rogga", endereco: "Itapoá - SC", observacao: "Central de Relacionamento Rôgga Empreendimentos.", contato: "4730323764*", deslocamento: "4,836", instagram: "", tags: "" },
  { categoria: "Bares e Música", nome: "Bar do Alemão", endereco: "Rua Bento Francisco da Silva, 380 - Itapema do Norte", observacao: "Música ao vivo!", contato: "", deslocamento: "4,426", instagram: "", tags: "Música ao vivo" }
];

const FALLBACK_FAQ = [
  { categoria: "Administração e Portais", pergunta: "Qual CEP usar para compras e concessionárias?", resposta: "Para Correios e entregas, use o CEP 89360-131. Para concessionárias (Celesc, Itapoá Saneamento e Ultragaz), use o CEP 89249-000." },
  { categoria: "Obras e Garantia", pergunta: "Identifiquei infiltração próxima ao ralo do banheiro, o que fazer?", resposta: "Registre com fotos/vídeos e abra um chamado de assistência técnica no portal Meu Apê Rôgga." }
];

let allItems = [];
let activeCategory = "Todos";
let activeTag = "";

let allFaqItems = [];
let activeFaqCategory = "Todos";

// Modo Condômino: padrão oculto (para hóspedes/público); exibe abas apenas com ?condomino=1
const params = new URLSearchParams(window.location.search);
const isCondomino = params.get("condomino") === "1";
if (isCondomino) {
  document.getElementById("mainTabs").style.display = "flex";
}

// Configura botões de sugestão (topo e rodapé)
const suggestEl = document.getElementById("suggestLink");
const recommendBtn = document.getElementById("recommendBtn");
if (SUGGEST_FORM_URL) {
  suggestEl.href = SUGGEST_FORM_URL;
  recommendBtn.href = SUGGEST_FORM_URL;
  recommendBtn.style.display = "inline-flex";
} else {
  suggestEl.parentElement.style.display = "none";
}

function switchTab(tabName, btn) {
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById("tab-guia").classList.toggle("section-hidden", tabName !== "guia");
  document.getElementById("tab-condomino").classList.toggle("section-hidden", tabName !== "condomino");
}

function copyAddress(btn) {
  const text = "Rua Carlos Afonso Frings (Rua 1330), nº 347 - Balneário Itapoá, Itapoá/SC - CEP 89360-131";
  navigator.clipboard.writeText(text).then(() => {
    const original = btn.textContent;
    btn.textContent = "Copiado!";
    setTimeout(() => btn.textContent = original, 2000);
  });
}

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') { field += '"'; i++; }
      else if (ch === '"') { inQuotes = false; }
      else { field += ch; }
    } else {
      if (ch === '"') { inQuotes = true; }
      else if (ch === ",") { row.push(field.trim()); field = ""; }
      else if (ch === "\n" || (ch === "\r" && next === "\n")) {
        if (ch === "\r") i++;
        row.push(field.trim());
        if (row.some(cell => cell !== "")) rows.push(row);
        row = [];
        field = "";
      } else { field += ch; }
    }
  }

  if (field !== "" || row.length > 0) {
    row.push(field.trim());
    if (row.some(cell => cell !== "")) rows.push(row);
  }

  if (rows.length < 2) return [];

  const headers = rows[0].map(h => h.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
  return rows.slice(1).map(r => {
    const obj = {};
    headers.forEach((h, idx) => obj[h] = r[idx] || "");
    return obj;
  });
}

// =========================================================================
// GUIA DE ITAPOÁ
// =========================================================================
function hasSpecificAddress(endereco) {
  const clean = (endereco || "").trim().toLowerCase();
  return Boolean(clean && clean !== "itapoá - sc" && clean !== "itapoa - sc");
}

function parseDistanceKm(valor, specificAddr) {
  if (!valor || !specificAddr) return Infinity;
  const raw = String(valor).trim();
  if (!/^[\d.,]+$/.test(raw)) return Infinity;
  const num = Number(raw.replace(",", "."));
  return isNaN(num) ? Infinity : num;
}

function formatDistance(valor, specificAddr) {
  if (!valor || !specificAddr) return "";
  const raw = String(valor).trim();
  const num = Number(raw.replace(",", "."));

  if (!isNaN(num) && /^[\d.,]+$/.test(raw)) {
    if (num < 1) return `${Math.round(num * 1000)} m`;
    return `${num.toFixed(1).replace(".", ",")} km`;
  }
  return escapeHtml(raw);
}

function formatDuration(minutes) {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

function estimateTravelTooltip(km) {
  if (!isFinite(km) || km <= 0) return "";

  const carSpeed = km <= 10 ? 35 : 55;
  const carMin = Math.max(1, Math.round((km / carSpeed) * 60));
  const parts = [];

  if (km <= 4) {
    const walkMin = Math.max(1, Math.round((km / 5) * 60));
    parts.push(`🚶 ~${formatDuration(walkMin)} a pé`);
  }

  parts.push(`🚗 ~${formatDuration(carMin)} de carro`);
  return parts.join(" • ");
}

function toggleTooltip(btn, event) {
  event.stopPropagation();
  const isOpen = btn.classList.contains("tooltip-open");
  document.querySelectorAll(".distance-pill.tooltip-open").forEach(el => el.classList.remove("tooltip-open"));
  if (!isOpen) btn.classList.add("tooltip-open");
}

document.addEventListener("click", () => {
  document.querySelectorAll(".distance-pill.tooltip-open").forEach(el => el.classList.remove("tooltip-open"));
});

function renderFilters() {
  const counts = { Todos: allItems.length };
  allItems.forEach(item => {
    if (item.categoria) {
      counts[item.categoria] = (counts[item.categoria] || 0) + 1;
    }
  });

  const categories = ["Todos", ...Object.keys(counts).filter(c => c !== "Todos")];
  const container = document.getElementById("categoryFilters");
  container.innerHTML = categories.map(cat => `
    <button class="filter-chip ${cat === activeCategory ? "active" : ""}" onclick="setCategory('${escapeHtml(cat)}')">
      <span>${escapeHtml(cat)}</span>
      <span class="count">${counts[cat]}</span>
    </button>
  `).join("");
}

function setCategory(cat) {
  activeCategory = cat;
  renderFilters();
  renderCards();
}

function filterByTag(tag) {
  if (activeTag.toLowerCase() === tag.toLowerCase()) {
    clearTagFilter();
    return;
  }
  activeTag = tag;
  activeCategory = "Todos";
  document.getElementById("activeTagName").textContent = tag;
  document.getElementById("activeTagBar").style.display = "flex";
  renderFilters();
  renderCards();
  window.scrollTo({ top: document.getElementById("activeTagBar").offsetTop - 16, behavior: "smooth" });
}

function clearTagFilter() {
  activeTag = "";
  document.getElementById("activeTagBar").style.display = "none";
  renderCards();
}

function buildContactButton(contato, isEmergency) {
  const raw = String(contato || "").trim();
  if (!raw) return "";

  const forceWhatsApp = raw.endsWith("*") || raw.toLowerCase().startsWith("wa:");
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";

  const isMobile = digits.length === 11 && digits[2] === "9";

  if (forceWhatsApp || isMobile) {
    return `<a class="btn btn-whatsapp" href="https://wa.me/55${digits}" target="_blank" rel="noopener">${ICONS.whatsapp} WhatsApp</a>`;
  }

  const displayNum = raw.replace(/\*$/, "").replace(/^wa:/i, "");
  const btnClass = isEmergency ? "btn btn-emergency" : "btn btn-outline";
  return `<a class="${btnClass}" href="tel:${digits}">${ICONS.phone} Ligar (${escapeHtml(displayNum)})</a>`;
}

function buildInstagramButton(insta) {
  const clean = (insta || "").trim().replace(/^@/, "").replace(/^https?:\/\/(www\.)?instagram\.com\//i, "").replace(/\/$/, "");
  if (!clean) return "";
  return `<a class="btn btn-insta" href="https://instagram.com/${encodeURIComponent(clean)}" target="_blank" rel="noopener">${ICONS.instagram} Instagram</a>`;
}

function renderCards() {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const sortMode = document.getElementById("sortSelect").value;

  let filtered = allItems.filter(item => {
    const matchesCat = activeCategory === "Todos" || item.categoria === activeCategory;
    const itemTags = (item.tags || "").split(";").map(t => t.trim().toLowerCase()).filter(Boolean);
    const matchesTag = !activeTag || itemTags.includes(activeTag.toLowerCase());
    const haystack = `${item.categoria} ${item.nome} ${item.endereco} ${item.observacao} ${item.deslocamento} ${item.tags}`.toLowerCase();
    return matchesCat && matchesTag && haystack.includes(query);
  });

  if (sortMode === "distance") {
    filtered = [...filtered].sort((a, b) => {
      const distA = parseDistanceKm(a.deslocamento, hasSpecificAddress(a.endereco));
      const distB = parseDistanceKm(b.deslocamento, hasSpecificAddress(b.endereco));
      if (distA !== distB) return distA - distB;
      return a.nome.localeCompare(b.nome, "pt-BR");
    });
  } else if (sortMode === "alpha") {
    filtered = [...filtered].sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
  }

  const container = document.getElementById("cardsContainer");
  if (filtered.length === 0) {
    container.innerHTML = `<div class="status-msg">Nenhum resultado encontrado para essa busca.</div>`;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const isEmergency = (item.categoria || "").toLowerCase().includes("emergência");
    const specificAddr = hasSpecificAddress(item.endereco);
    const mapsQuery = encodeURIComponent(`${item.nome}, ${item.endereco}, Itapoá - SC`);
    const mapsUrl = specificAddr ? `https://www.google.com/maps/search/?api=1&query=${mapsQuery}` : "";
    const distKm = parseDistanceKm(item.deslocamento, specificAddr);
    const distText = formatDistance(item.deslocamento, specificAddr);
    const tooltipText = estimateTravelTooltip(distKm);

    const tagsHtml = (item.tags || "")
      .split(";")
      .map(t => t.trim())
      .filter(Boolean)
      .map(t => {
        const isActive = activeTag.toLowerCase() === t.toLowerCase();
        return `<button type="button" class="tag-btn ${isActive ? "active" : ""}" onclick="filterByTag('${escapeHtml(t)}')">${escapeHtml(t)}</button>`;
      })
      .join("");

    return `
      <article class="card">
        <div>
          <div class="card-top">
            ${item.categoria ? `<span class="badge ${isEmergency ? "badge-emergency" : ""}">${escapeHtml(item.categoria)}</span>` : ""}
            ${distText ? `<button type="button" class="distance-pill" ${tooltipText ? `data-tooltip="${escapeHtml(tooltipText)}" onclick="toggleTooltip(this, event)"` : ""}>${ICONS.pin} ${distText}</button>` : ""}
          </div>
          <h3>${escapeHtml(item.nome)}</h3>
          ${item.endereco ? `<p class="address">${ICONS.pin}<span>${escapeHtml(item.endereco)}</span></p>` : ""}
          ${item.observacao ? `<p class="obs">${escapeHtml(item.observacao)}</p>` : ""}
          ${tagsHtml ? `<div class="tags-list">${tagsHtml}</div>` : ""}
        </div>
        <div class="card-actions">
          ${mapsUrl ? `<a class="btn btn-primary" href="${mapsUrl}" target="_blank" rel="noopener">${ICONS.map} Ver no Maps</a>` : ""}
          ${buildContactButton(item.contato, isEmergency)}
          ${buildInstagramButton(item.instagram)}
        </div>
      </article>
    `;
  }).join("");
}

function applyCsvData(csvText) {
  allItems = parseCSV(csvText).filter(item => item.nome);
  renderFilters();
  renderCards();
}

// =========================================================================
// FAQ (ÁREA DO CONDÔMINO)
// =========================================================================
function renderFaqFilters() {
  const counts = { Todos: allFaqItems.length };
  allFaqItems.forEach(item => {
    if (item.categoria) {
      counts[item.categoria] = (counts[item.categoria] || 0) + 1;
    }
  });

  const categories = ["Todos", ...Object.keys(counts).filter(c => c !== "Todos")];
  const container = document.getElementById("faqCategoryFilters");
  container.innerHTML = categories.map(cat => `
    <button class="filter-chip ${cat === activeFaqCategory ? "active" : ""}" onclick="setFaqCategory('${escapeHtml(cat)}')">
      <span>${escapeHtml(cat)}</span>
      <span class="count">${counts[cat]}</span>
    </button>
  `).join("");
}

function setFaqCategory(cat) {
  activeFaqCategory = cat;
  renderFaqFilters();
  renderFaq();
}

function renderFaq() {
  const query = document.getElementById("faqSearchInput").value.trim().toLowerCase();
  const filtered = allFaqItems.filter(item => {
    const matchesCat = activeFaqCategory === "Todos" || item.categoria === activeFaqCategory;
    const haystack = `${item.categoria} ${item.pergunta} ${item.resposta}`.toLowerCase();
    return matchesCat && haystack.includes(query);
  });

  const container = document.getElementById("faqContainer");
  if (filtered.length === 0) {
    container.innerHTML = `<div class="status-msg">Nenhuma pergunta encontrada para essa busca.</div>`;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <details class="faq-item">
      <summary>
        ${item.categoria ? `<span class="badge">${escapeHtml(item.categoria)}</span>` : ""}
        <span class="faq-question-text">${escapeHtml(item.pergunta)}</span>
      </summary>
      <div class="faq-answer">${escapeHtml(item.resposta).replace(/\n/g, "<br>")}</div>
    </details>
  `).join("");
}

function applyFaqCsvData(csvText) {
  allFaqItems = parseCSV(csvText).filter(item => item.pergunta && item.resposta);
  renderFaqFilters();
  renderFaq();
}

async function loadFaq() {
  if (!isCondomino) return;

  if (!FAQ_CSV_URL) {
    allFaqItems = FALLBACK_FAQ;
    renderFaqFilters();
    renderFaq();
    return;
  }

  const cachedFaq = localStorage.getItem(FAQ_CACHE_KEY);
  if (cachedFaq) {
    applyFaqCsvData(cachedFaq);
  }

  try {
    const response = await fetch(FAQ_CSV_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const freshCsv = await response.text();

    if (freshCsv && freshCsv !== cachedFaq) {
      localStorage.setItem(FAQ_CACHE_KEY, freshCsv);
      applyFaqCsvData(freshCsv);
    }
  } catch (err) {
    if (!cachedFaq) {
      document.getElementById("faqContainer").innerHTML = `
        <div class="status-msg">Não foi possível carregar o FAQ agora.</div>`;
    }
    console.error("Erro ao carregar FAQ CSV:", err);
  }
}

// =========================================================================
// INICIALIZAÇÃO
// =========================================================================
async function init() {
  loadFaq();

  if (!SHEET_CSV_URL) {
    document.getElementById("demoBanner").style.display = "block";
    allItems = FALLBACK_DATA;
    renderFilters();
    renderCards();
    return;
  }

  const cachedCsv = localStorage.getItem(CACHE_KEY);
  if (cachedCsv) {
    applyCsvData(cachedCsv);
  }

  try {
    const response = await fetch(SHEET_CSV_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const freshCsv = await response.text();

    if (freshCsv && freshCsv !== cachedCsv) {
      localStorage.setItem(CACHE_KEY, freshCsv);
      applyCsvData(freshCsv);
    }
  } catch (err) {
    if (!cachedCsv) {
      document.getElementById("cardsContainer").innerHTML = `
        <div class="status-msg">
          Não foi possível carregar o guia agora. Verifique se a planilha está publicada como CSV na web.
        </div>`;
    }
    console.error("Erro ao carregar CSV:", err);
  }
}

init();