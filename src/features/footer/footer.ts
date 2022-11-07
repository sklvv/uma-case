import classes from "./Footer.module.css";
import facebook from "@/shared/assets/facebook.svg";
import twitter from "@/shared/assets/twitter.svg";
import ld from "@/shared/assets/ld.svg";

export function Footer() {
  return `
    <footer class="${classes.footer}">
     <div class="${classes.text}">
        ALL RIGHTS RESERVED. COPYRIGHT © <span class="${classes.companyName}">CKDIGITAL</span>
     </div>
     <div class="${classes.socialLinks}">
            <a href="https://www.facebook.com/ckdigital" target="_blank" title="Follow on Facebook">
                <img src=${facebook} alt="Follow on Facebook"/>
            </a>  
        <a href="https://twitter.com/ckdigital" target="_blank" title="Follow on Twitter">
            <img src=${twitter} alt="Follow on Twitter"/>
        </a>
        <a href="https://ng.linkedin.com/company/ckdigital" target="_blank" title="Follow on LinkedIn">
            <img src=${ld} alt="Follow on Facebook"/>
        </a>
     </div>
    </footer>
    `;
}
