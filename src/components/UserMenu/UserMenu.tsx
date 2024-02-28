import type { UserMenuProps } from "../propTypes";
import { signOut } from "next-auth/react";
import {
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

export function UserMenu({ user }: UserMenuProps) {
  return (
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
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="py-2">
          <p className="mb-2 font-semibold">Signed in as</p>
          {user?.name && <p>{user?.name}</p>}h
          {user?.email && <p>{user?.email}</p>}
        </DropdownItem>
        {/* <DropdownItem key="settings">My Settings</DropdownItem> */}
        {/* <DropdownItem key="team_settings">Team Settings</DropdownItem> */}
        {/* <DropdownItem key="analytics">Analytics</DropdownItem> */}
        {/* <DropdownItem key="system">System</DropdownItem> */}
        {/* <DropdownItem key="configurations">Configurations</DropdownItem> */}
        {/* <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem> */}
        <DropdownItem
          key="logout"
          className="text-danger"
          color="danger"
          onClick={() => signOut()}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
