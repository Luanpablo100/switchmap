document.querySelector(".insert-switch").addEventListener("click", () => { 
    let divPort = document.createElement("div")
    divPort.classList.add('port')
    let inputPort = document.createElement("input")
    inputPort.classList.add("input-port")
    divPort.appendChild(inputPort)
    document.querySelector(".switch").appendChild(divPort)
    addListenerOnPorts()
})

document.querySelector(".insert-ppanel").addEventListener("click", () => { 
    let divPort = document.createElement("div")
    divPort.classList.add('pport')
    let inputPort = document.createElement("input")
    inputPort.classList.add("input-port")
    divPort.appendChild(inputPort)
    document.querySelector(".ppanel").appendChild(divPort)
})

function addListenerOnPorts() {
    let allSwitchPorts = document.querySelectorAll(".switch .port input")
    allSwitchPorts.forEach(switchPort => {
        switchPort.addEventListener("keypress", (event) => {
            let portValue = event.target.value
            let valueInPorts = []
            if (event.key === "Enter") {
                let pports = document.querySelectorAll(".ppanel .pport input")
                pports.forEach(port => {
                    valueInPorts.push(port.value)                
                });
            }
            
            if (event.key === "Enter") {
                let isFind = valueInPorts.indexOf(portValue)
                if (isFind === -1) {
                    alert("Não encontrada!")
                } else {
                    alert(`Encontrada na porta ${isFind + 1}`)
                }
            }
        })
    });
}

addListenerOnPorts()
    