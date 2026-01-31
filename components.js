// --- components.js ---
export function renderMarksheet(data, meta) {
    const metaFields = ['Name', 'Student Name', 'Student', 'Roll No', 'ID', 'Roll Number', 'Roll', 'Total', 'Total Marks', 'Percentage', 'Average', 'Grade', 'GPA', 'Result', 'Status'];
    const subjects = Object.entries(data).filter(([k]) => !metaFields.includes(k)).sort();

    // ডাটা ফিক্স এবং ডিফল্ট ভ্যালু সেট করা
    const outcome = String(data['Result'] || data['Status'] || 'PASS').toUpperCase();
    const total = data['Total'] || data['Total Marks'] || data['Aggregate Total'] || 'N/A';
    // এক্সেল ফাইলে 'Percentage' অথবা 'Average' নামে কলাম থাকতে হবে
    const percentage = data['Percentage'] || data['Average'] || 'N/A'; 
    const overallGrade = data['Grade'] || data['GPA'] || 'N/A';

    return `
        <div class="result-sheet text-slate-900 relative overflow-hidden">
            <div class="text-center mb-6 relative z-10">
                <img src="https://i.ibb.co.com/HDqfKG6K/Seal-school.png" class="absolute top-0 left-1/2 transform -translate-x-1/2 h-24 opacity-[0.08] pointer-events-none">
                
                <h1 class="text-2xl sm:text-3xl font-extrabold uppercase relative">Hat Madhnogor High School</h1>
                <p class="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">Recognition No: HM-9922 | Established: 1970</p>
                
                <div class="mt-3 inline-block">
                    <div class="print-bg-dark bg-slate-900 text-white px-6 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em]">Academic Report Card</div>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 text-[12px] border-t border-b border-slate-200 py-4 mb-6 relative z-10">
                <div class="flex"><span class="w-28 font-bold uppercase text-[10px] text-slate-500">Student Name</span> <span class="font-bold">: ${data['Name'] || data['Student Name'] || 'N/A'}</span></div>
                <div class="flex"><span class="w-28 font-bold uppercase text-[10px] text-slate-500">Roll Number</span> <span class="font-bold">: ${data['Roll No'] || data['Roll'] || 'N/A'}</span></div>
                <div class="flex"><span class="w-28 font-bold uppercase text-[10px] text-slate-500">Class</span> <span class="font-bold">: ${meta.className}</span></div>
                <div class="flex"><span class="w-28 font-bold uppercase text-[10px] text-slate-500">Session</span> <span class="font-bold">: ${meta.year}</span></div>
                <div class="flex"><span class="w-28 font-bold uppercase text-[10px] text-slate-500">Examination</span> <span class="font-bold">: ${meta.examName}</span></div>
                <div class="flex"><span class="w-28 font-bold uppercase text-[10px] text-slate-500">Overall Grade</span> <span class="font-bold">: ${overallGrade}</span></div>
            </div>

            <div class="overflow-hidden border border-slate-900 rounded-lg mb-6 relative z-10">
                <table class="w-full text-left text-sm">
                    <thead class="print-bg-dark bg-slate-900 text-white uppercase text-[9px] tracking-widest">
                        <tr>
                            <th class="py-2 px-4">Subject Description</th>
                            <th class="py-2 px-4 text-center w-24">Marks</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200">
                        ${subjects.map(([s, m]) => `
                            <tr>
                                <td class="py-2 px-4 font-medium text-slate-700 italic">${s}</td>
                                <td class="py-2 px-4 text-center font-bold">${m}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                    <tfoot class="bg-slate-50 border-t border-slate-900 font-bold">
                        <tr>
                            <td class="py-2 px-4 uppercase text-[10px]">Aggregate Total</td>
                            <td class="py-2 px-4 text-center text-base">${total}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div class="grid grid-cols-3 gap-3 mb-6 relative z-10">
                <div class="border border-slate-200 p-2 rounded-xl text-center">
                    <p class="text-[9px] font-bold text-slate-400 uppercase mb-1">Percentage</p>
                    <p class="text-lg font-black text-blue-600">${percentage}%</p>
                </div>
                <div class="border border-slate-200 p-2 rounded-xl text-center">
                    <p class="text-[9px] font-bold text-slate-400 uppercase mb-1">Letter Grade</p>
                    <p class="text-lg font-black text-green-600">${overallGrade}</p>
                </div>
                <div class="print-bg-dark bg-slate-900 p-2 rounded-xl text-center text-white">
                    <p class="text-[9px] font-bold opacity-60 uppercase mb-1">Outcome</p>
                    <p class="text-lg font-black uppercase tracking-tighter">${outcome}</p>
                </div>
            </div>

            <div class="flex justify-end items-end border-t border-slate-200 pt-4 relative z-10">
                <div class="text-center">
                    <img src="https://i.ibb.co.com/1C0fss2/Tarikul-sign.png" class="h-10 object-contain mx-auto">
                    <p class="text-[8px] font-bold uppercase text-slate-900 mt-1">Controller of Examinations</p>
                </div>
            </div>
            
            <div class="text-center mt-6 relative z-10">
                <p class="text-[7px] text-slate-400 font-bold uppercase tracking-[0.5em]">* COMPUTER GENERATED OFFICIAL TRANSCRIPT *</p>
            </div>
        </div>
    `;
}
