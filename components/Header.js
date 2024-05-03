import React, { useState , useEffect} from 'react'
import Image from "next/image";
import { Twirl as Hamburger } from 'hamburger-react'
import { fetchWithToken } from '../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { setToken } from '../redux/reducers/authSlice';

export default function Header() {
    const [isOpen, setOpen] = useState(false)
    const [userData, setUserData] = useState(null);
    const router = useRouter();
    const dispatch = useDispatch();

    const token = useSelector((state) => state.token);

    useEffect(() => {

        console.log('localSTORIGEE' ,  localStorage.getItem('token'));
        console.log('REDUX' , token);

        if (!token && !localStorage.getItem('token') ) {
            router.push('/login');
        }
        fetchData(token);      
        fetchData2(token);

    }, []);

    const handleLogOut = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        dispatch(setToken(null));
        router.push('/login');
    }
  
    const fetchData = async (token) => {
        try {
          const response = await fetchWithToken('https://api.2290onlineform.com/api/manageUser/getInfoFromToken', token);
          const data = await response.json();
          setUserData(data);
          console.log('header-data' ,  data);
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
        }
    };

    // const fetchData2 = async (token) => {
    //     try {
    //       const response = await fetchWithToken('https://api.2290onlineform.com/api/state/getAllStateByCountry?id=1', token);
    //       const data = await response.json();
    //       console.log('bussnessssssss----' , data);
    //     } catch (error) {
    //       console.error('Error fetching data:', error);
    //       throw error;
    //     }
    // };


    return (
        <header className='header'>
            <div className="custom_container">
                <div className="header_logo">
                    <a href='/#'>
                        <Image
                            priority="true"
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
                        <div className="user_name icon-userCirlcle">{ userData && userData.username}</div>
                        <Hamburger rounded toggled={isOpen} toggle={setOpen} color="#F59720" />
                    </div>
                </div>
            </div>
            <div className={ isOpen ? 'header_menu opened' : `header_menu`}>
                <div className="menu_inner">
                    <a href="tel:+8005306774" className='menu_link link-call icon-operator'>{ userData && userData.phoneNumber}</a>
                    <a href="mailto: name@email.com" className='menu_link link-message icon-message'>{userData && userData.email}</a>
                    <a href="mailto: name@email.com" className='menu_link icon-global'>English Spanish</a>
                    <a href="/#"> My Profile</a>
                    <a href="/#"> Dashboard</a>
                    <a href="/#"> Support</a>
                    <a href="/#"> FAQ</a>
                    <a href="/#"> Blog</a>
                    <a href="/#"> News</a>
                    <a href="/#" onClick={(e)=> handleLogOut(e)}> LogOut</a>
                </div>
            </div>
        </header>
    )
}
