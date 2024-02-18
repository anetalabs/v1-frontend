import { NavigationType } from "../../types/leftbar";

export const navigationLeftbar: NavigationType[] = [
  {
    name: "Bridge",
    href: "/",
    icon: "/images/icons/arrow-repeat.svg#icon",
    current: false,
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "/images/icons/grid.svg#icon",
    current: false,
  },
  {
    name: "Claim Rewards",
    href: "https://app.tosidrop.io/cardano/claim",
    icon: "/images/icons/bank.svg#icon",
    current: false,
  },
  {
    name: "Feedback",
    href: "/feedback",
    icon: "/images/icons/comment.svg#icon",
    current: false,
  },
  {
    name: "Docs",
    href: "https://docs.anetabtc.io",
    icon: "/images/icons/file-earmark-text.svg#icon",
    current: false,
  },
];

export const socialLinks = [
  {
    name:  'twitter',
    url: 'https://twitter.com/anetaBTC',
    icon: '/images/icons/twitter.svg#icon'
  },
  {
    name:  'telegram',
    url: 'https://t.me/anetaBTC',
    icon: '/images/icons/telegram.svg#icon'
  },
  {
    name:  'discord',
    url: 'https://discord.com/invite/ScXG76dJXM',
    icon: '/images/icons/discord.svg#icon'
  },
  {
    name:  'medium',
    url: 'https://medium.com/@anetaBTC',
    icon: '/images/icons/medium.svg#icon'
  },
  {
    name:  'github',
    url: 'https://github.com/anetaBTC',
    icon: '/images/icons/github.svg#icon'
  }
]
