// --- components.js ---

export function renderMarksheet(data, meta) {
    const metaFields = ['Name', 'Student Name', 'Student', 'Roll No', 'ID', 'Roll Number', 'Roll', 'Total', 'Total Marks', 'Percentage', 'Average', 'Grade', 'GPA', 'Result', 'Status'];
    const subjects = Object.entries(data).filter(([k]) => !metaFields.includes(k)).sort();

    const outcome = String(data['Result'] || data['Status'] || 'PASS').toUpperCase();
    const total = data['Total'] || data['Total Marks'] || data['Aggregate Total'] || 'N/A';
    const percentage = data['Percentage'] || data['Average'] || 'N/A'; 
    const overallGrade = data['Grade'] || data['GPA'] || 'N/A';

    return `
        <div class="result-sheet text-slate-900 relative overflow-hidden font-sans" style="min-height: 280mm; max-height: 280mm;">
            <!-- Watermark/School Seal - প্রিন্টের জন্য ছোট করা -->
            <img src="https://i.ibb.co.com/HDqfKG6K/Seal-school.png" 
                 class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-32 opacity-[0.08] pointer-events-none"
                 style="max-height: 120mm !important;">
            
            <!-- Header Section - কম্প্যাক্ট -->
            <div class="text-center mb-3" style="margin-bottom: 5mm;">
                <h1 class="text-lg font-extrabold uppercase tracking-tight" style="font-size: 16pt !important;">Hat Madhnogor High School</h1>
                <p class="text-[8px] text-slate-500 font-bold uppercase tracking-wider mt-0.5" style="font-size: 8pt !important;">Recognition No: HM-9922 | Established: 1970</p>
                
                <div class="mt-1">
                    <div class="print-bg-dark bg-slate-900 text-white px-4 py-0.5 rounded-full text-[7px] font-black uppercase tracking-[0.1em] inline-block" style="font-size: 7pt !important;">
                        Academic Report Card
                    </div>
                </div>
            </div>

            <!-- Student Information - কম্প্যাক্ট -->
            <div class="grid grid-cols-2 gap-y-1 text-[10px] border-t border-b border-slate-200 py-2 mb-3" style="font-size: 9pt !important;">
                <!-- First Column -->
                <div class="flex items-center">
                    <span class="w-20 font-bold uppercase text-[8px] text-slate-500" style="font-size: 8pt !important;">Student Name</span>
                    <span class="font-bold ml-1" style="font-size: 9pt !important;">: ${data['Name'] || data['Student Name'] || 'N/A'}</span>
                </div>
                <div class="flex items-center">
                    <span class="w-20 font-bold uppercase text-[8px] text-slate-500" style="font-size: 8pt !important;">Roll Number</span>
                    <span class="font-bold ml-1" style="font-size: 9pt !important;">: ${data['Roll No'] || data['Roll'] || 'N/A'}</span>
                </div>
                <div class="flex items-center">
                    <span class="w-20 font-bold uppercase text-[8px] text-slate-500" style="font-size: 8pt !important;">Class</span>
                    <span class="font-bold ml-1" style="font-size: 9pt !important;">: ${meta.className}</span>
                </div>
                
                <!-- Second Column -->
                <div class="flex items-center">
                    <span class="w-20 font-bold uppercase text-[8px] text-slate-500" style="font-size: 8pt !important;">Session</span>
                    <span class="font-bold ml-1" style="font-size: 9pt !important;">: ${meta.year}</span>
                </div>
                <div class="flex items-center">
                    <span class="w-20 font-bold uppercase text-[8px] text-slate-500" style="font-size: 8pt !important;">Examination</span>
                    <span class="font-bold ml-1" style="font-size: 9pt !important;">: ${meta.examName}</span>
                </div>
                <div class="flex items-center">
                    <span class="w-20 font-bold uppercase text-[8px] text-slate-500" style="font-size: 8pt !important;">Overall Grade</span>
                    <span class="font-bold ml-1" style="font-size: 9pt !important;">: ${overallGrade}</span>
                </div>
            </div>

            <!-- Marks Table - কম্প্যাক্ট -->
            <div class="border border-slate-300 rounded mb-3 overflow-hidden" style="margin-bottom: 5mm;">
                <table class="w-full text-left" style="border-collapse: collapse; font-size: 9pt !important;">
                    <thead class="print-bg-dark bg-slate-900 text-white uppercase text-[8px] tracking-widest" style="font-size: 8pt !important;">
                        <tr>
                            <th class="py-1 px-2 font-bold" style="padding: 1mm 2mm;">Subject Description</th>
                            <th class="py-1 px-2 text-center w-16 font-bold" style="padding: 1mm 2mm; width: 16mm;">Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${subjects.map(([s, m]) => `
                            <tr class="border-b border-slate-100">
                                <td class="py-1 px-2 font-medium text-slate-700" style="padding: 1mm 2mm;">${s}</td>
                                <td class="py-1 px-2 text-center font-bold" style="padding: 1mm 2mm;">${m}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                    <tfoot class="bg-slate-50 border-t border-slate-300">
                        <tr>
                            <td class="py-1 px-2 uppercase text-[8px] font-bold text-slate-600" style="font-size: 8pt !important; padding: 1mm 2mm;">Aggregate Total</td>
                            <td class="py-1 px-2 text-center font-bold" style="font-size: 10pt !important; padding: 1mm 2mm;">${total}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <!-- Summary Section - কম্প্যাক্ট -->
            <div class="grid grid-cols-3 gap-2 mb-3" style="margin-bottom: 5mm;">
                <!-- Percentage -->
                <div class="border border-slate-200 p-2 rounded text-center bg-slate-50">
                    <p class="text-[7px] font-bold text-slate-500 uppercase mb-0.5" style="font-size: 7pt !important;">Percentage</p>
                    <p class="text-base font-black text-blue-600" style="font-size: 12pt !important;">${percentage}%</p>
                </div>

                <!-- Result Status -->
                <div class="border border-slate-200 p-2 rounded text-center bg-slate-50">
                    <p class="text-[7px] font-bold text-slate-500 uppercase mb-0.5" style="font-size: 7pt !important;">Result Status</p>
                    <p class="text-base font-black uppercase tracking-widest ${outcome === 'FAIL' ? 'text-red-600' : 'text-green-600'}" style="font-size: 12pt !important;">
                        ${outcome}
                    </p>
                </div>

                <!-- Signature -->
                <div class="border border-slate-200 p-2 rounded text-center bg-slate-50">
                    <div class="flex flex-col items-center justify-center h-full">
                        <img src="https://i.ibb.co.com/1C0fss2/Tarikul-sign.png" 
                             class="h-6 object-contain mb-0.5"
                             style="max-height: 15mm !important;">
                        <div class="w-24 border-b border-slate-900 mb-0.5"></div>
                        <p class="text-[6px] font-extrabold uppercase text-slate-900" style="font-size: 6pt !important;">
                            Controller of Examinations
                        </p>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="text-center pt-2 border-t border-slate-200" style="padding-top: 2mm !important;">
                <p class="text-[5px] text-slate-400 font-bold uppercase tracking-[0.2em]" style="font-size: 5pt !important;">
                    * COMPUTER GENERATED OFFICIAL TRANSCRIPT *
                </p>
            </div>
        </div>
    `;
}
