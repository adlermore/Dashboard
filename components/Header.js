import React, { useState } from 'react'
import Image from "next/image";
import { Twirl as Hamburger } from 'hamburger-react'

export default function Header() {
    const [isOpen, setOpen] = useState(false)

    return (
        <header className='header'>
            <div className="custom_container">
                <div className="header_logo">
                    <a href='/#'>
                        <Image
                            className="login_img"
                            src="/images/logo.png"
                            alt="Example Image"
                            width={264}
                            height={90}
                        />
                    </a>
                </div>
                <div className="user_wrapper">
                    <div className="user_info">
                        <div className="user_name icon-userCirlcle">Welcome User</div>
                        <Hamburger rounded toggled={isOpen} toggle={setOpen} color="#F59720" />
                    </div>
                </div>
            </div>
            <div className={ isOpen ? 'header_menu opened' : `header_menu`}>
                <div className="menu_inner">
                    <a href="tel:+8005306774" className='menu_link link-call icon-operator'>( 800 ) 530 - 6774</a>
                    <a href="mailto: name@email.com" className='menu_link link-message icon-message'>info@2290onlineform.com</a>
                    <a href="mailto: name@email.com" className='menu_link icon-global'>English Spanish</a>
                    <a href="/#"> My Profile</a>
                    <a href="/#"> Dashboard</a>
                    <a href="/#"> Support</a>
                    <a href="/#"> FAQ</a>
                    <a href="/#"> Blog</a>
                    <a href="/#"> News</a>
                    <a href="/#"> LogOut</a>
                </div>
            </div>
        </header>
    )
}
