import Filter from "types/Filter";
import ValidColumnNames from "types/ValidColumnNames";

const isValidConfigImport = (config: {
  filter: Filter;
  selectedColumns: ValidColumnNames[];
}): boolean => {
  if (!config.filter || !config.selectedColumns) {
    return false;
  }
  if (
    !config.filter.mrr ||
    !config.filter.invoiceNumber ||
    !config.filter.termLength ||
    Object.keys(config.filter).length !== 3
  ) {
    return false;
  }
  return Object.values(config.filter).every(
    (e) =>
      (e.operator === null ||
        e.operator === ">" ||
        e.operator === "!=" ||
        e.operator === "<" ||
        e.operator === "==") &&
      (e.operand === null || typeof Number(e.operand) === "number"),
  );
};

export default isValidConfigImport;
