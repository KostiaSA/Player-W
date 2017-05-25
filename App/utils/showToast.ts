import Notifications, {notify} from "react-notify-toast";

export function showToast(text: string) {
    notify.show(text, "success", 2500)
}

export function showErrorToast(text: string) {
    notify.show(text, "error", 2500)
}
