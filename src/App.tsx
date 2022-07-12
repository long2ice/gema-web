import React, { Fragment, useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/palenight";
import { convert, getInfo } from "./api";
import { Info } from "./types";

const defaultJson = `{
  "author": "long2ice",
  "repo": "https://github.com/long2ice/gema"
}`;
const App = () => {
  const [source, setSource] = useState(defaultJson);
  const [dest, setDest] = useState("");
  const [language, setLanguage] = useState("python");
  const [destType, setDestType] = useState("pydantic");
  const [sourceType, setSourceType] = useState("json");
  const [info, setInfo] = useState<Info>();
  useEffect(() => {
    (async () => {
      let info: Info = await getInfo();
      setInfo(info);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      let data = await convert(sourceType, source, language, destType);
      setDest(data.content);
    })();
  }, [destType, language, source, sourceType]);

  const highlight = (code: string, language: Language) => (
    <Highlight {...defaultProps} theme={theme} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Fragment>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </Fragment>
      )}
    </Highlight>
  );
  const onChecked = (language: Language | "rust", destType: string) => {
    setLanguage(language);
    setDestType(destType);
  };
  return (
    <div className="min-h-screen p-5">
      <div>
        <h1>Gema</h1>
      </div>
      <div className="flex">
        <div className="basis-1/2">
          <div className="flex space-x-2 justify-center">
            {info &&
              info.source.map((s) => {
                return <div>{s}</div>;
              })}
          </div>
          <Editor
            value={source}
            onValueChange={(value) => {
              setSource(value);
            }}
            highlight={(code) => highlight(code, "json")}
            padding={10}
            style={theme.plain}
          />
        </div>
        <div className="divider divider-horizontal font-bold">{"->"}</div>
        <div className="basis-1/2">
          <div className="flex space-x-2 pb-2">
            {info !== undefined &&
              Object.entries(info.dest).map((k) => {
                return k[1].map((t) => {
                  return (
                    <div className="flex space-x-2" key={t}>
                      <div>{k[0] === t ? k[0] : `${k[0]} - ${t}`}</div>
                      <input
                        type="radio"
                        name="radio-6"
                        className="radio checked:bg-blue-500"
                        checked={k[0] === language && t === destType}
                        onClick={() => onChecked(k[0] as Language, t)}
                      />
                    </div>
                  );
                });
              })}
          </div>
          <Editor
            value={dest}
            onValueChange={(value) => setDest(value)}
            highlight={(code) => highlight(code, "python")}
            padding={10}
            className="basis-1/2"
            style={theme.plain}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
