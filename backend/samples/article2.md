# 今日の天気

## 気分いいね

今日は晴れです

## 気分よくないね

今日は雨です

## MD 記法のテスト

### 数式

これはブロック形式です。

$$
\int_0^1 x^2 dx = \frac{1}{2}
$$

これはインサート形式です。$\forall x, y \in X, d(f(x), f(y)) \leq Ld(x, y)^\alpha$

### テーブル

| TH 左寄せ | TH 中央寄せ | TH 右寄せ |
| :-------- | :---------: | --------: |
| TD        |     TD      |        TD |
| TD        |     TD      |        TD |

### テキスト関連

`inline`, _これは斜体_, **これは強調**, ~~これは打ち消し線です~~

ここには注釈[^1]を入れたいです。(注釈はまあどうでもいいや)

[^1]: https://example.com

これは[内部リンク](/article/1)
これは[外部リンク](https://example.com)

イメージ from API

<img src="/image/1" width="300" />

イメージ from normal URL

![イメージロード失敗...](https://picsum.photos/seed/picsum/200/300)

---

1. List1
2. List2

- DotList1
- DotList2

> 引用
>
> 引用続く

```go:main.go
package main

import "fmt"

func main() {
    fmt.Println("Hello world!")
}
```
