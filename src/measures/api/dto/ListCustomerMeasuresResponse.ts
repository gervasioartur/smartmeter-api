export type MeasureResponse = {
  measure_uuid: string;
  measure_datetime: Date;
  measure_type: string;
  has_confirmed: boolean;
  imageUrl: string;
};

export type ListCustomerMeasuresResponse = {
  customer_code: string;
  measures: MeasureResponse[];
};