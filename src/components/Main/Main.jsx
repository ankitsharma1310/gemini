import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

const Main = () => {
  const {
    onSet,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const handleSend = () => {
    if (input.trim() !== "") {
      onSet(input);
    }
  };

  const handleCardClick = (text) => {
    setInput(text); // Set the input field with the card text
    onSet(text); // Trigger the search with the card text
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="User Icon" className="user-icon" />
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Ankit</span>
              </p>
              <p>How can I help you today?</p>
            </div>

            <div className="cards">
              <Card
                text="Suggest beautiful places to see on an upcoming road trip"
                icon={assets.compass_icon}
                altText="Compass Icon"
                onClick={() =>
                  handleCardClick(
                    "Suggest beautiful places to see on an upcoming road trip"
                  )
                }
              />
              <Card
                text="Briefly summarize this concept: urban planning"
                icon={assets.bulb_icon}
                altText="Light Bulb Icon"
                onClick={() =>
                  handleCardClick(
                    "Briefly summarize this concept: urban planning"
                  )
                }
              />
              <Card
                text="Brainstorm team bonding activities for our work retreat"
                icon={assets.message_icon}
                altText="Message Icon"
                onClick={() =>
                  handleCardClick(
                    "Brainstorm team bonding activities for our work retreat"
                  )
                }
              />
              <Card
                text="Improve the readability of the following code"
                icon={assets.code_icon}
                altText="Code Icon"
                onClick={() =>
                  handleCardClick(
                    "Improve the readability of the following code"
                  )
                }
              />
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img
                src={assets.user_icon}
                alt="User Icon"
                className="result-icon"
              />
              <p className="user-prompt">{recentPrompt}</p>
            </div>
            {loading ? (
              <div className="loader">
                <hr />
                <hr />
                <hr />
              </div>
            ) : (
              <div className="gemini-response">
                <img
                  src={assets.gemini_icon}
                  alt="Gemini Icon"
                  className="gemini-icon"
                />
                <p
                  className="gemini-text"
                  dangerouslySetInnerHTML={{ __html: resultData }}
                />
              </div>
            )}
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <img src={assets.gallery_icon} alt="Gallery Icon" />
            <img src={assets.mic_icon} alt="Mic Icon" />
            <img src={assets.send_icon} alt="Send Icon" onClick={handleSend} />
          </div>

          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps.
          </p>
        </div>
      </div>
    </div>
  );
};

const Card = ({ text, icon, altText, onClick }) => (
  <div className="card" onClick={onClick}>
    <p>{text}</p>
    <img src={icon} alt={altText} />
  </div>
);

export default Main;
