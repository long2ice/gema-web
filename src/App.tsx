import React, { useEffect, useState } from "react";
import { convert, getInfo } from "./api";
import { Info } from "./types";
import MonacoEditor from "react-monaco-editor";
import { BsTrash, BsUpload } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";

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

  return (
    <div className="min-h-screen">
      <div className="bg-blue-600">
        <div className="text-xl py-2 pl-4 text-white font-bold">Gema</div>
      </div>
      <div className="flex">
        <div className="w-[12%]">
          <div className="p-4">Json</div>
          <ul className="menu bg-base-100 w-full">
            <li>pydantic</li>
            <li>dataclass</li>
          </ul>
        </div>
        <div className="flex grow">
          <div className="basis-1/2">
            <div className="flex p-2">
              <div className="grow">Json</div>
              <div className="flex gap-1">
                <button className="btn btn-outline gap-2 btn-xs rounded">
                  <FiSettings />
                  Settings
                </button>
                <button className="btn btn-outline btn-xs rounded">
                  <BsUpload />
                </button>
                <button className="btn btn-outline btn-xs rounded">
                  <BsTrash />
                </button>
              </div>
            </div>
            <MonacoEditor
              value={source}
              onChange={(value) => {
                setSource(value);
              }}
              language="json"
              width="100%"
              height="100%"
            />
          </div>
          <div className="basis-1/2">
            <div className="flex p-2">
              <div className="grow">Pydantic</div>
              <div className="flex gap-2">
                <button className="btn btn-outline btn-xs rounded">
                  <BsUpload />
                </button>
                <button className="btn btn-outline btn-xs rounded">
                  <BsTrash />
                </button>
              </div>
            </div>
            <MonacoEditor
              value={dest}
              onChange={(value) => setDest(value)}
              width="100%"
              height="100%"
              language={language}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
