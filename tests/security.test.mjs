import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const elements = new Map();
const context = vm.createContext({
  HTMLElement: class {
    attachShadow() {
      this.shadowRoot = { innerHTML: "", querySelector: () => null, querySelectorAll: () => [] };
    }
  },
  customElements: { get: (name) => elements.get(name), define: (name, cls) => elements.set(name, cls) },
  window: {}, console: { info() {} },
});
vm.runInContext(readFileSync(new URL("../nas-card.js", import.meta.url), "utf8"), context);
const Card = elements.get("nas-card");
const attack = '<img src=x onerror="alert(document.domain)">';

test("volume unit is escaped in used, free and total values", () => {
  const card = new Card();
  card.hass = { states: {
    "sensor.percent": { state: "25", attributes: {} },
    "sensor.used": { state: "10", attributes: { unit_of_measurement: attack } },
  } };
  card.setConfig({ volume_percent_entity: "sensor.percent", volume_used_entity: "sensor.used" });
  const html = card.shadowRoot.innerHTML;
  assert.ok(!html.includes(attack));
  const values = html.match(/<dd>.*?<\/dd>/g);
  assert.equal(values.length, 3);
  for (const value of values) {
    assert.match(value, /&lt;img src=x onerror=&quot;alert\(document.domain\)&quot;&gt;/);
    assert.ok(!value.includes("<img"));
  }
  assert.match(values[0], /10 /);
  assert.match(values[1], /30 /);
  assert.match(values[2], /40 /);
});

test("entity states, update versions, titles and image attributes cannot create markup", () => {
  const card = new Card();
  card.hass = { states: {
    "sensor.temp": { state: attack, attributes: {} },
    "update.dsm": { state: "on", attributes: { installed_version: attack, latest_version: attack + "2" } },
  } };
  card.setConfig({ title: attack, subtitle: attack, volume_title: attack, drive1_title: attack,
    temperature_entity: "sensor.temp", update_entity: "update.dsm", image_url: 'x" onerror="alert(1)' });
  const html = card.shadowRoot.innerHTML;
  assert.ok(!html.includes(attack));
  assert.ok(!html.includes('src="x" onerror='));
  assert.match(html, /src="x&quot; onerror=&quot;alert\(1\)"/);
  assert.match(html, /&lt;img/);
});
