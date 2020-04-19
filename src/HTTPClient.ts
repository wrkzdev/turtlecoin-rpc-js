// Copyright (c) 2018-2020, Brandon Lehmann, The TurtleCoin Developers
//
// Please see the included LICENSE file for more information.

import * as request from 'request-promise-native';
import {format} from 'util';

/** @ignore */
const packageInfo = require('../package.json');

/** @ignore */
export class HTTPClient {
    private readonly m_host: string;
    private readonly m_port: number;
    private readonly m_timeout: number;
    private readonly m_proto: string;
    private readonly m_userAgent: string;
    private readonly m_keepAlive: boolean;
    private readonly m_key?: string;
    private readonly m_errorHandler?: (error: any) => Error;

    constructor(
        host: string = '127.0.0.1',
        port: number = 11898,
        timeout: number = 2000,
        ssl: boolean = false,
        userAgent: string = format('%s/%s', packageInfo.name, packageInfo.version),
        keepAlive: boolean = true,
        apiKey?: string,
        errorHandler?: (error: any) => Error
    ) {
        this.m_host = host;
        this.m_port = port;
        this.m_timeout = timeout;
        this.m_proto = (ssl) ? 'https' : 'http';
        this.m_userAgent = userAgent;
        this.m_keepAlive = keepAlive;
        if (apiKey) this.m_key = apiKey;
        if (errorHandler) this.m_errorHandler = errorHandler;
    }

    protected get host(): string {
        return this.m_host;
    }

    protected get keepAlive(): boolean {
        return this.m_keepAlive;
    }

    protected get key(): string | undefined {
        return this.m_key;
    }

    protected get port(): number {
        return this.m_port;
    }

    protected get protocol(): string {
        return this.m_proto;
    }

    protected get ssl(): boolean {
        return (this.protocol === 'https');
    }

    protected get timeout(): number {
        return this.m_timeout;
    }

    protected get userAgent(): string {
        return this.m_userAgent;
    }

    protected async delete(endpoint: string): Promise<void> {
        return request({
            url: format('%s://%s:%s/%s', this.protocol, this.host, this.port, endpoint),
            method: 'DELETE',
            json: true,
            timeout: this.timeout,
            forever: this.keepAlive,
            headers: {
                'User-Agent': this.userAgent,
                'X-API-KEY': this.key,
            },
        })
            .catch(error => {
                if (this.m_errorHandler) throw this.m_errorHandler(error);
                throw error;
            });
    }

    protected async get(endpoint: string): Promise<any> {
        return request({
            url: format('%s://%s:%s/%s', this.protocol, this.host, this.port, endpoint),
            method: 'GET',
            json: true,
            timeout: this.timeout,
            forever: this.keepAlive,
            headers: {
                'User-Agent': this.userAgent,
                'X-API-KEY': this.key,
            },
        })
            .catch(error => {
                if (this.m_errorHandler) throw this.m_errorHandler(error);
                throw error;
            });
    }

    protected async post(endpoint: string, body?: any): Promise<any> {
        return request({
            url: format('%s://%s:%s/%s', this.protocol, this.host, this.port, endpoint),
            method: 'POST',
            body: body,
            json: true,
            timeout: this.timeout,
            forever: this.keepAlive,
            headers: {
                'User-Agent': this.userAgent,
                'X-API-KEY': this.key,
            },
        })
            .catch(error => {
                if (this.m_errorHandler) throw this.m_errorHandler(error);
                throw error;
            });
    }

    protected async put(endpoint: string, body?: any): Promise<any> {
        return request({
            url: format('%s://%s:%s/%s', this.protocol, this.host, this.port, endpoint),
            method: 'PUT',
            body: body,
            json: true,
            timeout: this.timeout,
            forever: this.keepAlive,
            headers: {
                'User-Agent': this.userAgent,
                'X-API-KEY': this.key,
            },
        })
            .catch(error => {
                if (this.m_errorHandler) throw this.m_errorHandler(error);
                throw error;
            });
    }

    protected async rpcPost(method: string, params?: any): Promise<any> {
        return this.post('json_rpc', {
            jsonrpc: '2.0',
            method: method,
            params: params,
        })
            .then((response) => {
                if (response.error) {
                    throw new Error(response.error.message);
                }

                return response.result;
            })
            .catch(error => {
                if (this.m_errorHandler) throw this.m_errorHandler(error);
                throw error;
            });
    }
}
