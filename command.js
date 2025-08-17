#!/usr/bin/env node
"use strict";
const commander = require("commander");
const fs = require("fs");
const yaml = require("js-yaml");
const changeCase = require("change-case");
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
const changeCase__namespace = /* @__PURE__ */ _interopNamespaceDefault(changeCase);
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
    (item) => typeof item === "object" && item !== null && typeof item.key === "string" && (typeof item.value === "string" || typeof item.value === "number" || typeof item.value === "boolean") && typeof item.type === "string"
  ) && Array.isArray(data.target) && data.target.length > 0 && data.target.every(
    (item) => typeof item === "object" && item !== null && typeof item.language === "string" && (item.language === "typescript" || item.language === "ruby" || item.language === "python" || item.language === "go") && typeof item.output === "string" && typeof item.nameSpace === "string"
  );
}
const supportedTypes$3 = [
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
function generate$3(data, nameSpace) {
  const constantMappings = data.constants.values.map((item) => {
    const { key: originalKey, value, type } = item;
    const key = changeCase__namespace.constantCase(originalKey);
    const parsedType = typeParser(type);
    const supportedType = firstIntersectionType(
      parsedType,
      supportedTypes$3
    );
    if (supportedType === "string") {
      return `${key}: '${value}' as ${supportedType}`;
    }
    return `${key}: ${value} as ${supportedType}`;
  });
  const code = `export const ${nameSpace} = {
  ${constantMappings.join(",\n  ")},
} as const;
`;
  return code;
}
const supportedTypes$2 = ["string", "number", "boolean"];
function generate$2(data, nameSpace) {
  const constantMappings = data.constants.values.map((item) => {
    const { key: originalKey, value, type } = item;
    const key = changeCase__namespace.constantCase(originalKey);
    const parsedType = typeParser(type);
    const supportedType = firstIntersectionType(
      parsedType,
      supportedTypes$2
    );
    if (supportedType === "string") {
      return `${key} = '${value}'`;
    }
    return `${key} = ${value}`;
  });
  const code = `module ${nameSpace}
  ${constantMappings.join("\n  ")}
end
`;
  return code;
}
const supportedTypes$1 = ["string", "number", "boolean"];
function generate$1(data) {
  const constantMappings = data.constants.values.map((item) => {
    const { key: originalKey, value, type } = item;
    const key = changeCase__namespace.constantCase(originalKey);
    const parsedType = typeParser(type);
    const supportedType = firstIntersectionType(
      parsedType,
      supportedTypes$1
    );
    if (supportedType === "string") {
      return `${key} = "${value}"`;
    }
    if (supportedType === "boolean") {
      return `${key} = ${changeCase__namespace.capitalCase(value.toString())}`;
    }
    return `${key} = ${value}`;
  });
  const keyValue = data.constants.values.map((item) => {
    return changeCase__namespace.constantCase(item.key);
  });
  const code = `${constantMappings.join("\n")}
__all__ = ["${keyValue.join(
    '", "'
  )}"]`;
  return code;
}
const supportedTypes = [
  "string",
  "int",
  "int8",
  "int16",
  "int32",
  "int64",
  "uint",
  "uint8",
  "uint16",
  "uint32",
  "uint64",
  "float32",
  "float64",
  "bool",
  "byte",
  "rune"
];
function generate(data, nameSpace) {
  const constantMappings = data.constants.values.map((item) => {
    const { key: originalKey, value, type } = item;
    const key = changeCase__namespace.pascalCase(originalKey);
    const parsedType = typeParser(type);
    const supportedType = firstIntersectionType(
      parsedType,
      supportedTypes
    );
    if (supportedType === "string") {
      return `${key} string = "${value}"`;
    }
    if (supportedType === "rune") {
      return `${key} rune = '${value}'`;
    }
    return `${key} ${supportedType} = ${value}`;
  });
  const code = `package ${nameSpace}
const (
  ${constantMappings.join("\n  ")}
)
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
  console.log("Generating shared constants...");
  try {
    const yaml2 = parseYaml(name);
    const checkedFormat = checkFormat(yaml2);
    checkedFormat.target.forEach((target) => {
      if (target.language === "typescript") {
        const typescriptCode = generate$3(
          checkedFormat,
          target.nameSpace
        );
        outputToFile(target.output, typescriptCode);
      }
      if (target.language === "ruby") {
        const rubyCode = generate$2(checkedFormat, target.nameSpace);
        outputToFile(target.output, rubyCode);
      }
      if (target.language === "python") {
        const pythonCode = generate$1(checkedFormat);
        outputToFile(target.output, pythonCode);
      }
      if (target.language === "go") {
        const goCode = generate(checkedFormat, target.nameSpace);
        outputToFile(target.output, goCode);
      }
    });
  } catch (error) {
    console.error(error);
  }
  console.log("Shared constants generated successfully");
});
program.parse(process.argv);
