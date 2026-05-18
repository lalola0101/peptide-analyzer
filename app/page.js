"use client";

import { useState, useEffect, useRef } from "react";

// ════════════════════════════════════════════
// PEPTIDE DATABASE
// ════════════════════════════════════════════

const PEPTIDE_DB = [
  {
    id: "bpc157", name: "BPC-157", category: "Healing & Recovery",
    tags: ["gut", "tendon", "joint", "skin", "recovery", "inflammation", "injury", "acne", "scarring"],
    description: "Body Protection Compound. Accelerates healing of tendons, ligaments, gut lining, and skin tissue.",
    typicalDose: "250-500mcg", frequency: "1-2x daily", route: "SubQ or Oral", cycleLength: "4-8 weeks",
    icon: "🩹", color: "#22c55e",
  },
  {
    id: "ghkcu", name: "GHK-Cu", category: "Skin & Anti-Aging",
    tags: ["skin", "collagen", "wrinkles", "aging", "hair", "elasticity", "complexion", "pigmentation", "laxity", "texture"],
    description: "Copper peptide that stimulates collagen synthesis, tightens skin, and promotes hair growth.",
    typicalDose: "1-2mg", frequency: "Daily", route: "SubQ or Topical", cycleLength: "8-12 weeks",
    icon: "✨", color: "#a855f7",
  },
  {
    id: "retatrutide", name: "Retatrutide", category: "Body Composition",
    tags: ["fat loss", "weight", "body comp", "obesity", "metabolic", "appetite", "GLP-1", "physique", "overweight"],
    description: "Triple agonist (GLP-1/GIP/glucagon). Powerful fat loss and metabolic optimization compound.",
    typicalDose: "1-4mg (titrate up)", frequency: "Weekly", route: "SubQ", cycleLength: "12-24 weeks",
    icon: "🔥", color: "#f97316",
  },
  {
    id: "nad", name: "NAD+", category: "Longevity & Energy",
    tags: ["energy", "aging", "mitochondria", "cognition", "fatigue", "longevity", "cellular", "tired", "brain fog"],
    description: "Nicotinamide adenine dinucleotide. Boosts cellular energy, supports DNA repair, and combats aging.",
    typicalDose: "100-250mg", frequency: "2-3x weekly", route: "SubQ or IV", cycleLength: "Ongoing / 8-12 weeks",
    icon: "⚡", color: "#eab308",
  },
  {
    id: "tb500", name: "TB-500", category: "Healing & Recovery",
    tags: ["recovery", "injury", "muscle", "tendon", "flexibility", "inflammation", "joint", "tissue"],
    description: "Thymosin Beta-4 fragment. Promotes tissue repair, reduces inflammation, improves flexibility.",
    typicalDose: "2-5mg", frequency: "2x weekly", route: "SubQ", cycleLength: "4-8 weeks",
    icon: "💪", color: "#06b6d4",
  },
  {
    id: "ipacjc", name: "Ipamorelin / CJC-1295", category: "Growth & Recovery",
    tags: ["growth hormone", "muscle", "recovery", "sleep", "anti-aging", "body comp", "skin", "physique", "lean"],
    description: "GH secretagogue stack. Stimulates natural growth hormone release for recovery, sleep, and body composition.",
    typicalDose: "100-300mcg each", frequency: "Daily (before bed)", route: "SubQ", cycleLength: "8-16 weeks",
    icon: "🌙", color: "#6366f1",
  },
  {
    id: "pt141", name: "PT-141", category: "Performance & Vitality",
    tags: ["libido", "sexual", "vitality", "performance", "energy", "desire"],
    description: "Bremelanotide. Melanocortin receptor agonist that enhances libido and sexual function.",
    typicalDose: "1-2mg", frequency: "As needed (2-4hrs before)", route: "SubQ", cycleLength: "As needed",
    icon: "🔋", color: "#ec4899",
  },
  {
    id: "semaglutide", name: "Semaglutide", category: "Body Composition",
    tags: ["fat loss", "weight", "appetite", "GLP-1", "metabolic", "obesity", "overweight", "body comp"],
    description: "GLP-1 receptor agonist. Reduces appetite, improves metabolic markers, supports significant fat loss.",
    typicalDose: "0.25-2.4mg (titrate up)", frequency: "Weekly", route: "SubQ", cycleLength: "12-24+ weeks",
    icon: "📉", color: "#14b8a6",
  },
  {
    id: "selank", name: "Selank", category: "Cognitive & Mood",
    tags: ["anxiety", "cognition", "focus", "mood", "nootropic", "stress", "brain fog", "mental"],
    description: "Synthetic tuftsin analog. Anxiolytic and nootropic peptide that enhances focus and reduces anxiety.",
    typicalDose: "250-500mcg", frequency: "1-2x daily", route: "Intranasal or SubQ", cycleLength: "4-8 weeks",
    icon: "🧠", color: "#8b5cf6",
  },
  {
    id: "mots_c", name: "MOTS-c", category: "Longevity & Energy",
    tags: ["metabolic", "exercise", "aging", "mitochondria", "energy", "endurance", "longevity", "fat loss"],
    description: "Mitochondrial-derived peptide. Improves metabolic homeostasis, exercise capacity, and cellular health.",
    typicalDose: "5-10mg", frequency: "2-3x weekly", route: "SubQ", cycleLength: "8-12 weeks",
    icon: "🧬", color: "#10b981",
  },
  {
    id: "ss31", name: "SS-31 (Elamipretide)", category: "Longevity & Energy",
    tags: ["mitochondria", "aging", "energy", "cellular", "longevity", "fatigue", "cardio"],
    description: "Targets and repairs mitochondrial inner membrane. Potent anti-aging and cellular energy compound.",
    typicalDose: "5-20mg", frequency: "Daily", route: "SubQ", cycleLength: "8-12 weeks",
    icon: "🔬", color: "#0ea5e9",
  },
  {
    id: "epithalon", name: "Epithalon", category: "Longevity & Energy",
    tags: ["telomere", "aging", "longevity", "sleep", "cellular", "anti-aging", "pineal"],
    description: "Telomerase activator. Promotes telomere elongation, improves sleep quality, and supports longevity.",
    typicalDose: "5-10mg", frequency: "Daily for 10-20 days", route: "SubQ", cycleLength: "10-20 day cycles, 2-3x/year",
    icon: "🧪", color: "#d946ef",
  },
];

// ════════════════════════════════════════════
// THEME
// ════════════════════════════════════════════

const T = {
  bg: "#0a0a0f", bgCard: "#12121a", bgHover: "#1a1a26", bgEl: "#16161f",
  border: "#1e1e2e", borderL: "#2a2a3a",
  text: "#e4e4ef", muted: "#8888a0", dim: "#555570",
  accent: "#00e5a0", danger: "#ff4466", warning: "#ffaa00",
};

// ════════════════════════════════════════════
// ICONS
// ════════════════════════════════════════════

function Ico({ name, size = 20, color }) {
  const c = color || T.muted;
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" };
  const icons = {
    camera: <svg {...p}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>,
    upload: <svg {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>,
    scan: <svg {...p} stroke={color || T.accent}><path d="M2 7V2h5M17 2h5v5M22 17v5h-5M7 22H2v-5" /><line x1="7" y1="12" x2="17" y2="12" /></svg>,
    pill: <svg {...p}><path d="M10.5 1.5l-8 8a4.95 4.95 0 0 0 7 7l8-8a4.95 4.95 0 0 0-7-7z" /><line x1="8.5" y1="8.5" x2="15.5" y2="15.5" opacity="0.4" /></svg>,
    chart: <svg {...p}><rect x="3" y="12" width="4" height="9" rx="0.5" /><rect x="10" y="7" width="4" height="14" rx="0.5" /><rect x="17" y="3" width="4" height="18" rx="0.5" /></svg>,
    plus: <svg {...p} strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
    check: <svg {...p} stroke={color || T.accent} strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>,
    x: <svg {...p} strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
    back: <svg {...p} strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>,
    info: <svg {...p}><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>,
    trash: <svg {...p} stroke={color || T.danger}><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>,
  };
  return icons[name] || null;
}

// ════════════════════════════════════════════
// SHARED STYLES
// ════════════════════════════════════════════

const labelSt = {
  fontFamily: "Space Mono, monospace", fontSize: 10, color: T.dim,
  letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 6,
};
const inputSt = {
  width: "100%", padding: "10px 12px", background: T.bgCard,
  border: `1px solid ${T.border}`, borderRadius: 10, color: T.text,
  fontFamily: "DM Sans, sans-serif", fontSize: 14, outline: "none", boxSizing: "border-box",
};

// ════════════════════════════════════════════
// TAB BAR
// ════════════════════════════════════════════

function TabBar({ active, onTab }) {
  const tabs = [
    { id: "scan", label: "Scan", icon: "scan" },
    { id: "library", label: "Library", icon: "pill" },
    { id: "tracker", label: "Tracker", icon: "chart" },
  ];
  return (
    <div style={{
      display: "flex", borderTop: `1px solid ${T.border}`, background: T.bg,
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
      padding: "6px 0 env(safe-area-inset-bottom, 8px)", maxWidth: 480, margin: "0 auto",
    }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onTab(t.id)} style={{
          flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
          padding: "8px 0", background: "none", border: "none", cursor: "pointer",
          color: active === t.id ? T.accent : T.dim, transition: "color 0.2s",
        }}>
          <Ico name={t.icon} size={22} color={active === t.id ? T.accent : T.dim} />
          <span style={{ fontSize: 11, fontFamily: "DM Sans, sans-serif", fontWeight: active === t.id ? 600 : 400 }}>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

// ════════════════════════════════════════════
// HEADER
// ════════════════════════════════════════════

function Header() {
  return (
    <div style={{
      padding: "20px 20px 16px", borderBottom: `1px solid ${T.border}`,
      background: `linear-gradient(180deg, ${T.bgEl} 0%, ${T.bg} 100%)`,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: `linear-gradient(135deg, ${T.accent}, #00b880)`,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
        }}>🧬</div>
        <div>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: 16, fontWeight: 700, color: T.text, letterSpacing: "-0.02em" }}>
            MITOZEN
          </div>
          <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, color: T.dim, letterSpacing: "0.06em" }}>
            mitozen.bio · peptide analyzer
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════
// SCAN TAB
// ════════════════════════════════════════════

function ScanTab({ onAddToTracker }) {
  const [mode, setMode] = useState(null);
  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const fileRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setImage(URL.createObjectURL(file));
    const reader = new FileReader();
    reader.onload = () => setImageData({ base64: reader.result.split(",")[1], mediaType: file.type });
    reader.readAsDataURL(file);
  };

  const analyze = async () => {
    if (!imageData || !mode) return;
    setAnalyzing(true); setProgress(0); setError(null); setResults(null);
    const iv = setInterval(() => setProgress(p => Math.min(p + Math.random() * 12, 90)), 400);

    try {
      // THIS calls YOUR OWN server, not Claude directly
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: imageData.base64,
          mediaType: imageData.mediaType,
          analysisType: mode,
        }),
      });

      if (!res.ok) throw new Error("API returned " + res.status);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResults(data);
      setProgress(100);
    } catch (err) {
      console.error(err);
      setError("Analysis failed — make sure the image is clear and well-lit, then try again.");
    } finally {
      clearInterval(iv);
      setAnalyzing(false);
    }
  };

  const reset = () => {
    setMode(null); setImage(null); setImageData(null);
    setResults(null); setError(null); setProgress(0);
  };

  // ── Mode selection ──
  if (!mode) {
    return (
      <div style={{ padding: 20 }}>
        <h2 style={{ fontFamily: "DM Sans, sans-serif", fontSize: 22, fontWeight: 600, color: T.text, margin: "0 0 6px" }}>
          AI Peptide Scanner
        </h2>
        <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 14, color: T.muted, margin: "0 0 28px", lineHeight: 1.5 }}>
          upload a photo and get personalized peptide recommendations based on AI analysis
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { id: "face", emoji: "👤", title: "Face Scan", desc: "Skin quality, aging signs, complexion analysis" },
            { id: "physique", emoji: "💪", title: "Physique Scan", desc: "Body composition, muscle, skin, recovery markers" },
          ].map(opt => (
            <button key={opt.id} onClick={() => setMode(opt.id)} style={{
              display: "flex", alignItems: "center", gap: 16, padding: 20,
              background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 14,
              cursor: "pointer", textAlign: "left", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.background = T.bgHover; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.bgCard; }}
            >
              <div style={{ fontSize: 32, width: 50, textAlign: "center" }}>{opt.emoji}</div>
              <div>
                <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 16, fontWeight: 600, color: T.text }}>{opt.title}</div>
                <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: T.muted, marginTop: 2 }}>{opt.desc}</div>
              </div>
            </button>
          ))}
        </div>
        <div style={{
          marginTop: 24, padding: 16, background: `${T.accent}08`,
          border: `1px solid ${T.accent}20`, borderRadius: 12,
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <Ico name="info" size={16} color={T.accent} />
            <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: T.muted, margin: 0, lineHeight: 1.6 }}>
              photos are analyzed by AI in real-time and are not stored. for best results, use good lighting and a clear, unobstructed view.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Results ──
  if (results) {
    return (
      <div style={{ padding: 20 }}>
        <button onClick={reset} style={{
          display: "flex", alignItems: "center", gap: 6, background: "none", border: "none",
          color: T.muted, fontFamily: "DM Sans, sans-serif", fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 20,
        }}><Ico name="back" size={16} /> New Scan</button>

        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          {image && (
            <div style={{ width: 80, height: 80, borderRadius: 12, overflow: "hidden", flexShrink: 0, border: `2px solid ${T.accent}40` }}>
              <img src={image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          )}
          <div>
            <h3 style={{ fontFamily: "DM Sans, sans-serif", fontSize: 16, fontWeight: 600, color: T.text, margin: "0 0 6px" }}>Analysis Complete</h3>
            <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: T.muted, margin: 0, lineHeight: 1.5 }}>{results.overall_assessment}</p>
          </div>
        </div>

        {/* Observations */}
        <h4 style={{ fontFamily: "Space Mono, monospace", fontSize: 11, color: T.dim, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 12px" }}>Observations</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
          {results.observations?.map((obs, i) => (
            <div key={i} style={{ padding: "12px 14px", background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, fontWeight: 600, color: T.text }}>{obs.area}</span>
                <span style={{
                  fontFamily: "DM Sans, sans-serif", fontSize: 10, padding: "2px 8px", borderRadius: 20, fontWeight: 600,
                  background: obs.severity === "significant" ? "#ff446620" : obs.severity === "moderate" ? "#ffaa0020" : `${T.accent}15`,
                  color: obs.severity === "significant" ? T.danger : obs.severity === "moderate" ? T.warning : T.accent,
                }}>{obs.severity}</span>
              </div>
              <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: T.muted, lineHeight: 1.4 }}>{obs.finding}</span>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <h4 style={{ fontFamily: "Space Mono, monospace", fontSize: 11, color: T.dim, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 12px" }}>Recommended Peptides</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {results.recommendations?.sort((a, b) => a.priority - b.priority).map((rec, i) => {
            const pep = PEPTIDE_DB.find(p => p.id === rec.peptide_id);
            if (!pep) return null;
            return (
              <div key={i} style={{
                padding: 16, background: T.bgCard, border: `1px solid ${pep.color}30`,
                borderRadius: 14, borderLeft: `3px solid ${pep.color}`,
                animation: `fadeIn 0.3s ease ${i * 0.08}s both`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 22 }}>{pep.icon}</span>
                  <div>
                    <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 15, fontWeight: 600, color: T.text }}>
                      {pep.name}
                      <span style={{ marginLeft: 8, fontSize: 10, padding: "2px 6px", background: `${pep.color}20`, color: pep.color, borderRadius: 6, fontWeight: 700 }}>#{rec.priority}</span>
                    </div>
                    <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, color: T.dim }}>{pep.category}</div>
                  </div>
                </div>
                <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: T.muted, margin: "0 0 10px", lineHeight: 1.5 }}>{rec.reason}</p>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 12 }}>
                  {[{ l: "Dose", v: pep.typicalDose }, { l: "Freq", v: pep.frequency }, { l: "Route", v: pep.route }].map(d => (
                    <div key={d.l}>
                      <div style={{ fontFamily: "Space Mono, monospace", fontSize: 9, color: T.dim, letterSpacing: "0.08em", textTransform: "uppercase" }}>{d.l}</div>
                      <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: T.text, fontWeight: 500, marginTop: 2 }}>{d.v}</div>
                    </div>
                  ))}
                </div>
                <button onClick={() => onAddToTracker(pep)} style={{
                  width: "100%", padding: 10, background: `${pep.color}15`, border: `1px solid ${pep.color}30`,
                  borderRadius: 8, color: pep.color, fontFamily: "DM Sans, sans-serif", fontSize: 13, fontWeight: 600,
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                }}>
                  <Ico name="plus" size={14} color={pep.color} /> Add to Tracker
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Upload view ──
  return (
    <div style={{ padding: 20 }}>
      <button onClick={reset} style={{
        display: "flex", alignItems: "center", gap: 6, background: "none", border: "none",
        color: T.muted, fontFamily: "DM Sans, sans-serif", fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 20,
      }}><Ico name="back" size={16} /> Back</button>

      <h2 style={{ fontFamily: "DM Sans, sans-serif", fontSize: 20, fontWeight: 600, color: T.text, margin: "0 0 4px" }}>
        {mode === "face" ? "👤 Face Scan" : "💪 Physique Scan"}
      </h2>
      <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: T.muted, margin: "0 0 20px" }}>
        {mode === "face" ? "upload a clear, well-lit photo of your face" : "upload a photo showing your physique"}
      </p>

      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />

      {!image ? (
        <button onClick={() => fileRef.current?.click()} style={{
          width: "100%", padding: "60px 20px", background: T.bgCard,
          border: `2px dashed ${T.borderL}`, borderRadius: 16, cursor: "pointer",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 12, transition: "border-color 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.borderColor = T.accent}
          onMouseLeave={e => e.currentTarget.style.borderColor = T.borderL}
        >
          <Ico name="upload" size={40} color={T.dim} />
          <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 14, color: T.muted }}>tap to upload photo</span>
          <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, color: T.dim }}>JPG, PNG, WebP</span>
        </button>
      ) : (
        <div>
          <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: 16, position: "relative", border: `1px solid ${T.border}` }}>
            <img src={image} alt="" style={{ width: "100%", maxHeight: 360, objectFit: "cover", display: "block" }} />
            {analyzing && (
              <div style={{
                position: "absolute", inset: 0, background: "rgba(10,10,15,0.85)",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16,
              }}>
                <div style={{
                  width: 60, height: 60, border: `3px solid ${T.border}`, borderTopColor: T.accent,
                  borderRadius: "50%", animation: "spin 1s linear infinite",
                }} />
                <div style={{ fontFamily: "Space Mono, monospace", fontSize: 13, color: T.accent }}>analyzing...</div>
                <div style={{ width: "60%", height: 4, background: T.border, borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${progress}%`, height: "100%", background: T.accent, borderRadius: 4, transition: "width 0.4s ease" }} />
                </div>
              </div>
            )}
          </div>
          {error && (
            <div style={{ padding: 14, background: "#ff446615", border: `1px solid #ff446630`, borderRadius: 10, marginBottom: 14 }}>
              <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: T.danger, margin: 0 }}>{error}</p>
            </div>
          )}
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => { setImage(null); setImageData(null); if (fileRef.current) fileRef.current.value = ""; }} style={{
              flex: 1, padding: 14, background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 12,
              color: T.muted, fontFamily: "DM Sans, sans-serif", fontSize: 14, fontWeight: 500, cursor: "pointer",
            }}>Re-upload</button>
            <button onClick={analyze} disabled={analyzing || !imageData} style={{
              flex: 2, padding: 14,
              background: analyzing ? T.bgCard : `linear-gradient(135deg, ${T.accent}, #00b880)`,
              border: "none", borderRadius: 12,
              color: analyzing ? T.dim : "#000",
              fontFamily: "DM Sans, sans-serif", fontSize: 14, fontWeight: 700,
              cursor: analyzing ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}>
              {analyzing ? "Analyzing..." : <><Ico name="scan" size={18} color="#000" /> Analyze</>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════
// LIBRARY TAB
// ════════════════════════════════════════════

function LibraryTab() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");
  const cats = ["All", ...new Set(PEPTIDE_DB.map(p => p.category))];
  const filtered = filter === "All" ? PEPTIDE_DB : PEPTIDE_DB.filter(p => p.category === filter);

  if (selected) {
    const p = selected;
    return (
      <div style={{ padding: 20 }}>
        <button onClick={() => setSelected(null)} style={{
          display: "flex", alignItems: "center", gap: 6, background: "none", border: "none",
          color: T.muted, fontFamily: "DM Sans, sans-serif", fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 20,
        }}><Ico name="back" size={16} /> Back</button>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14, background: `${p.color}15`, border: `1px solid ${p.color}30`,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28,
          }}>{p.icon}</div>
          <div>
            <h2 style={{ fontFamily: "DM Sans, sans-serif", fontSize: 22, fontWeight: 700, color: T.text, margin: 0 }}>{p.name}</h2>
            <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: p.color }}>{p.category}</span>
          </div>
        </div>
        <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 14, color: T.muted, lineHeight: 1.6, margin: "0 0 24px" }}>{p.description}</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
          {[{ l: "Typical Dose", v: p.typicalDose }, { l: "Frequency", v: p.frequency }, { l: "Route", v: p.route }, { l: "Cycle Length", v: p.cycleLength }].map(d => (
            <div key={d.l} style={{ padding: 14, background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 12 }}>
              <div style={{ fontFamily: "Space Mono, monospace", fontSize: 9, color: T.dim, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>{d.l}</div>
              <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 14, color: T.text, fontWeight: 500 }}>{d.v}</div>
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: 9, color: T.dim, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Tags</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {p.tags.map(t => (
              <span key={t} style={{ padding: "4px 10px", background: `${p.color}10`, border: `1px solid ${p.color}20`, borderRadius: 20, fontFamily: "DM Sans, sans-serif", fontSize: 11, color: p.color }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ fontFamily: "DM Sans, sans-serif", fontSize: 22, fontWeight: 600, color: T.text, margin: "0 0 16px" }}>Peptide Library</h2>
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 12, marginBottom: 12 }}>
        {cats.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{
            padding: "6px 14px", background: filter === c ? T.accent : T.bgCard,
            border: `1px solid ${filter === c ? T.accent : T.border}`, borderRadius: 20,
            color: filter === c ? "#000" : T.muted, fontFamily: "DM Sans, sans-serif", fontSize: 12,
            fontWeight: filter === c ? 600 : 400, cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s",
          }}>{c}</button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map(p => (
          <button key={p.id} onClick={() => setSelected(p)} style={{
            display: "flex", alignItems: "center", gap: 14, padding: 14,
            background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 12,
            cursor: "pointer", textAlign: "left", transition: "all 0.15s",
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = `${p.color}50`}
            onMouseLeave={e => e.currentTarget.style.borderColor = T.border}
          >
            <div style={{
              width: 42, height: 42, borderRadius: 10, background: `${p.color}12`, border: `1px solid ${p.color}25`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0,
            }}>{p.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 14, fontWeight: 600, color: T.text }}>{p.name}</div>
              <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, color: T.dim, marginTop: 1 }}>{p.category}</div>
            </div>
            <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, color: p.color, padding: "3px 8px", background: `${p.color}12`, borderRadius: 6 }}>{p.typicalDose}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════
// TRACKER TAB
// ════════════════════════════════════════════

function TrackerTab({ initialPeptide, clearInitial }) {
  const [cycles, setCycles] = useState([]);
  const [showAdd, setShowAdd] = useState(!!initialPeptide);
  const [addForm, setAddForm] = useState({
    peptideId: initialPeptide?.id || "",
    startDate: new Date().toISOString().slice(0, 10),
    dose: initialPeptide?.typicalDose || "",
    frequency: initialPeptide?.frequency || "",
    notes: "",
  });

  useEffect(() => {
    if (initialPeptide) {
      setShowAdd(true);
      setAddForm({
        peptideId: initialPeptide.id,
        startDate: new Date().toISOString().slice(0, 10),
        dose: initialPeptide.typicalDose,
        frequency: initialPeptide.frequency,
        notes: "",
      });
      clearInitial?.();
    }
  }, [initialPeptide]);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ud_cycles");
      if (saved) setCycles(JSON.parse(saved));
    } catch {}
  }, []);

  // Save to localStorage
  useEffect(() => {
    try { localStorage.setItem("ud_cycles", JSON.stringify(cycles)); } catch {}
  }, [cycles]);

  const addCycle = () => {
    if (!addForm.peptideId) return;
    const peptide = PEPTIDE_DB.find(p => p.id === addForm.peptideId);
    setCycles(prev => [...prev, {
      id: Date.now().toString(), peptide, startDate: addForm.startDate,
      dose: addForm.dose, frequency: addForm.frequency, notes: addForm.notes, logs: [], active: true,
    }]);
    setShowAdd(false);
    setAddForm({ peptideId: "", startDate: new Date().toISOString().slice(0, 10), dose: "", frequency: "", notes: "" });
  };

  const logDose = (cycleId) => {
    setCycles(prev => prev.map(c =>
      c.id === cycleId ? { ...c, logs: [...c.logs, { timestamp: new Date().toISOString(), dose: c.dose }] } : c
    ));
  };

  const removeCycle = (cycleId) => setCycles(prev => prev.filter(c => c.id !== cycleId));

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontFamily: "DM Sans, sans-serif", fontSize: 22, fontWeight: 600, color: T.text, margin: 0 }}>Cycle Tracker</h2>
        <button onClick={() => setShowAdd(true)} style={{
          padding: "8px 16px", background: `${T.accent}15`, border: `1px solid ${T.accent}30`, borderRadius: 10,
          color: T.accent, fontFamily: "DM Sans, sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <Ico name="plus" size={14} color={T.accent} /> Add
        </button>
      </div>

      {showAdd && (
        <div style={{ padding: 20, background: T.bgEl, border: `1px solid ${T.borderL}`, borderRadius: 16, marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontFamily: "DM Sans, sans-serif", fontSize: 16, fontWeight: 600, color: T.text, margin: 0 }}>New Cycle</h3>
            <button onClick={() => setShowAdd(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
              <Ico name="x" size={18} />
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <label style={labelSt}>Peptide</label>
              <select value={addForm.peptideId} onChange={e => {
                const p = PEPTIDE_DB.find(pp => pp.id === e.target.value);
                setAddForm(f => ({ ...f, peptideId: e.target.value, dose: p?.typicalDose || f.dose, frequency: p?.frequency || f.frequency }));
              }} style={inputSt}>
                <option value="">Select peptide...</option>
                {PEPTIDE_DB.map(p => <option key={p.id} value={p.id}>{p.icon} {p.name}</option>)}
              </select>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div><label style={labelSt}>Start Date</label><input type="date" value={addForm.startDate} onChange={e => setAddForm(f => ({ ...f, startDate: e.target.value }))} style={inputSt} /></div>
              <div><label style={labelSt}>Dose</label><input value={addForm.dose} onChange={e => setAddForm(f => ({ ...f, dose: e.target.value }))} placeholder="e.g. 250mcg" style={inputSt} /></div>
            </div>
            <div><label style={labelSt}>Frequency</label><input value={addForm.frequency} onChange={e => setAddForm(f => ({ ...f, frequency: e.target.value }))} placeholder="e.g. Daily" style={inputSt} /></div>
            <div><label style={labelSt}>Notes</label><input value={addForm.notes} onChange={e => setAddForm(f => ({ ...f, notes: e.target.value }))} placeholder="optional notes..." style={inputSt} /></div>
            <button onClick={addCycle} disabled={!addForm.peptideId} style={{
              padding: 14, background: addForm.peptideId ? `linear-gradient(135deg, ${T.accent}, #00b880)` : T.bgCard,
              border: "none", borderRadius: 12, color: addForm.peptideId ? "#000" : T.dim,
              fontFamily: "DM Sans, sans-serif", fontSize: 14, fontWeight: 700, cursor: addForm.peptideId ? "pointer" : "not-allowed",
            }}>Start Cycle</button>
          </div>
        </div>
      )}

      {cycles.length === 0 && !showAdd ? (
        <div style={{ padding: "60px 20px", textAlign: "center", background: T.bgCard, borderRadius: 16, border: `1px dashed ${T.borderL}` }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🧬</div>
          <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 15, color: T.muted, margin: "0 0 4px" }}>no active cycles yet</p>
          <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: T.dim, margin: 0 }}>add a peptide to start tracking, or scan first for recommendations</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {cycles.map(cycle => {
            const days = Math.floor((Date.now() - new Date(cycle.startDate).getTime()) / 864e5);
            const total = cycle.logs.length;
            const last = total > 0 ? new Date(cycle.logs[total - 1].timestamp) : null;
            const hrs = last ? Math.floor((Date.now() - last.getTime()) / 36e5) : null;
            return (
              <div key={cycle.id} style={{
                padding: 16, background: T.bgCard, border: `1px solid ${cycle.peptide.color}25`,
                borderRadius: 14, borderLeft: `3px solid ${cycle.peptide.color}`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 24 }}>{cycle.peptide.icon}</span>
                    <div>
                      <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 15, fontWeight: 600, color: T.text }}>{cycle.peptide.name}</div>
                      <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, color: T.dim }}>{cycle.dose} · {cycle.frequency}</div>
                    </div>
                  </div>
                  <button onClick={() => removeCycle(cycle.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, opacity: 0.5 }}>
                    <Ico name="trash" size={16} />
                  </button>
                </div>
                <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                  {[{ l: "Day", v: days + 1 }, { l: "Doses", v: total }, { l: "Last", v: hrs !== null ? `${hrs}h ago` : "—" }].map(s => (
                    <div key={s.l} style={{ flex: 1, padding: "8px 10px", background: T.bg, borderRadius: 8, textAlign: "center" }}>
                      <div style={{ fontFamily: "Space Mono, monospace", fontSize: 9, color: T.dim, letterSpacing: "0.08em", textTransform: "uppercase" }}>{s.l}</div>
                      <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 16, fontWeight: 700, color: T.text, marginTop: 2 }}>{s.v}</div>
                    </div>
                  ))}
                </div>
                {total > 0 && (
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 12 }}>
                    {cycle.logs.map((_, i) => (
                      <div key={i} style={{ width: 10, height: 10, borderRadius: 3, background: cycle.peptide.color, opacity: 0.4 + 0.6 * (i + 1) / total }} />
                    ))}
                  </div>
                )}
                <button onClick={() => logDose(cycle.id)} style={{
                  width: "100%", padding: 12, background: `${cycle.peptide.color}15`, border: `1px solid ${cycle.peptide.color}30`,
                  borderRadius: 10, color: cycle.peptide.color, fontFamily: "DM Sans, sans-serif", fontSize: 13, fontWeight: 600,
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                }}>
                  <Ico name="check" size={16} color={cycle.peptide.color} /> Log Dose
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════
// MAIN APP
// ════════════════════════════════════════════

export default function Home() {
  const [tab, setTab] = useState("scan");
  const [addToTracker, setAddToTracker] = useState(null);

  const handleAdd = (peptide) => {
    setAddToTracker(peptide);
    setTab("tracker");
  };

  return (
    <div style={{
      background: T.bg, minHeight: "100vh", maxWidth: 480, margin: "0 auto",
      display: "flex", flexDirection: "column", position: "relative",
    }}>
      <Header />
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80 }}>
        {tab === "scan" && <ScanTab onAddToTracker={handleAdd} />}
        {tab === "library" && <LibraryTab />}
        {tab === "tracker" && <TrackerTab initialPeptide={addToTracker} clearInitial={() => setAddToTracker(null)} />}
      </div>
      <TabBar active={tab} onTab={setTab} />
    </div>
  );
}
