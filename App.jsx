import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Search, Heart, ShoppingBag, X, Star, Menu, ChevronRight, ChevronLeft,
  Instagram, Facebook, Twitter, Mail, Phone, MapPin, Plus, Minus,
  Ruler, MessageCircle, Quote, ArrowUpRight, Eye
} from "lucide-react";

/* =========================================================
   MINAAR LUXE — Editorial Redesign
   Palette: Black #000000 / White #FFFFFF / Gold #B8935F
   Type: Bodoni Moda (display serif) + Jost (wide sans)
========================================================= */

const GOLD = "#B8935F";

const IMG = {
  hero: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=1800&q=80&auto=format",
  heroMobile: "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=1000&q=80&auto=format",
  about: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80&auto=format",
  aboutDetail: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80&auto=format",
  pret: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80&auto=format",
  formal: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=1200&q=80&auto=format",
  festive: "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=1200&q=80&auto=format",
  arrivals: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=80&auto=format",
};

const PRODUCT_IMAGES = [
  "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=900&q=80&auto=format",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80&auto=format",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=80&auto=format",
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80&auto=format",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&q=80&auto=format",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=80&auto=format",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=80&auto=format",
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900&q=80&auto=format",
  "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=900&q=80&auto=format",
  "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=80&auto=format",
  "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=900&q=80&auto=format",
  "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=900&q=80&auto=format",
  "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=900&q=80&auto=format",
  "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=900&q=80&auto=format",
  "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=900&q=80&auto=format",
  "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=900&q=80&auto=format",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=80&auto=format",
  "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=900&q=80&auto=format",
  "https://images.unsplash.com/photo-1483118714900-540cf339fd46?w=900&q=80&auto=format",
  "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=900&q=80&auto=format",
];

const COLLECTIONS = [
  { name: "Luxury Pret", tag: "Everyday elegance, elevated", img: IMG.pret, note: "Lawn, linen & silk staples cut for the woman who dresses well on an ordinary Tuesday." },
  { name: "Formal Wear", tag: "For rooms that remember you", img: IMG.formal, note: "Structured gowns, capes and sarees built for the moments that call for presence." },
  { name: "Festive Collection", tag: "Heirlooms in the making", img: IMG.festive, note: "Hand-worked zardozi, gota and mirror embellishment for Eid, mehndi and beyond." },
  { name: "New Arrivals", tag: "Just landed at the atelier", img: IMG.arrivals, note: "This week's fresh cuts — limited pieces, first come, first styled." },
];

const FABRICS = ["Pure Organza", "Chikankari Lawn", "Raw Silk", "Tissue Silk", "Banarasi Silk", "Velvet", "Net with Zari", "Belgian Linen"];

const NAMES = [
  ["Sana Organza Pret Set", "Luxury Pret"], ["Meherbano Embroidered Kurta", "Luxury Pret"],
  ["Zoya Chikankari Shirt", "Luxury Pret"], ["Alishba Linen Co-ord", "Luxury Pret"],
  ["Rimsha Printed Lawn Suit", "Luxury Pret"], ["Hania Tissue Silk Kurta", "Luxury Pret"],
  ["Anaya Sequinned Formal Gown", "Formal Wear"], ["Kinza Zari Formal Peplum", "Formal Wear"],
  ["Mahnoor Embellished Saree", "Formal Wear"], ["Areeba Net Formal Maxi", "Formal Wear"],
  ["Noor-ul-Ain Cape Gown", "Formal Wear"], ["Sadaf Tissue Formal Shirt", "Formal Wear"],
  ["Rania Velvet Festive Angrakha", "Festive Collection"], ["Mehak Gota Work Lehenga", "Festive Collection"],
  ["Iqra Banarasi Silk Gharara", "Festive Collection"], ["Dua Embroidered Festive Kurta", "Festive Collection"],
  ["Sana Zardozi Sharara Set", "Festive Collection"], ["Mishal Mirror Work Anarkali", "Festive Collection"],
  ["Amal Silk Wrap Dress", "New Arrivals"], ["Noreen Tailored Blazer Suit", "New Arrivals"],
  ["Farah Draped Cape Dress", "New Arrivals"], ["Laiba Pearl Embellished Kurta", "New Arrivals"],
  ["Sehar Organza Cape Set", "New Arrivals"], ["Zunaira Structured Trouser Suit", "New Arrivals"],
];

function genProducts() {
  return NAMES.map((n, i) => {
    const price = 4999 + Math.round(((i * 811) % 20000) / 100) * 100;
    const onSale = i % 3 === 1;
    const original = onSale ? Math.round((price * 1.3) / 100) * 100 : null;
    const rating = (3.9 + ((i * 41) % 11) / 10).toFixed(1);
    const reviews = 8 + ((i * 47) % 160);
    const fabric = FABRICS[i % FABRICS.length];
    return {
      id: i + 1,
      name: n[0],
      collection: n[1],
      price,
      original,
      fabric,
      rating: Number(rating),
      reviews,
      img: PRODUCT_IMAGES[i % PRODUCT_IMAGES.length],
      img2: PRODUCT_IMAGES[(i + 5) % PRODUCT_IMAGES.length],
      desc: `Cut from ${fabric.toLowerCase()} and finished entirely by hand, the ${n[0]} is made in small numbers at our Lahore atelier and individually numbered on the inside seam.`,
    };
  });
}

const PRODUCTS = genProducts();

const REVIEWS = [
  { name: "Ayesha Farooq", city: "Lahore", rating: 5, text: "I've bought from every major Pakistani label — MINAAR's finishing is the first that actually matches what I've seen in Paris ateliers." },
  { name: "Mehreen Baig", city: "Karachi", rating: 5, text: "The Rania Velvet Angrakha stopped an entire wedding hall. Ordering the festive drop again this Eid, no question." },
  { name: "Komal Sheikh", city: "Islamabad", rating: 4, text: "Formal gown fit perfectly true to size. The box, the ribbon, the note inside — it felt like a proper occasion opening it." },
  { name: "Nida Yousuf", city: "Lahore", rating: 5, text: "Three seasons in and not one piece has pilled or faded. Worth every rupee of the investment." },
  { name: "Hafsa Malik", city: "Multan", rating: 5, text: "WhatsApp order was easier than any website checkout I've used. Had my Sana Zardozi set in four days." },
  { name: "Rabia Chaudhry", city: "Karachi", rating: 4, text: "Chikankari work is genuinely hand done, you can tell from the back of the fabric. Rare to find at this quality now." },
];

const CURRENCY = (n) => `Rs. ${n.toLocaleString("en-PK")}`;

function useLuxuryFonts() {
  useEffect(() => {
    const l1 = document.createElement("link");
    l1.rel = "preconnect";
    l1.href = "https://fonts.googleapis.com";
    const l2 = document.createElement("link");
    l2.rel = "stylesheet";
    l2.href = "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;0,6..96,600;0,6..96,700;1,6..96,400&family=Jost:wght@300;400;500;600&display=swap";
    document.head.appendChild(l1);
    document.head.appendChild(l2);
    return () => { document.head.removeChild(l1); document.head.removeChild(l2); };
  }, []);
}

/* ------------------------- Small parts ------------------------- */
const Label = ({ children, light }) => (
  <p className="text-[10px] tracking-[0.32em] uppercase font-medium mb-3" style={{ color: GOLD }}>{children}</p>
);

function StarRow({ rating, size = 12 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} size={size} className={s <= Math.round(rating) ? "fill-current" : "opacity-20"} style={{ color: GOLD }} />
      ))}
    </div>
  );
}

/* ------------------------- Product Card ------------------------- */
function ProductCard({ p, onQuickView, onOpen, wishlist, toggleWishlist, addToCart }) {
  const inWishlist = wishlist.includes(p.id);
  return (
    <div className="group relative">
      <div className="relative overflow-hidden cursor-pointer bg-[#0a0a0a]" style={{ aspectRatio: "3/4" }} onClick={() => onOpen(p)}>
        <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-0" loading="lazy" />
        <img src={p.img2} alt="" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
        {p.original && (
          <span className="absolute top-0 left-0 text-[10px] tracking-[0.2em] uppercase text-black px-3 py-1.5" style={{ background: GOLD }}>Sale</span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(p.id); }}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="Toggle wishlist"
        >
          <Heart size={14} className={inWishlist ? "fill-current" : ""} style={{ color: inWishlist ? GOLD : "#fff" }} />
        </button>

        <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
          <button
            onClick={(e) => { e.stopPropagation(); onQuickView(p); }}
            className="flex-1 flex items-center justify-center gap-1.5 bg-black/80 border border-white/30 text-white text-[10px] tracking-[0.15em] uppercase py-2.5 hover:border-[#B8935F] transition-colors"
          >
            <Eye size={12} /> Quick View
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); addToCart(p); }}
            className="flex-1 flex items-center justify-center gap-1.5 text-black text-[10px] tracking-[0.15em] uppercase py-2.5"
            style={{ background: GOLD }}
          >
            <ShoppingBag size={12} /> Add
          </button>
        </div>
      </div>
      <div className="pt-4">
        <p className="text-[10px] tracking-[0.2em] uppercase mb-1.5 opacity-50">{p.collection}</p>
        <h3 onClick={() => onOpen(p)} className="text-[16px] leading-snug cursor-pointer" style={{ fontFamily: "'Bodoni Moda', serif" }}>{p.name}</h3>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-[14px]" style={{ color: GOLD }}>{CURRENCY(p.price)}</span>
          {p.original && <span className="text-[12px] line-through opacity-40">{CURRENCY(p.original)}</span>}
        </div>
        <div className="mt-1.5"><StarRow rating={p.rating} /></div>
      </div>
    </div>
  );
}

/* ------------------------- App ------------------------- */
export default function App() {
  useLuxuryFonts();
  const [view, setView] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [quickView, setQuickView] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishOpen, setWishOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCollection, setActiveCollection] = useState("All");
  const [toast, setToast] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { const t = setTimeout(() => setLoaded(true), 150); return () => clearTimeout(t); }, []);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(""), 2200); return () => clearTimeout(t); }, [toast]);
  useEffect(() => { window.scrollTo(0, 0); }, [view]);

  const addToCart = (p, size = "M") => {
    setCart((c) => {
      const existing = c.find((i) => i.id === p.id && i.size === size);
      if (existing) return c.map((i) => (i === existing ? { ...i, qty: i.qty + 1 } : i));
      return [...c, { ...p, qty: 1, size }];
    });
    setToast(`${p.name} added to bag`);
  };
  const removeFromCart = (id, size) => setCart((c) => c.filter((i) => !(i.id === id && i.size === size)));
  const updateQty = (id, size, delta) => setCart((c) => c.map((i) => (i.id === id && i.size === size ? { ...i, qty: Math.max(1, i.qty + delta) } : i)));
  const toggleWishlist = (id) => setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
  const openProduct = (p) => { setSelectedProduct(p); setQuickView(null); setView("product"); window.scrollTo(0, 0); };

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => (activeCollection === "All" ? true : p.collection === activeCollection));
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.collection.toLowerCase().includes(q));
    }
    return list;
  }, [activeCollection, query]);

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "Jost, sans-serif" }}>
      <style>{`
        .serif { font-family: 'Bodoni Moda', serif; }
        ::selection { background: ${GOLD}; color: #000; }
        @keyframes riseIn { from { opacity:0; transform: translateY(28px);} to { opacity:1; transform:translateY(0);} }
        @keyframes widen { from { opacity:0; letter-spacing: .55em; } to { opacity:1; letter-spacing: .32em; } }
        @keyframes fade { from { opacity:0 } to { opacity:1 } }
        @keyframes lineGrow { from { width: 0 } to { width: 64px } }
        .r1 { animation: riseIn 1s cubic-bezier(.16,1,.3,1) both; animation-delay:.1s; }
        .r2 { animation: riseIn 1s cubic-bezier(.16,1,.3,1) both; animation-delay:.35s; }
        .r3 { animation: riseIn 1s cubic-bezier(.16,1,.3,1) both; animation-delay:.6s; }
        .w1 { animation: widen 1.3s cubic-bezier(.16,1,.3,1) both; }
        .fadein { animation: fade .8s ease both; }
        .line-grow { animation: lineGrow 1s ease .5s both; }
        .no-scrollbar::-webkit-scrollbar{display:none}
        .no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}
        @media (prefers-reduced-motion: reduce) { .r1,.r2,.r3,.w1,.fadein,.line-grow{animation:none!important} }
      `}</style>

      <Navbar cartCount={cartCount} wishCount={wishlist.length} setCartOpen={setCartOpen} setWishOpen={setWishOpen} setSearchOpen={setSearchOpen} menuOpen={menuOpen} setMenuOpen={setMenuOpen} setView={setView} view={view} setActiveCollection={setActiveCollection} />

      {view === "home" && (
        <>
          <Hero loaded={loaded} />
          <MarqueeStrip />
          <CollectionsSection setActiveCollection={setActiveCollection} setView={setView} />
          <AboutSection />
          <ShopSection products={filtered} activeCollection={activeCollection} setActiveCollection={setActiveCollection} onQuickView={setQuickView} onOpen={openProduct} wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} />
          <ReviewsSection />
          <InstagramSection />
          <NewsletterBand />
        </>
      )}

      {view === "product" && selectedProduct && (
        <ProductPage product={selectedProduct} setView={setView} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist}
          related={PRODUCTS.filter((p) => p.collection === selectedProduct.collection && p.id !== selectedProduct.id).slice(0, 4)}
          onOpen={openProduct} />
      )}

      <Footer />

      {quickView && <QuickViewModal product={quickView} onClose={() => setQuickView(null)} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} onOpenFull={openProduct} />}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} removeFromCart={removeFromCart} updateQty={updateQty} total={cartTotal} />
      <WishlistDrawer open={wishOpen} onClose={() => setWishOpen(false)} wishlist={wishlist} products={PRODUCTS} toggleWishlist={toggleWishlist} addToCart={addToCart} onOpen={openProduct} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} query={query} setQuery={setQuery} results={PRODUCTS.filter((p) => query && p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 6)} onOpen={(p) => { setSearchOpen(false); openProduct(p); }} />

      <a href="https://wa.me/923000000000?text=Hi%20MINAAR%20Luxe%2C%20I%27d%20like%20to%20place%20an%20order" target="_blank" rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-black/40 hover:scale-105 transition-transform" aria-label="Order on WhatsApp">
        <MessageCircle size={26} className="text-white" fill="white" />
      </a>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 text-[13px] tracking-wide bg-white text-black fadein">{toast}</div>
      )}
    </div>
  );
}

/* ------------------------- Navbar ------------------------- */
function Navbar({ cartCount, wishCount, setCartOpen, setWishOpen, setSearchOpen, menuOpen, setMenuOpen, setView, view, setActiveCollection }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const solid = scrolled || view !== "home";
  const go = (name) => { setActiveCollection(name); setView("home"); setTimeout(() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }), 50); };
  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${solid ? "bg-black/95 backdrop-blur border-b border-white/10" : "bg-transparent"}`}>
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 h-[70px] flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button className="md:hidden" onClick={() => setMenuOpen(true)} aria-label="Menu"><Menu size={22} /></button>
          <button onClick={() => setView("home")} className="serif text-[21px] tracking-[0.05em] font-medium">
            MINAAR <span style={{ color: GOLD }} className="italic font-normal">Luxe</span>
          </button>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-[11px] tracking-[0.18em] uppercase text-white/70">
          <button onClick={() => go("Luxury Pret")} className="hover:text-white transition-colors">Luxury Pret</button>
          <button onClick={() => go("Formal Wear")} className="hover:text-white transition-colors">Formal Wear</button>
          <button onClick={() => go("Festive Collection")} className="hover:text-white transition-colors">Festive</button>
          <button onClick={() => go("New Arrivals")} className="hover:text-white transition-colors">New Arrivals</button>
          <a href="#about" className="hover:text-white transition-colors">About</a>
        </nav>

        <div className="flex items-center gap-4 md:gap-5">
          <button onClick={() => setSearchOpen(true)} aria-label="Search" className="hover:opacity-70 transition-opacity"><Search size={17} /></button>
          <button onClick={() => setWishOpen(true)} aria-label="Wishlist" className="relative hover:opacity-70 transition-opacity">
            <Heart size={17} />
            {wishCount > 0 && <span className="absolute -top-2 -right-2 text-[9px] w-4 h-4 rounded-full text-black flex items-center justify-center" style={{ background: GOLD }}>{wishCount}</span>}
          </button>
          <button onClick={() => setCartOpen(true)} aria-label="Bag" className="relative hover:opacity-70 transition-opacity">
            <ShoppingBag size={17} />
            {cartCount > 0 && <span className="absolute -top-2 -right-2 text-[9px] w-4 h-4 rounded-full text-black flex items-center justify-center" style={{ background: GOLD }}>{cartCount}</span>}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black fadein">
          <div className="flex items-center justify-between px-5 h-[70px] border-b border-white/10">
            <span className="serif text-[21px]">MINAAR <span style={{ color: GOLD }} className="italic">Luxe</span></span>
            <button onClick={() => setMenuOpen(false)}><X size={22} /></button>
          </div>
          <nav className="flex flex-col gap-7 px-8 pt-10 serif text-[24px]">
            {["Luxury Pret", "Formal Wear", "Festive Collection", "New Arrivals"].map((c) => (
              <button key={c} className="text-left" onClick={() => { go(c); setMenuOpen(false); }}>{c}</button>
            ))}
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ------------------------- Hero ------------------------- */
function Hero({ loaded }) {
  return (
    <section className="relative h-[100svh] min-h-[600px] overflow-hidden">
      <img src={IMG.hero} alt="MINAAR Luxe campaign" className="absolute inset-0 w-full h-full object-cover object-[75%_15%]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      <div className="relative z-10 h-full max-w-[1440px] mx-auto px-5 md:px-10 flex flex-col justify-end pb-20 md:justify-center md:pb-0">
        {loaded && (
          <div className="max-w-xl">
            <p className="w1 text-[11px] uppercase mb-6" style={{ color: GOLD }}>Est. Lahore &nbsp;—&nbsp; Pakistan</p>
            <h1 className="r1 serif text-[15vw] leading-[0.92] sm:text-[64px] md:text-[84px] mb-2">Wear<br /><span className="italic font-normal">the</span> Occasion</h1>
            <div className="r2 flex items-center gap-4 my-6">
              <span className="line-grow h-px block" style={{ background: GOLD }} />
              <p className="text-white/60 text-[13px] max-w-[220px] leading-relaxed">Hand-finished ready-to-wear, formal and festive pieces made in limited numbers.</p>
            </div>
            <div className="r3 flex flex-wrap gap-4">
              <a href="#shop" className="bg-white text-black px-8 py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-[#B8935F] transition-colors duration-400">Shop the Edit</a>
              <a href="#about" className="border border-white/40 px-8 py-4 text-[11px] tracking-[0.2em] uppercase hover:border-white transition-colors duration-400">Our Story</a>
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-8 right-6 md:right-10 text-white/40 text-[10px] tracking-[0.25em] uppercase hidden sm:block">
        Autumn — Winter 26
      </div>
    </section>
  );
}

/* ------------------------- Marquee ------------------------- */
function MarqueeStrip() {
  const items = ["Luxury Pret", "Formal Wear", "Festive Collection", "New Arrivals", "Handcrafted in Lahore", "Nationwide Delivery"];
  const row = [...items, ...items, ...items];
  return (
    <div className="border-y border-white/10 bg-black py-4 overflow-hidden">
      <div className="flex gap-10 whitespace-nowrap animate-[scrollX_28s_linear_infinite]" style={{ width: "max-content" }}>
        <style>{`@keyframes scrollX { from { transform: translateX(0);} to { transform: translateX(-33.333%);} }`}</style>
        {row.map((t, i) => (
          <span key={i} className="text-[12px] tracking-[0.2em] uppercase text-white/40 flex items-center gap-10">
            {t} <span style={{ color: GOLD }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------- Collections (alternating full-bleed) ------------------------- */
function CollectionsSection({ setActiveCollection, setView }) {
  const go = (name) => { setActiveCollection(name); setView("home"); setTimeout(() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }), 50); };
  return (
    <section className="bg-black">
      {COLLECTIONS.map((c, i) => (
        <div key={c.name} className={`flex flex-col md:flex-row ${i % 2 === 1 ? "md:flex-row-reverse" : ""} border-b border-white/10`}>
          <div className="w-full md:w-1/2 overflow-hidden" style={{ aspectRatio: "16/11" }}>
            <img src={c.img} alt={c.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1400ms]" />
          </div>
          <div className="w-full md:w-1/2 flex items-center px-6 md:px-16 py-14 md:py-0">
            <div className="max-w-sm">
              <p className="text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: GOLD }}>Collection 0{i + 1}</p>
              <h3 className="serif text-[36px] md:text-[46px] leading-[1.05] mb-4">{c.name}</h3>
              <p className="text-white/50 text-[14px] leading-relaxed mb-3">{c.tag}</p>
              <p className="text-white/40 text-[13px] leading-relaxed mb-8">{c.note}</p>
              <button onClick={() => go(c.name)} className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase border-b pb-1 hover:gap-3 transition-all" style={{ borderColor: GOLD, color: GOLD }}>
                Explore <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ------------------------- About ------------------------- */
function AboutSection() {
  return (
    <section id="about" className="px-5 md:px-10 py-24 md:py-32 bg-[#070707]">
      <div className="max-w-[1440px] mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="relative">
          <img src={IMG.about} alt="About MINAAR Luxe" className="w-full object-cover" style={{ aspectRatio: "4/5" }} />
          <img src={IMG.aboutDetail} alt="Atelier detail" className="hidden md:block absolute -bottom-10 -left-10 w-[42%] object-cover border-8 border-[#070707]" style={{ aspectRatio: "3/4" }} />
        </div>
        <div className="md:pl-6">
          <Label>About MINAAR Luxe</Label>
          <h2 className="serif text-[32px] md:text-[44px] leading-[1.1] mb-7">Pakistani craft,<br /><span className="italic">worn worldwide</span></h2>
          <p className="text-white/55 text-[15px] leading-relaxed mb-5 max-w-md">
            MINAAR Luxe was founded in Lahore on a simple belief: that Pakistani craftsmanship — chikankari, zardozi, gota, hand embroidery — deserves the same reverence given to Paris and Milan.
          </p>
          <p className="text-white/55 text-[15px] leading-relaxed mb-9 max-w-md">
            Every piece is designed in-house and finished by artisans who have spent decades perfecting a single stitch. We release in small, numbered runs — never mass-produced, never repeated once retired.
          </p>
          <div className="grid grid-cols-3 gap-6 max-w-sm border-t border-white/10 pt-8">
            {[["12+", "Years of Craft"], ["40K+", "Women Dressed"], ["100%", "Hand Finished"]].map(([n, l]) => (
              <div key={l}>
                <p className="serif text-[26px]" style={{ color: GOLD }}>{n}</p>
                <p className="text-[11px] text-white/40 uppercase tracking-wide mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------- Shop ------------------------- */
function ShopSection({ products, activeCollection, setActiveCollection, onQuickView, onOpen, wishlist, toggleWishlist, addToCart }) {
  const collections = ["All", ...COLLECTIONS.map((c) => c.name)];
  return (
    <section id="shop" className="px-5 md:px-10 py-24 md:py-32 bg-black">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <Label>Shop the Edit</Label>
            <h2 className="serif text-[32px] md:text-[44px]">Pieces worth the occasion</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {collections.map((c) => (
              <button key={c} onClick={() => setActiveCollection(c)}
                className="px-4 py-2 text-[10px] tracking-[0.15em] uppercase border transition-colors"
                style={activeCollection === c ? { background: "#fff", color: "#000", borderColor: "#fff" } : { borderColor: "rgba(255,255,255,.2)", color: "rgba(255,255,255,.55)" }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12">
          {products.slice(0, 12).map((p) => (
            <ProductCard key={p.id} p={p} onQuickView={onQuickView} onOpen={onOpen} wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} />
          ))}
        </div>
        {products.length === 0 && <p className="text-center py-20 text-[14px] opacity-50">No pieces match your search just yet.</p>}
      </div>
    </section>
  );
}

/* ------------------------- Reviews (carousel) ------------------------- */
function ReviewsSection() {
  const scRef = useRef(null);
  const scroll = (dir) => scRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  return (
    <section className="px-5 md:px-10 py-24 md:py-32 bg-[#070707] border-y border-white/10">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
          <div>
            <Label>In Their Words</Label>
            <h2 className="serif text-[32px] md:text-[44px]">Trusted across Pakistan</h2>
          </div>
          <div className="flex gap-3">
            <button onClick={() => scroll(-1)} className="w-10 h-10 flex items-center justify-center border border-white/20 hover:border-[#B8935F] transition-colors"><ChevronLeft size={16} /></button>
            <button onClick={() => scroll(1)} className="w-10 h-10 flex items-center justify-center border border-white/20 hover:border-[#B8935F] transition-colors"><ChevronRight size={16} /></button>
          </div>
        </div>
        <div ref={scRef} className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2">
          {REVIEWS.map((r) => (
            <div key={r.name} className="min-w-[300px] md:min-w-[360px] snap-start border border-white/10 p-8 bg-black/40">
              <Quote size={22} style={{ color: GOLD }} className="mb-5" />
              <p className="text-white/70 text-[14px] leading-relaxed mb-6 min-h-[96px]">{r.text}</p>
              <StarRow rating={r.rating} size={13} />
              <p className="text-[13px] font-medium mt-4">{r.name}</p>
              <p className="text-[12px] text-white/40">{r.city}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------- Instagram ------------------------- */
function InstagramSection() {
  const imgs = [PRODUCT_IMAGES[4], PRODUCT_IMAGES[8], PRODUCT_IMAGES[12], PRODUCT_IMAGES[16], PRODUCT_IMAGES[0], PRODUCT_IMAGES[19]];
  return (
    <section className="py-24 md:py-32 bg-black">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 flex items-end justify-between mb-10 flex-wrap gap-4">
        <div>
          <Label>@minaarluxe</Label>
          <h2 className="serif text-[32px] md:text-[44px]">Follow the house</h2>
        </div>
        <a href="#" onClick={(e) => e.preventDefault()} className="text-[11px] tracking-[0.2em] uppercase flex items-center gap-2" style={{ color: GOLD }}>Visit Instagram <ArrowUpRight size={14} /></a>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6">
        {imgs.map((src, i) => (
          <a key={i} href="#" onClick={(e) => e.preventDefault()} className="group relative overflow-hidden block" style={{ aspectRatio: "1/1" }}>
            <img src={src} alt="Instagram post" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-400 flex items-center justify-center">
              <Instagram size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ------------------------- Newsletter ------------------------- */
function NewsletterBand() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  return (
    <section className="px-5 md:px-10 py-20 border-t border-white/10 bg-[#070707]">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="serif text-[28px] md:text-[36px] mb-3">Be first to the next drop</h2>
        <p className="text-white/50 text-[13px] mb-8">Join our list for early access to New Arrivals and festive releases.</p>
        {!joined ? (
          <form onSubmit={(e) => { e.preventDefault(); if (email) setJoined(true); }} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="Your email address"
              className="flex-1 bg-transparent border border-white/25 px-5 py-3.5 text-[13px] placeholder:text-white/35 focus:outline-none focus:border-[#B8935F]" />
            <button type="submit" className="px-7 py-3.5 text-[11px] tracking-[0.18em] uppercase text-black" style={{ background: GOLD }}>Subscribe</button>
          </form>
        ) : (
          <p className="text-[14px] italic" style={{ color: GOLD }}>You're on the list — welcome to MINAAR Luxe.</p>
        )}
      </div>
    </section>
  );
}

/* ------------------------- Footer ------------------------- */
function Footer() {
  return (
    <footer className="px-5 md:px-10 pt-20 pb-8 bg-black border-t border-white/10">
      <div className="max-w-[1440px] mx-auto grid md:grid-cols-5 gap-10 pb-14">
        <div className="md:col-span-2">
          <span className="serif text-[23px]">MINAAR <span style={{ color: GOLD }} className="italic">Luxe</span></span>
          <p className="text-[13px] mt-4 max-w-xs leading-relaxed text-white/45">A Lahore-born luxury house crafting limited-run pret, formal and festive wear for the modern Pakistani woman.</p>
          <div className="flex gap-4 mt-6">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a key={i} href="#" onClick={(e) => e.preventDefault()} className="w-9 h-9 flex items-center justify-center border border-white/15 hover:border-[#B8935F] transition-colors">
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
        <FooterCol title="Shop" items={["Luxury Pret", "Formal Wear", "Festive Collection", "New Arrivals"]} />
        <FooterCol title="Support" items={["Contact Us", "Shipping", "Returns & Exchanges", "FAQs"]} />
        <FooterCol title="Legal" items={["Privacy Policy", "Terms of Service", "Size Guide"]} />
      </div>
      <div className="max-w-[1440px] mx-auto pt-8 flex flex-col md:flex-row gap-4 justify-between items-center border-t border-white/10">
        <p className="text-[12px] text-white/35">© 2026 MINAAR Luxe. All rights reserved.</p>
        <div className="flex gap-6 text-[12px] text-white/35 flex-wrap justify-center">
          <span className="flex items-center gap-1.5"><Mail size={13} /> concierge@minaarluxe.com</span>
          <span className="flex items-center gap-1.5"><Phone size={13} /> +92 300 0000000</span>
          <span className="flex items-center gap-1.5"><MapPin size={13} /> Lahore, Pakistan</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }) {
  return (
    <div>
      <h4 className="text-[11px] tracking-[0.18em] uppercase mb-5" style={{ color: GOLD }}>{title}</h4>
      <ul className="space-y-3">
        {items.map((i) => (
          <li key={i}><a href="#" onClick={(e) => e.preventDefault()} className="text-[13px] text-white/50 hover:text-white transition-colors">{i}</a></li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------- Quick View ------------------------- */
function QuickViewModal({ product, onClose, addToCart, wishlist, toggleWishlist, onOpenFull }) {
  const [size, setSize] = useState("M");
  const inWishlist = wishlist.includes(product.id);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-black/75 fadein" onClick={onClose} />
      <div className="relative z-10 w-full max-w-3xl grid md:grid-cols-2 gap-0 max-h-[88vh] overflow-y-auto bg-[#0c0c0c] text-white border border-white/10">
        <button onClick={onClose} className="absolute top-4 right-4 z-10"><X size={20} /></button>
        <img src={product.img} alt={product.name} className="w-full h-64 md:h-full object-cover" />
        <div className="p-7 md:p-9">
          <p className="text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: GOLD }}>{product.collection}</p>
          <h3 className="serif text-[26px] mb-3">{product.name}</h3>
          <StarRow rating={product.rating} />
          <div className="flex items-center gap-3 mt-3 mb-5">
            <span className="text-[18px]" style={{ color: GOLD }}>{CURRENCY(product.price)}</span>
            {product.original && <span className="text-[14px] line-through opacity-40">{CURRENCY(product.original)}</span>}
          </div>
          <p className="text-[13px] leading-relaxed mb-6 text-white/55">{product.desc}</p>
          <p className="text-[11px] tracking-[0.15em] uppercase mb-2 text-white/50">Size</p>
          <div className="flex gap-2 mb-7">
            {["XS", "S", "M", "L", "XL"].map((s) => (
              <button key={s} onClick={() => setSize(s)} className="w-10 h-10 text-[12px] border" style={size === s ? { background: GOLD, borderColor: GOLD, color: "#000" } : { borderColor: "rgba(255,255,255,.2)" }}>{s}</button>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => addToCart(product, size)} className="flex-1 py-3.5 text-[12px] tracking-[0.15em] uppercase bg-white text-black hover:bg-[#B8935F] transition-colors">Add to Bag</button>
            <button onClick={() => toggleWishlist(product.id)} className="w-12 flex items-center justify-center border border-white/20">
              <Heart size={17} className={inWishlist ? "fill-current" : ""} style={{ color: inWishlist ? GOLD : "#fff" }} />
            </button>
          </div>
          <button onClick={() => onOpenFull(product)} className="mt-5 text-[12px] tracking-[0.15em] uppercase flex items-center gap-1.5" style={{ color: GOLD }}>
            View Full Details <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------- Drawers ------------------------- */
function Drawer({ open, onClose, title, children }) {
  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}>
      <div onClick={onClose} className={`absolute inset-0 bg-black/70 transition-opacity duration-400 ${open ? "opacity-100" : "opacity-0"}`} />
      <div className={`absolute top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] text-white border-l border-white/10 transition-transform duration-500 ease-out flex flex-col ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between px-6 h-[70px] border-b border-white/10">
          <h3 className="serif text-[19px]">{title}</h3>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

function CartDrawer({ open, onClose, cart, removeFromCart, updateQty, total }) {
  return (
    <Drawer open={open} onClose={onClose} title={`Your Bag (${cart.reduce((s, i) => s + i.qty, 0)})`}>
      {cart.length === 0 ? (
        <div className="p-10 text-center text-[14px] text-white/40">Your bag is empty.</div>
      ) : (
        <div className="p-6 space-y-6">
          {cart.map((i) => (
            <div key={i.id + i.size} className="flex gap-4">
              <img src={i.img} alt={i.name} className="w-20 h-24 object-cover" />
              <div className="flex-1">
                <p className="serif text-[15px]">{i.name}</p>
                <p className="text-[11px] text-white/40 mb-2">Size {i.size}</p>
                <p className="text-[13px] mb-2" style={{ color: GOLD }}>{CURRENCY(i.price)}</p>
                <div className="flex items-center gap-3">
                  <button onClick={() => updateQty(i.id, i.size, -1)} className="w-6 h-6 flex items-center justify-center border border-white/20"><Minus size={11} /></button>
                  <span className="text-[12px]">{i.qty}</span>
                  <button onClick={() => updateQty(i.id, i.size, 1)} className="w-6 h-6 flex items-center justify-center border border-white/20"><Plus size={11} /></button>
                  <button onClick={() => removeFromCart(i.id, i.size)} className="ml-auto text-[11px] text-white/40 hover:text-white">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <div className="p-6 border-t border-white/10">
          <div className="flex justify-between text-[14px] mb-4"><span>Subtotal</span><span style={{ color: GOLD }}>{CURRENCY(total)}</span></div>
          <button className="w-full py-4 text-[12px] tracking-[0.18em] uppercase bg-white text-black hover:bg-[#B8935F] transition-colors">Secure Checkout</button>
          <p className="text-[11px] text-center mt-3 text-white/35">Shipping and taxes calculated at checkout</p>
        </div>
      )}
    </Drawer>
  );
}

function WishlistDrawer({ open, onClose, wishlist, products, toggleWishlist, addToCart, onOpen }) {
  const items = products.filter((p) => wishlist.includes(p.id));
  return (
    <Drawer open={open} onClose={onClose} title={`Wishlist (${items.length})`}>
      {items.length === 0 ? (
        <div className="p-10 text-center text-[14px] text-white/40">Save pieces you love here.</div>
      ) : (
        <div className="p-6 space-y-6">
          {items.map((p) => (
            <div key={p.id} className="flex gap-4">
              <img src={p.img} alt={p.name} className="w-20 h-24 object-cover cursor-pointer" onClick={() => onOpen(p)} />
              <div className="flex-1">
                <p className="serif text-[15px] cursor-pointer" onClick={() => onOpen(p)}>{p.name}</p>
                <p className="text-[13px] mb-3" style={{ color: GOLD }}>{CURRENCY(p.price)}</p>
                <div className="flex gap-3 text-[11px]">
                  <button onClick={() => addToCart(p)} className="uppercase tracking-wide" style={{ color: GOLD }}>Add to Bag</button>
                  <button onClick={() => toggleWishlist(p.id)} className="uppercase tracking-wide text-white/40 hover:text-white">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Drawer>
  );
}

/* ------------------------- Search ------------------------- */
function SearchOverlay({ open, onClose, query, setQuery, results, onOpen }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/75 fadein" onClick={onClose} />
      <div className="relative z-10 max-w-2xl mx-4 md:mx-auto mt-24 md:mt-32 bg-[#0c0c0c] text-white border border-white/10">
        <div className="flex items-center gap-3 px-6 h-16 border-b border-white/10">
          <Search size={18} className="opacity-50" />
          <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search pret, formal, festive…" className="flex-1 bg-transparent outline-none text-[15px]" />
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
          {query && results.length === 0 && <p className="p-8 text-[13px] text-white/40 text-center">No pieces found for "{query}".</p>}
          {results.map((p) => (
            <button key={p.id} onClick={() => onOpen(p)} className="w-full flex items-center gap-4 px-6 py-4 hover:bg-white/5 text-left border-b border-white/5">
              <img src={p.img} alt={p.name} className="w-14 h-16 object-cover" />
              <div>
                <p className="serif text-[15px]">{p.name}</p>
                <p className="text-[12px]" style={{ color: GOLD }}>{CURRENCY(p.price)}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------- Product Page ------------------------- */
function ProductPage({ product, setView, addToCart, wishlist, toggleWishlist, related, onOpen }) {
  const [size, setSize] = useState("M");
  const [activeImg, setActiveImg] = useState(0);
  const [tab, setTab] = useState("fabric");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const images = [product.img, product.img2];
  const inWishlist = wishlist.includes(product.id);

  return (
    <div className="pt-[70px] bg-black text-white">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 py-4 text-[12px] text-white/40 flex items-center gap-2">
        <button onClick={() => setView("home")} className="hover:text-white">Home</button>
        <ChevronRight size={12} /> <span>{product.collection}</span> <ChevronRight size={12} /> <span className="text-white/70">{product.name}</span>
      </div>

      <div className="max-w-[1440px] mx-auto px-5 md:px-10 grid md:grid-cols-2 gap-10 md:gap-16 pb-20">
        <div>
          <div className="overflow-hidden mb-3 bg-[#0a0a0a]" style={{ aspectRatio: "3/4" }}>
            <img src={images[activeImg]} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-125 cursor-zoom-in" />
          </div>
          <div className="flex gap-3">
            {images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)} className="w-20 h-24 overflow-hidden border-2" style={{ borderColor: activeImg === i ? GOLD : "transparent" }}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="md:pt-4">
          <p className="text-[11px] tracking-[0.2em] uppercase mb-2" style={{ color: GOLD }}>{product.collection}</p>
          <h1 className="serif text-[32px] md:text-[38px] leading-tight mb-3">{product.name}</h1>
          <div className="flex items-center gap-3 mb-5">
            <StarRow rating={product.rating} />
            <span className="text-[12px] text-white/40">{product.reviews} reviews</span>
          </div>
          <div className="flex items-center gap-3 mb-7">
            <span className="text-[22px]" style={{ color: GOLD }}>{CURRENCY(product.price)}</span>
            {product.original && <span className="text-[16px] line-through text-white/35">{CURRENCY(product.original)}</span>}
            {product.original && <span className="text-[11px] tracking-wide uppercase px-2 py-1" style={{ background: "rgba(184,147,95,.15)", color: GOLD }}>Save {Math.round((1 - product.price / product.original) * 100)}%</span>}
          </div>

          <p className="text-[14px] leading-relaxed mb-8 max-w-md text-white/55">{product.desc}</p>

          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] tracking-[0.15em] uppercase text-white/50">Select Size</p>
            <button onClick={() => setSizeGuideOpen(true)} className="text-[11px] tracking-wide uppercase flex items-center gap-1.5" style={{ color: GOLD }}>
              <Ruler size={13} /> Size Guide
            </button>
          </div>
          <div className="flex gap-2 mb-8">
            {["XS", "S", "M", "L", "XL"].map((s) => (
              <button key={s} onClick={() => setSize(s)} className="w-11 h-11 text-[13px] border" style={size === s ? { background: GOLD, borderColor: GOLD, color: "#000" } : { borderColor: "rgba(255,255,255,.2)" }}>{s}</button>
            ))}
          </div>

          <div className="flex gap-3 mb-10">
            <button onClick={() => addToCart(product, size)} className="flex-1 py-4 text-[12px] tracking-[0.18em] uppercase bg-white text-black hover:bg-[#B8935F] transition-colors">
              Add to Bag — {CURRENCY(product.price)}
            </button>
            <button onClick={() => toggleWishlist(product.id)} className="w-14 flex items-center justify-center border border-white/20">
              <Heart size={18} className={inWishlist ? "fill-current" : ""} style={{ color: inWishlist ? GOLD : "#fff" }} />
            </button>
          </div>

          <div className="border-t border-white/10">
            <div className="flex gap-8 pt-6 text-[12px] tracking-[0.12em] uppercase">
              {[["fabric", "Fabric & Care"], ["styling", "Styling Suggestions"], ["packaging", "Packaging"]].map(([k, l]) => (
                <button key={k} onClick={() => setTab(k)} className="pb-3 border-b-2" style={tab === k ? { borderColor: GOLD, color: GOLD } : { borderColor: "transparent", color: "rgba(255,255,255,.5)" }}>{l}</button>
              ))}
            </div>
            <div className="py-6 text-[14px] leading-relaxed text-white/60 max-w-md">
              {tab === "fabric" && <p>Crafted from {product.fabric}. Dry clean only. Store on a padded hanger away from direct sunlight to preserve colour and embroidery.</p>}
              {tab === "styling" && <p>Pair with statement jhumkas and a metallic clutch for evening. For day, layer under the {related[0]?.name || "Alishba Linen Co-ord"} and finish with kolhapuris.</p>}
              {tab === "packaging" && <p>Arrives in our signature black box tied with a gold grosgrain ribbon, with a hand-signed authenticity card and muslin dust bag.</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 md:px-10 py-6 border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <img src={IMG.aboutDetail} alt="Luxury packaging" className="w-full h-40 object-cover mx-auto" />
          <img src={IMG.about} alt="Craftsmanship detail" className="w-full h-40 object-cover mx-auto" />
          <img src={product.img2} alt="Detail" className="w-full h-40 object-cover mx-auto" />
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-5 md:px-10 py-20">
        <Label>You May Also Love</Label>
        <h2 className="serif text-[28px] md:text-[34px] mb-10">More from {product.collection}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
          {related.map((p) => (
            <ProductCard key={p.id} p={p} onQuickView={() => {}} onOpen={onOpen} wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} />
          ))}
        </div>
      </div>

      {sizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/75" onClick={() => setSizeGuideOpen(false)} />
          <div className="relative z-10 w-full max-w-lg p-8 bg-[#0c0c0c] text-white border border-white/10">
            <button onClick={() => setSizeGuideOpen(false)} className="absolute top-5 right-5"><X size={20} /></button>
            <h3 className="serif text-[22px] mb-6">Size Guide</h3>
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-white/10 text-left text-white/50">
                  <th className="py-2">Size</th><th>Bust (in)</th><th>Waist (in)</th><th>Hip (in)</th>
                </tr>
              </thead>
              <tbody>
                {[["XS", 32, 25, 35], ["S", 34, 27, 37], ["M", 36, 29, 39], ["L", 38, 31, 41], ["XL", 40, 33, 43]].map((row) => (
                  <tr key={row[0]} className="border-b border-white/5">
                    {row.map((c, i) => <td key={i} className="py-2.5">{c}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-[12px] text-white/40 mt-4">Measurements are approximate. For a custom fit, contact our concierge via WhatsApp.</p>
          </div>
        </div>
      )}
    </div>
  );
}
