import jsPDF from "jspdf";
import "jspdf-autotable";

export default function exportPDF (data, departments) {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Switchmap report";
    const headers = [["Switch", "Porta", "Descrição", "Patch Panel", "Departamento"]];

    const pdfData = []

    data.Switchs.map(sw=> {
      sw.Ports.map(port => { 
        const portDepartment = departments.find(department => department.id === port.departId)
        pdfData.push([sw.codename, port.codename, port.desc, port.patchportdesc, portDepartment.codename])
      })

    });

    let content = {
      startY: 50,
      head: headers,
      body: pdfData
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("switchmapReport.pdf")
  }