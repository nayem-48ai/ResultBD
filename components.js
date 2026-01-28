/**
 * Modern Navbar with Logout Functionality
 */
export function renderNavbar(user = null) {
    const nav = document.createElement('nav');
    nav.className = "bg-white/90 backdrop-blur-md sticky top-0 z-[60] border-b border-slate-200 no-print shadow-sm";
    nav.innerHTML = `
        <div class="container mx-auto px-4 py-4 flex items-center justify-between">
            <a href="index.html" class="flex items-center gap-2 group">
                <div class="bg-blue-600 p-2 rounded-xl text-white shadow-lg"><i data-lucide="graduation-cap"></i></div>
                <span class="font-black text-xl tracking-tighter text-slate-800">EduResult</span>
            </a>
            <div class="flex items-center gap-6 font-black text-[10px] uppercase tracking-widest text-slate-500">
                <a href="index.html" class="hover:text-blue-600 transition-colors">Portal</a>
                ${user ? `
                    <a href="AdminDashboard.html" class="hover:text-blue-600 transition-colors">Admin</a>
                    <button id="nav-logout-btn" class="bg-slate-100 text-slate-800 px-4 py-2 rounded-xl hover:bg-slate-200 transition-all flex items-center gap-2">
                        <i data-lucide="log-out" class="w-3 h-3"></i> Logout
                    </button>
                ` : `
                    <a href="Login.html" class="bg-slate-900 text-white px-6 py-2.5 rounded-xl hover:bg-slate-800 shadow-xl transition-all">Staff Login</a>
                `}
            </div>
        </div>
    `;
    return nav;
}

/**
 * Professional Marksheet Renderer (A4 Print Optimized)
 */
export function renderMarksheet(data, meta) {
    const mainFields = ['Name', 'Student Name', 'Roll', 'Roll No', 'ID', 'Total', 'Total Marks', 'Average', 'Avg', 'Percentage', 'Grade', 'Result', 'Status'];
    
    // Sort subjects while excluding metadata
    const subjects = Object.entries(data).filter(([key]) => !mainFields.includes(key));
    const isPassed = !String(data['Result'] || data['Status'] || '').toUpperCase().includes('FAIL');

    return `
    <div class="a4-container p-10 border-4 border-double border-black bg-white flex flex-col justify-between mx-auto shadow-2xl transition-all">
        <div>
            <div class="text-center border-b-4 border-black pb-4 mb-6">
                <h1 class="text-4xl font-black text-black tracking-tighter uppercase">Hat Madhnogor High School</h1>
                <p class="text-sm font-bold tracking-[0.2em] mb-4">ESTABLISHED: 1970 | EIIN: 123456</p>
                <div class="bg-black text-white inline-block px-12 py-2 rounded-full font-black text-xs uppercase tracking-[0.4em]">Academic Transcript</div>
            </div>

            <div class="bg-slate-50 p-6 rounded-3xl border border-slate-200 mb-8 grid grid-cols-2 gap-y-4 text-sm font-bold uppercase">
                <div class="flex gap-2"><span class="text-slate-400">Student Name:</span> <span class="text-black">${data['Name'] || data['Student Name'] || 'Unknown'}</span></div>
                <div class="flex gap-2"><span class="text-slate-400">Roll Number:</span> <span class="text-black">${data['Roll'] || data['Roll No'] || 'N/A'}</span></div>
                <div class="flex gap-2"><span class="text-slate-400">Class:</span> <span class="text-black">${meta.className}</span></div>
                <div class="flex gap-2"><span class="text-slate-400">Session:</span> <span class="text-black">${meta.year}</span></div>
            </div>

            <div class="text-center mb-6">
                <h2 class="text-xl font-black border-b-2 border-black inline-block px-10 italic uppercase">${meta.examName}</h2>
            </div>

            <table class="w-full border-2 border-black mb-8">
                <thead class="bg-slate-100 text-xs font-black uppercase">
                    <tr>
                        <th class="p-3 border-r-2 border-b-2 border-black text-left">Subject Description</th>
                        <th class="p-3 border-b-2 border-black text-center w-40">Marks Obtained</th>
                    </tr>
                </thead>
                <tbody class="text-sm font-bold italic text-slate-700">
                    ${subjects.map(([s, m]) => `
                        <tr>
                            <td class="p-3 border-r-2 border-b border-slate-300">${s}</td>
                            <td class="p-3 border-b border-slate-300 text-center font-black text-black">${m}</td>
                        </tr>
                    `).join('')}
                    <tr class="border-t-4 border-black font-black text-black bg-slate-50">
                        <td class="p-3 border-r-2 uppercase">Total Aggregate Marks</td>
                        <td class="p-3 text-center">${data['Total'] || data['Total Marks'] || 'N/A'}</td>
                    </tr>
                    <tr class="font-black text-black bg-slate-50">
                        <td class="p-3 border-r-2 border-t border-slate-400 uppercase">Average / Percentage</td>
                        <td class="p-3 border-t border-slate-400 text-center">${data['Average'] || data['Avg'] || data['Percentage'] || 'N/A'}%</td>
                    </tr>
                </tbody>
            </table>

            <div class="grid grid-cols-3 gap-6 mb-12">
                <div class="border-2 border-black p-4 text-center rounded-2xl">
                    <p class="text-[9px] font-black uppercase text-slate-400 mb-1">Grade Point</p>
                    <p class="text-3xl font-black">${data['Grade'] || 'N/A'}</p>
                </div>
                <div class="bg-black text-white p-4 text-center rounded-2xl col-span-2 shadow-xl">
                    <p class="text-[9px] font-black uppercase text-slate-500 mb-1">Result Outcome</p>
                    <p class="text-3xl font-black tracking-widest">${(data['Result'] || data['Status'] || (isPassed ? 'PASS' : 'FAIL')).toUpperCase()}</p>
                </div>
            </div>
        </div>

        <div class="flex justify-between items-end pt-8 border-t-2 border-black mt-auto">
            <div class="text-center">
                <img src="https://i.ibb.co.com/HDqfKG6K/Seal-school.png" class="h-28 opacity-90 mx-auto">
            </div>
            <div class="text-center">
                <img src="https://i.ibb.co.com/1C0fss2/Tarikul-sign.png" class="h-16 mx-auto mb-1">
                <div class="border-t-2 border-black w-48 mb-1"></div>
                <p class="font-black text-[10px] uppercase">Controller of Examinations</p>
            </div>
        </div>
    </div>`;
}
