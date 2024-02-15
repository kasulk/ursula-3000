import fs from "fs";

/**
 * Gets the folder-names in the app directory,
 * removes the api folder name,
 * add spaces and
 * returns titles of nav items
 *
 * @returns {string[]} titles of all next routes in the app-folder
 */
//! not tested yet
export default function getNavItemsFromAppFolder(): string[] {
  const directoryPath = "/app";
  const ignoredDirs = ["api"];

  const subdirectories = fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const routesNames = subdirectories.filter(
    (directory) => !ignoredDirs.includes(directory),
  );

  const navItems = routesNames.map((routeName) =>
    addSpacesBeforeUpperCases(routeName),
  );

  return navItems;
}

function addSpacesBeforeUpperCases(str: string): string {
  return str
    .split("")
    .map((letter, i) => {
      /// ignore first letter
      if (i && letter === letter.toUpperCase()) return " " + letter;
      return letter;
    })
    .join("");
}
