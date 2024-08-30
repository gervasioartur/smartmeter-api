import { UUID } from 'crypto';

export class MeasureEntity {
  private id: UUID;
  private imageUrl: string;
  private customerCode: string;
  private measureDateTime: Date;
  private measureType: string;
  private measureValue: number;
  private hasConfirmed: boolean = false;

  constructor(
    imageUrl: string,
    customerCode: string,
    measureDateTime: Date,
    measureType: string,
    measureValue: number,
    hasConfirmed: boolean = false,
  ) {
    this.imageUrl = imageUrl;
    this.customerCode = customerCode;
    this.measureDateTime = measureDateTime;
    this.measureType = measureType;
    this.measureValue = measureValue;
    this.hasConfirmed = hasConfirmed;
  }

  public setId(measureUUId: UUID): void {
    this.id = measureUUId;
  }

  public getId(): UUID | undefined {
    return this.id;
  }

  public getImageUrl(): string | undefined {
    return this.imageUrl;
  }

  public setImageUrl(value: string): void {
    this.imageUrl = value;
  }

  public getCustomerCode(): string {
    return this.customerCode;
  }

  public setCustomerCode(value: string): void {
    this.customerCode = value;
  }

  public getMeasureDateTime(): Date {
    return this.measureDateTime;
  }

  public setMeasureDateTime(value: Date): void {
    this.measureDateTime = value;
  }

  public getMeasureType(): string {
    return this.measureType;
  }

  public setMeasureType(value: string): void {
    this.measureType = value;
  }

  public getMeasureValue(): number | undefined {
    return this.measureValue;
  }

  public setMeasureValue(value: number): void {
    this.measureValue = value;
  }

  public getHasConfirmed(): boolean {
    return this.hasConfirmed;
  }

  public setHasConfirmed(value: boolean): void {
    this.hasConfirmed = value;
  }
}
