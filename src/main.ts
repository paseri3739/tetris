import { Grid } from "./objects/Grid.js";

// Main
(function () {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d");

    // Retinaディスプレイ対応のためのスケーリング処理
    if (context) {
        // デバイスピクセル比を取得
        const dpr = window.devicePixelRatio || 1;

        // キャンバスの表示サイズ
        canvas.width = 300;
        canvas.height = 600;

        // キャンバスの実際のピクセルサイズを設定
        canvas.style.width = `${canvas.width}px`;
        canvas.style.height = `${canvas.height}px`;

        // キャンバスの解像度を調整
        canvas.width *= dpr;
        canvas.height *= dpr;

        // コンテキストのスケールを調整
        context.scale(dpr, dpr);

        const grid = new Grid(0, 0);
        grid.render(context);
    }
})();
