import type { UserMenuProps } from "../propTypes";
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
import AlertDialog from "../AlertDialog/AlertDialog";
import { toast } from "../ui/use-toast";
import * as actions from "@/actions";

export function UserMenu({ user }: UserMenuProps) {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const deleteAccountModal = useDisclosure();

  async function onDeleteAccount() {
    toast({
      description: "Deleting account...",
      variant: "destructive",
    });
    await actions.deleteAccount(userId);
    signOut();
    toast({ description: "Account deleted! ✅" });
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
            className="text-danger"
            color="danger"
            onClick={() => signOut()}
          >
            Log Out
          </DropdownItem>

          <DropdownSection title="Danger zone">
            <DropdownItem
              key="deleteAccount"
              className="text-warning"
              color="danger"
              description="Permanently delete your account & data"
            >
              Delete account
            </DropdownItem>
          </DropdownSection>

          {/* <DropdownItem key="settings">My Settings</DropdownItem> */}
          {/* <DropdownItem key="team_settings">Team Settings</DropdownItem> */}
          {/* <DropdownItem key="analytics">Analytics</DropdownItem> */}
          {/* <DropdownItem key="system">System</DropdownItem> */}
          {/* <DropdownItem key="configurations">Configurations</DropdownItem> */}
          {/* <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem> */}
        </DropdownMenu>
      </Dropdown>

      <AlertDialog
        disclosure={deleteAccountModal}
        handleDeleteAccount={onDeleteAccount}
      />
    </>
  );
}
