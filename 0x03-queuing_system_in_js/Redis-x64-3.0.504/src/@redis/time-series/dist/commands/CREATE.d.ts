import { TimeSeriesEncoding, TimeSeriesDuplicatePolicies, Labels } from '.';
import { TsIgnoreOptions } from './ADD';
export declare const FIRST_KEY_INDEX = 1;
interface CreateOptions {
    RETENTION?: number;
    ENCODING?: TimeSeriesEncoding;
    CHUNK_SIZE?: number;
    DUPLICATE_POLICY?: TimeSeriesDuplicatePolicies;
    LABELS?: Labels;
    IGNORE?: TsIgnoreOptions;
}
export declare function transformArguments(key: string, options?: CreateOptions): Array<string>;
export declare function transformReply(): 'OK';
export {};
