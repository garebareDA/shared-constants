import * as changeCase from 'change-case';

import { YamlFormat } from '../../../yamlFormat/formatChecker';
import { firstIntersectionType, typeParser } from '../../../typeParser';
import { supportedTypes, SupportedType } from '../type/type';

export function generate(data: YamlFormat, nameSpace: string) {
  const constantMappings = data.constants.values.map((item) => {
    try {
      const { key: originalKey, value, type } = item;
      const key = changeCase.pascalCase(originalKey);
      const parsedType = typeParser(type);
      const supportedType = firstIntersectionType(
        parsedType,
        supportedTypes
      ) as SupportedType;

      if (supportedType === 'string') {
        return `${key} string = "${value}"`;
      }

      if (supportedType === 'rune') {
        return `${key} rune = '${value}'`;
      }

      return `${key} ${supportedType} = ${value}`;
    } catch (error) {
      throw new Error(
        `Error processing item ${JSON.stringify(item)}:\n ${error}`
      );
    }
  });

  const code = `package ${nameSpace}
const (
  ${constantMappings.join('\n  ')}
)
`;
  return code;
}
