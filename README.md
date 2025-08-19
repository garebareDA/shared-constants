# shared-constants

共有定数を複数のプログラミング言語で生成するためのツールです。YAMLファイルから定数を定義し、TypeScript、Go、Python、Rubyのコードを自動生成できます。

## 機能

- **複数言語対応**: TypeScript、Go、Python、Rubyのコード生成
- **YAML形式**: 読みやすいYAMLファイルで定数を定義
- **型安全性**: 各言語の型システムに対応したコード生成
- **命名規則**: 各言語の慣習に従った定数名の自動変換

## インストール

```bash
npm install -g shared-constants
```

## 使用方法

### 1. YAMLファイルの作成

```yaml
format: shared-constants //他のフォーマットが実行されるのを防ぐため
constants:
  values:
    - key: api_url // 定数名
      value: "https://api.example.com" // 定数の中身
      type: "string" //型名
    - key: max_retries
      value: 3
      type: "number|int" //複数言語に出力する場合は複数の型を設定可能、先頭のものから優先される
    - key: debug_mode
      value: true
      type: "boolean"
target:
  - language: typescript
    output: "./output/"
    nameSpace: "config"
  - language: go
    output: "./output/"
    nameSpace: "config"
  - language: python
    output: "./output/"
    nameSpace: "config"
  - language: ruby
    output: "./output/"
    nameSpace: "config"
    comment: ""
```

### 2. コード生成の実行

```bash
shared-constants generate ./example/example.yaml
```

## 生成されるコード例

### TypeScript
```typescript
export const config = {
  API_URL: 'https://api.example.com' as string,
  MAX_RETRIES: 3 as number,
  DEBUG_MODE: true as boolean,
} as const;
```

### Go
```go
package config
const (
  ApiUrl string = "https://api.example.com"
  MaxRetries int = 3
  DebugMode bool = true
)
```

### Python
```python
API_URL = "https://api.example.com"
MAX_RETRIES = 3
DEBUG_MODE = True
__all__ = ["API_URL", "MAX_RETRIES", "DEBUG_MODE"]
```

### Ruby
```ruby
module config
  API_URL = 'https://api.example.com'
  MAX_RETRIES = 3
  DEBUG_MODE = true
end
```

## サポートされている型

### TypeScript
- `string`
- `number`
- `boolean`
- `bigint`

### Go
- `string`
- `int`, `int8`, `int16`, `int32`, `int64`
- `uint`, `uint8`, `uint16`, `uint32`, `uint64`
- `float32`, `float64`
- `bool`
- `byte`
- `rune`

### Python
- `string`
- `number`
- `boolean`

### Ruby
- `string`
- `number`
- `boolean`

## ライセンス

MIT License
