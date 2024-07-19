"use client";

import { useEffect, useState } from 'react';
import { endpoints } from "../settings/endpoints";
import { TWords } from "../types/TWords";
import Navbar from "./components/Navbar";
import SearchButton from "./components/SearchButton";
import "./globals.css";
import { toast } from 'react-toastify';

export default function Home() {
  const [word, setWord] = useState('');
  const [wordNounData, setWordNounData] = useState<Array<any>>([]);
  const [response, setResponse] = useState(false);
  const [paragraphColor, setParagraphColor] = useState('');

  const [busquedaReciente, setBusquedaReciente] = useState<Array<string>>(() => {
    const savedSearches = sessionStorage.getItem('busquedas');
    return savedSearches ? JSON.parse(savedSearches) : [];
  });

  const searchByWord = async (word: TWords) => {
    try {
      const response = await fetch(endpoints.word_endpoint.replace("%word", word));
      const data = await response.json();

      if (data.length > 0) {
        setResponse(true);
      }

      const dataWord = [];
      dataWord.push(data[0])
      setWordNounData(dataWord);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    if (word.trim() !== '') {
      console.log(word);
    }
  }, [word])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
  }

  const sendRequest = () => {
    if (word.trim() === '') {
      toast.error("El campo de texto está vacío. No se puede enviar la solicitud.");
      return;
    }

    searchByWord(word);
    const updatedBusquedaReciente = [...busquedaReciente, word].slice(-3);
    setBusquedaReciente(updatedBusquedaReciente);
    sessionStorage.setItem('busquedas', JSON.stringify(updatedBusquedaReciente));
    setWord('');
  }

  const findLatestSearches = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonText = (event.target as HTMLButtonElement).textContent;
    if (buttonText) {
      searchByWord(buttonText as TWords);
    }
  }

  const speakWord = (text: string) => {
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      toast.error("La síntesis de voz no está soportada en este navegador.");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24" id="main">
      <Navbar setParagraphColor={setParagraphColor} />

      <div className="search">
        <form className="flex items-center max-w-sm mx-auto">
          <div className="relative w-full inpt">
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search word..."
              required
              value={word}
              onChange={handleInputChange} />
          </div>
          <SearchButton onClick={sendRequest} />
        </form>
      </div>

      <div className='latest'>
        <h3 className=''>Busquedas recientes:</h3>
        <div className='latest-searches'>
          {(() => {
            return busquedaReciente.map((re, index) => {
              return <>
                <button className='searches' key={index} id={re} name={re} onClick={findLatestSearches}>{re}</button>
              </>
            })
          })()}
        </div>
      </div>

      <div className= {(!response ? "definitions-none" : "word-find")}>
        <div className="word">
          <h1 style={{ color: paragraphColor }}>{wordNounData[0]?.word}</h1>
          <h2>{wordNounData[0]?.phonetic}</h2>
        </div>
        <div className="speach">
          <button
            onClick={() => speakWord(wordNounData[0]?.word || '')}
            className="text-to-speech-button"
          >
          </button>
        </div>
      </div>

      <div className={(!response ? "definitions-none" : "definitions")}>
        <div className="noun" style={{ color: paragraphColor }}>
          <div className="title"><h2>noun</h2></div>
          <br />
          <div className="meanings">
            <h3 >Meanings</h3>
            <ul className="defini">
              {(() => {
                return wordNounData[0]?.meanings[0]?.definitions.map((def: any, index: number) => {
                  return <>
                    <div className='def-punt' key={index}>
                      <div className='puntito'></div>
                      <li className="def">{def.definition}</li>
                    </div>
                  </>
                });
              })()}
            </ul>
          </div>
          <div className="synonyms">
            <h3 style={{ color: paragraphColor }}>Synonyms</h3>
            <ul className="defini">
              {(() => {
                return wordNounData[0]?.meanings[0]?.synonyms.map((syn: string, index: number) => {
                  return <>
                    <li className="def" key={index}>{syn}</li>
                  </>
                });
              })()}
            </ul>
          </div>
        </div>

        <br />

        <div className="verb" style={{ color: paragraphColor }}>
          <div className="title"><h2>verb</h2></div>
          <br />
          <div className="meanings">
            <h3>Meanings</h3>
            <ul className="defini">
              {(() => {
                return wordNounData[0]?.meanings[1]?.definitions.map((def: any, index: number) => {
                  return <>
                    <div className='def-punt-verb' key={index}>
                      <div className='def-punt'>
                        <div className='puntito'></div>
                        <li className="def" key={index}>{def?.definition}</li>
                      </div>
                      <p className="example" style={{ paddingLeft: '2.6rem' }}>{def?.example}</p>
                    </div>
                  </>
                });
              })()}
            </ul>
          </div>
          <br />
          <div className="synonyms">
            <h3>Synonyms</h3>
            <ul className="defini">
              {(() => {
                return wordNounData[0]?.meanings[1]?.synonyms.map((syn: string, index: number) => {
                  return <>
                    <li className="def" key={index}>{syn}</li>
                  </>
                });
              })()}
            </ul>
          </div>

          <div className="sourse">
            <h3>Sourse</h3>
            <ul className="defini">
              {(() => {
                return wordNounData[0]?.sourceUrls.map((sou: string, index: number) => {
                  return <>
                    <a className="def" href={sou} key={index}>{sou}</a>
                  </>
                });
              })()}
            </ul>
          </div>
        </div>
      </div>

    </main>
  );
}
