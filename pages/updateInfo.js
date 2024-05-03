import React, { useState, useEffect } from 'react';
import { Inter } from "next/font/google";
import { fetchWithToken } from '../utils/api';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from "next/image";
import Link from 'next/link';

const inter = Inter({ subsets: ["latin"] });

export default function updateInfo() {

    const token = useSelector((state) => state.token);

    const router = useRouter();
    const [switchName, serSwitchName] = useState(false);
    const [switchPhone, serSwitchPhone] = useState(false);
    const [businessTypes, setBusinessTypes] = useState(null);
    const [allCountry, setAllCountry] = useState(null);
    const [countryById, setCountryById] = useState(1);
    const [countryByIdData, setCountryByIdData] = useState(null);

    const [infoData, setInfoData] = useState({
        businessTypeId: '',
        name: '',
        dba: '',
        ein: '',
        countryId: '',
        stateId: '',
        city: '',
        address: '',
        zip: '',
        faxNumber: '',
        email: '',
        phoneNumber: '',
        mobileNumber: '',
        sameAsPhone: '',
        authorName: '',
        signature: '',
        authorDate: '',
        sameBusinessName: '',
        id: '',
    });


    const changeSwitchName = (e) => {
        serSwitchName(e.target.checked)
    }

    const changeSwitchPhone = (e) => {
        serSwitchPhone(e.target.checked)
    }

    useEffect(() => {
        const path = router;
        const currentPath = parseInt(path.asPath.match(/\d+/), 10);
        fetchBusinessData(token, currentPath);
        fetchBusinessTypes(token)
        fetchAllCountry(token)
        fetchAllCountryById(token, countryById)
    }, [countryById]);

    const fetchBusinessData = async (token, currentPath) => {
        try {
            const response = await fetchWithToken(`https://api.2290onlineform.com/api/business/getBusinessById?id=${currentPath}`, token);
            const data = await response.json();
            setInfoData(data)
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };


    const fetchBusinessTypes = async (token) => {
        try {
            const response = await fetchWithToken(`https://api.2290onlineform.com/api/businessType/getAllBusinessType`, token);
            const data = await response.json();
            setBusinessTypes(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    const fetchAllCountry = async (token) => {
        try {
            const response = await fetchWithToken(`https://api.2290onlineform.com/api/country/getAllCountry`, token);
            const data = await response.json();
            setAllCountry(data)
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    const fetchAllCountryById = async (token, Id) => {
        try {
            const response = await fetchWithToken(`https://api.2290onlineform.com/api/state/getAllStateByCountry?id=${Id}`, token);
            const data = await response.json();
            setCountryByIdData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    const handleCountryIdChange = (e) => {
        setCountryById(e.target.selectedIndex + 1)
    }

    const changeActiveLink = (e, pageName) => {
        e.preventDefault();
        router.push(`/${pageName}`);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInfoData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePostData = (e) => {
        e.preventDefault();
        console.log(infoData)
        fetchWithToken(`https://api.2290onlineform.com/api/business/editBusiness`, token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(infoData)
        })
            .then((data) => {
                console.log(data)
                alert('success ✅')
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className={`main_content ${inter.className}`} >
            <Header />
            <div className='dashboard_container'>
                <div className='dashboard_menu'>
                    <div className='menu_inner'>
                        <a className='dashboard_link icon-link1 '
                            href="#"
                            onClick={(e) => changeActiveLink(e, 'dashboard')}
                        >
                            Dashboard
                        </a>
                        <a className='dashboard_link icon-work active_link'
                            href="#"
                            onClick={(e) => changeActiveLink(e, 'business')}
                        >
                            Business
                        </a>
                        <a className='dashboard_link icon-list'
                            href="#"
                        >
                            Update Info
                        </a>
                        <a className='dashboard_link icon-userCirlcle' href="#">My Profile</a>
                    </div>
                    <div className="menu_bottom">
                        <a href="#" className='inner_link icon-comment'>About 2290 Online Form</a>
                    </div>
                </div>
                <div className="info_table">
                    <div className='dashboard_content'>
                        <div className="content_title">Update Business Info.</div>
                        <div className="info_change_wrapper">
                            <div className="table_header">
                                <div className="header_title icon-edit">Update Business</div>
                            </div>
                            <div className="table_body">
                                <div className="info_line">
                                    <p className="icon-warning">Enter your business name, EIN, and address below. Make sure this information matches exactly with your IRS records because it will be automatically added to your return(s).</p>
                                </div>
                                <div className="business_detalis">
                                    <div className="table_header">
                                        <div className="header_title icon-user">Business Details</div>
                                    </div>
                                    {
                                        infoData &&
                                        <div className="info_content">
                                            <div className="first_line">
                                                <div className="line_left">
                                                    <div className="input_block">
                                                        <div className="input_label">Business Type <span>*</span></div>
                                                        <select className="table_sellect">
                                                            {businessTypes &&
                                                                businessTypes.map((businessType, i) =>
                                                                    <option key={i} value={businessType.id}>{businessType.name}</option>)
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className="input_block">
                                                        <div className="input_label">Business Name <span>*</span>  <span className="warning icon-warning"></span> </div>
                                                        <input type="text" placeholder="Business Name"
                                                            defaultValue={infoData.name}
                                                            value={infoData.name}
                                                            name='name'
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="input_block">
                                                        <div className="input_label">
                                                            DBA  <p>(Optional)</p>
                                                            <span className="warning icon-warning"></span>
                                                            <label className="switch">
                                                                <input type="checkbox" onChange={e => changeSwitchName(e)} />
                                                                <span className="slider"></span>
                                                            </label>
                                                            <p className="switch_text"> Same as Business name</p>
                                                        </div>
                                                        <input type="text" placeholder="Business Name" name='dba' defaultValue={infoData.dba} className={switchName ? 'disabled switch_input' : 'switch_input'} value={switchName ? infoData.name : ''} onChange={handleInputChange} />
                                                    </div>
                                                </div>
                                                <div className="image_block">
                                                    <div className="table_header">
                                                        <div className="header_title icon-list">Below is how your business details will be displayed on Form 2290</div>
                                                    </div>
                                                    <div className="image_inner">
                                                        <Image
                                                            priority="true"
                                                            className="login_img"
                                                            src="/images/infoImg.png"
                                                            // src={infoData.signature}
                                                            alt="Example Image"
                                                            layout='fill'
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="second_line">
                                                <div className="small_grid">
                                                    <div className="input_block">
                                                        <div className="input_label">EIN <span>*</span></div>
                                                        <input type="text"
                                                            defaultValue={infoData.ein}
                                                            value={infoData.ein}
                                                            name='ein'
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="input_block">
                                                        <div className="input_label">Confirm EIN <span>*</span></div>
                                                        <input type="text" placeholder=""
                                                            defaultValue={infoData.ein}
                                                            value={infoData.ein}
                                                            name='ein'
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="input_block">
                                                        <div className="input_label">Address <span>*</span></div>
                                                        <input type="text" placeholder=""
                                                            defaultValue={infoData.address}
                                                            value={infoData.address}
                                                            name='address'
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="input_block">
                                                        <div className="input_label">City <span>*</span></div>
                                                        <input type="text" placeholder=""
                                                            defaultValue={infoData.city}
                                                            value={infoData.city}
                                                            name='city'
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="input_block">
                                                        <div className="input_label">Country<span>*</span></div>
                                                        <select className="table_sellect"
                                                            onChange={e => handleCountryIdChange(e)}
                                                        >
                                                            {allCountry &&
                                                                allCountry.map((country, i) =>
                                                                    <option key={i} value={country.id}>{country.name}</option>
                                                                )}
                                                        </select>
                                                    </div>
                                                    <div className="input_block">
                                                        <div className="input_label">State<span>*</span></div>
                                                        <select className="table_sellect">
                                                            {countryByIdData &&
                                                                countryByIdData.map((country, i) =>
                                                                    <option key={i} value={country.id}>{country.name}</option>
                                                                )}
                                                        </select>
                                                    </div>
                                                    <div className="input_block">
                                                        <div className="input_label">Zip Cpde <span>*</span></div>
                                                        <input type="text" placeholder=""
                                                            defaultValue={infoData.zip}
                                                            value={infoData.zip}
                                                            name='zip'
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="input_block">
                                                        <div className="input_label">Fax Number <span>*</span></div>
                                                        <input type="text" placeholder=""
                                                            defaultValue={infoData.faxNumber}
                                                            value={infoData.faxNumber}
                                                            name='faxNumber'
                                                            onChange={handleInputChange} />
                                                    </div>
                                                    <div className="input_block">
                                                        <div className="input_label">Email Address <span>*</span></div>
                                                        <input type="text" placeholder=""
                                                            defaultValue={infoData.email}
                                                            value={infoData.email}
                                                            name='email'
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="input_block">
                                                        <div className="input_label">Phone Number <span>*</span></div>
                                                        <input type="text" placeholder=""
                                                            defaultValue={infoData.phoneNumber}
                                                            value={infoData.phoneNumber}
                                                            name='phoneNumber'
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="input_block textarea">
                                                        <div className="input_label">Signature  <span>*</span></div>
                                                        <div type="text" className='image_wrapper'>
                                                            <Image
                                                                priority="true"
                                                                className="login_img"
                                                                src={infoData.signature}
                                                                alt="Example Image"
                                                                layout='fill'
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="input_block">
                                                        <div className="input_label">Name <span>*</span></div>
                                                        <input type="text" placeholder=""
                                                            defaultValue={infoData.authorName}
                                                            value={infoData.authorName}
                                                            name='authorName'
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="input_block">
                                                        <div className="input_label">Date <span>*</span></div>
                                                        <input type="text" placeholder=""
                                                            defaultValue={infoData.authorDate}
                                                            value={infoData.authorDate}
                                                            name='authorDate'
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="input_block"></div>
                                                    <div className="input_block">
                                                        <div className="input_label">
                                                            Mobile <span className="right_to">*</span>
                                                            <label className="switch">
                                                                <input type="checkbox" onChange={e => changeSwitchPhone(e)} />
                                                                <span className="slider"></span>
                                                            </label>

                                                            <p className="switch_text"> Same as Phone </p>
                                                        </div>
                                                        <input type="text" placeholder="" value={switchPhone ? infoData.phoneNumber : infoData.mobileNumber} className={switchPhone ? 'disabled switch_input' : 'switch_input'} onChange={handleInputChange} name='phoneNumber' />
                                                    </div>
                                                    <div className="input_block">
                                                        <button type="button" className="">Clear Signature</button>
                                                    </div>
                                                    <div className="input_block"></div>
                                                    <div className="input_block">
                                                        <Link className='site_btn' href={'/dashboard'}>Cancel</Link>
                                                    </div>
                                                    <div className="input_block">
                                                        <button type="button" className="save" onClick={handlePostData} >Save and update</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
