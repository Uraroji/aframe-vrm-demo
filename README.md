# aframe-vrm-demo

## 目標
- [A-FRAME](https://aframe.io/docs/1.3.0/introduction/)開発のベストプラクティスを見つける
    - 独自のコンポーネントシステムを採用している
    - 過去の遺産が割とあるのでこれを活用したい AR.jsなど
    - 最低限TypeScriptを使いたい
    - ReactやVue風に書きたい
- [VRM](https://vrm.dev/)を扱いたい
    - [binzume/aframe-vrm](https://github.com/binzume/aframe-vrm)はあるけど，[@pixiv/three-vrm](https://github.com/pixiv/three-vrm)ベースで書き換えたい
    - ローカルファイルのVRMとかVRoidHubとかからファイルを持ってきたい
        - [この辺](https://github.com/SuzukiDaishi/peppersghost-vrm/blob/main/src/UserLoader.ts)参考に
    - 動かしたい
        - [この辺](./src/VRMAnimationClip.ts)参考に
- メタバースしたい
    - VRMのコントローラを作る
        - キーボード
        - VRコントローラ
        - スマホ
    - VRWebサイト間のシームレスな移動を可能にするハイパーリンクを作りたい
        - モデル情報や諸々の情報を移行できる
        - [この辺](https://github.com/Uraroji/three-vrm-send)参考に
