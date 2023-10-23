"use client";
import React, { useState, useEffect, useRef } from "react";

export default function Home() {
  const [currentInput, setCurrentInput] = useState("first");
  const firstInputRef = useRef(null);
  const secondInputRef = useRef(null);
  const thirdInputRef = useRef(null);
  const fourthInputRef = useRef(null);
  const [isCardValidated, setCardValidated] = useState(false);
  const [isApiError, setApiError] = useState(false);

  const inputRefs = {
    first: firstInputRef,
    second: secondInputRef,
    third: thirdInputRef,
    fourth: fourthInputRef,
  };

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    if (value !== "") {
      const nextInput = e.target.getAttribute("data-next");
      if (nextInput) {
        setCurrentInput(nextInput);
      }
    }
  };

  useEffect(() => {
    if (inputRefs[currentInput].current) {
      inputRefs[currentInput].current.focus();
    }
  }, [currentInput]);

  const handleVerifyClick = () => {
    const code = `${firstInputRef.current.value}${secondInputRef.current.value}${thirdInputRef.current.value}${fourthInputRef.current.value}`;
    fetch("http://localhost:3001/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong');
      })
      .then((data) => {
        setCardValidated(true);
      })
      .catch((error) => {
        console.error("API call error:", error);
        setApiError(true);
      });
  };

  return (
    <main className={`card ${isCardValidated ? "card--validated" : ""}`}>
      <h1 className="card__title">Authorization CODE</h1>
      <h6 className="card__subtitle">
        Please enter the code that we sent to (***) *** - 2819.
      </h6>
      <div className="card__inputs-container">
        <input
          type="text"
          maxLength={1}
          name="first"
          id="first"
          data-next="second"
          onChange={handleInputChange}
          onFocus={() => setCurrentInput("first")}
          ref={firstInputRef}
        />
        <input
          type="text"
          maxLength={1}
          name="second"
          id="second"
          data-next="third"
          onChange={handleInputChange}
          onFocus={() => setCurrentInput("second")}
          ref={secondInputRef}
        />
        <input
          type="text"
          maxLength={1}
          name="third"
          id="third"
          data-next="fourth"
          onChange={handleInputChange}
          onFocus={() => setCurrentInput("third")}
          ref={thirdInputRef}
        />
        <input
          type="text"
          maxLength={1}
          name="fourth"
          id="fourth"
          onChange={handleInputChange}
          onFocus={() => setCurrentInput("fourth")}
          ref={fourthInputRef}
        />
      </div>

      {
        isApiError ? <p className="card__error">Something went wrong</p> : ''
      }
      
      <button
        type="button"
        className="card__button"
        onClick={handleVerifyClick}
      >
        Verify
      </button>

      <div className="card__success-container">
        <h3 className="card__title">The code is correct</h3>
        <p className="card__subtitle">
          You are going to be redirected in a moment...
        </p>
      </div>
    </main>
  );
}
