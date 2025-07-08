import React from "react";
import Logo from "../../assets/svgs/nav_logo.svg";
import telegram from "../../assets/svgs/telegram2.svg";
import twitter from "../../assets/svgs/twitter2.svg";
import discord from "../../assets/svgs/discord.svg";
import solana from "../../assets/svgs/Solana_light.svg";
import spiderweb from "../../assets/svgs/spider_web2.svg";

const footerLinks = [
  {
    text: "Dex Stats",
    link: "#",
    disabled: true
  },
  {
    text: "Documentation",
    link: "#",
    disabled: true
  },
  {
    text: "Whitepaper",
    link: "#",
    disabled: true
  },
  {
    text: "CoinMarketCap",
    link: "#",
    disabled: true
  },
  {
    text: "Swap",
    link: "#",
    disabled: true
  },
  {
    text: "Liquidity",
    link: "#",
    disabled: true
  },
  {
    text: "Stake",
    link: "https://968b-65-21-71-244.ngrok-free.app/",
    disabled: false
  },
  {
    text: "Farm",
    link: "#",
    disabled: true
  },
  {
    text: "Launchpad",
    link: "#",
    disabled: true
  },
  {
    text: "FAQ",
    link: "#",
    disabled: true
  },
  {
    text: "Support",
    link: "#",
    disabled: true
  },
  {
    text: "Disclaimer",
    link: "#",
    disabled: true
  },
  {
    text: "Get start with Solena",
    link: "#",
    disabled: true
  },
];

const Footer = () => {
  const firstFour = footerLinks.slice(0, 4);
  const nextFive = footerLinks.slice(4, 9);
  const remaining = footerLinks.slice(9);
  return (
    <>
      <nav className="md:flex flex-row justify-between px-14 py-28 mt-5 hidden">
        <img
          src={spiderweb}
          alt=""
          height={200}
          width={250}
          className=" absolute md:right-[10%] right-0 transform md:-translate-y-[100%] -translate-y-[100%] -z-50"
        />
        <div className="flex flex-col items-center justify-around">
          <img
            src={solana}
            alt=""
            width={250}
            height={100}
            style={{ position: "absolute", transform: "translateY(-50px) translateY(-50px)" }}
          />
          <img src={Logo} alt="Logo" width={50} height={50} />
          <p className="text-[#7979AC] font-medium text-sm">Copyright © 2024</p>
        </div>

        <div className="flex flex-col font-medium text-sm text-[#7979AC] gap-10">
          {firstFour.map(item => (
            <NavItem key={item.text} link={item.link} text={item.text} disabled={item.disabled} />
          ))}
        </div>
        <div className="flex flex-col font-medium text-sm text-[#7979AC] gap-10">
          {nextFive.map(item => (
            <NavItem key={item.text} link={item.link} text={item.text} disabled={item.disabled} />
          ))}
        </div>
        <div className="flex flex-col font-medium text-sm text-[#7979AC] gap-10">
          {remaining.map(item => (
            <NavItem key={item.text} link={item.link} text={item.text} disabled={item.disabled} />
          ))}
        </div>

        <div className="flex flex-col font-medium text-sm text-[#7979AC] gap-10">
          <p>Follow us on</p>
          <SocialLink icon={twitter} text="Twitter" link="https://twitter.com/solenaai" />
          <SocialLink icon={telegram} text="Telegram" link="https://t.me/SolenaAI" />
          <SocialLink icon={discord} text="Discord" />
        </div>
      </nav>
    </>
  );
};

const NavItem = ({ link, text, disabled }) => (
  <a
    href={link}
    className={`${disabled === true ? 'cursor-not-allowed' : 'text-[#ECFDFF] cursor-pointer  '} hover:text-[#3ED3B5] transition-colors duration-300 ease-in-out`}
    onClick={(e) => {
      if (disabled) {
        e.preventDefault();
      }
    }}>
    {text}
  </a>
);

const SocialLink = ({ icon, text, link }) => (
  <a href={link} target="_blank" className="flex flex-row gap-4">
    <img src={icon} alt={text} className="w-[16px]" />
    <NavItem link={link} text={text} />
  </a>
);

export default Footer;
