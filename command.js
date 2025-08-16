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
    console.error("Error parsing YAML file:", fileName);
    return e;
  }
}
function checkRootFormat(data) {
  return typeof data === "object" && data !== null && typeof data.format === "string" && typeof data.constants === "object" && data.constants !== null && Array.isArray(data.constants.values) && data.constants.values.length > 0 && data.constants.values.every(
    (item) => typeof item === "object" && item !== null && typeof item.key === "string" && typeof item.value === "string" && typeof item.type === "string"
  ) && typeof data.namespace === "string" && typeof data.typeMode === "string";
}
const program = new commander.Command();
program.name("shared-constants").description("Shared constants CLI").version("1.0.0");
program.command("generate <name>").description("Generate shared constants").action((name) => {
  const result = parseYaml(name);
  if (!result)
    return;
  if (!checkRootFormat(result))
    return;
  console.log(`Generated shared constants for ${name}:`, result);
});
program.parse(process.argv);
