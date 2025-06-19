import { useSession } from "next-auth/react";
import { useState } from "react";

export const useRequests = ({
  extraHeaders,
}: { extraHeaders?: Partial<HeadersInit> } = {}) => {
  const BASE_URL = "/api";
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { data: session } = useSession();

  const getHeaders = (customHeaders?: HeadersInit) => {
    const headers = {
      "Content-Type": "application/json",
      ...extraHeaders,
      ...customHeaders,
    };

    return headers;
  };

  const get = async (url: string, customOptions: RequestInit = {}) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}${url}`, {
        method: "GET",
        headers: getHeaders(customOptions.headers),
        ...customOptions,
      });

      const data = await res.json();
      setResponse(data);
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const post = async (
    url: string,
    body?: any,
    customOptions: RequestInit = {},
  ) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}${url}`, {
        method: "POST",
        headers: getHeaders(customOptions.headers),
        body: body ? JSON.stringify(body) : undefined,
        ...customOptions,
      });

      const data = await res.json();
      setResponse(data);
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const put = async (
    url: string,
    body?: any,
    customOptions: RequestInit = {},
  ) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}${url}`, {
        method: "PUT",
        headers: getHeaders(customOptions.headers),
        body: body ? JSON.stringify(body) : undefined,
        ...customOptions,
      });

      const data = await res.json();
      setResponse(data);
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const del = async (url: string, customOptions: RequestInit = {}) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}${url}`, {
        method: "DELETE",
        headers: getHeaders(customOptions.headers),
        ...customOptions,
      });

      const data = await res.json();
      setResponse(data);
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    response,
    loading,
    error,
    session, // expor sessão caso precise
    get,
    post,
    put,
    delete: del,
  };
};
