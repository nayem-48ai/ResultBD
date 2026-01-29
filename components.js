// --- components.js ---

export function renderNavbar(user = null) {
    const nav = document.createElement('nav');
    nav.className = "bg-white border-b no-print py-4 shadow-sm";
    nav.innerHTML = `
        <div class="container mx-auto px-6 flex justify-between items-center">
            <div class="flex items-center gap-2 font-black text-2xl tracking-tighter text-slate-800">
                <div class="bg-blue-600 p-1.5 rounded-lg text-white">
                    <i data-lucide="graduation-cap"></i>
                </div>
                EduResult
            </div>
            <div class="text-slate-400 font-bold text-xs uppercase tracking-widest">Public Portal</div>
        </div>
    `;
    return nav;
}

export function renderMarksheet(data, meta) {
    const metaFields = ['Name', 'Student Name', 'Student', 'Roll No', 'ID', 'Roll Number', 'Student ID', 'Roll', 'Total', 'Total Marks', 'Total Aggregate', 'Percentage', 'Average', 'Avg', 'Grade', 'GPA', 'Result', 'Status'];
    
    const subjects = Object.entries(data)
        .filter(([k]) => !metaFields.includes(k))
        .sort((a, b) => a[0].localeCompare(b[0]));

    const totalMarks = data['Total'] || data['Total Marks'] || '0';
    const percentage = data['Percentage'] || data['Average'] || 'N/A';
    const grade = data['Grade'] || 'N/A';
    const outcome = String(data['Result'] || data['Status'] || 'PASS').toUpperCase();
    const isFailed = outcome.includes('FAIL');

    return `
        <div class="a4-container p-6 sm:p-12 border-[5px] border-double border-slate-900 bg-white mx-auto">
            <div class="flex-grow">
                <div class="text-center border-b-2 border-slate-800 pb-3 mb-6">
                    <h1 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">Hat Madhnogor High School</h1>
                    <p class="text-[9px] text-slate-600 font-bold uppercase tracking-widest">Recognition No: HM-9922 | Estd: 1970</p>
                    <div class="mt-3 bg-slate-900 text-white inline-block px-8 py-1.5 rounded-full font-black uppercase text-[9px] tracking-[0.2em]">Academic Report Card</div>
                </div>

                <div class="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200 mb-6 grid grid-cols-2 gap-x-6 sm:gap-x-12 gap-y-4">
                    <div><b class="text-[9px] text-slate-400 uppercase">Student Name:</b> <p class="font-black text-slate-900 text-xs sm:text-sm uppercase">${(data['Name'] || data['Student Name'] || 'N/A')}</p></div>
                    <div><b class="text-[9px] text-slate-400 uppercase">Roll Number:</b> <p class="font-black text-slate-900 text-xs sm:text-sm">${data['Roll No'] || data['Roll'] || 'N/A'}</p></div>
                    <div><b class="text-[9px] text-slate-400 uppercase">Class:</b> <p class="font-black text-slate-900 text-xs sm:text-sm">${meta.className}</p></div>
                    <div><b class="text-[9px] text-slate-400 uppercase">Session:</b> <p class="font-black text-slate-900 text-xs sm:text-sm">${meta.year}</p></div>
                </div>

                <div class="text-center mb-4 uppercase font-black text-lg italic tracking-widest text-slate-800 border-b border-slate-100 pb-1">${meta.examName}</div>

                <div class="border-2 border-slate-800 rounded-2xl overflow-hidden mb-6">
                    <table class="w-full text-xs sm:text-sm">
                        <thead class="bg-slate-900 text-white uppercase text-[10px]">
                            <tr><th class="p-3 text-left">Subject Description</th><th class="p-3 text-center w-24 sm:w-28">Marks</th></tr>
                        </thead>
                        <tbody class="text-slate-900">
                            ${subjects.map(([s, m]) => `
                                <tr class="border-b border-slate-200">
                                    <td class="p-2 sm:p-2.5 font-bold italic text-slate-700">${s}</td>
                                    <td class="p-2 sm:p-2.5 text-center font-black">${m}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                        <tfoot class="bg-slate-50 font-black border-t-2 border-slate-800">
                            <tr>
                                <td class="p-3 uppercase text-[10px] tracking-wider">Aggregate Total</td>
                                <td class="p-3 text-center text-base sm:text-lg">${totalMarks}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <div class="grid grid-cols-3 gap-3 sm:gap-6 mb-8">
                    <div class="p-3 sm:p-4 bg-blue-50 border border-blue-100 rounded-2xl text-center">
                        <p class="text-[8px] sm:text-[9px] font-bold text-blue-500 uppercase">Percentage</p>
                        <p class="text-sm sm:text-xl font-black text-blue-900">${percentage}%</p>
                    </div>
                    <div class="p-3 sm:p-4 bg-green-50 border border-green-100 rounded-2xl text-center">
                        <p class="text-[8px] sm:text-[9px] font-bold text-green-500 uppercase">Grade</p>
                        <p class="text-sm sm:text-xl font-black text-green-900">${grade}</p>
                    </div>
                    <div class="${isFailed ? 'bg-red-600 shadow-red-200' : 'bg-slate-900'} p-3 sm:p-4 rounded-2xl text-center text-white shadow-xl">
                        <p class="text-[8px] sm:text-[9px] font-bold opacity-70 uppercase">Outcome</p>
                        <p class="text-sm sm:text-xl font-black tracking-widest uppercase">${outcome}</p>
                    </div>
                </div>
            </div>

            <div class="mt-auto">
                <div class="flex justify-between items-end border-t-2 border-slate-800 pt-6">
                    <img src="https://i.ibb.co.com/HDqfKG6K/Seal-school.png" class="h-16 sm:h-24 object-contain">
                    <div class="text-center">
                        <img src="https://i.ibb.co.com/1C0fss2/Tarikul-sign.png" class="h-10 sm:h-16 object-contain mx-auto mb-1">
                        <div class="w-32 sm:w-48 border-b-2 border-slate-900 mb-1 mx-auto"></div>
                        <p class="text-[8px] sm:text-[10px] font-black uppercase text-slate-900">Controller of Examinations</p>
                    </div>
                </div>
                <p class="text-center text-[7px] text-slate-400 font-bold uppercase tracking-[0.4em] mt-6">* OFFICIAL ACADEMIC TRANSCRIPT *</p>
            </div>
        </div>
    `;
}

export function exportData(data, type) {
    if (!data || data.length === 0) return alert("No data!");
    let content, fileName, mimeType;
    if (type === 'json') {
        content = JSON.stringify(data, null, 2);
        fileName = 'results.json';
        mimeType = 'application/json';
    } else {
        const headers = Object.keys(data[0]).join(',');
        const rows = data.map(row => Object.values(row).map(v => `"${v}"`).join(',')).join('\n');
        content = headers + '\n' + rows;
        fileName = 'results.csv';
        mimeType = 'text/csv';
    }
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = fileName; a.click();
    URL.revokeObjectURL(url);
}
