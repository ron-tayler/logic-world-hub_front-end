import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from "axios";
import { SyncPromise } from "@/lib/SyncPromise";
import { makeEventEmitterClass, IEventEmitter } from "events-typed";

// @ts-ignore
const server_api_url = import.meta.env.VITE_SERVER_API_URL;

interface IResponseAuth {
    user_id: number;
    access_token: string;
    refresh_token: string;
    session_uuid: string;
    createDate: string;
}

interface IResponseTokens {
    createDate: string;
    access_token: string;
    refresh_token: string;
}

enum EnumAuthStatus {
    INIT,
    NO_AUTH,
    LOAD,
    AUTH,
}

interface IEvents {
    AUTH_LOAD: undefined;
    AUTH_YES: undefined;
    AUTH_NO: undefined;
}

class Api {
    private _user_id: string | null; // Идёт нахуй
    private _access_token: string | null;
    private _refresh_token: string | null; // Идёт в куки http only
    private _session_uuid: string | null; // Идёт в куки http only
    private _tokens_create_date: string | null; // Идёт нахуй
    private _auth_status: EnumAuthStatus = EnumAuthStatus.INIT;
    private readonly events: IEventEmitter<IEvents>;

    readonly http: AxiosInstance;

    get user_id() {
        const id = Number(this._user_id);
        return isNaN(id) ? 0 : id;
    }
    get session_uuid() {
        return this._session_uuid ?? "";
    }

    get on() {
        return this.events.on.bind(this.events);
    }
    get once() {
        return this.events.once.bind(this.events);
    }

    // TODO BroadcastChannel API

    constructor() {
        this._user_id = localStorage.getItem("user_id");
        this._access_token = localStorage.getItem("access_token");
        this._refresh_token = localStorage.getItem("refresh_token");
        this._session_uuid = localStorage.getItem("session_uuid");
        this._tokens_create_date = localStorage.getItem("tokens_create_date");
        this.events = new (makeEventEmitterClass<IEvents>())();

        window.addEventListener("storage", event => {
            switch (event.key ?? "") {
                case "user_id":
                    this._user_id = event.newValue;
                    break;
                case "access_token":
                    this._access_token = event.newValue;
                    break;
                case "refresh_token":
                    this._refresh_token = event.newValue;
                    break;
                case "session_uuid":
                    this._session_uuid = event.newValue;
                    break;
                case "tokens_create_date":
                    this._tokens_create_date = event.newValue;
                    break;
                case "auth_status":
                    switch (event.newValue) {
                        case "YES":
                            this.set_status_yes();
                            break;
                        case "LOAD":
                            this.set_status_load();
                            break;
                        case "NO":
                        default:
                            this.set_status_no();
                            break;
                    }
                    break;
            }
        });

        this.http = axios.create({
            baseURL: server_api_url,
            headers: {
                "x-access-token": this._access_token ?? "",
                "x-session-uuid": this._session_uuid ?? "",
            },
        });
        this.http.interceptors.request.use(this.axiosHandleRequest.bind(this));
        this.http.interceptors.response.use(
            undefined,
            this.axiosHandleResponseError.bind(this)
        );

        this.authInit().then(() => console.log("auth init"));
    }

    signup(nick: string, email: string, password: string, fid: string) {
        this.set_status_load();
        return this.http
            .post<IResponseAuth>("/api/v1/auth/password", {
                email,
                nick,
                password,
                fid,
            })
            .then(
                response => {
                    localStorage.setItem(
                        "user_id",
                        (this._user_id = response.data.user_id.toString())
                    );
                    localStorage.setItem(
                        "access_token",
                        (this._access_token = response.data.access_token)
                    );
                    localStorage.setItem(
                        "refresh_token",
                        (this._refresh_token = response.data.refresh_token)
                    );
                    localStorage.setItem(
                        "session_uuid",
                        (this._session_uuid = response.data.session_uuid)
                    );
                    localStorage.setItem(
                        "tokens_create_date",
                        (this._tokens_create_date = response.data.createDate)
                    );
                    this.set_status_yes();
                },
                err => {
                    this.set_status_no();
                    return Promise.reject(err);
                }
            );
    }

    authByEmail8Pass(email: string, password: string, fid: string) {
        this.set_status_load();
        return this.http
            .get<IResponseAuth>("/api/v1/auth/password", {
                headers: {
                    "x-auth-user": email,
                    "x-auth-key": password,
                    "x-fingerprint-id": fid,
                },
            })
            .then(
                response => {
                    localStorage.setItem(
                        "user_id",
                        (this._user_id = response.data.user_id.toString())
                    );
                    localStorage.setItem(
                        "access_token",
                        (this._access_token = response.data.access_token)
                    );
                    localStorage.setItem(
                        "refresh_token",
                        (this._refresh_token = response.data.refresh_token)
                    );
                    localStorage.setItem(
                        "session_uuid",
                        (this._session_uuid = response.data.session_uuid)
                    );
                    localStorage.setItem(
                        "tokens_create_date",
                        (this._tokens_create_date = response.data.createDate)
                    );
                    this.set_status_yes();
                },
                err => {
                    this.set_status_no();
                    return Promise.reject(err);
                }
            );
    }

    authSuperAccess(password: string) {}

    // Отправить запрос, чтобы выйти из учётки
    logout() {
        return this.http
            .get("/api/v1/auth/logout")
            .finally(() => this.resetAuthData());
    }

    private authInit() {
        this.set_status_load();
        return this.checkAuth()
            .catch(() => this.reAuth())
            .then(
                () => this.set_status_yes(),
                () => this.set_status_no()
            );
    }

    private reAuth() {
        if ((this._refresh_token?.length ?? 0) == 0) return Promise.reject();
        return this.http
            .get<IResponseTokens>("/api/v1/auth/refresh", {
                headers: {
                    "x-refresh-token": this._refresh_token ?? "",
                },
            })
            .then(
                response => {
                    localStorage.setItem(
                        "access_token",
                        (this._access_token = response.data.access_token)
                    );
                    localStorage.setItem(
                        "refresh_token",
                        (this._refresh_token = response.data.refresh_token)
                    );
                    localStorage.setItem(
                        "tokens_create_date",
                        (this._tokens_create_date = response.data.createDate)
                    );
                },
                err => {
                    this.resetAuthData();
                    return Promise.reject(err);
                }
            );
    }

    private checkAuth(): Promise<void> {
        const token_date = new Date(this._tokens_create_date ?? "").getTime();
        return Promise.resolve(token_date)
            .then(token_date => {
                if (
                    isNaN(token_date) ||
                    Date.now() - token_date > 1500000 /*25 минут*/
                )
                    return Promise.reject();
                return this.http.get("/api/v1/auth/check");
            })
            .then(({ data: is_auth }) => (is_auth ? void 0 : Promise.reject()));
    }

    private axiosHandleRequest(config: AxiosRequestConfig) {
        if (config.headers) {
            config.headers["x-session-uuid"] = this._session_uuid ?? "";
            config.headers["x-access-token"] = this._access_token ?? "";
        } else {
            config.headers = {
                "x-session-uuid": this._session_uuid ?? "",
                "x-access-token": this._access_token ?? "",
            };
        }
        if (
            this._auth_status != EnumAuthStatus.AUTH &&
            this._auth_status != EnumAuthStatus.NO_AUTH &&
            ![
                "/api/v1/auth/refresh",
                "/api/v1/auth/password",
                "/api/v1/auth/check",
                "/api/v1/auth/logout",
            ].includes(config.url ?? "")
        )
            return new Promise<void>(resolve => {
                if (
                    this._auth_status == EnumAuthStatus.AUTH ||
                    this._auth_status == EnumAuthStatus.NO_AUTH
                )
                    resolve();
                else {
                    this.events.once("AUTH_YES", () => resolve());
                    this.events.once("AUTH_NO", () => resolve());
                }
            }).then(() => config);
        return config;
    }
    private axiosHandleResponseError(err: any) {
        if (err instanceof AxiosError) {
            if (err.response && err.response.status == 401) {
                return this.checkAuth()
                    .catch(() => {
                        if (this._auth_status == EnumAuthStatus.LOAD)
                            return Promise.reject();
                        this.set_status_load();
                        return this.reAuth().then(
                            () => this.set_status_yes(),
                            () => {
                                this.set_status_no();
                                return Promise.reject(err);
                            }
                        );
                    })
                    .then(() => this.http.request(err.config));
            }
        }
        throw err;
    }

    private resetAuthData() {
        this.set_status_no();
        this._user_id = null;
        this._access_token = null;
        this._refresh_token = null;
        this._tokens_create_date = null;
        localStorage.removeItem("user_id");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("tokens_create_date");
    }
    private set_status_load() {
        this._auth_status = EnumAuthStatus.LOAD;
        localStorage.setItem("auth_status", "LOAD");
        this.events.emit("AUTH_LOAD");
    }
    private set_status_yes() {
        this._auth_status = EnumAuthStatus.AUTH;
        localStorage.setItem("auth_status", "YES");
        this.events.emit("AUTH_YES");
    }
    private set_status_no() {
        this._auth_status = EnumAuthStatus.NO_AUTH;
        localStorage.setItem("auth_status", "NO");
        this.events.emit("AUTH_NO");
    }
}

export default new Api();
