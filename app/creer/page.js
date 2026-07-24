"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function CreerArticle() {
  const [titre, setTitre] = useState("");
  const [contenu, setContenu] = useState("");
  const [image, setImage] = useState("")
  const [erreur, setErreur] = useState("");
  const [envoiEnCours, setEnvoiEnCours] = useState(false);

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!titre.trim() || !contenu.trim()) {
      setErreur("Le titre et le contenu sont obligatoires.");
      return;
    }

    setEnvoiEnCours(true);
    setErreur("");

    try {
      const res = await fetch(`${API_URL}/api/articles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titre, contenu, image: image }),
      });

      if (!res.ok) throw new Error("Erreur lors de la création");

      router.push("/");
    } catch (err) {
      setErreur("Impossible de créer l'article.");
    } finally {
      setEnvoiEnCours(false);
    }
  }

  return (
    <div className="py-16">
      <button
        onClick={() => router.push("/")}
        className="text-sm text-neutral-500 mb-10 hover:text-black transition"
      >
        ← Tous les articles
      </button>

      <h1 className="text-4xl font-bold tracking-tight mb-10">Nouvel article</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Titre"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          className="text-2xl font-semibold border-b border-neutral-200 pb-3 focus:outline-none focus:border-black transition"
        />

        <input
          type="url"
          placeholder="URL de l'image de couverture (optionnel)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="text-sm border border-neutral-200 rounded-lg p-3 focus:outline-none focus:border-black transition"
        />

        {image && (
          <img
            src={image}
            alt="Aperçu"
            className="w-full h-56 object-cover rounded-lg border border-neutral-200"
            onError={(e) => (e.target.style.display = "none")}
          />
        )}

        <textarea
          placeholder="Écris ton article ici.."
          value={contenu}
          onChange={(e) => setContenu(e.target.value)}
          rows={8}
          className="text-lg leading-relaxed border border-neutral-200 rounded-lg p-4 focus:outline-none focus:border-black transition"
        />

        {erreur && <p className="text-red-600">{erreur}</p>}

        <button
          type="submit"
          disabled={envoiEnCours}
          className="self-start bg-black text-white text-sm px-6 py-3 rounded-full disabled:opacity-50 hover:bg-neutral-800 transition"
        >
          {envoiEnCours ? "Envoi..." : "Publier"}
        </button>
      </form>
    </div>
  );
}