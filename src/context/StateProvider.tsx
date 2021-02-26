import * as React from "react";
import ValidColumnNames from "types/ValidColumnNames";
import ValidOperators from "types/ValidOperators";
import stateReducer, { initialState, State } from "./StateReducer";
import {
  CLEAR_INVOICE_NUMBER_FILTER,
  CLEAR_MRR_FILTER,
  CLEAR_TERM_LENGTH_FILTER,
  SAVE_FILTER,
  SET_SELECTED_COLUMNS,
  UPDATE_FILTERED_DATA,
} from "./types";

export const StateContext = React.createContext<State>(initialState);

const StateProvider: React.FC<{ children?: React.ReactElement }> = (props) => {
  const [state, dispatch] = React.useReducer(stateReducer, initialState);

  const setSelectedColumns = (columnName: ValidColumnNames) => {
    dispatch({ type: SET_SELECTED_COLUMNS, payload: columnName });
  };
  const clearInvoiceNumberFilter = () => {
    dispatch({ type: CLEAR_INVOICE_NUMBER_FILTER });
    dispatch({ type: UPDATE_FILTERED_DATA });
  };
  const clearMRRFilter = () => {
    dispatch({ type: CLEAR_MRR_FILTER });
    dispatch({ type: UPDATE_FILTERED_DATA });
  };
  const clearTermLengthFilter = () => {
    dispatch({ type: CLEAR_TERM_LENGTH_FILTER });
    dispatch({ type: UPDATE_FILTERED_DATA });
  };
  const saveFilter = (
    type: "mrr" | "termLength" | "invoiceNumber",
    operand: number,
    operator: ValidOperators,
  ) => {
    dispatch({ type: SAVE_FILTER, payload: { type, operand, operator } });
    dispatch({ type: UPDATE_FILTERED_DATA });
  };

  return (
    <StateContext.Provider
      value={{
        selectedColumns: state.selectedColumns,
        tableData: state.tableData,
        filter: state.filter,
        filteredData: state.filteredData,
        setSelectedColumns: setSelectedColumns,
        clearInvoiceNumberFilter: clearInvoiceNumberFilter,
        clearMRRFilter: clearMRRFilter,
        clearTermLengthFilter: clearTermLengthFilter,
        saveFilter: saveFilter,
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
};

export default StateProvider;
