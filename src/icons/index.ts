import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
    faTimes,
    faStar,
    faDownload,
    faIndent,
    faShare,
    faUser,
    faHouse,
    faBook,
    faBell,
    faList,
    faChevronLeft,
    faChevronRight,
    faAnglesUp,
    faComments,
    faCommentSlash,
    faReply,
    faBookmark,
    faPen,
    faBug,
    faBan
} from "@fortawesome/free-solid-svg-icons";
import {
    faGithub
} from "@fortawesome/free-brands-svg-icons"
import Vue from "vue";

library.add(faTimes)
library.add(faStar)
library.add(faDownload)
library.add(faIndent)
library.add(faShare)
library.add(faUser)
library.add(faHouse)
library.add(faBook)
library.add(faGithub)
library.add(faBell)
library.add(faList)
library.add(faChevronLeft)
library.add(faChevronRight)
library.add(faAnglesUp)
library.add(faComments)
library.add(faCommentSlash)
library.add(faReply)
library.add(faBookmark)
library.add(faPen)
library.add(faBug)
library.add(faBan)

Vue.component("font-awesome-icon", FontAwesomeIcon);
