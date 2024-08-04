/* eslint-disable unused-imports/no-unused-imports */

declare module 'axios' {
    export interface AxiosResponse<T = any> extends AxiosResponse {
        data: T
    }

    export interface AxiosError<T = any> extends AxiosError {
        response?: AxiosResponse<T>
    }
}
