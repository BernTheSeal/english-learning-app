import { Phonetics, NormalizedWord, Meanings, Definitions } from "./dictionary.type";

const normalizeWord = (raw: unknown): NormalizedWord | null => {
  if (!Array.isArray(raw)) return null;

  const first = raw[0];

  if (typeof first !== "object" || first === null) {
    return null;
  }

  const word = first.word;

  const ACCENT_WHITELIST = ["us", "uk", "au"];
  const phonetics = Array.isArray(first.phonetics)
    ? first.phonetics
        .filter((p: Phonetics) => p.audio !== "")
        .map((p: Phonetics): Phonetics => {
          let accent = "";

          const beforeMp3 = p.audio.split(".mp3")[0];
          const lastPart = beforeMp3.split("/").pop();
          const parts = lastPart?.split("-") ?? [];

          const match = parts.find((part) => ACCENT_WHITELIST.includes(part.toLowerCase()));

          if (match) {
            accent = match.toLowerCase();
          }

          return {
            text: p.text,
            audio: p.audio,
            accent: accent,
          };
        })
    : [];

  const meanings = Array.isArray(first.meanings)
    ? first.meanings.map(
        (m: Meanings): Meanings => ({
          partOfSpeech: m.partOfSpeech ?? "",
          synonyms: m.synonyms ?? [],

          antonyms: m.antonyms ?? [],
          definitions: Array.isArray(m.definitions)
            ? m.definitions
                .map(
                  (d: Definitions): Definitions => ({
                    definition: d.definition ?? "",
                    example: d.example ?? "",
                  })
                )
                .sort((a: Definitions, b: Definitions) => {
                  const aHas = !!a.example?.trim();
                  const bHas = !!b.example?.trim();
                  return Number(bHas) - Number(aHas);
                })
            : [],
        })
      )
    : [];

  return {
    word,
    phonetics,
    meanings,
  };
};

export default { normalizeWord };
