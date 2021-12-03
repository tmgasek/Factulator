import Head from 'next/head';
import { useEffect, useReducer, useState } from 'react';
import calcReducer from '../reducers/calcReducer';
import { ACTIONS } from '../actions';
import DigitBtn from '../components/DigitBtn';
import OperationBtn from '../components/OperationBtn';
import { formatOperand } from '../reducers/calcReducer';
import { searchWiki } from '../services';
import WikiBox from '../components/WikiBox';

export default function Home() {
  const [{ currOperand, prevOperand, operation }, dispatch] = useReducer(
    calcReducer,
    {}
  );

  const [wikiTitles, setWikiTitles] = useState(null);
  const [wikiLinks, setWikiLinks] = useState(null);
  const [debouncedNum, setDebouncedNum] = useState(0);

  useEffect(() => {
    const queryApi = async () => {
      if (debouncedNum && !isNaN(debouncedNum)) {
        const data = await searchWiki(formatOperand(currOperand));
        console.log(data[1]);
        setWikiLinks(data[3]);
        setWikiTitles(data[1]);
      } else {
        setWikiLinks(null);
        setWikiTitles(null);
      }
    };

    // queryApi();
  }, [debouncedNum]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedNum(currOperand);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [currOperand]);

  return (
    <div className="min-h-screen bg-secondary">
      <Head>
        <title>Factulator | A calculator with facts!</title>
      </Head>
      <div className=" flex flex-col items-center md:flex-row md:justify-around">
        {/* <div className="grid md:grid-cols-calcColXL md:grid-rows-calcRowXL m-5 gap-5 max-w-2xl bg-gray-100"> */}
        <div className="grid grid-cols-calcColSm grid-rows-calcRowSm md:grid-cols-calcColXL md:grid-rows-calcRowXL m-5 gap-5 bg-accent1 p-10 shadow-xl rounded-lg">
          <div className=" col-span-full flex flex-col items-end justify-around px-2 flex-wrap break-all bg-primary rounded-xl text-accent1">
            <div className="text-xl">
              {formatOperand(prevOperand)} {operation}
            </div>
            <div className="text-3xl">{formatOperand(currOperand)}</div>
          </div>
          <button
            className="col-span-3 rounded-xl bg-tertiary shadow-lg hover:border-2 hover:border-gray-500 focus:outline-none"
            onClick={() => dispatch({ type: ACTIONS.CLEAR })}
          >
            AC
          </button>
          <OperationBtn operation="/" dispatch={dispatch} />
          <DigitBtn digit="7" dispatch={dispatch} />
          <DigitBtn digit="8" dispatch={dispatch} />
          <DigitBtn digit="9" dispatch={dispatch} />
          <OperationBtn operation="*" dispatch={dispatch} />
          <DigitBtn digit="4" dispatch={dispatch} />
          <DigitBtn digit="5" dispatch={dispatch} />
          <DigitBtn digit="6" dispatch={dispatch} />
          <OperationBtn operation="-" dispatch={dispatch} />
          <DigitBtn digit="1" dispatch={dispatch} />
          <DigitBtn digit="2" dispatch={dispatch} />
          <DigitBtn digit="3" dispatch={dispatch} />
          <OperationBtn operation="+" dispatch={dispatch} />
          <DigitBtn digit="0" dispatch={dispatch} />
          <DigitBtn digit="." dispatch={dispatch} />
          <button
            className="bg-tertiary rounded-xl shadow-lg hover:border-2 hover:border-gray-500 focus:outline-none"
            onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
          >
            {'<-'}
          </button>
          <button
            className="bg-tertiary  rounded-xl shadow-lg hover:border-2 hover:border-gray-500 focus:outline-none"
            onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
          >
            =
          </button>
        </div>
        <WikiBox
          wikiLinks={wikiLinks}
          wikiTitles={wikiTitles}
          num={currOperand}
        />
      </div>
    </div>
  );
}
