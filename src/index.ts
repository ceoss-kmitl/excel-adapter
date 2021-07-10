import ExcelJS from 'exceljs'

class Excel {
  private workbook: ExcelJS.Workbook
  private sheet: ExcelJS.Worksheet
  private activeCell: ExcelJS.Cell

  static readonly PaperSize = {
    A4: 9,
  }

  constructor(sheetOptions?: Partial<ExcelJS.AddWorksheetOptions>) {
    this.workbook = new ExcelJS.Workbook()
    this.sheet = this.workbook.addWorksheet('sheet1', sheetOptions)
    this.activeCell = this.sheet.getCell('A1')
  }

  /**
   * Send `.xlsx` file via `Express.js`
   */
  public async sendFile(res: any) {
    const fileName = 'FileName.xlsx'

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
    res.setHeader('Content-Disposition', 'attachment; filename=' + fileName)
    await this.workbook.xlsx.write(res)
    res.end()
  }

  /**
   * Get cell in worksheet
   * @example cell('A1')
   */
  public cell(id: string) {
    this.activeCell = this.sheet.getCell(id)
    return this
  }

  /**
   * Get merged cell in worksheet
   * @example cells('A1', 'B4')
   */
  public cells(topLeftId: string, bottomRightId: string) {
    this.sheet.mergeCells(topLeftId, bottomRightId)
    this.cell(topLeftId)
    return this
  }

  /**
   * Set value to cell
   * @example value('Hello') value(1234)
   */
  public value(value: ExcelJS.CellValue) {
    this.activeCell.value = value
    return this
  }

  /**
   * Set cell border. Can pass multiple sides
   * @example border('top', 'left') border('diagonal')
   */
  public border(
    ...borderSide: ('top' | 'right' | 'bottom' | 'left' | 'all' | 'diagonal')[]
  ) {
    borderSide.forEach((side) => {
      switch (side) {
        case 'top':
          this.borderTop()
          break
        case 'right':
          this.borderRight()
          break
        case 'bottom':
          this.borderBottom()
          break
        case 'left':
          this.borderLeft()
          break
        case 'all':
          this.borderTop()
          this.borderRight()
          this.borderBottom()
          this.borderLeft()
          break
        case 'diagonal':
          this.borderDiagonal()
          break
      }
    })

    return this
  }

  /**
   * Set cell alignment both x-axis & y-axis
   * @example align('center', 'middle')
   */
  public align(
    x?: ExcelJS.Alignment['horizontal'],
    y?: ExcelJS.Alignment['vertical']
  ) {
    this.alignX(x)
    this.alignY(y)
    return this
  }

  /**
   * Underline this cell
   */
  public underline() {
    this.activeCell.font = {
      ...this.activeCell.font,
      underline: true,
    }
    return this
  }

  /**
   * Italic this cell
   */
  public italic() {
    this.activeCell.font = {
      ...this.activeCell.font,
      italic: true,
    }
    return this
  }

  /**
   * Bold this cell
   */
  public bold() {
    this.activeCell.font = {
      ...this.activeCell.font,
      bold: true,
    }
    return this
  }

  /**
   * Set font size of this cell
   * @example fontSize(16)
   */
  public fontSize(size: number) {
    this.activeCell.font = {
      ...this.activeCell.font,
      size,
    }
    return this
  }

  // === Private methods ===

  private borderTop() {
    this.activeCell.border = {
      ...this.activeCell.border,
      top: { style: 'thin' },
    }
    return this
  }

  private borderRight() {
    this.activeCell.border = {
      ...this.activeCell.border,
      right: { style: 'thin' },
    }
    return this
  }

  private borderBottom() {
    this.activeCell.border = {
      ...this.activeCell.border,
      bottom: { style: 'thin' },
    }
    return this
  }

  private borderLeft() {
    this.activeCell.border = {
      ...this.activeCell.border,
      left: { style: 'thin' },
    }
    return this
  }

  private borderDiagonal() {
    this.activeCell.border = {
      ...this.activeCell.border,
      diagonal: { up: true, style: 'thin' },
    }
    return this
  }

  private alignX(position?: ExcelJS.Alignment['horizontal']) {
    this.activeCell.alignment = {
      ...this.activeCell.alignment,
      horizontal: position,
    }
    return this
  }

  private alignY(position?: ExcelJS.Alignment['vertical']) {
    this.activeCell.alignment = {
      ...this.activeCell.alignment,
      vertical: position,
    }
    return this
  }
}

export default Excel
