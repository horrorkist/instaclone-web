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
