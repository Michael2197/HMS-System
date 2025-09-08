import { useState, useEffect } from 'react';
import { mockTickets } from '../data/initialData';

interface Ticket {
  id: number;
  title: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  category: 'Technical' | 'HR' | 'Payroll' | 'General';
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

interface TicketFilter {
  status?: Ticket['status'];
  priority?: Ticket['priority'];
  category?: Ticket['category'];
}

export const useHelpdesk = () => {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>(mockTickets);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<TicketFilter>({});

  useEffect(() => {
    
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = tickets;
    
    if (filters.status) {
      filtered = filtered.filter(ticket => ticket.status === filters.status);
    }
    
    if (filters.priority) {
      filtered = filtered.filter(ticket => ticket.priority === filters.priority);
    }
    
    if (filters.category) {
      filtered = filtered.filter(ticket => ticket.category === filters.category);
    }
    
    setFilteredTickets(filtered);
  }, [tickets, filters]);

  const createTicket = (ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTicket: Ticket = {
      ...ticket,
      id: Math.max(...tickets.map(t => t.id)) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTickets([...tickets, newTicket]);
  };

  const updateTicket = (id: number, updates: Partial<Ticket>) => {
    setTickets(tickets.map(ticket => 
      ticket.id === id 
        ? { ...ticket, ...updates, updatedAt: new Date().toISOString() }
        : ticket
    ));
  };

  const deleteTicket = (id: number) => {
    setTickets(tickets.filter(ticket => ticket.id !== id));
  };

  const applyFilters = (newFilters: TicketFilter) => {
    setFilters(newFilters);
  };

  return {
    tickets: filteredTickets,
    loading,
    filters,
    createTicket,
    updateTicket,
    deleteTicket,
    applyFilters,
  };
};
