    import { useState, useEffect } from "react";

    const css = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400&family=DM+Sans:wght@300;400&display=swap');
    @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
        --mono: 'DM Mono', monospace;
        --sans: 'DM Sans', sans-serif;
        --ink: var(--color-text-primary, #111);
        --muted: var(--color-text-secondary, #444);
        --border: rgba(0,0,0,0.12);
        --surface: var(--color-background-secondary, #f7f7f5);
    }
    body { font-family: var(--sans); font-weight: 300; color: var(--ink); }
    .wrap { max-width: 960px; margin: 0 auto; padding: 0rem 2rem 5rem; }
    nav { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 4rem; }
    .logo { font-family: var(--mono); font-size: 13px; }
    .nav-links { display: flex; gap: 2rem; }
    .nav-links a { font-size: 13px; color: var(--muted); text-decoration: none; cursor: pointer; transition: color .2s; }
    .nav-links a:hover { color: var(--ink); }
    section { margin-bottom: 4rem; }
    .divider { height: 0.5px; background: var(--border); margin: 4rem 0; }
    .label { font-family: var(--mono); font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); margin-bottom: 1.5rem; }
    h1 { font-size: clamp(2rem,5vw,2.75rem); font-weight: 300; line-height: 1.15; letter-spacing: -.02em; margin-bottom: 1.25rem; }
    h1 em { font-style: italic; }
    .bio { font-size: 15px; line-height: 1.75; color: var(--muted); max-width: 480px; }
    .stack { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 1.5rem; }
    .tag { font-family: var(--mono); font-size: 11px; padding: 4px 10px; border: 0.5px solid var(--border); border-radius: 100px; color: var(--muted); }
    .avail { display: inline-flex; align-items: center; gap: 6px; font-family: var(--mono); font-size: 11px; color: #1D9E75; margin-bottom: 2rem; }
    .dot { width: 6px; height: 6px; border-radius: 50%; background: #1D9E75; animation: pulse 2s ease-in-out infinite; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
    .card-top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: .75rem; }
    .card-name { font-size: 14px; font-weight: 400; }
    .card-year { font-family: var(--mono); font-size: 11px; color: var(--muted); }
    .card-desc { font-size: 13px; color: var(--muted); line-height: 1.6; margin-bottom: 1rem; }
    .card-tags { display: flex; flex-wrap: wrap; gap: 6px; }
    .card-tag { font-family: var(--mono); font-size: 10px; color: var(--muted); }
    .card-tag::before { content: '#'; }
    .contact-row { display: flex; flex-wrap: wrap; gap: 3rem; }
    .contact-link { font-size: 14px; color: var(--muted); text-decoration: none; display: flex; align-items: center; gap: 6px; transition: color .15s; }
    .contact-link:hover { color: var(--ink); }
    .contact-link i { font-size: 16px; }
    .list { display: block; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); border: 0.5px solid var(--border); border-radius: 12px; overflow: hidden; }
    .list-item { background: var(--color-background-primary, #fff); padding: 1.25rem 1.5rem; transition: background .15s; border-right: 0.5px solid var(--border); border-bottom: 0.5px solid var(--border); }
    .list-item:hover { background: var(--surface); }
    .list-item-top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: .75rem; }
    
    /* Wrapper for both Nav and Hero */
    .hero-outer {
        position: relative;
        margin-top: 0rem;
        border-radius: 0 0 24px 24px;
        overflow: hidden;
        /* This ensures the background stays within the wrap's bounds */
    }

    .hero-outer::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url('https://picsum.photos/800/400');
        background-size: cover;
        background-position: center;
        opacity: 0.16;
        z-index: 0;
    }

    /* Adjustments to existing classes to work with the wrapper */
    .hero-outer nav, 
    .hero-outer #about {
        position: relative;
        z-index: 1; /* Sits above the background image */
        margin-bottom: 0; /* Removing bottom margin to keep them connected */
    }

    .hero-outer nav {
        padding: 2rem 2rem 0;
    }

    .hero-outer #about {
        padding: 4rem 2rem 5rem;
    }

    .cards { 
        display: grid; 
        /* Force exactly two columns */
        grid-template-columns: 1fr 1fr; 
        gap: 1rem; /* Separates the cards */
    }
    .card { 
        background: var(--color-background-primary, #fff); 
        /* Remove the right/bottom borders that created the joined look */
        border: 0.5px solid var(--border); 
        border-radius: 12px; 
        overflow: hidden; /* Ensures image follows corner radius */
        display: flex;
        flex-direction: column;
        transition: transform 0.2s ease;
    }
    .card:hover { 
        background: var(--surface);
        transform: translateY(-4px); /* Subtle lift since they are now separate objects */
    }
    .card-image {
        width: 100%;
        height: 180px;
        object-fit: cover;
        border-bottom: 0.5px solid var(--border);
    }
    .card-content {
        padding: 1.25rem 1.5rem;
    }

    /* Responsive fallback: drop to 1 column on mobile */
    @media (max-width: 600px) {
        .cards { grid-template-columns: 1fr; }
    }
    `;

    function useJson(url) {
    const [data, setData] = useState(null);
    useEffect(() => { fetch(url).then(r => r.json()).then(setData).catch(console.error); }, [url]);
    return data;
    }

    const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });


    export default function Portfolio() {
    const profile = useJson("/profile.json");
    const projects = useJson("/projects.json");
    const jobs = useJson("/jobs.json");

    const initials = profile?.nickname?.split(" ").map(w => w[0]).join("") ?? "…";

    return (
        <>
        <style>{css}</style>
        <div className="wrap">
    <div className="hero-outer">
        <nav>
        <span className="logo">{initials}</span>
        <div className="nav-links">
            {["about", "work", "contact"].map(s => (
            <a key={s} onClick={() => scrollTo(s)}>{s}</a>
            ))}
        </div>
        </nav>

        <section id="about">
        {profile?.available && (
            <div className="avail"><span className="dot" />open to opportunities</div>
        )}
        <h1>
            {profile?.nickname ?? "…"}<br />
            <span style={{ fontSize: "0.5em" }}>{profile?.fullName ?? "…"}</span>
        </h1>
        <p className="bio">{profile?.bio}</p>
        <div className="stack">
            {profile?.stack?.map(s => <span className="tag" key={s}>{s}</span>)}
        </div>
        </section>
    </div>
    <section id="work" style={{marginTop: "3em"}}>
    <p className="label">Selected work</p>
    <div className="cards">
        {projects?.map((p, i) => (
        <div className="card" key={i}>
            {/* Added Image Element */}
            <img 
            src={p.image || 'https://picsum.photos/400/250?' + i} 
            alt={p.name} 
            className="card-image" 
            />
            <div className="card-content">
            <div className="card-top">
                <span className="card-name">{p.name}</span>
                <span className="card-year">{p.year}</span>
            </div>
            <p className="card-desc">{p.description}</p>
            <div className="card-tags">
                {p.tags.map(t => <span className="card-tag" key={t}>{t}</span>)}
            </div>
            </div>
        </div>
        ))}
    </div>
    </section>

            <div className="divider" />

            <section id="experience">
            <p className="label">Professional highlights</p>
            <div className="list">
                {jobs?.map((p, i) => (
                <div className="list-item" key={i}>
                    <div className="list-item-top">
                    <span className="card-name">{p.name}</span>
                    <span className="card-year">{p.year}</span>
                    </div>
                    <p className="card-desc">{p.description}</p>
                    <div className="card-tags">
                    {p.tags.map(t => <span className="card-tag" key={t}>{t}</span>)}
                    </div>
                </div>
                ))}
            </div>
            </section>

            <div className="divider" />

            <section id="contact">
            <p className="label">Contact</p>
            <div className="contact-row">
                {profile?.contacts?.map(c => (
                <a key={c.href} className="contact-link" href={c.href}>
                    <i className={`ti ${c.icon}`} aria-hidden="true" />
                    {c.label}
                </a>
                ))}
            </div>
            </section>
        </div>
        </>
    );
    }