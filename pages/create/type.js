import Container from '../../components/container'
import Link from 'next/link'
import InputComponent from '../../components/input'
import ButtonComponent from '../../components/button'

import createElement from '../../lib/fetch/create'
import styles from '../../styles/typeExample.module.css'
import { useEffect, useState } from 'react'

export default function Home() {

  const [colors, setColors] = useState([
    "#000000",
    "#FFFFFF",
    "#000000",
    "#FFFFFF",
    "#FFFFFF"
  ])

  function ExampleSwitch({swColors}) {
    return (
      <div id="switch" className={styles.switch} style={{backgroundColor: swColors[0], borderColor: swColors[1]}}>
        <div className={styles.ports} style={{backgroundColor: swColors[2]}}>
          <div className={styles.swport} id="port" style={{color: swColors[4]}} >
            1
            <div style={{backgroundColor: "#FFF"}} id="svgContainer">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlSpace="preserve"
                style={{
                  shapeRendering: "geometricPrecision",
                  textRendering: "geometricPrecision",
                  imageRendering: "optimizeQuality",
                  fillRule: "evenodd",
                  clipRule: "evenodd",
                }}
                viewBox="0 0 4334.92 4334.92"
              >
                <g id="Camada_x0020_1">
                  <g id="_2202454032320">
                    
                    <path
                      d="M829.72 1201.77v2372.64l313.97.71v-459.39c0-37.93-15.44-126.57 16.19-151.05l252.08-.19.95 607.08 322.74 3.68.09-610.84 270.4-2.37 1.17 613.04h323.12l-2.71-611.31 270.45-1.58 1.12 612.89 322.7-3.51.08-606.28 252.95-.61c13.4 10.37 17.91.88 16.79 66.02l-.6 544.38 313.97-.67V1201.77l-532.37-.07-.49-439.69H1362.08l-.06 438.74-532.3 1.02z"
                      style={{
                        fill: `${"#000"}`,
                      }}
                    />
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
        <div className={styles.swcode}>
          <h1>1</h1>
        </div>
      </div>
    )
  }

  async function handleCreateSwType(event) {

    event.preventDefault()

    const typeName = document.getElementById('inputTypeName').value
    const color1 = document.getElementById('inputTypeColor1').value
    const color2 = document.getElementById('inputTypeColor2').value
    const color3 = document.getElementById('inputTypeColor3').value
    const color4 = document.getElementById('inputTypeColor4').value
    const color5 = document.getElementById('inputTypeColor5').value
    const postData = {typeName: typeName, color1: color1, color2:color2, color3:color3, color4:color4, color5: color5}

    createElement('swtype', postData)
  }
  
  useEffect(() => {
    const color1 = document.getElementById('inputTypeColor1')
    const color2 = document.getElementById('inputTypeColor2')
    const color3 = document.getElementById('inputTypeColor3')
    const color4 = document.getElementById('inputTypeColor4')
    const color5 = document.getElementById('inputTypeColor5')
  
    color1.addEventListener("change", (event) => {
      document.getElementById("switch").style.backgroundColor = event.target.value
    })
    color2.addEventListener("change", (event) => {
      document.getElementById("switch").style.borderColor = event.target.value
    })
    color3.addEventListener("change", (event) => {
      document.getElementById("port").style.backgroundColor = event.target.value
    })
    color4.addEventListener("change", (event) => {
      document.getElementById("svgContainer").style.backgroundColor = event.target.value
    })
    color5.addEventListener("change", (event) => {
      document.getElementById("port").style.color = event.target.value
    })
  }, [])

  

  return (
      <Container>
        <div>
          <div>
            <Link href={'/create/'}><a className='returnLink'>Voltar</a></Link>
            
            <h1>Adicionar estilo</h1>
          </div>
          <ExampleSwitch swColors={colors}/>
          <div>
            <form method='POST' onSubmit={handleCreateSwType}>
              <InputComponent labelDesc={"Nome do estilo"} identify={'inputTypeName'}/>

              <div style={{display: 'grid', gridTemplateColumns: "2fr 2fr", gap: '10px'}}>
                <InputComponent labelDesc={"Cor de fundo"} identify={'inputTypeColor1'} type={'color'}></InputComponent>
                <InputComponent labelDesc={"Cor da borda"} identify={'inputTypeColor2'} type={'color'}></InputComponent>
                <InputComponent labelDesc={"Cor de fundo dos números"} identify={'inputTypeColor3'} type={'color'}></InputComponent>
                <InputComponent labelDesc={"Entorno das portas"} identify={'inputTypeColor4'} type={'color'}></InputComponent>
                <InputComponent labelDesc={"Cor do texto"} identify={'inputTypeColor5'} type={'color'}></InputComponent>
              </div>
              <ButtonComponent>Enviar</ButtonComponent>
            </form>
          </div>
        </div>
      </Container>
  )
}
