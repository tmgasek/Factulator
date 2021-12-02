import { ACTIONS } from '../actions';

export default function calcReducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      //after hitting equals, next input will start anew
      if (state.evalDone) {
        return {
          ...state,
          currOperand: payload.digit,
          evalDone: false,
        };
      }
      if (payload.digit === '0' && state.currOperand == '0') {
        return state;
      }

      //optional chaining to prevent error upon entering "." on empty calc.
      if (payload.digit === '.' && state.currOperand?.includes('.')) {
        return state;
      }
      return {
        ...state,
        currOperand: `${state.currOperand || ''}${payload.digit}`, //the || "" is to neutralise the default undefined.
      };

    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currOperand === '-') {
        return state;
      }

      if (payload.operation === '-' && !state.currOperand) {
        return {
          ...state,
          currOperand: '-',
        };
      }

      if (!state.currOperand && !state.prevOperand) {
        return state;
      }
      //if we have a previous operand but not current operand, add operation
      if (!state.currOperand) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      //if we have a current operand but not previous, then we want to switch them and add operation.
      if (!state.prevOperand) {
        return {
          ...state,
          prevOperand: state.currOperand,
          currOperand: null,
          operation: payload.operation,
        };
      }
      //if we have both operands and operator then we can perform evaluation
      return {
        ...state,
        prevOperand: evaluate(state),
        operation: payload.operation,
        currOperand: null,
      };

    case ACTIONS.DELETE_DIGIT:
      //after hitting equals, next delete will empty operand.
      if (state.evalDone)
        return {
          ...state,
          evalDone: false,
          currOperand: null,
        };
      if (!state.currOperand) return state;
      if (state.currOperand.length === 1) {
        return { ...state, currOperand: null };
      }
      return {
        ...state,
        currOperand: state.currOperand.slice(0, -1),
      };

    case ACTIONS.EVALUATE:
      if (!state.operation || !state.currOperand || !state.prevOperand) {
        return state;
      }
      return {
        ...state,
        evalDone: true,
        prevOperand: null,
        currOperand: evaluate(state),
        operation: null,
      };

    default:
      return state;
  }
}

function evaluate({ currOperand, prevOperand, operation }) {
  const prev = parseFloat(prevOperand);
  const curr = parseFloat(currOperand);
  if (isNaN(prev) || isNaN(curr)) return '';
  let computation = '';

  switch (operation) {
    case '+':
      computation = prev + curr;
      break;
    case '-':
      computation = prev - curr;
      break;
    case '/':
      computation = prev / curr;
      break;
    case '*':
      computation = prev * curr;
      break;
    default:
      return '';
  }

  return computation.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat('eng-GB', {
  maximumFractionDigits: 0,
});

export function formatOperand(operand) {
  if (!operand) return null;
  if (operand == '-') return '-';
  const [integer, decimal] = operand.split('.');
  if (!decimal) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}
