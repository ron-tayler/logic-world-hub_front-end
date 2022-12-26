import { Module, Getters, Mutations, Actions } from "vuex-smart-module";

interface IResponseUserInfo {
    id: number;
    nick: string;
    balance: number;
    _2fa_status: boolean;
    is_dealer: boolean;
}

class UserState {
    id: number | null = null;
    nick: string | null = null;
    token: string | null = localStorage.getItem("wsToken") ?? null;
    _2fa_status: boolean = false;
}

class UserGetters extends Getters<UserState> {
    IS_AUTH() {
        return !!this.state.id;
    }
}

class UserMutations extends Mutations<UserState> {
    SET_TOKEN(token: string) {
        this.state.token = token;
        localStorage.setItem("wsToken", token);
    }

    SAVE_USER_INFO(info: IResponseUserInfo) {
        this.state.id = info.id;
        this.state.nick = info.nick;
        this.state._2fa_status = info._2fa_status;
    }
}

class UserActions extends Actions<UserState, UserGetters, UserMutations, UserActions> {

}

export const user = new Module({
    state: UserState,
    getters: UserGetters,
    mutations: UserMutations,
    actions: UserActions,
});
