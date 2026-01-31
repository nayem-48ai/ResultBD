// --- components.js ---
export function renderMarksheet(data, meta) {
    const metaFields = ['Name', 'Student Name', 'Student', 'Roll No', 'ID', 'Roll Number', 'Roll', 'Total', 'Percentage', 'Grade', 'GPA', 'Result', 'Status'];
    const subjects = Object.entries(data).filter(([k]) => !metaFields.includes(k)).sort();
    
    const outcome = (data['Result'] || 'PASS').toUpperCase();
    const isPass = outcome === 'PASS';

    return `
        <div class="a4-wrapper shadow-sm border border-slate-100">
            <div class="text-center mb-8">
                <h1 class="text-3xl font-black text-slate-900 tracking-tight leading-none mb-1">HAT MADHNOGOR HIGH SCHOOL</h1>
                <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">RECOGNITION NO: HM-9922 | ESTD: 1970</p>
                
                <div class="inline-block border-2 border-black px-6 py-1 font-black uppercase text-xs tracking-tighter bg-black text-white">
                    Academic Report Card
                </div>
            </div>

            <div class="grid grid-cols-2 gap-y-2 text-sm mb-6 border-b-2 border-slate-100 pb-6">
                <div class="flex gap-2">
                    <span class="font-bold text-slate-400 w-24 uppercase text-[10px]">Student Name:</span>
                    <span class="font-black text-slate-900 uppercase">${data['Name'] || data['Student Name'] || 'N/A'}</span>
                </div>
                <div class="flex gap-2">
                    <span class="font-bold text-slate-400 w-24 uppercase text-[10px]">Roll Number:</span>
                    <span class="font-black text-slate-900">${data['Roll No'] || data['Roll'] || 'N/A'}</span>
                </div>
                <div class="flex gap-2">
                    <span class="font-bold text-slate-400 w-24 uppercase text-[10px]">Class:</span>
                    <span class="font-black text-slate-900 uppercase">${meta.className}</span>
                </div>
                <div class="flex gap-2">
                    <span class="font-bold text-slate-400 w-24 uppercase text-[10px]">Session:</span>
                    <span class="font-black text-slate-900">${meta.year}</span>
                </div>
            </div>

            <div class="text-center font-black italic text-lg uppercase mb-4 border-b pb-1 text-slate-700">
                ${meta.examName}
            </div>

            <table class="w-full">
                <thead>
                    <tr class="bg-slate-50">
                        <th class="p-3">Subject Description</th>
                        <th class="p-3 text-center w-24">Marks</th>
                    </tr>
                </thead>
                <tbody>
                    ${subjects.map(([s, m]) => `
                        <tr>
                            <td class="font-medium text-slate-700 italic">${s}</td>
                            <td class="text-center font-black">${m}</td>
                        </tr>
                    `).join('')}
                    <tr class="bg-slate-50">
                        <td class="font-black uppercase text-[10px]">Aggregate Total Calculation</td>
                        <td class="text-center font-black text-lg">${data['Total'] || 'N/A'}</td>
                    </tr>
                </tbody>
            </table>

            <div class="grid grid-cols-3 gap-4 my-8">
                <div class="text-center p-3 border-2 border-slate-100 rounded-xl">
                    <div class="text-[9px] font-bold text-slate-400 uppercase">Percentage</div>
                    <div class="text-xl font-black text-slate-900">${data['Percentage'] || '0'}%</div>
                </div>
                <div class="text-center p-3 border-2 border-slate-100 rounded-xl">
                    <div class="text-[9px] font-bold text-slate-400 uppercase">Grade</div>
                    <div class="text-xl font-black text-slate-900">${data['Grade'] || 'F'}</div>
                </div>
                <div class="text-center p-3 border-2 ${isPass ? 'bg-black border-black text-white' : 'bg-red-600 border-red-600 text-white'} rounded-xl shadow-lg">
                    <div class="text-[9px] font-bold opacity-70 uppercase">Outcome</div>
                    <div class="text-xl font-black italic uppercase">${outcome}</div>
                </div>
            </div>

            <div class="mt-12">
                <div class="flex justify-between items-end border-t border-slate-200 pt-8">
                    <img src="https://i.ibb.co.com/HDqfKG6K/Seal-school.png" class="h-20 object-contain">
                    <div class="text-center">
                        <img src="https://i.ibb.co.com/1C0fss2/Tarikul-sign.png" class="h-10 mx-auto mb-1">
                        <div class="w-32 border-b-2 border-black mx-auto mb-1"></div>
                        <p class="text-[10px] font-black uppercase">Controller of Examinations</p>
                    </div>
                </div>
                <p class="text-center text-[8px] text-slate-400 font-bold uppercase tracking-[0.5em] mt-8">
                    * OFFICIAL ACADEMIC TRANSCRIPT *
                </p>
            </div>
        </div>
    `;
}
