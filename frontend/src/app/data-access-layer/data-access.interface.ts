export interface DAOContext<T, K> {
    decode(data: T): K;
    encode(data: K): T;
}

export enum Status {
    fail,
    ok,
}

export interface ServerResponse<T = any> {
    status: Status;
    data: T;
    errorMessage: string;
}