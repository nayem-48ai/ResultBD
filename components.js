
/**
 * Common Navbar for all HTML pages with Glassy UI and improved responsiveness
 */
export function renderNavbar(user = null) {
    const nav = document.createElement('nav');
    nav.className = "bg-white/80 backdrop-blur-xl sticky top-0 z-[60] border-b border-slate-200/50 no-print transition-all duration-300 shadow-sm";
    nav.innerHTML = `
        <div class="container mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
            <a href="index.html" class="flex items-center gap-2 group transition-transform active:scale-95">
                <div class="bg-blue-600 p-2 rounded-xl group-hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">
                    <i data-lucide="graduation-cap" class="text-white w-5 h-5 sm:w-6 sm:h-6"></i>
                </div>
                <span class="font-black text-lg sm:text-xl tracking-tighter text-slate-800">EduResult</span>
            </a>
            <div class="flex items-center gap-3 sm:gap-6">
                <a href="index.html" class="text-slate-600 hover:text-blue-600 font-bold text-[10px] sm:text-xs uppercase tracking-widest flex items-center gap-1.5 transition-colors">
                    <i data-lucide="home" class="w-3.5 h-3.5 sm:w-4 sm:h-4"></i> <span class="hidden xs:inline">Home</span>
                </a>
                ${user ? `
                    <a href="AdminDashboard.html" class="text-slate-600 hover:text-blue-600 font-bold text-[10px] sm:text-xs uppercase tracking-widest flex items-center gap-1.5 transition-colors">
                        <i data-lucide="layout-dashboard" class="w-3.5 h-3.5 sm:w-4 sm:h-4"></i> <span class="hidden xs:inline">Dashboard</span>
                    </a>
                    <button id="nav-logout-btn" class="bg-slate-100 text-slate-700 px-3 sm:px-4 py-2 rounded-xl hover:bg-slate-200 font-bold text-[10px] sm:text-xs flex items-center gap-1.5 transition-all">
                        <i data-lucide="log-out" class="w-3.5 h-3.5 sm:w-4 sm:h-4"></i> <span>Logout</span>
                    </button>
                ` : `
                    <a href="Login.html" class="bg-slate-900 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl hover:bg-slate-800 font-bold text-[10px] sm:text-xs flex items-center gap-1.5 shadow-xl shadow-slate-200 transition-all active:scale-95">
                        <i data-lucide="shield-check" class="w-3.5 h-3.5 sm:w-4 sm:h-4"></i> <span>Admin</span>
                    </a>
                `}
            </div>
        </div>
    `;
    return nav;
}

/**
 * Common Marksheet Renderer - Optimized for Mobile & A4 Print
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

    // Sort subject list alphabetically/numerically
    subjectList.sort((a, b) => a[0].localeCompare(b[0], undefined, { numeric: true, sensitivity: 'base' }));

    const isFailed = String(data['Result'] || data['Status'] || '').toUpperCase().includes('FAIL');
    const studentName = (data['Name'] || data['Student Name'] || 'Unknown').toUpperCase();
    const rollNo = data['Roll No'] || data['Roll'] || 'N/A';

    return `
        <div class="a4-container p-4 sm:p-10 border-4 border-double border-slate-800 rounded-lg w-full max-w-4xl mx-auto bg-white shadow-2xl print:shadow-none print:border-slate-800 transition-all duration-500 overflow-hidden">
            <div class="text-center border-b-2 border-slate-800 pb-4 mb-4">
                <h1 class="text-xl sm:text-3xl font-black text-slate-900 tracking-widest uppercase mb-1">Hat Madhnogor High School</h1>
                <p class="text-[8px] sm:text-sm text-slate-600 font-medium mb-3 tracking-wider">Recognition No: HM-9922 | Established: 1970</p>
                <div class="bg-slate-900 text-white inline-block px-5 sm:px-8 py-1 sm:py-1.5 rounded-full font-bold uppercase tracking-[0.2em] text-[8px] sm:text-sm shadow-lg shadow-slate-200">Academic Report Card</div>
            </div>

            <div class="bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-100 mb-4">
                <div class="grid grid-cols-2 gap-x-4 sm:gap-x-12 gap-y-2 text-[10px] sm:text-sm">
                    <div class="flex flex-col sm:flex-row sm:items-center gap-1">
                        <b class="text-slate-400 uppercase text-[8px] sm:text-xs">Student Name:</b> 
                        <span class="font-black text-slate-800 truncate" title="${studentName}">${studentName}</span>
                    </div>
                    <div class="flex flex-col sm:flex-row sm:items-center gap-1">
                        <b class="text-slate-400 uppercase text-[8px] sm:text-xs">Roll Number:</b> 
                        <span class="font-black text-slate-800">${rollNo}</span>
                    </div>
                    <div class="flex flex-col sm:flex-row sm:items-center gap-1">
                        <b class="text-slate-400 uppercase text-[8px] sm:text-xs">Class:</b> 
                        <span class="font-black text-slate-800">${meta.className}</span>
                    </div>
                    <div class="flex flex-col sm:flex-row sm:items-center gap-1">
                        <b class="text-slate-400 uppercase text-[8px] sm:text-xs">Academic Session:</b> 
                        <span class="font-black text-slate-800">${meta.year}</span>
                    </div>
                </div>
            </div>

            <div class="text-center mb-4">
                <h2 class="text-xs sm:text-lg font-bold text-slate-800 border-b-2 inline-block pb-0.5 border-slate-400 px-6 uppercase tracking-widest italic">${meta.examName}</h2>
            </div>

            <div class="overflow-x-auto border border-slate-300 rounded-xl mb-4">
                <table class="w-full border-collapse">
                    <thead class="bg-slate-100 text-[8px] sm:text-sm uppercase font-black text-slate-700">
                        <tr>
                            <th class="p-2 sm:p-3 border-r border-slate-300 text-left">Subject Description</th>
                            <th class="p-2 sm:p-3 text-center w-20 sm:w-32">Obtained Marks</th>
                        </tr>
                    </thead>
                    <tbody class="text-[10px] sm:text-sm">
                        ${subjectList.map(([s, m], idx) => `
                            <tr class="${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}">
                                <td class="p-2 sm:p-2.5 border-r border-b border-slate-200 font-medium text-slate-600 italic truncate">${s}</td>
                                <td class="p-2 sm:p-2.5 border-b border-slate-200 text-center font-black text-slate-900">${m}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                    <tfoot class="bg-slate-900 text-white font-black text-[10px] sm:text-sm uppercase tracking-wider">
                        <tr>
                            <td class="p-2 sm:p-3 border-r border-slate-700">Aggregate Total Calculation</td>
                            <td class="p-2 sm:p-3 text-center">${data['Total'] || data['Total Marks'] || 'N/A'}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div class="grid grid-cols-2 gap-3 sm:gap-6 mb-6">
                <div class="flex gap-2 sm:gap-3">
                    <div class="flex-1 p-2 sm:p-3 bg-blue-50 border border-blue-100 rounded-2xl text-center shadow-sm">
                        <p class="text-blue-600 text-[7px] sm:text-[9px] font-black uppercase tracking-widest">Percentage</p>
                        <p class="text-sm sm:text-2xl font-black text-blue-900">${data['Percentage'] || data['Average'] || 'N/A'}%</p>
                    </div>
                    <div class="flex-1 p-2 sm:p-3 bg-green-50 border border-green-100 rounded-2xl text-center shadow-sm">
                        <p class="text-green-600 text-[7px] sm:text-[9px] font-black uppercase tracking-widest">Grade</p>
                        <p class="text-sm sm:text-2xl font-black text-green-900">${data['Grade'] || 'N/A'}</p>
                    </div>
                </div>
                <div class="${isFailed ? 'bg-red-50 border-red-200 text-red-600' : 'bg-slate-900 border-slate-800 text-white'} p-2 sm:p-3 border rounded-2xl text-center flex flex-col justify-center shadow-lg">
                    <p class="${isFailed ? 'text-red-400' : 'text-slate-400'} text-[7px] sm:text-[9px] font-black uppercase tracking-widest">Result Outcome</p>
                    <p class="text-sm sm:text-2xl font-black uppercase tracking-tighter">${(data['Result'] || data['Status'] || 'PASSED').toUpperCase()}</p>
                </div>
            </div>

            <div class="grid grid-cols-2 items-end pt-4 border-t-2 border-slate-800 gap-4 sm:gap-24">
                <div class="text-center group">
                    <img src="https://i.ibb.co.com/HDqfKG6K/Seal-school.png" class="h-16 sm:h-28 mx-auto object-contain transition-transform group-hover:rotate-12">
                </div>
                <div class="text-center flex flex-col items-center">
                    <img src="https://i.ibb.co.com/1C0fss2/Tarikul-sign.png" class="h-10 sm:h-20 object-contain mb-1 opacity-90 transition-opacity hover:opacity-100">
                    <div class="border-b-2 border-slate-800 mb-1 w-full max-w-[120px] sm:max-w-[200px] shadow-sm"></div>
                    <p class="font-black text-slate-900 text-[8px] sm:text-[10px] uppercase tracking-tighter">Controller of Examinations</p>
                </div>
            </div>
            <p class="mt-6 sm:mt-8 text-center text-[7px] sm:text-[8px] text-slate-400 font-bold uppercase tracking-[0.2em]">* Valid only with official institutional hologram *</p>
        </div>
    `;
}
