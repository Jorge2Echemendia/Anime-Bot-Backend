import type { VercelResponse } from "@vercel/node";

export function ok<T>(res: VercelResponse, data: T, status = 200): void {
    res.status(status).json({ success: true, data, error: null });
}

export function fail(res: VercelResponse, code: string, message: string, status = 400): void {
    res.status(status).json({ 
        success: false, data: null, error: { code, message 

    }, });
}