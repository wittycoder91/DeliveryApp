import { jsPDF } from 'jspdf'
import { Bounce, toast } from 'react-toastify'

export const showSuccessMsg = (msg) => {
  toast.success(msg, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
  })
}

export const showWarningMsg = (msg) => {
  toast.warning(msg, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
  })
}

export const showErrorMsg = (msg) => {
  toast.error(msg, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
  })
}

// Calculate US holidays
export const calculateHolidays = (year) => {
  const getNthDayOfMonth = (nth, dayOfWeek, month) => {
    const firstDay = new Date(year, month, 1)
    const firstDayOfWeek = firstDay.getDay()
    const offset = (dayOfWeek - firstDayOfWeek + 7) % 7
    return new Date(year, month, 1 + offset + (nth - 1) * 7)
  }

  const getLastDayOfMonth = (dayOfWeek, month) => {
    const lastDay = new Date(year, month + 1, 0)
    const lastDayOfWeek = lastDay.getDay()
    const offset = (lastDayOfWeek - dayOfWeek + 7) % 7
    return new Date(year, month + 1, 0 - offset)
  }

  return [
    new Date(year, 0, 1),
    getNthDayOfMonth(3, 1, 0),
    getNthDayOfMonth(3, 1, 1),
    getLastDayOfMonth(1, 4),
    new Date(year, 5, 19),
    new Date(year, 6, 4),
    getNthDayOfMonth(1, 1, 8),
    getNthDayOfMonth(2, 1, 9),
    new Date(year, 10, 11),
    getNthDayOfMonth(4, 4, 10),
    new Date(year, 11, 25),
  ]
}
// Generate BOL PDF file
export const downloadInvoicePDF = (
  userName,
  userAddress,
  userCity,
  userState,
  userZipcode,
  selPO,
  selWegiht,
) => {
  const doc = new jsPDF('p', 'pt', 'a4')
  const marginX = 40
  let currentY = 30
  const rowHeight = 20
  const pageWidth = doc.internal.pageSize.getWidth()

  // Title
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.text('Bill of Lading', 210, currentY, { align: 'center' })

  // Bill Date
  currentY += 10
  doc.setFontSize(10)
  // Right-align: Calculate the position dynamically
  const currentDate = new Date()
  const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`
  const billDateText = `Bill Date: ${formattedDate}`
  const billDateWidth = doc.getTextWidth(billDateText)
  // Position: 10px from the right margin
  const billDateX = pageWidth - marginX - billDateWidth - billDateWidth
  doc.text(billDateText, billDateX, currentY + 14)

  // Carrier and Shipment Info
  const headers = [
    [`Carrier Name: ${userName}`, 'Shipment Booking No:'],
    [`Carrier Address: ${userAddress}`, 'Trailer Number:'],
    [`City: ${userCity}`, 'Phone Number:'],
    [`State and Zip: ${userState} ${userZipcode}`, 'Fax Number:'],
  ]
  currentY += 20
  headers.forEach((header) => {
    doc.rect(marginX, currentY, 250, 20)
    doc.rect(marginX + 260, currentY, 250, 20)
    doc.text(header[0], marginX + 10, currentY + 14)
    doc.text(header[1], marginX + 270, currentY + 14)
    currentY += 20
  })

  // TO and FROM sections
  currentY += 10
  // Section headers
  doc.text('TO', marginX + 125, currentY + 7, { align: 'center' })
  doc.text('FROM', marginX + 385, currentY + 7, { align: 'center' })
  // Create individual rows for "TO" and "FROM"
  currentY += 10
  // TO Section
  doc.rect(marginX, currentY, 250, rowHeight)
  doc.text(userAddress, marginX + 10, currentY + 14)
  currentY += rowHeight
  doc.rect(marginX, currentY, 250, rowHeight)
  doc.text(userCity, marginX + 10, currentY + 14)
  currentY += rowHeight
  doc.rect(marginX, currentY, 250, rowHeight)
  doc.text(`${userState}, ${userZipcode}`, marginX + 10, currentY + 14)
  currentY += rowHeight
  doc.rect(marginX, currentY, 250, rowHeight)
  doc.text('', marginX + 10, currentY + 14)
  currentY += rowHeight
  doc.rect(marginX, currentY, 250, rowHeight)
  doc.text('', marginX + 10, currentY + 14)
  // Reset currentY to start of TO for FROM section alignment
  currentY -= rowHeight * 4
  // FROM Section
  doc.rect(marginX + 260, currentY, 250, rowHeight) // Row 1
  doc.text('Arch Polymers, Inc.', marginX + 270, currentY + 14)
  currentY += rowHeight
  doc.rect(marginX + 260, currentY, 250, rowHeight) // Row 2
  doc.text('300 PROGRESS WY', marginX + 270, currentY + 14)
  currentY += rowHeight
  doc.rect(marginX + 260, currentY, 250, rowHeight) // Row 3
  doc.text('BELLEFONTAINE OH 43311', marginX + 270, currentY + 14)
  currentY += rowHeight
  doc.rect(marginX + 260, currentY, 250, rowHeight) // Row 4
  doc.text('Tel: 614-437-5588', marginX + 270, currentY + 14)
  currentY += rowHeight
  doc.rect(marginX + 260, currentY, 250, rowHeight) // Row 4
  doc.text('', marginX + 270, currentY + 14)

  // PAYMENT and SHIPPER sections
  currentY += 30
  // Section headers
  doc.text('FROM PAYMENT, SEND BILL TO', marginX + 125, currentY + 7, { align: 'center' })
  doc.text("SHIPPER'S INSTRUCTIONS", marginX + 385, currentY + 7, { align: 'center' })
  // Create individual rows for "PAYMENT" and "SHIPPER"
  currentY += 10
  // PAYMENT Section
  const rows = 5
  for (let i = 0; i < rows; i++) {
    doc.rect(marginX, currentY, 250, rowHeight)
    doc.text('', marginX + 10, currentY + 14)
    currentY += rowHeight
  }
  // SHIPPER Section
  currentY -= rowHeight * 5
  for (let i = 0; i < rows; i++) {
    doc.rect(marginX + 260, currentY, 250, rowHeight)
    doc.text('', marginX + 10, currentY + 14)
    currentY += rowHeight
  }

  doc.setFontSize(9)
  currentY += 10
  // Table Headers
  // const tableHeader = [
  //   { label: 'NO. SHIPPING UNITS', width: 130 },
  //   { label: 'TIME', width: 50 },
  //   { label: 'DESCRIPTION OF ARTICLES', width: 150 },
  //   { label: 'WEIGHT', width: 70 },
  //   { label: 'UNIT', width: 50 },
  //   { label: 'CHARGES', width: 60 },
  // ]
  const tableHeader = [
    { label: 'PO#', width: 50 },
    { label: 'NO. SHIPPING UNITS', width: 110 },
    { label: 'TIME', width: 45 },
    { label: 'DESCRIPTION OF ARTICLES', width: 140 },
    { label: 'WEIGHT', width: 60 },
    { label: 'UNIT', width: 45 },
    { label: 'CHARGES', width: 60 },
  ]

  let tableX = marginX
  tableHeader.forEach((header) => {
    doc.rect(tableX, currentY, header.width, rowHeight)
    doc.text(header.label, tableX + 5, currentY + 14)
    tableX += header.width
  })

  // First Row
  currentY += rowHeight
  tableX = marginX

  doc.setFont('helvetica', 'bold')
  doc.rect(marginX, currentY, 50, rowHeight)
  doc.text(`${selPO}`, marginX + 5, currentY + 14)
  doc.rect(marginX + 50, currentY, 110, rowHeight)
  doc.rect(marginX + 160, currentY, 45, rowHeight)
  doc.rect(marginX + 205, currentY, 140, rowHeight)
  doc.rect(marginX + 345, currentY, 60, rowHeight)
  doc.text(`${selWegiht}`, marginX + 350, currentY + 14)
  doc.rect(marginX + 405, currentY, 45, rowHeight)
  doc.text('LBS', marginX + 410, currentY + 14)
  doc.rect(marginX + 450, currentY, 60, rowHeight)

  const drawRow = (doc, startX, startY, columns, rowHeight) => {
    let x = startX
    columns.forEach((width) => {
      doc.rect(x, startY, width, rowHeight)
      x += width
    })
  }
  const talbeRowColumns = [50, 110, 45, 140, 60, 45, 60]
  // Draw second row
  currentY += rowHeight
  doc.setFont('helvetica', 'bold')
  drawRow(doc, marginX, currentY, talbeRowColumns, rowHeight)
  // Draw third row
  currentY += rowHeight
  drawRow(doc, marginX, currentY, talbeRowColumns, rowHeight)

  // REMIT C.O.D. Section
  currentY += rowHeight
  doc.setFont('helvetica', 'bold')
  doc.rect(marginX, currentY, 250, rowHeight * 2 - 5) // REMIT C.O.D
  doc.text('REMIT C.O.D.', marginX + 5, currentY + 10)
  doc.rect(marginX + 250, currentY, 150, rowHeight * 2 - 5) // C.O.D AMOUNT
  doc.text('C.O.D. AMOUNT: $', marginX + 255, currentY + 10)
  doc.rect(marginX + 400, currentY, 110, rowHeight * 2 - 5) // C.O.D FEE
  doc.text('C.O.D. FEE', marginX + 405, currentY + 10)
  doc.text('PREPAID', marginX + 405, currentY + 20)
  doc.text('COLLECT', marginX + 405, currentY + 30)

  // TO & Consignor Section
  currentY += rowHeight * 2 - 5
  doc.setFont('helvetica', 'bold')
  doc.rect(marginX, currentY, 250, rowHeight * 5) // Address
  doc.text('TO:', marginX + 5, currentY + 14)
  doc.text('ADDRESS', marginX + 5, currentY + 30)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(`${selPO}`, marginX + 5, currentY + 50)
  doc.rect(marginX + 250, currentY, 150, rowHeight * 5) // Signature
  doc.setFontSize(9)
  doc.text(
    'If this shipment is to be delivered to the consignee without recourse on the consignor, the consignor shall sign the following statement: The carrier shall not make delivery of this shipment without payment of freight and all other lawful charges.  _____________________________(Signature of Consignor)',
    marginX + 255,
    currentY + 14,
    { maxWidth: 145, align: 'left' },
  )
  doc.setFont('helvetica', 'bold')
  doc.rect(marginX + 400, currentY, 110, rowHeight * 5) // Address
  doc.text('TOTAL', marginX + 405, currentY + 14)
  doc.text('CHARGES $', marginX + 405, currentY + 25)

  // Note
  currentY += rowHeight * 5
  doc.setFont('helvetica', 'normal')
  doc.rect(marginX, currentY, 250, rowHeight * 3 + 10)
  doc.text(
    'NOTE: Where the rate is dependent on value; shippers are required to state specifically in writing the agreed or declared value of the property. The agreed or declared value of the property is hereby specifically stated by the shipper to be not exceeding              $                     per.',
    marginX + 5,
    currentY + 14,
    { maxWidth: 240, align: 'left' },
  )
  doc.rect(marginX + 250, currentY, 150, rowHeight * 3 + 10)
  doc.text('', marginX + 255, currentY + 14)
  doc.rect(marginX + 400, currentY, 110, rowHeight * 3 + 10)
  doc.text('Freight Charges are collect unless marked prepaid', marginX + 405, currentY + 14, {
    maxWidth: 100,
    align: 'left',
  })
  doc.setFont('helvetica', 'bold')
  doc.text('CHECK BOX IF PREPAID', marginX + 405, currentY + 50, {
    maxWidth: 100,
    align: 'left',
  })

  // Description
  currentY += rowHeight * 3 + 10
  doc.setFont('helvetica', 'normal')
  doc.rect(marginX, currentY, 510, rowHeight * 5)
  doc.text(
    'RECEIVED subject to the classifications and tariffs in effect on the date of the issue of this Bill of Lading, the property described above in apparent good order, except as noted (contents and condition of packages unknown), marked consigned and destined as indicated above which said carrier (the word carrier being understood through this contract as meaning any person or corporation in possession of the property under the contract) agrees to carry to its usual place of delivery as said destination. If on its route, otherwise to deliver to another carrier on the route to said destination. It is mutually agreed as to each carrier of all or any of said property, over all or any portion of said route to destination and as to each party at any time interested in all or any said property, that every service to be performed hereunder shall be subject to all the Bill of Lading terms and conditions in the governing classification on the date of shipment. Shipper hereby certifies that he is familiar with all the Bill of Lading terms and conditions in the governing classification and the said terms and conditions.',
    marginX + 5,
    currentY + 14,
    { maxWidth: 500, align: 'left' },
  )

  // Signature 1
  currentY += rowHeight * 5
  doc.rect(marginX, currentY, 170, rowHeight)
  doc.text('Shipper', marginX + 5, currentY + 14)
  doc.rect(marginX + 170, currentY, 170, rowHeight)
  doc.text('Carrier', marginX + 175, currentY + 14)
  doc.rect(marginX + 340, currentY, 170, rowHeight)
  doc.text('Consignee', marginX + 345, currentY + 14)

  // Signature 2
  currentY += rowHeight
  doc.rect(marginX, currentY, 170, rowHeight)
  doc.text('Per', marginX + 5, currentY + 14)
  doc.rect(marginX + 170, currentY, 170, rowHeight)
  doc.text('Per', marginX + 175, currentY + 14)
  doc.rect(marginX + 340, currentY, 170, rowHeight)
  doc.text('Date:', marginX + 345, currentY + 14)

  const timestampMs = Date.now()
  const newFilename = `bill_${timestampMs}.pdf`
  doc.save(newFilename)
}

// Generate Report PDF file
const loadImageAsDataURL = async (path) => {
  const response = await fetch(path)
  const blob = await response.blob()
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.readAsDataURL(blob)
  })
}
export const downloadReportPDF = async (
  po,
  grossWeight,
  tareWeight,
  netWeight,
  pkgCount,
  inspectionResults,
  quality,
  packageName,
  feedback,
  feedbackImage,
) => {
  const doc = new jsPDF('p', 'pt', 'a4')
  let currentY = 50
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()

  // Add Logo
  const logoUrl = await loadImageAsDataURL('/logo.jpg')
  const logoWidth = 250
  const logoHeight = 80
  doc.addImage(logoUrl, 'JPEG', (pageWidth - logoWidth) / 2, currentY, logoWidth, logoHeight)

  currentY += logoHeight + 20

  // Title
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.text('Receiving Report', pageWidth / 2, currentY, { align: 'center' })

  currentY += 30
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(12)

  const currentDate = new Date()
  const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`
  const reportData = [
    { label: 'PO#', value: po },
    { label: 'Gross Weight', value: `${grossWeight} lbs` },
    { label: 'Tare Weight', value: `${tareWeight} lbs` },
    { label: 'Net Weight', value: `${netWeight} lbs` },
    { label: '# of Packages', value: pkgCount },
    { label: 'Package Name', value: packageName },
    { label: 'Inspection Results', value: inspectionResults },
    { label: 'Delivery Date', value: formattedDate },
    { label: 'Quality grade', value: quality },
  ]

  // Render each row of the report
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(12)
  reportData.forEach((item) => {
    const text = `${item.label}: ${item.value}`
    doc.text(text, 50, currentY, { align: 'left' })
    currentY += 20
  })

  // Add delivery feedback
  doc.setFont('helvetica', 'bold')
  doc.text('Delivery Feedback:', 50, currentY)
  currentY += 20

  doc.setFont('helvetica', 'normal')
  const wrapText = (doc, text, x, y, maxWidth, lineHeight) => {
    const words = text.split(' ')
    let line = ''
    let lines = []
    for (let i = 0; i < words.length; i++) {
      const testLine = `${line}${words[i]} `
      const testWidth = doc.getTextWidth(testLine)
      if (testWidth > maxWidth && i > 0) {
        lines.push(line)
        line = `${words[i]} `
      } else {
        line = testLine
      }
    }
    lines.push(line)
    for (const l of lines) {
      if (y + lineHeight > pageHeight - 50) {
        doc.addPage()
        y = 50
      }
      doc.text(l.trim(), x, y)
      y += lineHeight
    }
    return y
  }
  currentY = wrapText(doc, feedback, 50, currentY, pageWidth - 100, 16)

  if (feedbackImage && feedbackImage.length > 0) {
    const maxImageWidth = pageWidth - 100
    let imgY = currentY

    const loadImage = async (imgSrc) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = `${process.env.REACT_APP_UPLOAD_URL}${imgSrc}`

        img.onload = () => {
          const imgAspectRatio = img.width / img.height

          let imgWidth = maxImageWidth
          let imgHeight = imgWidth / imgAspectRatio

          // If image overflows the page, add a new page
          if (imgY + imgHeight > pageHeight - 50) {
            doc.addPage()
            imgY = 50
          }

          const imgX = (pageWidth - imgWidth) / 2
          doc.addImage(img, 'JPEG', imgX, imgY, imgWidth, imgHeight)

          imgY += imgHeight + 10
          resolve()
        }

        img.onerror = () => {
          console.error(`Failed to load image: ${imgSrc}`)
          reject()
        }
      })
    }

    for (let i = 0; i < feedbackImage.length; i++) {
      await loadImage(feedbackImage[i])
    }
  }

  // Save the PDF after all images are added
  const timestampMs = Date.now()
  const newFilename = `receiving_report_${timestampMs}.pdf`
  doc.save(newFilename)
}

// Generate PO PDF file
export const downloadPOPDF = async (
  curMaterial,
  curName,
  curAddress,
  curCity,
  curState,
  curZipcode,
  curContact,
  curPhone,
  curReport,
  po,
  weight,
  price,
  date,
) => {
  const doc = new jsPDF('p', 'pt', 'a4')
  let currentY = 50
  const pageWidth = doc.internal.pageSize.getWidth()

  // Add Logo
  const logoUrl = await loadImageAsDataURL('/logo.jpg')
  const logoWidth = 180
  const logoHeight = 50
  doc.addImage(logoUrl, 'JPEG', 50, currentY, logoWidth, logoHeight)

  // Title
  currentY += logoHeight / 2 + 10
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(17)
  doc.text('PURCHASE ORDER', pageWidth / 2 + 100, currentY, { align: 'center' })

  currentY += 40 // Height of the gray box
  const boxMargin = 30

  // Draw a gray box background
  doc.setFillColor(200)
  doc.rect(boxMargin, currentY - 10, pageWidth - boxMargin * 2, 110, 'F')
  // Left Section: Purchase Order Details
  const leftX = boxMargin + 20
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.text(`Purchase Order No.: ${po}`, leftX, currentY + 10)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(12)
  const currentDate = new Date()
  const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`
  doc.text(`Issue Date: ${formattedDate}`, leftX, currentY + 30)
  doc.text('Valid for: 30 Days', leftX, currentY + 45)
  doc.text('FOB Point: Bellefontaine, OH', leftX, currentY + 60)
  doc.text('Zip Code: 43311', leftX, currentY + 75)
  doc.text(`Deliver Date: ${date}`, leftX, currentY + 90)
  // Right Section: Vendor Details
  const rightX = pageWidth / 2 + 15
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.text('TO VENDOR:', rightX, currentY + 10)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.text(curName, rightX, currentY + 30)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(12)
  doc.text(`Contact: ${curContact}`, rightX, currentY + 45)
  doc.text(curAddress, rightX, currentY + 60)
  doc.text(`${curCity} ${curState} ${curZipcode}`, rightX, currentY + 75)
  doc.text(`Tel: ${curPhone}`, rightX, currentY + 90)

  // Bill & Deliver
  currentY += 120
  // Left Section - > Bill
  doc.setFont('helvetica', 'bold')
  doc.text('BILL TO:', 30, currentY + 10)
  doc.setFontSize(14)
  doc.text('Arch Polymers Inc.', 30, currentY + 25)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(12)
  doc.text('300 Progress Way', 30, currentY + 40)
  doc.text('Bellefontaine, OH 43311', 30, currentY + 55)
  doc.setFont('helvetica', 'bold')
  doc.text('accounting@archpolymers.com', 30, currentY + 115)
  // Right Seciton -> Delivery
  doc.setFont('helvetica', 'bold')
  doc.text('DELIVER TO:', rightX, currentY + 10)
  doc.setFontSize(14)
  doc.text('Arch Polymers Inc.', rightX, currentY + 25)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(12)
  doc.text('300 Progress Way', rightX, currentY + 40)
  doc.text('Bellefontaine, OH 43311', rightX, currentY + 55)
  doc.text('Contact: Howard Wei', rightX, currentY + 70)
  doc.text('Tel: 614-615-1015', rightX, currentY + 85)
  doc.setFont('helvetica', 'bold')
  doc.text('howard@archpolymers.com', rightX, currentY + 100)
  doc.text('Receiving Hours: 8:00-15:30 M-F', rightX, currentY + 115)

  //Table data
  currentY += 130
  doc.setFillColor(0, 0, 0)
  doc.rect(30, currentY, pageWidth - 60, 1)
  doc.rect(30, currentY + 2, pageWidth - 60, 1)
  doc.text('QTY', 30, currentY + 20)
  doc.text('ITEM DESCRIPTION', 100, currentY + 20)
  doc.text('PRICE', 312, currentY + 20)
  doc.text('TOTAL', 370, currentY + 20)
  doc.text('PAYMENT TERMS', 440, currentY + 20)
  doc.rect(30, currentY + 25, pageWidth - 60, 1)
  currentY += 25
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(`${weight} LBS`, 30, currentY + 10)
  doc.text(curMaterial, 100, currentY + 10)
  doc.text(`${price}/LB`, 312, currentY + 10)
  doc.text(parseFloat(weight * price).toFixed(2), 370, currentY + 10)
  doc.text('NET 60 DAYS', 440, currentY + 10)
  doc.rect(30, currentY + 50, pageWidth - 60, 1)

  // Remarks
  currentY += 70
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('REMARKS:', 30, currentY + 10)
  doc.setFont('helvetica', 'normal')
  doc.text(curReport, 30, currentY + 25, { maxWidth: 500, align: 'left' })

  // Signature
  currentY += 300
  // Left Section
  doc.line(110, currentY, 260, currentY)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('VENDOR', 165, currentY + 15)
  // Right Section
  const signUrl = await loadImageAsDataURL('/sign.jpeg')
  const signWidth = 180
  const signHeight = 50
  doc.addImage(signUrl, 'JPEG', 340, currentY - 50, signWidth, signHeight)

  doc.line(350, currentY, 500, currentY)
  doc.text('For and on behalf of', 360, currentY + 15)
  doc.text('ARCH POLYMERS INC', 360, currentY + 30)

  const newFilename = `PO_${po}.pdf`
  doc.save(newFilename)
}
