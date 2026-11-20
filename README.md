# LP de inscrição · QuartaClass Dr. Felipe Belanda (25/11/2026)

HTML/CSS/JS estático, sem build. Arquivos: `index.html`, `styles.css`, `main.js`, `aviso-de-privacidade.html`, `vercel.json`.
Briefing, copy e sistema visual em `BRIEF.md`, `COPY.md`, `DESIGN.md` e `assets/IMAGENS.md`. Referência visual (somente leitura): `ALTIS/lp-neurodesenvolvimento-infantil/`.

**Não publicada.** Nada foi enviado ao GitHub nem à Vercel.

## Decisões
- **Fotos em cor** (`hero-felipe-cor-*`, `bloco-felipe-palco-cor-*`, `avatar-felipe-cor-*`), como a cliente pediu na LP de referência. Para a camisa branca não sumir no creme, o retrato do hero fica sobre um **arco azul sereno** com anéis, mais uma sombra suave no recorte.
- **Formulário no hero em todas as telas.** Nos telefones a ordem é: tag → H1 → data → formulário → subtítulo → retrato. Em ≥1200px o retrato fica entre o texto e o cartão, e o cartão cobre a borda direita dele. De 860 a 1199px o retrato sai do hero e entra o selo com o avatar.
- **Header mínimo** com o logo do produto, sem navegação e sem botão.
- **Um formulário só.** A faixa azul, o CTA final e o CTA fixo do mobile rolam até `#inscricao` e dão foco no campo Nome.
- **Copy do `COPY.md` sem reescrita.** Além dos `&nbsp;` do COPY, foram amarrados os pontos que ainda quebravam mal no render: `nos&nbsp;primeiros`, `já&nbsp;está`, `e&nbsp;famílias`, `até&nbsp;o&nbsp;final`, `E&nbsp;quem`, `termo&nbsp;difícil`, `é&nbsp;enviado`, `no&nbsp;grupo`. Também foi impedida a quebra de `pós-graduado` no hífen. O subtítulo tem a quebra entre as duas frases em todas as larguras.
- **Textos derivados do DESIGN.md** (não estão no COPY): a mensagem "Inscrições em configuração. Tente de novo em instantes." (aparece quando o webhook ainda é placeholder) e o CTA fixo "25/11 · 19h". O CTA final reaproveita a tag, a data e o formato do hero, sem título novo.
- Motion: GSAP 3.12.5 + ScrollTrigger via cdnjs. O formulário não depende do GSAP e o cartão nunca nasce invisível. Com `prefers-reduced-motion` a página fica estática.

## Ajuste v2 (20/11/2026)
Pedido do Nil depois de avaliar o desktop.

**1. Hero ≥1200px: Felipe protagonista.**
- O retrato passou de 464px para até **620px** de largura CSS (`--pw: min(620px, 42vw)`: 605px em 1440, 538px em 1280). O teto de 620px respeita o original útil de 752px. Para ganhar escala sem ampliar a largura, o retrato fica mais alto que o hero e o excesso é cortado no tronco (na barriga, por volta de 75–80% da foto).
- O topo do retrato acompanha o topo do formulário (`top: calc(50% - 250px)`): o cabelo fica na altura do eyebrow e do título. O arco azul escala junto, porque é proporcional ao retrato.
- O hero ficou mais baixo: `min(100svh − header, 40svh + 262px, 740px)` (622px em 1440x900, contra 829px antes). O vazio entre o header e o título caiu de ~210px para ~110px.
- O texto foi limitado a 500px e o H1 desceu para `min(3.3vw, 7.4vh, 3.2rem)`. O formulário cobre cerca de 20% da lateral direita do retrato (o ombro), sem tocar o rosto.
- As laterais do recorte, que terminam retas nos antebraços, dissolvem no creme com `mask-image` (10% de cada lado).
- O selo "Dr. Felipe Belanda" ficou sobre o braço esquerdo, na base do retrato, sem cobrir rosto nem peito.
- `sizes` e `imagesizes` do hero em ≥1200: de 420px para 620px.
- De 860 a 1199px e no mobile o hero não mudou (as medições do botão nessas telas são as mesmas da v1).

**2. "Quem dá a aula": foto nova.**
- Foto #18 (`12.50.41`, perfil no palco, camisa branca, microfone, fundo preto), **em cor**, corrigida da luz magenta e **espelhada** no arquivo (não via CSS). Ele olha para a direita, para o texto. No desktop a foto fica à esquerda e o texto à direita. No mobile e no tablet a foto fica acima do texto.
- Arquivos: `bloco-felipe-perfil-cor-{320,640,960}.{webp,jpg}` (4:5). `srcset` com 320/640/960 em WebP e JPG, `sizes="(min-width: 1024px) 430px, (min-width: 600px) 616px, 92vw"` e `alt` novo.
- Abaixo de 1024px o quadro é quadrado. De 600 a 1023px ele era 4:3 e virou 1:1, porque em 4:3 o microfone saía do quadro. `object-position: 50% 45%` mantém a cabeça inteira e o microfone.
- `bloco-felipe-palco-*` virou reserva. Nenhum arquivo foi apagado. Ver `assets/IMAGENS.md`.

**Medição v2** (mesmo critério da seção abaixo):

| Tela | bottom do botão | Folga | OK |
|---|---|---|---|
| 1920x940 | 511 | 429 | sim |
| 1440x900 | 503 | 397 | sim |
| 1366x657 | 454 | 203 | sim |
| 1280x600 | 451 | 149 | sim |
| 1024x768 | 525 | 243 | sim |
| 768x1024 | 645 | 379 | sim |
| 414x736 | 616 | 120 | sim |
| 390x844 | 610 | 234 | sim |
| 375x667 | 606 | 61 | sim |
| 360x640 | 602 | 38 | sim |

Sem overflow horizontal. O único erro de console continua sendo o do contêiner GTM (`app.omnicdp.com/tag.js` não resolve no teste local).

## Ajuste v3 (20/11/2026)
Pedido do Nil sobre o hero desktop da v2 (print com a silhueta desenhada): "no desktop o Felipe tem que cobrir mais a área ali, se ele aparecer como no mobile assim, mais inteiro, fica bom". Só ≥1200px mudou. De 860 a 1199px e no mobile o hero continua igual.

- **Recorte novo, mais amplo:** `assets/img/hero-felipe-cor-amplo-920.{webp,png}` (920×1040, fundo transparente). Vem do mesmo original (`experts/felipe-belanda.jpg`, 959×1395) e da mesma máscara BiRefNet-portrait, com o mesmo tratamento do alfa. A janela é x 20–940 e y 0–1000 do original, mais 40px transparentes no topo. O recorte antigo (x 104–856) cortava reto os dois ombros e os braços. O novo guarda os ombros, as laterais do tronco e os braços inteiros. Não houve ampliação: o recorte tem 920px reais. O `hero-felipe-cor-752` continua no mobile.
- **`<picture>`:** duas `<source media="(min-width: 1200px)">` (WebP e PNG) para o recorte amplo. O preload ficou dividido por `media`: o recorte amplo em ≥1200 e o 480/752 em ≤859.
- **Escala:** `--pw: min(760px, altura do hero × 1,14)`. Isso dá 709px em 1440x900, 727px em 1920x940 e ~595px em 1280/1366. A cabeça começa ~14px abaixo do header (`top: calc(14px − pw × 0,07)`). O tronco desce até a base do hero e o excesso é cortado no peito/abdômen, como no mobile.
- **Posição:** o rosto (x≈44% do recorte) fica no centro do vão entre o texto (500px) e o formulário (`--face`). O formulário cobre o ombro direito, e a borda esquerda do corpo para antes do texto.
- **Sem máscara lateral:** saiu o `mask-image` da v2, porque o recorte novo não tem laterais retas.
- **Arco:** proporcional ao recorte novo (left/right 15%, top 15,4%), atrás da cabeça e dos ombros.
- **Selo:** foi para `left: −9%; bottom: 6%`, sobre o braço esquerdo e o espaço fora do corpo. Não cobre rosto nem peito, nem encosta na lista de data.
- **Nitidez:** em 1x o retrato é reduzido (920px nativos para 595–727px CSS) e fica nítido. Em telas 2x a ampliação é ~1,6x, a mesma da v2. Um original de alta do fotógrafo ainda melhoraria o retina.

**Medição v3** (mesmo critério):

| Tela | bottom do botão | Folga | OK |
|---|---|---|---|
| 1920x940 | 511 | 429 | sim |
| 1440x900 | 503 | 397 | sim |
| 1366x657 | 454 | 203 | sim |
| 1280x600 | 451 | 149 | sim |
| 1024x768 | 525 | 243 | sim |
| 768x1024 | 645 | 379 | sim |
| 414x736 | 616 | 120 | sim |
| 390x844 | 610 | 234 | sim |
| 375x667 | 606 | 61 | sim |
| 360x640 | 602 | 38 | sim |

Sem overflow horizontal. O único erro de console continua sendo o do GTM (`app.omnicdp.com`).

## Ajuste v4 (20/11/2026)
Pedido do Nil: "coloca uma borda pra destacar essa info" (lista de data do hero). Só o `.when` mudou, em `styles.css`. O CTA final navy (`.final__date`) ficou de fora.

- **Moldura:** borda 1px dourada sutil `rgba(185,154,96,.55)`, fundo papel translúcido `rgba(251,248,242,.72)`, sombra bem leve, raio `--radius-sm` (14px, o mesmo do selo do Felipe e do cartão da faixa azul, que são os cards vizinhos).
- **Largura:** `width: fit-content` (e `max-width: 100%`), em todas as larguras. De 600 a 859px a lista virou grid `auto auto` (data + horário na 1ª linha, Zoom na 2ª), porque a flex com quebra esticava a moldura até a largura toda.
- **Padding:** mobile 8/16/8/14px; tablet 10/20/10/16px; desktop (≥860) 12/22/12/18px. Fonte sem mudança (14px no mobile, 15px no desktop).
- **Ponto dourado:** continua pulsando. O anel de recorte passou de creme para papel (`--paper`) para casar com o fundo da moldura.
- **Desktop ≥1200:** a moldura termina 26px à esquerda do selo do Felipe, sem encostar no selo nem no retrato. De 860 a 1199px fica 26px acima do selo com avatar.

**Medição v4** (mesmo critério):

| Tela | bottom do botão | Folga | OK |
|---|---|---|---|
| 1920x940 | 511 | 429 | sim |
| 1440x900 | 503 | 397 | sim |
| 1366x657 | 454 | 203 | sim |
| 1280x600 | 451 | 149 | sim |
| 1024x768 | 525 | 243 | sim |
| 768x1024 | 692 | 332 | sim |
| 414x736 | 634 | 102 | sim |
| 390x844 | 628 | 216 | sim |
| 375x667 | 624 | 43 | sim |
| 360x640 | 620 | 20 | sim |

No desktop o botão não se mexe, porque o formulário é centralizado na sua própria coluna. No mobile a moldura acrescenta 18px. Em 360x640 a folga ainda passa no critério (precisa ser ≥ 8), então não foi preciso compensar. Sem overflow horizontal. O único erro de console continua sendo o do GTM.

## Formulário
- Configuração no topo do `main.js`: `WEBHOOK_URL = '[WEBHOOK_URL]'`, `GROUP_URL = '[LINK_GRUPO_WHATSAPP]'`, `ORIGEM = 'quartaclass_felipe_belanda-v1'`, evento GTM `lead_quartaclass_felipe`.
- Envio: POST JSON com `nome`, `email`, `telefone` (E.164), as 5 UTMs, `url`, `origem`, `timestamp` e `request_id`. Este é o padrão de `lp-captura-black-rainnhas/script.js`.
- **Proteção dos placeholders:**
  - Com o webhook em placeholder, o envio não acontece e a página mostra a mensagem de configuração (o `console.error` explica o motivo).
  - Com o grupo em placeholder, o sucesso aparece sem redirecionamento e sem botão.
- **`?teste=1`** simula o envio para QA: não chama o webhook, não dispara o lead no GTM e não redireciona.

### Desvios do `GUIA_FORMULARIOS.md` (apontados no DESIGN.md §9.1)
1. **WhatsApp com intl-tel-input 26.9.2** (seletor de DDI BR/PT, só celular). O guia pede `type="tel"` sem máscara nem lib. Aqui o público inclui Portugal, e as duas LPs de captura mais recentes já usam a lib. Não há máscara própria: só a formatação da lib enquanto a pessoa digita. Se a lib não carregar, entra uma validação simplificada BR/PT.
2. **Ordem dos campos:** Nome, WhatsApp, E-mail, como no BRIEF e no COPY. O guia sugere Nome, E-mail, Telefone.
3. **Validação com mensagens próprias por campo** (`aria-invalid` e `aria-describedby`), em vez de só a validação nativa.

## Medição: botão de envio do hero na primeira dobra
Playwright/Chromium, sem rolar, com as fontes carregadas. Critério: `bottom ≤ altura da tela − 8`.

| Tela | bottom do botão | Folga | OK |
|---|---|---|---|
| 1920x940 | 634 | 306 | sim |
| 1440x900 | 618 | 282 | sim |
| 1366x657 | 492 | 165 | sim |
| 1280x600 | 463 | 137 | sim |
| 1024x768 | 525 | 243 | sim |
| 768x1024 | 645 | 379 | sim |
| 414x736 | 616 | 120 | sim |
| 390x844 | 610 | 234 | sim |
| 375x667 | 606 | 61 | sim |
| 360x640 | 602 | 38 | sim |

Nenhuma tela teve overflow horizontal, inclusive o aviso de privacidade. A página não gera erros próprios. O único erro de console vem do contêiner GTM, que injeta `app.omnicdp.com/tag.js`, um domínio que não resolveu no teste local. Ele não vem do código da página.

## Pendências
- **`WEBHOOK_URL`**: endpoint n8n da ação. Nunca reaproveitar o webhook de outra campanha.
- **`[LINK_GRUPO_WHATSAPP]`**: link do grupo da ação.
- **Domínio/caminho de publicação**: falta para `og:url` e para a `og:image` absoluta (o bloco está comentado no `<head>`). Se a LP ficar num subcaminho com rewrite, adaptar o `vercel.json` como na referência.
- **og:image 1200x630** (Felipe + headline + data, sem a Ana): ainda não existe.
- Confirmar o logo do produto no header e a `ORIGEM`.
- Validar no render o ícone novo de "Mães".
- Divergência de CEP entre o rodapé e o Aviso (CLAUDE.md §8.3): não foi alterada.
