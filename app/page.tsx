"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { VibeType } from "../components/DropDown";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import Toggle from "../components/Toggle";
import { ChatCompletionStream } from "together-ai/lib/ChatCompletionStream";
import {
  BookA,
  BookText,
  ChevronDown,
  ChevronUp,
  Copy,
  Eclipse,
  LetterText,
  RefreshCw,
  WandSparkles,
} from "lucide-react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [vibe, setVibe] = useState<VibeType>("Professional");
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState<String>("");
  const [isLlama, setIsLlama] = useState(false);

  // Nouveaux états pour les informations personnelles
  const [userName, setUserName] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userSkills, setUserSkills] = useState("");
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);

  const coverLetterRef = useRef<null | HTMLDivElement>(null);

  const scrollToCoverLetter = () => {
    if (coverLetterRef.current !== null) {
      coverLetterRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prompt = `Génère une lettre de motivation complète en français dans un style ${
    vibe === "Casual"
      ? "amical et conversationnel"
      : vibe === "Funny"
      ? "créatif et accrocheur"
      : "formel et professionnel"
  } pour l'offre d'emploi suivante. 

  Description du poste: ${jobDescription}${
    jobDescription.slice(-1) === "." ? "" : "."
  }

  Utilise les informations personnelles suivantes du candidat:
  ${userName ? `Nom: ${userName}` : ""}
  ${userAddress ? `Adresse: ${userAddress}` : ""}
  ${userPhone ? `Téléphone: ${userPhone}` : ""}
  ${userEmail ? `Email: ${userEmail}` : ""}
  ${userSkills ? `Compétences clés: ${userSkills}` : ""}

  La lettre doit être structurée avec:
  - Une en-tête avec le nom et les coordonnées
  - Une formule de politesse au début
  - Un corps présentant l'intérêt pour le poste et mettant en avant les compétences pertinentes
  - Une conclusion exprimant la disponibilité pour un entretien
  - Une formule de politesse à la fin suivie du nom

  La lettre doit être complète, formatée correctement et faire environ 300-400 mots.`;

  const generateCoverLetter = async (e: any) => {
    e.preventDefault();
    setGeneratedCoverLetter("");
    setLoading(true);

    try {
      const response = await fetch("/api/together", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          model: isLlama
            ? "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo"
            : "mistralai/Mixtral-8x7B-Instruct-v0.1",
          max_tokens: 800,
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      let fullText = "";

      const runner = ChatCompletionStream.fromReadableStream(response.body!);

      runner.on("content", (delta) => {
        fullText += delta;
        setGeneratedCoverLetter(fullText);
      });

      runner.on("finalContent", () => {
        setGeneratedCoverLetter(fullText);
        scrollToCoverLetter();
        setLoading(false);
      });

      runner.on("error", (error) => {
        console.error("Erreur lors de la génération:", error);
        toast.error(
          "Une erreur est survenue lors de la génération de la lettre"
        );
        setLoading(false);
      });
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Une erreur est survenue lors de la génération de la lettre");
      setLoading(false);
    }
  };

  return (
    <div className="flex container mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 mb-20 sm:mt-20">
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
          Générez votre lettre de motivation avec l'IA
        </h1>
        <div className="mt-7">
          <Toggle isGPT={isLlama} setIsGPT={setIsLlama} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 gap-x-20 mt-24 w-full">
          <div className="">
            <h2
              className="text-left text-xl font-bold text-slate-900 mx-auto flex items-center gap-4"
              ref={coverLetterRef}
            >
              <BookA className="w-5 h-5" />
              Votre annonce d'emploi
            </h2>
            <div className="flex items-center space-x-3 mt-8">
              {/* <LetterText className="w-5 h-5" /> */}
              <span className="flex items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white w-7 h-7">
                1
              </span>
              <p className="text-left font-medium">
                Collez l'annonce d'emploi{" "}
                <span className="text-slate-500">
                  (avec description et exigences)
                </span>
                .
              </p>
            </div>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={8}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
              placeholder={"Copiez-collez l'annonce d'emploi complète ici..."}
            />

            <div className="flex items-center space-x-3 mb-5">
              {/* <Eclipse className="w-5 h-5" /> */}
              <span className="flex items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white w-7 h-7">
                2
              </span>
              <p className="text-left font-medium">
                Sélectionnez le style de votre lettre.
              </p>
            </div>
            <div className="block mb-5">
              <DropDown vibe={vibe} setVibe={(newVibe) => setVibe(newVibe)} />
            </div>

            <div className="flex mb-5 items-center space-x-3">
              <span className="flex items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white w-7 h-7">
                3
              </span>
              <p
                className="text-left font-medium cursor-pointer flex items-center gap-2"
                onClick={() => setShowPersonalInfo(!showPersonalInfo)}
              >
                {showPersonalInfo ? "Masquer" : "Afficher"} les informations
                personnelles
                <span className="text-slate-500"> (optionnel)</span>
                {showPersonalInfo ? (
                  <ChevronUp className="w-4 h-4 text-slate-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                )}
              </p>
            </div>

            {showPersonalInfo && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-sm font-medium text-left mb-1">
                    Votre nom
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                    placeholder="Jean Dupont"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-left mb-1">
                    Votre adresse
                  </label>
                  <input
                    type="text"
                    value={userAddress}
                    onChange={(e) => setUserAddress(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                    placeholder="123 rue de Paris, 75001 Paris"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-left mb-1">
                    Votre téléphone
                  </label>
                  <input
                    type="text"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                    placeholder="06 12 34 56 78"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-left mb-1">
                    Votre email
                  </label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                    placeholder="jean.dupont@email.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-left mb-1">
                    Vos compétences clés
                  </label>
                  <textarea
                    value={userSkills}
                    onChange={(e) => setUserSkills(e.target.value)}
                    rows={3}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                    placeholder="Ex: 5 ans d'expérience en développement web, expertise en React, Node.js, gestion de projet agile..."
                  />
                </div>
              </div>
            )}

            {loading ? (
              <button
                className="rounded-xl font-medium px-4 py-2 sm:mt-8 mt-8 w-full text-green-700 border border-green-300 hover:bg-green-100 bg-green-50"
                disabled
              >
                <LoadingDots color="white" style="large" />
              </button>
            ) : (
              <button
                className="text-green-700 border-green-300 bg-green-50 border hover:bg-green-100 rounded-xl w-full flex items-center gap-4 justify-center font-medium px-4 py-2 sm:mt-10 mt-8"
                onClick={(e) => generateCoverLetter(e)}
              >
                <WandSparkles className="w-4 h-4" />
                Générer votre lettre de motivation
              </button>
            )}
          </div>
          <div>
            <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={{ duration: 2000 }}
            />
            <div className="space-y-10">
              <div className="flex justify-between items-center">
                <h2
                  className="text-left text-xl font-bold text-slate-900 flex items-center gap-4"
                  ref={coverLetterRef}
                >
                  <BookText className="w-5 h-5" />
                  Votre lettre de motivation
                </h2>
                <div className="flex gap-x-4">
                  <button
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-gray-400/20 hover:text-accent-foreground h-8 rounded-md px-3 text-xs"
                    onClick={() => {
                      if (generatedCoverLetter) {
                        navigator.clipboard.writeText(
                          generatedCoverLetter.toString()
                        );
                      }
                    }}
                  >
                    <Copy className="w-4 h-4" />
                    Copier la lettre
                  </button>

                  <button
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-gray-400/20 hover:text-accent-foreground h-8 rounded-md px-3 text-xs"
                    onClick={() => {
                      setJobDescription("");
                      setGeneratedCoverLetter("");
                    }}
                  >
                    <RefreshCw className="w-4 h-4" />
                    Réinitialiser
                  </button>
                </div>
              </div>
              <div className="space-y-8 flex flex-col items-center justify-center mx-auto">
                <div className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition border w-full min-h-80">
                  {generatedCoverLetter ? (
                    <div className="whitespace-pre-line text-left">
                      {generatedCoverLetter}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center">
                      {loading
                        ? "En cours de génération..."
                        : "Ici se mettra la lettre générée"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
