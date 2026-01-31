// --- components.js ---

export function renderMarksheet(data, meta) {
    const metaFields = ['Name', 'Student Name', 'Student', 'Roll No', 'ID', 'Roll Number', 'Student ID', 'Roll', 'Total', 'Total Marks', 'Percentage', 'Average', 'Grade', 'GPA', 'Result', 'Status'];
    const subjects = Object.entries(data).filter(([k]) => !metaFields.includes(k)).sort();

    // রেজাল্ট পাস নাকি ফেল চেক
    const resultStatus = (data['Result'] || data['Status'] || 'PASS').toUpperCase();
    const isFailed = resultStatus.includes('FAIL') || (data['Grade'] === 'F');

    return `
        <div class="a4-container w-full max-w-[210mm] bg-white border-[6px] border-double border-slate-900 p-6 sm:p-10 flex flex-col shadow-2xl rounded-[1.5rem] mx-auto">
            
            <div class="text-center border-b-2 border-slate-800 pb-4 mb-5">
                <h1 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">Hat Madhnogor High School</h1>
                <p class="text-[10px] text-slate-500 font-bold tracking-widest uppercase">Recognition No: HM-9922 | Estd: 1970</p>
                <div class="mt-3 print-dark bg-slate-900 text-white inline-block px-10 py-2 rounded-full font-black uppercase tracking-[0.2em] text-[11px]">
                    Academic Report Card
                </div>
            </div>

            <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-5 grid grid-cols-2 gap-4 text-xs">
                <div><b class="text-slate-400 uppercase text-[9px]">Student Name:</b> <p class="font-black text-slate-900 text-sm uppercase">${(data['Name'] || data['Student Name'] || 'N/A')}</p></div>
                <div><b class="text-slate-400 uppercase text-[9px]">Roll Number:</b> <p class="font-black text-slate-900 text-sm">${data['Roll No'] || data['Roll'] || 'N/A'}</p></div>
                <div><b class="text-slate-400 uppercase text-[9px]">Class:</b> <p class="font-black text-slate-900 text-sm">${meta.className}</p></div>
                <div><b class="text-slate-400 uppercase text-[9px]">Session:</b> <p class="font-black text-slate-900 text-sm">${meta.year}</p></div>
            </div>

            <div class="text-center mb-3 uppercase font-black text-lg italic tracking-widest border-b border-slate-100 pb-1">${meta.examName}</div>

            <div class="border-2 border-slate-900 rounded-lg overflow-hidden mb-5">
                <table class="w-full text-left text-sm">
                    <thead class="print-dark bg-slate-900 text-white uppercase text-[10px]">
                        <tr><th class="p-3">Subject Description</th><th class="p-3 text-center w-24 border-l border-slate-700">Marks</th></tr>
                    </thead>
                    <tbody class="text-slate-800">
                        ${subjects.map(([s, m]) => `
                            <tr class="border-b border-slate-200">
                                <td class="p-2 font-bold italic pl-4">${s}</td>
                                <td class="p-2 text-center font-black border-l border-slate-100">${m}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                    <tfoot class="print-dark bg-slate-800 text-white font-black border-t-2 border-slate-900">
                        <tr><td class="p-2 pl-4 uppercase text-[10px]">Aggregate Total</td><td class="p-2 text-center text-lg">${data['Total'] || data['Total Marks'] || 'N/A'}</td></tr>
                    </tfoot>
                </table>
            </div>

            <div class="grid grid-cols-3 gap-4 mb-6">
                <div class="p-3 border-2 border-slate-100 rounded-xl text-center">
                    <p class="text-[9px] font-bold text-slate-400 uppercase">Percentage</p>
                    <p class="text-xl font-black text-slate-900">${data['Percentage'] || data['Average'] || 'N/A'}%</p>
                </div>
                <div class="p-3 border-2 border-slate-100 rounded-xl text-center">
                    <p class="text-[9px] font-bold text-slate-400 uppercase">Grade</p>
                    <p class="text-xl font-black text-slate-900">${data['Grade'] || 'N/A'}</p>
                </div>
                <div class="p-3 print-dark ${isFailed ? 'bg-red-700' : 'bg-slate-900'} rounded-xl text-center text-white">
                    <p class="text-[9px] font-bold opacity-80 uppercase">Outcome</p>
                    <p class="text-xl font-black uppercase italic">${resultStatus}</p>
                </div>
            </div>

            <div class="mt-auto">
                <div class="flex justify-between items-end border-t-2 border-slate-100 pt-6">
                    <img src="https://i.ibb.co.com/HDqfKG6K/Seal-school.png" class="h-16 sm:h-20 object-contain">
                    <div class="text-center">
                        <img src="https://i.ibb.co.com/1C0fss2/Tarikul-sign.png" class="h-10 object-contain mx-auto mb-1">
                        <div class="w-40 border-b-2 border-slate-900 mb-1"></div>
                        <p class="text-[10px] font-black uppercase">Controller of Exams</p>
                    </div>
                </div>
                <p class="text-center text-[8px] text-slate-400 font-bold uppercase tracking-[0.4em] mt-4">* OFFICIAL ACADEMIC TRANSCRIPT *</p>
            </div>
        </div>
    `;
}
