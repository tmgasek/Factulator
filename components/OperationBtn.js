import { ACTIONS } from '../actions';

export default function OperationBtn({ operation, dispatch }) {
  return (
    <button
      className="bg-tertiary rounded-xl shadow-lg border-1 border-primary hover:border-2 hover:border-gray-500 focus:outline-none"
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      {operation}
    </button>
  );
}
