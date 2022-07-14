type Language = "python" | "go" | "rust" | "typescript";

interface Info {
  source: string[];
  dest: Record<Language, Array<string>>;
}

interface LanguageProps {
  language: Language;
}

export type { Info, Language, LanguageProps };
