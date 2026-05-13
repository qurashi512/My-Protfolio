import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SB_URL = "https://nijmaixshspqogidtdai.supabase.co/rest/v1";
const SB_KEY = "sb_publishable_9U-mT8VLJQ0E5XoMIfIrTA_JmiERNXn";
const SB_HEADERS = { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, "Content-Type": "application/json" };

interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  message: string;
  created_at: string;
}

export default function TestimonialsPage() {
  const { language } = useLanguage();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", role: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    fetch(`${SB_URL}/testimonials?approved=eq.true&order=created_at.desc`, { headers: SB_HEADERS })
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setItems(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch(`${SB_URL}/testimonials`, {
        method: "POST",
        headers: SB_HEADERS,
        body: JSON.stringify({ name: form.name.trim(), role: form.role.trim() || null, message: form.message.trim() }),
      });
      if (res.ok || res.status === 201) {
        setStatus("success");
        setForm({ name: "", role: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const t = {
    back:        language === "ar" ? "رجوع" : language === "de" ? "Zurück" : "Back",
    title:       language === "ar" ? "آراء الآخرين" : language === "de" ? "Referenzen" : "Testimonials",
    subtitle:    language === "ar" ? "ماذا يقول الآخرون عني" : language === "de" ? "Was andere über mich sagen" : "What others say about me",
    writeTitle:  language === "ar" ? "اترك رأيك" : language === "de" ? "Referenz hinterlassen" : "Leave a Review",
    writeDesc:   language === "ar" ? "رأيك يُظهر بعد مراجعته. شكراً لوقتك!" : language === "de" ? "Ihre Referenz wird nach Überprüfung angezeigt." : "Your review appears after approval. Thank you!",
    name:        language === "ar" ? "الاسم *" : language === "de" ? "Name *" : "Name *",
    role:        language === "ar" ? "المسمى الوظيفي (اختياري)" : language === "de" ? "Position (optional)" : "Role / Position (optional)",
    message:     language === "ar" ? "رأيك *" : language === "de" ? "Ihre Referenz *" : "Your review *",
    send:        language === "ar" ? "إرسال" : language === "de" ? "Absenden" : "Submit",
    sending:     language === "ar" ? "جارٍ الإرسال..." : language === "de" ? "Wird gesendet..." : "Submitting...",
    success:     language === "ar" ? "✅ شكراً! سيظهر رأيك بعد المراجعة." : language === "de" ? "✅ Danke! Ihre Referenz wird nach Prüfung angezeigt." : "✅ Thank you! Your review will appear after approval.",
    error:       language === "ar" ? "حدث خطأ. حاول مجدداً." : language === "de" ? "Fehler. Bitte erneut versuchen." : "Something went wrong. Please try again.",
    noReviews:   language === "ar" ? "لا توجد آراء بعد. كن أول من يكتب!" : language === "de" ? "Noch keine Referenzen." : "No reviews yet. Be the first!",
    count:       (n: number) => language === "ar" ? `${n} آراء` : language === "de" ? `${n} Referenzen` : `${n} Reviews`,
  };

  return (
    <main className="min-h-screen bg-[#0A0E1A] pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Back */}
        <Link href="/">
          <span className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-[#F1F5F9] text-sm font-medium mb-8 cursor-pointer transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t.back}
          </span>
        </Link>

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="font-['Sora'] text-4xl md:text-5xl font-bold text-[#F1F5F9] mb-3">{t.title}</h1>
          <div className="w-16 h-1 bg-gradient-to-r from-[#6366F1] to-[#06B6D4] rounded-full mx-auto mb-4" />
          <p className="text-[#94A3B8] text-sm">{!loading && t.count(items.length)} · {t.subtitle}</p>
        </div>

        {/* Testimonials Grid */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 text-[#94A3B8]">{t.noReviews}</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {items.map((item) => (
              <div key={item.id} className="p-6 rounded-2xl bg-[#1E293B]/60 border border-[#334155]/40 relative
                hover:border-[#6366F1]/30 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col">
                <Quote className="w-8 h-8 text-[#6366F1]/20 mb-4" />
                <p className="text-[#94A3B8] text-sm leading-relaxed italic flex-1">&ldquo;{item.message}&rdquo;</p>
                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-[#334155]/40">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6366F1] to-[#06B6D4] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                    {item.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-['Sora'] text-sm font-semibold text-[#F1F5F9]">{item.name}</p>
                    {item.role && <p className="text-[#94A3B8] text-xs">{item.role}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Write Review Form */}
        <div id="write" className="max-w-xl mx-auto">
          <div className="p-8 rounded-2xl bg-[#1E293B]/60 border border-[#334155]/40">
            <h2 className="font-['Sora'] text-xl font-bold text-[#F1F5F9] mb-1">{t.writeTitle}</h2>
            <p className="text-[#94A3B8] text-xs mb-6">{t.writeDesc}</p>

            {status === "success" ? (
              <div className="text-center py-8 text-[#6366F1] font-medium">{t.success}</div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#6366F1] uppercase tracking-wider mb-1.5">{t.name}</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0A0E1A] border border-[#334155]/60 text-[#F1F5F9] text-sm
                        focus:outline-none focus:border-[#6366F1]/60 transition-colors placeholder:text-[#334155]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#6366F1] uppercase tracking-wider mb-1.5">{t.role}</label>
                    <input
                      type="text"
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0A0E1A] border border-[#334155]/60 text-[#F1F5F9] text-sm
                        focus:outline-none focus:border-[#6366F1]/60 transition-colors placeholder:text-[#334155]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#6366F1] uppercase tracking-wider mb-1.5">{t.message}</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0A0E1A] border border-[#334155]/60 text-[#F1F5F9] text-sm
                      focus:outline-none focus:border-[#6366F1]/60 transition-colors resize-none placeholder:text-[#334155]"
                  />
                </div>
                {status === "error" && <p className="text-red-400 text-xs">{t.error}</p>}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="px-6 py-3 rounded-xl bg-[#6366F1] text-white font-semibold text-sm
                    hover:bg-[#4F46E5] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {status === "sending" ? t.sending : t.send}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
