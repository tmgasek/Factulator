import { ACTIONS } from '../actions';

export default function DigitBtn({ digit, dispatch }) {
  return (
    <button
      className="bg-accent2 rounded-full shadow-lg hover:border-2 hover:border-gray-500 focus:outline-none"
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
}
