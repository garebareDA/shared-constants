import * as changeCase from 'change-case';

import { YamlFormat } from '../../../yamlFormat/formatChecker';
import { firstIntersectionType, typeParser } from '../../../typeParser';
import { supportedTypes, SupportedType } from '../type/type';

export function generate(data: YamlFormat, nameSpace: string) {
  const constantMappings = data.constants.values.map((item) => {
    const { key: originalKey, value, type } = item;
    const key = changeCase.constantCase(originalKey);

    const parsedType = typeParser(type);
    const supportedType = firstIntersectionType(
      parsedType,
      supportedTypes
    ) as SupportedType;

    if (supportedType === 'string') {
      return `${key} = '${value}'`;
    }

    return `${key} = ${value}`;
  });

  const code = `module ${nameSpace}
  ${constantMappings.join('\n  ')}
end
`;

  return code;
}
