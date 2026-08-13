"use client";

import { useEffect, useMemo, useState } from "react";

const lessons = [
  { id: 1, level: "پایه", title: "آشنایی با محیط MATLAB", desc: "Command Window، Workspace و اولین محاسبات مهندسی", time: "۲۵ دقیقه", icon: "⌘" },
  { id: 2, level: "پایه", title: "ماتریس‌ها؛ زبان سازه", desc: "ساخت، دسترسی و عملیات ماتریسی با مثال سختی عضو", time: "۴۰ دقیقه", icon: "▦" },
  { id: 3, level: "میانی", title: "برنامه‌نویسی مهندسی", desc: "شرط‌ها، حلقه‌ها، توابع و اسکریپت‌های تمیز", time: "۵۵ دقیقه", icon: "ƒ" },
  { id: 4, level: "میانی", title: "ترسیم نمودارهای حرفه‌ای", desc: "نمودار نیرو–تغییرمکان و نمایش نتایج تحلیل", time: "۴۵ دقیقه", icon: "⌁" },
  { id: 5, level: "پیشرفته", title: "روش سختی مستقیم", desc: "مونتاژ ماتریس سختی و اعمال شرایط مرزی", time: "۹۰ دقیقه", icon: "△" },
  { id: 6, level: "پیشرفته", title: "تحلیل دینامیکی سازه", desc: "فرکانس طبیعی، مودها و پاسخ تاریخچه زمانی", time: "۱۲۰ دقیقه", icon: "∿" },
  { id: 7, level: "حرفه‌ای", title: "المان محدود در MATLAB", desc: "پیاده‌سازی خرپا و قاب دوبعدی از صفر", time: "۱۸۰ دقیقه", icon: "◇" },
  { id: 8, level: "حرفه‌ای", title: "پروژه نهایی: تحلیل قاب", desc: "ساخت یک حل‌گر کامل و گزارش خودکار نتایج", time: "۶ ساعت", icon: "🏗" },
];

const code = `% ماتریس سختی تیر اویلر–برنولی
E = 2e11;       % مدول الاستیسیته (Pa)
I = 8.33e-6;    % ممان اینرسی (m^4)
L = 4;          % طول عضو (m)

k = (E*I/L^3) * [ ...
   12,   6*L,  -12,   6*L;
  6*L, 4*L^2, -6*L, 2*L^2;
  -12,  -6*L,   12,  -6*L;
  6*L, 2*L^2, -6*L, 4*L^2];

disp('Element stiffness matrix:')
disp(k)`;

export default function Home() {
  const [done, setDone] = useState<number[]>([]);
  const [active, setActive] = useState(2);
  const [tab, setTab] = useState<"path" | "lab">("path");
  const [output, setOutput] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => { const saved = localStorage.getItem("matstruct-progress"); if (saved) setDone(JSON.parse(saved)); }, []);
  const progress = Math.round((done.length / lessons.length) * 100);
  const current = useMemo(() => lessons.find(l => l.id === active)!, [active]);
  const complete = () => { const next = done.includes(active) ? done.filter(x => x !== active) : [...done, active]; setDone(next); localStorage.setItem("matstruct-progress", JSON.stringify(next)); };
  const run = () => { setOutput("k =\n\n   3.1238e+05   6.2475e+05  -3.1238e+05   6.2475e+05\n   6.2475e+05   1.6650e+06  -6.2475e+05   8.3300e+05\n  -3.1238e+05  -6.2475e+05   3.1238e+05  -6.2475e+05\n   6.2475e+05   8.3300e+05  -6.2475e+05   1.6650e+06\n\n✓ اجرا موفق — 0.018 ثانیه"); };

  return <main>
    <header className="nav">
      <button className="brand" onClick={() => setTab("path")} aria-label="صفحه اصلی"><span>MAT</span><b>STRUCT</b><i>LAB</i></button>
      <nav><button className={tab === "path" ? "active" : ""} onClick={() => setTab("path")}>مسیر یادگیری</button><button className={tab === "lab" ? "active" : ""} onClick={() => setTab("lab")}>آزمایشگاه کد</button><button onClick={() => document.getElementById("projects")?.scrollIntoView({behavior:"smooth"})}>پروژه‌ها</button></nav>
      <div className="nav-actions"><button className="search" aria-label="جستجو">⌕</button><div className="avatar">YS</div></div>
    </header>

    {tab === "path" ? <>
      <section className="hero">
        <div className="hero-copy"><div className="eyebrow"><span /> آکادمی تخصصی مهندسی سازه</div><h1>از کُد تا <em>سازه.</em></h1><p>MATLAB را با مسئله‌های واقعی مهندسی عمران یاد بگیرید؛ از اولین ماتریس تا ساخت حل‌گر المان محدود حرفه‌ای.</p><div className="hero-buttons"><button className="primary" onClick={() => document.getElementById("roadmap")?.scrollIntoView({behavior:"smooth"})}>ادامه مسیر یادگیری <b>←</b></button><button className="play" onClick={() => {setNotice("ویدیوی معرفی ۲ دقیقه‌ای به‌زودی پخش می‌شود"); setTimeout(()=>setNotice(""),2500)}}><span>▶</span> مشاهده معرفی دوره</button></div><div className="trust"><b>۱۲,۴۰۰+</b> مهندس در حال یادگیری <span>★★★★★</span> <small>۴.۹ از ۵</small></div></div>
        <div className="hero-visual"><div className="grid-lines"/><div className="tower"><i/><i/><i/><i/><i/><i/><i/><i/></div><div className="force f1">F₁ →</div><div className="force f2">F₂ →</div><div className="formula">[K]&#123;u&#125; = &#123;F&#125;</div><div className="badge-card"><span>پیشرفت کلی</span><b>{progress}٪</b><div><i style={{width:`${progress}%`}}/></div><small>{done.length} از {lessons.length} فصل تکمیل شده</small></div></div>
      </section>

      <section className="stats"><div><b>۸</b><span>فصل تخصصی</span></div><div><b>۵۶</b><span>درس ویدیویی</span></div><div><b>۳۲</b><span>تمرین کدنویسی</span></div><div><b>۶</b><span>پروژه سازه‌ای</span></div><div><b>۲۴/۷</b><span>دسترسی همیشگی</span></div></section>

      <section className="roadmap" id="roadmap"><div className="section-head"><div><span>ROADMAP / 01</span><h2>مسیر تسلط شما</h2><p>یک برنامه هدفمند، از مبانی برنامه‌نویسی تا تحلیل عددی پیشرفته.</p></div><div className="overall"><b>{progress}٪</b><span>پیشرفت شما</span><div><i style={{width:`${progress}%`}}/></div></div></div>
        <div className="course-layout"><div className="lesson-list">{lessons.map((l, idx) => <button key={l.id} onClick={() => setActive(l.id)} className={`lesson ${active===l.id?"selected":""} ${done.includes(l.id)?"completed":""}`}><span className="num">{done.includes(l.id)?"✓":String(idx+1).padStart(2,"0")}</span><span className="lesson-icon">{l.icon}</span><span className="lesson-text"><small>{l.level}</small><b>{l.title}</b><em>{l.desc}</em></span><span className="duration">{l.time}<i>←</i></span></button>)}</div>
          <aside className="lesson-detail"><div className="detail-label">درس انتخاب‌شده / {String(current.id).padStart(2,"0")}</div><div className="detail-art"><div className="beam"><i/><i/><i/><i/><i/></div><span>P ↓</span></div><h3>{current.title}</h3><p>{current.desc}. در این درس مفاهیم با یک مثال گام‌به‌گام و تمرین تعاملی تثبیت می‌شوند.</p><ul><li>ویدیوی مفهومی و خلاصه نکات</li><li>فایل آماده MATLAB و تمرین هدایت‌شده</li><li>آزمون کوتاه پایان درس</li></ul><button className={done.includes(active)?"done-button":"primary full"} onClick={complete}>{done.includes(active)?"✓ تکمیل شد — لغو علامت":"شروع این درس  ←"}</button></aside>
        </div>
      </section>
    </> : <Lab run={run} output={output} />}

    <section className="projects" id="projects"><div><span>CAPSTONE / PROJECTS</span><h2>دانش را به مهارت تبدیل کنید.</h2><p>پروژه‌هایی نزدیک به دفتر طراحی؛ با داده‌های واقعی، راهنمای مرحله‌ای و خروجی قابل ارائه.</p></div><div className="project-cards"><article><small>پروژه ۰۱</small><b>تحلیل خرپای دوبعدی</b><span>روش سختی مستقیم • ۶ گام</span></article><article><small>پروژه ۰۲</small><b>پاسخ طیفی ساختمان</b><span>دینامیک سازه • ۸ گام</span></article><article><small>پروژه نهایی</small><b>حل‌گر قاب سه‌بعدی</b><span>پورتفولیو حرفه‌ای • ۱۲ گام</span></article></div></section>
    <footer><div className="brand"><span>MAT</span><b>STRUCT</b><i>LAB</i></div><p>ساخته‌شده برای مهندسانی که دقیق‌تر فکر می‌کنند.</p><span>© ۱۴۰۵ — تمامی حقوق محفوظ است.</span></footer>
    {notice && <div className="toast">{notice}</div>}
  </main>;
}

function Lab({run, output}:{run:()=>void, output:string}) {
  return <section className="lab-page"><div className="lab-head"><span>INTERACTIVE LAB / 02</span><h1>آزمایشگاه تحلیل سازه</h1><p>کد را بررسی کنید، اجرا بگیرید و رفتار عضو را ببینید.</p></div><div className="lab-grid"><div className="editor"><div className="editor-top"><div><i/><i/><i/></div><span>beam_stiffness.m</span><button onClick={run}>▶ اجرا</button></div><pre><code>{code}</code></pre><div className="terminal"><span>COMMAND WINDOW</span><pre>{output || ">> آماده اجرا..."}</pre></div></div><div className="chart-card"><div className="chart-title"><div><small>خروجی بصری</small><b>تغییرشکل تیر</b></div><span>v(x) / mm</span></div><div className="chart"><div className="y-label">۴<br/>۲<br/>۰<br/>−۲<br/>−۴</div><svg viewBox="0 0 500 250" aria-label="نمودار تغییرشکل تیر"><path className="axis" d="M20 125H485 M30 10V235"/><path className="curve" d="M30 125 C100 128,140 185,220 185 S350 50,480 125"/><path className="zero" d="M30 125H480"/></svg><div className="x-label">طول عضو (m)　 ۰　۱　۲　۳　۴</div></div><div className="metrics"><div><span>بیشینه تغییرمکان</span><b>۳.۸۲ mm</b></div><div><span>محل وقوع</span><b>x = 2.64 m</b></div></div></div></div></section>;
}
