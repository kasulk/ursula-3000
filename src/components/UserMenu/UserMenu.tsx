import { signOut, useSession } from "next-auth/react";
import {
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { LayoutGroupContext } from "framer-motion";
import { ThemeSwitch } from "..";

const user = {
  name: "Jason Hughes",
  email: "zoey@example.com",
  avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
};

export default function UserMenu() {
  const { data: session } = useSession();

  return (
    <Dropdown placement="bottom-end" backdrop="blur">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="primary"
          size="sm"
          name={user.name}
          src={user.avatar}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{user.name || user.email}</p>
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
