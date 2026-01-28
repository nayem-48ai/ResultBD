
/**
 * Common Navbar for all HTML pages with Glassy UI and improved responsiveness
 */
export function renderMarksheet(data, meta) {
    const metaFields = ['Name', 'Student Name', 'Student', 'Roll No', 'ID', 'Roll Number', 'Student ID', 'Roll', 'Total', 'Total Marks', 'Total Aggregate', 'Percentage', 'Average', 'Avg', 'Grade', 'GPA', 'Result', 'Status'];
    
    let subjectList = [];
    if (meta.headers) {
        meta.headers.forEach(h => {
            if (!metaFields.includes(h) && data[h] !== undefined) subjectList.push([h, data[h]]);
        });
    } else {
        subjectList = Object.entries(data).filter(([k]) => !metaFields.includes(k));
    }

    subjectList.sort((a, b) => a[0].localeCompare(b[0], undefined, { numeric: true, sensitivity: 'base' }));

    const isFailed = String(data['Result'] || data['Status'] || '').toUpperCase().includes('FAIL');
    const studentName = (data['Name'] || data['Student Name'] || 'Unknown').toUpperCase();
    const rollNo = data['Roll No'] || data['Roll'] || 'N/A';

    return `
        <div class="a4-container bg-white">
            <div class="flex-grow">
                <div class="text-center border-b-2 border-slate-800 pb-3 mb-5">
                    <h1 class="text-3xl font-black text-slate-900 tracking-widest uppercase mb-1">Hat Madhnogor High School</h1>
                    <p class="text-[10px] text-slate-600 font-bold mb-3 tracking-widest uppercase">Recognition No: HM-9922 | Established: 1970</p>
                    <div class="bg-slate-900 text-white inline-block px-10 py-2 rounded-full font-black uppercase tracking-[0.3em] text-[10px] shadow-lg">Academic Report Card</div>
                </div>

                <div class="bg-slate-50 p-5 rounded-2xl border border-slate-100 mb-6 shadow-inner">
                    <div class="grid grid-cols-2 gap-x-12 gap-y-3 text-[13px]">
                        <div class="flex items-center gap-2">
                            <b class="text-slate-400 uppercase text-[10px] tracking-tighter">Student Name:</b> 
                            <span class="font-black text-slate-900 truncate uppercase">${studentName}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <b class="text-slate-400 uppercase text-[10px] tracking-tighter">Roll Number:</b> 
                            <span class="font-black text-slate-900">${rollNo}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <b class="text-slate-400 uppercase text-[10px] tracking-tighter">Class:</b> 
                            <span class="font-black text-slate-900">${meta.className}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <b class="text-slate-400 uppercase text-[10px] tracking-tighter">Session:</b> 
                            <span class="font-black text-slate-900">${meta.year}</span>
                        </div>
                    </div>
                </div>

                <div class="text-center mb-4">
                    <h2 class="text-xl font-black text-slate-900 border-b-2 inline-block pb-1 border-slate-800 px-10 uppercase tracking-[0.2em] italic">${meta.examName}</h2>
                </div>

                <div class="overflow-hidden border-2 border-slate-800 rounded-2xl mb-6">
                    <table class="w-full border-collapse">
                        <thead class="bg-slate-100 text-[11px] uppercase font-black text-slate-700">
                            <tr>
                                <th class="p-2.5 border-r-2 border-b-2 border-slate-800 text-left">Subject Description</th>
                                <th class="p-2.5 border-b-2 border-slate-800 text-center w-32">Marks</th>
                            </tr>
                        </thead>
                        <tbody class="text-[13px]">
                            ${subjectList.map(([s, m], idx) => `
                                <tr class="${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}">
                                    <td class="p-2 border-r border-b border-slate-200 font-semibold text-slate-700 italic">${s}</td>
                                    <td class="p-2 border-b border-slate-200 text-center font-black text-slate-900">${m}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                        <tfoot class="bg-slate-900 text-white font-black text-[11px] uppercase tracking-[0.2em]">
                            <tr>
                                <td class="p-2.5 border-r border-slate-700">Aggregate Total Calculation</td>
                                <td class="p-2.5 text-center">${data['Total'] || data['Total Marks'] || 'N/A'}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <div class="grid grid-cols-2 gap-6 mb-8">
                    <div class="grid grid-cols-2 gap-4">
                        <div class="p-3 bg-blue-50 border-2 border-blue-100 rounded-2xl text-center">
                            <p class="text-blue-600 text-[9px] font-black uppercase tracking-tighter">Percentage</p>
                            <p class="text-2xl font-black text-blue-900">${data['Percentage'] || data['Average'] || 'N/A'}%</p>
                        </div>
                        <div class="p-3 bg-green-50 border-2 border-green-100 rounded-2xl text-center">
                            <p class="text-green-600 text-[9px] font-black uppercase tracking-tighter">Grade</p>
                            <p class="text-2xl font-black text-green-900">${data['Grade'] || 'N/A'}</p>
                        </div>
                    </div>
                    <div class="${isFailed ? 'bg-red-50 border-red-200 text-red-600' : 'bg-slate-900 border-slate-800 text-white'} p-3 border-2 rounded-2xl text-center flex flex-col justify-center">
                        <p class="${isFailed ? 'text-red-400' : 'text-slate-400'} text-[9px] font-black uppercase tracking-widest">Result Outcome</p>
                        <p class="text-2xl font-black uppercase tracking-tighter">${(data['Result'] || data['Status'] || 'PASSED').toUpperCase()}</p>
                    </div>
                </div>
            </div>

            <div>
                <div class="grid grid-cols-2 items-end pt-6 border-t-2 border-slate-800 gap-48">
                    <div class="text-center">
                        <img src="https://i.ibb.co.com/HDqfKG6K/Seal-school.png" class="h-28 mx-auto object-contain">
                    </div>
                    <div class="text-center flex flex-col items-center">
                        <img src="https://i.ibb.co.com/1C0fss2/Tarikul-sign.png" class="h-16 object-contain mb-1">
                        <div class="border-b-2 border-slate-800 mb-1 w-full max-w-[200px]"></div>
                        <p class="font-black text-slate-900 text-[10px] uppercase tracking-tighter">Controller of Examinations</p>
                    </div>
                </div>
                <p class="mt-4 text-center text-[9px] text-slate-400 font-bold uppercase tracking-[0.3em]">* VALID ONLY WITH OFFICIAL INSTITUTIONAL HOLOGRAM *</p>
            </div>
        </div>
    `;
}
