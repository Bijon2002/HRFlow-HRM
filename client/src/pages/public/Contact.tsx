import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => (
  <div className="max-w-5xl mx-auto px-6 py-20">
    <div className="text-center mb-16">
      <h1 className="font-headline-lg text-headline-lg text-primary font-bold mb-4">Contact Us</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant">We'd love to hear from you. Send us a message!</p>
    </div>
    <div className="grid md:grid-cols-2 gap-12">
      <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant shadow-sm">
        <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-6">Send a Message</h2>
        <form className="space-y-4">
          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">Name</label>
            <input type="text" className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">Email</label>
            <input type="email" className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">Message</label>
            <textarea rows={5} className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
          </div>
          <button className="w-full bg-primary text-on-primary py-2.5 rounded-lg font-label-md text-label-md hover:bg-primary-container hover:text-on-primary-container transition-all">Send Message</button>
        </form>
      </div>
      <div className="space-y-6">
        {[
          { icon: Mail, label: 'Email', value: 'hello@hrflow.app' },
          { icon: Phone, label: 'Phone', value: '+880 1700 000000' },
          { icon: MapPin, label: 'Office', value: 'Dhaka, Bangladesh' },
        ].map(c => (
          <div key={c.label} className="flex items-start gap-4 p-6 bg-surface-container-lowest rounded-xl border border-outline-variant">
            <div className="w-10 h-10 bg-primary-fixed rounded-lg flex items-center justify-center shrink-0">
              <c.icon size={20} className="text-primary" />
            </div>
            <div>
              <p className="font-label-md text-label-md text-on-surface-variant">{c.label}</p>
              <p className="font-body-lg text-body-lg text-on-surface font-medium">{c.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
export default Contact;
