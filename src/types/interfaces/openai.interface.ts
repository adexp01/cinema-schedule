interface ErrorDetails {
    message: string;
    type: string;
    param: null | string;
    code: string;
}

interface ResponseHeaders {
    'alt-svc': string;
    'cf-cache-status': string;
    'cf-ray': string;
    connection: string;
    'content-encoding': string;
    'content-type': string;
    date: string;
    server: string;
    'set-cookie': string;
    'strict-transport-security': string;
    'transfer-encoding': string;
    vary: string;
    'x-request-id': string;
}

export interface IOpenAiError {
    status: number;
    headers: ResponseHeaders;
    error: ErrorDetails;
    code: string;
    param: null | string;
    type: string;
}

export interface IOpenAiResponse{
    "message": {
        "id": string,
        "object": string,
        "created": number,
        "model": string,
        "choices": IOpenAiChoice[],
        "usage": IOpenAiUsage,
        "system_fingerprint": string
    }
}

export interface IOpenAiChoice {
    "index": number,
    "message": {
        "role": string,
        "content": string
    },
    "finish_reason": string
}

export interface IOpenAiUsage {
    "prompt_tokens": number,
    "completion_tokens": number,
    "total_tokens": number
}