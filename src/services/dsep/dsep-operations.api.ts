/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type undefined = undefined;

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Beckn Protocol Core
 * @version 1.0.0
 *
 * Beckn Core API specification
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  search = {
    /**
     * @description BAP declares the customer's intent to buy/avail products or services
     *
     * @tags Beckn Provider Platform (BPP), Beckn Gateway (BG)
     * @name SearchCreate
     * @request POST:/search
     * @secure
     */
    searchCreate: (data: any, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/search`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  select = {
    /**
     * @description BAP declares the customer's cart (or equivalent) created by selecting objects from the catalog
     *
     * @tags Beckn Provider Platform (BPP)
     * @name SelectCreate
     * @request POST:/select
     * @secure
     */
    selectCreate: (data: any, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/select`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  init = {
    /**
     * @description Initialize an order by providing billing and/or shipping details
     *
     * @tags Beckn Provider Platform (BPP)
     * @name InitCreate
     * @request POST:/init
     * @secure
     */
    initCreate: (data: any, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/init`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  confirm = {
    /**
     * @description Initialize an order by providing billing and/or shipping details
     *
     * @tags Beckn Provider Platform (BPP)
     * @name ConfirmCreate
     * @request POST:/confirm
     * @secure
     */
    confirmCreate: (data: any, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/confirm`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  status = {
    /**
     * @description Fetch the latest order object
     *
     * @tags Beckn Provider Platform (BPP)
     * @name StatusCreate
     * @request POST:/status
     * @secure
     */
    statusCreate: (data: any, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/status`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  track = {
    /**
     * @description Track an active order
     *
     * @tags Beckn Provider Platform (BPP)
     * @name TrackCreate
     * @request POST:/track
     * @secure
     */
    trackCreate: (data: any, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/track`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  cancel = {
    /**
     * @description Cancel an order
     *
     * @tags Beckn Provider Platform (BPP)
     * @name CancelCreate
     * @request POST:/cancel
     * @secure
     */
    cancelCreate: (data: any, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/cancel`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  update = {
    /**
     * @description Remove object
     *
     * @tags Beckn Provider Platform (BPP)
     * @name UpdateCreate
     * @request POST:/update
     * @secure
     */
    updateCreate: (data: any, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/update`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  rating = {
    /**
     * @description Provide feedback on a service
     *
     * @tags Beckn Provider Platform (BPP)
     * @name RatingCreate
     * @request POST:/rating
     * @secure
     */
    ratingCreate: (data: any, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/rating`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  support = {
    /**
     * @description Contact support
     *
     * @tags Beckn Provider Platform (BPP)
     * @name SupportCreate
     * @request POST:/support
     * @secure
     */
    supportCreate: (data: any, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/support`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  onSearch = {
    /**
     * @description BPP sends its catalog in response to a search request.
     *
     * @tags Beckn Application Platform (BAP), Beckn Gateway (BG)
     * @name OnSearchCreate
     * @request POST:/on_search
     * @secure
     */
    onSearchCreate: (data: any, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/on_search`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  onSelect = {
    /**
     * @description Send draft order object with quoted price for selected items
     *
     * @tags Beckn Application Platform (BAP)
     * @name OnSelectCreate
     * @request POST:/on_select
     * @secure
     */
    onSelectCreate: (data: any, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/on_select`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  onInit = {
    /**
     * @description Send order object with payment details updated
     *
     * @tags Beckn Application Platform (BAP)
     * @name OnInitCreate
     * @request POST:/on_init
     * @secure
     */
    onInitCreate: (data: any, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/on_init`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  onConfirm = {
    /**
     * @description Send active order object
     *
     * @tags Beckn Application Platform (BAP)
     * @name OnConfirmCreate
     * @request POST:/on_confirm
     * @secure
     */
    onConfirmCreate: (data: any, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/on_confirm`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  onTrack = {
    /**
     * @description Send tracking details of an active order
     *
     * @tags Beckn Application Platform (BAP)
     * @name OnTrackCreate
     * @request POST:/on_track
     * @secure
     */
    onTrackCreate: (data: any, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/on_track`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  onCancel = {
    /**
     * @description Send cancellation request_id with reasons list in case of cancellation request. Else send cancelled order object
     *
     * @tags Beckn Application Platform (BAP)
     * @name OnCancelCreate
     * @request POST:/on_cancel
     * @secure
     */
    onCancelCreate: (data: any, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/on_cancel`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  onUpdate = {
    /**
     * @description Returns updated service with updated runtime object
     *
     * @tags Beckn Application Platform (BAP)
     * @name OnUpdateCreate
     * @request POST:/on_update
     * @secure
     */
    onUpdateCreate: (data: any, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/on_update`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  onStatus = {
    /**
     * @description Fetch the status of a Service
     *
     * @tags Beckn Application Platform (BAP)
     * @name OnStatusCreate
     * @request POST:/on_status
     * @secure
     */
    onStatusCreate: (data: any, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/on_status`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  onRating = {
    /**
     * @description Provide feedback on a service
     *
     * @tags Beckn Application Platform (BAP)
     * @name OnRatingCreate
     * @request POST:/on_rating
     * @secure
     */
    onRatingCreate: (data: any, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/on_rating`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  onSupport = {
    /**
     * @description Contact Support
     *
     * @tags Beckn Application Platform (BAP)
     * @name OnSupportCreate
     * @request POST:/on_support
     * @secure
     */
    onSupportCreate: (data: any, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/on_support`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
}
