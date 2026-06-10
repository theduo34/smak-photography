import { FaInstagram, FaTiktok, FaSnapchat, FaYoutube } from "react-icons/fa6";
import type { IconType } from "react-icons";

export const socialIcons: Record<string, IconType> = {
  Instagram: FaInstagram,
  TikTok: FaTiktok,
  Snapchat: FaSnapchat,
  YouTube: FaYoutube,
};

export const socialBrandColors: Record<string, string> = {
  Instagram: "text-instagram",
  TikTok: "text-tiktok",
  Snapchat: "text-snapchat",
  YouTube: "text-youtube",
};
