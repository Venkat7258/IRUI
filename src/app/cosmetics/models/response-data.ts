export interface ResponseData<T> {
    statusCode: string;
    message: string;
    isSuccess: boolean;
    data: T;
    startTime: string;
    endTime: string;
    totaltime: number;
    totaltimeInSeconds: number;
    totaltimeInMilliSeconds: number;
}