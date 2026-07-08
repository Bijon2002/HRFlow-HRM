import React from 'react';

const HRDashboard = () => {
  return (
    <div className="w-full h-full">
      
{/**/}
<aside className="fixed left-0 top-0 h-full w-[240px] bg-primary dark:bg-primary-container border-r border-outline-variant dark:border-outline shadow-sm z-50 flex flex-col p-4 gap-base hidden md:flex">
<div className="flex items-center gap-3 mb-8 px-2">
<div className="w-8 h-8 rounded bg-primary-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-on-primary">corporate_fare</span>
</div>
<div>
<h1 className="font-headline-md text-headline-md font-bold text-on-primary dark:text-on-primary-container leading-none">HRFlow</h1>
<p className="font-label-md text-label-md text-on-primary-container mt-1">Management Suite</p>
</div>
</div>
<button className="w-full bg-secondary hover:bg-secondary-container text-on-secondary hover:text-on-secondary-container transition-colors duration-200 py-2.5 rounded-lg font-label-md text-label-md flex items-center justify-center gap-2 mb-4">
<span className="material-symbols-outlined text-[18px]">add</span>
            Post New Job
        </button>
<nav className="flex-1 flex flex-col gap-2">
{/**/}
<a className="flex items-center gap-3 px-4 py-3 bg-secondary dark:bg-secondary-container text-on-secondary dark:text-on-secondary-container rounded-lg opacity-90 transition-all font-label-md text-label-md" href="#">
<span className="material-symbols-outlined text-[20px]">dashboard</span>
                Dashboard
            </a>
<a className="flex items-center gap-3 px-4 py-3 text-on-primary-fixed-variant dark:text-on-primary-container hover:bg-primary-container dark:hover:bg-primary rounded-lg transition-colors duration-200 font-label-md text-label-md" href="#">
<span className="material-symbols-outlined text-[20px]">group</span>
                Candidates
            </a>
<a className="flex items-center gap-3 px-4 py-3 text-on-primary-fixed-variant dark:text-on-primary-container hover:bg-primary-container dark:hover:bg-primary rounded-lg transition-colors duration-200 font-label-md text-label-md" href="#">
<span className="material-symbols-outlined text-[20px]">event_available</span>
                Interviews
            </a>
<a className="flex items-center gap-3 px-4 py-3 text-on-primary-fixed-variant dark:text-on-primary-container hover:bg-primary-container dark:hover:bg-primary rounded-lg transition-colors duration-200 font-label-md text-label-md" href="#">
<span className="material-symbols-outlined text-[20px]">badge</span>
                Employees
            </a>
<a className="flex items-center gap-3 px-4 py-3 text-on-primary-fixed-variant dark:text-on-primary-container hover:bg-primary-container dark:hover:bg-primary rounded-lg transition-colors duration-200 font-label-md text-label-md" href="#">
<span className="material-symbols-outlined text-[20px]">analytics</span>
                Reports
            </a>
<a className="flex items-center gap-3 px-4 py-3 text-on-primary-fixed-variant dark:text-on-primary-container hover:bg-primary-container dark:hover:bg-primary rounded-lg transition-colors duration-200 font-label-md text-label-md" href="#">
<span className="material-symbols-outlined text-[20px]">settings</span>
                Settings
            </a>
</nav>
<div className="mt-auto flex flex-col gap-2 pt-4 border-t border-primary-container">
<a className="flex items-center gap-3 px-4 py-3 text-on-primary-fixed-variant dark:text-on-primary-container hover:bg-primary-container dark:hover:bg-primary rounded-lg transition-colors duration-200 font-label-md text-label-md" href="#">
<span className="material-symbols-outlined text-[20px]">help</span>
                Help Center
            </a>
<a className="flex items-center gap-3 px-4 py-3 text-on-primary-fixed-variant dark:text-on-primary-container hover:bg-primary-container dark:hover:bg-primary rounded-lg transition-colors duration-200 font-label-md text-label-md" href="#">
<span className="material-symbols-outlined text-[20px]">logout</span>
                Logout
            </a>
</div>
</aside>
{/**/}
<div className="flex-1 flex flex-col md:ml-[240px] min-w-0">
{/**/}
<header className="sticky top-0 right-0 h-header_height bg-surface dark:bg-surface-container-high border-b border-outline-variant dark:border-outline z-40 flex justify-between items-center px-margin_desktop md:px-margin_desktop px-margin_mobile">
{/**/}
<div className="md:hidden flex items-center">
<h1 className="font-headline-sm text-headline-sm font-black text-primary dark:text-primary-fixed">HRFlow</h1>
</div>
{/**/}
<div className="hidden md:flex relative w-96 group focus-within:ring-2 focus-within:ring-primary rounded-lg">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input className="w-full bg-surface-container-low dark:bg-surface-dim border-none rounded-lg pl-10 pr-4 py-2 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant focus:ring-0 outline-none hover:bg-surface-container-high transition-all" placeholder="Search candidates, jobs, or employees..." type="text"/>
</div>
{/**/}
<div className="flex items-center gap-4">
<button className="text-on-surface-variant dark:text-on-surface hover:text-primary hover:bg-surface-container-low dark:hover:bg-surface-dim transition-all p-2 rounded-full">
<span className="material-symbols-outlined">notifications</span>
</button>
<button className="text-on-surface-variant dark:text-on-surface hover:text-primary hover:bg-surface-container-low dark:hover:bg-surface-dim transition-all p-2 rounded-full hidden md:block">
<span className="material-symbols-outlined">settings</span>
</button>
<div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant ml-2 shrink-0 cursor-pointer">
<img alt="User Profile" className="w-full h-full object-cover" data-alt="A professional headshot of a young HR manager with glasses, smiling warmly against a clean corporate office background with modern light-mode aesthetics. Bright, high-key lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLjPrfKttTtmSzrza0NseMQvRBOzMDPiBqj7FAZH8iX7ZIwXDX8sNBpJfeLUNa3QZg-DYDF47Y9y4BnC57cqHSab4MxfVbOIEzoovEoeHXqEmOGs1Oq9Nz5d4U7T48hGTSy1YpMffv-ru4EkisvyctEwCziA1_3FBsLEV-wLTZMfvL5FLo4K-t3uscP-OFnDj_s9tIJTgNeNjjxw_ho2FgXCoWHQruTwxVAGnqjj_SitbaX_MLjfAipw"/>
</div>
</div>
</header>
{/**/}
<main className="flex-1 p-margin_mobile md:p-margin_desktop overflow-x-hidden">
<div className="max-w-7xl mx-auto space-y-stack_lg">
{/**/}
<div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">HR Dashboard</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant mt-1">Welcome back, Sarah. Here's what's happening today.</p>
</div>
<div className="flex flex-wrap gap-3">
<button className="bg-primary-container text-on-primary px-4 py-2 rounded-lg font-label-md text-label-md flex items-center gap-2 hover:bg-primary transition-colors">
<span className="material-symbols-outlined text-[18px]">add_box</span>
                            Post New Job
                        </button>
<button className="border border-secondary text-secondary px-4 py-2 rounded-lg font-label-md text-label-md flex items-center gap-2 hover:bg-surface-container-low transition-colors">
<span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
                            Schedule Interview
                        </button>
</div>
</div>
{/**/}
<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
{/**/}
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group">
<div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-fixed/30 rounded-full blur-2xl group-hover:scale-110 transition-transform"></div>
<div className="flex items-center gap-3 mb-4 text-on-surface-variant">
<span className="material-symbols-outlined text-primary-container">work</span>
<span className="font-label-sm text-label-sm uppercase tracking-wider">Open Positions</span>
</div>
<div className="flex items-end justify-between">
<span className="font-headline-lg text-[40px] leading-none text-primary font-bold">4</span>
<span className="font-label-md text-label-md text-secondary bg-secondary-fixed px-2 py-1 rounded">+1 this week</span>
</div>
</div>
{/**/}
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group">
<div className="absolute -right-4 -top-4 w-24 h-24 bg-secondary-container/20 rounded-full blur-2xl group-hover:scale-110 transition-transform"></div>
<div className="flex items-center gap-3 mb-4 text-on-surface-variant">
<span className="material-symbols-outlined text-secondary">description</span>
<span className="font-label-sm text-label-sm uppercase tracking-wider">Applications This Week</span>
</div>
<div className="flex items-end justify-between">
<span className="font-headline-lg text-[40px] leading-none text-primary font-bold">128</span>
<span className="font-label-md text-label-md text-secondary bg-secondary-fixed px-2 py-1 rounded">+14% vs last</span>
</div>
</div>
{/**/}
<div className="bg-primary-container text-on-primary rounded-xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
<div className="absolute right-0 top-0 w-32 h-32 bg-primary/50 rounded-full blur-2xl"></div>
<div className="flex items-center gap-3 mb-4 text-on-primary-container">
<span className="material-symbols-outlined">event</span>
<span className="font-label-sm text-label-sm uppercase tracking-wider">Interviews Today</span>
</div>
<div className="flex items-end justify-between relative z-10">
<span className="font-headline-lg text-[40px] leading-none font-bold">6</span>
<span className="font-label-md text-label-md text-primary-fixed-dim bg-primary px-2 py-1 rounded">2 remaining</span>
</div>
</div>
</div>
{/**/}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
{/**/}
<div className="lg:col-span-2 space-y-stack_lg">
{/**/}
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
<div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low/50">
<h3 className="font-headline-sm text-headline-sm text-primary">Interviews Today</h3>
<button className="font-label-md text-label-md text-secondary hover:underline">View Calendar</button>
</div>
<div className="divide-y divide-surface-variant">
{/**/}
<div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-surface-container-lowest transition-colors">
<div className="flex items-center gap-4">
<div className="bg-surface-variant text-on-surface-variant rounded-lg p-2 text-center min-w-[70px]">
<div className="font-label-sm text-label-sm">10:00 AM</div>
<div className="font-label-md text-label-md text-primary mt-0.5">30 min</div>
</div>
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full overflow-hidden bg-surface-variant shrink-0">
<img alt="Candidate" className="w-full h-full object-cover" data-alt="A professional headshot portrait of a male candidate with short hair, wearing a neat button-down shirt, isolated on a light gray background. High quality corporate style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaPp8iAIItEZYlWcHMrms9U-Ev9MAjPxps8M6JJBwfRglRb_PTRn5qnva5OcRl44LST3_wFV5KnJJm8cgyJFNNcWDpYsg_IZqtTV45-hzWQ74BVIWPn5yH4sFb4e7zFwkgE3k-yf-sOB3AS7QSo7mrtx-0iOdslimfYtPTFcjVn7j8Rt1PUz5erVf9drUlHbfIgaHEkydrowJ1CuWDdpE82HOazpGSOpA3nPmrvrJ0TaPek6EYX1ITxw"/>
</div>
<div>
<h4 className="font-headline-sm text-[16px] text-primary leading-tight">David Chen</h4>
<p className="font-body-md text-body-md text-on-surface-variant text-sm">Senior Frontend Developer</p>
</div>
</div>
</div>
<div className="flex items-center gap-3 sm:ml-auto">
<span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 bg-surface-container py-1 px-2 rounded">
<span className="material-symbols-outlined text-[14px]">videocam</span> Video
                                        </span>
<button className="bg-secondary text-on-secondary px-4 py-1.5 rounded font-label-md text-label-md hover:bg-secondary-container transition-colors">Join</button>
</div>
</div>
{/**/}
<div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-surface-container-lowest transition-colors">
<div className="flex items-center gap-4">
<div className="bg-surface-variant text-on-surface-variant rounded-lg p-2 text-center min-w-[70px]">
<div className="font-label-sm text-label-sm">1:30 PM</div>
<div className="font-label-md text-label-md text-primary mt-0.5">45 min</div>
</div>
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full overflow-hidden bg-surface-variant shrink-0">
<div className="w-full h-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center font-bold">AJ</div>
</div>
<div>
<h4 className="font-headline-sm text-[16px] text-primary leading-tight">Anita Johnson</h4>
<p className="font-body-md text-body-md text-on-surface-variant text-sm">UX Designer</p>
</div>
</div>
</div>
<div className="flex items-center gap-3 sm:ml-auto">
<span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 bg-surface-container py-1 px-2 rounded">
<span className="material-symbols-outlined text-[14px]">meeting_room</span> Room A
                                        </span>
<button className="border border-outline text-primary px-4 py-1.5 rounded font-label-md text-label-md hover:bg-surface-container-low transition-colors">Details</button>
</div>
</div>
</div>
</div>
{/**/}
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
<div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low/50">
<h3 className="font-headline-sm text-headline-sm text-primary">Recent Applications</h3>
<button className="font-label-md text-label-md text-secondary hover:underline">View All</button>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface border-b border-outline-variant">
<th className="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-medium">Candidate</th>
<th className="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-medium">Applied For</th>
<th className="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-medium">Date</th>
<th className="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-medium">Status</th>
</tr>
</thead>
<tbody className="font-body-md text-body-md">
<tr className="border-b border-surface-variant hover:bg-surface/50">
<td className="p-4 font-medium text-primary">Marcus Aurelius</td>
<td className="p-4 text-on-surface-variant">Product Manager</td>
<td className="p-4 text-on-surface-variant">Today</td>
<td className="p-4"><span className="bg-primary-fixed text-on-primary-fixed-variant px-2 py-1 rounded-full font-label-sm text-[10px] uppercase font-bold">New</span></td>
</tr>
<tr className="border-b border-surface-variant bg-primary/2 hover:bg-surface/50">
<td className="p-4 font-medium text-primary">Elena Rostova</td>
<td className="p-4 text-on-surface-variant">Data Analyst</td>
<td className="p-4 text-on-surface-variant">Yesterday</td>
<td className="p-4"><span className="bg-tertiary-fixed text-on-tertiary-fixed-variant px-2 py-1 rounded-full font-label-sm text-[10px] uppercase font-bold">Screening</span></td>
</tr>
<tr className="border-b border-surface-variant hover:bg-surface/50">
<td className="p-4 font-medium text-primary">James Smith</td>
<td className="p-4 text-on-surface-variant">Senior Frontend Developer</td>
<td className="p-4 text-on-surface-variant">Oct 24</td>
<td className="p-4"><span className="bg-secondary-fixed text-on-secondary-fixed-variant px-2 py-1 rounded-full font-label-sm text-[10px] uppercase font-bold">Interviewing</span></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
{/**/}
<div className="lg:col-span-1">
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden h-full flex flex-col">
<div className="p-4 border-b border-outline-variant flex gap-2 items-center bg-gradient-to-r from-primary-container/10 to-surface-container-low">
<span className="material-symbols-outlined text-secondary">auto_awesome</span>
<h3 className="font-headline-sm text-headline-sm text-primary">AI Top Matches</h3>
</div>
<div className="p-4 flex-1 flex flex-col gap-4 overflow-y-auto no-scrollbar">
{/**/}
<div className="bg-surface border border-outline-variant rounded-lg p-4 relative group cursor-pointer hover:border-primary transition-colors">
<div className="absolute top-4 right-4 bg-error-container text-on-error-container font-label-md text-label-md px-2 py-1 rounded-full font-bold shadow-sm">
                                        98% Match
                                    </div>
<div className="flex items-center gap-3 mb-3">
<div className="w-12 h-12 rounded-full overflow-hidden bg-surface-variant shrink-0">
<img alt="AI Match" className="w-full h-full object-cover" data-alt="A professional headshot of an Asian female software engineer in her late 20s, wearing a smart casual blazer, smiling softly. Light background, crisp modern corporate aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXlwEn4L9tWXtW3dcnDMiMatFGkT1oqTKTt6w7bsq8hyn9xmoRKTl-3pdj8uIZvWMCDdJKaQkfSn0Po516xwyI-7J7z2Vj2UbNlKvgSrNLdZHFuiMcs55WI68GjBx3SGtiQ4btBrHbW1XMSiYghaMX4Z_8Ur6iWcI-MT_PBCbUQQ7VjL-YBv5PV7s-7Zsjbz35GVxBtF_W9fxc8IvnRzw6nsbnvyhtvZ2PNHgza3ddKz5-C6Z6Gsmn6g"/>
</div>
<div>
<h4 className="font-headline-sm text-[16px] text-primary">Yuki Tanaka</h4>
<p className="font-body-md text-[13px] text-on-surface-variant">Full Stack Engineer</p>
</div>
</div>
<div className="space-y-2 mt-2 pt-3 border-t border-surface-variant">
<div className="flex gap-2 flex-wrap">
<span className="text-[11px] bg-surface-container px-2 py-0.5 rounded text-on-surface-variant border border-outline-variant">React</span>
<span className="text-[11px] bg-surface-container px-2 py-0.5 rounded text-on-surface-variant border border-outline-variant">Node.js</span>
<span className="text-[11px] bg-primary-fixed text-primary px-2 py-0.5 rounded border border-primary-fixed-dim">5 YOE Req</span>
</div>
</div>
<button className="w-full mt-4 border border-secondary text-secondary py-1.5 rounded text-sm font-medium hover:bg-secondary-fixed transition-colors">Review Profile</button>
</div>
{/**/}
<div className="bg-surface border border-outline-variant rounded-lg p-4 relative group cursor-pointer hover:border-primary transition-colors">
<div className="absolute top-4 right-4 bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-md text-label-md px-2 py-1 rounded-full font-bold shadow-sm">
                                        94% Match
                                    </div>
<div className="flex items-center gap-3 mb-3">
<div className="w-12 h-12 rounded-full overflow-hidden bg-surface-variant shrink-0">
<div className="w-full h-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-lg">MR</div>
</div>
<div>
<h4 className="font-headline-sm text-[16px] text-primary">Miguel Rodriguez</h4>
<p className="font-body-md text-[13px] text-on-surface-variant">Product Manager</p>
</div>
</div>
<div className="space-y-2 mt-2 pt-3 border-t border-surface-variant">
<div className="flex gap-2 flex-wrap">
<span className="text-[11px] bg-surface-container px-2 py-0.5 rounded text-on-surface-variant border border-outline-variant">Agile</span>
<span className="text-[11px] bg-surface-container px-2 py-0.5 rounded text-on-surface-variant border border-outline-variant">Roadmapping</span>
</div>
</div>
<button className="w-full mt-4 border border-secondary text-secondary py-1.5 rounded text-sm font-medium hover:bg-secondary-fixed transition-colors">Review Profile</button>
</div>
</div>
<div className="p-3 border-t border-outline-variant bg-surface text-center">
<a className="font-label-md text-label-md text-secondary hover:underline" href="#">View All Matches</a>
</div>
</div>
</div>
</div>
</div>
</main>
</div>

    </div>
  );
};

export default HRDashboard;
