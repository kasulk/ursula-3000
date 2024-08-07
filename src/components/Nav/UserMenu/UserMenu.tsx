import type { UserMenuProps } from "../../propTypes";
import { signOut, useSession } from "next-auth/react";
import {
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  useDisclosure,
} from "@nextui-org/react";
import DeleteAccountModal from "./DeleteAccountModal";
import { toast } from "../../ui/Toast/use-toast";
import * as actions from "@/actions";

export function UserMenu({ user }: UserMenuProps) {
  const { data: session } = useSession();
  const userId = session?.user.id;

  /// use disclosure workaround for showing the modal
  /// https://github.com/nextui-org/nextui/discussions/2008#discussioncomment-8023732
  const deleteAccountModal = useDisclosure();

  async function onDeleteAccount() {
    toast({
      variant: "danger",
      className: "bg-opacity-75 bg-danger",
      description: "Deleting account...",
    });
    await actions.deleteAccount(userId);
    signOut();
    toast({
      variant: "success",
      className: "bg-opacity-75 bg-success",
      description: "Account deleted! ✅",
    });
  }

  return (
    <>
      <Dropdown placement="bottom-end" backdrop="blur">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="primary"
            size="sm"
            name={user?.name || ""}
            src={user?.avatar || ""}
          />
        </DropdownTrigger>

        <DropdownMenu
          aria-label="Profile Actions"
          variant="flat"
          onAction={(key) => {
            if (key === "deleteAccount") deleteAccountModal.onOpen();
          }}
        >
          <DropdownItem key="profile" className="py-2">
            <p className="mb-2 font-semibold">Signed in as</p>
            {user?.name && <p>{user?.name}</p>}
            {user?.email && <p>{user?.email}</p>}
          </DropdownItem>

          <DropdownItem
            key="logout"
            className="text-primary"
            color="primary"
            onClick={() => signOut()}
            showDivider
          >
            Log Out
          </DropdownItem>

          <DropdownSection
            title="Danger Zone"
            classNames={{
              heading: "text-danger",
            }}
          >
            <DropdownItem
              key="deleteAccount"
              color="danger"
              description="Permanently delete your account & data"
            >
              Delete Account
            </DropdownItem>
          </DropdownSection>

          {/* <DropdownItem key="settings">My Settings</DropdownItem> */}
          {/* <DropdownItem key="analytics">Analytics</DropdownItem> */}
          {/* <DropdownItem key="system">System</DropdownItem> */}
          {/* <DropdownItem key="configurations">Configurations</DropdownItem> */}
          {/* <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem> */}
        </DropdownMenu>
      </Dropdown>

      <DeleteAccountModal
        disclosure={deleteAccountModal}
        handleDeleteAccount={onDeleteAccount}
      />
    </>
  );
}
