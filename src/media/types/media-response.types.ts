import { Media } from "@prisma/client";

export enum OperationStatus {
  SUCCESS = "success",
  ERROR = "error",
}
export type MediaResponseType = {
  status: OperationStatus;
  message: string;
  data: Media | Media[] | [] | object;
};
