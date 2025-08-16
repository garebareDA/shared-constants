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

    if (supportedType === 'bigint' || supportedType === 'number') {
      return `${key}:${value} as ${supportedType}`;
    }

    return `${key}:'${value}' as ${supportedType}`;
  });

  const code = `
const ${namespace} = {
  ${constantMappings.join(',\n  ')}
} as const`;

  return code;
}
