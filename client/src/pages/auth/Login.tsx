import React from 'react';

const Login = () => {
  return (
    <div className="w-full h-full">
      
<div className="flex min-h-full">
{/**/}
<div className="hidden lg:flex lg:flex-1 flex-col justify-between bg-primary relative overflow-hidden">
{/**/}
<div className="absolute inset-0 opacity-10 pointer-events-none" style={{"backgroundImage":"radial-gradient(circle at 10% 20%, #ffffff 1px, transparent 1px)","backgroundSize":"24px 24px"}}></div>
<div className="relative z-10 p-12 h-full flex flex-col justify-between">
<div>
<h1 className="font-headline-lg text-headline-lg font-black text-on-primary">HRFlow</h1>
<p className="font-headline-sm text-headline-sm text-primary-fixed-dim mt-2 max-w-md">The unified management suite for high-stakes recruitment.</p>
</div>
<div className="w-full h-96 rounded-xl overflow-hidden shadow-2xl border border-primary-container relative">
<img className="absolute inset-0 w-full h-full object-cover" data-alt="A sophisticated digital 3D illustration representing human resource management and recruitment workflows. Abstract representations of candidate profiles, connected by glowing digital lines, forming a network over a dark navy blue grid background. The lighting is high-key and professional, emphasizing efficiency and precision in a modern corporate setting. The overall mood is authoritative yet approachable, using a palette dominated by deep navy blue, crisp whites, and subtle glowing cyan accents." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj-kksHJvY3EQcTaRykYR32dyKeD4o3hWfOwhJ3dRrc0afTAKzxQ8_GAgXqmxiwHO47C9WZFHa4dvrKI0JyawDPlXxDHit-NYFdLl6njRTCMruN1lw2tu-LPEZd2nMM_h3FKqJXOl0mUBqFGj-_yCcjNLHGsHPg5Z8AQTTruzmVndqcFJOyoDxtLlYzuMOXAFOLOFR9NtTMeMYkzdiM6-I67gpqi8kegl9frSCYqUGYdRgYPyo5l2iNA"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
<div className="absolute bottom-6 left-6 right-6">
<p className="font-body-lg text-body-lg text-on-primary italic">"Streamlining our hiring process by 40% in the first quarter."</p>
</div>
</div>
</div>
</div>
{/**/}
<div className="flex flex-1 flex-col justify-center items-center px-4 py-12 sm:px-6 lg:flex-none lg:w-[600px] lg:px-20 bg-surface">
<div className="mx-auto w-full max-w-[420px]">
{/**/}
<div className="lg:hidden mb-8 text-center">
<h1 className="font-headline-lg-mobile text-headline-lg-mobile font-black text-primary">HRFlow</h1>
</div>
<div className="bg-surface-container-lowest py-8 px-6 shadow-sm border border-outline-variant rounded-xl">
<h2 className="font-headline-md text-headline-md text-on-background text-center mb-6">Welcome back to HRFlow</h2>
<form action="#" className="space-y-6" method="POST">
<div>
<label className="block font-label-md text-label-md text-on-surface-variant mb-1" htmlFor="email">Email address</label>
<div className="mt-1">
<input autoComplete="email" className="block w-full rounded-md border border-outline-variant bg-surface px-3 py-2 text-on-background shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm transition-colors" id="email" name="email" required type="email"/>
</div>
</div>
<div>
<label className="block font-label-md text-label-md text-on-surface-variant mb-1" htmlFor="password">Password</label>
<div className="mt-1 relative rounded-md shadow-sm">
<input autoComplete="current-password" className="block w-full rounded-md border border-outline-variant bg-surface px-3 py-2 pr-10 text-on-background shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm transition-colors" id="password" name="password" required type="password"/>
<button className="absolute inset-y-0 right-0 px-3 flex items-center text-on-surface-variant hover:text-primary transition-colors focus:outline-none" onClick="togglePassword()" type="button">
<span className="material-symbols-outlined" data-icon="visibility" id="visibility-icon">visibility</span>
</button>
</div>
</div>
<div className="flex items-center justify-between">
<div className="flex items-center">
<input className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary" id="remember-me" name="remember-me" type="checkbox"/>
<label className="ml-2 block font-body-md text-body-md text-on-surface-variant" htmlFor="remember-me">Remember me</label>
</div>
<div className="text-sm">
<a className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors" href="#">Forgot password?</a>
</div>
</div>
<div>
<button className="flex w-full justify-center rounded-md border border-transparent bg-primary-container py-2.5 px-4 font-label-md text-label-md text-on-primary shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all" type="submit">
                                Log In
                            </button>
</div>
</form>
<div className="mt-6">
<div className="relative">
<div className="absolute inset-0 flex items-center">
<div className="w-full border-t border-outline-variant"></div>
</div>
<div className="relative flex justify-center text-sm">
<span className="bg-surface-container-lowest px-2 text-on-surface-variant font-body-md text-body-md">New candidate?</span>
</div>
</div>
<div className="mt-6">
<a className="flex w-full justify-center rounded-md border border-outline-variant bg-surface py-2.5 px-4 font-label-md text-label-md text-primary shadow-sm hover:bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all" href="/signup">
                                Create an account
                            </a>
</div>
</div>
</div>
<p className="mt-8 text-center text-xs text-on-surface-variant">
                    © 2024 HRFlow Inc. All rights reserved.
                </p>
</div>
</div>
</div>


    </div>
  );
};

export default Login;
