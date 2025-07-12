import fs from "fs-extra";
import path from "node:path";

import {
  type DependencyVersionMap,
  dependencyVersionMap,
} from "../constants.ts";

export const addPackageDependencies = async (opts: {
  dependencies?: DependencyVersionMap[];
  devDependencies?: DependencyVersionMap[];
  projectDir: string;
}): Promise<void> => {
  const { dependencies = [], devDependencies = [], projectDir } = opts;

  const pkgJsonPath = path.join(projectDir, "package.json");

  const pkgJson = await fs.readJson(pkgJsonPath);

  if (!pkgJson.dependencies) pkgJson.dependencies = {};
  if (!pkgJson.devDependencies) pkgJson.devDependencies = {};

  for (const pkgName of dependencies) {
    const version = dependencyVersionMap[pkgName];
    if (version) {
      pkgJson.dependencies[pkgName] = version;
    }
  }

  for (const pkgName of devDependencies) {
    const version = dependencyVersionMap[pkgName];
    if (version) {
      pkgJson.devDependencies[pkgName] = version;
    }
  }

  await fs.writeJson(pkgJsonPath, pkgJson, {
    spaces: 2,
  });
};

export const addPackageDependency = addPackageDependencies;
