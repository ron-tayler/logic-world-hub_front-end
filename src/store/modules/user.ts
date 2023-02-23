import { Module, Getters, Mutations, Actions } from "vuex-smart-module";
import axios from "axios";
import api from "@/api";
import { SyncPromise } from "@/lib/SyncPromise";

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

interface IResponseUserInfo {
    id: number;
    nick: string;
    avatar: string;
}

interface IResponseSession {
    uuid: string;
    ip: string;
    create_date: string;
    device: string;
    os: string;
    userAgent: string;
    name: string;
    fid: string;
}

class UserState {
    user_id: number;
    user_nick: string;
    user_avatar: string;
    sessions: IResponseSession[] = [];

    constructor() {
        const user_id = Number(localStorage.getItem("user_id"));
        this.user_id = isNaN(user_id) ? 0 : user_id;
        this.user_nick = "";
        this.user_avatar = "";
    }
}

class UserGetters extends Getters<UserState> {
    IS_AUTH() {
        return this.state.user_id > 0;
    }
}

class UserMutations extends Mutations<UserState> {
    SAVE_USER_INFO(info: IResponseUserInfo) {
        this.state.user_id = info.id;
        this.state.user_nick = info.nick;
        this.state.user_avatar = info.avatar;
    }
    SAVE_SESSIONS(sessions: IResponseSession[]) {
        this.state.sessions = sessions;
    }
}

class UserActions extends Actions<
    UserState,
    UserGetters,
    UserMutations,
    UserActions
> {
    AUTH_BY_EMAIL_AND_PASS({
        email,
        password,
        fid,
    }: {
        email: string;
        password: string;
        fid: string;
    }) {
        return api.authByEmail8Pass(email, password, fid);
    }
    SIGN_UP({
        email,
        nick,
        password,
        fid,
    }: {
        email: string;
        nick: string;
        password: string;
        fid: string;
    }) {
        return api.signup(nick, email, password, fid);
    }
    GET_USER_INFO() {
        return api.http
            .get<IResponseUserInfo>("/api/v1/user/get-info")
            .then(response => this.commit("SAVE_USER_INFO", response.data));
    }
    LOGOUT() {
        return api.logout();
    }
    LOAD_SESSIONS() {
        return api.http
            .get<IResponseSession[]>("/api/v1/auth/sessions")
            .then(response => {
                this.commit("SAVE_SESSIONS", response.data);
            });
    }
    SESSION_LOGOUT(uuid: string): Promise<void> {
        return api.http
            .put("/api/v1/auth/session-logout", { uuid })
            .then(() => {
                this.dispatch("LOAD_SESSIONS");
            });
    }
    ON_AUTH_YES() {
        return this.actions.GET_USER_INFO();
    }
    ON_AUTH_NO() {
        this.commit("SAVE_USER_INFO", {
            id: 0,
            nick: "",
            avatar: "",
        });
    }
}

export const user = new Module({
    state: UserState,
    getters: UserGetters,
    mutations: UserMutations,
    actions: UserActions,
});
