import * as changeCase from 'change-case';

import { YamlFormat } from '../../../yamlFormat/formatChecker';
import { firstIntersectionType, typeParser } from '../../../typeParser';
import { supportedTypes, SupportedType } from '../type/type';

export function generate(data: YamlFormat) {
  const constantMappings = data.constants.values.map((item) => {
    try {
      const { key: originalKey, value, type } = item;
      const key = changeCase.constantCase(originalKey);
      const parsedType = typeParser(type);
      const supportedType = firstIntersectionType(
        parsedType,
        supportedTypes
      ) as SupportedType;

      if (supportedType === 'string') {
        return `${key} = "${value}"`;
      }

      if (supportedType === 'boolean') {
        return `${key} = ${changeCase.capitalCase(value.toString())}`;
      }

      return `${key} = ${value}`;
    } catch (error) {
      throw new Error(
        `Error processing item ${JSON.stringify(item)}:\n ${error}`
      );
    }
  });

  const keyValue = data.constants.values.map((item) => {
    return changeCase.constantCase(item.key);
  });

  const code = `${constantMappings.join('\n')}\n__all__ = ["${keyValue.join(
    '", "'
  )}"]`;
  return code;
}
