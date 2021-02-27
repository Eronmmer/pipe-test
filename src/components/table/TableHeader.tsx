import * as React from "react";
import { HStack, Button, Text, useDisclosure } from "@chakra-ui/react";
import { ExportModal, ImportModal } from "components/Modals";
import { StateContext } from "context/StateProvider";

const TableHeader: React.FC = () => {
  const { filter, selectedColumns } = React.useContext(StateContext);
  const {
    isOpen: isExportOpen,
    onOpen: onExportOpen,
    onClose: onExportClose,
  } = useDisclosure();
  const {
    isOpen: isImportOpen,
    onOpen: onImportOpen,
    onClose: onImportClose,
  } = useDisclosure();

  return (
    <HStack px="1rem" shadow="md" py=".7rem" justify="space-between">
      <Text fontSize="lg" fontWeight="medium">
        Subscriptions List
      </Text>
      <HStack>
        <Button onClick={onImportOpen} variant="outline" mr="1rem">
          Import
        </Button>
        <Button onClick={onExportOpen} variant="outline">
          Export
        </Button>
      </HStack>
      <ExportModal
        data={JSON.stringify({ filter, selectedColumns })}
        isExportOpen={isExportOpen}
        onExportClose={onExportClose}
      />
      <ImportModal isImportOpen={isImportOpen} onImportClose={onImportClose} />
    </HStack>
  );
};

export default TableHeader;
