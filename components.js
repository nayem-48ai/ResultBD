
/**
 * Common Navbar for all HTML pages with Glassy UI and improved responsiveness
 */
// Clean URL Navigation Helper
const getBaseURL = () => {
    return window.location.origin + '/ResultBD/';
};

export function renderNavbar(user = null) {
    const nav = document.createElement('nav');
    nav.className = "bg-white/90 backdrop-blur-md border-b no-print sticky top-0 z-50";
    nav.innerHTML = `
        <div class="container mx-auto px-4 py-3 flex justify-between items-center">
            <div class="flex items-center gap-2 font-black text-xl tracking-tighter text-slate-800">
                <div class="bg-blue-600 p-1.5 rounded-lg text-white"><i data-lucide="graduation-cap" class="w-5 h-5"></i></div>
                <span>EduResult</span>
            </div>
            <div class="flex gap-4 items-center">
                <a href="${getBaseURL()}" class="font-bold text-[10px] uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors">Home</a>
                ${user ? `
                    <a href="${getBaseURL()}authority/" class="font-bold text-[10px] uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors">Dashboard</a>
                    <button id="nav-logout-btn" class="text-red-500 font-bold text-[10px] uppercase tracking-widest">Logout</button>
                ` : `
                    <a href="${getBaseURL()}Login/" class="bg-slate-900 text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">Admin</a>
                `}
            </div>
        </div>
    `;
    return nav;
}

// Export to CSV Functionality for Admin
export function exportToCSV(filename, rows) {
    if (!rows || !rows.length) return;
    const separator = ',';
    const keys = Object.keys(rows[0]);
    const csvContent = [
        keys.join(separator),
        ...rows.map(row => keys.map(k => `"${String(row[k] || '').replace(/"/g, '""')}"`).join(separator))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

export function renderMarksheet(data, meta) {
    const metaFields = ['Name', 'Student Name', 'Student', 'Roll No', 'ID', 'Roll Number', 'Student ID', 'Roll', 'Total', 'Total Marks', 'Percentage', 'Average', 'Avg', 'Grade', 'GPA', 'Result', 'Status'];
    const subjects = Object.entries(data).filter(([k]) => !metaFields.includes(k)).sort();

    const total = data['Total'] || data['Total Marks'] || 'N/A';
    const percentage = data['Percentage'] || data['Average'] || 'N/A';
    const grade = data['Grade'] || 'N/A';
    const status = String(data['Result'] || data['Status'] || 'PASS').toUpperCase();

    return `
        <div class="a4-container p-12">
            <div class="flex-grow">
                <div class="text-center border-b-2 border-slate-900 pb-4 mb-8">
                    <h1 class="text-4xl font-black text-slate-900 tracking-tight uppercase">Hat Madhnogor High School</h1>
                    <p class="text-[11px] text-slate-600 font-bold uppercase tracking-widest">Recognition No: HM-9922 | Established: 1970</p>
                    <div class="mt-4 bg-slate-900 text-white inline-block px-12 py-2 rounded-full font-black uppercase text-xs tracking-[0.3em]">Academic Report Card</div>
                </div>

                <div class="bg-slate-50 p-6 rounded-3xl border border-slate-200 mb-8 grid grid-cols-2 gap-y-6">
                    <div><b class="text-[10px] text-slate-400 uppercase tracking-widest">Student Name:</b> <p class="font-black text-slate-900 text-lg uppercase">${(data['Name'] || data['Student Name'] || 'N/A')}</p></div>
                    <div><b class="text-[10px] text-slate-400 uppercase tracking-widest">Roll Number:</b> <p class="font-black text-slate-900 text-lg">${data['Roll No'] || data['Roll'] || 'N/A'}</p></div>
                    <div><b class="text-[10px] text-slate-400 uppercase tracking-widest">Class:</b> <p class="font-black text-slate-900 text-lg uppercase">${meta.className}</p></div>
                    <div><b class="text-[10px] text-slate-400 uppercase tracking-widest">Session:</b> <p class="font-black text-slate-900 text-lg">${meta.year}</p></div>
                </div>

                <div class="text-center mb-6 uppercase font-black text-2xl italic tracking-[0.2em] text-slate-800">${meta.examName}</div>

                <div class="border-2 border-slate-900 rounded-3xl overflow-hidden mb-8 shadow-sm">
                    <table class="w-full text-sm">
                        <thead class="bg-slate-900 text-white uppercase text-xs">
                            <tr><th class="p-4 text-left tracking-widest">Subject Description</th><th class="p-4 text-center w-32">Marks</th></tr>
                        </thead>
                        <tbody class="text-slate-900">
                            ${subjects.map(([s, m]) => `
                                <tr class="border-b border-slate-200">
                                    <td class="p-4 font-bold italic text-slate-700">${s}</td>
                                    <td class="p-4 text-center font-black text-base">${m}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                        <tfoot class="bg-slate-100 font-black border-t-2 border-slate-900">
                            <tr>
                                <td class="p-4 uppercase text-xs tracking-widest">Aggregate Total Calculation</td>
                                <td class="p-4 text-center text-xl">${total}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <div class="grid grid-cols-3 gap-6 mb-10">
                    <div class="p-5 bg-blue-50 border border-blue-100 rounded-3xl text-center">
                        <p class="text-[10px] font-black text-blue-500 uppercase tracking-widest">Percentage</p>
                        <p class="text-2xl font-black text-blue-900">${percentage}%</p>
                    </div>
                    <div class="p-5 bg-green-50 border border-green-100 rounded-3xl text-center">
                        <p class="text-[10px] font-black text-green-500 uppercase tracking-widest">Grade</p>
                        <p class="text-2xl font-black text-green-900">${grade}</p>
                    </div>
                    <div class="${status.includes('FAIL') ? 'bg-red-600' : 'bg-slate-900'} p-5 rounded-3xl text-center text-white shadow-xl">
                        <p class="text-[10px] font-bold opacity-70 uppercase tracking-widest">Outcome</p>
                        <p class="text-2xl font-black tracking-tighter uppercase italic">${status}</p>
                    </div>
                </div>
            </div>

            <div class="mt-auto">
                <div class="flex justify-between items-end border-t-2 border-slate-900 pt-8">
                    <img src="https://i.ibb.co.com/HDqfKG6K/Seal-school.png" class="h-28 object-contain">
                    <div class="text-center">
                        <img src="https://i.ibb.co.com/1C0fss2/Tarikul-sign.png" class="h-16 object-contain mx-auto mb-1">
                        <div class="w-56 border-b-2 border-slate-900 mb-2"></div>
                        <p class="text-[11px] font-black uppercase text-slate-900 tracking-tighter">Controller of Examinations</p>
                    </div>
                </div>
                <p class="text-center text-[9px] text-slate-400 font-bold uppercase tracking-[0.5em] mt-8">VALID ONLY WITH OFFICIAL INSTITUTIONAL HOLOGRAM</p>
            </div>
        </div>
    `;
}
