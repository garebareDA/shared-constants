import { YamlFormat } from '../../../yamlFormat/formatChecker';
import { firstIntersectionType, typeParser } from '../../../typeParser';
import { supportedTypes, SupportedType } from '../type/type';

export function generate(data: YamlFormat) {
  const namespace = data.nameSpace;
  const constantMappings = data.constants.values.map((item) => {
    const { key, value, type } = item;
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

  const code = `module ${namespace}
  ${constantMappings.join('\n  ')}
end
`;

  return code;
}
