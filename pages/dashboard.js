// pages/dashboard.js
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

    useEffect(() => {
        const isAuthenticated = true;

        request(`https://api.2290onlineform.com/api/service/getAllDetailService`)
            .then((data) => {
                setServiceData(data);
                console.log(data)
            })
            .catch(error => {
                console.log(error);
            })

        if (!isAuthenticated) {
            router.push('/login');
        }
    }, []);


    return (
        <div className={`main_content ${inter.className}`} >
            <Header />
            <div className='dashboard_container'>
                <div className='dashboard_menu'>
                    <div className='menu_inner'>
                        <a className="dashboard_link icon-link1 active_link" href="#">Dashboard</a>
                        <a className="dashboard_link icon-work" href="#">Your business info</a>
                        <a className="dashboard_link icon-list" href="#">Filing List</a>
                        <a className="dashboard_link icon-userCirlcle" href="#">My Profile</a>
                    </div>
                    <div className="menu_bottom">
                        <a href="#" className='inner_link icon-comment'>About 2290 Online Form</a>
                    </div>
                </div>
                <div className='dashboard_content'>
                    <div className="content_title">Pricing for Filing 2290 Form</div>
                    <div className='content_description'>
                        Here at 2290 Online Form, we can complete all 2290-related filings for you! Add your business information to your account and have it saved to be used
                        <br />
                        for each filing you need. Then, select the item that you need to be filed, put in your truck(s) information, and we’ll do the rest for you!
                    </div>

                    <div className='dashboard_list'>
                        {serviceData ?
                            serviceData.map((item, index) =>
                                <div key={index} className='service_block'>
                                    <div className='service_image'>
                                        <Image
                                            className="login_img"
                                            src="/images/service1.png"
                                            alt="Example Image"
                                            width={264}
                                            height={90}
                                        />
                                        <span className="service_price">${item.ServicePrice.price}</span>
                                        <span className="service_icon icon-work"></span>
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
            </div>
            <Footer />
        </div>
    );
}
