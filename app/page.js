"use client"

import { useState, useEffect } from "react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://serene-taiga-33855-7e5b7eb08215.herokuapp.com";

export default function HomePage() {
  const [articles, setArticles] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/articles`)
    .then((res) => {
      if (!res.ok) throw new Error("Erreur lors du chargement");
      return res.json();
    })
    .then((data) => {
      setArticles(data);
      setChargement(false);
    })
    .catch(() => {
      setErreur("Impossible de charger les articles du blog");
      setErreur(false);
    });
  }, []);

  return (
    <div className="py-16">
      <header className="mb-16 border-b border-neutral-200 pb-10">
        <h1 className="text-5xl font-bold tracking-tight mb-3">DBLOG.</h1>
        <p className="text-neutral-500 text-lg">
          Notes sur mon apprentissage en développement web.
        </p>
        <Link
          href="/creer"
          className="inline-block mt-6 bg-black text-white text-sm px-4 py-2 rounded-full hover:bg-neutral-800 transition">
           + Nouvel article
          </Link>
      </header>

      {chargement && <p className="text-neutral-400">Chargement...</p>}
      {erreur && <p className="text-red-600">{erreur}</p>}

      {!chargement && !erreur && articles.length === 0 && (
        <p className="text-neutral-400">Aucun article pour l'instant.</p>
      )}

      <div className="flex flex-col divide-y divide-neutral-200">
        {articles.map((article) => (
          <Link
            key={article.id || article._id}
            href={`/articles/${article.id || article._id}`}
            className="group py-8 flex gap-6">
            {article.image && (
              <img
                src={article.image}
                alt={article.titre}
                className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
              />
            )}
            <div>
            <p className="text-sm text-neutral-400 mb-2">
            {new Date(article.date_creation).toLocaleDateString("fr-CA", {
               year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <h2 className="text-2xl font-semibold group-hover:underline decoration-1 underline-offset-4">
              {article.titre}
            </h2>
            <p className="text-neutral-500 mt-2 line-clamp-2">{article.contenu}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );}