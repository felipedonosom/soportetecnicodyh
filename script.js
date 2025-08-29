// Mobile menu
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
if (burger && menu) {
  burger.addEventListener('click', () => {
    const open = menu.style.display === 'flex';
    menu.style.display = open ? 'none' : 'flex';
    burger.setAttribute('aria-expanded', String(!open));
  });
}

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Dummy form handler (prevent page reload)
const form = document.getElementById('form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = document.getElementById('form-msg');
    msg.textContent = 'Gracias. Te contactaremos pronto por WhatsApp o correo.';
    form.reset();
  });
}

// AJAX submit to Formspree + local lead store
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = document.getElementById('form-msg');
    msg.textContent = 'Enviando…';
    try {
      const data = new FormData(form);
      const payload = Object.fromEntries(data.entries());
      const resp = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' },
      });
      if (resp.ok) {
        try {
          const key='donoso_leads';
          const arr = JSON.parse(localStorage.getItem(key)||'[]');
          arr.push({fecha:new Date().toISOString(), origen:'contacto', ...payload});
          localStorage.setItem(key, JSON.stringify(arr));
        } catch(_) {}
        msg.textContent = '¡Gracias! Te contactaremos pronto.'; sendWhatsAppPrefill(payload);
        form.reset();
      } else {
        msg.textContent = 'No se pudo enviar. Intenta nuevamente o escribe al WhatsApp.';
      }
    } catch (err) {
      msg.textContent = 'Error de red. Por favor, intenta de nuevo.';
    }
  }, { once: true });
}

// Price currency toggle (CLP/UF)
(function(){
  function formatCLP(v){ try { return new Intl.NumberFormat('es-CL', {style:'currency', currency:'CLP', maximumFractionDigits:0}).format(v); } catch(e){ return '$'+Math.round(v).toLocaleString('es-CL'); } }
  function formatUF(v){ return (Math.round(v*1000)/1000).toLocaleString('es-CL', {minimumFractionDigits:3, maximumFractionDigits:3}) + ' UF'; }
  function renderPrices(){
    const c = document.getElementById('currency')?.value || 'CLP';
    const uf = parseFloat(document.getElementById('ufValue')?.value || '37000');
    document.querySelectorAll('.price-tag').forEach(el=>{
      const base = parseFloat(el.getAttribute('data-price-clp')||'0');
      const suffix = el.getAttribute('data-suffix')||'';
      if(c==='UF' && uf>0){
        el.textContent = (base/uf>0? formatUF(base/uf):'-') + suffix;
      } else {
        el.textContent = formatCLP(base) + suffix;
      }
    });
  }
  const cur = document.getElementById('currency');
  const ufv = document.getElementById('ufValue');
  if(cur && ufv){
    cur.addEventListener('change', renderPrices);
    ufv.addEventListener('input', renderPrices);
    renderPrices();
  }
})();

// Cookie banner simple
(function(){
  const b=document.getElementById('cookie-banner');
  const btn=document.getElementById('cookie-accept');
  if(!b||!btn)return;
  if(localStorage.getItem('cookie_ok')){ b.remove(); return; }
  btn.onclick=()=>{ localStorage.setItem('cookie_ok','1'); b.remove(); };
})();

// WhatsApp prefill on form submit success
function sendWhatsAppPrefill(data){
  const base='https://wa.me/56962822440';
  const msg=`Hola, soy ${data.nombre||''} de ${data.comuna||''}. Mi teléfono: ${data.telefono||''}. Quiero: ${data.mensaje||''}`;
  const url=base+'?text='+encodeURIComponent(msg);
  window.open(url,'_blank');
}

// Cookie banner (informativo; sin tracking hasta aceptar)
(function(){
  const KEY='cookie_ack_v1';
  if(localStorage.getItem(KEY)) return;
  const bar = document.createElement('div');
  bar.className = 'cookie-bar';
  bar.innerHTML = '<p>Usamos cookies/almacenamiento local para mejorar tu experiencia (analítica opcional y guardado de leads). <a href="politica-privacidad.html" target="_blank" style="color:#22d3ee;text-decoration:underline">Más info</a></p><button class="btn" id="cookie-ok">Aceptar</button>';
  document.body.appendChild(bar);
  document.getElementById('cookie-ok').onclick = () => {
    localStorage.setItem(KEY, '1');
    bar.remove();
  };
})();

// WhatsApp prellenado desde formularios
function openWhatsAppWithForm({nombre, telefono, correo, comuna, mensaje, origen}){
  const base = 'https://wa.me/56962822440?text=';
  const textos = [
    `Hola, soy ${nombre||''}`.trim(),
    origen ? `Consulta desde ${origen}` : null,
    telefono ? `Teléfono: ${telefono}` : null,
    correo ? `Correo: ${correo}` : null,
    comuna ? `Comuna: ${comuna}` : null,
    mensaje ? `Mensaje: ${mensaje}` : null
  ].filter(Boolean);
  const url = base + encodeURIComponent(textos.join('\n'));
  window.open(url, '_blank');
}

// Botón WhatsApp — formulario principal
(function(){
  const btn = document.getElementById('wsp-btn-main');
  const f = document.getElementById('form');
  if(btn && f){
    btn.addEventListener('click', ()=>{
      openWhatsAppWithForm({
        nombre: f.querySelector('#nombre')?.value,
        telefono: f.querySelector('#telefono')?.value,
        correo: f.querySelector('#correo')?.value || '',
        comuna: '',
        mensaje: f.querySelector('#mensaje')?.value,
        origen: 'Contacto sitio'
      });
    });
  }
})();

// Botón WhatsApp — promo empalme
(function(){
  const btn = document.getElementById('wsp-btn-empalme');
  const f = document.getElementById('lead');
  if(btn && f){
    btn.addEventListener('click', ()=>{
      openWhatsAppWithForm({
        nombre: f.querySelector('#nombre')?.value,
        telefono: f.querySelector('#telefono')?.value,
        correo: f.querySelector('#correo')?.value,
        comuna: f.querySelector('#comuna')?.value,
        mensaje: f.querySelector('#mensaje')?.value,
        origen: 'Promo Empalme'
      });
    });
  }
})();

// Botón WhatsApp — promo certificación
(function(){
  const btn = document.getElementById('wsp-btn-cert');
  const f = document.getElementById('lead-cert');
  if(btn && f){
    btn.addEventListener('click', ()=>{
      openWhatsAppWithForm({
        nombre: f.querySelector('#nombre')?.value,
        telefono: f.querySelector('#telefono')?.value,
        correo: f.querySelector('#correo')?.value,
        comuna: f.querySelector('#comuna')?.value,
        mensaje: f.querySelector('#mensaje')?.value,
        origen: 'Promo Certificación'
      });
    });
  }
})();

// Auto-close nav menu on link click (mobile)
/* auto-close nav */
(function(){
  const menu = document.getElementById('menu');
  const burger = document.getElementById('burger');
  if(!menu || !burger) return;
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>{
    if (getComputedStyle(burger).display !== 'none') {
      menu.style.display = 'none';
      burger.setAttribute('aria-expanded', 'false');
    }
  }));
})();
