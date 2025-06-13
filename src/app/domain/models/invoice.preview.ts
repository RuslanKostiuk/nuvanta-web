export class InvoicePreview {
  constructor(
    private _id: string,
    private _operationDate: string,
    private _type: 'IN' | 'OUT',
    private _subtype: string,
    private _note: string | null,
    private _productCount: number,
    private _totalQuantity: number,
    private _totalValue: number | null,
  ) {
  }

  public get id() {
    return this._id;
  }

  public get operationDate() {
    return this._operationDate;
  }

  public get type() {
    return this._type;
  }

  public get subtype() {
    return this._subtype;
  }

  public get note() {
    return this._note;
  }

  public get productCount() {
    return this._productCount;
  }

  public get totalQuantity() {
    return this._totalQuantity;
  }

  public get totalValue() {
    return this._totalValue;
  }
}
