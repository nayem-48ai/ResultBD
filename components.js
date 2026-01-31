// --- components.js ---
export function renderMarksheet(data, meta) {
    const metaFields = ['Name', 'Student Name', 'Student', 'Roll No', 'ID', 'Roll Number', 'Roll', 'Total', 'Total Marks', 'Percentage', 'Average', 'Grade', 'GPA', 'Result', 'Status'];
    const subjects = Object.entries(data).filter(([k]) => !metaFields.includes(k)).sort();

    const outcome = String(data['Result'] || 'PASS').toUpperCase();
    const total = data['Total'] || data['Total Marks'] || 'N/A';

    return `
        <div class="result-sheet">
            <div class="text-center mb-8">
                <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase">Hat Madhnogor High School</h1>
                <p class="text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-1">Recognition No: HM-9922 | Established: 1970</p>
                
                <div class="mt-4 inline-block">
                    <div class="print-bg-dark bg-slate-900 text-white px-8 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">Academic Report Card</div>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-[13px] border-t border-b border-slate-100 py-6 mb-8">
                <div class="flex"><span class="w-32 text-slate-400 font-bold uppercase text-[10px]">Student Name</span> <span class="font-bold">: ${data['Name'] || data['Student Name'] || 'N/A'}</span></div>
                <div class="flex"><span class="w-32 text-slate-400 font-bold uppercase text-[10px]">Roll Number</span> <span class="font-bold">: ${data['Roll No'] || data['Roll'] || 'N/A'}</span></div>
                <div class="flex"><span class="w-32 text-slate-400 font-bold uppercase text-[10px]">Class / Grade</span> <span class="font-bold">: ${meta.className}</span></div>
                <div class="flex"><span class="w-32 text-slate-400 font-bold uppercase text-[10px]">Academic Year</span> <span class="font-bold">: ${meta.year}</span></div>
                <div class="flex sm:col-span-2"><span class="w-32 text-slate-400 font-bold uppercase text-[10px]">Examination</span> <span class="font-bold">: ${meta.examName}</span></div>
            </div>

            <div class="overflow-hidden border border-slate-900 rounded-lg mb-6">
                <table class="w-full text-left text-sm">
                    <thead class="print-bg-dark bg-slate-900 text-white uppercase text-[10px] tracking-widest">
                        <tr>
                            <th class="py-3 px-4">Subject Description</th>
                            <th class="py-3 px-4 text-center w-28">Marks</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200">
                        ${subjects.map(([s, m]) => `
                            <tr>
                                <td class="py-2.5 px-4 font-medium text-slate-700 italic">${s}</td>
                                <td class="py-2.5 px-4 text-center font-bold">${m}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                    <tfoot class="bg-slate-50 border-t border-slate-900 font-bold">
                        <tr>
                            <td class="py-3 px-4 uppercase text-[10px]">Aggregate Total Calculation</td>
                            <td class="py-3 px-4 text-center text-base">${total}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div class="grid grid-cols-3 gap-4 mb-10">
                <div class="border border-slate-200 p-3 rounded-xl text-center">
                    <p class="text-[9px] font-bold text-slate-400 uppercase mb-1">Percentage</p>
                    <p class="text-lg font-black text-blue-600">${data['Percentage'] || 'N/A'}%</p>
                </div>
                <div class="border border-slate-200 p-3 rounded-xl text-center">
                    <p class="text-[9px] font-bold text-slate-400 uppercase mb-1">Letter Grade</p>
                    <p class="text-lg font-black text-green-600">${data['Grade'] || 'N/A'}</p>
                </div>
                <div class="print-bg-dark bg-slate-900 p-3 rounded-xl text-center text-white">
                    <p class="text-[9px] font-bold opacity-60 uppercase mb-1">Outcome</p>
                    <p class="text-lg font-black uppercase tracking-tighter">${outcome}</p>
                </div>
            </div>

            <div class="mt-auto pt-10">
                <div class="flex justify-between items-end">
                    <div class="text-center">
                        <img src="https://i.ibb.co.com/HDqfKG6K/Seal-school.png" class="h-20 object-contain mx-auto opacity-90">
                        <p class="text-[8px] font-bold text-slate-400 mt-2 uppercase">School Seal</p>
                    </div>
                    <div class="text-center">
                        <img src="https://i.ibb.co.com/1C0fss2/Tarikul-sign.png" class="h-12 object-contain mx-auto">
                        <div class="w-40 border-b border-slate-900 my-1 mx-auto"></div>
                        <p class="text-[10px] font-extrabold uppercase text-slate-900">Controller of Exams</p>
                    </div>
                </div>
                <div class="text-center mt-10">
                    <p class="text-[8px] text-slate-400 font-bold uppercase tracking-[0.5em]">* OFFICIAL ACADEMIC TRANSCRIPT *</p>
                </div>
            </div>
        </div>
    `;
}
