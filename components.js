// --- components.js ---

export function renderMarksheet(data, meta) {
    const metaFields = ['Name', 'Student Name', 'Student', 'Roll No', 'ID', 'Roll Number', 'Student ID', 'Roll', 'Total', 'Total Marks', 'Total Aggregate', 'Percentage', 'Average', 'Avg', 'Grade', 'GPA', 'Result', 'Status'];
    
    const subjects = Object.entries(data)
        .filter(([k]) => !metaFields.includes(k))
        .sort((a, b) => a[0].localeCompare(b[0]));

    // সঠিক ডাটা ম্যাপিং নিশ্চিত করা
    const totalMarks = data['Total'] || data['Total Marks'] || data['Aggregate Total'] || '0';
    const percentage = data['Percentage'] || data['Average'] || 'N/A';
    const grade = data['Grade'] || 'N/A';
    const outcome = String(data['Result'] || data['Status'] || 'PASS').toUpperCase();
    const isFailed = outcome.includes('FAIL');

    return `
        <div class="a4-container p-8 sm:p-10 border-[6px] border-double border-slate-900 bg-white mx-auto shadow-2xl">
            <div class="flex-grow">
                <div class="text-center border-b-2 border-slate-800 pb-3 mb-5">
                    <h1 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">Hat Madhnogor High School</h1>
                    <p class="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Recognition No: HM-9922 | Estd: 1970</p>
                    <div class="mt-3 print-force-dark bg-slate-900 text-white inline-block px-10 py-1.5 rounded-full font-black uppercase text-[10px] tracking-[0.2em]">Academic Report Card</div>
                </div>

                <div class="bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-5 grid grid-cols-2 gap-x-12 gap-y-3">
                    <div><b class="text-[9px] text-slate-400 uppercase">Student Name:</b> <p class="font-black text-slate-900 text-xs sm:text-sm uppercase truncate">${(data['Name'] || data['Student Name'] || 'N/A')}</p></div>
                    <div><b class="text-[9px] text-slate-400 uppercase">Roll Number:</b> <p class="font-black text-slate-900 text-xs sm:text-sm">${data['Roll No'] || data['Roll'] || 'N/A'}</p></div>
                    <div><b class="text-[9px] text-slate-400 uppercase">Class:</b> <p class="font-black text-slate-900 text-xs sm:text-sm">${meta.className}</p></div>
                    <div><b class="text-[9px] text-slate-400 uppercase">Session:</b> <p class="font-black text-slate-900 text-xs sm:text-sm">${meta.year}</p></div>
                </div>

                <div class="text-center mb-3 uppercase font-black text-lg italic tracking-widest text-slate-800 border-b-2 border-slate-100 pb-1">${meta.examName}</div>

                <div class="border-2 border-slate-800 rounded-xl overflow-hidden mb-5">
                    <table class="w-full text-sm">
                        <thead class="print-force-dark bg-slate-900 text-white uppercase text-[10px]">
                            <tr><th class="p-3 text-left">Subject Description</th><th class="p-3 text-center w-28">Marks</th></tr>
                        </thead>
                        <tbody class="text-slate-900">
                            ${subjects.map(([s, m]) => `
                                <tr class="border-b border-slate-200">
                                    <td class="p-2.5 font-bold italic text-slate-700">${s}</td>
                                    <td class="p-2.5 text-center font-black">${m}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                        <tfoot class="bg-slate-50 font-black border-t-2 border-slate-800">
                            <tr>
                                <td class="p-3 uppercase text-[10px] tracking-wider">Aggregate Total Calculation</td>
                                <td class="p-3 text-center text-lg">${totalMarks}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <div class="grid grid-cols-3 gap-5 mb-8">
                    <div class="p-3 bg-blue-50 border border-blue-100 rounded-2xl text-center">
                        <p class="text-[9px] font-bold text-blue-500 uppercase">Percentage</p>
                        <p class="text-lg sm:text-xl font-black text-blue-900">${percentage}%</p>
                    </div>
                    <div class="p-3 bg-green-50 border border-green-100 rounded-2xl text-center">
                        <p class="text-[9px] font-bold text-green-500 uppercase">Grade</p>
                        <p class="text-lg sm:text-xl font-black text-green-900">${grade}</p>
                    </div>
                    <div class="print-force-dark ${isFailed ? 'bg-red-600' : 'bg-slate-900'} p-3 rounded-2xl text-center text-white">
                        <p class="text-[9px] font-bold opacity-70 uppercase">Outcome</p>
                        <p class="text-lg sm:text-xl font-black tracking-widest uppercase">${outcome}</p>
                    </div>
                </div>
            </div>

            <div class="mt-auto pt-4">
                <div class="flex justify-between items-end border-t-2 border-slate-800 pt-6">
                    <img src="https://i.ibb.co.com/HDqfKG6K/Seal-school.png" class="h-16 sm:h-20 object-contain">
                    <div class="text-center">
                        <img src="https://i.ibb.co.com/1C0fss2/Tarikul-sign.png" class="h-10 sm:h-14 object-contain mx-auto mb-1">
                        <div class="w-40 border-b-2 border-slate-900 mb-1 mx-auto"></div>
                        <p class="text-[9px] font-black uppercase text-slate-900">Controller of Examinations</p>
                    </div>
                </div>
                <p class="text-center text-[8px] text-slate-400 font-bold uppercase tracking-[0.4em] mt-4">* OFFICIAL ACADEMIC TRANSCRIPT *</p>
            </div>
        </div>
    `;
}
