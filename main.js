/* ============================================================
   QuartaClass · Dr. Felipe Belanda · LP de inscrição
   1) Formulário (não depende do GSAP; padrão lp-captura-black-rainnhas/script.js)
   2) Botões que levam ao formulário + CTA fixo do mobile
   3) Motion (GSAP 3.12.5 + ScrollTrigger). Sem JS ou com reduced-motion,
      a página fica estática e completa.
   ============================================================ */

/* ---------------- CONFIGURAÇÃO ---------------- */

// Endpoint n8n que recebe o cadastro (→ RD Station). AINDA NÃO DEFINIDO: perguntar ao Nil.
// Nunca reaproveitar o webhook de outra campanha (GUIA_FORMULARIOS, Passo 5).
const WEBHOOK_URL = 'https://n8n-altis-n8n-start.jd2z5l.easypanel.host/webhook/quartaclass';

// Página + versão, padrão GUIA "nome_da_pagina-vN".
const ORIGEM = 'quartaclass_felipe_belanda-v1';

// Grupo de WhatsApp da ação (único lugar onde vai o link do Zoom). AINDA NÃO EXISTE.
// Placeholder = sucesso sem redirecionamento e sem botão.
const GROUP_URL = 'https://sndflw.com/i/quartaclass';

// Evento enviado ao dataLayer (GTM) quando a inscrição é registrada.
const GTM_EVENT = 'lead_quartaclass_felipe';

const REDIRECT_DELAY = 1500;     // ms mínimos com a confirmação na tela
const REQUEST_TIMEOUT = 15000;   // ms de espera pelo webhook
const GTM_EVENT_TIMEOUT = 1200;  // ms de espera pelo GTM antes de redirecionar

// intl-tel-input: versão fixa (o CSS local em assets/vendor/ é desta mesma versão).
const ITI_BASE = 'https://cdn.jsdelivr.net/npm/intl-tel-input@26.9.2/build/js/';
const ITI_SRC = ITI_BASE + 'intlTelInputWithUtils.min.js';
const ITI_I18N_PT = ITI_BASE + 'i18n/pt/index.js';
const ITI_SLOW_HINT = 4000;

/* ---------------- UTILITÁRIOS ---------------- */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
const pageParams = new URLSearchParams(window.location.search);
// ?teste=1 → QA: não chama o webhook, não dispara o lead no GTM e não redireciona.
const TEST_MODE = pageParams.get('teste') === '1';
const isPlaceholder = function (s) { return !s || s.charAt(0) === '['; };

function getUTMParams() {
  const out = {};
  UTM_KEYS.forEach(function (k) { out[k] = pageParams.get(k) || ''; });
  return out;
}

function makeRequestId() {
  const c = window.crypto;
  try { if (c && typeof c.randomUUID === 'function') return c.randomUUID(); } catch (e) { /* contexto não seguro */ }
  if (c && typeof c.getRandomValues === 'function') {
    const b = c.getRandomValues(new Uint8Array(16));
    b[6] = (b[6] & 0x0f) | 0x40;
    b[8] = (b[8] & 0x3f) | 0x80;
    const h = Array.prototype.map.call(b, function (x) { return (x + 256).toString(16).slice(1); }).join('');
    return h.slice(0, 8) + '-' + h.slice(8, 12) + '-' + h.slice(12, 16) + '-' + h.slice(16, 20) + '-' + h.slice(20);
  }
  return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 12);
}
const REQUEST_ID = makeRequestId();

/* ---------------- FORMULÁRIO ---------------- */
(function captureForm() {
  const form = document.getElementById('captureForm');
  if (!form) return;

  const card = document.getElementById('inscricao');
  const nomeInput = document.getElementById('nome');
  const phoneInput = document.getElementById('whatsapp');
  const emailInput = document.getElementById('email');
  const payloadPhone = document.getElementById('telefone');
  const formErrorEl = document.getElementById('formError');
  const submitBtn = document.getElementById('submitBtn');
  const submitLabel = submitBtn.querySelector('.btn__label');
  const defaultLabel = submitLabel.innerHTML;
  const successEl = document.getElementById('formSuccess');
  const groupBtn = document.getElementById('groupBtn');

  // Mensagens (COPY.md §2)
  const MSG_NOME = 'Informe seu nome.';
  const MSG_PHONE = 'Informe o WhatsApp com DDD.';
  const MSG_EMAIL = 'Informe um e-mail válido.';
  const MSG_SEND = 'Não conseguimos registrar sua inscrição. Confira os dados e tente de novo.';
  const MSG_NOT_READY = 'Inscrições em configuração. Tente de novo em instantes.';

  // Campos ocultos padrão
  const utms = getUTMParams();
  UTM_KEYS.forEach(function (k) { const f = document.getElementById(k); if (f) f.value = utms[k]; });
  document.getElementById('url').value = window.location.href;
  document.getElementById('origem').value = ORIGEM;
  document.getElementById('request_id').value = REQUEST_ID;

  /* ---- intl-tel-input sob demanda; enquanto não chega, vale o fallback BR/PT ---- */
  let iti = null;

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      const s = document.createElement('script');
      s.src = src; s.async = true; s.crossOrigin = 'anonymous';
      s.onload = resolve;
      s.onerror = function () { reject(new Error('Falha ao carregar ' + src)); };
      document.head.appendChild(s);
    });
  }

  function loadPtStrings() {
    let p;
    try { p = import(ITI_I18N_PT).then(function (m) { return m.default || {}; }); }
    catch (e) { p = Promise.resolve({}); }
    return Promise.race([
      p.catch(function () { return {}; }),
      new Promise(function (r) { setTimeout(function () { r({}); }, 2500); })
    ]);
  }

  function initPhone(ptStrings) {
    if (typeof window.intlTelInput !== 'function') throw new Error('intlTelInput indisponível');
    const hadFocus = document.activeElement === phoneInput;
    iti = window.intlTelInput(phoneInput, {
      initialCountry: 'br',
      countryOrder: ['br', 'pt'],
      separateDialCode: true,
      nationalMode: true,
      allowedNumberTypes: ['MOBILE'],
      countryNameLocale: 'pt-BR',
      dropdownContainer: document.body,
      i18n: Object.assign({}, ptStrings, { searchPlaceholder: 'Pesquisar país ou DDI' })
    });
    phoneInput.setAttribute('placeholder', '(11) 99999-9999');
    phoneInput.addEventListener('countrychange', function () {
      if (phoneInput.getAttribute('aria-invalid') === 'true') setFieldError(phoneInput, phoneMessage());
    });
    if (hadFocus) phoneInput.focus({ preventScroll: true });
  }

  const slowHintTimer = setTimeout(function () { /* segue com o fallback, sem mudar o layout */ }, ITI_SLOW_HINT);
  Promise.all([loadScript(ITI_SRC), loadPtStrings()])
    .then(function (res) { initPhone(res[1]); })
    .catch(function (err) {
      iti = null;
      console.warn('intl-tel-input indisponível: validação simplificada (Brasil/Portugal).', err);
    })
    .finally(function () { clearTimeout(slowHintTimer); });

  // Fallback sem a lib: só celular BR/PT. 11 dígitos BR sem DDI são assumidos como +55.
  function fallbackCheck() {
    const digits = phoneInput.value.replace(/\D/g, '').replace(/^00/, '');
    if (digits.indexOf('55') === 0 && (digits.length === 12 || digits.length === 13)) {
      const br = digits.slice(2);
      if (/^\d{2}9\d{8}$/.test(br)) return { e164: '+55' + br };
      return { error: MSG_PHONE };
    }
    if (digits.indexOf('351') === 0 && digits.length === 12) {
      const pt = digits.slice(3);
      if (/^9\d{8}$/.test(pt)) return { e164: '+351' + pt };
      return { error: MSG_PHONE };
    }
    if (/^\d{2}9\d{8}$/.test(digits)) return { e164: '+55' + digits };
    return { error: MSG_PHONE };
  }

  function phoneMessage() {
    if (!phoneInput.value.trim()) return MSG_PHONE;
    if (!iti) return fallbackCheck().error || '';
    return iti.isValidNumberPrecise() ? '' : MSG_PHONE; // fixo também cai aqui (allowedNumberTypes: MOBILE)
  }
  function nomeMessage() { return nomeInput.value.trim() ? '' : MSG_NOME; }
  function emailMessage() {
    if (emailInput.validity.valueMissing || emailInput.validity.typeMismatch) return MSG_EMAIL;
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailInput.value.trim()) ? '' : MSG_EMAIL;
  }

  function setFieldError(field, msg) {
    const el = document.getElementById(field.id + 'Error');
    el.textContent = msg || '';
    if (msg) field.setAttribute('aria-invalid', 'true');
    else field.removeAttribute('aria-invalid');
  }

  const checks = [
    { field: nomeInput, message: nomeMessage },
    { field: phoneInput, message: phoneMessage },
    { field: emailInput, message: emailMessage }
  ];

  function validate() {
    let firstInvalid = null;
    checks.forEach(function (c) {
      const msg = c.message();
      setFieldError(c.field, msg);
      if (msg && !firstInvalid) firstInvalid = c.field;
    });
    return firstInvalid;
  }

  checks.forEach(function (c) {
    c.field.addEventListener('blur', function (e) {
      // indo para o botão, o submit valida tudo (a mensagem não empurra o botão antes do clique)
      if (e.relatedTarget === submitBtn) return;
      setTimeout(function () {
        if (c.field.value.trim() && document.activeElement !== c.field) setFieldError(c.field, c.message());
      }, 180);
    });
    c.field.addEventListener('input', function () {
      formErrorEl.textContent = '';
      if (c.field.getAttribute('aria-invalid') === 'true' && !c.message()) setFieldError(c.field, '');
    });
  });

  function setLoading(on) {
    submitBtn.disabled = on;
    submitBtn.classList.toggle('is-loading', on);
    submitBtn.setAttribute('aria-busy', on ? 'true' : 'false');
    if (on) submitLabel.textContent = 'Enviando...';
    else submitLabel.innerHTML = defaultLabel;
  }

  function buildGroupUrl() {
    if (isPlaceholder(GROUP_URL)) return '';
    try {
      const u = new URL(GROUP_URL);
      UTM_KEYS.forEach(function (k) { if (utms[k]) u.searchParams.set(k, utms[k]); });
      return u.toString();
    } catch (e) { return GROUP_URL; }
  }

  function trackLead(done) {
    let called = false;
    const finish = function () { if (called) return; called = true; if (done) done(); };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: GTM_EVENT, origem: ORIGEM, request_id: REQUEST_ID,
      eventCallback: finish, eventTimeout: GTM_EVENT_TIMEOUT
    });
    setTimeout(finish, GTM_EVENT_TIMEOUT + 300);
  }

  function showSuccess() {
    // o cartão não encolhe: a mensagem aparece no mesmo lugar do formulário
    card.style.minHeight = card.offsetHeight + 'px';
    card.classList.add('is-done');
    form.hidden = true;
    successEl.hidden = false;

    const groupUrl = buildGroupUrl();
    if (groupUrl) { groupBtn.href = groupUrl; groupBtn.hidden = false; }
    else groupBtn.hidden = true;
    successEl.focus({ preventScroll: true });

    if (TEST_MODE) { console.info('[teste] inscrição simulada, sem webhook, sem GTM e sem redirecionamento.'); return; }

    const shownAt = Date.now();
    trackLead(groupUrl ? function () {
      const wait = Math.max(0, REDIRECT_DELAY - (Date.now() - shownAt));
      setTimeout(function () { window.location.href = groupUrl; }, wait);
    } : null);
  }

  let sending = false;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (sending) return;
    formErrorEl.textContent = '';

    const firstInvalid = validate();
    if (firstInvalid) { firstInvalid.focus(); return; }

    payloadPhone.value = iti ? iti.getNumber() : fallbackCheck().e164;
    document.getElementById('timestamp').value = new Date().toISOString();
    document.getElementById('url').value = window.location.href;

    const data = Object.fromEntries(new FormData(form).entries());
    data.nome = data.nome.trim().replace(/\s+/g, ' ');
    data.email = data.email.trim();

    // Webhook ainda não configurado: só o modo de teste segue.
    if (TEST_MODE) {
      console.info('[teste] payload:', data);
      sending = true; setLoading(true);
      setTimeout(function () { setLoading(false); showSuccess(); }, 600);
      return;
    }
    if (isPlaceholder(WEBHOOK_URL)) {
      console.error('WEBHOOK_URL não configurado em main.js: inscrição não enviada.');
      formErrorEl.textContent = MSG_NOT_READY;
      return;
    }

    sending = true;
    setLoading(true);
    const controller = 'AbortController' in window ? new AbortController() : null;
    const timeoutId = controller ? setTimeout(function () { controller.abort(); }, REQUEST_TIMEOUT) : null;
    let delivered = false;

    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal: controller ? controller.signal : undefined
    })
      .then(function (res) {
        if (!res.ok) throw new Error('Webhook respondeu com status ' + res.status);
        delivered = true;
      })
      .catch(function (err) {
        console.error('Falha ao enviar inscrição:', err);
        formErrorEl.textContent = MSG_SEND;
        setLoading(false);
      })
      .finally(function () {
        if (timeoutId) clearTimeout(timeoutId);
        if (!delivered) { sending = false; return; }
        try { showSuccess(); }
        catch (err) { console.error('Inscrição enviada, mas a confirmação falhou:', err); }
      });
  });

  /* ---- Botões que levam ao formulário (faixa azul, CTA final, CTA fixo) ---- */
  function goToForm() {
    card.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    const target = form.hidden ? successEl : nomeInput;
    let done = false;
    const focusIt = function () { if (done) return; done = true; target.focus({ preventScroll: true }); };
    if ('onscrollend' in window) window.addEventListener('scrollend', focusIt, { once: true });
    setTimeout(focusIt, reduceMotion ? 0 : 700);
  }
  document.querySelectorAll('[data-to-form]').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); goToForm(); });
  });
  if (window.location.hash === '#inscricao') {
    window.addEventListener('load', function () { nomeInput.focus({ preventScroll: true }); });
  }

  /* ---- CTA fixo (mobile): aparece quando o cartão sai por cima; some no CTA final e no rodapé ---- */
  const sticky = document.getElementById('sticky-cta');
  if (sticky && 'IntersectionObserver' in window) {
    const stickyLink = sticky.querySelector('a');
    let pastCard = false;
    const zones = new Set();
    const sync = function () {
      const show = pastCard && zones.size === 0;
      sticky.classList.toggle('is-visible', show);
      sticky.setAttribute('aria-hidden', show ? 'false' : 'true');
      stickyLink.tabIndex = show ? 0 : -1;
    };
    new IntersectionObserver(function (entries) {
      const e = entries[0];
      pastCard = !e.isIntersecting && e.boundingClientRect.top < 0;
      sync();
    }).observe(card);
    const zoneObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { e.isIntersecting ? zones.add(e.target) : zones.delete(e.target); });
      sync();
    }, { threshold: 0.1 });
    [document.getElementById('cta-final'), document.querySelector('.site-footer')].forEach(function (z) { if (z) zoneObs.observe(z); });
  }
})();

/* ---------------- MOTION ---------------- */
(function motion() {
  const root = document.documentElement;
  if (reduceMotion || !window.gsap || !window.ScrollTrigger) {
    root.classList.remove('js-motion');
    return;
  }
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);
  root.classList.add('motion-ready');
  const EASE = 'power3.out';

  // Hero: título por linha, apoio em fade. O form-card nunca recebe opacidade.
  gsap.timeline({ defaults: { ease: EASE } })
    .fromTo('[data-hero-line]', { yPercent: 105, opacity: 1 }, { yPercent: 0, duration: 1.05, stagger: 0.12 })
    .fromTo('[data-hero-reveal]', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, clearProps: 'transform' }, 0.25)
    .fromTo('.hero__img', { opacity: 0, scale: 1.03 }, { opacity: 1, scale: 1, duration: 1.4, transformOrigin: '50% 100%', clearProps: 'transform' }, 0.1)
    .fromTo('.hero__arch', { scaleY: 0.86, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 1.3, clearProps: 'transform' }, 0)
    .fromTo('.form-card__rings', { rotation: 0, scale: 0.96 }, { rotation: 8, scale: 1, duration: 1.6 }, 0);

  const mm = gsap.matchMedia();
  mm.add('(min-width: 860px)', function () {
    gsap.utils.toArray('[data-split]').forEach(function (h) {
      gsap.from(h.querySelectorAll('.ln > *'), {
        yPercent: 105, duration: 1, ease: EASE, stagger: 0.12,
        scrollTrigger: { trigger: h, start: 'top 85%', once: true }
      });
    });
    gsap.utils.toArray('[data-reveal]').forEach(function (el) {
      gsap.from(el, { opacity: 0, y: 26, duration: 0.9, ease: EASE, scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    });
    gsap.utils.toArray('[data-stagger]').forEach(function (group) {
      gsap.from(group.children, {
        opacity: 0, y: 36, duration: 0.9, ease: EASE, stagger: 0.12, clearProps: 'transform',
        scrollTrigger: { trigger: group, start: 'top 85%', once: true }
      });
    });
    gsap.utils.toArray('[data-draw]').forEach(function (svg, i) {
      gsap.fromTo(svg.querySelectorAll('[pathLength]'), { strokeDasharray: 1, strokeDashoffset: 1 }, {
        strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut', stagger: 0.14, delay: 0.25 + i * 0.12,
        clearProps: 'strokeDasharray,strokeDashoffset',
        scrollTrigger: { trigger: svg.closest('.cards-4') || svg, start: 'top 85%', once: true }
      });
    });
  });
  mm.add('(max-width: 859px)', function () {
    gsap.utils.toArray('[data-split]').forEach(function (h) {
      gsap.from(h.querySelectorAll('.ln > *'), {
        yPercent: 105, duration: 0.7, ease: EASE, stagger: 0.08,
        scrollTrigger: { trigger: h, start: 'top 92%', once: true }
      });
    });
    gsap.utils.toArray('[data-reveal]').forEach(function (el) {
      gsap.from(el, { opacity: 0, y: 22, duration: 0.6, ease: EASE, scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
    });
    gsap.utils.toArray('[data-stagger]').forEach(function (group) {
      Array.prototype.forEach.call(group.children, function (el, i) {
        gsap.from(el, {
          opacity: 0, y: 28, duration: 0.6, ease: EASE, clearProps: 'transform', delay: Math.min(i % 2, 1) * 0.06,
          scrollTrigger: { trigger: el, start: 'top 92%', once: true }
        });
      });
    });
    gsap.utils.toArray('[data-draw]').forEach(function (svg) {
      gsap.fromTo(svg.querySelectorAll('[pathLength]'), { strokeDasharray: 1, strokeDashoffset: 1 }, {
        strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut', stagger: 0.1, delay: 0.15,
        clearProps: 'strokeDasharray,strokeDashoffset',
        scrollTrigger: { trigger: svg, start: 'top 90%', once: true }
      });
    });
  });

  // Lista numerada: barra de progresso por scroll e item ativo
  const phaseList = document.querySelector('[data-phases]');
  if (phaseList) {
    const phases = Array.prototype.slice.call(phaseList.querySelectorAll('.phase'));
    const bars = phases.map(function (p) { return p.querySelector('.phase__bar span'); });
    const n = phases.length;
    const setProgress = function (p) {
      const pos = Math.min(p * n, n - 0.0001);
      const idx = Math.floor(pos);
      phases.forEach(function (ph, i) {
        ph.classList.toggle('is-active', i === idx);
        gsap.set(bars[i], { scaleX: i < idx ? 1 : i === idx ? pos - idx : 0 });
      });
    };
    setProgress(0);
    ScrollTrigger.create({
      trigger: phaseList, start: 'top 70%', end: 'bottom 45%',
      onUpdate: function (self) { setProgress(self.progress); },
      onLeave: function () { setProgress(1); }
    });
  }

  // Parallax leve (anéis e blocos da faixa)
  gsap.utils.toArray('[data-parallax]').forEach(function (el) {
    const amount = parseFloat(el.getAttribute('data-parallax')) || 0;
    gsap.fromTo(el, { y: -amount / 2 }, {
      y: amount / 2, ease: 'none',
      scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });

  // Símbolo gira devagar com o scroll
  gsap.utils.toArray('[data-spin]').forEach(function (el) {
    gsap.fromTo(el, { rotation: -14, yPercent: 6 }, {
      rotation: 14, yPercent: -6, ease: 'none',
      scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: 1 }
    });
  });

  // Foto do professor abre de dentro da moldura
  gsap.utils.toArray('.teacher__photo picture').forEach(function (pic) {
    const frame = pic.parentElement;
    gsap.fromTo(frame, { clipPath: 'inset(10% 8% 10% 8% round 14px)' }, {
      clipPath: 'inset(0% 0% 0% 0% round 14px)', duration: 1.2, ease: 'power3.inOut', clearProps: 'clipPath',
      scrollTrigger: { trigger: frame, start: 'top 88%', once: true }
    });
    gsap.fromTo(pic, { scale: 1.14 }, {
      scale: 1, duration: 1.6, ease: 'power3.out', clearProps: 'transform',
      scrollTrigger: { trigger: frame, start: 'top 88%', once: true }
    });
  });

  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
