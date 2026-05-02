// ডামি ডেটাবেস
const students = [
    {
        roll: "101", reg: "202601", name: "KHAIRUL ISLAM", class: "HSC", year: "2026", res: "GPA 5.00", pass: true,
        marks: [{s: "Bangla", m: 85, g: "A+"}, {s: "English", m: 92, g: "A+"}, {s: "ICT", m: 88, g: "A+"}]
    },
    {
        roll: "102", reg: "202602", name: "RAHIM UDDIN", class: "HSC", year: "2026", res: "Failed", pass: false,
        marks: [{s: "Bangla", m: 28, g: "F"}, {s: "English", m: 45, g: "C"}]
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
