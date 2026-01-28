
/**
 * Common Navbar for all HTML pages with Glassy UI and improved responsiveness
 */
export function renderNavbar(user = null) {
    const nav = document.createElement('nav');
    nav.className = "bg-white border-b p-4 no-print sticky top-0 z-50 shadow-sm";
    nav.innerHTML = `
        <div class="container mx-auto flex justify-between items-center">
            <a href="index.html" class="font-black text-xl flex items-center gap-2"><i data-lucide="graduation-cap" class="text-blue-600"></i> EduResult</a>
            <div class="flex gap-4">
                <a href="index.html" class="text-xs font-black uppercase">Home</a>
                ${user ? `<a href="AdminDashboard.html" class="text-xs font-black uppercase text-blue-600">Admin</a>` : `<a href="Login.html" class="text-xs font-black uppercase">Login</a>`}
            </div>
        </div>
    `;
    return nav;
}

export function renderMarksheet(data, meta) {
    const exclude = ['Name', 'Student Name', 'Roll', 'Roll No', 'ID', 'Total', 'Percentage', 'Grade', 'Result', 'Status'];
    const subjects = Object.entries(data).filter(([k]) => !exclude.includes(k));
    
    return `
    <div class="a4-container">
        <div class="header text-center border-b-4 border-black pb-4 mb-6">
            <h1 class="text-4xl font-black uppercase tracking-tighter">Hat Madhnogor High School</h1>
            <p class="font-bold text-sm tracking-widest">Established: 1970 | EIIN: 123456</p>
            <div class="mt-4 bg-black text-white inline-block px-10 py-2 rounded-full font-black text-sm uppercase">Academic Transcript</div>
        </div>

        <div class="grid grid-cols-2 gap-4 text-sm mb-6 bg-slate-50 p-6 rounded-2xl border">
            <div><b>NAME:</b> ${String(data['Name'] || data['Student Name'] || '').toUpperCase()}</div>
            <div><b>ROLL:</b> ${data['Roll'] || data['Roll No'] || 'N/A'}</div>
            <div><b>CLASS:</b> ${meta.className}</div>
            <div><b>SESSION:</b> ${meta.year}</div>
        </div>

        <div class="text-center mb-4"><h2 class="text-xl font-black border-b-2 border-black inline-block px-6 uppercase italic">${meta.examName}</h2></div>

        <table class="w-full border-2 border-black mb-6">
            <thead class="bg-slate-100 uppercase text-xs font-black">
                <tr>
                    <th class="p-3 border-2 border-black text-left">Subject Description</th>
                    <th class="p-3 border-2 border-black text-center w-32">Marks</th>
                </tr>
            </thead>
            <tbody class="font-bold">
                ${subjects.map(([s, m]) => `
                    <tr>
                        <td class="p-3 border-x-2 border-b border-slate-300 italic">${s}</td>
                        <td class="p-3 border-x-2 border-b border-slate-300 text-center">${m}</td>
                    </tr>
                `).join('')}
            </tbody>
            <tfoot class="border-t-4 border-black bg-slate-900 text-white font-black uppercase text-sm">
                <tr>
                    <td class="p-3 border-2 border-black">Aggregate Total Marks</td>
                    <td class="p-3 border-2 border-black text-center">${data['Total'] || 'N/A'}</td>
                </tr>
            </tfoot>
        </table>

        <div class="grid grid-cols-3 gap-4 mb-10">
            <div class="border-2 border-black p-4 text-center rounded-xl">
                <p class="text-[10px] font-black uppercase">Percentage</p>
                <p class="text-2xl font-black">${data['Percentage'] || 'N/A'}%</p>
            </div>
            <div class="border-2 border-black p-4 text-center rounded-xl">
                <p class="text-[10px] font-black uppercase">Grade</p>
                <p class="text-2xl font-black">${data['Grade'] || 'N/A'}</p>
            </div>
            <div class="bg-black text-white p-4 text-center rounded-xl">
                <p class="text-[10px] font-black uppercase text-slate-400">Result Status</p>
                <p class="text-2xl font-black uppercase">${data['Result'] || 'PASSED'}</p>
            </div>
        </div>

        <div class="flex justify-between items-end pt-10 border-t-2 border-black mt-auto">
            <img src="https://i.ibb.co.com/HDqfKG6K/Seal-school.png" class="h-24 opacity-80">
            <div class="text-center">
                <img src="https://i.ibb.co.com/1C0fss2/Tarikul-sign.png" class="h-16 mx-auto mb-2">
                <div class="border-t-2 border-black w-48 mx-auto"></div>
                <p class="font-black text-[10px] uppercase mt-1">Controller of Examinations</p>
            </div>
        </div>
    </div>`;
}
