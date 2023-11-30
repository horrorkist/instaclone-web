export function getPhotoUrl({ id, variant }: { id: string; variant?: string }) {
  return `https://imagedelivery.net/a9xaKxLjpK4A_4a8CoEUJg/${id}/${
    variant || "public"
  }`;
}

export function formatPhotoCreatedAt(createdAt: string) {
  const diff = new Date().getTime() - Number(createdAt);

  if (diff < 1000 * 60) {
    // 1분
    return "방금 전";
  }

  if (diff < 1000 * 60 * 60) {
    // 1시간
    return `${Math.floor(diff / (1000 * 60))}분 전`;
  }

  if (diff < 1000 * 60 * 60 * 24) {
    // 1일
    return `${Math.floor(diff / (1000 * 60 * 60))}시간 전`;
  }

  if (diff < 1000 * 60 * 60 * 24 * 7) {
    // 1주
    return `${Math.floor(diff / (1000 * 60 * 60 * 24))}일 전`;
  }

  if (diff < 1000 * 60 * 60 * 24 * 30) {
    // 1달
    return `${Math.floor(diff / (1000 * 60 * 60 * 24 * 7))}주 전`;
  }

  if (diff < 1000 * 60 * 60 * 24 * 365) {
    // 1년
    return `${Math.floor(diff / (1000 * 60 * 60 * 24 * 30))}달 전`;
  }

  return `${Math.floor(diff / (1000 * 60 * 60 * 24 * 365))}년 전`;
}

type Size = "sm" | "md" | "lg" | "xl";

export function getAvatarSize(size: Size) {
  switch (size) {
    case "sm":
      return "w-4 h-4";
    case "md":
      return "w-7 h-7";
    case "lg":
      return "w-10 h-10";
    case "xl":
      return "w-14 h-14";
  }
}

export function formatDate(date: string) {
  const weekDay = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const d = new Date(Number(date));
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();

  return `${year}.${month}.${day} ${weekDay[d.getDay()]}`;
}

export function formatMessageTime(date: string) {
  const d = new Date(Number(date));
  const hours = d.getHours();
  const minutes = d.getMinutes();

  return `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
}

export function nodeContainsChild(node: Element, child: Element) {
  let current: Element | null = child;

  while (current && current !== node) {
    current = current.parentElement;
    console.log("current : ", current);
  }

  if (current) return true;

  return false;
}
