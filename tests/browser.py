#!/usr/bin/env python3
"""Chromium-Tests mit lokalen Home-Assistant-Attrappen; keine realen Geräteaufrufe.

  python tests/browser.py             # Prüfungen
  python tests/browser.py --preview   # zusätzlich Vorschaubilder nach tests/out/

Benötigt: pip install -r requirements-dev.txt  und  playwright install chromium
(oder PLAYWRIGHT_CHROMIUM_EXECUTABLE auf einen vorhandenen Chromium/Chrome setzen).
"""
import os
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]

PAGE = """<!doctype html><meta charset="utf-8"><style>
body{margin:0;padding:14px;background:#e9edf1;font-family:Roboto,Inter,sans-serif;font-size:14px;
--primary-text-color:#141414;--secondary-text-color:#6b6f76;--primary-color:#009ac7;--success-color:#43a047;
--warning-color:#ff9800;--error-color:#e53935;--card-background-color:#fff}
</style><div id="w"></div><script>
window.__errors = [];
window.addEventListener('error', (e) => window.__errors.push(String(e.message || e)));
window.addEventListener('unhandledrejection', (e) => window.__errors.push('rejection: ' + e.reason));
customElements.define('ha-card',class extends HTMLElement{constructor(){super();this.attachShadow({mode:'open'}).innerHTML=
  '<style>:host{display:block;background:#fff;border-radius:16px;border:1px solid #dfe3e8;box-sizing:border-box;padding:0}</style><slot></slot>'}});
customElements.define('ha-icon',class extends HTMLElement{connectedCallback(){(this.shadowRoot||this.attachShadow({mode:'open'})).innerHTML=
  '<style>:host{display:inline-flex;width:var(--mdc-icon-size,24px);height:var(--mdc-icon-size,24px)}i{flex:1;border-radius:30%;background:currentColor;opacity:.55}</style><i></i>'}});
window.st = (state, unit, extra) => ({state: String(state), attributes: {...(unit ? {unit_of_measurement: unit} : {}), ...(extra || {})}});
// Zustände passend zu den Standard-Entitäten der Card (aus ihrer eigenen Standard-Konfiguration abgeleitet)
window.baseStates = () => {
  const cfg = customElements.get('nas-card').getStubConfig(), s = {};
  for (const [k, id] of Object.entries(cfg)) {
    if (!k.endsWith('_entity') || !id) continue;
    const d = id.split('.')[0];
    if (d === 'button' || d === 'switch') s[id] = st(d === 'switch' ? 'on' : 'unknown');
    else if (d === 'update') s[id] = st('off', '', {installed_version: '7.2.2-72806', latest_version: '7.2.2-72806'});
    else if (d === 'binary_sensor') s[id] = st('off');
    else if (/temperatur/.test(id)) s[id] = st('38', '°C');
    else if (/cpu/.test(k)) s[id] = st('12', '%');
    else if (/memory/.test(k)) s[id] = st('41', '%');
    else if (/percent/.test(k)) s[id] = st('63.4', '%');
    else if (/used/.test(k)) s[id] = st('2.31', 'TB');
    else if (/inbound|outbound/.test(k)) s[id] = st('12.4', 'kB/s');
    else if (/last_start/.test(k)) s[id] = st('12. Oktober 2026 um 08:15');
    else s[id] = st('normal');
  }
  return s;
};
window.fixture = ({width = 350, config = {}, language = 'de', states = window.baseStates(), fail = false} = {}) => {
  const w = document.getElementById('w');
  w.replaceChildren();
  w.style.width = width + 'px';
  const card = document.createElement('nas-card'), events = [], calls = [];
  card.addEventListener('hass-more-info', (e) => events.push(e.detail.entityId));
  const mk = (s) => ({states: s, language, locale: {language}, callService: (...a) => { calls.push(a); return fail ? Promise.reject(new Error('x')) : Promise.resolve(); }});
  card.setConfig(config);
  w.appendChild(card);
  card.hass = mk(states);
  return {card, events, calls, cfg: card._config, set: (s) => { card.hass = mk(s); }};
};
</script>"""

TEST_JS = r"""
async () => {
  const results = [], check = (name, pass) => results.push({name, pass: !!pass});
  const attack = '"><img id="injected" src=x onerror="window.__injected=1"><script>window.__injected=1<\/script>&';
  const turn = (ms = 0) => new Promise((r) => setTimeout(r, ms));
  const frames = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  const {fixture, baseStates, st} = window;
  const q = (card, sel) => card.shadowRoot.querySelector(sel);
  const qa = (card, sel) => [...card.shadowRoot.querySelectorAll(sel)];
  const text = (el) => el?.textContent.replace(/\s+/g, ' ').trim();
  const more = (card, id) => q(card, `[data-more="${id}"]`);
  const act = (card, id) => q(card, `[data-press="${id}"]`);
  const clean = (root) => !root.querySelector('#injected, script') && !window.__injected &&
    ![...root.querySelectorAll('*')].some((el) => [...el.attributes].some((a) => /^on/i.test(a.name)));

  // ---- Aufbau ----
  {
    const {card, events, cfg} = fixture();
    await frames();
    check('Titel, vier Messwerte, zwei Laufwerke und zwei Aktionen vorhanden', text(q(card, 'h1')) === 'DS720+' && qa(card, '.tiles .tile').length === 4 && qa(card, '.drive').length === 2 && qa(card, '.act').length === 2);
    more(card, cfg.cpu_entity).click();
    more(card, cfg.update_entity).click();
    check('Klick öffnet die passende Entität', events.join() === [cfg.cpu_entity, cfg.update_entity].join());
    check('Version in der Update-Zeile', /7\.2\.2-72806/.test(text(q(card, '.update'))));
  }

  // ---- Angleichen statt Neuaufbau ----
  {
    const {card, events, set, cfg} = fixture();
    await turn(50);
    const keep = () => ({card: q(card, 'ha-card'), img: q(card, 'img'), cpu: more(card, cfg.cpu_entity), ring: q(card, '.ring'), down: more(card, cfg.inbound_entity),
      drive: q(card, '.drive'), reboot: act(card, cfg.reboot_entity), icon: q(card, '.tile ha-icon'), upd: q(card, '.update')});
    const before = keep();
    before.cpu.focus();
    const s = baseStates();
    s[cfg.cpu_entity] = st('93', '%');
    s[cfg.inbound_entity] = st('2048.5', 'kB/s');
    s[cfg.volume_percent_entity] = st('91', '%');
    s[cfg.update_entity] = st('on', '', {installed_version: '7.2.2-72806', latest_version: '7.2.3-80000'});
    set(s);
    const after = keep();
    check('Neue Werte erscheinen (CPU, Durchsatz, Volume, Update)', /93/.test(text(after.cpu)) && /2[.,]?048/.test(text(after.down)) && /91/.test(text(q(card, '.donut'))) && /7\.2\.3-80000/.test(text(after.upd)));
    check('Kein Neuaufbau: Card, Bild, Kacheln, Ring, Laufwerke und Schaltflächen bleiben dieselben Elemente', Object.keys(before).every((k) => before[k] === after[k]));
    check('Ring wird am bestehenden Element gesetzt, Töne folgen den Schwellwerten', after.ring.style.getPropertyValue('--p') === (91 * 3.6) + 'deg' && after.cpu.classList.contains('tone-error') && q(card, '.volume').classList.contains('tone-error'));
    check('Tastaturfokus bleibt nach einer Wertänderung erhalten', card.shadowRoot.activeElement === before.cpu);
    for (let i = 0; i < 10; i++) { s[cfg.inbound_entity] = st(String(i), 'kB/s'); set({...s}); }
    after.cpu.click();
    check('Klick löst nach vielen Aktualisierungen genau einmal aus', events.length === 1 && events[0] === cfg.cpu_entity);
    const node = q(card, '.drive b').firstChild;
    set({...s, 'sensor.fremd': st('1')});
    check('Fremde Zustandsänderung fasst nichts an', q(card, '.drive b').firstChild === node);
    card.setConfig({title: 'Neu'});
    check('Geänderte Einstellung baut neu auf', text(q(card, 'h1')) === 'Neu' && q(card, 'ha-card') !== before.card);
  }

  // ---- Aktionen: Bestätigung übersteht eintreffende Werte ----
  {
    const {card, calls, set, cfg} = fixture();
    const id = cfg.reboot_entity, btn = act(card, id), title = text(btn.querySelector('b'));
    btn.click();
    check('Erstes Tippen schaltet nur scharf', act(card, id).classList.contains('arm') && calls.length === 0 && text(act(card, id).querySelector('b')) === 'Nochmal tippen');
    const s = baseStates();
    s[cfg.inbound_entity] = st('999', 'kB/s');
    s[cfg.cpu_entity] = st('55', '%');
    set(s);
    check('Bestätigung bleibt bei eintreffenden Werten stehen (dieselbe Schaltfläche)', act(card, id) === btn && btn.classList.contains('arm') && text(btn.querySelector('b')) === 'Nochmal tippen');
    btn.click();
    await turn(20);
    check('Zweites Tippen sendet genau einen Aufruf an die richtige Entität', calls.length === 1 && calls[0][0] === 'button' && calls[0][1] === 'press' && calls[0][2].entity_id === id && btn.classList.contains('sent'));
    btn.click();
    await turn(20);
    check('Tippen während „Gesendet" löst nichts aus', calls.length === 1 && !btn.classList.contains('arm'));
    set({...s, [cfg.cpu_entity]: st('56', '%')});
    check('„Gesendet" bleibt bei eintreffenden Werten stehen', btn.classList.contains('sent'));
    await turn(2700);
    check('Danach wieder Ausgangszustand', !btn.classList.contains('sent') && !btn.classList.contains('arm') && text(btn.querySelector('b')) === title);
    btn.click();
    await turn(4300);
    check('Bestätigung verfällt nach 4 Sekunden ohne Aufruf', !btn.classList.contains('arm') && calls.length === 1);
    const b = fixture({config: {confirm_actions: false}});
    act(b.card, b.cfg.reboot_entity).click();
    await turn(20);
    check('Ohne Bestätigung löst das erste Tippen aus', b.calls.length === 1);
    const f = fixture({config: {confirm_actions: false}, fail: true});
    act(f.card, f.cfg.reboot_entity).click();
    await turn(30);
    check('Abgelehnter Aufruf: kein „Gesendet", kein unbehandelter Fehler', !act(f.card, f.cfg.reboot_entity).classList.contains('sent') && !window.__errors.some((e) => /rejection/.test(e)));
    const g = fixture();
    act(g.card, g.cfg.reboot_entity).click();
    g.card.remove();
    await turn(4300);
    check('Entfernen mit scharfer Schaltfläche: kein Fehler nach Ablauf', window.__errors.length === 0);
  }

  // ---- Angeglichene Card entspricht einer frisch aufgebauten ----
  {
    const a = fixture({width: 480}), cfg = a.cfg, s = baseStates();
    const variants = [
      () => { s[cfg.cpu_entity] = st('77', '%'); s[cfg.memory_entity] = st('95', '%'); },
      () => { s[cfg.volume_percent_entity] = st('unavailable', '%'); delete s[cfg.inbound_entity]; },
      () => { s[cfg.update_entity] = st('on', '', {installed_version: '1', latest_version: '2'}); s[cfg.drive1_temperature_entity] = st('unknown', '°C'); },
      () => { s[cfg.volume_percent_entity] = st('12', '%'); s[cfg.volume_used_entity] = st('0.5', 'TB'); s[cfg.security_entity] = st('unsafe'); },
      () => { Object.assign(s, baseStates()); },
    ];
    const box = document.createElement('div'); box.style.width = '480px'; document.body.appendChild(box);
    const snap = (c) => q(c, 'ha-card').outerHTML.replace(/\s+/g, ' ');
    let same = true, at = -1;
    for (let i = 0; i < variants.length && same; i++) {
      variants[i]();
      a.set({...s});
      const fresh = document.createElement('nas-card');
      fresh.setConfig({});
      box.replaceChildren(fresh);
      fresh.hass = {states: {...s}, language: 'de', locale: {language: 'de'}};
      await frames();
      if (snap(a.card) !== snap(fresh)) { same = false; at = i; }
    }
    box.remove();
    check('Angeglichene Card entspricht nach jedem Schritt einer frisch aufgebauten' + (same ? '' : ' (Abweichung in Schritt ' + at + ')'), same);
  }

  // ---- HTML-Injection: erster Aufbau und Angleichen ----
  {
    const {card} = fixture({config: {title: attack, subtitle: attack, volume_title: attack, drive1_title: attack, update_title: attack, image_url: attack, cpu_entity: 'sensor.x' + attack, reboot_entity: 'button.x' + attack}});
    await turn(50);
    check('Injection über Konfiguration bleibt Text', clean(card.shadowRoot) && text(q(card, 'h1')).includes('<img id="injected"'));
    const b = fixture();
    const s = baseStates();
    for (const id of Object.keys(s)) s[id] = st(attack, attack, {installed_version: attack, latest_version: attack + '2'});
    b.set(s);
    await turn(50);
    check('Injection über Zustände, Einheiten und Versionen bleibt beim Angleichen Text', clean(b.card.shadowRoot) && text(q(b.card, '.update')).includes('<img id="injected"') && text(more(b.card, b.cfg.cpu_entity)).includes('<img id="injected"'));
    act(b.card, b.cfg.reboot_entity).click();
    check('Injection bleibt auch mit scharfer Schaltfläche Text', clean(b.card.shadowRoot));
  }

  // ---- Bild ----
  for (const early of [true, false]) {
    const bad = 'http://127.0.0.1:9/gibt-es-nicht-' + early + '.png';
    const w = document.getElementById('w');
    w.replaceChildren();
    w.style.width = '350px';
    const c = document.createElement('nas-card'), hass = {states: baseStates(), language: 'de', locale: {language: 'de'}};
    if (early) c.hass = hass;
    c.setConfig({image_url: bad});
    w.appendChild(c);
    if (!early) c.hass = hass;
    c.setConfig({image_url: bad, title: 'y'});
    for (let i = 0; i < 40 && !q(c, 'img').getAttribute('src').startsWith('data:'); i++) await turn(100);
    await turn(200);
    const im = q(c, 'img');
    c.hass = {...hass, states: {...hass.states, 'sensor.x': st('1')}};
    check('Fehlendes eigenes Bild (' + (early ? 'Werte zuerst' : 'Einstellung zuerst') + ', Neuaufbau während des Ladens): Ersatzbild sichtbar und bleibt',
      im.getAttribute('src').startsWith('data:') && getComputedStyle(im).display !== 'none' && q(c, 'img') === im);
  }
  {
    const a = fixture({config: {show_image: false}}).card;
    check('Bild abschaltbar', !q(a, 'img'));
    const b = fixture({config: {image_mode: 'inline'}}).card;
    check('Bild neben dem Titel', !!q(b, '.art img') && !q(b, '.bgimg'));
  }

  // ---- Layout ----
  for (const mode of ['background', 'inline']) for (const [width, fs, cls] of [[300, '14px', 'slim'], [350, '14px', ''], [460, '15px', ''], [500, '15px', 'wide'], [580, '15px', 'wide w560'], [640, '17px', 'wide w560 w620'], [800, '19px', 'wide w560 w620'], [1100, '22px', 'wide w560 w620']]) {
    const {card} = fixture({width, config: {image_mode: mode}});
    await frames();
    const hc = q(card, 'ha-card'), r = hc.getBoundingClientRect();
    const inside = qa(card, '.tile, .panel, .act, .info, h1, .pill').every((el) => { const b = el.getBoundingClientRect(); return b.left >= r.left - .5 && b.right <= r.right + .5; });
    const got = ['wide', 'w560', 'w620', 'slim'].filter((k) => hc.classList.contains(k)).join(' ');
    check(`${width} px (${mode}): Schriftstufe ${fs}, Layout „${cls || 'normal'}"`, card.style.getPropertyValue('--fs') === fs && got === cls);
    check(`${width} px (${mode}): nichts ragt aus der Card`, inside && q(card, 'main').scrollWidth <= Math.ceil(r.width));
    const rows = card.getGridOptions().min_rows, h = q(card, 'main').offsetHeight;
    check(`${width} px (${mode}): gemeldete Mindesthöhe deckt den Inhalt knapp`, rows * 64 - 8 >= h && (rows - 1) * 64 - 8 < h + 2);
  }
  {
    const a = fixture({width: 800, config: {layout: 'compact'}}).card, b = fixture({width: 350, config: {layout: 'wide'}}).card;
    await frames();
    check('Layout-Option erzwingt kompakt bzw. breit', !q(a, 'ha-card').classList.contains('wide') && !q(a, 'ha-card').classList.contains('w620') && q(b, 'ha-card').classList.contains('wide'));
  }
  for (const [T, k] of [[480, 'wide'], [560, 'w560'], [620, 'w620']]) {
    const {card} = fixture({width: T - 5});
    await frames();
    const w = document.getElementById('w'), read = () => (q(card, 'ha-card').classList.contains(k) ? 'j' : 'n'), seen = [read()];
    for (const px of [T + 5, T - 5, T + 9, T + 14, T - 8, T - 14]) { w.style.width = px + 'px'; await frames(); await frames(); seen.push(read()); }
    check(`Hysterese um ${T} px: ±12 px kippen nichts (${seen.join(' ')})`, seen.join() === 'n,n,n,n,j,j,n');
  }
  // Nachgebildete Scrollleiste, gezielt: Für jede Breite W wird die Höhe bei W und bei W−15 gemessen. Ist die Card bei W
  // höher als bei W−15, liegt die Seitenhöhe H dazwischen: Dann blendet die Scrollleiste ein (Platz −15 px) und wieder aus.
  // Die Breite muss sich trotzdem einpendeln.
  for (const mode of ['background', 'inline']) {
    const host = document.getElementById('w');
    host.replaceChildren();
    host.style.width = 'auto';
    const hass = {states: baseStates(), language: 'de', locale: {language: 'de'}, callService() {}};
    const height = (c) => c.shadowRoot.querySelector('ha-card').offsetHeight;
    const cards = [];
    for (let W = 300; W <= 1100; W += 4) {
      const box = document.createElement('div'); box.style.width = W + 'px';
      const c = document.createElement('nas-card'); c.setConfig({image_mode: mode}); box.appendChild(c); host.appendChild(box); c.hass = hass;
      cards.push({box, c, W, cur: W, n: 0});
    }
    await frames();
    cards.forEach((o) => { o.h1 = height(o.c); o.box.style.width = (o.W - 15) + 'px'; });
    await frames(); await frames();
    cards.forEach((o) => { o.h2 = height(o.c); o.H = (o.h1 + o.h2) / 2; o.cur = o.W - 15; });
    const risky = cards.filter((o) => o.h1 > o.h2 + .5);
    for (let f = 0; f < 50; f++) {
      const now = risky.map((o) => height(o.c));
      risky.forEach((o, i) => { const want = o.W - (now[i] > o.H ? 15 : 0); if (want !== o.cur) { o.cur = want; o.box.style.width = want + 'px'; o.n++; } });
      await frames();
    }
    const bad = risky.filter((o) => o.n > 4).map((o) => o.W);
    check(`Scrollleiste (${mode}): ${risky.length} gefährdete Breiten von 300 bis 1100 px pendeln sich ein` + (bad.length ? ' – pendelt bei ' + bad.slice(0, 12).join(', ') : ''), bad.length === 0);
  }
  {
    const {card, set} = fixture({width: 800});
    await frames();
    card.remove();
    document.getElementById('w').appendChild(card);
    await frames();
    check('Entfernen und Wiedereinhängen ohne Fehler', text(q(card, 'h1')) === 'DS720+' && q(card, 'ha-card').classList.contains('wide'));
    const first = q(card, '.tile');
    first.focus();
    check('Sichtbarer Fokusrahmen', !first.matches(':focus-visible') || parseFloat(getComputedStyle(first).outlineWidth) >= 2);
    const e = fixture({language: 'en'}).card;
    check('Englisch, wenn Home Assistant nicht deutsch ist', /Restart|Reboot/i.test(text(q(e, '.foot'))));
    const empty = fixture({states: {}}).card;
    check('Ohne jede Entität: Aufbau ohne Fehler', qa(empty, '.tile').length >= 4);
  }
  await frames();
  check('Keine Fehlermeldungen des Browsers, auch kein „ResizeObserver loop" (' + window.__errors.slice(0, 2).join(' | ') + ')', window.__errors.length === 0);
  return results;
}
"""


def launch(p):
    executable = os.environ.get("PLAYWRIGHT_CHROMIUM_EXECUTABLE")
    return p.chromium.launch(**({"executable_path": executable, "args": ["--no-sandbox"]} if executable else {}))


def main():
    source = (ROOT / "nas-card.js").read_text(encoding="utf8")
    errors = []
    with sync_playwright() as p:
        browser = launch(p)
        page = browser.new_page(viewport={"width": 1200, "height": 1000})
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.set_content(PAGE)
        page.add_script_tag(content=source)
        results = page.evaluate(TEST_JS)
        results.append({"name": "keine JavaScript-Fehler", "pass": not errors})
        if "--preview" in sys.argv:
            out = ROOT / "tests" / "out"
            out.mkdir(exist_ok=True)
            for width in (300, 350, 800):
                for mode in ("background", "inline"):
                    shot = browser.new_page(viewport={"width": width + 28, "height": 400}, device_scale_factor=2)
                    shot.set_content(PAGE)
                    shot.add_script_tag(content=source)
                    shot.evaluate("([width, mode]) => { window.fixture({width, config: {image_mode: mode}}); }", [width, mode])
                    shot.wait_for_timeout(200)
                    shot.screenshot(path=str(out / f"nas-{mode}-{width}.png"), full_page=True)
                    shot.close()
        browser.close()
    for result in results:
        print(("PASS " if result["pass"] else "FAIL ") + result["name"])
    failures = sum(not result["pass"] for result in results)
    print(f"\n{len(results)} Prüfungen, {failures} Fehler")
    if errors:
        print(errors)
    return bool(failures)


if __name__ == "__main__":
    raise SystemExit(main())
