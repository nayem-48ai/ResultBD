
/**
 * Common Navbar for all HTML pages with Glassy UI and improved responsiveness
 */
export function renderNavbar(user = null) {
    const nav = document.createElement('nav');
    nav.className = "bg-white/80 backdrop-blur-md sticky top-0 z-[60] border-b border-slate-100 no-print";
    nav.innerHTML = `
        <div class="container mx-auto px-4 py-3 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <div class="bg-blue-600 p-1.5 rounded-lg text-white"><i data-lucide="graduation-cap" class="w-5 h-5"></i></div>
                <span class="font-black text-lg tracking-tighter">EduResult</span>
            </div>
            <div class="flex items-center gap-4">
                <a href="index.html" class="text-slate-500 hover:text-blue-600 font-bold text-xs uppercase tracking-widest">Home</a>
                ${user ? `<button id="nav-logout-btn" class="text-red-500 font-bold text-xs uppercase tracking-widest">Logout</button>` : `<a href="Login.html" class="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold text-xs">Admin</a>`}
            </div>
        </div>
    `;
    return nav;
}

export function renderMarksheet(data, meta) {
    const metaFields = ['Name', 'Student Name', 'Student', 'Roll No', 'ID', 'Roll Number', 'Student ID', 'Roll', 'Total', 'Total Marks', 'Percentage', 'Grade', 'GPA', 'Result', 'Status'];
    const subjects = Object.entries(data).filter(([k]) => !metaFields.includes(k)).sort();

    return `
        <div class="a4-container w-full max-w-[210mm] min-h-[290mm] bg-white border-[6px] border-double border-slate-900 p-6 sm:p-10 flex flex-col justify-between shadow-2xl rounded-[2rem] mx-auto">
            <div class="flex-grow">
                <div class="text-center border-b-2 border-slate-800 pb-4 mb-6">
                    <h1 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-wider uppercase">Hat Madhnogor High School</h1>
                    <p class="text-[10px] text-slate-500 font-bold tracking-widest uppercase">Recognition No: HM-9922 | Estd: 1970</p>
                    <div class="mt-3 bg-slate-900 text-white inline-block px-8 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">Academic Report Card</div>
                </div>

                <div class="bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-6 grid grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div><b class="text-slate-400 uppercase text-[9px]">Student:</b> <p class="font-black text-slate-900">${(data['Name'] || data['Student Name'] || 'N/A').toUpperCase()}</p></div>
                    <div><b class="text-slate-400 uppercase text-[9px]">Roll:</b> <p class="font-black text-slate-900">${data['Roll No'] || data['Roll'] || 'N/A'}</p></div>
                    <div><b class="text-slate-400 uppercase text-[9px]">Class:</b> <p class="font-black text-slate-900">${meta.className}</p></div>
                    <div><b class="text-slate-400 uppercase text-[9px]">Session:</b> <p class="font-black text-slate-900">${meta.year}</p></div>
                </div>

                <div class="text-center mb-4 uppercase font-black text-lg italic tracking-widest border-b-2 inline-block mx-auto w-full border-slate-100 pb-1">${meta.examName}</div>

                <div class="border-2 border-slate-800 rounded-xl overflow-hidden mb-6">
                    <table class="w-full text-left text-xs sm:text-sm">
                        <thead class="bg-slate-900 text-white uppercase text-[10px]">
                            <tr><th class="p-3">Subject</th><th class="p-3 text-center w-24">Marks</th></tr>
                        </thead>
                        <tbody>
                            ${subjects.map(([s, m]) => `
                                <tr class="border-b border-slate-100"><td class="p-2.5 font-bold text-slate-700 italic">${s}</td><td class="p-2.5 text-center font-black">${m}</td></tr>
                            `).join('')}
                        </tbody>
                        <tfoot class="bg-slate-50 font-black">
                            <tr><td class="p-3">Aggregate Total</td><td class="p-3 text-center">${data['Total'] || 'N/A'}</td></tr>
                        </tfoot>
                    </table>
                </div>

                <div class="grid grid-cols-3 gap-3 sm:gap-6 mb-8">
                    <div class="p-3 bg-blue-50 border border-blue-100 rounded-2xl text-center">
                        <p class="text-[8px] font-bold text-blue-500 uppercase tracking-tighter">Percentage</p>
                        <p class="text-lg sm:text-xl font-black text-blue-900">${data['Percentage'] || 'N/A'}%</p>
                    </div>
                    <div class="p-3 bg-green-50 border border-green-100 rounded-2xl text-center">
                        <p class="text-[8px] font-bold text-green-500 uppercase tracking-tighter">Grade</p>
                        <p class="text-lg sm:text-xl font-black text-green-900">${data['Grade'] || 'N/A'}</p>
                    </div>
                    <div class="p-3 bg-slate-900 rounded-2xl text-center text-white">
                        <p class="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Outcome</p>
                        <p class="text-lg sm:text-xl font-black uppercase italic">${data['Result'] || 'PASS'}</p>
                    </div>
                </div>
            </div>

            <div>
                <div class="flex justify-between items-end border-t-2 border-slate-100 pt-6">
                    <img src="https://i.ibb.co.com/HDqfKG6K/Seal-school.png" class="h-20 sm:h-24 object-contain">
                    <div class="text-center">
                        <img src="https://i.ibb.co.com/1C0fss2/Tarikul-sign.png" class="h-12 object-contain mx-auto mb-1">
                        <div class="w-40 border-b-2 border-slate-900 mb-1"></div>
                        <p class="text-[10px] font-black uppercase">Controller of Exams</p>
                    </div>
                </div>
                <p class="text-center text-[8px] text-slate-400 font-bold uppercase tracking-[0.4em] mt-4">* OFFICIAL INSTITUTIONAL RECORD *</p>
            </div>
        </div>
    `;
}
