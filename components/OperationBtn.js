import { ACTIONS } from '../actions';

export default function OperationBtn({ operation, dispatch }) {
  return (
    <button
      className="bg-pink-100 rounded-xl shadow-lg hover:border-2 hover:border-gray-500 focus:outline-none"
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      {operation}
    </button>
  );
}
