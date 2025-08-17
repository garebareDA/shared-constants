import * as changeCase from 'change-case';

import { YamlFormat } from '../../../yamlFormat/formatChecker';
import { firstIntersectionType, typeParser } from '../../../typeParser';
import { supportedTypes, SupportedType } from '../type/type';

export function generate(data: YamlFormat) {
  const constantMappings = data.constants.values.map((item) => {
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

    return `${key} = ${value}`;
  });

  const keyValue = data.constants.values.map((item) => {
    return item.key;
  });

  const code = `${constantMappings.join('\n')}\n__all__ = ["${keyValue.join(
    '", "'
  )}"]`;
  return code;
}
