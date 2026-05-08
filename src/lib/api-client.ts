const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

async function getAuthToken(): Promise<string> {
    if (typeof window !== 'undefined') {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'token' || name === 'jwt') return value;
        }
        return "";
    }

    try {
        const { cookies } = await import('next/headers');
        const cookieStore = await cookies();
        return cookieStore.get('token')?.value || "";
    } catch {
        return "";
    }
}

export async function apiFetch<T = any>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {

    const isBrowser = typeof window !== "undefined";
    const url = endpoint.startsWith("http")
        ? endpoint
        : isBrowser ? endpoint : `${BASE_URL}${endpoint}`;

    const headers = new Headers(options.headers);

    if (!(options.body instanceof FormData)) {
        headers.set("Content-Type", "application/json");
    }

    headers.set("Accept", "application/json");
    headers.set("ngrok-skip-browser-warning", "true");

    const token = await getAuthToken();
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const res = await fetch(url, {
        ...options,
        headers,
    });

    if (!res.ok) {
        const errorText = await res.text();
        let errorMessage = errorText || `Error: ${res.status}`;

        try {
            const errorObj = JSON.parse(errorText);
            // Extracts message from standard backend error structure
            errorMessage = errorObj.message || errorObj.error?.message || errorMessage;
        } catch {
            // Not a JSON error, use original text
        }

        throw new Error(errorMessage);
    }

    return res.json();
}