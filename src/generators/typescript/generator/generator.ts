import * as changeCase from 'change-case';

import { YamlFormat } from '../../../yamlFormat/formatChecker';
import { firstIntersectionType, typeParser } from '../../../typeParser';
import { supportedTypes, SupportedType } from '../type/type';

export function generate(data: YamlFormat) {
  const namespace = data.nameSpace;
  const constantMappings = data.constants.values.map((item) => {
    const { key: originalKey, value, type } = item;
    const key = changeCase.constantCase(originalKey);

    const parsedType = typeParser(type);
    const supportedType = firstIntersectionType(
      parsedType,
      supportedTypes
    ) as SupportedType;

    if (supportedType === 'string') {
      return `${key}: '${value}' as ${supportedType}`;
    }

    return `${key}: ${value} as ${supportedType}`;
  });

  const code = `export const ${namespace} = {
  ${constantMappings.join(',\n  ')},
} as const;
`;

  return code;
}
