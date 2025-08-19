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
  try {
    checkRootFormat(data);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Invalid YAML format");
  }
}
function checkRootFormat(data) {
  if (!isObject(data)) {
    throw new Error("Data must be an object");
  }
  checkFormatField(data);
  checkConstants(data);
  checkTarget(data);
}
function isObject(data) {
  return typeof data === "object" && data !== null;
}
function checkFormatField(data) {
  if (typeof data.format !== "string") {
    throw new Error("Format field must be a string");
  }
  if (data.format !== "shared-constants") {
    throw new Error(`Format must be 'shared-constants', got: ${data.format}`);
  }
}
function checkConstants(data) {
  if (!isObject(data.constants)) {
    throw new Error("Constants field must be an object");
  }
  if (!Array.isArray(data.constants.values)) {
    throw new Error("Constants values must be an array");
  }
  if (data.constants.values.length === 0) {
    throw new Error("Constants values array cannot be empty");
  }
  data.constants.values.forEach((item, index) => {
    checkConstantItem(item, index);
  });
}
function checkConstantItem(item, index) {
  if (!isObject(item)) {
    throw new Error(`Constant item at index ${index} must be an object`);
  }
  if (typeof item.key !== "string") {
    throw new Error(`Constant key at index ${index} must be a string`);
  }
  if (typeof item.value !== "string" && typeof item.value !== "number" && typeof item.value !== "boolean") {
    throw new Error(
      `Constant value at index ${index} must be a string, number, or boolean`
    );
  }
  if (typeof item.type !== "string") {
    throw new Error(`Constant type at index ${index} must be a string`);
  }
}
function checkTarget(data) {
  if (!Array.isArray(data.target)) {
    throw new Error("Target field must be an array");
  }
  if (data.target.length === 0) {
    throw new Error("Target array cannot be empty");
  }
  data.target.forEach((item, index) => {
    checkTargetItem(item, index);
  });
}
function checkTargetItem(item, index) {
  if (!isObject(item)) {
    throw new Error(`Target item at index ${index} must be an object`);
  }
  if (typeof item.language !== "string") {
    throw new Error(`Target language at index ${index} must be a string`);
  }
  const supportedLanguages = ["typescript", "ruby", "python", "go"];
  if (!supportedLanguages.includes(
    item.language
  )) {
    throw new Error(
      `Target language at index ${index} must be one of: ${supportedLanguages.join(", ")}`
    );
  }
  if (typeof item.output !== "string") {
    throw new Error(`Target output at index ${index} must be a string`);
  }
  if (typeof item.nameSpace !== "string") {
    throw new Error(`Target nameSpace at index ${index} must be a string`);
  }
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
    try {
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
    } catch (error) {
      throw new Error(
        `Error processing item ${JSON.stringify(item)}:
 ${error}`
      );
    }
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
    try {
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
    } catch (error) {
      throw new Error(
        `Error processing item ${JSON.stringify(item)}:
 ${error}`
      );
    }
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
    try {
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
    } catch (error) {
      throw new Error(
        `Error processing item ${JSON.stringify(item)}:
 ${error}`
      );
    }
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
    try {
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
    } catch (error) {
      throw new Error(
        `Error processing item ${JSON.stringify(item)}:
 ${error}`
      );
    }
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
program.name("shared-constants").description("Shared constants CLI").version("1.0.0-alpha.1");
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
    return;
  }
  console.log("Shared constants generated successfully");
});
program.parse(process.argv);
