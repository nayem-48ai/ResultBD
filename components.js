
/**
 * Common Navbar for all HTML pages with Glassy UI and improved responsiveness
 */
export function renderNavbar(user = null) {
    const nav = document.createElement('nav');
    nav.className = "bg-white/80 backdrop-blur-md border-b no-print";
    nav.innerHTML = `
        <div class="container mx-auto px-4 py-3 flex justify-between items-center">
            <div class="flex items-center gap-2 font-black text-xl tracking-tighter">EduResult</div>
            <div class="flex gap-4 items-center">
                <a href="index.html" class="font-bold text-xs uppercase tracking-widest text-slate-500">Home</a>
                ${user ? `<button id="nav-logout-btn" class="text-red-500 font-bold text-xs uppercase">Logout</button>` : `<a href="Login.html" class="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold">Admin Login</a>`}
            </div>
        </div>
    `;
    return nav;
}

export function renderMarksheet(data, meta) {
    // Average এবং অন্যান্য মেটা ডাটা ফিল্টার আউট করা
    const metaFields = ['Name', 'Student Name', 'Student', 'Roll No', 'ID', 'Roll Number', 'Student ID', 'Roll', 'Total', 'Total Marks', 'Total Aggregate', 'Percentage', 'Average', 'Avg', 'Grade', 'GPA', 'Result', 'Status'];
    
    // শুধু বিষয়গুলো নেয়া
    const subjects = Object.entries(data)
        .filter(([k]) => !metaFields.includes(k))
        .sort((a, b) => a[0].localeCompare(b[0]));

    const totalMarks = data['Total'] || data['Total Marks'] || '0';
    const percentage = data['Percentage'] || data['Average'] || 'N/A';
    const grade = data['Grade'] || 'N/A';
    const outcome = String(data['Result'] || data['Status'] || 'PASS').toUpperCase();
    const isFailed = outcome.includes('FAIL');

    return `
        <div class="a4-container p-8 sm:p-12 border-[5px] border-double border-slate-900">
            <div class="flex-grow">
                <div class="text-center border-b-2 border-slate-800 pb-3 mb-6">
                    <h1 class="text-3xl font-black text-slate-900 tracking-tight uppercase">Hat Madhnogor High School</h1>
                    <p class="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Recognition No: HM-9922 | Estd: 1970</p>
                    <div class="mt-3 bg-slate-900 text-white inline-block px-10 py-1.5 rounded-full font-black uppercase text-[10px] tracking-[0.2em]">Academic Report Card</div>
                </div>

                <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-6 grid grid-cols-2 gap-x-12 gap-y-4">
                    <div><b class="text-[9px] text-slate-400 uppercase">Student Name:</b> <p class="font-black text-slate-900 text-sm uppercase">${(data['Name'] || data['Student Name'] || 'N/A')}</p></div>
                    <div><b class="text-[9px] text-slate-400 uppercase">Roll Number:</b> <p class="font-black text-slate-900 text-sm">${data['Roll No'] || data['Roll'] || 'N/A'}</p></div>
                    <div><b class="text-[9px] text-slate-400 uppercase">Class:</b> <p class="font-black text-slate-900 text-sm">${meta.className}</p></div>
                    <div><b class="text-[9px] text-slate-400 uppercase">Session:</b> <p class="font-black text-slate-900 text-sm">${meta.year}</p></div>
                </div>

                <div class="text-center mb-4 uppercase font-black text-xl italic tracking-widest text-slate-800 border-b border-slate-100 pb-1">${meta.examName}</div>

                <div class="border-2 border-slate-800 rounded-2xl overflow-hidden mb-6">
                    <table class="w-full text-sm">
                        <thead class="bg-slate-900 text-white uppercase text-[10px]">
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

                <div class="grid grid-cols-3 gap-6 mb-8">
                    <div class="p-4 bg-blue-50 border border-blue-100 rounded-2xl text-center">
                        <p class="text-[9px] font-bold text-blue-500 uppercase">Percentage</p>
                        <p class="text-xl font-black text-blue-900">${percentage}%</p>
                    </div>
                    <div class="p-4 bg-green-50 border border-green-100 rounded-2xl text-center">
                        <p class="text-[9px] font-bold text-green-500 uppercase">Grade</p>
                        <p class="text-xl font-black text-green-900">${grade}</p>
                    </div>
                    <div class="${isFailed ? 'bg-red-600 shadow-red-200' : 'bg-slate-900'} p-4 rounded-2xl text-center text-white shadow-xl">
                        <p class="text-[9px] font-bold opacity-70 uppercase">Outcome</p>
                        <p class="text-xl font-black tracking-widest">${outcome}</p>
                    </div>
                </div>
            </div>

            <div>
                <div class="flex justify-between items-end border-t-2 border-slate-800 pt-8">
                    <img src="https://i.ibb.co.com/HDqfKG6K/Seal-school.png" class="h-24 object-contain">
                    <div class="text-center">
                        <img src="https://i.ibb.co.com/1C0fss2/Tarikul-sign.png" class="h-16 object-contain mx-auto mb-1">
                        <div class="w-48 border-b-2 border-slate-900 mb-1"></div>
                        <p class="text-[10px] font-black uppercase text-slate-900">Controller of Examinations</p>
                    </div>
                </div>
                <p class="text-center text-[8px] text-slate-400 font-bold uppercase tracking-[0.4em] mt-6">* VALID ONLY WITH OFFICIAL INSTITUTIONAL HOLOGRAM *</p>
            </div>
        </div>
    `;
}
