import * as React from "react";
import { useToasts } from "react-toast-notifications";
import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  NumberInput,
  ModalFooter,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
  Select,
  Button,
  useClipboard,
  Textarea,
} from "@chakra-ui/react";
import ValidOperators from "types/ValidOperators";
import { StateContext } from "context/StateProvider";
import camelToTextCase from "utils/camelToTextCase";
import isValidConfigImport from "utils/isValidConfigImport";

interface ModalProps {
  type: "mrr" | "termLength" | "invoiceNumber";
  isTermLengthOpen?: boolean;
  onTermLengthClose?: () => void;
  isMRROpen?: boolean | undefined;
  onMRRClose?: () => void;
  isInvoiceNumberOpen?: boolean | undefined;
  onInvoiceNumberClose?: () => void;
}

export const FilterModal: React.FC<ModalProps> = (props) => {
  const {
    isTermLengthOpen,
    isMRROpen,
    onMRRClose,
    isInvoiceNumberOpen,
    onInvoiceNumberClose,
    onTermLengthClose,
    type,
  } = props;

  const {
    saveFilter,
    clearTermLengthFilter,
    clearMRRFilter,
    clearInvoiceNumberFilter,
  } = React.useContext(StateContext);

  const [currentOperator, setCurrentOperator] = React.useState<ValidOperators>(
    ">",
  );
  const [currentOperand, setCurrentOperand] = React.useState<number>(0);

  const handleSaveFilter = () => {
    saveFilter(type, currentOperand, currentOperator);
    if (type === "mrr") {
      onMRRClose && onMRRClose();
    } else if (type === "invoiceNumber") {
      onInvoiceNumberClose && onInvoiceNumberClose();
    } else {
      onTermLengthClose && onTermLengthClose();
    }
  };
  const handleClearFilter = () => {
    if (type === "mrr") {
      clearMRRFilter && clearMRRFilter();
      onMRRClose && onMRRClose();
    } else if (type === "invoiceNumber") {
      clearInvoiceNumberFilter && clearInvoiceNumberFilter();
      onInvoiceNumberClose && onInvoiceNumberClose();
    } else {
      clearTermLengthFilter && clearTermLengthFilter();
      onTermLengthClose && onTermLengthClose();
    }
  };

  return (
    <Modal
      isCentered
      // @ts-ignore
      isOpen={
        type === "mrr"
          ? isMRROpen
          : type === "invoiceNumber"
          ? isInvoiceNumberOpen
          : isTermLengthOpen
      }
      // @ts-ignore
      onClose={
        type === "mrr"
          ? onMRRClose
          : type === "invoiceNumber"
          ? onInvoiceNumberClose
          : onTermLengthClose
      }
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Filter for {type === "mrr" ? "MRR" : camelToTextCase(type)}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack justify="space-between">
            <Select
              required
              value={currentOperator}
              // @ts-ignore
              onChange={(e) => setCurrentOperator(e.target.value)}
              placeholder="Select an operator"
            >
              <option value=">">&#62;</option>
              <option value="<">&#60;</option>
              <option value="==">==</option>
              <option value="!=">!=</option>
            </Select>
            <NumberInput
              value={currentOperand}
              // @ts-ignore
              onChange={(value) => setCurrentOperand(value)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </HStack>
          <HStack my="2rem">
            <Button onClick={handleSaveFilter} colorScheme="orange" mr="1rem">
              Save
            </Button>
            <Button onClick={handleClearFilter} variant="outline">
              Clear
            </Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export const ExportModal: React.FC<{
  isExportOpen: boolean;
  onExportClose: () => void;
  data: string;
}> = ({ isExportOpen, onExportClose, data }) => {
  const { hasCopied, onCopy } = useClipboard(data);

  return (
    <Modal isOpen={isExportOpen} onClose={onExportClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Export Table Config</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{data}</ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onExportClose}>
            Close
          </Button>
          <Button onClick={onCopy} variant="outline">
            {hasCopied ? "Copied" : "Copy config to clipboard"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export const ImportModal: React.FC<{
  isImportOpen: boolean;
  onImportClose: () => void;
}> = ({ isImportOpen, onImportClose }) => {
  const { importConfig } = React.useContext(StateContext);
  const [value, setValue] = React.useState("");
  const { addToast } = useToasts();

  const handleImport = () => {
    try {
      const parsedConfig = JSON.parse(value);
      const validConfig = isValidConfigImport(parsedConfig);
      if (validConfig) {
        importConfig(parsedConfig);
      } else {
        addToast("Wrong Config Format", { appearance: "error" });
      }
    } catch (err) {
      addToast("Wrong Config Format", { appearance: "error" });
      console.log("fuckkkk");
    }
    onImportClose();
  };
  return (
    <Modal isOpen={isImportOpen} onClose={onImportClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>JSON Import</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Textarea
            height="11rem"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Here is a sample placeholder"
            size="sm"
          />

          <HStack my="2rem">
            <Button onClick={handleImport} colorScheme="orange" mr="1rem">
              Import
            </Button>
            <Button onClick={() => setValue("")} variant="outline">
              Clear
            </Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
