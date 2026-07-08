import React from 'react';

const Register = () => {
  return (
    <div className="w-full h-full">
      
{/**/}
<div className="flex w-full h-full">
{/**/}
<div className="hidden lg:flex w-1/2 bg-surface-container-high relative flex-col justify-between p-12">
<div className="z-10">
<h1 className="font-headline-lg text-headline-lg text-primary flex items-center gap-3">
<span className="material-symbols-outlined text-4xl" data-weight="fill" style={{"fontVariationSettings":"'FILL' 1"}}>work</span>
                    HRFlow
                </h1>
<p className="font-body-lg text-body-lg text-on-surface-variant mt-4 max-w-md">
                    Join thousands of professionals finding their next big opportunity. Streamlined application, transparent tracking, and direct communication.
                </p>
</div>
<div className="absolute inset-0 z-0">
    <div className="w-full h-full bg-cover bg-center opacity-40 mix-blend-multiply" data-alt="A modern, high-end corporate office environment bathed in natural light. Diverse professionals engaged in collaborative, focused work. The lighting is soft and bright, emphasizing a clean, efficient, and welcoming atmosphere. The overall aesthetic is professional, reliable, and optimistic, utilizing a subtle palette of deep blues, crisp whites, and neutral grays." style={{backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')"}}></div>
<div className="absolute inset-0 bg-gradient-to-br from-surface-container-high/80 to-surface-container-lowest/20"></div>
</div>
<div className="z-10">
{/**/}
<div className="flex gap-2 mb-8">
<div className="w-12 h-2 bg-primary rounded-full"></div>
<div className="w-4 h-2 bg-primary/30 rounded-full"></div>
<div className="w-4 h-2 bg-primary/30 rounded-full"></div>
</div>
</div>
</div>
{/**/}
<div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 overflow-y-auto bg-surface">
<div className="w-full max-w-md space-y-8">
{/**/}
<div className="lg:hidden text-center mb-8">
<h1 className="font-headline-md text-headline-md text-primary flex items-center justify-center gap-2">
<span className="material-symbols-outlined" data-weight="fill" style={{"fontVariationSettings":"'FILL' 1"}}>work</span>
                        HRFlow
                    </h1>
</div>
<div className="text-center">
<h2 className="font-headline-md text-headline-md text-on-surface">Create an Account</h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-2">Sign up to apply and track your job applications.</p>
</div>
<form className="space-y-6 mt-8">
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
{/**/}
<div className="space-y-2 md:col-span-2">
<label className="block font-label-md text-label-md text-on-surface" htmlFor="fullName">Full Name</label>
<input className="w-full px-4 py-3 rounded-DEFAULT border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors font-body-md text-on-surface placeholder-on-surface-variant/50 shadow-sm" id="fullName" name="fullName" placeholder="Jane Doe" required type="text"/>
</div>
{/**/}
<div className="space-y-2">
<label className="block font-label-md text-label-md text-on-surface" htmlFor="email">Email Address</label>
<input className="w-full px-4 py-3 rounded-DEFAULT border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors font-body-md text-on-surface placeholder-on-surface-variant/50 shadow-sm" id="email" name="email" placeholder="jane@example.com" required type="email"/>
</div>
{/**/}
<div className="space-y-2">
<label className="block font-label-md text-label-md text-on-surface" htmlFor="phone">Phone Number</label>
<input className="w-full px-4 py-3 rounded-DEFAULT border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors font-body-md text-on-surface placeholder-on-surface-variant/50 shadow-sm" id="phone" name="phone" placeholder="+1 (555) 000-0000" type="tel"/>
</div>
</div>
{/**/}
<div className="space-y-2 relative">
<label className="block font-label-md text-label-md text-on-surface" htmlFor="password">Password</label>
<div className="relative">
<input className="w-full px-4 py-3 rounded-DEFAULT border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors font-body-md text-on-surface placeholder-on-surface-variant/50 shadow-sm" id="password" name="password" placeholder="••••••••" required type="password"/>
<button className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors focus:outline-none" type="button">
<span className="material-symbols-outlined text-lg" data-icon="visibility">visibility</span>
</button>
</div>
{/**/}
<div className="mt-2 space-y-1">
<div className="flex gap-1 h-1.5 w-full rounded-full overflow-hidden">
<div className="w-1/4 bg-primary/20"></div>
<div className="w-1/4 bg-surface-variant"></div>
<div className="w-1/4 bg-surface-variant"></div>
<div className="w-1/4 bg-surface-variant"></div>
</div>
<p className="font-label-sm text-label-sm text-on-surface-variant text-right">Weak</p>
</div>
</div>
{/**/}
<div className="space-y-2 relative">
<label className="block font-label-md text-label-md text-on-surface" htmlFor="confirmPassword">Confirm Password</label>
<div className="relative">
<input className="w-full px-4 py-3 rounded-DEFAULT border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors font-body-md text-on-surface placeholder-on-surface-variant/50 shadow-sm" id="confirmPassword" name="confirmPassword" placeholder="••••••••" required type="password"/>
<button className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors focus:outline-none" type="button">
<span className="material-symbols-outlined text-lg" data-icon="visibility">visibility</span>
</button>
</div>
</div>
{/**/}
<div className="flex items-start gap-3 pt-2">
<div className="flex items-center h-5">
<input className="w-4 h-4 text-primary bg-surface border-outline-variant rounded focus:ring-primary focus:ring-2 cursor-pointer" id="terms" name="terms" required type="checkbox"/>
</div>
<div className="text-sm">
<label className="font-body-md text-body-md text-on-surface-variant cursor-pointer" htmlFor="terms">
                                I agree to the <a className="text-secondary hover:text-primary hover:underline transition-colors" href="#">Terms of Service</a> and <a className="text-secondary hover:text-primary hover:underline transition-colors" href="#">Privacy Policy</a>.
                            </label>
</div>
</div>
{/**/}
<button className="w-full py-3 px-4 bg-primary-container text-on-primary font-label-md text-label-md rounded-lg shadow-sm hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary flex items-center justify-center gap-2" type="submit">
                        Create Account
                        <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
</button>
</form>
{/**/}
<p className="text-center font-body-md text-body-md text-on-surface-variant mt-8">
                    Already have an account? 
                    <a className="font-label-md text-label-md text-secondary hover:text-primary transition-colors" href="/login">Log In</a>
</p>
</div>
</div>
</div>

    </div>
  );
};

export default Register;
