"use client";
import React, { useState, useEffect } from "react";

type Beer = { key:string; name:string; abv:number; ibu:number; pair:string; img:string; };
const beers: Beer[] = [
  { key: "ipa", name: "IPA Chiltepina", abv: 6.2, ibu: 55, pair: "tacos al pastor, aguachile, wings", img: "https://picsum.photos/seed/ipa/800/500" },
  { key: "porter", name: "Harry Porter", abv: 5.6, ibu: 28, pair: "brownies, costillas BBQ, café", img: "https://picsum.photos/seed/porter/800/500" },
  { key: "saison", name: "Grape Saison", abv: 6.5, ibu: 25, pair: "tabla de quesos, ensaladas, pollo a la parrilla", img: "https://picsum.photos/seed/saison/800/500" },
  { key: "cream", name: "Vanilla Cream Ale", abv: 4.9, ibu: 18, pair: "fish & chips, camarones, sushi", img: "https://picsum.photos/seed/cream/800/500" },
];

function Nav(){
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#3e2723] to-[#5d4037] text-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="font-bold">Pelea de Gallos</div>
        <nav className="hidden sm:flex gap-4 font-semibold">
          <a href="#catalogo" className="hover:text-amber-300">Catálogo</a>
          <a href="#eventos" className="hover:text-amber-300">Eventos</a>
          <a href="#blog" className="hover:text-amber-300">Blog</a>
          <a href="#contacto" className="hover:text-amber-300">Contacto</a>
        </nav>
      </div>
    </header>
  );
}

function Section({ id, title, children, desc }:{id:string; title:string; children:React.ReactNode; desc?:string;}){
  return (
    <section id={id} className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#5d4037]">{title}</h2>
        {desc && <p className="mt-2 text-neutral-700">{desc}</p>}
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}

function Hero({ onOpenChat }:{ onOpenChat: ()=>void; }){
  return (
    <section className="relative h-[420px] grid place-items-center text-center text-white"
      style={{backgroundImage:'url(https://images.unsplash.com/photo-1471421298428-1513ab720a8e?q=80&w=1600&auto=format&fit=crop)', backgroundSize:'cover', backgroundPosition:'center'}}>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 px-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold drop-shadow">Cerveza artesanal con actitud</h1>
        <p className="mt-3 text-lg opacity-95">Hecha en México. Diseñada para maridar tus mejores historias.</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <a href="#catalogo" className="px-5 py-3 rounded-full bg-amber-300 text-[#3e2723] font-bold">Explora nuestras cervezas</a>
          <button onClick={onOpenChat} className="px-5 py-3 rounded-full bg-white/10 border border-white/30 hover:bg-white/20">Sommelier IA</button>
        </div>
      </div>
    </section>
  );
}

function Card({ beer }:{ beer:Beer }){
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow hover:-translate-y-1 transition">
      <img src={beer.img} alt={beer.name} className="w-full h-44 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-[#a0522d]">{beer.name}</h3>
        <p className="text-sm text-neutral-600">ABV {beer.abv}% · IBU {beer.ibu}</p>
        <p className="text-sm mt-1 text-neutral-700">Marida con {beer.pair}.</p>
        <div className="mt-3 flex gap-2">
          <button className="px-3 py-2 rounded-full bg-[#5d4037] text-white text-sm font-semibold">Ver ficha</button>
          <button className="px-3 py-2 rounded-full border text-sm">Agregar al carrito</button>
        </div>
      </div>
    </div>
  );
}

function Chat({ open, onClose }:{ open:boolean; onClose:()=>void; }){
  const [messages, setMessages] = useState<{role:"user"|"assistant"; text:string}[]>([
    { role:"assistant", text:"¡Hola! Soy el Sommelier IA. Dime qué vas a comer o el clima y te recomiendo."}
  ]);
  const [input, setInput] = useState("");
  useEffect(()=>{
    const el = document.getElementById("pg-chat");
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);
  async function send(){
    const text = input.trim();
    if (!text) return;
    setMessages(m=>[...m,{role:"user", text}]);
    setInput("");
    // Llama a la API interna (demo). Luego se cambia por OpenAI.
    const res = await fetch("/api/chat",{ method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ question: text }) });
    const data = await res.json();
    setMessages(m=>[...m,{role:"assistant", text: data.answer || "Te sugiero nuestra IPA Chiltepina."}]);
  }
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-[360px] max-w-[95vw] bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#3e2723] to-[#5d4037] text-white px-4 py-3 flex items-center justify-between">
          <strong>Sommelier IA</strong>
          <button onClick={onClose} className="text-white/90 hover:text-white text-xl leading-none">×</button>
        </div>
        <div id="pg-chat" className="h-[300px] overflow-y-auto p-3 bg-[#faf9f7]">
          {messages.map((m,i)=>(
            <div key={i} className={`my-1 max-w-[85%] px-3 py-2 rounded-xl text-[0.95rem] leading-snug ${m.role==="user"?"ml-auto bg-yellow-100 border border-yellow-200":"bg-white border border-neutral-200"}`}>
              {m.text}
            </div>
          ))}
        </div>
        <div className="flex gap-2 p-3 border-t">
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter") send();}} placeholder="Pregúntame: sushi, calor, tacos..." className="flex-1 px-3 py-2 border rounded-lg outline-none" />
          <button onClick={send} className="px-3 py-2 rounded-lg bg-[#5d4037] text-white font-semibold">Enviar</button>
        </div>
      </div>
    </div>
  );
}

export default function Page(){
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#fafafa] text-[#333]">
      <Nav />
      <Hero onOpenChat={()=>setOpen(true)} />
      <section id="catalogo" className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#5d4037]">Catálogo de Cervezas</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {beers.map(b => <Card key={b.key} beer={b} />)}
          </div>
        </div>
      </section>
      <footer className="bg-[#3e2723] text-white text-center py-6 mt-10">© 2025 Cervecería Pelea de Gallos</footer>
      <button onClick={()=>setOpen(true)} className="fixed right-5 bottom-5 w-14 h-14 rounded-full grid place-items-center shadow-2xl bg-[#5d4037] text-white text-2xl" aria-label="Abrir Sommelier IA">💬</button>
      <Chat open={open} onClose={()=>setOpen(false)} />
    </div>
  );
}
