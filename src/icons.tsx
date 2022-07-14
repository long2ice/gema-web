import { LanguageProps } from "./types";
import { IoLogoPython } from "react-icons/io";
import { FaRust } from "react-icons/fa";
import { SiGoland, SiTypescript } from "react-icons/si";

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

export default LanguageIcons;
