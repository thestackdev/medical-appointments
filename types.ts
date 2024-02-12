import { JWTPayload } from "jose";

export type Session = JWTPayload & {
  id: string;
  username: string;
  mobile: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};
