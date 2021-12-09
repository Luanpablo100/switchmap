import Link from 'next/link'
import Head from 'next/head'

import containerStyles from '../styles/container.module.css'
import iconsStyles from '../styles/icons.module.css'

import {BsFillPlusSquareFill} from 'react-icons/bs'
import {BsGearFill} from 'react-icons/bs'

export default function Container({children}) {
    return (
        <>
        <Head>
            <title>Switchmap</title>
            <meta name="description" content="Documentation to your network" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className={containerStyles.header}>
            <Link href="/switchmap"><a><h1>Switchmap</h1></a></Link>
            <div>
                <Link href="/switchmap/create"><a><BsFillPlusSquareFill className={iconsStyles.headerIcons}/></a></Link>
                <Link href="/switchmap/manage"><a><BsGearFill className={iconsStyles.headerIcons}/></a></Link>
            </div>
        </div>
        <div className={containerStyles.hack}>
            {children}
        </div>
        </>
    )
}