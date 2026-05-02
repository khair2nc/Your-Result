// ডামি ডেটাবেস
const students = [
  // --- প্রথম শ্রেণী ---
    { roll: "1", name: "মোসাঃ মাকসুমা", class: "প্রথম শ্রেণী", year: "2024", res: "GPA 5.00", pass: true, 
      marks: [{s:"আমপারা", m:95, g:"A+"}, {s:"দোয়া ও মাসাইল", m:96, g:"A+"}, {s:"হাদিস ও আসমাউল হুসনা", m:95, g:"A+"}, {s:"অংক", m:94, g:"A+"}, {s:"ইংরেজী", m:100, g:"A+"}, {s:"বাংলা", m:100, g:"A+"}] },
    
    { roll: "2", name: "মোসাঃ মিম", class: "প্রথম শ্রেণী", year: "2024", res: "GPA 4.00", pass: true, 
      marks: [{s:"আমপারা", m:90, g:"A+"}, {s:"দোয়া ও মাসাইল", m:60, g:"A-"}, {s:"হাদিস ও আসমাউল হুসনা", m:85, g:"A+"}, {s:"অংক", m:93, g:"A+"}, {s:"ইংরেজী", m:50, g:"B"}, {s:"বাংলা", m:65, g:"A-"}] },

    { roll: "3", name: "মোসাঃ মরিয়ম", class: "প্রথম শ্রেণী", year: "2024", res: "Passed", pass: true, 
      marks: [{s:"আমপারা", m:70, g:"A"}, {s:"দোয়া ও মাসাইল", m:90, g:"A+"}, {s:"হাদিস ও আসমাউল হুসনা", m:80, g:"A+"}, {s:"অংক", m:53, g:"B"}, {s:"ইংরেজী", m:60, g:"A-"}, {s:"বাংলা", m:78, g:"A"}] },

    { roll: "9", name: "মোসাঃ খাদিজা", class: "প্রথম শ্রেণী", year: "2024", res: "Failed", pass: false, 
      marks: [{s:"আমপারা", m:80, g:"A+"}, {s:"দোয়া ও মাসাইল", m:70, g:"A"}, {s:"হাদিস ও আসমাউল হুসনা", m:33, g:"D"}, {s:"অংক", m:60, g:"A-"}, {s:"ইংরেজী", m:0, g:"F"}, {s:"বাংলা", m:70, g:"A"}] },

    // --- দ্বিতীয় শ্রেণী ---
    { roll: "2-1", name: "মোসাঃ সামিরা", class: "দ্বিতীয় শ্রেণী", year: "2024", res: "GPA 5.00", pass: true, 
      marks: [{s:"আমপারা", m:65, g:"A-"}, {s:"দোয়া ও মাসাইল", m:60, g:"A-"}, {s:"হাদিস ও আসমাউল হুসনা", m:70, g:"A"}, {s:"অংক", m:100, g:"A+"}, {s:"ইংরেজী", m:95, g:"A+"}, {s:"বাংলা", m:95, g:"A+"}] },

    { roll: "2-2", name: "মোসাঃ ফারিহা", class: "দ্বিতীয় শ্রেণী", year: "2024", res: "Passed", pass: true, 
      marks: [{s:"আমপারা", m:90, g:"A+"}, {s:"দোয়া ও মাসাইল", m:80, g:"A+"}, {s:"হাদিস ও আসমাউল হুসনা", m:98, g:"A+"}, {s:"অংক", m:51, g:"B"}, {s:"ইংরেজী", m:92, g:"A+"}, {s:"বাংলা", m:65, g:"A-"}] },

    { roll: "2-13", name: "মোসাঃ হালিমা", class: "দ্বিতীয় শ্রেণী", year: "2024", res: "Passed", pass: true, 
      marks: [{s:"আমপারা", m:33, g:"D"}, {s:"দোয়া ও মাসাইল", m:33, g:"D"}, {s:"হাদিস ও আসমাউল হুসনা", m:33, g:"D"}, {s:"অংক", m:33, g:"D"}, {s:"ইংরেজী", m:33, g:"D"}, {s:"বাংলা", m:48, g:"C"}] }
];
    }
];

function checkResult() {
    const rollVal = document.getElementById('roll').value;
    const captcha = document.getElementById('captcha-input').value;

    // ক্যাপচা চেক (৮+৫ = ১৩)
    if(captcha != "13") {
        alert("Wrong Captcha!");
        return;
    }

    const student = students.find(s => s.roll === rollVal);

    if(student) {
        document.getElementById('result-area').style.display = 'block';
        document.getElementById('res-name').innerText = student.name;
        
        let html = "";
        student.marks.forEach(item => {
            html += `<tr>
                <td>${item.s}</td>
                <td>${item.m}</td>
                <td>${item.g}</td>
                <td class="${item.m >= 33 ? 'status-pass' : 'status-fail'}">${item.m >= 33 ? 'Pass' : 'Fail'}</td>
            </tr>`;
        });
        document.getElementById('marksheet-body').innerHTML = html;

        if(student.pass) {
            document.getElementById('cert-btn').classList.remove('d-none');
            // সার্টিফিকেট ডেটা লোড
            document.getElementById('st-name').innerText = student.name;
            document.getElementById('st-class').innerText = student.class;
            document.getElementById('st-roll').innerText = student.roll;
            document.getElementById('st-reg').innerText = student.reg;
            document.getElementById('st-year').innerText = student.year;
            document.getElementById('st-res').innerText = student.res;
        } else {
            document.getElementById('cert-btn').classList.add('d-none');
            document.getElementById('cert-container').style.display = 'none';
        }
    } else {
        alert("Student not found!");
    }
}

function openCertificate() {
    document.getElementById('cert-container').style.display = 'block';
    
    // QR Code জেনারেট
    const qrDiv = document.getElementById("qrcode-box");
    qrDiv.innerHTML = "";
    const verifyData = "Verified Result - Student: " + document.getElementById('st-name').innerText;
    new QRCode(qrDiv, { text: verifyData, width: 85, height: 85 });
    
    window.scrollTo(0, document.body.scrollHeight);
}

function downloadPDF() {
    const element = document.getElementById('certificate-ui');
    html2pdf().from(element).set({
        margin: 0,
        filename: 'Official_Certificate.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' }
    }).save();
}
