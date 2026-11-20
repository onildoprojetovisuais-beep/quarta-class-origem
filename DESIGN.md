# DESIGN · LP de inscrição · QuartaClass Dr. Felipe Belanda (25/11/2026)

Sistema visual da página de captura. Ele herda o conceito da LP de vendas `ALTIS/lp-neurodesenvolvimento-infantil/` (que é só leitura e não deve ser alterada) e segue a stack `00-STACK`. Texto: `COPY.md`. Fotos: `assets/IMAGENS.md`, de outro agente.

Leitura de origem: `README.md`, `styles.css` (1.130 linhas), `main.js`, `index.html` e `assets/` da LP de referência. Screenshots do hero de referência em desktop (1440x900, 1280x600) e mobile (360x640, 390x844), salvos fora do projeto.

**Stack (00-STACK).** `02`–`07` ainda não têm componentes ou recipes promovidos, só os READMEs de critério. O que vale da stack aqui são os princípios de `DESIGN-PRINCIPLES.md`: mobile como caso de uso, reduced-motion como alternativa real, performance como critério de aceite e "menos, mas testado". Também vale o `QUALITY-CHECKLIST.md`: animação sem sobrepor texto, sem colidir com header, sem pin morto, testado em mobile e desktop, e bibliotecas na versão atual. Por isso a base técnica é a LP de referência, que já foi validada em produção. A stack entra como filtro.

---

## 0. Decisões-chave (resumo)

1. **O formulário fica no hero em todas as 10 telas**, inclusive em 360x640. Não usamos botão que abre pop-up nem botão que rola até o formulário. Isso tira um passo do funil Instagram → inscrição, e as contas da §4 mostram que cabe.
2. **O cartão do formulário é navy com anéis**: a mesma linguagem do `.price-card` da referência, que lá era o "cartão da decisão". O botão é `btn--light`, creme sobre navy, com contraste de 10,75:1.
3. **Retrato recortado do Dr. Felipe** (`hero-felipe-cor-752`, 752x940, PNG/WebP com alfa). Em ≥1200px ele fica entre o texto e o formulário, e o cartão passa por cima da borda direita do retrato. É a lógica do `.float-card` da referência, agora aplicada ao formulário. De 860 a 1199px o retrato sai do hero e o selo (avatar + nome + CRM) assume. No mobile o retrato entra **abaixo** do formulário.
4. **Um formulário só.** O CTA final e o CTA fixo do mobile levam a `#inscricao` e dão foco no campo Nome. Assim não há IDs duplicados nem dois envios para manter.
5. **O formulário nunca nasce invisível.** O motion anima o título e os elementos de apoio. O cartão do formulário não recebe estado inicial `opacity: 0`, para que um GSAP lento nunca esconda a conversão.
6. **Envio** no padrão das LPs de captura ALTIS mais recentes (`lp-captura-black-rainnhas/script.js`): POST JSON para o webhook n8n, intl-tel-input para WhatsApp BR/PT em E.164, 8 campos ocultos + `request_id`, evento no GTM e depois redirecionamento ao grupo com as UTMs (§9).
7. **Header estático e mínimo**: só o logo do produto, sem navegação e sem botão, porque o formulário já está na dobra. Libera altura para a dobra.

---

## 1. Assets copiados (feito)

Origem: `D:\Projetos ClaudeCode\ALTIS\lp-neurodesenvolvimento-infantil\assets\` (salvo a última linha). Destino: `D:\Projetos ClaudeCode\ALTIS\lp-quartaclass-felipe\assets\`. A cópia usou `cp -n` (nada existente foi sobrescrito) e não incluiu fotos de pessoas.

| Destino (`lp-quartaclass-felipe/`) | Origem | Uso |
|---|---|---|
| `assets/fonts/RizomaM-Regular.woff2` | `…/assets/fonts/RizomaM-Regular.woff2` | Títulos (preload) |
| `assets/fonts/RizomaM-Italic.woff2` | `…/assets/fonts/RizomaM-Italic.woff2` | Acento em itálico |
| `assets/fonts/Helvetica.woff2` | `…/assets/fonts/Helvetica.woff2` | Corpo |
| `assets/fonts/Helvetica-Bold.woff2` | `…/assets/fonts/Helvetica-Bold.woff2` | Corpo bold, botões, labels |
| `assets/favicon.svg`, `favicon.ico`, `favicon-32.png` | `…/assets/` | Favicon (símbolo do produto, navy sobre creme) |
| `assets/apple-touch-icon-180.png`, `icon-192.png`, `icon-512.png` | `…/assets/` | Touch icon / PWA |
| `assets/img/logo-altis-vertical.svg` (888x840, fill `#FBF7EE`) | `…/assets/img/logo-altis-vertical.svg` | Rodapé ALTIS (fundo escuro) |
| `assets/img/logo-horizontal-navy.svg` (3036x493) | `…/assets/img/logo-horizontal-navy.svg` | Header (sobre creme) |
| `assets/img/logo-horizontal-creme.svg` | `…/assets/img/logo-horizontal-creme.svg` | Reserva, para sobre navy |
| `assets/img/logo-simbolo-navy.svg` (1288x1472) | `…/assets/img/logo-simbolo-navy.svg` | Símbolo do conceito (marca d'água ou máscara) |
| `assets/img/logo-simbolo-creme.svg` | `…/assets/img/logo-simbolo-creme.svg` | Símbolo sobre navy (CTA final) |
| `assets/img/textura-aneis-crescimento.svg` (1200x1200; traço `#708C9B`/`#B99A60`) | `…/assets/img/textura-aneis-crescimento.svg` | Anéis: hero, cartão do formulário, CTA final |
| `assets/img/textura-linhas-vinculo.svg` (1600x400) | `…/assets/img/textura-linhas-vinculo.svg` | Fios na faixa azul |
| `assets/vendor/intl-tel-input/css/intlTelInput.min.css` + `img/flags.webp`, `img/flags@2x.webp` | `ALTIS/lp-captura-black-rainnhas/assets/vendor/intl-tel-input/` | CSS e bandeiras locais do seletor de DDI (v26.9.2; o JS vem do jsDelivr na mesma versão) |

Não copiados: `logo-altis-vertical-escuro.svg` (fill `#10281B`, para fundo claro, não usado) e todas as fotos (`hero-ana-felipe-*`, `professor-*`, `avatar-ana-*` etc.).

Fotos do Felipe já presentes em `assets/img/` (trabalho do outro agente), usadas neste documento:
- `hero-felipe-cor-{480,752}.{webp,png}`: recorte com alfa, 752x940 (4:5). **Hero.**
- `bloco-felipe-palco-{cor,pb}-{320,640}.{webp,jpg}`: 640x800 (4:5). **"Quem dá a aula".**
- `avatar-felipe-cor-{96,192}.{webp,png}`: **selo** do hero (860–1199) e CTA fixo, se for usado.
- Variantes `-pb` e `hero-alt-*`: reserva. A escolha final cabe a quem monta a página, seguindo o `IMAGENS.md`.

> ⚠️ **Confirmar com o Nil:** o header usa o logo do **produto** ("Neurodesenvolvimento Materno e Infantil"). Ele amarra a aula ao curso que é oferecido no fim. Se a preferência for uma assinatura neutra, a alternativa é tirar o header e deixar só o rodapé ALTIS. O logo não cita a Ana.

---

## 2. Tokens (copiados da referência, `styles.css` linhas 6–32)

Colar sem alteração. Os únicos tokens novos estão marcados com `/* novo */`.

```css
@font-face { font-family: "Rizoma"; src: url("assets/fonts/RizomaM-Regular.woff2") format("woff2"); font-weight: 400; font-style: normal; font-display: swap; }
@font-face { font-family: "Rizoma"; src: url("assets/fonts/RizomaM-Italic.woff2") format("woff2"); font-weight: 400; font-style: italic; font-display: swap; }
@font-face { font-family: "Helvetica ALTIS"; src: url("assets/fonts/Helvetica.woff2") format("woff2"); font-weight: 400; font-style: normal; font-display: swap; }
@font-face { font-family: "Helvetica ALTIS"; src: url("assets/fonts/Helvetica-Bold.woff2") format("woff2"); font-weight: 700; font-style: normal; font-display: swap; }

:root {
  --cream: #F4EFE6;
  --paper: #FBF8F2;          /* superfície de card, um tom acima do creme */
  --sand: #EAE3D6;           /* linhas e divisórias */
  --blue: #708C9B;           /* azul sereno, só em área grande / texto grande */
  --blue-ink: #546F7E;       /* azul legível em texto sobre creme (AA 4.6:1) */
  --blue-soft: #9FB4BF;      /* azul claro sobre navy (AA 5.7:1) */
  --navy: #18384B;
  --navy-deep: #0F2433;
  --gold: #B99A60;           /* acento: só decorativo ou sobre navy */
  --ink: #18384B;
  --ink-2: #4A6272;          /* texto secundário sobre creme (AA 5.6:1) */
  --line: rgba(24, 56, 75, .14);

  --font-title: "Rizoma", "Helvetica ALTIS", Georgia, serif;
  --font-body: "Helvetica ALTIS", "Helvetica Neue", Helvetica, Arial, sans-serif;

  --gutter: clamp(16px, 4vw, 48px);
  --maxw: 1240px;
  --radius: 22px;
  --radius-sm: 14px;
  --shadow: 0 24px 60px -28px rgba(24, 56, 75, .35);
  --header-h: 64px;                      /* novo valor: header mínimo (ref.: 76/88) */

  --error: #A3271F;                      /* novo: erro sobre paper (6,9:1) */
  --error-on-dark: #F2B8B0;              /* novo: erro sobre navy (7,2:1) */
  --field-h: 56px;                       /* novo: campo com label interna */
}
@media (min-width: 860px) { :root { --header-h: 72px; } }
```

Base global: copiar as linhas 34–56 da referência (reset, `body` creme/navy, `.container`, `.skip-link`, `:focus-visible` navy). Na linha 56, a regra de contraste do foco ganha `.form-card :focus-visible` e `.final :focus-visible` com `outline-color: var(--cream)`.

**Contrastes conferidos** (WCAG): creme/navy 10,75 · `--blue-soft`/navy 5,72 · `--gold`/navy 4,6 (ok para texto ≥14px bold ou grande) · `--ink-2`/paper 6,04 · `--blue-ink`/paper 5,01 · `--error`/paper 6,91 · `--error-on-dark`/navy 7,19. **Proibido:** dourado em texto sobre creme (2,33) e creme sobre `--blue` em texto pequeno (3,1; só em título grande, como na referência).

**Dosagem de cor** (como na referência): fundo creme dominante. Navy em texto, cartão do formulário, CTA final e rodapé (`--navy-deep`). Azul sereno só na faixa "Por que assistir ao vivo". Dourado só em traços (eyebrow, ponto pulsante, sublinhado do nome, anéis).

---

## 3. Tipografia e escala

| Papel | Fonte | Desktop (≥860) | Mobile (≤859) | Origem |
|---|---|---|---|---|
| H1 hero | Rizoma uppercase, `line-height: 1.02`, `letter-spacing: .02em` | `min(4.6vw, 8.6vh, 4.2rem)`: 3 linhas em 1280x600 (≈52px) | `clamp(1.75rem, 8.2vw, 2.4rem)`: ≈30px em 360, 4 linhas | `.h2, .hero__title` l.68; escala mobile l.476 adaptada (H1 mais longo que o da ref.) |
| Acento do H1 | Rizoma Italic, `text-transform: none`, `color: var(--blue-ink)` | trecho `primeiros mil dias` em `<em>` | idem | `.h2 em, .hero__title em` l.70 |
| H2 | Rizoma uppercase | `clamp(2rem, 4.2vw, 3.5rem)` | `clamp(1.75rem, 7.4vw, 2.4rem)` | l.69 / l.477 |
| Título do cartão (form) | Rizoma uppercase 1.35rem | — | 1.2rem | derivado de `.card__title` l.198 |
| Título de card / item | Rizoma uppercase `.03em` | 1.2rem | 1.1rem | `.card__title` |
| Lead / sub | Helvetica | `clamp(1rem, 1.3vw, 1.125rem)`, `--ink-2` | 1rem | `.lead` l.75 |
| Corpo | Helvetica | 1rem / 1.6 | 1rem / 1.55 (mínimo 16px) | body |
| Eyebrow | Helvetica bold, `.74rem` (12px no mobile), `.14em`, uppercase, traço dourado `::before` 22px | | sem traço e em 1 linha ≤599 | `.eyebrow` l.64–66 + l.492–499 |
| Labels de campo | Helvetica bold `.75rem`, `.08em`, uppercase, `--ink-2` | | igual (12px) | novo (§5.4) |
| Microcopy / legal | Helvetica `.8125rem` (13px), mínimo 12px | | | `.price-card__safe` |

**Quebra de linha (regra permanente do Nil: nunca deixar palavra órfã nem preposição no fim da linha):**
- `text-wrap: balance` em H1, H2, títulos de card, `.band__text` e eyebrow centralizado. `text-wrap: pretty` em parágrafos, itens de lista, bio, microcopy e mensagens do formulário. Aplicar **em todas as larguras** (a referência só aplicava no mobile, l.479–482; aqui vale globalmente).
- `&nbsp;` exatamente como marcado no `COPY.md`, como `O&nbsp;que acontece nos primeiros mil&nbsp;dias do&nbsp;seu&nbsp;filho`, `19h&nbsp;(Brasil)`, `Dr.&nbsp;Felipe&nbsp;Belanda` e `CREMERS&nbsp;43994`.
- Quebra do H1 por sentido no desktop: `O que acontece nos primeiros / mil dias do seu filho`. Usar dois `.ln`, porque o motion já anima por linha (`.ln` l.73). No mobile os `.ln` continuam `display:block`, então a frase pode ter 4 linhas visuais dentro de 2 blocos. Conferir no render se nenhum bloco termina em "nos" ou "do".
- Conferir com Playwright nas 10 telas: screenshot de cada seção e leitura linha a linha.

---

## 4. Arquitetura da página e a primeira dobra

```
[skip-link]
header (estático, só o logo)                       64 / 72px
#topo  HERO ── copy (eyebrow, H1, sub, data) │ retrato │ FORM-CARD #inscricao
§2  Na aula, você vai entender (3 itens numerados, com barra de progresso)
§3  Para quem é (4 cards com ícone de traço)
§4  Quem dá a aula (retrato 4:5 + bio, cartão .teacher)
§5  Por que assistir ao vivo (faixa azul com blocos e fios) + botão → #inscricao
§6  CTA final navy com anéis + símbolo + botão → #inscricao
§7  Nota legal (disclaimer, faixa creme fina)
footer padrão ALTIS (§8.3)
[CTA fixo mobile]   [scripts]
```

### 4.1 Por que o formulário vai no hero também no mobile

Comparei três caminhos: (a) botão no hero que abre pop-up, que é o padrão da Black das Rainhas; (b) botão que rola até o formulário; (c) formulário compacto no próprio hero. Fiquei com **(c)**:
- O formulário tem só 3 campos. O lead já chega do Instagram decidido a se inscrever, e qualquer clique intermediário perde gente.
- Com label interna (§5.4), o bloco de campos mede 3×56 + 2×8 = **184px**, e cabe com o H1 inteiro em 360x640 (conta abaixo).
- O pop-up exige foco preso, `inert`, Esc e intl-tel-input fora do container. É complexidade sem ganho numa página curta.
- A regra do Nil diz "CTA/formulário do hero visível sem rolar". A opção (c) cumpre a forma mais forte: **o botão de envio** fica na dobra.

**Critério de aceite:** em cada uma das 10 telas, `#submitBtn.getBoundingClientRect().bottom ≤ innerHeight - 8`, medido com Playwright, sem rolar e com as fontes carregadas.

### 4.2 Conta da dobra · 360x640 (o pior caso de altura × largura)

| Bloco | Altura |
|---|---|
| Header (logo 26px de altura, padding vertical) | 56 (`--header-h` 56 em ≤420) |
| Respiro superior do hero | 14 |
| Eyebrow 12px, 1 linha (`QuartaClass · Aula ao vivo e gratuita`), margem 10 | 28 |
| H1 30px × 4 linhas × 1.02 | ≈124 |
| Margem | 12 |
| Linha de data compacta (2 linhas × 20px, 14px bold): `Qua, 25/11 · 19h (Brasil) \| 22h (Portugal)` / `Ao vivo no Zoom · Gratuito` | 44 |
| Margem | 14 |
| Form-card: padding-top 16 + título "Garanta a sua vaga" (1 linha 22px + "Inscrição gratuita" na mesma linha, à direita, em pill) 26 + 10 | 52 |
| Campos 3×56 + 2×8 | 184 |
| Gap + botão 52 | 62 |
| **Fundo do botão** | **≈590px** (folga de ≈50px) |

No mobile o **subtítulo não entra** acima do formulário. Ele desce para logo abaixo do cartão, junto com o retrato e o selo. Consentimento e microcopy do grupo ficam dentro do cartão, abaixo do botão, e podem cair abaixo da dobra (o botão é o que se mede). Em 375x667, 390x844 e 414x736 sobra mais espaço. Em 390 e 414 o H1 pode subir para 3 linhas.

Ordem no mobile (≤859): eyebrow → H1 → data → **form-card** → sub → retrato (recorte, 88% da largura, com o selo `Dr. Felipe Belanda / Médico · CREMERS 43994` sobreposto embaixo, como o `.float-card` da ref.) → §2…
Implementação: `.hero__copy { display: contents }` no mobile + `order`, a mesma técnica da oferta na referência (l.606–613). O DOM fica na ordem do desktop, que já é lógica para leitor de tela: copy → formulário.

Tablet retrato (768x1024): o mesmo empilhamento, com H1 em 2–3 linhas e o form-card com `max-width: 520px`. O botão fica em ≈700px.

### 4.3 Conta da dobra · 1280x600 (o pior caso no desktop)

O header tem 72px, então o hero dispõe de 528px. Grid ≥1200: `grid-template-columns: minmax(0, 1fr) minmax(340px, 380px); gap: 32px`.

| Coluna do texto (≈772px de largura útil, texto limitado a 34ch ≈ 520px) | Altura |
|---|---|
| Eyebrow | 30 |
| H1 ≈50px × 3 linhas | 155 |
| Sub, 2 frases, 15px/1.5 (`max-height:700` reduz como na ref. l.180) | 68 |
| Data em 3 itens com ícone (1 linha cada, ou 2 colunas) | 70 |
| Margens | 60 |
| **Total** | ≈385 (centralizado verticalmente) |

| Form-card (380px) | Altura |
|---|---|
| Padding 22 + título 30 + linha de apoio 20 + 14 | 86 |
| Campos | 184 |
| Gap 12 + botão 52 | 64 |
| **Fundo do botão, a partir do topo do cartão** | 334 → no hero, com o cartão centrado: ≈96 + 334 = **430 + 72 de header = 502px** ✔ |
| Consentimento + microcopy (3 linhas de 13px) | 58 (o cartão inteiro ≈420px) |

**Retrato em ≥1200:** `.hero__portrait { position:absolute; bottom:0; height: 92%; right: calc(380px + 32px - 64px) }`. Ele fica alinhado embaixo, à direita da coluna de texto, e o form-card passa **≈64px por cima da borda direita do retrato** (como o `.float-card` passava sobre o casal). Com 528 × 0,92 ≈ 486px de altura, ele tem ≈389px de largura e cabe no espaço livre de ≈250px + 64 de sobreposição + o ar que sobra do texto. O rosto fica no terço superior do PNG e não é coberto. Validar no render: se o rosto encostar no cartão, aumentar `right`.

**860–1199px** (inclui 1024x768): 2 colunas `minmax(0,1fr) minmax(320px, 360px)`, **sem retrato no hero**. No lugar dele entra o **selo** abaixo da data: avatar 40px (`avatar-felipe-cor-96/192`) + `Dr. Felipe Belanda · Médico · CREMERS 43994`, padrão `.hero__proof` + `.avatars` (l.127–135). O retrato completo aparece em §4.

**1366x657, 1440x900, 1920x940:** o mesmo layout ≥1200. Em telas com `max-height: 700px` aplicam-se as reduções (sub .95rem, gaps menores, l.178–181 da ref.). Em 1920 o container trava em 1240px.

Os anéis (`.hero__rings`, l.123 + l.172) ficam atrás do retrato, à direita, com opacidade .5 e `data-parallax="-60"`.

---

## 5. Componentes (o que reaproveitar e onde está na referência)

Os números de linha se referem a `lp-neurodesenvolvimento-infantil/styles.css`. Copiar a regra e adaptar só o que está indicado.

### 5.1 Botões (l.78–95 + `:active` touch l.632–637)
- `.btn`, `.btn--solid` (navy, usado nas seções creme), `.btn--light` (creme sobre navy: **submit do form** e CTA final), `.btn--block`. Altura mínima de 52px.
- **Submit:** `.btn.btn--light.btn--block` com `<span class="btn__label">` + `<span class="btn__spinner" aria-hidden="true">`. O spinner é um anel CSS de 18px, `border: 2px solid currentColor; border-right-color: transparent`, girando só com `prefers-reduced-motion: no-preference`. Estado `.is-loading` + `aria-busy`, padrão Black das Rainhas.
- Hover em touch desligado (l.632–637).

### 5.2 Eyebrow (l.64–66, mobile l.492–499, l.558–560)
Traço dourado de 22px antes do texto. No hero mobile fica sem traço e em 1 linha. Nas seções centralizadas no mobile, o traço vai em cima.
**Pill "Ao vivo":** variação nova para a linha de data, com ponto dourado pulsante (`.float-card__dot` + `@keyframes dot-pulse`, l.147–162). O ponto só pulsa com `.motion-ready` e sem reduced-motion. É o único elemento em loop da página e tem significado: é ao vivo.

### 5.3 Form-card (novo, derivado de `.price-card` l.375–389)
```css
.form-card { position: relative; overflow: hidden; isolation: isolate; z-index: 3;
  padding: clamp(18px, 2.4vw, 26px); border-radius: 24px;
  background: var(--navy); color: var(--cream);
  box-shadow: 0 40px 80px -40px rgba(15, 36, 51, .7); }
.form-card__rings { position: absolute; z-index: -1; width: 120%; max-width: none;
  right: -55%; top: -45%; opacity: .35; pointer-events: none; } /* = .price-card__rings */
.form-card__title { font-family: var(--font-title); text-transform: uppercase; letter-spacing: .03em;
  font-size: clamp(1.2rem, 1.6vw, 1.35rem); line-height: 1.15; margin: 0; }
.form-card__free { font-size: .75rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--blue-soft); }
.form-card__note { margin: 12px 0 0; font-size: .8125rem; line-height: 1.45; color: var(--blue-soft); text-wrap: pretty; }
.form-card__note a { color: var(--cream); }
```
Cabeçalho do cartão: título à esquerda e "Inscrição gratuita" à direita (`display:flex; justify-content:space-between; align-items:baseline; flex-wrap:wrap`). No mobile ficam na mesma linha para economizar altura.

### 5.4 Campos com label interna (novo; acessível, compacto)
Label real `<label for>`, **sempre visível** e pequena no topo do campo. Não é placeholder-only nem label flutuante animada. Placeholder só como exemplo (`(11) 99999-9999`).
```css
.field { position: relative; }
.field__label { position: absolute; left: 16px; top: 8px; z-index: 2; pointer-events: none;
  font-size: .75rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-2); }
.field__input { display: block; width: 100%; height: var(--field-h); padding: 22px 16px 6px;
  border: 1.5px solid transparent; border-radius: 12px; background: var(--paper); color: var(--navy);
  font: 400 1rem/1.2 var(--font-body); /* 16px: sem zoom no iOS */ -webkit-appearance: none; appearance: none; }
.field__input::placeholder { color: #7A8C97; opacity: 1; }      /* 3,6:1 — é só exemplo, a label é o rótulo */
.field__input:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; border-color: var(--gold); }
.field__input[aria-invalid="true"] { border-color: var(--error-on-dark); }
.field__error { margin: 6px 2px 0; font-size: .8125rem; line-height: 1.35; color: var(--error-on-dark); text-wrap: pretty; }
.field__error:empty { display: none; }
.form-error { /* erro geral do envio */ margin: 10px 0 0; font-size: .875rem; color: var(--error-on-dark); }
```
**WhatsApp com intl-tel-input:** a lib envolve o input em `.iti` e aplica `padding-left` inline no input para abrir espaço ao seletor de DDI. Por isso a label interna desse campo acompanha esse recuo: no init e no `countrychange`, o JS copia `input.style.paddingLeft` para `label.style.left`. Fallback em CSS: `.field--phone .field__label { left: 92px }`. Manter a label interna também aqui, para o padrão dos três campos ficar igual. Antes da lib carregar (e no fallback), o input não tem seletor e a label fica em `left:16px`. Retematização do `.iti`: copiar de `lp-captura-black-rainnhas/styles.css` l.804–853 trocando as cores (`--iti-dropdown-bg: var(--paper)`, texto navy, `--iti-hover-color: rgba(24,56,75,.06)`, `.iti__country { min-height:44px }`, `.iti--container { z-index: 1200 }`).
Gap entre campos: 8px (mobile) / 10px (desktop).

### 5.5 Linha de data (novo, simples)
Lista `<ul class="when">` com 3 itens e ícone de traço 18px (calendário, relógio, câmera) em `--blue-ink`, texto 15px bold navy, `gap: 6px 18px; flex-wrap: wrap`. No mobile vira 2 linhas compactas sem ícone de câmera. **O primeiro item leva o ponto pulsante "ao vivo".** Amarrações do `COPY.md`.

### 5.6 Selo do professor (deriva de `.float-card`, l.139–146)
`Dr. Felipe Belanda` em Rizoma 1.15rem navy + `Médico · CREMERS 43994` em label `.68rem` uppercase `--ink-2`, sobre `--paper` com `--shadow`. No mobile fica sobre a base do retrato (left 0, bottom 20px). Em ≥1200 fica sobre a base do retrato, do lado esquerdo, sem colidir com o form-card. No desktop ele não flutua em loop: entrada única. Isso evita competir com o formulário.

### 5.7 §2 "Na aula, você vai entender": lista numerada com barra (l.272–292 + JS l.236–259)
- Cabeçalho em split (`.curriculum__head`, l.272–275): H2 à esquerda (`Na aula, / *você vai entender*`) e, à direita, uma frase-ponte curta (opcional, sem inventar copy; se não houver, o H2 ocupa a largura).
- `.phases` com 3 `.phase`: `__num` 01–03, `__title` = item (Rizoma uppercase até 1.45rem). Os itens são frases longas, então usar **Helvetica 1.125rem navy** como texto principal, sem uppercase, com o número em Rizoma. É mais legível que 3 frases longas em caixa alta.
- `.phase__bar` com progresso por scroll (JS da ref.), com troca de cor do item ativo (não de opacidade, para manter AA, l.287–291).
- Ao lado, em ≥900: símbolo do conceito grande (`.concept__symbol-wrap` com máscara azul, l.230–239) girando devagar (`data-spin`). No mobile vira marca d'água atrás do título (l.529–534).

### 5.8 §3 "Para quem é": 4 cards (`.card`, `.card__head`, `.card__icon`, l.195–213)
- Grid: 1 coluna <600, 2 colunas 600–1099, 4 colunas ≥1100 (`gap: 18px/24px`). **Sem `card--feature`** destacado: os 4 públicos têm o mesmo peso, e destacar um sugeriria hierarquia. Alternativa a validar no render: o 2º (Gestantes) em navy, como na ref., para ritmo.
- Conteúdo: ícone de traço 46–58px (`data-draw`), `card__num` 01–04, `card__title` (Tentantes / Gestantes / Mães / Profissionais e&nbsp;terapeutas) e `p` (descrição de 1 linha).
- Ícones (reuso literal do `index.html` da ref.): **Tentantes** = broto (l.169–175), **Gestantes** = perfil gestante (l.184–190), **Profissionais** = diálogo (l.199–204). **Mães** é novo, no mesmo grid 48×48, traço 1.5 e um acento dourado:
  ```html
  <svg class="card__icon" viewBox="0 0 48 48" aria-hidden="true" focusable="false" data-draw>
    <circle class="ic-line" pathLength="1" cx="19" cy="9" r="4.5"/>
    <path class="ic-line" pathLength="1" d="M12 44V28c0-6 3.2-10.5 7-10.5s6.5 2.6 8 6.5"/>
    <path class="ic-line" pathLength="1" d="M15 30c4 3.5 11 4.5 17 1"/>
    <circle class="ic-accent" pathLength="1" cx="33" cy="25" r="4"/>
    <path class="ic-accent" pathLength="1" d="M27.5 33.5c2.5 1.6 6.5 1.6 9-.5"/>
  </svg>
  ```
  (mãe de perfil segurando o bebê, com o bebê em dourado). Conferir a leitura no render e simplificar se ficar confuso.
- Altura dos cards: `padding: 26px 22px` em todas as larguras (a ref. usa 32/28, mas aqui o texto é curto), `card__head` com `margin-bottom: 18px`.

### 5.9 §4 "Quem dá a aula" (`.teacher`, l.316–321 + ajuste-v2 l.333–346 + mobile l.563–568)
- **Um só cartão**, largo: `max-width: 1040px; margin-inline: auto`. Em ≥1024: `grid-template-columns: minmax(0,5fr) minmax(0,6fr)`, foto 4:5 à esquerda (`bloco-felipe-palco-cor-640`, `object-position: 50% 20%`) e texto à direita. No mobile: foto 1:1 em cima (l.563–565).
- `.teacher__name` com o traço dourado `::before` (l.340–341). Abaixo do nome, a linha de credencial `Médico · CREMERS 43994` (label uppercase `--ink-2`). Depois, a bio do `COPY.md` em 1.0625rem `--ink-2`.
- Foto abre de dentro da moldura (clip-path + scale, JS l.287–298 da ref.).
- A bio tem só uma frase. **Não inventar copy** para preencher. O texto fica centralizado verticalmente (`align-self:center`), com a coluna em `max-width: 44ch`. Se o cartão ficar ralo, reduzir a foto para `4fr/6fr` ou o cartão para `max-width: 920px`.

### 5.10 §5 "Por que assistir ao vivo": faixa azul (`.band`, l.262–270 + mobile l.537–543)
- Fundo `--blue`, 4 blocos geométricos (`.band__block--a…d`, com `data-parallax` ±20/30), fios `textura-linhas-vinculo.svg` a .55.
- Conteúdo centralizado: eyebrow claro (`.eyebrow--light`, navy translúcido ou creme) + H2 `Por que assistir / *ao vivo*` em creme (`.h2--light`; as linhas grandes passam, 3,1:1 só em texto ≥24px) + parágrafo da copy. Navy direto sobre o azul dá só 3,47:1 e serve apenas para texto grande, então o parágrafo vai num **cartão creme translúcido**: `background: rgba(244,239,230,.92); color: var(--navy); border-radius: var(--radius-sm); padding: 20px 24px; max-width: 56ch`. Contraste ≥9:1, e o cartão ecoa os blocos.
- Botão `btn--solid` (navy) → `#inscricao`: `Quero minha vaga na&nbsp;aula`.
- Mobile: blocos C e D somem <600, blocos A e D ficam navy .10 (l.538–543).

### 5.11 §6 CTA final (`.final`, l.417–422)
Navy, anéis centrados (`.final__rings`, `data-parallax="-50"`), símbolo creme 34px no topo (`logo-simbolo-creme.svg`, como `.quote__symbol`). H2 curto em creme. **Sem copy nova**: usar o próprio H1 como eco (`Os primeiros *mil dias*`) **ou** só data + botão. Recomendação: eyebrow `Quarta, 25/11 · 19h (Brasil) | 22h (Portugal)` + botão `btn--light` `Quero minha vaga na&nbsp;aula` → `#inscricao`, e embaixo `Ao vivo no Zoom · Gratuito` em `--blue-soft`. Sem H2 inventado; se o Nil quiser título, pedir à copy.

### 5.12 §7 Nota legal
Faixa `--cream` com `border-top: 1px solid var(--line)`, `padding-block: 24px`, texto centralizado `.8125rem` `--ink-2`, `text-wrap: balance`: "Conteúdo educacional. Não substitui acompanhamento médico, pediátrico ou&nbsp;psicológico."

### 5.13 Rodapé padrão ALTIS (l.424–439 = §8.3 do CLAUDE.md)
Copiar o HTML do `ALTIS/CLAUDE.md` §8.3 e o CSS da ref. l.425–439 (fundo `--navy-deep`, texto creme a 60%). O logo é `assets/img/logo-altis-vertical.svg` com **`width="888" height="840"`** (dimensão real do arquivo copiado; o §8.3 cita 879x831, mas vale o arquivo). O link é `aviso-de-privacidade.html`. Padding inferior no mobile: `calc(40px + env(safe-area-inset-bottom))`. O CTA fixo some no rodapé.

### 5.14 CTA fixo mobile (`.sticky-cta`, l.442–456, sem preço)
- Só ≤859. Pill `--paper` com o texto `25/11 · 19h` (Rizoma 1.05rem navy) à esquerda e `btn--solid btn--sm` `Quero minha vaga` à direita → `#inscricao`.
- Aparece quando o **form-card sai da tela por cima** e some quando o form-card, o `.final` ou o rodapé estão visíveis (IntersectionObserver, padrão das duas refs.). `aria-hidden` e `tabIndex` sincronizados (ref. l.29–37).
- Ao clicar: `scrollIntoView` no `#inscricao` (com `scroll-margin-top`) e depois `nome.focus({ preventScroll: true })`, com `behavior:'auto'` se reduced-motion.

### 5.15 Header
`<header class="site-header">` **estático** (sem `position: sticky`), fundo transparente sobre o creme, sem navegação e sem botão. Logo `logo-horizontal-navy.svg` (`width="3036" height="493"`) com altura `clamp(26px, 7.4vw, 34px)` no mobile e 40px no desktop. `.brand` com `min-height: 44px`.

---

## 6. Layout por seção · desktop / mobile

| Seção | ≥1200 | 860–1199 | ≤859 |
|---|---|---|---|
| Hero | copy · retrato (sob o cartão) · form-card 380px | copy + selo · form-card 340px | eyebrow → H1 → data → form → sub → retrato + selo |
| Na aula | split H2/ponte; lista 01–03 (7fr) + símbolo (5fr) | igual, símbolo menor | lista 1 coluna; símbolo como marca d'água |
| Para quem é | 4 colunas | 2×2 | 1 coluna <600; 2×2 em 600–859 |
| Quem dá a aula | cartão 5fr foto / 6fr texto | igual (≥1024); empilhado 860–1023 | foto 1:1 em cima |
| Ao vivo | faixa azul, conteúdo centrado max 720px | igual | `padding-block: 60px`, sem blocos C/D |
| CTA final | navy centrado | igual | igual, `padding-block: 72px` |
| Seções | `padding-block: clamp(72px, 10vw, 128px)` | | `60px` (<600) |

A página é curta: 5 seções depois do hero. Sem FAQ, sem depoimentos, sem navegação.

---

## 7. Motion (GSAP 3.12.5 + ScrollTrigger via cdnjs)

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
<script src="main.js" defer></script>
```
O formulário (`form.js` ou o primeiro bloco do `main.js`) **não depende do GSAP** e tem que funcionar mesmo se o cdnjs falhar.

**Bootstrap no `<head>`** (copiar da ref., `index.html` l.37–46), com o failsafe reduzido para **2000 ms** (página de captura):
```html
<script>
  (function (d) {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    d.documentElement.classList.add('js-motion');
    setTimeout(function () {
      if (!d.documentElement.classList.contains('motion-ready')) d.documentElement.classList.remove('js-motion');
    }, 2000);
  })(document);
</script>
```
CSS dos estados iniciais (ref. l.458–459): `.js-motion [data-hero-reveal], .js-motion [data-hero-line] { opacity: 0; }`. **Nunca colocar `data-hero-reveal` no `.form-card` nem nos seus filhos.**

**O que anima** (copiar o `main.js` da ref. e **remover**: carrossel de bônus, depoimentos, contadores, pirâmide, flutuação contínua do float-card):
| Elemento | Animação | Origem no `main.js` da ref. |
|---|---|---|
| H1 (`[data-hero-line]`) | sobe de dentro da máscara `.ln`, `yPercent 105→0`, 1.05s, stagger .12 | l.120–124 |
| Eyebrow, data, sub, selo (`[data-hero-reveal]`) | `opacity 0→1, y 18→0`, .8s, stagger .08, a partir de .25s | l.123 |
| Retrato do hero | `opacity 0→1, scale 1.03→1`, 1.4s | l.124 |
| Form-card | **sem opacidade**: só o `.form-card__rings` gira 0→8° e sai de `scale .96`, 1.6s. Detalhe vivo sem esconder nada | novo |
| Títulos de seção `[data-split]` | linhas sobem, 1s (desktop) / .7s, start `top 92%` (mobile) | l.146–157 / l.195–200 |
| Blocos `[data-reveal]`, grupos `[data-stagger]` | fade + y, `once: true` | l.159–176 / l.201–216 |
| Ícones dos cards `[data-draw]` | stroke draw | l.178–186 / l.217–224 |
| Barra das fases `[data-phases]` | progresso por scroll, item ativo | l.236–259 |
| Retrato do professor | clip-path + scale de dentro da moldura | l.287–298 |
| Parallax `[data-parallax]` | anéis, blocos da faixa, retrato do hero (+40) | l.262–270 |
| Símbolo `[data-spin]` | rotação −14°→14° por scrub | l.276–281 |
| Ponto "ao vivo" | `dot-pulse` em CSS, só com `.motion-ready` | CSS l.152–162 |

Regras:
- `gsap.matchMedia()` com os ramos `(min-width: 860px)` e `(max-width: 859px)`, como na ref. (no mobile, gatilho por item e durações de .6–.7s).
- **Sem pin, sem scroll morto, sem loop contínuo** além do ponto "ao vivo". Nada animado sobrepõe texto nem o form-card. O parallax do retrato é limitado a ±20px para não entrar embaixo do cartão.
- `prefers-reduced-motion: reduce` → `main.js` remove `js-motion` e sai antes de registrar o GSAP (ref. l.112–115). O CSS zera transições e animações (ref. l.461–465). O scroll para `#inscricao` passa a `behavior: 'auto'`.
- Sem JS: nenhum estado inicial é aplicado (ele depende de `.js-motion`), a página fica estática e completa, e o `<noscript>` do formulário avisa "Ative o JavaScript para se inscrever." (padrão Black das Rainhas, `index.html` l.315).
- `window.addEventListener('load', () => ScrollTrigger.refresh())`.

---

## 8. Regras transversais

- **CTA na primeira dobra:** §4.1. Medir com Playwright o `bottom` do `#submitBtn` nas 10 telas (1920x940, 1440x900, 1366x657, 1280x600, 1024x768, 768x1024, 414x736, 390x844, 375x667, 360x640) e registrar no README.
- **Sem órfãs:** §3. Conferir no render, seção por seção, nas 10 telas, incluindo o form-card, os cards e o disclaimer.
- **Acessibilidade (§7 do ALTIS/CLAUDE.md):** skip-link → `#conteudo`; `:focus-visible` visível (navy no creme, creme/dourado no navy); `prefers-reduced-motion` respeitado; touch ≥44px (botões de 52px, campos de 56px, link do rodapé de 44px, seletor de país com `min-height:44px`); contraste AA (§2). Formulário: `<label for>` em todos os campos, `aria-describedby` → erro, `aria-invalid`, erro com `aria-live="polite"`, sucesso com `role="status" tabindex="-1"` recebendo foco, `autocomplete="name|tel|email"`, `inputmode="tel|email"`, `autocapitalize="words"` no nome e `off` no e-mail, `spellcheck="false"` no e-mail. Imagens decorativas com `alt="" aria-hidden="true"`. Retratos com alt descritivo, sem citar a Ana.
- **GTM `GTM-KM5KGJJ`:** snippet o mais alto possível no `<head>` + `<noscript><iframe>` logo após `<body>` (copiar da ref., `index.html` l.4–9 e l.49–51). Também no `aviso-de-privacidade.html`.
- **Aviso de Privacidade:** criar `aviso-de-privacidade.html` no projeto, colando o `<article class="legal">` inteiro de `ALTIS/_padroes/aviso-de-privacidade/conteudo.html` (sem editar). Mesmo CSS e fontes, GTM, "← Voltar à página", rodapé padrão, sem formulário nem CTA fixo. Modelo: `lp-neurodesenvolvimento-infantil/aviso-de-privacidade.html`. Consentimento no form: `Ao enviar, você concorda com o <a href="aviso-de-privacidade.html" target="_blank" rel="noopener">Aviso de&nbsp;Privacidade</a>.`
- **Compliance:** nada de MEC. Nenhuma menção, foto ou alt com a Ana. Nenhum preço ou prazo da condição especial.
- **Head:** `<title>`, description, og:* do `COPY.md` §9; `theme-color #F4EFE6`; favicons (`favicon.svg`, `favicon.ico`, `apple-touch-icon-180.png`); `preload` da `RizomaM-Regular.woff2` (crossorigin) e do recorte do hero em WebP (`fetchpriority="high"`, como na ref. l.33); CSS do intl-tel-input local. **Caminhos relativos** (`assets/...`), e não `/neurodesenvolvimento-v1/...` como na ref., até o caminho de publicação ser definido. og:image ainda não existe: gerar 1200x630 depois.
- **Performance:** imagens com `width/height`, `srcset/sizes`, `loading="lazy"` fora do hero; GSAP e `main.js` com `defer`; intl-tel-input carregado de forma assíncrona (padrão Black das Rainhas). O hero não deve depender de nada além de CSS e fontes.

---

## 9. Formulário · padrão de envio das LPs de captura ALTIS

### 9.1 O que cada LP faz hoje

| LP | Arquivo | Telefone | Validação | Pós-envio |
|---|---|---|---|---|
| `captação-ons-cpl-v2` (base do guia) | `index.html` l.423–455, l.536–575; regra em `GUIA_FORMULARIOS.md` | `type="tel" name="telefone"`, sem máscara | só nativa (`checkValidity`/`reportValidity`) | esconde o form e mostra `#formSuccess` com link do grupo (`sndflw.com/...`) |
| `lp-superinteressados-black-friday-2026` | `index.html` l.650–684 (markup), l.745–835 (JS) | intl-tel-input, `initialCountry:'br'`, `separateDialCode`, E.164 no oculto `#telefonePayload name="telefone"` | nome ≥3 com espaço; `iti.isValidNumber()` | `form.is-hidden` + `successEl.is-active`; erro com banner + `#retryBtn` |
| **`lp-captura-black-rainnhas`** (mais recente e madura) | `script.js` l.6–35 (config), l.193–486 (form); `index.html` l.266–318 | intl-tel-input **26.9.2** carregado sob demanda, `countryOrder:['br','pt']`, `allowedNumberTypes:['MOBILE']`, i18n PT; **fallback sem lib** para celular BR/PT (l.300–318) | mensagens inline por campo (`aria-invalid`, `aria-describedby`), valida no blur (adiado 180ms para não roubar o clique no botão) e no submit; foco no 1º inválido | `trackLead()` → `dataLayer.push({event, eventCallback, eventTimeout:1200})` → `window.location.href = GROUP_URL + UTMs` após ≥1500ms; botão de fallback `#groupBtn` |

**Padrão a seguir: `lp-captura-black-rainnhas/script.js`**, adaptado:
- Público BR **e PT** (o horário de Portugal está no hero), então o seletor de DDI se justifica. O `GUIA_FORMULARIOS.md` (Passo 1) proíbe máscara e lib. As duas LPs de captura posteriores já usam intl-tel-input, então isso virou prática aceita. **Registrar o desvio no README.** A "máscara" é a formatação enquanto digita que a própria intl-tel-input aplica (padrão `formatAsYouType` da v26). Não há regex de máscara próprio em nenhuma das LPs.
- **Ordem dos campos:** Nome, WhatsApp, E-mail (BRIEF/COPY). O guia sugere nome, e-mail, telefone. Seguir o BRIEF e registrar.

### 9.2 Configuração no topo do JS (placeholders)
```js
/* ---------------- CONFIGURAÇÃO ---------------- */
// Endpoint n8n que recebe o cadastro (→ RD Station). AINDA NÃO DEFINIDO: perguntar ao Nil.
// Nunca reaproveitar o webhook de outra campanha (GUIA_FORMULARIOS, Passo 5).
const WEBHOOK_URL = '[WEBHOOK_URL]';
// Página + versão, padrão GUIA "nome_da_pagina-vN". Proposta, confirmar com o Nil:
const ORIGEM = 'quartaclass_felipe_belanda-v1';
// Grupo de WhatsApp da ação (único lugar onde vai o link do Zoom). AINDA NÃO EXISTE.
const GROUP_URL = '[LINK_GRUPO_WHATSAPP]';
const GTM_EVENT = 'lead_quartaclass_felipe';
const REDIRECT_DELAY = 1500;     // ms mínimos com a confirmação na tela
const REQUEST_TIMEOUT = 15000;   // AbortController
const GTM_EVENT_TIMEOUT = 1200;
const ITI_BASE = 'https://cdn.jsdelivr.net/npm/intl-tel-input@26.9.2/build/js/';
```
**Guardas para os placeholders** (novo, para não publicar perdendo leads):
- `const isPlaceholder = s => !s || s.charAt(0) === '[';`
- Se `WEBHOOK_URL` for placeholder: o submit não chama `fetch`. Com `?teste=1` na URL, simula o sucesso (para QA). Sem ele, mostra o `form-error` "Inscrições em configuração. Tente de novo em instantes." e faz `console.error`.
- Se `GROUP_URL` for placeholder: o sucesso aparece **sem** redirecionamento e sem botão (mesmo comportamento da Black com `GROUP_URL` vazio, `script.js` l.425–428).

### 9.3 Markup (campos visíveis + ocultos)
- Visíveis: `#nome` (`name="nome"`), `#whatsapp` (**sem `name`**; o envio usa o oculto), `#email` (`name="email"`). Cada um com `<label class="field__label">`, `<p class="field__error" id="…Error" aria-live="polite">`.
- Ocultos (GUIA, Passo 3, + Black): `telefone` (E.164), `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `url`, `origem`, `timestamp` e `request_id` (UUID por carregamento para deduplicar no n8n, `script.js` l.51–64).
- `<form id="captureForm" novalidate>`, `<button type="submit" id="submitBtn">`, `#formError role="alert"`, `#formSuccess role="status" tabindex="-1" hidden` + `#groupBtn hidden`.

### 9.4 Fluxo (copiar de `lp-captura-black-rainnhas/script.js`)
1. Carregamento: UTMs + `url` + `origem` + `request_id` preenchidos (l.223–231). intl-tel-input carregado por `loadScript` + i18n PT via `import()` com timeout de 2,5s (l.233–298). Se demorar 4s ou falhar, o placeholder passa a pedir o DDI e vale o `fallbackCheck()` (l.300–318: `55`+DDD+9+8 dígitos, `351`+9+8 dígitos, 11 dígitos BR sem DDI são assumidos como +55, fixo é recusado).
2. Validação (l.337–380): nome não vazio (trim); e-mail por `validity.valueMissing/typeMismatch`; WhatsApp por `iti.isValidNumberPrecise()` + recusa de `FIXED_LINE`. Mensagens do `COPY.md`: "Informe seu nome." / "Informe o WhatsApp com DDD." / "Informe um e-mail válido.". Valida no blur (com o atraso de 180ms e a exceção quando o foco vai para o botão) e limpa ao digitar.
3. Submit (l.441–486): `preventDefault`; trava de duplo envio; foco no 1º inválido; `telefone = iti.getNumber()` (ou o E.164 do fallback); `timestamp = new Date().toISOString()` **no envio**; `nome` com espaços normalizados; `fetch(WEBHOOK_URL, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data), signal })` com timeout de 15s.
4. Erro: reabilita o botão e mostra no `#formError` o texto do `COPY.md` ("Não conseguimos registrar sua inscrição. Confira os dados e tente de novo."). Não usar `alert()`.
5. Sucesso (l.416–438): `form.hidden = true`, `#formSuccess` visível e com foco, texto do `COPY.md` ("Inscrição feita. Agora entre no grupo de WhatsApp da aula: é por lá que chega o link do Zoom."), `#groupBtn` "Entrar no grupo do WhatsApp" com `href = GROUP_URL + UTMs` (l.389–398), `trackLead()` com `dataLayer.push({ event: GTM_EVENT, origem, request_id, eventCallback, eventTimeout })` e, quando o GTM confirmar (ou após timeout +300ms), redireciona com `window.location.href = groupUrl`, respeitando os 1500ms mínimos.
6. O sucesso substitui o form **dentro do mesmo form-card**: a altura do cartão não pode saltar a ponto de esconder a mensagem. Dar `min-height` igual à altura do form no momento do envio (medir e fixar via JS) e centralizar a mensagem.

### 9.5 Botões que levam ao formulário
`a[href="#inscricao"][data-to-form]` (faixa azul, CTA final, CTA fixo): no clique, `preventDefault`, `document.getElementById('inscricao').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })` e, após o scroll (`scrollend` ou timeout de 500ms), `nome.focus({ preventScroll: true })`. `#inscricao { scroll-margin-top: 16px; }`. Links de anúncio com `#inscricao` no hash também focam o Nome no load.

---

## 10. Pendências desta fase

- `WEBHOOK_URL` e `ORIGEM` (o GUIA manda perguntar: proposta `quartaclass_felipe_belanda-v1`).
- `[LINK_GRUPO_WHATSAPP]`.
- Domínio/caminho de publicação (para og:url, og:image absoluta e caminhos).
- og:image 1200x630 (Felipe + headline + data, sem a Ana).
- Logo do produto no header: confirmar (§1).
- Divergência de CEP rodapé × Aviso (CLAUDE.md §8.3): não alterar.
- Ícone "Mães" é novo: validar no render.
