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
import { toast } from "../ui/Toast/use-toast";
import delayedToast from "../ui/Toast/delayedToast";

interface DeleteAccountModalProps {
  disclosure: UseDisclosureReturn;
  handleDeleteAccount: () => void;
}

export default function DeleteAccountModal({
  disclosure,
  handleDeleteAccount,
}: DeleteAccountModalProps) {
  const { isOpen, onOpenChange } = disclosure;

  function handleCancelation(onClose: () => void) {
    toast({
      variant: "warning",
      description: (
        <>
          Phew... <span className="text-2xl">🫣</span>
        </>
      ),
    });
    delayedToast(2000, {
      variant: "success",
      title: "Good Choice! 👍",
      description: "For a moment I thought it was over...",
    });

    onClose();
  }

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      radius="lg"
      classNames={{
        base: "p-6 border-8 border-danger/50 bg-background/90 text-foreground",
        backdrop: "bg-danger/10",
        header: "text-danger text-2xl",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center gap-1">
              ☠️ Account Deletion ☠️
            </ModalHeader>
            <ModalBody>
              This action cannot be undone. This will permanently delete your
              account and remove all your data from our servers.
            </ModalBody>
            <ModalFooter>
              <Button
                color="default"
                variant="light"
                onPress={() => handleCancelation(onClose)}
              >
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
  );
}
