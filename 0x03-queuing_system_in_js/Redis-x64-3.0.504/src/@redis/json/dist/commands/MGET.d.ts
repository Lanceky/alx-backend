import { RedisJSON } from '.';
export declare const FIRST_KEY_INDEX = 1;
export declare const IS_READ_ONLY = true;
export declare function transformArguments(keys: Array<string>, path: string): Array<string>;
export declare function transformReply(reply: Array<string | null>): Array<RedisJSON | null>;
