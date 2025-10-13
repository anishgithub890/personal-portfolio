'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  User, 
  MessageSquare, 
  Search, 
  Filter,
  Eye,
  CheckCircle,
  Reply,
  Archive
} from 'lucide-react';
import ClientOnly from '@/components/client-only';

interface Contact {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
  status: 'PENDING' | 'READ' | 'REPLIED' | 'ARCHIVED';
  createdAt: string;
}

interface ContactsResponse {
  contacts: Contact[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface TotalCounts {
  total: number;
  pending: number;
  read: number;
  replied: number;
  archived: number;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [totalCounts, setTotalCounts] = useState<TotalCounts>({
    total: 0,
    pending: 0,
    read: 0,
    replied: 0,
    archived: 0,
  });
  const [loading, setLoading] = useState(true);
  const [countsLoading, setCountsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated' && session?.user?.userType !== 'ADMIN') {
      router.push('/dashboard');
    }
  }, [status, session, router]);

  useEffect(() => {
    if (session?.user?.userType === 'ADMIN') {
      fetchContacts();
      fetchTotalCounts();
    }
  }, [session, currentPage, search, statusFilter]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        ...(search && { search }),
        ...(statusFilter !== 'ALL' && { status: statusFilter }),
      });

      const response = await fetch(`/api/contacts?${params}`);
      if (response.ok) {
        const data: ContactsResponse = await response.json();
        setContacts(data.contacts);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTotalCounts = async () => {
    try {
      setCountsLoading(true);
      const response = await fetch('/api/contacts/counts');
      if (response.ok) {
        const counts = await response.json();
        setTotalCounts(counts);
      }
    } catch (error) {
      console.error('Error fetching total counts:', error);
      // Set default values on error
      setTotalCounts({
        total: 0,
        pending: 0,
        read: 0,
        replied: 0,
        archived: 0,
      });
    } finally {
      setCountsLoading(false);
    }
  };

  const updateContactStatus = async (contactId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/contacts/${contactId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchContacts();
        fetchTotalCounts(); // Refresh total counts after status update
      }
    } catch (error) {
      console.error('Error updating contact status:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      PENDING: { variant: 'secondary' as const, className: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Eye },
      READ: { variant: 'secondary' as const, className: 'bg-blue-100 text-blue-800 border-blue-200', icon: CheckCircle },
      REPLIED: { variant: 'default' as const, className: 'bg-green-600 hover:bg-green-700', icon: Reply },
      ARCHIVED: { variant: 'outline' as const, className: 'bg-gray-50 text-gray-600 border-gray-200', icon: Archive },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className={config.className}>
        <Icon className="h-3 w-3 mr-1" />
        {status === 'REPLIED' ? 'Replied' : status}
      </Badge>
    );
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!session || session.user?.userType !== 'ADMIN') {
    return null;
  }

  return (
    <ClientOnly> 
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage contact messages and user interactions</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {countsLoading ? (
                <div className="text-2xl font-bold animate-pulse">...</div>
              ) : (
                <>
                  <div className="text-2xl font-bold">{totalCounts.total}</div>
                  <p className="text-xs text-muted-foreground">
                    {totalCounts.total - totalCounts.archived} active
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {countsLoading ? (
                <div className="text-2xl font-bold animate-pulse">...</div>
              ) : (
                <>
                  <div className="text-2xl font-bold">{totalCounts.pending}</div>
                  <p className="text-xs text-muted-foreground">
                    Awaiting review
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Read</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {countsLoading ? (
                <div className="text-2xl font-bold animate-pulse">...</div>
              ) : (
                <>
                  <div className="text-2xl font-bold">{totalCounts.read}</div>
                  <p className="text-xs text-muted-foreground">
                    Reviewed
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Replied</CardTitle>
              <Reply className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {countsLoading ? (
                <div className="text-2xl font-bold animate-pulse">...</div>
              ) : (
                <>
                  <div className="text-2xl font-bold">{totalCounts.replied}</div>
                  <p className="text-xs text-muted-foreground">
                    Responded to
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          {/* <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Admin User</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium truncate">{session.user?.name || 'Admin'}</div>
              <div className="text-xs text-muted-foreground truncate">{session.user?.email}</div>
            </CardContent>
          </Card> */}
        </div>

        {/* Contacts Management */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Messages</CardTitle>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search contacts..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Contacts</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="READ">Read</SelectItem>
                  <SelectItem value="REPLIED">Replied</SelectItem>
                  <SelectItem value="ARCHIVED">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : contacts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {search || statusFilter !== 'ALL' ? 'No contacts match your filters' : 'No contacts found'}
              </div>
            ) : (
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div key={contact.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{contact.name}</h3>
                        <p className="text-sm text-muted-foreground truncate">{contact.email}</p>
                        <p className="text-sm text-muted-foreground">{contact.phoneNumber}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2 ml-4">
                        {getStatusBadge(contact.status)}
                        <div className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate.full(contact.createdAt)}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm break-words">{contact.message}</p>
                    <div className="flex flex-wrap gap-2">
                      {contact.status === 'PENDING' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateContactStatus(contact.id, 'READ')}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Mark Read
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateContactStatus(contact.id, 'REPLIED')}
                          >
                            <Reply className="h-4 w-4 mr-1" />
                            Mark Replied
                          </Button>
                        </>
                      )}
                      {contact.status === 'READ' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateContactStatus(contact.id, 'REPLIED')}
                        >
                          <Reply className="h-4 w-4 mr-1" />
                          Mark Replied
                        </Button>
                      )}
                      {contact.status !== 'ARCHIVED' ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateContactStatus(contact.id, 'ARCHIVED')}
                        >
                          <Archive className="h-4 w-4 mr-1" />
                          Archive
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateContactStatus(contact.id, 'PENDING')}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Unarchive
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </Button>
                <span className="text-sm">
                  Page {currentPage} of {pagination.pages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === pagination.pages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
    </ClientOnly>
  );
} 