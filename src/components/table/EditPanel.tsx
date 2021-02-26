import * as React from "react";
import { Box, BoxProps, Text, HStack, useDisclosure } from "@chakra-ui/react";
import { FilterButton } from "components/Buttons";
import { FilterModal } from "components/Modals";
import ValidColumnNames from "types/ValidColumnNames";
import { StateContext } from "context/StateProvider";

const ColumnName: React.FC<BoxProps & { name: string }> = (props) => {
  return (
    <Box
      cursor="pointer"
      marginBottom=".5rem"
      padding=".5rem 1rem"
      _hover={{ backgroundColor: "#e6eaf8" }}
      {...props}
    >
      <Text>{props.name}</Text>
    </Box>
  );
};

const ColumNameWithFilter: React.FC<BoxProps> = (props) => {
  return (
    <HStack
      justify="space-between"
      cursor="pointer"
      marginBottom=".5rem"
      padding=".5rem 1rem"
      _hover={{ backgroundColor: "#e6eaf8" }}
      {...props}
    >
      {props.children}
    </HStack>
  );
};

const EditPanel: React.FC = () => {
  const { selectedColumns, setSelectedColumns } = React.useContext(
    StateContext,
  );

  const {
    isOpen: isTermLengthOpen,
    onOpen: onTermLengthOpen,
    onClose: onTermLengthClose,
  } = useDisclosure();
  const {
    isOpen: isMRROpen,
    onOpen: onMRROpen,
    onClose: onMRRClose,
  } = useDisclosure();
  const {
    isOpen: isInvoiceNumberOpen,
    onOpen: onInvoiceNumberOpen,
    onClose: onInvoiceNumberClose,
  } = useDisclosure();

  const handleAddToColumns = (columnName: ValidColumnNames) => {
    setSelectedColumns(columnName);
  };

  return (
    <Box
      minWidth="15rem"
      borderRight="1px solid #e1e1e1"
      backgroundColor="#f8f9fb"
      padding={0}
    >
      <Text padding="1rem" color="#6b8fd6" textTransform="uppercase">
        edit panel
      </Text>

      <Box marginTop=".5rem">
        <ColumnName
          onClick={() => handleAddToColumns("customerName")}
          name="Customer Name"
          backgroundColor={
            selectedColumns.includes("customerName") ? "#e6eaf8" : "none"
          }
        />
        <ColumnName
          onClick={() => handleAddToColumns("status")}
          name="Status"
          backgroundColor={
            selectedColumns.includes("status") ? "#e6eaf8" : "none"
          }
        />
        <ColumnName
          onClick={() => handleAddToColumns("syncedFrom")}
          name="Synced From"
          backgroundColor={
            selectedColumns.includes("syncedFrom") ? "#e6eaf8" : "none"
          }
        />
        <ColumnName
          onClick={() => handleAddToColumns("startDate")}
          name="Start Date"
          backgroundColor={
            selectedColumns.includes("startDate") ? "#e6eaf8" : "none"
          }
        />
        <ColumNameWithFilter
          backgroundColor={
            selectedColumns.includes("termLength") ? "#e6eaf8" : "none"
          }
          onClick={() => handleAddToColumns("termLength")}
        >
          <Text>Term Length</Text>
          <FilterButton onClick={onTermLengthOpen}>Filter</FilterButton>
        </ColumNameWithFilter>
        <ColumNameWithFilter
          backgroundColor={selectedColumns.includes("mrr") ? "#e6eaf8" : "none"}
          onClick={() => handleAddToColumns("mrr")}
        >
          <Text>MRR</Text>
          <FilterButton onClick={onMRROpen}>Filter</FilterButton>
        </ColumNameWithFilter>
        <ColumNameWithFilter
          backgroundColor={
            selectedColumns.includes("invoiceNumber") ? "#e6eaf8" : "none"
          }
          onClick={() => handleAddToColumns("invoiceNumber")}
        >
          <Text>Invoice Number</Text>
          <FilterButton onClick={onInvoiceNumberOpen}>Filter</FilterButton>
        </ColumNameWithFilter>
      </Box>

      <FilterModal
        isTermLengthOpen={isTermLengthOpen}
        onTermLengthClose={onTermLengthClose}
        type="termLength"
      />
      <FilterModal isMRROpen={isMRROpen} onMRRClose={onMRRClose} type="mrr" />
      <FilterModal
        isInvoiceNumberOpen={isInvoiceNumberOpen}
        onInvoiceNumberClose={onInvoiceNumberClose}
        type="invoiceNumber"
      />
    </Box>
  );
};

export default EditPanel;
