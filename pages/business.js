import React, { useState, useEffect } from 'react';
import { Inter } from "next/font/google";
import { fetchWithToken } from '../utils/api';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import PageLoader from '@/components/PageLoader';

const inter = Inter({ subsets: ["latin"] });

export default function business() {
    const router = useRouter();
    const [businessData, setBusinessData] = useState(null);
    const token = useSelector((state) => state.token);

    useEffect(() => {
        fetchBusinessData(token);
    }, []);

    const fetchBusinessData = async (token) => {
        try {
            const response = await fetchWithToken('https://api.2290onlineform.com/api/business/getAllBusinessByUserRef', token);
            const data = await response.json();
            setBusinessData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    const changeActiveLink = (e, pageName) => {
        e.preventDefault();
        router.push(`/${pageName}`);
    }

    return (
        <div className={`main_content ${inter.className}`} >
            <Header />
            <div className='dashboard_container'>
                <div className='dashboard_menu'>
                    <div className='menu_inner'>
                        <a className='dashboard_link icon-link1 '
                            href="/#"
                            onClick={(e) => changeActiveLink(e, 'dashboard')}
                        >
                            Dashboard
                        </a>
                        <a className='dashboard_link icon-work active_link'
                            href="/#"
                            onClick={(e) => changeActiveLink(e, 'business')}
                        >
                            Business
                        </a>
                        <a className='dashboard_link icon-list'
                            href="/#"
                        >
                            Update Info
                        </a>
                        <a className='dashboard_link icon-userCirlcle' href="/#">My Profile</a>
                    </div>
                    <div className="menu_bottom">
                        <a href="/#" className='inner_link icon-comment'>About 2290 Online Form</a>
                    </div>
                </div>
                <div className="buissness_table">
                    <div className='dashboard_content'>
                        <div className="content_title">Manage Businesses</div>
                        <div className="buisness_table_wrapper">
                            <div className="table_header">
                                <div className="inner_line">
                                    <div className="list_title icon-work">List of Businesses</div>
                                    <a href="/#" className="add_buissnes_btn icon-plus">Add new Business</a>
                                </div>
                            </div>
                            <div className="table_content">
                                {businessData ?
                                    businessData.map((buissness, index) =>
                                        <div key={index} className="business_table">
                                            <div className="inner_header">
                                                <div className="header_title">EIN</div>
                                                <div className="header_title">Business Info.</div>
                                                <div className="header_title">File Now</div>
                                                <div className="header_title">Actions</div>
                                            </div>
                                            <div className="info_grid">
                                                <div className="info_block">{buissness.ein}</div>
                                                <div className="info_block">{buissness.dba}</div>
                                                <div className="info_block">
                                                    <select className="table_sellect">
                                                        <option value="a">Select One ...</option>
                                                        <option value="b">b</option>
                                                        <option value="c">c</option>
                                                        <option value="d">d</option>
                                                    </select>
                                                </div>
                                                <div className="info_block">
                                                    <Link href={`updateInfo?${buissness.id}`} className="edit_btn icon-edit">Edit</Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                    :

                                    <div className='business_loader'>
                                        <PageLoader />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
