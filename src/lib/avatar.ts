// `next/image` only optimises remote images over https here (see the
// `images.remotePatterns` entry in next.config.ts), so anything else falls back
// to the bundled default avatar instead of crashing the image optimiser.
export const getAvatarUrl = (image?: string | null) =>
  image && /^https:\/\//i.test(image) ? image : "/default-avatar.jpg";
