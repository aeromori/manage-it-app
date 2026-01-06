import * as jose from "jose";

// import { env } from '@/lib/env'
// import { getItem} from '@lib/utils/localStorage';

const JWT_SECRET_KEY = process.env.JWT_SECRET;
const jwtSecret = new TextEncoder().encode(JWT_SECRET_KEY);

//  Waits for a given number of milliseconds
export const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

//  Helper function to easily retrieve a database table
// export const getDatabaseTable = (entity) => getItem(env.DB_KEY?.[entity])

//  wrapper for axios mock adapter that adds authentication checks
export const withAuth =
    (...data) =>
    async (config) => {
        const token = config.headers.authorization?.split(" ")[1];

        //  verify access token if present
        const verified = token ? await verifyToken(token) : false;

        if (process.env.USE_AUTH && !verified) {
            return [403, { message: "Unauthorized" }];
        }

        //  calls the original mock function
        return typeof data[0] === "function" ? data[0](config) : data;
    };

export const verifyToken = async (token, options = undefined) => {
    try {
        const verification = await jose.jwtVerify(token, jwtSecret);
        return options?.returnPayload ? verification.payload : true;
    } catch {
        return false;
    }
};
