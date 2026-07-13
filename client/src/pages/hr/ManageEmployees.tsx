import React, { useState, useEffect } from 'react';
import { Search, Filter, Mail, Phone } from 'lucide-react';

interface Employee {
  _id?: string;
  name: string;
  role: string;
  dept: string;
  email: string;
  phone: string;
  status: string;
  joined: string;
}

const ManageEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const { api } = await import('../../api');
      const data = await api.get('/auth/users');
      // Filter for roles: employee or hr
      const filtered = data
        .filter((u: any) => u.role === 'employee' || u.role === 'hr')
        .map((u: any) => ({
          _id: u._id,
          name: u.name,
          role: u.role === 'hr' ? 'HR Manager' : 'Software Engineer',
          dept: u.dept || 'Engineering',
          email: u.email,
          phone: u.phone || '+880 1700 000000',
          status: u.status || 'Active',
          joined: new Date(u.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        }));
      setEmployees(filtered);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(e => 
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.dept.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-md text-headline-md text-primary font-bold">Manage Employees</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Employee directory and records</p>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input 
            type="text" 
            placeholder="Search employees..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm focus:border-primary focus:outline-none" 
          />
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-slate-400 font-semibold">Loading employees database...</div>
      ) : filteredEmployees.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
          {filteredEmployees.map(e => (
            <div key={e.email} className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5 hover:shadow-md hover:border-primary transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-lg shrink-0">{e.name[0]}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-label-md text-label-md text-on-surface font-semibold">{e.name}</p>
                    <span className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm font-bold text-[10px] ${e.status === 'Active' ? 'bg-secondary-fixed text-secondary' : 'bg-tertiary-fixed text-on-tertiary-fixed'}`}>{e.status}</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-0.5">{e.role} · {e.dept}</p>
                  <div className="mt-3 space-y-1">
                    <p className="flex items-center gap-2 font-body-md text-body-md text-on-surface-variant text-xs"><Mail size={12} />{e.email}</p>
                    <p className="flex items-center gap-2 font-body-md text-body-md text-on-surface-variant text-xs"><Phone size={12} />{e.phone}</p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-outline-variant flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Joined {e.joined}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-slate-400 font-semibold">No employees found.</div>
      )}
    </div>
  );
};

export default ManageEmployees;
