#!/usr/bin/env node
"use strict";
const commander = require("commander");
const fs = require("fs");
const yaml = require("js-yaml");
const path = require("path");
function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const fs__namespace = /* @__PURE__ */ _interopNamespaceDefault(fs);
function parseYaml(fileName) {
  try {
    const doc = yaml.load(fs.readFileSync(fileName).toString());
    return doc;
  } catch (e) {
    throw new Error(
      `Failed to parse YAML file: ${fileName}. 
 Error: ${e instanceof Error ? e.message : String(e)}`
    );
  }
}
function checkFormat(data) {
  const isValid = checkRootFormat(data);
  if (!isValid)
    throw new Error("Invalid YAML format");
  return data;
}
function checkRootFormat(data) {
  return typeof data === "object" && data !== null && typeof data.format === "string" && data.format === "shared-constants" && typeof data.constants === "object" && data.constants !== null && Array.isArray(data.constants.values) && data.constants.values.length > 0 && data.constants.values.every(
    (item) => typeof item === "object" && item !== null && typeof item.key === "string" && typeof item.value === "string" && typeof item.type === "string"
  ) && typeof data.nameSpace === "string" && typeof data.typeMode === "string" && Array.isArray(data.target) && data.target.length > 0 && data.target.every(
    (item) => typeof item === "object" && item !== null && typeof item.language === "string" && item.language === "typescript" && typeof item.output === "string"
  );
}
const supportedTypes = [
  "string",
  "number",
  "boolean",
  "bigint"
];
function typeParser(types) {
  return types.split("|").map((type) => type.trim());
}
function firstIntersectionType(inputTypes, supportedTypes2) {
  const set = new Set(supportedTypes2);
  for (const value of inputTypes) {
    if (set.has(value)) {
      return value;
    }
  }
  throw new Error(`Not Supported Type ${inputTypes.join(", ")}`);
}
function generate(data) {
  const namespace = data.nameSpace;
  const constantMappings = data.constants.values.map((item) => {
    const { key, value, type } = item;
    const parsedType = typeParser(type);
    const supportedType = firstIntersectionType(
      parsedType,
      supportedTypes
    );
    if (supportedType === "string") {
      return `${key}: '${value}' as ${supportedType}`;
    }
    return `${key}: ${value} as ${supportedType}`;
  });
  const code = `export const ${namespace} = {
  ${constantMappings.join(",\n  ")},
} as const;
`;
  return code;
}
function outputToFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs__namespace.existsSync(dir)) {
    fs__namespace.mkdirSync(dir, { recursive: true });
  }
  fs__namespace.writeFileSync(filePath, content);
}
const program = new commander.Command();
program.name("shared-constants").description("Shared constants CLI").version("1.0.0");
program.command("generate <name>").description("Generate shared constants").action((name) => {
  try {
    const yaml2 = parseYaml(name);
    const checkedFormat = checkFormat(yaml2);
    checkedFormat.target.forEach((target) => {
      if (target.language === "typescript") {
        const typescriptCode = generate(checkedFormat);
        outputToFile(target.output, typescriptCode);
      }
    });
  } catch (error) {
    console.error(error);
  }
});
program.parse(process.argv);
