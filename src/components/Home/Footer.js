import React from 'react';
import logo from '../../assets/images/logo2.png';
import discord from '../../assets/images/discord.svg'
import reddit from '../../assets/images/reddit-blue.svg'
import twitter from '../../assets/images/twitter-blue.svg'

export default function Footer() {

  return (
    <div>
        <div className="grid  grid-cols-6 md:grid-cols-7 gap-4 p-6 py-12" style={{backgroundColor:"#310045"}}>
            <div className='col-span-3 sm:col-span-2  md:col-span-1 '>
                <img src={logo} width="80px" height="80px" alt="logo" className="float-left" />
                <p className="text-white font-bold text-lg">Mintable</p>
                <br/>
                <br/>
                <p className="text-white font-bold text-base pb-4">Join our community</p>
                <ul className="text-white items-center">
                    <li className="inline-block p-1"><a href="#"><img src={discord} width="30px" height="30px" alt="twitter"/></a></li>
                    <li className="inline-block p-1 pb-2"><a href="#"><img src={reddit} width="30px" height="30px" alt="twitter" style={{borderRadius:"50%"}}/></a></li>
                    <li className="inline-block p-1 pb-2"><a href="#"><img src={twitter} width="30px" height="30px" alt="twitter" /></a></li>
                </ul>
                
            </div>
            <div className='col-span-3 sm:col-span-2  md:col-span-1'>
                <p className="text-white font-bold text-base pb-4">My account</p>
                <ul className="text-white ">
                    <li><a href="#">Create a store</a></li>
                    <li><a href="#">List an Item for sale</a></li>
                    <li><a href="#">My Profile</a></li>
                    <li><a href="#">Browse digital items</a></li>
                </ul>
            </div>
            <div className='col-span-3 sm:col-span-2  md:col-span-1'>
                <p className="text-white font-bold text-base pb-4">Need Help?</p>
                <ul className="text-white ">
                    <li><a href="#">Help and support</a></li>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="#">Chat with us</a></li>
                    <li><a href="#">Contact us</a></li>
                </ul>
            </div>
            <div className='col-span-3 sm:col-span-2  md:col-span-1'>
                <p className="text-white font-bold text-base pb-4">Buy an Item</p>
                <ul className="text-white ">
                    <li><a href="#">Browse Digital Items</a></li>
                    <li><a href="#">Browse Stores</a></li>
                    <li><a href="#">Where to buy NFTs</a></li>
                </ul>
            </div>
            <div className='col-span-3 sm:col-span-2  md:col-span-1'>
                <p className="text-white font-bold text-base pb-4">Go pro</p>
                <ul className="text-white ">
                    <li><a href="#">Pro services</a></li>
                </ul>
            </div>
            <div className='col-span-3 sm:col-span-2  md:col-span-1'>
                <p className="text-white font-bold text-base pb-4">Resources</p>
                <ul className="text-white ">
                    <li><a href="#">Press and Media</a></li>
                </ul>   

            </div>
            <div className='col-span-3 sm:col-span-2  md:col-span-1'>
                <p className="text-white font-bold text-base pb-4">Legal</p>
                <ul className="text-white ">
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Terms of use</a></li>
                </ul>
            </div>
            

        </div>
        <div>
            
        </div>
    
          
         
    </div>
  );
}
