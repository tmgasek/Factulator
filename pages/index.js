import Head from 'next/head';
import { useEffect, useReducer, useState } from 'react';
import calcReducer from '../reducers/calcReducer';
import { ACTIONS } from '../actions';
import DigitBtn from '../components/DigitBtn';
import OperationBtn from '../components/OperationBtn';
import { formatOperand } from '../reducers/calcReducer';

export default function Home() {
  const [{ currOperand, prevOperand, operation }, dispatch] = useReducer(
    calcReducer,
    {}
  );

  const [fact, setFact] = useState(null);

  useEffect(() => {
    console.log(currOperand);
    if (currOperand && !isNaN(currOperand)) {
      fetch(`http://numbersapi.com/${parseInt(currOperand)}?json`)
        .then((res) => res.json())
        .then((data) => setFact(data.text));
    } else {
      setFact('...');
    }
  }, [currOperand]);
  return (
    <div className="min-h-screen bg-blue-200">
      <Head>
        <title>Factulator | A calculator with facts!</title>
      </Head>
      <div className=" flex flex-col items-center md:flex-row md:justify-around">
        {/* <div className="grid md:grid-cols-calcColXL md:grid-rows-calcRowXL m-5 gap-5 max-w-2xl bg-gray-100"> */}
        <div className="grid grid-cols-calcColSm grid-rows-calcRowSm md:grid-cols-calcColXL md:grid-rows-calcRowXL m-5 gap-5 bg-gray-100 p-10 shadow-xl rounded-lg">
          <div className=" col-span-full flex flex-col items-end justify-around px-2 flex-wrap break-all bg-gray-700 rounded-xl text-gray-100">
            <div className="text-xl">
              {formatOperand(prevOperand)} {operation}
            </div>
            <div className="text-3xl">{formatOperand(currOperand)}</div>
          </div>
          <button
            className="col-span-3 rounded-xl bg-pink-100 shadow-lg hover:border-2 hover:border-gray-500 focus:outline-none"
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
            className="bg-pink-100 rounded-xl shadow-lg hover:border-2 hover:border-gray-500 focus:outline-none"
            onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
          >
            {'<-'}
          </button>
          <button
            className="bg-pink-100 rounded-xl shadow-lg hover:border-2 hover:border-gray-500 focus:outline-none"
            onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
          >
            =
          </button>
        </div>
        <div className="bg-red-100 md:w-1/3 w-auto m-4 ">{fact}</div>
      </div>
    </div>
  );
}
