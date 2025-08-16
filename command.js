#!/usr/bin/env node
"use strict";
const commander = require("commander");
const fs = require("fs");
const yaml = require("js-yaml");
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
  ) && typeof data.nameSpace === "string" && typeof data.typeMode === "string";
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
    if (supportedType === "bigint" || supportedType === "number") {
      return `${key}:${value} as ${supportedType}`;
    }
    return `${key}:'${value}' as ${supportedType}`;
  });
  const code = `
const ${namespace} = {
  ${constantMappings.join(",\n  ")}
} as const`;
  return code;
}
const program = new commander.Command();
program.name("shared-constants").description("Shared constants CLI").version("1.0.0");
program.command("generate <name>").description("Generate shared constants").action((name) => {
  try {
    const result = parseYaml(name);
    const checkedFormat = checkFormat(result);
    console.log(generate(checkedFormat));
  } catch (error) {
    console.error(error);
  }
});
program.parse(process.argv);
