import { useState, useRef, useEffect } from "react";

const PURPLE = "#7B4FC4";
const PURPLE_LIGHT = "#9B6FE4";
const PURPLE_DARK = "#5A3A8F";
const PURPLE_GLOW = "rgba(123, 79, 196, 0.3)";
const BG_DARK = "#0A0A0F";
const BG_CARD = "#141419";
const BG_CARD_HOVER = "#1A1A22";
const BORDER = "#2A2A35";
const TEXT = "#F5F5F7";
const TEXT_MUTED = "#8E8E9A";
const TEXT_DIM = "#5A5A6A";

const DEFAULT_CONFIG = {
  studentName: "Prénom Élève",
  niche: "Exemple : soins capillaires naturels",
  instagramHandle: "@exemple",
  objective: "Passer de 0 à 10K abonnés et lancer une offre de coaching",
  planAction: "",
  questionnaire: "",
  additionalContext: "",
  pdfNotes: ""
};

function buildSystemPrompt(config) {
  return `Tu es l'assistant d'écriture de scripts personnalisé de ${config.studentName}, élève de l'accompagnement Square Motion by Creative Academy, un programme de coaching en création de contenu et personal branding fondé par Amina.

TON RÔLE :
Tu es un COACH D'ÉCRITURE DE SCRIPTS, pas un simple générateur. Tu aides ${config.studentName} à écrire des scripts pour ses Reels Instagram et TikTok, mais surtout tu lui APPRENDS à penser comme un créateur de contenu. Tu connais parfaitement son profil, sa niche, ses objectifs, son plan d'action, et tu maîtrises la méthode Square Motion.

COMPORTEMENT PÉDAGOGIQUE OBLIGATOIRE :
Tu ne balances JAMAIS un script complet directement sans poser de questions d'abord. Ton approche est toujours en 2 temps :

ÉTAPE 1 — COMPRENDRE L'INTENTION (pose ces questions AVANT d'écrire) :
- "C'est quoi l'angle que tu veux donner à cette vidéo ?" (le message principal)
- "Tu veux faire ressentir quoi à ton audience ? (ex: frustration, espoir, déclic, motivation, urgence...)"
- "T'as une anecdote perso ou un moment vécu en lien avec ce sujet ?" (pour le storytelling)
- "C'est pour attirer des nouveaux (TOFU), créer du lien (MOFU), ou convertir (BOFU) ?"
Tu n'es pas obligé de poser les 4 questions à chaque fois — adapte selon le contexte. Si l'élève a déjà donné des infos, rebondis dessus. Sois naturel, pas robotique.

ÉTAPE 2 — ÉCRIRE ENSEMBLE :
Une fois que tu as les réponses, tu proposes le script en expliquant tes choix :
- "J'ai choisi ce hook parce que..." 
- "La tension joue sur [telle émotion] parce que tu m'as dit que..."
- "J'ai intégré ton anecdote ici parce que c'est là que le storytelling est le plus puissant"

ÉTAPE 3 — RAPPEL SYSTÉMATIQUE :
À la FIN de chaque script, tu ajoutes TOUJOURS ce rappel :
"⚡ Rappel important : Ce script est une base. Reformule-le avec TES mots, ton énergie, ta façon de parler. C'est comme ça que tu crées un vrai lien émotionnel avec ton audience. L'authenticité > la perfection."

RÈGLES DE COACHING :
- Si l'élève dit "écris-moi un script sur [sujet]" sans plus de détails → tu poses tes questions d'abord, tu n'écris PAS directement.
- Si l'élève utilise un bouton rapide → tu peux proposer des idées mais tu demandes TOUJOURS quelle direction l'intéresse avant de développer le script complet.
- Encourage le storytelling à CHAQUE occasion. Demande "t'as une histoire perso en lien ?" ou "qu'est-ce qui t'a fait comprendre ça personnellement ?".
- Quand tu proposes plusieurs idées, demande à l'élève de choisir celle qui lui parle le plus avant de développer.
- VALORISE les idées de l'élève. S'il propose quelque chose, rebondis dessus et améliore plutôt que de remplacer.
- Rappelle régulièrement les principes des modules (ex: "Là on utilise le Hack 2 du Module 5 — In Media Res, c'est pour ça qu'on commence par le moment intense").

PROFIL DE L'ÉLÈVE :
- Prénom : ${config.studentName}
- Niche : ${config.niche}
- Compte Instagram : ${config.instagramHandle}
- Objectif principal : ${config.objective}

${config.planAction ? `PLAN D'ACTION :\n${config.planAction}\n` : ""}
${config.questionnaire ? `QUESTIONNAIRE D'ENTRÉE :\n${config.questionnaire}\n` : ""}
${config.additionalContext ? `CONTEXTE ADDITIONNEL :\n${config.additionalContext}\n` : ""}
${config.pdfNotes ? `NOTES DES DOCUMENTS PDF :\n${config.pdfNotes}\n` : ""}

═══════════════════════════════════════
MÉTHODE SQUARE MOTION — MODULES INTÉGRÉS
═══════════════════════════════════════

──── MODULE 4 : LES LOIS DE LA VISIBILITÉ ────

PSYCHOLOGIE DE L'ATTENTION :
- 3 secondes pour convaincre. L'audience zappe à toute vitesse.
- Ce n'est pas la faute des gens, c'est TA responsabilité de capter l'intérêt.
- Le cerveau cherche : se divertir, ressentir une émotion, apprendre quelque chose d'utile.
- Le hook est plus important que le reste du contenu.
- Bio claire et concise : qui tu es + quel problème tu règles.

ALGORITHME IG & TIKTOK :
- L'algorithme = un miroir. But = garder les utilisateurs sur l'app.
- Taux de rétention > likes. 50%+ de rétention = récompense algo.
- Pas besoin de danser ou suivre des trends. Bon contenu = algo fait le travail.

MYTHES : smartphone suffit, qualité > quantité, perfection = procrastination déguisée.

──── MODULE 5 : TECHNIQUES DE CRÉATION ────

4 PILIERS ÉDITORIAUX :
1. ÉDUQUER : expertise, valeur concrète.
2. INSPIRER : montrer ce qui est possible, émotion forte.
3. DIVERTIR : léger, B-roll + musique, vlogs.
4. POLARISER : avis tranché.

STRUCTURE H.T.V.C (CHAQUE SCRIPT) :
1. HOOK (0-3s) : choquer, promettre, intriguer. PAS "Bonjour à tous".
2. TENSION (3-15s) : appuyer sur la douleur. "Oui, c'est exactement moi."
3. VALEUR (15-45s) : donner le "Comment". Chirurgical.
4. CTA (5s) : TOFU/MOFU = "Enregistre", "Follow". BOFU = mot-clé. JAMAIS de poll.

FORMATS :
- Face Cam : proximité, conseil, opinion.
- Ciné/Horizontal : premium, inspirer, storytelling.
- Story : coulisses, vente douce, fidélisation.

STORYTELLING :
Hack 1 — South Park (Mais/Donc) : "MAIS personne n'a cliqué. DONC j'ai tout remis en question..."
Hack 2 — In Media Res : commencer par le moment le plus intense.
Hack 3 — Précision = émotion : détails physiques, pas de vague.

──── MODULE 6 : ENGAGEMENT & CONVERSION ────

VIDÉO VIRALE : mouvement dès la 1ère seconde, pattern interrupt toutes les 5s, boucle (fin=début), supprimer tous temps morts.

ERREURS : intro interminable, pas de sous-titres (80% sans son), monologue monotone.

SOFT SELLING :
1. Inception : vidéo éducative, offre = détail logique.
2. Étude de cas : transformation de quelqu'un.
3. Coulisse : montrer le travail pour les clients.
4. Rareté : "X places ce mois-ci."

CONTENU INFINI : 1 idée → Reel → Story → Texte → Remix = 5 contenus.

═══════════════════════════════════════
FUNNEL TOFU / MOFU / BOFU
═══════════════════════════════════════
TOFU : large, éducatif, relatable. CTA : "Follow", "Enregistre"
MOFU : storytelling, behind the scenes. CTA : "Enregistre", "DM-moi"
BOFU : conversion, soft selling. CTA = mot-clé. JAMAIS de poll.

═══════════════════════════════════════
RÈGLES ABSOLUES
═══════════════════════════════════════
1. Ton NATUREL, conversationnel. JAMAIS robot/IA.
2. PAS de stats inventées.
3. PAS de CTA poll. Mot-clé pour BOFU.
4. Storytelling personnel quand possible.
5. Hooks = pattern interrupts.
6. Français courant, "tu".
7. Reels 30-60s. TikTok 15-60s.
8. Indiquer funnel + pilier éditorial.
9. Méthode South Park dans le storytelling.
10. In Media Res quand pertinent.
11. Détails précis pour l'émotion.
12. Proposer face cam OU ciné selon intention.
13. Mentionner le recyclage.

FORMAT DE RÉPONSE POUR LES SCRIPTS :
📌 [TOFU/MOFU/BOFU] — Titre du concept
🎨 Pilier : Éduquer / Inspirer / Divertir / Polariser
🎬 Format : Reels Face Cam / Reels Ciné / TikTok
⏱️ Durée estimée : XX sec

🪝 HOOK (0-3s) :
"..."

😤 TENSION (3-15s) :
"..."

💡 VALEUR (15-45s) :
"..."

🎯 CTA :
"..."

💡 Note de production : (tournage, montage, sous-titres)
♻️ Recyclage : (story, texte, remix)

Réponds TOUJOURS en français. Sois créatif, audacieux, et hyper-spécifique à la niche de ${config.studentName}.`;
}

const styles = {
  app: { fontFamily: "'Outfit', sans-serif", background: BG_DARK, color: TEXT, minHeight: "100vh", position: "relative", overflow: "hidden" },
  bgGlow: { position: "fixed", top: "-30%", left: "-10%", width: "60%", height: "60%", background: `radial-gradient(ellipse, ${PURPLE_GLOW} 0%, transparent 70%)`, pointerEvents: "none", zIndex: 0 },
  bgGlow2: { position: "fixed", bottom: "-20%", right: "-15%", width: "50%", height: "50%", background: "radial-gradient(ellipse, rgba(123, 79, 196, 0.15) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 },
  container: { position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "0 20px" },
  header: { padding: "32px 0 24px", textAlign: "center", borderBottom: `1px solid ${BORDER}`, marginBottom: 24 },
  logoCA: { fontSize: 42, fontWeight: 800, background: `linear-gradient(135deg, ${PURPLE_LIGHT}, ${PURPLE})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: -2, lineHeight: 1 },
  brandSub: { fontSize: 11, fontWeight: 500, color: TEXT_MUTED, letterSpacing: 4, textTransform: "uppercase", marginTop: 6 },
  studentBadge: { display: "inline-flex", alignItems: "center", gap: 8, background: BG_CARD, border: `1px solid ${BORDER}`, borderRadius: 100, padding: "8px 18px", marginTop: 16, fontSize: 14, color: TEXT },
  studentDot: { width: 8, height: 8, borderRadius: "50%", background: PURPLE, boxShadow: `0 0 8px ${PURPLE}` },
  nav: { display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" },
  navBtn: (a) => ({ padding: "10px 20px", borderRadius: 12, border: a ? `1px solid ${PURPLE}` : `1px solid ${BORDER}`, background: a ? `${PURPLE}18` : "transparent", color: a ? PURPLE_LIGHT : TEXT_MUTED, fontSize: 13, fontWeight: 600, fontFamily: "'Outfit', sans-serif", cursor: "pointer", transition: "all 0.2s" }),
  funnelFilter: { display: "flex", gap: 6, marginBottom: 20 },
  funnelBtn: (a, c) => ({ padding: "6px 14px", borderRadius: 8, border: `1px solid ${a ? c : BORDER}`, background: a ? `${c}20` : "transparent", color: a ? c : TEXT_DIM, fontSize: 12, fontWeight: 600, fontFamily: "'Outfit', sans-serif", cursor: "pointer", transition: "all 0.2s" }),
  card: { background: BG_CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24, marginBottom: 16 },
  chatArea: { flex: 1, overflowY: "auto", padding: "16px 0", display: "flex", flexDirection: "column", gap: 16, maxHeight: "55vh", minHeight: 300 },
  msgUser: { alignSelf: "flex-end", background: PURPLE_DARK, color: TEXT, borderRadius: "16px 16px 4px 16px", padding: "12px 18px", maxWidth: "80%", fontSize: 14, lineHeight: 1.6 },
  msgAI: { alignSelf: "flex-start", background: BG_CARD_HOVER, border: `1px solid ${BORDER}`, color: TEXT, borderRadius: "16px 16px 16px 4px", padding: "16px 20px", maxWidth: "85%", fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-wrap" },
  inputRow: { display: "flex", gap: 10, padding: "16px 0", borderTop: `1px solid ${BORDER}` },
  input: { flex: 1, background: BG_CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "14px 18px", color: TEXT, fontSize: 14, fontFamily: "'Outfit', sans-serif", outline: "none", resize: "none", minHeight: 48, maxHeight: 120 },
  sendBtn: (d) => ({ background: d ? BORDER : `linear-gradient(135deg, ${PURPLE}, ${PURPLE_DARK})`, border: "none", borderRadius: 12, width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", cursor: d ? "not-allowed" : "pointer", transition: "all 0.2s", flexShrink: 0 }),
  adminOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", zIndex: 100, overflowY: "auto", padding: 20 },
  adminPanel: { maxWidth: 700, margin: "40px auto", background: BG_CARD, border: `1px solid ${BORDER}`, borderRadius: 20, padding: 32 },
  adminTitle: { fontSize: 22, fontWeight: 700, color: TEXT, marginBottom: 4 },
  adminSub: { fontSize: 13, color: TEXT_MUTED, marginBottom: 28 },
  label: { display: "block", fontSize: 12, fontWeight: 600, color: TEXT_MUTED, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8, marginTop: 20 },
  adminInput: { width: "100%", background: BG_DARK, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "12px 16px", color: TEXT, fontSize: 14, fontFamily: "'Outfit', sans-serif", outline: "none", boxSizing: "border-box" },
  adminTextarea: { width: "100%", background: BG_DARK, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "12px 16px", color: TEXT, fontSize: 14, fontFamily: "'Outfit', sans-serif", outline: "none", resize: "vertical", minHeight: 100, lineHeight: 1.6, boxSizing: "border-box" },
  saveBtn: { background: `linear-gradient(135deg, ${PURPLE}, ${PURPLE_DARK})`, border: "none", borderRadius: 12, padding: "14px 32px", color: "#fff", fontSize: 15, fontWeight: 600, fontFamily: "'Outfit', sans-serif", cursor: "pointer", marginTop: 28, width: "100%" },
  quickAction: { display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 },
  quickBtn: { background: BG_CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "14px 18px", color: TEXT_MUTED, fontSize: 13, fontFamily: "'Outfit', sans-serif", cursor: "pointer", textAlign: "left", transition: "all 0.2s", lineHeight: 1.4 },
  typing: { display: "flex", gap: 6, padding: "12px 18px", alignSelf: "flex-start" },
  typingDot: (dl) => ({ width: 8, height: 8, borderRadius: "50%", background: PURPLE_LIGHT, animation: `typingBounce 1.2s ease-in-out ${dl}s infinite` }),
  adminGear: { position: "fixed", bottom: 20, right: 20, width: 44, height: 44, borderRadius: "50%", background: BG_CARD, border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 50, fontSize: 20, transition: "all 0.2s" },
};

const QUICK_ACTIONS = {
  ideas: [
    { label: "🎯 10 idées TOFU pour ma niche", prompt: "Donne-moi 10 idées de contenus TOFU spécifiques à ma niche. Pour chaque idée : titre/concept, hook accrocheur (pattern interrupt), pilier éditorial." },
    { label: "🔥 5 idées MOFU storytelling", prompt: "Propose-moi 5 idées MOFU basées sur du storytelling. Utilise les hacks du Module 5 (méthode South Park, In Media Res, précision émotionnelle)." },
    { label: "💰 3 idées BOFU Soft Selling", prompt: "Donne-moi 3 idées BOFU utilisant les techniques de Soft Selling du Module 6 : Inception, Étude de cas, ou Rareté. Inclus des CTA avec mot-clé." },
    { label: "📅 Planning semaine (mix funnel)", prompt: "Crée un planning de 5 contenus pour la semaine avec mix TOFU/MOFU/BOFU. Pour chacun : concept, funnel, pilier, format (face cam/ciné/story), recyclage." },
    { label: "♻️ Recycler un contenu en 5 formats", prompt: "Je vais te donner un sujet. Applique la stratégie Contenu Infini : Reel source, Story discussion, Texte écrit, Remix futur, format bonus." },
  ],
  script: [
    { label: "✍️ Script Reel éducatif (TOFU)", prompt: "Écris un script complet de Reel éducatif TOFU pour ma niche. Structure H.T.V.C stricte. Hook = pattern interrupt. Inclus note de production et recyclage." },
    { label: "📖 Script storytelling (MOFU)", prompt: "Écris un script MOFU storytelling. Applique les 3 hacks Module 5 : Mais/Donc, In Media Res, détails précis. Structure H.T.V.C." },
    { label: "🚀 Script Soft Selling (BOFU)", prompt: "Écris un script BOFU Soft Selling (Inception, Étude de cas ou Rareté). CTA avec mot-clé. Traite une objection courante de mon audience." },
    { label: "🎬 Script TikTok viral (15-30s)", prompt: "Écris un script TikTok court (15-30s) ultra viral TOFU. Hook en 2s max. Principes de viralité Module 6 : densité, pattern interrupts, boucle." },
    { label: "🎥 Script Reel Cinématique", prompt: "Écris un script Reel cinématique/horizontal. Ton inspirant, B-roll + voix-off. Storytelling méthode South Park. Pilier : Inspirer." },
    { label: "🔥 3 scripts variés (T+M+B)", prompt: "Écris 3 scripts complets : 1 TOFU éducatif, 1 MOFU storytelling, 1 BOFU soft selling. Structure H.T.V.C, format recommandé, recyclage." },
  ],
  tone: [
    { label: "🔄 Rends mon script plus naturel", prompt: "Je vais te donner un script. Réécris-le naturel et conversationnel. Garde H.T.V.C." },
    { label: "⚡ 5 hooks alternatifs", prompt: "Je vais te donner un hook. Propose 5 alternatives : Promesse, Négatif, Question provocante, Affirmation contraire, Ultra-relatable." },
    { label: "🎭 Adapter Reels → TikTok", prompt: "Je vais te donner un script Reels. Adapte au TikTok : plus court (15-30s), plus punchy. Densité max, boucle." },
    { label: "📊 Analyse mon script /10", prompt: "Je vais te donner un script. Analyse selon Modules 4-5-6 : hook, H.T.V.C, storytelling, ton, CTA, rétention. Score /10 + améliorations." },
    { label: "💪 Éducatif → Storytelling", prompt: "Je vais te donner un script éducatif. Transforme-le en storytelling MOFU avec histoire personnelle. Hacks Module 5." },
  ],
};

export default function App() {
  // Check if student ID is in URL (e.g. ?s=aninia)
  const studentId = (() => {
    try {
      return new URLSearchParams(window.location.search).get("s");
    } catch { return null; }
  })();

  const [isStudentMode] = useState(!!studentId);
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [configLoaded, setConfigLoaded] = useState(!studentId);
  const [configError, setConfigError] = useState("");
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminConfig, setAdminConfig] = useState(DEFAULT_CONFIG);
  const [activeTab, setActiveTab] = useState("script");
  const [activeFunnel, setActiveFunnel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const chatRef = useRef(null);
  const ADMIN_CODE = "squaremotion2024";

  // Load admin config from localStorage (for admin mode only)
  useEffect(() => {
    if (!studentId) {
      try {
        const saved = localStorage.getItem("sm_admin_config");
        if (saved) {
          const parsed = JSON.parse(saved);
          setConfig(parsed);
          setAdminConfig(parsed);
        }
      } catch {}
    }
  }, []);

  // Load student config from server
  useEffect(() => {
    if (!studentId) return;
    fetch("/api/student?id=" + encodeURIComponent(studentId))
      .then(r => r.json())
      .then(data => {
        if (data.config) {
          setConfig(data.config);
          setConfigLoaded(true);
        } else {
          setConfigError("Profil non trouvé. Contacte ta coach.");
        }
      })
      .catch(() => {
        setConfigError("Erreur de chargement. Réessaie dans quelques secondes.");
      });
  }, [studentId]);

  useEffect(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; }, [messages, loading]);

  useEffect(() => {
    if (configLoaded && config.studentName !== DEFAULT_CONFIG.studentName) {
      setMessages([{ role: "assistant", content: `Hey ${config.studentName} ! 👋\n\nJe suis ton assistant d'écriture de scripts, personnalisé pour toi et ta niche "${config.niche}".\n\nJe maîtrise toute la méthode Square Motion (Modules 4, 5 et 6) : psychologie de l'attention, structure H.T.V.C, storytelling, piliers éditoriaux, soft selling, et recyclage de contenu.\n\nTu peux me demander :\n• Des idées TOFU / MOFU / BOFU\n• Des scripts complets (Hook → Tension → Valeur → CTA)\n• D'analyser et améliorer tes scripts\n• Des conseils de storytelling, format et recyclage\n\nLet's go 🚀` }]);
    }
  }, [configLoaded, config.studentName, config.niche]);

  async function sendMessage(text) {
    if (!text.trim() || loading) return;
    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const apiMessages = newMessages.map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.content }));
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: buildSystemPrompt(config), messages: apiMessages }),
      });
      const data = await response.json();
      const aiText = data.content?.filter(b => b.type === "text").map(b => b.text).join("\n") || "Désolé, une erreur est survenue. Réessaie !";
      setMessages(prev => [...prev, { role: "assistant", content: aiText }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: "⚠️ Erreur de connexion. Vérifie ta connexion internet et réessaie." }]);
    }
    setLoading(false);
  }

  function handleQuickAction(prompt) {
    let fp = prompt;
    if (activeFunnel) fp += `\n\nConcentre-toi uniquement sur du contenu ${activeFunnel}.`;
    sendMessage(fp);
  }

  function saveAdminConfig() {
    setConfig(adminConfig);
    try { localStorage.setItem("sm_admin_config", JSON.stringify(adminConfig)); } catch {}
    // Generate student ID from name
    const sid = adminConfig.studentName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
    const baseUrl = window.location.origin + window.location.pathname;
    const link = baseUrl + "?s=" + sid;
    setGeneratedLink(link);
    setLinkCopied(false);
    // Generate JSON snippet for students.json on GitHub
    const jsonSnippet = JSON.stringify({ [sid]: adminConfig }, null, 2);
    setAdminConfig(prev => ({ ...prev, _jsonSnippet: jsonSnippet, _studentId: sid }));
    setMessages([{ role: "assistant", content: `Profil configuré ! ✅\n\nLien pour ${adminConfig.studentName} : ${link}\n\n⚠️ Pour activer ce lien, ajoute le profil dans students.json sur GitHub (voir le panneau admin).` }]);
  }

  function copyLink() {
    navigator.clipboard.writeText(generatedLink).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 3000);
    });
  }

  function handleAdminAccess() { if (adminKey === ADMIN_CODE) { setIsUnlocked(true); setAdminConfig(config); } }

  const cqa = QUICK_ACTIONS[activeTab] || [];

  return (
    <div style={styles.app}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes typingBounce { 0%, 60%, 100% { transform: translateY(0); opacity: 0.4; } 30% { transform: translateY(-6px); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        input::placeholder, textarea::placeholder { color: #5A5A6A !important; }
        *::-webkit-scrollbar { width: 6px; } *::-webkit-scrollbar-track { background: transparent; } *::-webkit-scrollbar-thumb { background: #2A2A35; border-radius: 3px; }
      `}</style>
      <div style={styles.bgGlow} />
      <div style={styles.bgGlow2} />
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.logoCA}>CA</div>
          <div style={styles.brandSub}>Square Motion — Script Generator</div>
          {config.studentName !== DEFAULT_CONFIG.studentName && (
            <div style={{ ...styles.studentBadge, animation: "fadeIn 0.5s ease" }}>
              <div style={styles.studentDot} />
              <span>{config.studentName}</span>
              <span style={{ color: TEXT_DIM }}>·</span>
              <span style={{ color: TEXT_MUTED, fontSize: 12 }}>{config.niche}</span>
            </div>
          )}
        </div>
        <div style={styles.nav}>
          {[{ id: "ideas", label: "💡 Idées de sujets" }, { id: "script", label: "✍️ Scripts complets" }, { id: "tone", label: "🎭 Ton & adaptation" }].map(tab => (
            <button key={tab.id} style={styles.navBtn(activeTab === tab.id)} onClick={() => setActiveTab(tab.id)}>{tab.label}</button>
          ))}
        </div>
        <div style={styles.funnelFilter}>
          {[{ id: null, label: "Tous", color: TEXT_MUTED }, { id: "TOFU", label: "TOFU", color: "#4ECDC4" }, { id: "MOFU", label: "MOFU", color: "#FFD93D" }, { id: "BOFU", label: "BOFU", color: "#FF6B6B" }].map(f => (
            <button key={f.label} style={styles.funnelBtn(activeFunnel === f.id, f.color)} onClick={() => setActiveFunnel(f.id)}>{f.label}</button>
          ))}
        </div>
        <div style={styles.quickAction}>
          {cqa.map((qa, i) => (
            <button key={i} style={{ ...styles.quickBtn, animation: `slideUp 0.3s ease ${i * 0.05}s both` }}
              onClick={() => handleQuickAction(qa.prompt)}
              onMouseOver={e => { e.target.style.borderColor = PURPLE; e.target.style.color = TEXT; e.target.style.background = BG_CARD_HOVER; }}
              onMouseOut={e => { e.target.style.borderColor = BORDER; e.target.style.color = TEXT_MUTED; e.target.style.background = BG_CARD; }}>{qa.label}</button>
          ))}
        </div>
        <div style={styles.card}>
          <div ref={chatRef} style={styles.chatArea}>
            {configError && (
              <div style={{ textAlign: "center", padding: "40px 20px", animation: "fadeIn 0.6s ease" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>⚠️</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "#FF6B6B", marginBottom: 8 }}>{configError}</div>
              </div>
            )}
            {!configLoaded && !configError && (
              <div style={{ textAlign: "center", padding: "40px 20px", animation: "fadeIn 0.6s ease" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>⏳</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: TEXT, marginBottom: 8 }}>Chargement de ton profil...</div>
              </div>
            )}
            {configLoaded && messages.length === 0 && !configError && (
              <div style={{ textAlign: "center", padding: "40px 20px", animation: "fadeIn 0.6s ease" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>✨</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: TEXT, marginBottom: 8 }}>Prêt à écrire des scripts qui claquent</div>
                <div style={{ fontSize: 13, color: TEXT_MUTED, maxWidth: 400, margin: "0 auto", lineHeight: 1.6 }}>Méthode Square Motion intégrée : H.T.V.C, storytelling, piliers éditoriaux, soft selling, recyclage.</div>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} style={{ ...(msg.role === "user" ? styles.msgUser : styles.msgAI), animation: "fadeIn 0.3s ease" }}>{msg.content}</div>
            ))}
            {loading && <div style={styles.typing}><div style={styles.typingDot(0)} /><div style={styles.typingDot(0.15)} /><div style={styles.typingDot(0.3)} /></div>}
          </div>
          <div style={styles.inputRow}>
            <textarea style={styles.input} placeholder="Écris ta demande ici..." value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }} rows={1} />
            <button style={styles.sendBtn(loading || !input.trim())} onClick={() => sendMessage(input)} disabled={loading || !input.trim()}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
        <div style={{ textAlign: "center", padding: "20px 0 40px", fontSize: 11, color: TEXT_DIM }}>Powered by Square Motion × Creative Academy</div>
      </div>
      {!studentId && <div style={styles.adminGear} onClick={() => setShowAdmin(true)} onMouseOver={e => { e.currentTarget.style.borderColor = PURPLE; }} onMouseOut={e => { e.currentTarget.style.borderColor = BORDER; }}>⚙️</div>}
      {showAdmin && (
        <div style={styles.adminOverlay} onClick={e => { if (e.target === e.currentTarget) setShowAdmin(false); }}>
          <div style={styles.adminPanel}>
            {!isUnlocked ? (
              <div>
                <div style={styles.adminTitle}>🔐 Accès Coach</div>
                <div style={styles.adminSub}>Espace réservé — entre le code d'accès</div>
                <label style={styles.label}>Code d'accès</label>
                <input style={styles.adminInput} type="password" value={adminKey} onChange={e => setAdminKey(e.target.value)} onKeyDown={e => { if (e.key === "Enter") handleAdminAccess(); }} placeholder="••••••••" />
                <button style={styles.saveBtn} onClick={handleAdminAccess}>Déverrouiller</button>
                {adminKey && adminKey !== ADMIN_CODE && adminKey.length > 3 && <div style={{ color: "#FF6B6B", fontSize: 13, marginTop: 12, textAlign: "center" }}>Code incorrect</div>}
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div><div style={styles.adminTitle}>⚙️ Configuration Élève</div><div style={styles.adminSub}>Modules 4-5-6 intégrés automatiquement</div></div>
                  <button style={{ background: "none", border: "none", color: TEXT_MUTED, fontSize: 24, cursor: "pointer" }} onClick={() => setShowAdmin(false)}>✕</button>
                </div>
                <label style={styles.label}>Prénom de l'élève</label>
                <input style={styles.adminInput} value={adminConfig.studentName} onChange={e => setAdminConfig(p => ({ ...p, studentName: e.target.value }))} placeholder="Ex: Morgane" />
                <label style={styles.label}>Niche</label>
                <input style={styles.adminInput} value={adminConfig.niche} onChange={e => setAdminConfig(p => ({ ...p, niche: e.target.value }))} placeholder="Ex: cheveux bouclés naturels" />
                <label style={styles.label}>Compte Instagram</label>
                <input style={styles.adminInput} value={adminConfig.instagramHandle} onChange={e => setAdminConfig(p => ({ ...p, instagramHandle: e.target.value }))} placeholder="@exemple" />
                <label style={styles.label}>Objectif principal</label>
                <textarea style={{ ...styles.adminTextarea, minHeight: 70 }} value={adminConfig.objective} onChange={e => setAdminConfig(p => ({ ...p, objective: e.target.value }))} placeholder="Objectif de l'élève" />
                <label style={styles.label}>Plan d'action</label>
                <textarea style={styles.adminTextarea} value={adminConfig.planAction} onChange={e => setAdminConfig(p => ({ ...p, planAction: e.target.value }))} placeholder="Colle le plan d'action..." />
                <label style={styles.label}>Questionnaire d'entrée</label>
                <textarea style={styles.adminTextarea} value={adminConfig.questionnaire} onChange={e => setAdminConfig(p => ({ ...p, questionnaire: e.target.value }))} placeholder="Réponses du questionnaire..." />
                <label style={styles.label}>Notes des documents PDF</label>
                <textarea style={{ ...styles.adminTextarea, minHeight: 80 }} value={adminConfig.pdfNotes} onChange={e => setAdminConfig(p => ({ ...p, pdfNotes: e.target.value }))} placeholder="Contenu pertinent des PDFs..." />
                <label style={styles.label}>Contexte additionnel</label>
                <textarea style={{ ...styles.adminTextarea, minHeight: 70 }} value={adminConfig.additionalContext} onChange={e => setAdminConfig(p => ({ ...p, additionalContext: e.target.value }))} placeholder="Style, forces, axes d'amélioration..." />
                <button style={styles.saveBtn} onClick={saveAdminConfig}>💾 Sauvegarder & Générer le lien élève</button>
                {generatedLink && (
                  <div style={{ marginTop: 20, padding: 16, background: BG_DARK, borderRadius: 12, border: `1px solid ${PURPLE}` }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: PURPLE_LIGHT, marginBottom: 8 }}>🔗 Lien pour {adminConfig.studentName} :</div>
                    <div style={{ fontSize: 13, color: TEXT, wordBreak: "break-all", marginBottom: 12, padding: "10px 14px", background: BG_DARK, borderRadius: 8, border: "1px solid " + PURPLE }}>{generatedLink}</div>
                    <button onClick={copyLink} style={{ ...styles.saveBtn, marginTop: 0, background: linkCopied ? "#2D8B4E" : `linear-gradient(135deg, ${PURPLE}, ${PURPLE_DARK})` }}>
                      {linkCopied ? "✅ Lien copié !" : "📋 Copier le lien"}
                    </button>
                    {adminConfig._jsonSnippet && (
                      <div style={{ marginTop: 16 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: "#FFD93D", marginBottom: 8 }}>📝 Étape suivante : ajoute ce profil dans students.json sur GitHub</div>
                        <div style={{ fontSize: 11, color: TEXT_MUTED, marginBottom: 8, lineHeight: 1.5 }}>Va sur GitHub → students.json → crayon ✏️ → ajoute ce bloc dans le JSON → Commit</div>
                        <textarea readOnly value={adminConfig._jsonSnippet} style={{ ...styles.adminTextarea, minHeight: 120, fontSize: 11, fontFamily: "monospace", color: "#4ECDC4" }} onClick={e => { e.target.select(); document.execCommand("copy"); setLinkCopied(true); setTimeout(() => setLinkCopied(false), 2000); }} />
                      </div>
                    )}
                    <div style={{ fontSize: 11, color: TEXT_DIM, marginTop: 10, lineHeight: 1.5 }}>
                      Le lien ne marchera qu'après avoir ajouté le profil dans students.json sur GitHub.
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
