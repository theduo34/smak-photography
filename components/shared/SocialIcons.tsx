import type { SVGProps } from "react";

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.5 2c.3 2.1 1.5 3.8 3.5 4.4v3.1a6.8 6.8 0 0 1-3.5-1.1v6.4a5.9 5.9 0 1 1-5.9-5.9c.2 0 .4 0 .6.03v3.1a2.8 2.8 0 1 0 2 2.7V2z" />
    </svg>
  );
}

export function SnapchatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.5c3.2 0 5.2 2.4 5.2 5.7 0 .9.04 1.7.1 2.4.9.2 1.7.6 2.2 1.1.3.3.2.8-.2.9-.8.2-1.4.5-1.6.9-.2.4.05.9.6 1.3.7.5 1.6.9 2.5 1.1.3.07.5.4.4.7-.2.7-1.2 1-2.1 1.1-.1.3-.3.8-.7 1-.5.2-1.2.04-1.8-.05-.7-.1-1.4.07-1.9.5-.6.5-1.3.9-2.6.9s-2-.4-2.6-.9c-.5-.4-1.2-.6-1.9-.5-.6.09-1.3.25-1.8.05-.4-.2-.6-.7-.7-1-.9-.1-1.9-.4-2.1-1.1-.1-.3.1-.6.4-.7.9-.2 1.8-.6 2.5-1.1.55-.4.8-.9.6-1.3-.2-.4-.8-.7-1.6-.9-.4-.1-.5-.6-.2-.9.5-.5 1.3-.9 2.2-1.1.06-.7.1-1.5.1-2.4 0-3.3 2-5.7 5.2-5.7z" />
    </svg>
  );
}

export function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

export const socialIcons: Record<string, (props: SVGProps<SVGSVGElement>) => React.JSX.Element> = {
  Instagram: InstagramIcon,
  TikTok: TikTokIcon,
  Snapchat: SnapchatIcon,
  YouTube: YoutubeIcon,
};
