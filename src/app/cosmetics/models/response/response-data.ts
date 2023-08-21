export interface ResponseData<T> {
    statusCode: string;
    message: string;
    isSuccess: boolean;
    startTime: string;
    endTime: string;
    totaltime: number;
    totaltimeInSeconds: number;
    totaltimeInMilliSeconds: number;
    data: T;
}