import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Inter } from "next/font/google";
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import request from '@/components/request';
import PageLoader from '@/components/PageLoader';
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Dashboard() {
    const router = useRouter();
    const [serviceData, setServiceData] = useState(null);
    const [activeLink, setActiveLink] = useState('dashboard');

    useEffect(() => {
        request(`https://api.2290onlineform.com/api/service/getAllDetailService`)
            .then((data) => {
                setServiceData(data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const changeActiveLink = (e, activeLinkName) => {
        e.preventDefault();
        setActiveLink(activeLinkName);
        router.push(`/${activeLinkName}`);
    }

    return (
        <div className={`main_content ${inter.className}`} >
            <Header />
            <div className='dashboard_container'>
                <div className='dashboard_menu'>
                    <div className='menu_inner'>
                        <a className={activeLink !== 'dashboard' ? 'dashboard_link icon-link1' : 'dashboard_link icon-link1 active_link'}
                            href="/#"
                            onClick={(e) => changeActiveLink(e, 'dashboard')}
                        >
                            Dashboard
                        </a>
                        <a className={activeLink !== 'business' ? 'dashboard_link icon-work' : 'dashboard_link icon-work active_link'}
                            href="/#"
                            onClick={(e) => changeActiveLink(e, 'business')}
                        >
                            Business
                        </a>
                        <a className={activeLink !== 'UpdateInfo' ? 'dashboard_link icon-list' : 'dashboard_link icon-list active_link'}
                            href="/#"
                        >
                            Update Info
                        </a>
                        <a className={activeLink !== 'dashboard3' ? 'dashboard_link icon-userCirlcle' : 'dashboard_link userCirlcle active_link'} href="#">My Profile</a>
                    </div>
                    <div className="menu_bottom">
                        <a href="/#" className='inner_link icon-comment'>About 2290 Online Form</a>
                    </div>
                </div>
                {activeLink == 'dashboard' &&
                    <div className='dashboard_content'>
                        <div className="content_title">Pricing for Filing 2290 Form</div>
                        <div className='content_description'>
                            Here at 2290 Online Form, we can complete all 2290-related filings for you! Add your business information to your account and have it saved to be used
                            <br />
                            <br />
                            for each filing you need. Then, select the item that you need to be filed, put in your truck(s) information, and we’ll do the rest for you!
                        </div>
                        <div className='dashboard_list'>
                            {serviceData ?
                                serviceData.map((item, index) =>
                                    <div key={index} className='service_block'>
                                        <div className='service_image'>
                                            <Image
                                                priority="true"
                                                className="login_img"
                                                src={`data:image/gif;base64,${item.imageBase64}`}
                                                alt="Example Image"
                                                width={264}
                                                height={90}
                                            />
                                            <span className="service_price">${item.ServicePrice.price}</span>
                                            <span className="service_icon">
                                                <Image
                                                    priority="true"
                                                    className="login_img"
                                                    src={`data:image/svg+xml;base64,${item.iconBase64}`}
                                                    alt="Example Image"
                                                    width={80}
                                                    height={80}
                                                />
                                            </span>
                                        </div>
                                        <div className='service_title'>{item.title}</div>
                                        <a href="/#" className='service_btn icon-arrow'> File Now</a>
                                    </div>
                                )
                                :
                                <PageLoader />
                            }
                        </div>
                    </div>
                }

                {/* {activeLink == 'business' &&
                    <Buisnesses />
                }
                {activeLink == 'UpdateInfo' &&
                    <UpdateInfo />
                } */}

            </div>
            <Footer />
        </div>
    );
}
