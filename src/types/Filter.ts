import ValidOperators from "./ValidOperators";

type FilterComponent = {
  operand: null | number;
  operator: null | ValidOperators;
};

type Filter = {
  termLength: FilterComponent;
  mrr: FilterComponent;
  invoiceNumber: FilterComponent;
};

export default Filter;
