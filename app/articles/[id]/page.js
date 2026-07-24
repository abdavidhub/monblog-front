"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ArticleDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [article, setArticle] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [suppressionEnCours, setSuppressionEnCours] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/articles/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Article introuvable");
        return res.json();
      })
      .then((data) => {
        setArticle(data);
        setChargement(false);
      })
      .catch(() => setChargement(false));
  }, [id]);

  async function handleDelete() {
    const confirme = window.confirm("Supprimer cet article definitivement ?");
    if (!confirme) return;

    setSuppressionEnCours(true);
    try {
      await fetch(`${API_URL}/api/articles/${id}`, { method: "DELETE" });
      router.push("/");
    } catch (err) {
      alert("Erreur lors de la suppression.");
      setSuppressionEnCours(false);
    }
  }

  if (chargement) return <p className="py-16 text-neutral-400">Chargement...</p>;
  if (!article) return <p className="py-16 text-neutral-400">Article introuvable.</p>;

  return (
    <article className="py-16">
      <div className="flex justify-between items-center mb-10">
        <button
          onClick={() => router.push("/")}
          className="text-sm text-neutral-500 hover:text-black transition"
        >
          Retour
        </button>

        <button
          onClick={handleDelete}
          disabled={suppressionEnCours}
          className="text-sm text-red-600 hover:text-red-800 transition disabled:opacity-50"
        >
          {suppressionEnCours ? "Suppression..." : "Supprimer"}
        </button>
      </div>

      <h1 className="text-4xl font-bold tracking-tight mb-3">{article.titre}</h1>
      <p className="text-neutral-400 mb-10">
        {new Date(article.date_creation).toLocaleDateString("fr-CA", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      {(article.image_url || article.image) && (
        <img
          src={article.image_url || article.image}
          alt={article.titre}
          className="w-full h-80 object-cover rounded-xl mb-10"
        />
      )}

      <div className="prose prose-neutral max-w-none">
        <p className="whitespace-pre-line leading-relaxed text-lg text-neutral-800">
          {article.contenu}
        </p>
      </div>
    </article>
  );
}
