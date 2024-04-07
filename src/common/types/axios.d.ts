/* eslint-disable unused-imports/no-unused-imports */
import { AxiosResponse, AxiosError } from 'axios'

declare module 'axios' {
    export interface AxiosResponse<T = any> extends AxiosResponse {
        data: T
    }

    export interface AxiosError<T = any> extends AxiosError {
        response?: AxiosResponse<T>
    }
}
