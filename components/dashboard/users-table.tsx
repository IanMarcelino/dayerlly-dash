'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, ArrowUpDown } from 'lucide-react'
import { useState } from 'react'
import type { ReferredUser } from '@/lib/mock-data'

interface UsersTableProps {
  data: ReferredUser[]
}

export function UsersTable({ data }: UsersTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<keyof ReferredUser>('joinDate')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'FTD':
        return 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
      case 'CPA':
        return 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
      case 'Active':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100'
      case 'Inactive':
        return 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
    }
  }

  const filteredData = data
    .filter(user => 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aValue = a[sortField]
      let bValue = b[sortField]
      
      if (sortField === 'depositAmount') {
        aValue = Number(aValue)
        bValue = Number(bValue)
      }
      
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

  const handleSort = (field: keyof ReferredUser) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900">Referred Users</CardTitle>
            <CardDescription className="text-gray-600">
              Manage and track your referred users performance
            </CardDescription>
          </div>
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors duration-200"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow className="hover:bg-gray-50">
                <TableHead className="font-semibold text-gray-900">
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('username')}
                    className="h-auto p-0 font-semibold text-gray-900 hover:text-blue-600"
                  >
                    Username
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="font-semibold text-gray-900 hidden sm:table-cell">Email</TableHead>
                <TableHead className="font-semibold text-gray-900">
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('joinDate')}
                    className="h-auto p-0 font-semibold text-gray-900 hover:text-blue-600"
                  >
                    Join Date
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="font-semibold text-gray-900 text-right">
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('depositAmount')}
                    className="h-auto p-0 font-semibold text-gray-900 hover:text-blue-600"
                  >
                    Deposit
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="font-semibold text-gray-900">Status</TableHead>
                <TableHead className="font-semibold text-gray-900 hidden lg:table-cell">Last Activity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <TableCell className="font-medium text-gray-900">{user.username}</TableCell>
                  <TableCell className="text-gray-600 hidden sm:table-cell">{user.email}</TableCell>
                  <TableCell className="text-gray-600">
                    {new Date(user.joinDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </TableCell>
                  <TableCell className="text-right font-medium text-gray-900">
                    ${user.depositAmount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary" 
                      className={`${getStatusColor(user.status)} text-xs font-medium`}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600 hidden lg:table-cell">
                    {new Date(user.lastActivity).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {filteredData.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No users found matching your search.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}