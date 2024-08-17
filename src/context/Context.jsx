import { createContext, useState, useRef } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const inputRef = useRef(null);

  const delayPara = (text, index) => {
    setTimeout(() => {
      setResultData((prev) => prev + text);
    }, 15 * index);
  };

  const onSet = async (prompt) => {
    setLoading(true);
    setShowResult(true);
    setInput("");

    let newResponse = "";
    let response;

    try {
      response = await run(prompt);
      let responseArray = response.split("**");
      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newResponse += responseArray[i];
        } else {
          newResponse += "<b>" + responseArray[i] + "</b>";
        }
      }
      let newResponse2 = newResponse.split("*").join("</br>");

      let newResponseArray = newResponse2.split("");
      setResultData("");
      newResponseArray.forEach((char, i) => delayPara(char, i));

      setRecentPrompt(prompt);
      setPrevPrompts((prev) => [...prev, prompt]);
    } catch (error) {
      console.error("Error in running Gemini API:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setInput("");
    setShowResult(false);
    inputRef.current.focus(); // Set focus to the input field
  };

  const contextValue = {
    onSet,
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompts,
    setPrevPrompts,
    showResult,
    loading,
    resultData,
    handleNewChat,
    inputRef, // Provide inputRef in the context
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
