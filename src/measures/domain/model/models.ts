import { UUID } from 'crypto';

export type UploadMeasureParams = {
  image: string;
  costumerCode: string;
  measureDateTime: Date;
  measureType: string;
};

export type UploadModel = {
  imageUrl: string;
  measureValue: number;
  measureUUid: UUID;
};

export type IsRegisteredParams = {
  costumerCode: string;
  measureDateTime: Date;
  measureType: string;
};

export type ReadMeasureFromLLMModel = {
  measureValue: number;
  imageUrl: string;
};

export type UploadImageParams = {
  type: string;
  fileName: string;
  filePath: string;
};

export type LocalUploadParams = {
  measureType: string;
  base64Image: string;
  costumerCode: string;
  measureDateTime: Date;
};
