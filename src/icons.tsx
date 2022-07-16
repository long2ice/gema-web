import { LanguageProps, SourceTypeProps } from "./types";
import { IoLogoPython } from "react-icons/io";
import { FaRust } from "react-icons/fa";
import { SiGoland, SiTypescript } from "react-icons/si";
import JsonIcon from "./icons/json.svg";
import XmlIcon from "./icons/xml.svg";
import TomlIcon from "./icons/toml.svg";
import YamlIcon from "./icons/yaml.svg";

function LanguageIcons(props: LanguageProps) {
  switch (props.language) {
    case "python":
      return <IoLogoPython />;
    case "go":
      return <SiGoland />;
    case "rust":
      return <FaRust />;
    case "typescript":
      return <SiTypescript />;
  }
}

function SourceTypeIcons(props: SourceTypeProps) {
  switch (props.sourceType) {
    case "json":
      return <img src={JsonIcon} width={20} alt="json" />;
    case "toml":
      return <img src={TomlIcon} width={20} alt="toml" />;
    case "xml":
      return <img src={XmlIcon} width={20} alt="xml" />;
    case "yaml":
      return <img src={YamlIcon} width={20} alt="yaml" />;
  }
}

export { LanguageIcons, SourceTypeIcons };
