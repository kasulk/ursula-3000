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
import { Flash, HeartIcon } from "../Icons";

interface AlertDialogProps {
  disclosure: UseDisclosureReturn;
}

export default function AlertDialog({ disclosure }: AlertDialogProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = disclosure;

  return (
    <>
      {/* <Button onPress={onOpen} color="secondary">
        Delete account & data
      </Button> */}
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="lg"
        classNames={{
          base: "p-10 border-danger bg-danger/10 text-foreground",
          backdrop: "bg-danger/10 backdrop-opacity-40",
          header: "text-danger",
        }}
        onClose={() => console.log("modal closed")}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center gap-1">
                <HeartIcon />
                Account Deletion
                <HeartIcon />
              </ModalHeader>
              <ModalBody>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  className="text-danger-500 shadow-lg shadow-indigo-500/20 hover:bg-danger/50 hover:text-foreground"
                  onPress={onClose}
                >
                  Continue
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
