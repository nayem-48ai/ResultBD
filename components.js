// --- components.js ---

export function renderMarksheet(data, meta) {
    const metaFields = ['Name', 'Student Name', 'Student', 'Roll No', 'ID', 'Roll Number', 'Roll', 'Total', 'Total Marks', 'Percentage', 'Average', 'Grade', 'GPA', 'Result', 'Status'];
    const subjects = Object.entries(data).filter(([k]) => !metaFields.includes(k)).sort();

    const outcome = String(data['Result'] || data['Status'] || 'PASS').toUpperCase();
    const total = data['Total'] || data['Total Marks'] || data['Aggregate Total'] || 'N/A';
    const percentage = data['Percentage'] || data['Average'] || 'N/A'; 
    const overallGrade = data['Grade'] || data['GPA'] || 'N/A';

    return `
        <div class="result-sheet text-slate-900 relative overflow-hidden font-sans" style="page-break-inside: avoid; page-break-after: avoid;">
            <!-- Watermark/School Seal -->
            <img src="https://i.ibb.co.com/HDqfKG6K/Seal-school.png" 
                 class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-48 opacity-10 pointer-events-none">
            
            <!-- Header Section -->
            <div class="text-center mb-4">
                <h1 class="text-xl sm:text-2xl font-extrabold uppercase tracking-tight">Hat Madhnogor High School</h1>
                <p class="text-[9px] text-slate-500 font-bold uppercase tracking-wider mt-1">Recognition No: HM-9922 | Established: 1970</p>
                
                <div class="mt-2">
                    <div class="print-bg-dark bg-slate-900 text-white px-6 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.2em] inline-block">
                        Academic Report Card
                    </div>
                </div>
            </div>

            <!-- Student Information - Responsive Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-[11px] border-t border-b border-slate-200 py-3 mb-4">
                <!-- First Column -->
                <div class="flex items-center">
                    <span class="w-24 font-bold uppercase text-[9px] text-slate-500">Student Name</span>
                    <span class="font-bold ml-2">: ${data['Name'] || data['Student Name'] || 'N/A'}</span>
                </div>
                <div class="flex items-center">
                    <span class="w-24 font-bold uppercase text-[9px] text-slate-500">Roll Number</span>
                    <span class="font-bold ml-2">: ${data['Roll No'] || data['Roll'] || 'N/A'}</span>
                </div>
                <div class="flex items-center">
                    <span class="w-24 font-bold uppercase text-[9px] text-slate-500">Class</span>
                    <span class="font-bold ml-2">: ${meta.className}</span>
                </div>
                
                <!-- Second Column -->
                <div class="flex items-center">
                    <span class="w-24 font-bold uppercase text-[9px] text-slate-500">Session</span>
                    <span class="font-bold ml-2">: ${meta.year}</span>
                </div>
                <div class="flex items-center">
                    <span class="w-24 font-bold uppercase text-[9px] text-slate-500">Examination</span>
                    <span class="font-bold ml-2">: ${meta.examName}</span>
                </div>
                <div class="flex items-center">
                    <span class="w-24 font-bold uppercase text-[9px] text-slate-500">Overall Grade</span>
                    <span class="font-bold ml-2">: ${overallGrade}</span>
                </div>
            </div>

            <!-- Marks Table -->
            <div class="border border-slate-300 rounded-lg mb-4 overflow-hidden">
                <table class="w-full text-left text-sm" style="border-collapse: collapse;">
                    <thead class="print-bg-dark bg-slate-900 text-white uppercase text-[9px] tracking-widest">
                        <tr>
                            <th class="py-2 px-3 font-bold border-b border-slate-600">Subject Description</th>
                            <th class="py-2 px-3 text-center w-20 font-bold border-b border-slate-600">Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${subjects.map(([s, m]) => `
                            <tr class="border-b border-slate-100">
                                <td class="py-2 px-3 font-medium text-slate-700">${s}</td>
                                <td class="py-2 px-3 text-center font-bold">${m}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                    <tfoot class="bg-slate-50 border-t border-slate-300">
                        <tr>
                            <td class="py-2 px-3 uppercase text-[9px] font-bold text-slate-600">Aggregate Total</td>
                            <td class="py-2 px-3 text-center font-bold text-base">${total}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <!-- Summary Section -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <!-- Percentage -->
                <div class="border border-slate-200 p-3 rounded-xl text-center bg-slate-50">
                    <p class="text-[8px] font-bold text-slate-500 uppercase mb-1">Percentage</p>
                    <p class="text-lg font-black text-blue-600">${percentage}%</p>
                </div>

                <!-- Result Status -->
                <div class="border border-slate-200 p-3 rounded-xl text-center bg-slate-50">
                    <p class="text-[8px] font-bold text-slate-500 uppercase mb-1">Result Status</p>
                    <p class="text-lg font-black uppercase tracking-widest ${outcome === 'FAIL' ? 'text-red-600' : 'text-green-600'}">
                        ${outcome}
                    </p>
                </div>

                <!-- Signature -->
                <div class="border border-slate-200 p-3 rounded-xl text-center bg-slate-50">
                    <div class="flex flex-col items-center justify-center h-full">
                        <img src="https://i.ibb.co.com/1C0fss2/Tarikul-sign.png" 
                             class="h-8 object-contain mb-1">
                        <div class="w-32 border-b border-slate-900 mb-1"></div>
                        <p class="text-[7px] font-extrabold uppercase text-slate-900">
                            Controller of Examinations
                        </p>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="text-center pt-4 border-t border-slate-200">
                <p class="text-[6px] text-slate-400 font-bold uppercase tracking-[0.3em]">
                    * COMPUTER GENERATED OFFICIAL TRANSCRIPT *
                </p>
            </div>
        </div>
    `;
}
