import { YamlFormat } from '../../../yamlFormat/formatChecker';
import { firstIntersectionType, typeParser } from '../../../typeParser';
import { supportedTypes, SupportedType } from '../type/type';

export function generate(data: YamlFormat) {
  const constantMappings = data.constants.values.map((item) => {
    const { key, value, type } = item;
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
  });

  const code = `package ${data.nameSpace}
const (
  ${constantMappings.join('\n  ')}
)
  `;
  return code;
}
