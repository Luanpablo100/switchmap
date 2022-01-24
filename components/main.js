import Container from './container'
import SwitchElement from './switchElement'
import Select from './select'
import ButtonComponent from './button'

import Link from 'next/link'

import { HiFilter } from 'react-icons/hi'
import { ImCross, ImSearch } from 'react-icons/im'
import { BiReset } from 'react-icons/bi'
import { MdOutlineSubtitles } from 'react-icons/md'
import { VscFilePdf } from 'react-icons/vsc'

import styles from '../styles/hack.module.css'

export default function Homepage({resetHackShown, originData, setHackShown, showSubtitles, groups, hackData, departments, departmentData, filterPorts, cancelFilter, search, handleSavePDF, swTypes}) {
    // console.log(hackData)

    if (hackData === undefined) { //If database are empty
        return (
            <Container>
                <div className={styles.centerDiv}>
                    <h2>Seu banco de dados está vazio!</h2>
                    <h3>Primeiro, crie um hack!</h3>
                    <Link href='/switchmap/create/hack'><a>Criar hack</a></Link>
                    <BiReset onClick={resetHackShown} className='reactIcons'/>
                </div>
            </Container>
        )
    } else if (hackData.Switchs[0] === undefined){ //If has no one switch
        return (
            <Container>
                <div className={styles.centerDiv}>
                <h2>Não há switchs para serem exibidos neste hack!</h2>
                <Link href='/switchmap/create/switch'><a>Criar switch</a></Link>

                <div  className={styles.controls}>
                    <div className={styles.controlChild}>
                    <Select identify={'inputSetHackShown'} data={originData}/>
                    <div className={styles.controlGrandSon}>
                        <ButtonComponent onFunction={setHackShown}>Filtrar</ButtonComponent>
                        <BiReset onClick={resetHackShown} className='reactIcons'/>
                    </div>
                    </div>
                </div>
                </div>
        </Container>
        )
    } else {
        return ( //Else, if are content on database, they will render the container with data
            <Container>
                <div className={styles.divSubtitles}>
                <MdOutlineSubtitles size={50} onClick={showSubtitles} style={{cursor:'pointer'}}/>
                <div id="subtitles" className={styles.subtitles}>
                {groups.map(group => (
                    <div key={group.id} className={styles.subtitle}>
                    <div style={{backgroundColor: group.color}} className={styles.subtitleColor}></div>
                    <span>{group.codename}</span>
                    </div>
                ))}
                </div>
                </div>
                <div>
                <div className={styles.searchDiv}>
                <form onKeyUp={search} onSubmit={search}>
                    <input className={styles.serchInput}/>
                </form>
                <ImSearch size={20}/>
                </div>
                {
                    hackData.Switchs.map(sw => (
                    <SwitchElement sw={sw} key={sw.id} hackData={hackData} departments={departments} types={swTypes}/>
                    ))
                }

                <div className={styles.controls}>
                    <div className={styles.controlChild}>
                    <Select data={departmentData} identify={'departmentSelectFilter'}/>
                    <div className={styles.controlGrandSon}>
                        <HiFilter onClick={filterPorts} className='reactIcons iconFilter'/>
                        <ImCross onClick={cancelFilter} className='reactIcons iconFilter'/>
                    </div>
                    </div>
                    <div className={styles.controlChild}>
                    <Select identify={'inputSetHackShown'} data={originData} firstValue={hackData.id}/>
                    <div className={styles.controlGrandSon}>
                        <ButtonComponent onFunction={setHackShown}>Filtrar</ButtonComponent>
                        <BiReset onClick={resetHackShown} className='reactIcons'/>
                        <VscFilePdf size={30} onClick={handleSavePDF} style={{cursor:'pointer'}}/>
                    </div>
                    </div>
                </div>
                </div>
            </Container>
        )
    }
}