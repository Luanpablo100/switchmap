import Link from 'next/link'
import Head from 'next/head'

import containerStyles from '../styles/container.module.css'

import {BsFillPlusSquareFill} from 'react-icons/bs'
import {BsGearFill} from 'react-icons/bs'
import { GoSignOut } from 'react-icons/go'

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal} from '@azure/msal-react';

import SignIn from './signIn';

function SignOutButton() {
    const { instance } = useMsal();
    
    return <GoSignOut onClick={() => instance.logoutRedirect()} className={containerStyles.reactIconsHeader}/>
  }

export default function Container({children}) {
    return (
        <>
            <AuthenticatedTemplate>
                <Head>
                    <title>Switchmap</title>
                    <meta name="description" content="Documentation to your network" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <div className={containerStyles.header}>
                    <Link href="/"><a><h1>Switchmap</h1></a></Link>
                    <div className={containerStyles.headerLinks}>
                        <Link href="/create"><a><BsFillPlusSquareFill className={containerStyles.reactIconsHeader}/></a></Link>
                        <Link href="/manage"><a><BsGearFill className={containerStyles.reactIconsHeader}/></a></Link>
                        <SignOutButton/>
                    </div>
                </div>
                <div className={containerStyles.hack}>
                    {children}
                </div>
        </AuthenticatedTemplate>

        <UnauthenticatedTemplate>
            <SignIn/>
        </UnauthenticatedTemplate>
        </>
    )
}