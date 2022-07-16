type Language = "python" | "go" | "rust" | "typescript";
type SourceType = "json" | "toml" | "xml" | "yaml";

interface Info {
  source: string[];
  dest: Record<Language, Array<string>>;
}

interface LanguageProps {
  language: Language;
}

interface SourceTypeProps {
  sourceType: SourceType;
}

export type { Info, Language, LanguageProps, SourceTypeProps, SourceType };
