import { ACTIONS } from '../actions';

export default function DigitBtn({ digit, dispatch }) {
  return (
    <button
      className="bg-pink-300"
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
}
