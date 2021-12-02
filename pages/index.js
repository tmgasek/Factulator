import Head from 'next/head';
import { useReducer } from 'react';
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
  return (
    <>
      <Head>
        <title>Factulator | A calculator with facts!</title>
      </Head>
      <div className="flex">
        <div className="grid grid-cols-4 grid-rows-auto m-5 gap-5 w-72 bg-gray-100">
          <div className="col-span-full flex flex-col items-end justify-around p-1 flex-wrap break-all h-16 bg-gray-400">
            <div className="text-xs">
              {formatOperand(prevOperand)} {operation}
            </div>
            <div>{formatOperand(currOperand)}</div>
          </div>
          <button
            className="col-span-3"
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
          <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
            {'<-'}
          </button>
          <button onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>
            =
          </button>
        </div>
        <div></div>
      </div>
    </>
  );
}
