import { Env } from "pg-sdk-node";

export const clientId = process.env.PHONE_PE_CLIENT_ID;
export const clinetSecret = process.env.PHONE_PE_CLIENT_SECRET;
export const clientVersion = process.env.PHONE_PE_CLIENT_VERSION;
export const env = process.env.NODE_ENV === "production" ? Env.PRODUCTION : Env.SANDBOX;
