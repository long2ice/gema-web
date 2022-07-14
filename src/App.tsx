import React, { useEffect, useRef, useState } from "react";
import { convert, getInfo } from "./api";
import { Info, Language } from "./types";
import Editor from "@monaco-editor/react";
import { BsTrash, BsUpload } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { BiCopy } from "react-icons/bi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosRefresh } from "react-icons/io";
import defaultValues from "./constants";
import LanguageIcons from "./icons";
import localforage from "localforage";

const App = () => {
  const [language, setLanguage] = useState("python");
  const [destType, setDestType] = useState("pydantic");
  const [sourceType, setSourceType] = useState("json");
  const [dest, setDest] = useState<string | undefined>("");
  const [source, setSource] = useState<string | undefined>(
    defaultValues[sourceType]
  );
  const [info, setInfo] = useState<Info>();
  const inputRef = useRef(null);
  const editorOptions = {
    minimap: {
      enabled: false,
    },
    fontSize: 15,
  };
  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    // @ts-ignore
    reader.readAsText(e.target.files[0], "UTF-8");
    reader.onload = (e) => {
      setSource(e.target?.result as string);
    };
  };
  useEffect(() => {
    localforage.getItem("language").then((v) => {
      if (v !== null) {
        setLanguage(v as string);
      }
    });
    localforage.getItem("destType").then((v) => {
      if (v !== null) {
        setDestType(v as string);
      }
    });
    localforage.getItem("sourceType").then((v) => {
      if (v !== null) {
        setSourceType(v as string);
      }
    });
    (async () => {
      let info: Info = await getInfo();
      setInfo(info);
    })();
  }, []);
  useEffect(() => {
    localforage.setItem("language", language).then();
    localforage.setItem("sourceType", sourceType).then();
    localforage.setItem("destType", destType).then();
    (async () => {
      let data = await convert(sourceType, source ?? "", language, destType);
      setDest(data.content);
    })();
  }, [destType, language, source, sourceType]);

  return (
    <div className="min-h-screen">
      <div className="flex bg-blue-600 py-2 px-4">
        <div className="text-xl text-white font-bold">Gema</div>
        <div className="ml-auto pt-1">
          <a
            href="https://github.com/long2ice/gema-web"
            target="_blank"
            rel="noreferrer"
          >
            <img
              alt="GitHub Repo stars"
              src="https://img.shields.io/github/stars/long2ice/gema-web?style=social"
            />
          </a>
        </div>
      </div>
      <div className="flex">
        <div className="w-[12%]">
          <ul className="menu">
            <li className="border-b">
              <select
                onChange={(e) => {
                  let value = e.target.value.toLowerCase();
                  setSourceType(value);
                  setSource(defaultValues[value]);
                }}
              >
                {info?.source.map((item) => {
                  return (
                    <option key={item}>
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </option>
                  );
                })}
              </select>
            </li>
            {info &&
              Object.entries(info.dest).map((k) => {
                return k[1].map((type) => {
                  return (
                    <li
                      key={`${k[0]} - ${type}`}
                      className={
                        type === destType && k[0] === language ? "bordered" : ""
                      }
                      onClick={() => {
                        setLanguage(k[0]);
                        setDestType(type);
                      }}
                    >
                      <div className="capitalize">
                        <LanguageIcons language={k[0] as Language} />
                        {type === k[0] ? type : `${k[0]} - ${type}`}
                      </div>
                    </li>
                  );
                });
              })}
          </ul>
        </div>
        <div className="flex grow border-l">
          <div className="basis-1/2">
            <div className="flex p-2 border-b">
              <div className="grow capitalize font-bold">{sourceType}</div>
              <div className="flex gap-1">
                <button
                  className="btn btn-outline gap-2 btn-xs rounded"
                  onClick={() => {
                    toast("😘 Coming soon!");
                  }}
                >
                  <FiSettings />
                  Settings
                </button>
                <button
                  className="btn btn-outline btn-xs rounded"
                  onClick={() => {
                    // @ts-ignore
                    inputRef.current.click();
                  }}
                >
                  <input
                    className="hidden"
                    ref={inputRef}
                    type="file"
                    onChange={uploadFile}
                  />
                  <BsUpload />
                </button>
                <button
                  className="btn btn-outline btn-xs rounded"
                  onClick={() => setSource(defaultValues[sourceType])}
                >
                  <IoIosRefresh />
                </button>
                <button
                  className="btn btn-outline btn-xs rounded"
                  onClick={() => setSource("")}
                >
                  <BsTrash />
                </button>
              </div>
            </div>
            <Editor
              height="90vh"
              value={source}
              onChange={(value, e) => {
                setSource(value);
              }}
              language={sourceType}
              options={editorOptions}
            />
          </div>
          <div className="basis-1/2 border-l">
            <div className="flex p-2 border-b">
              <div className="grow capitalize font-bold">
                {language === destType ? language : `${language} - ${destType}`}
              </div>
              <CopyToClipboard
                text={dest ?? ""}
                onCopy={() => {
                  toast("😄 Copied to clipboard!");
                }}
              >
                <div>
                  <button className="btn btn-outline gap-2 btn-xs rounded">
                    <BiCopy />
                    Copy
                  </button>
                  <ToastContainer position="top-center" autoClose={3000} />
                </div>
              </CopyToClipboard>
            </div>
            <Editor
              height="90vh"
              options={editorOptions}
              value={dest}
              onChange={(value, _) => {
                setDest(value);
              }}
              language={language}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
