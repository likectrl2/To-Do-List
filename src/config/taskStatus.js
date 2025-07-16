import { faPencil, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

export const STATUS_ITEMS = {
  'completed': { icon: faCheck, title: '完成' },
  'active': { icon: faPencil, title: '活跃' },
  'canceled': { icon: faXmark, title: '取消' },
}