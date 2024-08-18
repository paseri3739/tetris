export enum GridTable {
    Rows = 20, // 20行
    Cols = 10, // 10列
}

export enum CellSize {
    Width = 30, // 30px
    Height = 30, // 30px
}

export enum GridPixel {
    Width = CellSize.Width * GridTable.Cols, // 300px
    Height = CellSize.Height * GridTable.Rows, // 600px
}
