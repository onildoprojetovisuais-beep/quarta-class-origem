# Fotos do Dr. Felipe Belanda: LP QuartaClass (25/11)

Gerado em 20/11/2026. Regra desta LP: **só o Dr. Felipe**. Nenhum arquivo daqui contém a Ana Lisboa, nem um traço dela (ombro, cabelo, mão).
Fontes (somente leitura, nada foi alterado lá): `ALTIS/lp-neurodesenvolvimento-infantil/experts/` e `…/Dr. Felipe Belanda e Ana Lisboa/` ("foto #N" segue o catálogo de `lp-neurodesenvolvimento-infantil/assets/IMAGENS.md`).

Cada imagem tem duas versões: **cor** (a cliente pediu fotos coloridas na LP de referência, ajuste v4) e **pb** (P&B frio-quente, o conceito Fintus da referência). Escolham uma das duas e usem a mesma em toda a página.

## Arquivos finais (`assets/img/`)

| Arquivo | Dimensões reais | Proporção | Origem | Uso | Por que foi escolhida |
|---|---|---|---|---|---|
| `hero-felipe-{cor,pb}-752.webp` / `.png` | 752×940, fundo transparente | 4:5 | `experts/felipe-belanda.jpg` (retrato de estúdio, camisa branca) | **Hero**: retrato recortado à direita, ancorado embaixo (base reta) | É a única foto em que ele olha para a câmera e sorri, com luz de estúdio. Passa acolhimento e autoridade médica, tem a maior nitidez do acervo e o recorte saiu limpo (cabelo inteiro, sem cadeira nem mesa) |
| `hero-felipe-cor-amplo-920.webp` / `.png` | 920×1040, fundo transparente | ~8:9 | `experts/felipe-belanda.jpg`, janela x 20–940, y 0–1000, mais 40px no topo | **Hero ≥1200px (ajuste v3, 20/11)** | Pedido do Nil: Felipe "mais inteiro, como no mobile". O recorte 752 cortava reto os ombros e os braços. Este guarda os ombros e as laterais do tronco, com a mesma máscara e o mesmo alfa, sem ampliação (920px reais). WebP 66 KB |
| `hero-felipe-{cor,pb}-480.webp` / `.png` | 480×600, transparente | 4:5 | idem | Hero no mobile | idem |
| `hero-felipe-{cor,pb}-creme-752.webp` / `.jpg` | 752×940, fundo creme `#F4EFE6` | 4:5 | idem | Fallback sem alfa e base para og:image (recortar 1200×630 na montagem) | idem |
| `hero-felipe-{cor,pb}-creme-480.webp` / `.jpg` | 480×600 | 4:5 | idem | idem, mobile | idem |
| `bloco-felipe-perfil-cor-{320,640,960}.webp` / `.jpg` | 320×400, 640×800, 960×1200, fundo de palco preto | 4:5 | foto #18 `12.50.41`: de perfil, camisa branca, microfone na mão, fundo preto | **"Quem dá a aula" (em uso desde o ajuste v2, 20/11)** | Pedido do Nil. **Espelhada na horizontal** (`ImageOps.mirror`, arquivo novo) para ele olhar para a direita, onde fica o texto da bio no desktop. No mobile e no tablet a foto fica acima do texto e vale o mesmo espelhamento. Recorte 4:5 com a cabeça a ~11% do topo e o microfone dentro do quadro. O 960 sai sem ampliação: o recorte tem 960px de largura no original (1060×1600) |
| `bloco-felipe-palco-{cor,pb}-640.webp` / `.jpg` | 640×800, fundo de palco escuro | 4:5 | foto #5 `12.49.35 (2)`: no palco, terno azul, microfone, sorrindo | **Reserva desde o ajuste v2 (20/11)**, substituída pela `bloco-felipe-perfil-cor`. Antes: "Quem dá a aula", card escuro arredondado (como o "Exploring Tomorrow's" da referência) | Mostra ele dando aula, com microfone, o que reforça a QuartaClass. A expressão é calorosa e o enquadramento 3/4 complementa o hero sem repetir a foto. Está sozinho no quadro (o telão rosa da direita foi cortado) |
| `bloco-felipe-palco-{cor,pb}-320.webp` / `.jpg` | 320×400 | 4:5 | idem | idem, 1x/mobile | idem |
| `avatar-felipe-{cor,pb}-192.webp` / `.png` | 192×192, círculo com alfa, fundo azul sereno `#708C9B` | 1:1 | `experts/felipe-belanda.jpg` (rosto) | **Avatar**: prova/assinatura/citação (192 = retina de 96) | De frente e olhando para a câmera. O avatar da LP de referência vem da #5, com o rosto de lado. Mesma geometria dos avatares de lá: olhos em y≈305/640 e olhos-queixo ≈200/640 |
| `avatar-felipe-{cor,pb}-96.webp` / `.png` | 96×96 | 1:1 | idem | idem, 1x | idem |
| `hero-alt-felipe-perfil-pb-960.webp` / `.jpg` | 960×1200, fundo escuro | 4:5 | foto #18 `12.50.41`: de perfil, camisa branca, fundo preto | **Alternativa de hero** (versão escura/dramática) ou faixa de CTA. Há espaço negativo à esquerda para o texto | Retrato forte e sóbrio, já isolado pelo fundo preto (sem recorte). Em cor, a camisa fica rosada pela luz do palco: a versão em cor corrigida virou `bloco-felipe-perfil-cor` (ver acima) |
| `hero-alt-felipe-perfil-pb-480.webp` / `.jpg` | 480×600 | 4:5 | idem | idem, mobile | idem |

### Notas para o designer
- **Hero:** o PNG/WebP tem 40px transparentes acima do cabelo e o corte é reto embaixo e nas laterais (antebraços). Ancore embaixo, no centro ou à direita. O rosto fica no terço superior, levemente à esquerda do centro (x≈43%). A camisa branca some sobre o creme: no recorte, dê sombra suave ou um halo azul sereno/navy atrás, ou use a versão `pb`, cujo branco puxa para o creme e tem mais contorno.
- **Resolução:** o original de estúdio tem 959×1395 e o recorte útil tem 752px de largura. Não há versão 960 do hero porque seria ampliação sem ganho de detalhe. Em retina, 752 cobre até ~376px CSS de largura com nitidez 2x. Para um hero maior, peça o arquivo original do fotógrafo e rode o script de novo.
- **Bloco:** use `object-fit: cover; object-position: 50% 20%`. O rosto está em y≈22–38% da altura.
- **Peso:** use sempre o `.webp` (hero 752: 45–49 KB) e deixe o `.png` (486–585 KB) só como fallback no `<picture>`. Faça preload do hero escolhido.

## Tratamento aplicado
- **Recorte (hero e avatar):** `rembg` com o modelo BiRefNet-portrait (o mesmo da LP de referência). Alfa contraído em 1px e suavizado em 0,7px. Nenhum retoque de rosto ou pele.
- **pb:** autocontraste leve (0,5% / 0,4%) mais 35% de duotone navy `#18384B` → creme `#F4EFE6`. É a mesma receita da LP de referência.
- **cor, retrato de estúdio:** cor original, sem alteração.
- **cor, foto #5:** a luz de palco era magenta. Aplicado balanço de branco pela pele, em RGB linear, levando a pele ao tom do retrato de estúdio (ganho atenuado, potência 0,45). Depois, os tons roxo-magenta e vermelho fora do eixo da pele perderam croma, com saturação global de 0,9. Resultado: camisa branca e terno azul naturais.
- **cor, foto #18 (ajuste v2):** a luz de palco deixava camisa e pele magenta. Balanço de branco pela camisa (neutro levemente quente), em RGB linear, com ganho atenuado (potência 0,7) e normalizado para não estourar o verde. As altas luzes da camisa foram puxadas 60% ao neutro, o roxo-magenta residual perdeu croma (saturação global 0,95). Sem retoque de rosto. Depois, recorte 960×1200 (x 100–1060, y 320–1520 do original) e espelhamento horizontal.
- Exportação: Lanczos, WebP q82 (method 6), JPG q86 progressivo, PNG otimizado.

## Descartadas

| Foto | Motivo |
|---|---|
| #0 `12.49.34 (1)`, #3 `12.49.34`, #6 `12.49.35 (3)`, #8 `12.49.36 (1)`, #9 `12.49.36 (2)`, #12 `12.49.36`, #13 `12.49.37 (1)`, #15 `12.49.37`, #16 `12.49.38 (1)`, #17 `12.49.38` | **A Ana aparece** (abraço, beijo, palco a dois). Nenhum recorte isola o Felipe sem um traço dela |
| #14 `12.49.37 (2)` | A Ana aparece no telão. Além disso, ele está pequeno no quadro |
| #19 a #26 (`15.08.06` a `15.08.08`) | Ensaio de gestante e chá revelação **com a Ana** |
| #27 `15.08.09` | Ultrassom 3D: imagem íntima do bebê, não usar |
| #7 `12.49.35` | Print de tela do WhatsApp (barra de status, baixa resolução) |
| #1 `12.49.34 (2)` | Plateia na frente, em primeiro plano, e headset. Quadro poluído |
| #2 `12.49.34 (3)` | Outra mulher em pé atrás dele, no mesmo plano |
| #10 `12.49.36 (3)` | Sentado, horizontal, com rostos da plateia atrás dele |
| #4 `12.49.35 (1)` | Boa e sóbria (falando ao microfone, luz verde), mas a expressão é séria e sem contato visual. Reserva para uma seção "bastidores" |
| #11 `12.49.36 (4)` | Mesma cena da #18, em pior enquadramento (mais apertado). Fiquei com a #18 |
| `assets/img/*felipe*` da LP de referência (expert-, professor-, professor-fundo-, avatar-) | Não foram copiados: são derivados das mesmas fontes (#5 e `experts/`), mas em quadrado 1:1 ou com enquadramento pensado para outra página. Refiz a partir dos originais com a proporção 4:5 que esta LP pede |

## Reprodução
Scripts no scratchpad da sessão de 20/11/2026: `cut.py` (máscaras BiRefNet), `build.py` (hero, avatar, bloco pb, alternativa) e `bloco2.py` (bloco em cor). Ajuste v2: `perfil_cor.py` (foto #18 em cor, espelhada). Ajuste v3: `amplo.py` (recorte amplo do hero ≥1200, a partir da mesma máscara `felipe_studio_mask.png`). O modelo `birefnet-portrait` fica em cache em `C:\Users\Windows\.rembg\models\`.
