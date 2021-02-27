/* eslint-disable indent */
import {
  CLEAR_INVOICE_NUMBER_FILTER,
  CLEAR_MRR_FILTER,
  CLEAR_TERM_LENGTH_FILTER,
  SET_SELECTED_COLUMNS,
  SAVE_FILTER,
  UPDATE_FILTERED_DATA,
  IMPORT,
} from "./types";
import ValidColumnNames from "types/ValidColumnNames";
import Data from "utils/data.json";
import evaluate from "utils/evaluate";
import Filter from "types/Filter";
import ValidOperators from "types/ValidOperators";

export const initialState: State = {
  selectedColumns: [],
  tableData: Data,
  filteredData: Data,
  filter: {
    mrr: {
      operand: null,
      operator: null,
    },
    invoiceNumber: {
      operand: null,
      operator: null,
    },
    termLength: {
      operand: null,
      operator: null,
    },
  },
  setSelectedColumns: (columnName) => columnName,
  clearTermLengthFilter: () => true,
  clearMRRFilter: () => true,
  clearInvoiceNumberFilter: () => true,
  saveFilter: () => true,
  importConfig: () => true,
};

export type State = {
  selectedColumns: ValidColumnNames[];
  tableData: typeof Data;
  filteredData: typeof Data;
  filter: Filter;
  setSelectedColumns: (columnName: ValidColumnNames) => void;
  clearInvoiceNumberFilter: () => void;
  clearTermLengthFilter: () => void;
  clearMRRFilter: () => void;
  saveFilter: (
    type: "mrr" | "termLength" | "invoiceNumber",
    operand: number,
    operator: ValidOperators,
  ) => void;
  importConfig: (configData: {
    filter: Filter;
    selectedColumns: ValidColumnNames[];
  }) => void;
};

type ActionType = {
  type: string;
  payload?: any;
};

const StateReducer = (state: State, action: ActionType): State => {
  const { type, payload } = action;

  switch (type) {
    case CLEAR_INVOICE_NUMBER_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          invoiceNumber: { operand: null, operator: null },
        },
      };
    case CLEAR_MRR_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          mrr: { operand: null, operator: null },
        },
      };
    case CLEAR_TERM_LENGTH_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          termLength: { operand: null, operator: null },
        },
      };
    case SAVE_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          [payload.type]: {
            operand: payload.operand,
            operator: payload.operator,
          },
        },
      };
    case UPDATE_FILTERED_DATA:
      return {
        ...state,
        filteredData: state.tableData.filter(
          (e) =>
            evaluate(
              `${e.mrr} ${state.filter.mrr.operator || ">"} ${
                state.filter.mrr.operand
              }`,
            ) &&
            evaluate(
              `${e.invoiceNo} ${state.filter.invoiceNumber.operator || ">"} ${
                state.filter.invoiceNumber.operand
              }`,
            ) &&
            evaluate(
              `${e.termLength} ${state.filter.termLength.operator || ">"} ${
                state.filter.termLength.operand
              }`,
            ),
        ),
      };
    case SET_SELECTED_COLUMNS:
      return {
        ...state,
        selectedColumns: state.selectedColumns.includes(payload)
          ? state.selectedColumns.filter((e) => e !== payload)
          : [...state.selectedColumns, payload],
      };
    case IMPORT:
      return {
        ...state,
        filter: {
          ...state.filter,
          ...payload.filter,
        },
        selectedColumns: payload.selectedColumns,
      };
    default:
      return state;
  }
};

export default StateReducer;
