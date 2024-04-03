import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import type { UseDisclosureReturn } from "@nextui-org/use-disclosure";

interface AlertDialogProps {
  disclosure: UseDisclosureReturn;
  handleDeleteAccount: () => void;
}

export default function AlertDialog({
  disclosure,
  handleDeleteAccount,
}: AlertDialogProps) {
  const { isOpen, onOpenChange } = disclosure;

  return (
    <>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="lg"
        classNames={{
          base: "p-10 py-6 border-8 border-danger/50 bg-background/90 text-foreground",
          backdrop: "bg-danger/10 backdrop-opacity-40",
          header: "text-danger",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center gap-1">
                Account Deletion
              </ModalHeader>
              <ModalBody>
                This action cannot be undone. This will permanently delete your
                account and remove all your data from our servers.
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  className="text-danger-500 shadow-lg shadow-indigo-500/20 hover:bg-danger/50 hover:text-foreground"
                  onPress={handleDeleteAccount}
                >
                  Delete Account
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
