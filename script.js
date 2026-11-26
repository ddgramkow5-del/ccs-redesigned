/* CCS Website – shared script (De La Salle John Bosco College) */
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

/* ---------- PICTURES ----------
   Every picture below is a PLACEHOLDER file inside the images folder.
   To use your own photo: save it in the images folder, then change the file name
   on that line, for example  img:'images/outreach.jpg'  */

/* ---------- Data ---------- */
const news = [
  {d:'September 16, 2026', t:'CCS Students of Banda Lasalista Earn 1st Runner-Up in Battle of the Bands 2026',
   img:'battle-of-the-bands.jpg'},
  {d:'August 17, 2026', t:'Hugyaw sa Sinugdanan 2026: A New Beginning, A Shared Vision',
   img:'hugyaw.jpg'},
  {d:'August 9, 2026', t:'CCS is now accepting First-Year Students and Transferees for A.Y. 2026–2027!',
   img:'966ba070-f6ba-45ac-b959-a5df641a60d6.jpg'},
  {d:'September 10, 2026', t:'Meet the 2026–2027 Pseudocode.com Officers',
   img:'pseudocode-officers.jpg', fit:'contain'},
  {d:'September 24, 2026', t:'Pinning Ceremony 2026 | A Symbol of Commitment and Excellence',
   img:'pinning-ceremony.jpg', fit:'contain'},
  {d:'September 16, 2026', t:'World Skills 2026: Showcasing Excellence!',
   img:'world-skills.jpg', fit:'contain'}
];
const events = [
  {m:10,day:'01',t:'HIED Midterm Examination — First Trimester'},
  {m:10,day:'01',t:'Rosary Month and Share a Blessing Launching Activity'},
  {m:10,day:'05',t:'World Teachers’ Day'}
];
const gal = [   // [title, category, picture]
  ['Community Outreach', 'Events', 'outreach.jpg'],
  ['Computer Laboratory', 'Facilities', 'computer-lab.jpg'],
  ['Academics', 'Academics', 'academic.jpg'],
  ['CCS Life', 'CCS life', 'ccs%20life.webp'],
  ['Orientation', 'Events', 'orientation.jpg'],
  ['Socialization 2025', 'CCS life', 'socialization.jpg'],
  ['World Teachers’ Day', 'Events', 'world%20teachers%20day.jpg'],
  ['Commencement Exercise 2026', 'Events', 'commencement.jpg']
];
const staff = [   // [name, role, photo]
  ['Ms. Jane Celeste G. Lumantas', 'Officer, Information Technology', 'lumantas_jane_celeste.jpg'],
  ['Ronalyn Goyo', 'Program In-Charge, College of Computer Studies', 'goyo_ronalyn.jpg'],
  ['Lawrence Albert Libar', 'Faculty', 'libar_lawrence_alvert.jpg'],
  ['Richen Temanel', 'Faculty', 'temanel_richen.jpg'],
  ['Dether John Jubahib Olaguir', 'Faculty', 'olahuir.webp']
];
const MONTHS = {9:'Sep',10:'Oct'};

/* ---------- Templates ---------- */
const ncard = n => `<a class="card"><div class="ph pic"><img src="${n.img}" alt=""${n.fit?` style="object-fit:${n.fit}"`:''}></div><small>${n.d}</small><p>${n.t}</p></a>`;
const evItem = (e,m) => `<div class="ev"><div class="d">${e.day}<br>${MONTHS[m||e.m]}</div><div><b>${e.t}</b><span>DLSJBC Campus, Bislig City</span></div></div>`;

/* ---------- Dropdown (CCS Life) ---------- */
const dd = $('#dd'), ddt = $('#ddt');
let hov = false;
function setDD(o){ if(!dd) return; dd.classList.toggle('open',o); ddt.setAttribute('aria-expanded',o); }
if(dd){
  dd.addEventListener('pointerenter',e=>{ if(e.pointerType=='mouse'){hov=true;setDD(true)} });
  dd.addEventListener('pointerleave',e=>{ if(e.pointerType=='mouse'){hov=false;setDD(false)} });
  ddt.addEventListener('click',()=>{ if(hov){hov=false;setDD(true)} else setDD(!dd.classList.contains('open')) });
  dd.addEventListener('click',e=>{ if(e.target.closest('.ddm a')){hov=false;setDD(false)} });
  document.addEventListener('click',e=>{ if(!dd.contains(e.target)) setDD(false) });
  document.addEventListener('keydown',e=>{ if(e.key=='Escape'&&dd.classList.contains('open')){setDD(false);ddt.focus()} });
}

/* ---------- Mobile menu + nav search ---------- */
const menuBtn = $('#menu'), nav = $('#nav'), sbtn = $('#sbtn'), sq = $('#sq');
if(menuBtn) menuBtn.addEventListener('click',()=>nav.classList.toggle('open'));
if(sbtn) sbtn.addEventListener('click',()=>{
  if(document.body.dataset.page=='search'){ $('#q')?.focus(); return; }
  sq.style.display = sq.style.display=='inline' ? 'none' : 'inline'; sq.focus();
});
if(sq) sq.addEventListener('keydown',e=>{
  if(e.key=='Enter'){ location.href='search.html?q='+encodeURIComponent(sq.value.trim()); }
});

/* ---------- Active nav link ---------- */
(function(){
  const page = document.body.dataset.page;
  $$('nav a[data-page]').forEach(a=>a.classList.toggle('on',a.dataset.page==page));
  if(ddt) ddt.classList.toggle('on',page=='gallery'||page=='events');
})();

/* ---------- Home: latest news + upcoming events ---------- */
if($('#latest-news')) $('#latest-news').innerHTML = news.slice(0,3).map(ncard).join('');
if($('#home-events')) $('#home-events').innerHTML = events.map(e=>evItem(e)).join('');

/* ---------- News page ---------- */
if($('#news-grid')) $('#news-grid').innerHTML = news.map(ncard).join('');

/* ---------- Programs tabs ---------- */
if($('#tabs')){
  $('#tabs').addEventListener('click',e=>{
    const b = e.target.closest('button'); if(!b) return;
    $$('#tabs button').forEach(x=>x.classList.toggle('on',x==b));
    $$('#pan .tabpanel').forEach(p=>p.hidden = p.dataset.i!=b.dataset.i);
  });
  const want = parseInt((location.hash.match(/^#tab-(\d+)$/)||[])[1]);
  if(!isNaN(want)) $(`#tabs button[data-i="${want}"]`)?.click();
}

/* ---------- Faculty ---------- */
if($('#staff-grid')) $('#staff-grid').innerHTML = staff.map(s=>
  `<div><div class="ph pic"><img src="${s[2]}" alt=""></div><b>${s[0]}</b><span>${s[1]}</span></div>`).join('');

/* ---------- Gallery filter + Events calendar ---------- */
function renderGallery(f='All'){
  $('#gt').innerHTML = ['All','Events','Academics','Facilities','CCS life'].map(x=>`<button class="${x==f?'on':''}" data-f="${x}">${x}</button>`).join('');
  $('#gg').innerHTML = gal.filter(g=>f=='All'||g[1]==f).map(g=>`<div class="card"><div class="ph pic"><img src="${g[2]}" alt=""></div><p>${g[0]}</p></div>`).join('');
}
function renderCalendar(m=9){
  const first = new Date(2026,m-1,1), days = new Date(2026,m,0).getDate();
  const list = m==9
    ? news.filter(n=>/^September/.test(n.d)).map(n=>({day:String(parseInt(n.d.split(' ')[1])).padStart(2,'0'),t:n.t}))
    : events.filter(e=>e.m==m);
  let c = ['S','M','T','W','T','F','S'].map(x=>`<div class="h">${x}</div>`).join('') + '<div></div>'.repeat(first.getDay());
  for(let i=1;i<=days;i++) c += `<div class="${list.some(e=>+e.day==i)?'e':''}">${i}</div>`;
  $('#mt').innerHTML = `<button class="${m==9?'on':''}" data-m="9">September 2026</button><button class="${m==10?'on':''}" data-m="10">October 2026</button>`;
  $('#cal').innerHTML = c;
  $('#month-events').innerHTML = list.map(e=>evItem(e,m)).join('');
}
if($('#gg')){
  renderGallery();
  $('#gt').addEventListener('click',e=>{ const b=e.target.closest('button'); if(b) renderGallery(b.dataset.f) });
}
if($('#cal')){
  renderCalendar();
  $('#mt').addEventListener('click',e=>{ const b=e.target.closest('button'); if(b) renderCalendar(+b.dataset.m) });
}

/* ---------- Search page ---------- */
if(document.body.dataset.page=='search'){
  const programs = [
    ['Bachelor of Science in Computer Science (BSCS)','programs.html'],
    ['Bachelor of Science in Information Technology (BSIT)','programs.html']
  ];
  function runSearch(q){
    q = q.trim().toLowerCase();
    const out = $('#results');
    if(!q){ out.innerHTML='<p style="color:var(--mut)">Type something to search news, events, programs, and faculty.</p>'; return; }
    const nr = news.filter(n=>(n.t+' '+n.d).toLowerCase().includes(q));
    const er = events.filter(e=>e.t.toLowerCase().includes(q));
    const pr = programs.filter(p=>p[0].toLowerCase().includes(q));
    const fr = staff.filter(s=>(s[0]+' '+s[1]).toLowerCase().includes(q));
    let h = '';
    if(nr.length) h += `<div class="sres"><h3>News</h3><div class="grid" style="gap:36px">${nr.map(ncard).join('')}</div></div>`;
    if(er.length) h += `<div class="sres"><h3>Events</h3><div style="max-width:618px">${er.map(e=>evItem(e)).join('')}</div></div>`;
    if(pr.length) h += `<div class="sres"><h3>Programs</h3><ul>${pr.map(p=>`<li><a class="more" href="${p[1]}">${p[0]}</a></li>`).join('')}</ul></div>`;
    if(fr.length) h += `<div class="sres"><h3>Faculty &amp; Staff</h3><ul>${fr.map(s=>`<li><b>${s[0]}</b> — ${s[1]}</li>`).join('')}</ul></div>`;
    out.innerHTML = h || '<p>No matching results.</p>';
  }
  const q0 = new URLSearchParams(location.search).get('q')||'';
  $('#q').value = q0; runSearch(q0);
  $('#q').addEventListener('input',e=>runSearch(e.target.value));
  $('#sform').addEventListener('submit',e=>{ e.preventDefault(); runSearch($('#q').value) });
}

/* ---------- Contact form ---------- */
const cf = $('#cf');
if(cf) cf.addEventListener('submit',e=>{
  e.preventDefault();
  const f = e.target, ok = $('#ok');
  if(!f.fn.value.trim()||!/\S+@\S+\.\S+/.test(f.em.value)||!f.ms.value.trim()){
    ok.style.color='#b00020'; ok.textContent='Please fill in your first name, a valid email, and a message.'; return;
  }
  ok.style.color=''; ok.textContent='Thank you! Your message is ready to be sent (demo form – connect a backend to deliver it).'; f.reset();
});
if(location.hash=='#map') setTimeout(()=>$('#map')?.scrollIntoView(),0);
