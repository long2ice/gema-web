import { Language } from "prism-react-renderer";

interface Info {
  source: string[];
  dest: Record<Language | "rust", Array<string>>;
}

export type { Info };
