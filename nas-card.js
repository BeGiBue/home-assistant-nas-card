// NAS Card v2.0.1 – Hochformat / Touch / Kiosk — AGPL-3.0-only — BeGiBue
const NAS_CARD_VERSION="2.0.1";
const EMBEDDED_IMAGE_URL="data:image/webp;base64,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";
const DEF={title:"DS720+",subtitle:"Synology NAS",show_image:true,image_mode:"background",layout:"auto",image_url:"",scale:1,confirm_actions:true,
temperature_entity:"sensor.diskstation_temperatur",cpu_entity:"sensor.diskstation_cpu_auslastung_gesamt",memory_entity:"sensor.diskstation_speichernutzung_real",security_entity:"binary_sensor.diskstation_sicherheitsstatus",
inbound_entity:"sensor.diskstation_download_durchsatz",outbound_entity:"sensor.diskstation_upload_durchsatz",
volume_title:"Volume 1",volume_percent_entity:"sensor.diskstation_volume_1_verwendetes_volumen",volume_used_entity:"sensor.diskstation_volume_1_belegter_speicherplatz",volume_status_entity:"sensor.diskstation_volume_1_status",
drive1_title:"Drive 1",drive1_temperature_entity:"sensor.diskstation_drive_1_temperatur",drive1_lifetime_entity:"binary_sensor.diskstation_drive_1_unterhalb_der_mindestrestlebensdauer",drive1_sectors_entity:"binary_sensor.diskstation_drive_1_max_fehlerhafte_sektoren_uberschritten",drive1_status_entity:"sensor.diskstation_drive_1_status",
drive2_title:"Drive 2",drive2_temperature_entity:"sensor.diskstation_drive_2_temperatur",drive2_lifetime_entity:"binary_sensor.diskstation_drive_2_unterhalb_der_mindestrestlebensdauer",drive2_sectors_entity:"binary_sensor.diskstation_drive_2_max_fehlerhafte_sektoren_uberschritten",drive2_status_entity:"sensor.diskstation_drive_2_status",
update_title:"DSM Update",update_entity:"update.diskstation_dsm_update",reboot_entity:"button.diskstation_reboot",last_start_entity:"sensor.diskstation_letzter_start",shutdown_entity:"button.diskstation_shutdown"};

class NasCard extends HTMLElement{
  constructor(){super();this.attachShadow({mode:"open"});this._config={...DEF};this._sig="";}
  static getStubConfig(){return{...DEF};}
  static getConfigForm(){
    const e=n=>({name:n,selector:{entity:{}}}),t=n=>({name:n,selector:{text:{}}}),x=(name,title,schema)=>({type:"expandable",name,title,flatten:true,schema});
    const L={title:"Titel",subtitle:"Untertitel",show_image:"Gerätebild anzeigen",image_mode:"Gerätebild-Darstellung",layout:"Layout",image_url:"Eigenes Gerätebild (URL, optional)",scale:"Größe (Kiosk: 1,2 – 1,5)",confirm_actions:"Neustart/Herunterfahren bestätigen lassen",
      temperature_entity:"Temperatur",cpu_entity:"CPU-Auslastung",memory_entity:"Speichernutzung / RAM",security_entity:"Sicherheitsstatus",inbound_entity:"Inbound / Download",outbound_entity:"Outbound / Upload",
      volume_title:"Titel",volume_percent_entity:"Verwendetes Volumen (%)",volume_used_entity:"Belegter Speicherplatz",volume_status_entity:"Status",
      drive1_title:"Titel",drive1_temperature_entity:"Temperatur",drive1_lifetime_entity:"Mindestrestlebensdauer unterschritten",drive1_sectors_entity:"Fehlerhafte Sektoren überschritten",drive1_status_entity:"Status",
      drive2_title:"Titel",drive2_temperature_entity:"Temperatur",drive2_lifetime_entity:"Mindestrestlebensdauer unterschritten",drive2_sectors_entity:"Fehlerhafte Sektoren überschritten",drive2_status_entity:"Status",
      update_title:"Titel",update_entity:"Update-Entität",reboot_entity:"Neustart",last_start_entity:"Letzter Start",shutdown_entity:"Herunterfahren"};
    return{schema:[
      x("general","Allgemein",[t("title"),t("subtitle"),{name:"show_image",selector:{boolean:{}}},{name:"image_mode",selector:{select:{mode:"dropdown",options:[{value:"background",label:"Groß im Hintergrund"},{value:"inline",label:"Neben dem Titel"}]}}},{name:"layout",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Automatisch (breit ab 480 px)"},{value:"wide",label:"Immer breit"},{value:"compact",label:"Immer kompakt"}]}}},t("image_url"),{name:"scale",selector:{number:{min:.8,max:1.8,step:.05,mode:"slider"}}},{name:"confirm_actions",selector:{boolean:{}}}]),
      x("system","System",[e("temperature_entity"),e("cpu_entity"),e("memory_entity"),e("security_entity")]),
      x("network","Netzwerk",[e("inbound_entity"),e("outbound_entity")]),
      x("volume","Volume",[t("volume_title"),e("volume_percent_entity"),e("volume_used_entity"),e("volume_status_entity")]),
      x("drive1","Laufwerk 1",[t("drive1_title"),e("drive1_temperature_entity"),e("drive1_lifetime_entity"),e("drive1_sectors_entity"),e("drive1_status_entity")]),
      x("drive2","Laufwerk 2",[t("drive2_title"),e("drive2_temperature_entity"),e("drive2_lifetime_entity"),e("drive2_sectors_entity"),e("drive2_status_entity")]),
      x("update","Update",[t("update_title"),e("update_entity")]),
      x("actions","Aktionen",[e("reboot_entity"),e("last_start_entity"),e("shutdown_entity")])],
      computeLabel:s=>L[s.name],computeHelper:s=>s.name==="image_url"?"Leer = eingebettetes DS720+-Standardbild.":undefined};
  }
  connectedCallback(){if(!this._ro)this._ro=new ResizeObserver(()=>{this._layout();this._measure();});this._ro.observe(this);this._layout();}
  disconnectedCallback(){this._ro?.disconnect();}
  // Breites Layout ab 480 px Kartenbreite (statt vorher 600 px) oder per Option erzwungen
  _layout(){const card=this.shadowRoot?.querySelector("ha-card");if(!card)return;const l=this._config.layout,w=this.clientWidth;card.classList.toggle("wide",l==="wide"||(l!=="compact"&&w>=480));}
  setConfig(c){this._config={...DEF,...c};this._sig="";this._update();}
  set hass(h){this._hass=h;this._update();}
  get hass(){return this._hass;}
  getCardSize(){return 12;}
  // min_rows verhindert, dass im Layout-Editor weniger Zeilen eingestellt werden als der Inhalt braucht
  getGridOptions(){return{columns:12,min_columns:4,min_rows:this._minRows||Math.ceil((900*this._scale()+8)/64)};}
  // scale auf 0,8 – 1,8 begrenzen; ungültige Werte = 1
  _scale(){return Math.min(1.8,Math.max(.8,Number(this._config.scale)||1));}
  // Natürliche Inhaltshöhe in Grid-Zeilen umrechnen (HA: 56 px Zeile + 8 px Abstand)
  _measure(){
    const card=this.shadowRoot?.querySelector("ha-card"),main=card?.querySelector("main");
    if(!main||!this.clientWidth)return;
    const cs=getComputedStyle(card),hs=getComputedStyle(this);
    const h=main.offsetHeight+parseFloat(cs.borderTopWidth)+parseFloat(cs.borderBottomWidth);
    const rh=parseFloat(hs.getPropertyValue("--row-height"))||56,gap=parseFloat(hs.getPropertyValue("--row-gap"))||8;
    this._minRows=Math.max(1,Math.ceil((h+gap)/(rh+gap)));
  }

  _s(id){return id&&this._hass?.states?.[id];}
  _na(s){return!s||["unavailable","unknown",""].includes(s.state);}
  _e(v){return String(v??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");}
  _more(id){if(id)this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:true,composed:true,detail:{entityId:id}}));}
  _n(id){const s=this._s(id),n=Number(String(s?.state??"").replace(",","."));return Number.isFinite(n)?n:NaN;}
  _f(id){const s=this._s(id);if(this._na(s))return"—";try{if(this._hass?.formatEntityState)return this._hass.formatEntityState(s);}catch(_){}const u=s.attributes?.unit_of_measurement;return`${s.state}${u?` ${u}`:""}`;}
  // Zahl und Einheit getrennt
  _val(id){
    const s=this._s(id);
    if(this._na(s))return{value:"—",unit:"",num:NaN,text:true};
    const txt=this._f(id),m=String(txt).match(/^(-?[\d.,\s]+?)\s*([^\d\s.,].*)?$/),num=parseFloat(String(s.state).replace(",","."));
    if(m)return{value:m[1].trim(),unit:(m[2]||s.attributes?.unit_of_measurement||"").trim(),num,text:false};
    return{value:txt,unit:"",num:NaN,text:true};
  }
  _tone(id){
    const s=this._s(id);if(!s)return"neutral";
    const d=s.entity_id?.split(".")[0],v=String(s.state).toLowerCase();
    if(d==="binary_sensor")return v==="on"?"error":"success";
    if(d==="update")return v==="on"?"warning":"success";
    if(/error|fail|bad|critical|fault|degraded|problem|crashed/.test(v))return"error";
    if(/warn|attention|pending/.test(v))return"warning";
    if(/normal|ok|healthy|good|safe|secure|online|connected|optimal/.test(v))return"success";
    return"neutral";
  }
  // Warnstufe: ab w orange, ab e rot (keine Zahl = normal)
  _lvl(n,w,e){return n>=e?"error":n>=w?"warning":"primary";}

  _update(){
    const c=this._config;
    const ids=Object.keys(c).filter(k=>k.endsWith("_entity")).map(k=>c[k]);
    const sig=JSON.stringify(c)+ids.map(id=>{const s=this._s(id);return s?`${s.state}|${s.attributes?.unit_of_measurement||""}|${s.attributes?.latest_version||""}`:"-";}).join("§")+(this._hass?.language||"");
    if(sig===this._sig)return;
    this._sig=sig;this._render();
  }

  _tile(icon,id,label,tone,bar){
    const v=this._val(id);
    const b=bar&&!isNaN(v.num)&&v.unit==="%"?`<i class="bar"><u style="width:${Math.max(0,Math.min(100,v.num))}%"></u></i>`:"";
    return`<button class="tile tone-${tone}" data-more="${this._e(id)}" aria-label="${this._e(label)}: ${this._e(v.value)} ${this._e(v.unit)}"><span class="chip"><ha-icon icon="${icon}"></ha-icon></span><span class="lbl">${label}</span><span class="val${v.text?" txt":""}"><b>${this._e(v.value)}</b>${v.unit?`<em>${this._e(v.unit)}</em>`:""}</span>${b}</button>`;
  }
  _net(icon,id,label){
    const v=this._val(id);
    return`<button class="tile net tone-primary" data-more="${this._e(id)}"><span class="chip round"><ha-icon icon="${icon}"></ha-icon></span><span class="lbl">${label}</span><span class="val"><b>${this._e(v.value)}</b>${v.unit?`<em>${this._e(v.unit)}</em>`:""}</span></button>`;
  }
  _drive(n){
    const c=this._config,k=`drive${n}_`,title=c[k+"title"],temp=c[k+"temperature_entity"],life=c[k+"lifetime_entity"],sec=c[k+"sectors_entity"],status=c[k+"status_entity"];
    // Bezeichnung links, Wert rechts – wie Belegt/Frei/Gesamt in der Volume-Box
    const row=(id,l,t)=>{const v=this._val(id);return`<button class="drow tone-${t}" data-more="${this._e(id)}"><span>${l}</span><b>${this._e(v.value)}${v.unit?` <em>${this._e(v.unit)}</em>`:""}</b></button>`;};
    const stT=this._tone(status);
    return`<section class="panel drive"><header><span class="chip"><ha-icon icon="mdi:harddisk"></ha-icon></span><h3>${this._e(title)}</h3><button class="pill tone-${stT}" data-more="${this._e(status)}"><i class="dot"></i><b>${this._e(this._f(status))}</b></button></header><div class="drows">${row(temp,"Temperatur","primary")}${row(life,"Lebensdauer",this._tone(life))}${row(sec,"Sektoren",this._tone(sec))}</div></section>`;
  }
  _act(icon,id,title,sub,danger){
    return`<button class="act${danger?" danger":""}" data-press="${this._e(id)}" data-t="${this._e(title)}" data-s="${this._e(sub)}"><span class="chip"><ha-icon icon="${icon}"></ha-icon></span><span class="at"><b>${this._e(title)}</b><small>${this._e(sub)}</small></span></button>`;
  }

  async _press(btn){
    const id=btn.dataset.press;if(!id||!this._hass)return;
    // Erstes Tippen nur "scharf schalten", erst das zweite löst aus
    if(this._config.confirm_actions!==false&&!btn.classList.contains("arm")){
      btn.classList.add("arm");
      btn.querySelector("b").textContent="Nochmal tippen";
      btn.querySelector("small").textContent="zum Bestätigen";
      clearTimeout(btn._t);
      btn._t=setTimeout(()=>this._disarm(btn),4000);
      return;
    }
    clearTimeout(btn._t);
    const d=id.split(".")[0];
    try{
      if(d==="button")await this._hass.callService("button","press",{entity_id:id});
      else await this._hass.callService("homeassistant","toggle",{entity_id:id});
      btn.classList.remove("arm");btn.classList.add("sent");
      btn.querySelector("b").textContent="Gesendet";btn.querySelector("small").textContent="";
      btn._t=setTimeout(()=>this._disarm(btn),2500);
    }catch(_){this._disarm(btn);}
  }
  _disarm(btn){btn.classList.remove("arm","sent");btn.querySelector("b").textContent=btn.dataset.t;btn.querySelector("small").textContent=btn.dataset.s;}

  _render(){
    const c=this._config,loc=this._hass?.locale?.language||"de-DE";
    const sc=this._scale(),bgm=c.image_mode!=="inline";
    const p=Math.max(0,Math.min(100,this._n(c.volume_percent_entity)||0)),u=this._n(c.volume_used_entity);
    const tot=p>0&&Number.isFinite(u)?u/(p/100):NaN,free=Number.isFinite(tot)?tot-u:NaN;
    const unit=this._s(c.volume_used_entity)?.attributes?.unit_of_measurement||"";
    const fmt=n=>Number.isFinite(n)?`${new Intl.NumberFormat(loc,{maximumFractionDigits:2}).format(n)}${unit?` ${unit}`:""}`:"—";
    const img=c.image_url?.trim()||EMBEDDED_IMAGE_URL;
    const dTone=this._lvl(p,80,90);
    const vs=this._tone(c.volume_status_entity);
    const upT=this._tone(c.update_entity);
    const{installed_version:iv,latest_version:lv}=this._s(c.update_entity)?.attributes||{};
    const ver=iv?(lv&&lv!==iv?`${iv} → ${lv}`:`Version ${iv}`):"";
    this.shadowRoot.innerHTML=`<style>${NasCard.css}</style><ha-card class="${bgm?"bgm":""}" style="--s:${sc}">${bgm&&c.show_image?`<img class="bgimg nas" alt="" src="${this._e(img)}">`:""}<main>
      <section class="panel hero">
        <div class="top">
          <div class="title"><span class="chip big"><ha-icon icon="mdi:nas"></ha-icon></span><div><h1>${this._e(c.title)}</h1><p>${this._e(c.subtitle)}</p></div></div>
          ${c.show_image&&!bgm?`<div class="art"><img class="nas" src="${this._e(img)}" alt="NAS"></div>`:""}
        </div>
        <div class="tiles">
          ${this._tile("mdi:thermometer",c.temperature_entity,"Temperatur","primary")}
          ${this._tile("mdi:cpu-64-bit",c.cpu_entity,"CPU",this._lvl(this._n(c.cpu_entity),75,90),true)}
          ${this._tile("mdi:memory",c.memory_entity,"RAM",this._lvl(this._n(c.memory_entity),80,90),true)}
          ${this._tile("mdi:shield-check-outline",c.security_entity,"Sicherheit",this._tone(c.security_entity))}
        </div>
      </section>
      <section class="two">${this._net("mdi:arrow-down",c.inbound_entity,"Download")}${this._net("mdi:arrow-up",c.outbound_entity,"Upload")}</section>
      <section class="panel volume tone-${dTone}">
        <div class="donut"><i class="ring" style="--p:${p*3.6}deg"></i><div><b>${p?`${p.toLocaleString(loc,{maximumFractionDigits:1})}<em>%</em>`:"—"}</b><small>belegt</small></div></div>
        <div class="vd">
          <header><h2>${this._e(c.volume_title)}</h2><button class="pill tone-${vs}" data-more="${this._e(c.volume_status_entity)}"><i class="dot"></i><b>${this._e(this._f(c.volume_status_entity))}</b></button></header>
          <dl><dt>Belegt</dt><dd>${this._e(fmt(u))}</dd><dt>Frei</dt><dd>${this._e(fmt(free))}</dd><dt>Gesamt</dt><dd>${this._e(fmt(tot))}</dd></dl>
        </div>
      </section>
      <section class="two drives">${this._drive(1)}${this._drive(2)}</section>
      <button class="panel update tone-${upT}" data-more="${this._e(c.update_entity)}"><span class="chip"><ha-icon icon="mdi:update"></ha-icon></span><span class="ut"><b>${this._e(c.update_title)}</b><small>${this._e(ver||this._f(c.update_entity))}</small></span><span class="pill static"><i class="dot"></i><b>${this._e(this._f(c.update_entity))}</b></span></button>
      <section class="foot">
        <button class="info" data-more="${this._e(c.last_start_entity)}"><span class="chip"><ha-icon icon="mdi:clock-outline"></ha-icon></span><span class="at"><b>Letzter Start</b><small>${this._e(this._f(c.last_start_entity))}</small></span></button>
        ${this._act("mdi:restart",c.reboot_entity,"Neustart","NAS neu starten",false)}
        ${this._act("mdi:power",c.shutdown_entity,"Herunterfahren","NAS ausschalten",true)}
      </section>
    </main></ha-card>`;
    const im=this.shadowRoot.querySelector(".nas");
    if(im)im.onerror=()=>{if(im.src!==EMBEDDED_IMAGE_URL)im.src=EMBEDDED_IMAGE_URL;else im.style.display="none";};
    this.shadowRoot.querySelectorAll("[data-more]").forEach(x=>x.onclick=()=>this._more(x.dataset.more));
    this.shadowRoot.querySelectorAll("[data-press]").forEach(x=>x.onclick=()=>this._press(x));
    this._layout();
    this._measure();
  }

  static get css(){return`
    :host{display:block;width:100%;height:100%;container-type:inline-size;
      --txt:var(--primary-text-color,#111);--mut:var(--secondary-text-color,#777);--pri:var(--primary-color,#03a9f4);
      --ok:var(--success-color,#4caf50);--warn:var(--warning-color,#ff9800);--err:var(--error-color,#f44336);
      --line:color-mix(in srgb,var(--txt) 12%,transparent);--fill:color-mix(in srgb,var(--txt) 5%,transparent);--fill-hi:color-mix(in srgb,var(--txt) 10%,transparent)}
    *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
    button{font:inherit;color:inherit;cursor:pointer;touch-action:manipulation;text-align:left;border:0;background:none;padding:0}
    /* Hintergrund, Rand, Radius und Blur kommen vom Theme (z. B. Frosted Glass) */
    ha-card{--s:1;position:relative;font-size:calc(14px*var(--s));height:100%;overflow:hidden;color:var(--txt);-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
    @container (min-width:400px){ha-card{font-size:calc(15px*var(--s))}}
    @container (min-width:600px){ha-card{font-size:calc(17px*var(--s))}}
    @container (min-width:800px){ha-card{font-size:calc(19px*var(--s))}}
    @container (min-width:1000px){ha-card{font-size:calc(22px*var(--s))}}
    main{padding:calc(16px*var(--s));display:grid;gap:.6em}
    .tone-primary{--t:var(--pri)}.tone-success{--t:var(--ok)}.tone-warning{--t:var(--warn)}.tone-error{--t:var(--err)}.tone-neutral{--t:var(--mut)}
    .panel{background:var(--fill);border:1px solid var(--line);border-radius:1.1em}
    .chip{--t:var(--pri);flex:none;display:grid;place-items:center;width:2.1em;height:2.1em;border-radius:.65em;background:color-mix(in srgb,var(--t) 18%,transparent);color:var(--t)}
    .chip ha-icon{--mdc-icon-size:1.3em}.chip.big{width:2.8em;height:2.8em;border-radius:.85em}.chip.big ha-icon{--mdc-icon-size:1.7em}.chip.round{border-radius:50%}
    .pill{display:inline-flex;align-items:center;gap:.5em;min-height:2em;padding:.15em .8em .15em .6em;border-radius:999px;color:var(--txt);background:color-mix(in srgb,var(--t) 16%,transparent);border:1px solid color-mix(in srgb,var(--t) 40%,transparent)}
    .pill b{font-weight:600;font-size:.9em;white-space:nowrap}
    .dot{width:.6em;height:.6em;border-radius:50%;background:var(--t);box-shadow:0 0 .55em .05em color-mix(in srgb,var(--t) 70%,transparent)}

    .hero{padding:0;display:grid;gap:.8em;background:none;border:0}
    .top{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,38%);align-items:center;gap:.6em}
    .title{display:flex;align-items:center;gap:.7em;min-width:0}
    h1{margin:0;font-size:1.7em;font-weight:600;line-height:1.1;letter-spacing:-.01em}
    .title p{margin:.25em 0 0;color:var(--mut);font-size:.9em}
    .art{display:flex;justify-content:flex-end}
    .art img{display:block;max-width:100%;max-height:6.5em;object-fit:contain;filter:drop-shadow(0 .4em .5em rgba(0,0,0,.25))}

    .tiles,.two{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.6em}
    /* Laufwerke nebeneinander, auch kompakt; untereinander erst, wenn eine Box schmaler als 11em würde */
    .two.drives{grid-template-columns:repeat(auto-fit,minmax(min(100%,11em),1fr))}
    .drive header .pill{flex:none}
    /* schmale Laufwerksbox: Symbol im Kopf weg, Pill enger – so bleibt der Text in der Box */
    @container (max-width:16em){.drive header{gap:.45em}.drive header .chip{display:none}.drive header .pill{gap:.35em;padding:.1em .6em .1em .45em}}
    .tile{min-width:0;min-height:5.6em;display:grid;grid-template-columns:auto minmax(0,1fr);grid-template-rows:auto 1fr;column-gap:.55em;align-items:center;padding:.75em;
      background:var(--fill);border:1px solid var(--line);border-radius:1em}
    .tile:active,.drow:active,.act:active,.info:active,.update:active{background:var(--fill-hi);transform:scale(.985)}
    @media (hover:hover){.drow:hover,.tile:hover,.act:hover,.info:hover,.update:hover{background:var(--fill-hi)}}
    .tile:focus-visible,.drow:focus-visible,.act:focus-visible,.info:focus-visible,.update:focus-visible,.pill:focus-visible{outline:2px solid var(--pri);outline-offset:2px}
    .lbl{font-size:.85em;line-height:1.15;color:var(--mut);overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
    .val{grid-column:1/-1;display:flex;align-items:baseline;gap:.3em;min-width:0;margin-top:.45em}
    .val b{font-size:1.75em;font-weight:600;line-height:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-variant-numeric:tabular-nums;letter-spacing:-.01em}
    .val.txt b{font-size:1.2em;line-height:1.15}
    .val em{font-style:normal;font-size:.9em;color:var(--mut);white-space:nowrap}
    .bar{grid-column:1/-1;display:block;height:.3em;border-radius:.2em;margin-top:.55em;background:var(--line);overflow:hidden}
    .bar u{display:block;height:100%;border-radius:inherit;background:var(--t);text-decoration:none;transition:width .4s}
    .net{min-height:5em}

    .volume{padding:1em;display:grid;grid-template-columns:minmax(6.5em,34%) minmax(0,1fr);gap:1em;align-items:center}
    .donut{position:relative;width:100%;max-width:7.5em;aspect-ratio:1}
    .ring{position:absolute;inset:0;border-radius:50%;background:conic-gradient(var(--t) var(--p),var(--line) 0);
      -webkit-mask:radial-gradient(circle,transparent 58%,#000 59%);mask:radial-gradient(circle,transparent 58%,#000 59%)}
    .donut>div{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
    .donut b{font-size:1.5em;font-weight:600;line-height:1}.donut b em{font-style:normal;font-size:.6em;color:var(--mut);margin-left:.1em}
    .donut small{font-size:.75em;color:var(--mut);margin-top:.2em}
    .vd{min-width:0}
    .vd header{display:flex;align-items:center;justify-content:space-between;gap:.5em;flex-wrap:wrap}
    h2{margin:0;font-size:1.2em;font-weight:600}
    dl{display:grid;grid-template-columns:1fr auto;gap:.35em .8em;margin:.7em 0 0;font-size:.95em}
    dt{color:var(--mut)}dd{margin:0;font-weight:600;font-variant-numeric:tabular-nums}

    .drive{min-width:0;container-type:inline-size;padding:.8em;display:grid;gap:.6em}
    .drive header{display:flex;align-items:center;gap:.6em}
    h3{margin:0;flex:1;font-size:1.05em;font-weight:600;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .drows{display:grid;gap:.1em;font-size:.95em}
    .drow{min-width:0;min-height:2.1em;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:.55em;padding:.2em .4em;margin:0 -.4em;border-radius:.6em}
    .drow span{color:var(--mut);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .drow b{font-weight:600;font-variant-numeric:tabular-nums;white-space:nowrap;text-align:right}
    .drow.tone-warning b,.drow.tone-error b{color:var(--t)}
    .drow b em{font-style:normal;font-weight:400;color:var(--mut)}

    .update{width:100%;min-height:3.8em;padding:.6em .9em;display:flex;align-items:center;gap:.8em}
    .ut{flex:1;min-width:0;display:flex;flex-direction:column;gap:.15em}.ut b{font-size:1.05em}.ut small{color:var(--mut);font-size:.85em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}

    .foot{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.6em}
    .info,.act{min-width:0;min-height:3.6em;display:flex;align-items:center;gap:.7em;padding:.55em .8em;background:var(--fill);border:1px solid var(--line);border-radius:1em}
    .info{grid-column:1/-1}
    .at{display:flex;flex-direction:column;gap:.15em;min-width:0}.at b{font-size:1em}.at small{color:var(--mut);font-size:.82em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .act.danger .chip,.act.arm .chip{--t:var(--err)}
    .act.arm{background:color-mix(in srgb,var(--err) 18%,transparent);border-color:var(--err)}
    .act.sent{border-color:var(--ok)}.act.sent .chip{--t:var(--ok)}

    /* Breites Layout (.wide, gesetzt per ResizeObserver ab 480 px oder per Option): Laufwerke nebeneinander, Aktionen in einer Reihe */
    /* Netzwerk im breiten Layout einzeilig: Symbol, Bezeichnung links, Wert rechts */
    .wide .net{min-height:3.6em;grid-template-columns:auto minmax(0,1fr) auto;grid-template-rows:auto}
    .wide .net .val{grid-column:auto;margin-top:0;justify-content:flex-end}
    .wide .art img{max-height:5.2em}.wide .donut{max-width:8em}
    .wide .drive{padding:.7em .9em}
    .wide .info,.wide .act{padding:.6em .7em}
    /* Aktionen in einer Reihe, sobald genug Breite da ist; schmaler: "Letzter Start" in eigener Zeile darüber */
    @container (min-width:560px){.wide .foot{grid-template-columns:repeat(3,minmax(0,1fr))}.wide .info{grid-column:auto;order:1}.wide .foot .act.danger{order:2}}
    /* vier Messwerte nebeneinander erst, wenn sie Platz haben */
    @container (min-width:620px){.wide .tiles{grid-template-columns:repeat(4,minmax(0,1fr))}}
    /* sehr schmal */
    @container (max-width:340px){.top{grid-template-columns:1fr}.art{justify-content:flex-start}.volume{grid-template-columns:1fr;justify-items:center}.vd{width:100%}.two.drives{grid-template-columns:1fr}.two{grid-template-columns:1fr}}

    /* Gerätebild groß im Hintergrund (image_mode: background) – nur Maske + Deckkraft, kein Blur */
    .bgm main{position:relative;z-index:1}
    .bgm .top{grid-template-columns:1fr}
    .bgimg{position:absolute;z-index:0;top:.9em;right:.7em;width:70%;height:21em;object-fit:contain;object-position:right top;opacity:.52;pointer-events:none;
      -webkit-mask-image:radial-gradient(ellipse 60% 66% at 70% 36%,#000 28%,transparent 76%);mask-image:radial-gradient(ellipse 60% 66% at 70% 36%,#000 28%,transparent 76%)}
    @container (max-width:399px){.bgimg{width:90%;right:.4em;height:18em;opacity:.4}}
    @container (min-width:700px){.bgimg{height:19em}}
    @media (prefers-reduced-motion:reduce){.bar u{transition:none}}
  `;}
}
// Ein alter, noch irgendwo geladener 1.0.1-Loader hat Methoden der Klasse überschrieben – das wird so verhindert
Object.freeze(NasCard.prototype);
if(!customElements.get("nas-card"))customElements.define("nas-card",NasCard);
window.customCards=window.customCards||[];
if(!window.customCards.some(c=>c.type==="nas-card"))window.customCards.push({type:"nas-card",name:"NAS Card",description:"NAS-Card im Glas-Look, optimiert für iPhone, iPad und Hochformat-Kiosk.",preview:true,documentationURL:"https://github.com/BeGiBue/home-assistant-nas-card"});
console.info(`NAS Card v${NAS_CARD_VERSION}`);
